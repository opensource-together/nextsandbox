"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = exports.generateComponentId = exports.getImportPath = exports.extractCategory = exports.extractComponentName = exports.normalizePath = void 0;
exports.isReactComponent = isReactComponent;
exports.filePathToImportPath = filePathToImportPath;
exports.formatComponentName = formatComponentName;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * Normalise un chemin de fichier en utilisant des slashes forward
 *
 * @param filePath Chemin à normaliser
 * @returns Chemin normalisé
 */
const normalizePath = (filePath) => {
    return filePath.replace(/\\/g, "/");
};
exports.normalizePath = normalizePath;
/**
 * Extrait un nom de composant à partir du chemin du fichier
 *
 * @param filePath Chemin du fichier
 * @returns Nom du composant
 */
const extractComponentName = (filePath) => {
    const normalizedPath = (0, exports.normalizePath)(filePath);
    const fileName = normalizedPath.split("/").pop() || "";
    // Si c'est un index.tsx, utiliser le nom du dossier parent
    if (fileName === "index.tsx" || fileName === "index.ts") {
        const parts = normalizedPath.split("/");
        if (parts.length > 1) {
            const parentDir = parts[parts.length - 2];
            return (0, exports.capitalizeFirstLetter)(parentDir);
        }
    }
    // Enlever l'extension
    const baseName = fileName.replace(/\.(tsx|ts)$/, "");
    // Convertir kebab-case en PascalCase si nécessaire
    if (baseName.includes("-")) {
        return baseName
            .split("-")
            .map((part) => (0, exports.capitalizeFirstLetter)(part))
            .join("");
    }
    return baseName;
};
exports.extractComponentName = extractComponentName;
/**
 * Extrait la catégorie d'un composant à partir de son chemin
 *
 * @param filePath Chemin du fichier
 * @param categories Configuration des catégories personnalisées
 * @returns Nom de la catégorie
 */
const extractCategory = (filePath, categories) => {
    const normalizedPath = (0, exports.normalizePath)(filePath);
    // Vérifier les catégories personnalisées d'abord
    if (categories) {
        for (const [category, pattern] of Object.entries(categories)) {
            if (normalizedPath.includes((0, exports.normalizePath)(pattern))) {
                return category;
            }
        }
    }
    // Sinon, utiliser le dossier parent
    const parts = normalizedPath.split("/");
    // Si le chemin a au moins 2 parties et n'est pas un index.tsx
    if (parts.length > 2 &&
        parts[parts.length - 1] !== "index.tsx" &&
        parts[parts.length - 1] !== "index.ts") {
        return parts[parts.length - 2];
    }
    // Si c'est un index.tsx et qu'il y a au moins 3 parties
    if (parts.length > 2 &&
        (parts[parts.length - 1] === "index.tsx" ||
            parts[parts.length - 1] === "index.ts")) {
        return parts[parts.length - 3];
    }
    // Sinon, utiliser le premier dossier
    return parts[0];
};
exports.extractCategory = extractCategory;
/**
 * Génère un chemin d'import relatif depuis la page sandbox vers un composant
 *
 * @param projectRoot Racine du projet
 * @param outputPath Chemin de la page sandbox générée
 * @param componentPath Chemin du composant
 * @returns Chemin d'import relatif
 */
const getImportPath = (projectRoot, outputPath, componentPath) => {
    const normalizedOutputPath = (0, exports.normalizePath)(outputPath);
    const normalizedComponentPath = (0, exports.normalizePath)(componentPath);
    // Obtenir le répertoire de sortie
    const outputDir = path_1.default.dirname(normalizedOutputPath);
    // Enlever l'extension du fichier
    let importPath = normalizedComponentPath.replace(/\.(tsx|ts)$/, "");
    // Supprimer index à la fin
    if (importPath.endsWith("/index")) {
        importPath = importPath.replace(/\/index$/, "");
    }
    // Calculer le chemin relatif
    const relativeDir = path_1.default.relative(outputDir, path_1.default.join(projectRoot));
    const relativePath = relativeDir ? `${(0, exports.normalizePath)(relativeDir)}/` : "";
    return `${relativePath}${importPath}`;
};
exports.getImportPath = getImportPath;
/**
 * Génère un identifiant unique pour un composant
 *
 * @param name Nom du composant
 * @param path Chemin du fichier
 * @returns Identifiant unique
 */
const generateComponentId = (name, filePath) => {
    return `${name}-${filePath.replace(/\//g, "-").replace(/\.(tsx|ts)$/, "")}`;
};
exports.generateComponentId = generateComponentId;
/**
 * Met en majuscule la première lettre d'une chaîne
 *
 * @param str Chaîne à traiter
 * @returns Chaîne avec première lettre en majuscule
 */
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
/**
 * Vérifie si un fichier est un composant React
 * (basé sur son extension et son contenu)
 */
function isReactComponent(filePath) {
    // Vérifier l'extension
    const ext = path_1.default.extname(filePath).toLowerCase();
    if (![".tsx", ".jsx", ".js", ".ts"].includes(ext)) {
        return false;
    }
    // Vérifier le contenu (recherche d'un export de composant React)
    try {
        const content = fs_extra_1.default.readFileSync(filePath, "utf-8");
        // Rechercher des patterns typiques de composants React
        return (content.includes("React") &&
            (content.includes("export default") ||
                content.includes("export const")) &&
            (content.includes("function") ||
                content.includes("=>") ||
                content.includes("class")));
    }
    catch (error) {
        return false;
    }
}
/**
 * Convertit un chemin relatif à la racine du projet en chemin d'importation pour React
 */
function filePathToImportPath(filePath, rootDir = process.cwd()) {
    // Enlever l'extension
    let importPath = filePath.replace(/\.(tsx|jsx|js|ts)$/, "");
    // Rendre le chemin relatif à la racine du projet
    importPath = path_1.default.relative(rootDir, importPath);
    // Normaliser avec des slashes avant
    importPath = (0, exports.normalizePath)(importPath);
    // Ajouter un ./ si nécessaire pour les chemins relatifs
    if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
        importPath = `./${importPath}`;
    }
    return importPath;
}
/**
 * Formate proprement les noms de composants (PascalCase)
 */
function formatComponentName(name) {
    // Supprimer les caractères non-alphanumériques
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, " ");
    // Convertir en PascalCase
    return cleanName
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join("");
}
