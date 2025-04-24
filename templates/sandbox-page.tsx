import React, { useState } from "react";
import { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";

// Placeholder pour les imports dynamiques des composants
// __COMPONENT_IMPORTS__

// Types
type ComponentMeta = {
  id: string;
  name: string;
  path: string;
  category: string;
  component: React.ComponentType<any>;
};

interface ComponentCardProps {
  component: ComponentMeta;
  onClick: () => void;
}

interface ComponentPreviewProps {
  component: ComponentMeta;
  onBack: () => void;
}

// Liste des composants (sera remplacée par les imports dynamiques)
// Cette déclaration sera remplacée lors de la génération
const components: ComponentMeta[] = [];
// __COMPONENT_LIST__

const SandboxPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentMeta | null>(null);

  // Extraire les catégories uniques
  const categories: string[] = [
    "all",
    ...Array.from(new Set(components.map((c: ComponentMeta) => c.category))),
  ];

  // Filtrer les composants en fonction des termes de recherche et de la catégorie
  const filteredComponents = components.filter((component: ComponentMeta) => {
    const matchesSearch = component.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          NextSandbox
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explorez et testez vos composants UI
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar avec recherche et filtres */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
              <input
                type="text"
                placeholder="Rechercher un composant..."
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
              <h3 className="font-medium mb-3 text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Catégories
              </h3>
              <div className="space-y-1">
                {categories.map((category: string) => (
                  <button
                    key={category}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "Tous les composants" : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {selectedComponent ? (
            <ComponentPreview
              component={selectedComponent}
              onBack={() => setSelectedComponent(null)}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredComponents.map(
                  (component: ComponentMeta, index: number) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <SandboxGridCard
                        component={component}
                        onClick={() => setSelectedComponent(component)}
                      />
                    </motion.div>
                  )
                )}
              </AnimatePresence>

              {filteredComponents.length === 0 && (
                <div className="col-span-full flex justify-center items-center p-12 text-gray-500 dark:text-gray-400">
                  Aucun composant trouvé.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Composant pour afficher un composant dans la grille
const SandboxGridCard: React.FC<ComponentCardProps> = ({
  component,
  onClick,
}) => {
  const Component = component.component;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow p-4 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
        <h3 className="font-medium">{component.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {component.category}
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
        <div className="preview">
          <Component />
        </div>
      </div>
    </div>
  );
};

// Composant pour l'aperçu et l'édition d'un composant sélectionné
const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  component,
  onBack,
}) => {
  const [props, setProps] = useState<Record<string, any>>({});
  const [viewMode, setViewMode] = useState<"preview" | "responsive" | "docs">(
    "preview"
  );
  const Component = component.component;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour
        </button>

        <h2 className="font-bold text-xl">{component.name}</h2>

        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              viewMode === "preview"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setViewMode("preview")}
          >
            Aperçu
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              viewMode === "responsive"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setViewMode("responsive")}
          >
            Responsive
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              viewMode === "docs"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setViewMode("docs")}
          >
            Documentation
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Aperçu du composant */}
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-8 flex items-center justify-center min-h-[300px]">
            {viewMode === "preview" && <Component {...props} />}

            {viewMode === "responsive" && (
              <div className="space-y-8 w-full">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Mobile (320px)</p>
                  <div className="w-[320px] mx-auto p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Component {...props} />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Tablette (768px)</p>
                  <div className="w-full max-w-[768px] mx-auto p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Component {...props} />
                  </div>
                </div>
              </div>
            )}

            {viewMode === "docs" && (
              <div className="w-full p-6 text-center text-gray-500">
                Documentation à implémenter
              </div>
            )}
          </div>
        </div>

        {/* Éditeur de props */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4">
            <h3 className="font-medium mb-4">Propriétés</h3>
            <p className="text-gray-500 text-sm">
              L'éditeur de props sera implémenté dynamiquement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SandboxPage;
