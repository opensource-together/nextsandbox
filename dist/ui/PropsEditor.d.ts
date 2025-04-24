import React from "react";
interface PropDefinition {
    name: string;
    type: "string" | "number" | "boolean" | "select";
    defaultValue?: any;
    options?: string[];
}
interface PropsEditorProps {
    propDefinitions: PropDefinition[];
    onChange: (props: Record<string, any>) => void;
}
/**
 * Éditeur de props interactif
 */
export declare const PropsEditor: React.FC<PropsEditorProps>;
export default PropsEditor;
