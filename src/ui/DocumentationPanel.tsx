import React, { useState } from "react";

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
export const DocumentationPanel: React.FC<DocumentationPanelProps> = ({
  componentName,
  description,
  usage,
  props = [],
  sections = [],
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "props" | "examples">(
    "overview"
  );

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="border-b px-4 py-3 bg-gray-50">
        <h2 className="text-lg font-medium text-gray-900">{componentName}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>

      <div className="border-b">
        <nav className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Aperçu
          </button>
          {props.length > 0 && (
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "props"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("props")}
            >
              Propriétés
            </button>
          )}
          {usage && (
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "examples"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("examples")}
            >
              Exemples
            </button>
          )}
        </nav>
      </div>

      <div className="p-4">
        {activeTab === "overview" && (
          <div className="prose prose-sm max-w-none">
            {sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "props" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nom
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Requis
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Par défaut
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.map((prop) => (
                  <tr key={prop.name}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {prop.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      <code className="px-1 py-0.5 bg-gray-100 rounded text-sm">
                        {prop.type}
                      </code>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {prop.required ? "Oui" : "Non"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {prop.defaultValue || "-"}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "examples" && usage && (
          <div className="prose prose-sm max-w-none">
            <h3 className="text-base font-medium text-gray-900 mb-2">
              Utilisation
            </h3>
            <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
              {usage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationPanel;
