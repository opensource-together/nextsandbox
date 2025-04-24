import glob from "glob";
import path from "path";
import { loadConfig, SandboxConfig } from "./config";

// Interface pour les métadonnées d'un composant
export interface ComponentMeta {
  name: string;
  filePath: string;
  category: string;
}

// Fonction pour scanner les composants
export function scanComponents(): ComponentMeta[] {
  const config: SandboxConfig = loadConfig();
  const components: ComponentMeta[] = [];

  // Pour chaque dossier à scanner, on recherche récursivement les fichiers .tsx et .jsx
  for (const dir of config.scanDirs) {
    // Construire le pattern glob (par exemple, src/ui/**/*.tsx)
    const pattern = path.join(dir, "**", "*.{tsx,jsx}");

    // Construire les patterns d'exclusion à partir de config.exclude
    const ignorePatterns = (config.exclude || []).map((ex) => `**/${ex}/**`);

    // Récupérer la liste des fichiers correspondants
    const matches = glob.sync(pattern, { ignore: ignorePatterns });

    for (const filePath of matches) {
      // Extraire le nom du composant depuis le nom de fichier (sans extension)
      const name = path.basename(filePath, path.extname(filePath));

      // Déduire une catégorie basée sur le dossier parent (si possible)
      const segments = filePath.split(path.sep);
      const category =
        segments.length >= 2 ? segments[segments.length - 2] : "default";

      components.push({ name, filePath, category });
    }
  }

  return components;
}
