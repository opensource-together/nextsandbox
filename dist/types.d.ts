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
    display?: {
        title?: string;
        description?: string;
        defaultView?: "grid" | "list";
        theme?: "light" | "dark";
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
    filePath?: string;
    description?: string;
    importPath?: string;
    tags?: string[];
}
/**
 * Propriété d'un composant
 */
export interface ComponentProp {
    name: string;
    type: string;
    description?: string;
    required?: boolean;
    defaultValue?: any;
}
/**
 * Structure d'un exemple de code pour un composant
 */
export interface ComponentExample {
    title: string;
    code: string;
    description?: string;
}
/**
 * Documentation complète d'un composant
 */
export interface ComponentDoc {
    meta: ComponentMeta;
    props?: ComponentProp[];
    examples?: ComponentExample[];
    sections?: Array<{
        title: string;
        content: string;
    }>;
}
/**
 * État global de la page sandbox
 */
export interface SandboxState {
    components: ComponentMeta[];
    filteredComponents?: ComponentMeta[];
    searchTerm?: string;
    currentCategory?: string;
    selectedComponent?: ComponentMeta;
}
/**
 * Types d'événements possibles dans la sandbox
 */
export declare enum SandboxEventType {
    COMPONENT_SELECT = "component-select",
    SEARCH = "search",
    FILTER_CATEGORY = "filter-category",
    THEME_CHANGE = "theme-change",
    VIEW_MODE_CHANGE = "view-mode-change"
}
