import React from "react";
interface DocSection {
    title: string;
    content: string;
}
interface DocumentationPanelProps {
    componentName: string;
    description?: string;
    usage?: string;
    props?: Array<{
        name: string;
        type: string;
        description: string;
        required?: boolean;
        defaultValue?: string;
    }>;
    sections?: DocSection[];
}
/**
 * Panneau d'affichage de la documentation des composants
 */
export declare const DocumentationPanel: React.FC<DocumentationPanelProps>;
export default DocumentationPanel;
