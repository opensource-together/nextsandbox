import fs from "fs-extra";
import * as glob from "glob";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { SandboxConfig, ComponentMeta } from "./types";
import {
  normalizePath,
  extractComponentName,
  extractCategory,
  generateComponentId,
} from "./utils";

/**
 * Scanne les composants selon la configuration
 *
 * @param config Configuration de la sandbox
 * @returns Liste des métadonnées des composants trouvés
 */
export const scanComponents = async (
  config: SandboxConfig
): Promise<ComponentMeta[]> => {
  const components: ComponentMeta[] = [];
  const workingDir = process.cwd();

  // Récupérer les répertoires à scanner
  const componentDirs = config.componentDirs || [];
  const excludePatterns = config.exclude || [];

  // Scanner chaque dossier de composants
  for (const pattern of componentDirs) {
    try {
      // Utiliser glob pour trouver les fichiers selon le pattern
      const files = glob.sync(pattern, {
        cwd: workingDir,
        ignore: excludePatterns,
        absolute: false,
      });

      // Parcourir les fichiers trouvés
      for (const file of files) {
        try {
          const filePath = path.join(workingDir, file);

          // Vérifier si c'est un fichier avant de lire
          if (!fs.statSync(filePath).isFile()) {
            continue; // Passer au suivant si c'est un répertoire
          }

          const normalizedPath = normalizePath(file);
          const name = extractComponentName(normalizedPath);
          const category = extractCategory(normalizedPath, config.categories);
          const id = generateComponentId(name, normalizedPath);

          // Lire le contenu du fichier pour extraire des informations supplémentaires
          const content = fs.readFileSync(filePath, "utf-8");

          // Déterminer le nom d'export (si différent du nom du fichier)
          // Cette détection est simplifiée, une analyse plus robuste pourrait être implémentée
          let exportName = name;

          if (content.includes(`export default ${name}`)) {
            exportName = name;
          } else if (
            content.match(/export default function\s+([A-Za-z0-9_]+)/)
          ) {
            const match = content.match(
              /export default function\s+([A-Za-z0-9_]+)/
            );
            if (match && match[1]) {
              exportName = match[1];
            }
          }

          // Ajouter le composant à la liste
          components.push({
            id,
            name,
            path: normalizedPath,
            category,
            exportName,
          });
        } catch (error) {
          console.warn(`Erreur lors de l'analyse du fichier ${file}: ${error}`);
        }
      }
    } catch (error) {
      console.error(`Erreur lors du scanning du pattern ${pattern}: ${error}`);
    }
  }

  return components;
};
