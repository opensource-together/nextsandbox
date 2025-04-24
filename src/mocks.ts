// Mock des modules qui seront implémentés plus tard
// Ce fichier contient les interfaces et les stubs nécessaires pour que les tests fonctionnent
// avant que l'implémentation réelle soit disponible

import fs from "fs-extra";
import path from "path";
import glob from "glob";
import { Minimatch } from "minimatch";

// Types communs
export interface SandboxConfig {
  componentDirs: string[];
  exclude?: string[];
  categories?: Record<string, string>;
}

export interface ComponentMeta {
  id: string;
  name: string;
  path: string;
  category: string;
  exportName?: string;
}

// Mocks pour cli.ts
export const init = async (): Promise<void> => {
  return Promise.resolve();
};

// Mocks pour config.ts
export const loadConfig = (): SandboxConfig => {
  const configPath = path.resolve(process.cwd(), "sandbox.config.js");
  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const userConfig: Partial<SandboxConfig> = require(configPath);
    // Support ancien scanDirs
    if ((userConfig as any).scanDirs && !userConfig.componentDirs) {
      (userConfig as any).componentDirs = (userConfig as any).scanDirs;
    }
    return userConfig as SandboxConfig;
  } else {
    return {
      componentDirs: ["components/**/*.tsx"],
      exclude: ["**/node_modules/**"],
    };
  }
};

export const validateConfig = (config: SandboxConfig): void => {
  if (
    !config.componentDirs ||
    !Array.isArray(config.componentDirs) ||
    config.componentDirs.length === 0
  ) {
    throw new Error(
      "La configuration doit contenir une liste non vide de componentDirs"
    );
  }
  // Vérifier la validité syntaxique des patterns d'exclusion
  if (config.exclude) {
    for (const pattern of config.exclude) {
      try {
        new Minimatch(pattern);
      } catch (error) {
        throw new Error(`Pattern de glob invalide: ${pattern}`);
      }
    }
  }
};

// Mocks pour scanner.ts
export const scanComponents = async (
  config: SandboxConfig
): Promise<ComponentMeta[]> => {
  const components: ComponentMeta[] = [];
  const patterns = config.componentDirs || [];
  const exclude = config.exclude || [];
  const projectRoot = process.cwd();

  try {
    for (const pattern of patterns) {
      const files = glob.sync(pattern, {
        ignore: exclude,
        cwd: projectRoot,
        absolute: false,
      });

      for (const filePath of files) {
        try {
          const absolutePath = path.join(projectRoot, filePath);
          const fileContent = fs.readFileSync(absolutePath, "utf-8");

          const name = extractComponentName(filePath);
          const category = extractCategory(filePath, config.categories);
          const id = `${category}-${name}`.toLowerCase();

          components.push({
            id,
            name,
            path: filePath,
            category,
          });
        } catch (error) {
          console.error(
            `Erreur lors du traitement du fichier ${filePath}:`,
            error
          );
        }
      }
    }

    return components;
  } catch (error) {
    console.error("Erreur lors du scan des composants:", error);
    return [];
  }
};

// Mocks pour generator.ts
export const generateSandboxPage = async (
  components: ComponentMeta[]
): Promise<void> => {
  const projectRoot = process.cwd();
  const templatePath = path.join(
    projectRoot,
    "node_modules",
    "next-sandbox",
    "templates",
    "sandbox-page.tsx"
  );

  // Vérifier l'existence du template
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at ${templatePath}`);
  }

  const templateContent = fs.readFileSync(templatePath, "utf-8");
  const outputPath = path.join(projectRoot, "app", "sandbox", "page.tsx");
  const outputDir = path.dirname(outputPath);

  // Générer les imports et la liste des composants
  let importsCode = "";
  let listCode = "const components = [\n";
  for (const component of components) {
    const impPath = getImportPath(projectRoot, outputPath, component.path);
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
  fs.ensureDir(outputDir);
  fs.writeFileSync(
    outputPath,
    importsCode + "\n" + listCode + content,
    "utf-8"
  );
};

// Mocks pour utils.ts
export const normalizePath = (path: string): string => {
  return path.replace(/\\/g, "/");
};

export const extractComponentName = (filePath: string): string => {
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

export const extractCategory = (
  filePath: string,
  categories?: Record<string, string>
): string => {
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

export const getImportPath = (
  projectRoot: string,
  outputPath: string,
  componentPath: string
): string => {
  const outputDir = outputPath.split("/").slice(0, -1).join("/");
  let importPath = componentPath.replace(/\.(tsx|ts)$/, "");

  // Supprimer 'index' final pour les composants index.tsx
  if (importPath.endsWith("/index")) {
    importPath = importPath.replace(/\/index$/, "");
  }

  // Calculer le chemin relatif
  const relativePath = "../".repeat(
    outputDir.replace(projectRoot, "").split("/").filter(Boolean).length
  );
  return relativePath + importPath;
};
