/**
 * Normalise un chemin de fichier en utilisant des slashes forward
 *
 * @param filePath Chemin à normaliser
 * @returns Chemin normalisé
 */
export declare const normalizePath: (filePath: string) => string;
/**
 * Extrait un nom de composant à partir du chemin du fichier
 *
 * @param filePath Chemin du fichier
 * @returns Nom du composant
 */
export declare const extractComponentName: (filePath: string) => string;
/**
 * Extrait la catégorie d'un composant à partir de son chemin
 *
 * @param filePath Chemin du fichier
 * @param categories Configuration des catégories personnalisées
 * @returns Nom de la catégorie
 */
export declare const extractCategory: (filePath: string, categories?: Record<string, string>) => string;
/**
 * Génère un chemin d'import relatif depuis la page sandbox vers un composant
 *
 * @param projectRoot Racine du projet
 * @param outputPath Chemin de la page sandbox générée
 * @param componentPath Chemin du composant
 * @returns Chemin d'import relatif
 */
export declare const getImportPath: (projectRoot: string, outputPath: string, componentPath: string) => string;
/**
 * Génère un identifiant unique pour un composant
 *
 * @param name Nom du composant
 * @param path Chemin du fichier
 * @returns Identifiant unique
 */
export declare const generateComponentId: (name: string, filePath: string) => string;
/**
 * Met en majuscule la première lettre d'une chaîne
 *
 * @param str Chaîne à traiter
 * @returns Chaîne avec première lettre en majuscule
 */
export declare const capitalizeFirstLetter: (str: string) => string;
/**
 * Vérifie si un fichier est un composant React
 * (basé sur son extension et son contenu)
 */
export declare function isReactComponent(filePath: string): boolean;
/**
 * Convertit un chemin relatif à la racine du projet en chemin d'importation pour React
 */
export declare function filePathToImportPath(filePath: string, rootDir?: string): string;
/**
 * Formate proprement les noms de composants (PascalCase)
 */
export declare function formatComponentName(name: string): string;
