import React, { useState } from "react";

interface PropDefinition {
  name: string;
  type: "string" | "number" | "boolean" | "select";
  defaultValue?: any;
  options?: string[]; // Pour les props de type select
}

interface PropsEditorProps {
  propDefinitions: PropDefinition[];
  onChange: (props: Record<string, any>) => void;
}

/**
 * Éditeur de props interactif
 */
export const PropsEditor: React.FC<PropsEditorProps> = ({
  propDefinitions,
  onChange,
}) => {
  const initialProps = propDefinitions.reduce((acc, prop) => {
    acc[prop.name] = prop.defaultValue;
    return acc;
  }, {} as Record<string, any>);

  const [props, setProps] = useState(initialProps);

  const handleChange = (name: string, value: any) => {
    const newProps = { ...props, [name]: value };
    setProps(newProps);
    onChange(newProps);
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="text-md font-medium text-gray-800 mb-3">Propriétés</h3>
      <div className="space-y-3">
        {propDefinitions.map((prop) => (
          <div key={prop.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {prop.name}
            </label>

            {prop.type === "string" && (
              <input
                type="text"
                value={props[prop.name] || ""}
                onChange={(e) => handleChange(prop.name, e.target.value)}
                className="border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            )}

            {prop.type === "number" && (
              <input
                type="number"
                value={props[prop.name] || 0}
                onChange={(e) =>
                  handleChange(prop.name, Number(e.target.value))
                }
                className="border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            )}

            {prop.type === "boolean" && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={Boolean(props[prop.name])}
                  onChange={(e) => handleChange(prop.name, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {Boolean(props[prop.name]) ? "Activé" : "Désactivé"}
                </span>
              </div>
            )}

            {prop.type === "select" && prop.options && (
              <select
                value={props[prop.name] || ""}
                onChange={(e) => handleChange(prop.name, e.target.value)}
                className="border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {prop.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => setProps(initialProps)}
        className="mt-4 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
      >
        Réinitialiser
      </button>
    </div>
  );
};

export default PropsEditor;
