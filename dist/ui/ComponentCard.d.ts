import React from "react";
interface ComponentCardProps {
    name: string;
    description?: string;
    category?: string;
    component: React.ReactNode;
}
/**
 * Carte pour afficher un composant dans la sandbox
 */
export declare const ComponentCard: React.FC<ComponentCardProps>;
export default ComponentCard;
