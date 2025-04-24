import fs from "fs-extra";
import path from "path";
import { scanComponents } from "./scanner";
import { loadConfig } from "./config";
import { normalizePath } from "./utils";

// Calculer le chemin du template par rapport à l'emplacement du script actuel
// __dirname pointe vers le dossier 'dist' quand le code est exécuté depuis node_modules
const PACKAGE_ROOT_DIR = path.resolve(__dirname, ".."); // Remonte d'un niveau (de 'dist' à la racine du package)
const TEMPLATE_PATH = path.join(
  PACKAGE_ROOT_DIR,
  "templates",
  "sandbox-page.tsx"
);

// L'OUTPUT_PATH doit toujours être relatif au CWD de l'utilisateur
const OUTPUT_DIR = path.resolve(process.cwd(), "app", "sandbox");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "page.tsx");

export async function generateSandboxPage(): Promise<void> {
  console.log("DEBUG: Entrée dans generateSandboxPage.");
  console.log(`DEBUG: Recherche du template à : ${TEMPLATE_PATH}`);
  let templateContent = "";

  // Vérifier si le template existe; sinon, afficher une erreur et arrêter
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Template not found at: ${TEMPLATE_PATH}`);
    console.error(`__dirname: ${__dirname}`);
    console.error(`PACKAGE_ROOT_DIR: ${PACKAGE_ROOT_DIR}`);
    process.exit(1);
  }
  templateContent = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  // Charger la configuration
  const config = loadConfig();

  // Récupérer les composants scannés
  const allComponents = await scanComponents(config);
  console.log(
    `DEBUG: ${allComponents.length} composants trouvés par le scanner au total.`
  );

  // Filtrer les composants pour exclure ceux dans src/ui
  const componentsToDisplay = allComponents.filter(
    (c) => !normalizePath(c.path).startsWith("src/ui/")
  );
  console.log(
    `DEBUG: ${componentsToDisplay.length} composants seront affichés dans la sandbox.`
  );

  // Générer le code d'importation et la liste JS
  let importsCode = "";
  let listCode = "";

  componentsToDisplay.forEach((c) => {
    // Calculer le chemin relatif depuis le dossier de sortie vers le composant
    const relativePath = normalizePath(
      path.relative(OUTPUT_DIR, path.resolve(process.cwd(), c.path))
    );
    // Assurer que le chemin commence par ./ ou ../ pour les imports relatifs
    const importPath = relativePath.startsWith(".")
      ? relativePath
      : `./${relativePath}`;
    // Supprimer l'extension pour l'import
    const importPathWithoutExt = importPath.replace(/\.(tsx|jsx|js|ts)$/, "");

    console.log(
      `DEBUG: Génération import pour ${c.name} depuis ${importPathWithoutExt}`
    );
    importsCode += `import ${
      c.exportName || c.name
    } from '${importPathWithoutExt}';\n`;

    // Générer l'entrée pour le tableau JS
    // Assigner le composant importé à la propriété 'component'
    listCode += `  {
    id: '${c.id}',
    name: '${c.name}',
    path: '${c.path}',
    category: '${c.category}',
    component: ${c.exportName || c.name} // Utiliser le nom importé
  },\n`;
  });

  // Remplacer les placeholders DANS le contenu du template
  let generatedContent = templateContent;
  generatedContent = generatedContent.replace(
    "// __COMPONENT_IMPORTS__",
    importsCode
  );
  // Ajouter le tableau généré DANS la déclaration existante
  generatedContent = generatedContent.replace(
    "const components: ComponentMeta[] = [];", // Cibler la déclaration vide
    `const components: ComponentMeta[] = [\n${listCode}];` // Remplacer avec la liste générée
  );
  // Optionnel: Supprimer le placeholder // __COMPONENT_LIST__ s'il existe encore
  generatedContent = generatedContent.replace("// __COMPONENT_LIST__", "");

  // S'assurer que le dossier de sortie existe
  fs.ensureDirSync(OUTPUT_DIR);

  // Écrire le contenu généré dans le fichier de sortie
  fs.writeFileSync(OUTPUT_PATH, generatedContent, "utf-8");

  console.log(`Page Sandbox générée à : ${OUTPUT_PATH}`);
}
