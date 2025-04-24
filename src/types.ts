/**
 * Définitions de types pour NextSandbox
 */

/**
 * Configuration principale de NextSandbox
 */
export interface SandboxConfig {
  /**
   * Patterns glob pour les répertoires contenant des composants
   * (alias de scanDirs pour compatibilité)
   */
  componentDirs: string[];

  /**
   * Chemins des dossiers à scanner pour trouver des composants
   * (pour compatibilité avec version précédente)
   */
  scanDirs?: string[];

  /**
   * Patterns glob pour exclure certains fichiers
   */
  exclude?: string[];

  /**
   * Mapping des catégories personnalisées aux chemins
   */
  categories?: Record<string, string>;

  // Options spécifiques à la présentation des composants
  display?: {
    // Titre de la page sandbox
    title?: string;
    // Description de la page sandbox
    description?: string;
    // Mode d'affichage par défaut (grid ou list)
    defaultView?: "grid" | "list";
    // Thème par défaut (light ou dark)
    theme?: "light" | "dark";
    // Taille de la grille en mode grid
    gridColumns?: number;
  };
}

/**
 * Métadonnées d'un composant détecté
 */
export interface ComponentMeta {
  /**
   * Identifiant unique du composant
   */
  id: string;

  /**
   * Nom du composant
   */
  name: string;

  /**
   * Chemin relatif du fichier du composant
   * (sera la source de vérité)
   */
  path: string;

  /**
   * Catégorie du composant
   */
  category: string;

  /**
   * Nom d'export du composant si différent du nom
   */
  exportName?: string;

  // Chemin du fichier (obsolète, utiliser path)
  filePath?: string;

  // Description du composant (si disponible dans les commentaires du code)
  description?: string;

  // Chemin d'importation utilisable dans React
  importPath?: string;

  // Tags associés au composant
  tags?: string[];
}

/**
 * Propriété d'un composant
 */
export interface ComponentProp {
  // Nom de la propriété
  name: string;
  // Type de la propriété (string, number, boolean, etc.)
  type: string;
  // Description de la propriété
  description?: string;
  // Si la propriété est requise
  required?: boolean;
  // Valeur par défaut
  defaultValue?: any;
}

/**
 * Structure d'un exemple de code pour un composant
 */
export interface ComponentExample {
  // Titre de l'exemple
  title: string;
  // Code de l'exemple
  code: string;
  // Description de l'exemple
  description?: string;
}

/**
 * Documentation complète d'un composant
 */
export interface ComponentDoc {
  // Métadonnées du composant
  meta: ComponentMeta;
  // Liste des propriétés du composant
  props?: ComponentProp[];
  // Exemples d'utilisation du composant
  examples?: ComponentExample[];
  // Sections de documentation supplémentaires
  sections?: Array<{
    title: string;
    content: string;
  }>;
}

/**
 * État global de la page sandbox
 */
export interface SandboxState {
  // Composants actuellement affichés
  components: ComponentMeta[];
  // Composants filtrés (après recherche)
  filteredComponents?: ComponentMeta[];
  // Terme de recherche actuel
  searchTerm?: string;
  // Catégorie de filtre actuelle
  currentCategory?: string;
  // Composant actuellement sélectionné pour affichage détaillé
  selectedComponent?: ComponentMeta;
}

/**
 * Types d'événements possibles dans la sandbox
 */
export enum SandboxEventType {
  COMPONENT_SELECT = "component-select",
  SEARCH = "search",
  FILTER_CATEGORY = "filter-category",
  THEME_CHANGE = "theme-change",
  VIEW_MODE_CHANGE = "view-mode-change",
}
