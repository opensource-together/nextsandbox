"use strict";
// Mock des modules qui seront implémentés plus tard
// Ce fichier contient les interfaces et les stubs nécessaires pour que les tests fonctionnent
// avant que l'implémentation réelle soit disponible
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportPath = exports.extractCategory = exports.extractComponentName = exports.normalizePath = exports.generateSandboxPage = exports.scanComponents = exports.validateConfig = exports.loadConfig = exports.init = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const minimatch_1 = require("minimatch");
// Mocks pour cli.ts
const init = async () => {
    return Promise.resolve();
};
exports.init = init;
// Mocks pour config.ts
const loadConfig = () => {
    const configPath = path_1.default.resolve(process.cwd(), "sandbox.config.js");
    if (fs_extra_1.default.existsSync(configPath)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const userConfig = require(configPath);
        // Support ancien scanDirs
        if (userConfig.scanDirs && !userConfig.componentDirs) {
            userConfig.componentDirs = userConfig.scanDirs;
        }
        return userConfig;
    }
    else {
        return {
            componentDirs: ["components/**/*.tsx"],
            exclude: ["**/node_modules/**"],
        };
    }
};
exports.loadConfig = loadConfig;
const validateConfig = (config) => {
    if (!config.componentDirs ||
        !Array.isArray(config.componentDirs) ||
        config.componentDirs.length === 0) {
        throw new Error("La configuration doit contenir une liste non vide de componentDirs");
    }
    // Vérifier la validité syntaxique des patterns d'exclusion
    if (config.exclude) {
        for (const pattern of config.exclude) {
            try {
                new minimatch_1.Minimatch(pattern);
            }
            catch (error) {
                throw new Error(`Pattern de glob invalide: ${pattern}`);
            }
        }
    }
};
exports.validateConfig = validateConfig;
// Mocks pour scanner.ts
const scanComponents = async (config) => {
    const components = [];
    const patterns = config.componentDirs || [];
    const exclude = config.exclude || [];
    const projectRoot = process.cwd();
    try {
        for (const pattern of patterns) {
            const files = glob_1.default.sync(pattern, {
                ignore: exclude,
                cwd: projectRoot,
                absolute: false,
            });
            for (const filePath of files) {
                try {
                    const absolutePath = path_1.default.join(projectRoot, filePath);
                    const fileContent = fs_extra_1.default.readFileSync(absolutePath, "utf-8");
                    const name = (0, exports.extractComponentName)(filePath);
                    const category = (0, exports.extractCategory)(filePath, config.categories);
                    const id = `${category}-${name}`.toLowerCase();
                    components.push({
                        id,
                        name,
                        path: filePath,
                        category,
                    });
                }
                catch (error) {
                    console.error(`Erreur lors du traitement du fichier ${filePath}:`, error);
                }
            }
        }
        return components;
    }
    catch (error) {
        console.error("Erreur lors du scan des composants:", error);
        return [];
    }
};
exports.scanComponents = scanComponents;
// Mocks pour generator.ts
const generateSandboxPage = async (components) => {
    const projectRoot = process.cwd();
    const templatePath = path_1.default.join(projectRoot, "node_modules", "next-sandbox", "templates", "sandbox-page.tsx");
    // Vérifier l'existence du template
    if (!fs_extra_1.default.existsSync(templatePath)) {
        throw new Error(`Template not found at ${templatePath}`);
    }
    const templateContent = fs_extra_1.default.readFileSync(templatePath, "utf-8");
    const outputPath = path_1.default.join(projectRoot, "app", "sandbox", "page.tsx");
    const outputDir = path_1.default.dirname(outputPath);
    // Générer les imports et la liste des composants
    let importsCode = "";
    let listCode = "const components = [\n";
    for (const component of components) {
        const impPath = (0, exports.getImportPath)(projectRoot, outputPath, component.path);
        const exportName = component.exportName || component.name;
        importsCode += `import ${exportName} from '${impPath}';\n`;
        listCode += `  { "name": "${component.name}", "path": "${component.path}", "category": "${component.category}" },\n`;
    }
    listCode += "];\n";
    // Remplacer les placeholders du template
    let content = templateContent;
    content = content.replace("// __COMPONENT_IMPORTS__", importsCode);
    content = content.replace("// __COMPONENT_LIST__", listCode);
    // Créer le répertoire et écrire le fichier
    fs_extra_1.default.ensureDir(outputDir);
    fs_extra_1.default.writeFileSync(outputPath, importsCode + "\n" + listCode + content, "utf-8");
};
exports.generateSandboxPage = generateSandboxPage;
// Mocks pour utils.ts
const normalizePath = (path) => {
    return path.replace(/\\/g, "/");
};
exports.normalizePath = normalizePath;
const extractComponentName = (filePath) => {
    const fileName = filePath.split("/").pop() || "";
    if (fileName === "index.tsx" || fileName === "index.ts") {
        const parentDir = filePath.split("/").slice(-2, -1)[0];
        return parentDir.charAt(0).toUpperCase() + parentDir.slice(1);
    }
    const baseName = fileName.replace(/\.(tsx|ts)$/, "");
    // Convertir kebab-case en PascalCase si nécessaire
    if (baseName.includes("-")) {
        return baseName
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("");
    }
    return baseName;
};
exports.extractComponentName = extractComponentName;
const extractCategory = (filePath, categories) => {
    // Si des catégories personnalisées sont définies, chercher une correspondance
    if (categories) {
        for (const [category, pattern] of Object.entries(categories)) {
            if (filePath.includes(pattern)) {
                return category;
            }
        }
    }
    // Sinon, extraire la catégorie du chemin
    const parts = filePath.split("/");
    if (parts.length > 2) {
        return parts[parts.length - 2];
    }
    return parts[0];
};
exports.extractCategory = extractCategory;
const getImportPath = (projectRoot, outputPath, componentPath) => {
    const outputDir = outputPath.split("/").slice(0, -1).join("/");
    let importPath = componentPath.replace(/\.(tsx|ts)$/, "");
    // Supprimer 'index' final pour les composants index.tsx
    if (importPath.endsWith("/index")) {
        importPath = importPath.replace(/\/index$/, "");
    }
    // Calculer le chemin relatif
    const relativePath = "../".repeat(outputDir.replace(projectRoot, "").split("/").filter(Boolean).length);
    return relativePath + importPath;
};
exports.getImportPath = getImportPath;
