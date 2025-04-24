import { SandboxConfig, ComponentMeta } from "./types";
/**
 * Scanne les composants selon la configuration
 *
 * @param config Configuration de la sandbox
 * @returns Liste des métadonnées des composants trouvés
 */
export declare const scanComponents: (config: SandboxConfig) => Promise<ComponentMeta[]>;
