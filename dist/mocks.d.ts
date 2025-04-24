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
export declare const init: () => Promise<void>;
export declare const loadConfig: () => SandboxConfig;
export declare const validateConfig: (config: SandboxConfig) => void;
export declare const scanComponents: (config: SandboxConfig) => Promise<ComponentMeta[]>;
export declare const generateSandboxPage: (components: ComponentMeta[]) => Promise<void>;
export declare const normalizePath: (path: string) => string;
export declare const extractComponentName: (filePath: string) => string;
export declare const extractCategory: (filePath: string, categories?: Record<string, string>) => string;
export declare const getImportPath: (projectRoot: string, outputPath: string, componentPath: string) => string;
