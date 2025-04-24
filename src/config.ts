/*
 * Fichier: src/config.ts
 * Rôle: Gérer la configuration utilisateur pour NextSandbox.
 * Ce fichier charge le fichier de configuration 'sandbox.config.js' s'il existe,
 * et fournit des valeurs par défaut sinon.
 */

import fs from "fs-extra";
import path from "path";
import { SandboxConfig } from "./types";

// Configuration par défaut.
const defaultConfig: SandboxConfig = {
  componentDirs: ["src/ui/**/*.tsx", "src/shared/**/*.tsx"],
  exclude: ["node_modules", "dist"],
};

// Fonction pour charger la configuration.
export function loadConfig(): SandboxConfig {
  const configPath = path.resolve(process.cwd(), "sandbox.config.js");

  if (fs.existsSync(configPath)) {
    try {
      // Importation dynamique du fichier de configuration.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const userConfig: Partial<SandboxConfig> = require(configPath);

      // Support des anciennes configurations utilisant scanDirs
      if (userConfig.scanDirs && !userConfig.componentDirs) {
        userConfig.componentDirs = userConfig.scanDirs;
      }

      return { ...defaultConfig, ...userConfig };
    } catch (error) {
      console.error("Erreur lors du chargement de sandbox.config.js:", error);
      return defaultConfig;
    }
  } else {
    // Aucune configuration trouvée, retourner la configuration par défaut.
    return defaultConfig;
  }
}

// Fonction pour valider la configuration
export function validateConfig(config: SandboxConfig): boolean {
  // Vérifier que componentDirs existe et est un tableau non vide
  if (
    !config.componentDirs ||
    !Array.isArray(config.componentDirs) ||
    config.componentDirs.length === 0
  ) {
    throw new Error(
      "La configuration doit contenir au moins un pattern de recherche de composants dans componentDirs"
    );
  }

  return true;
}
