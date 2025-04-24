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
export const ComponentCard: React.FC<ComponentCardProps> = ({
  name,
  description,
  category,
  component,
}) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          {category && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
              {category}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}

        <div className="mt-4 p-6 border rounded-md bg-gray-50 flex items-center justify-center">
          {component}
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;
