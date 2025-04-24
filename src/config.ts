/*
 * Fichier: src/config.ts
 * Rôle: Gérer la configuration utilisateur pour NextSandbox.
 * Ce fichier charge le fichier de configuration 'sandbox.config.js' s'il existe,
 * et fournit des valeurs par défaut sinon.
 */

import fs from "fs-extra";
import path from "path";

// Définition de l'interface de la configuration.
export interface SandboxConfig {
  // Liste des dossiers à scanner pour détecter les composants.
  scanDirs: string[];
  // Liste des motifs de fichiers ou dossiers à exclure du scan.
  exclude?: string[];
}

// Configuration par défaut.
const defaultConfig: SandboxConfig = {
  scanDirs: ["src/ui", "src/shared"],
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
