import fs from "fs-extra";
import path from "path";
import { scanComponents } from "./scanner";

// Définir le chemin du template et celui de sortie pour la page sandbox
const TEMPLATE_PATH = path.resolve(
  process.cwd(),
  "templates",
  "sandbox-page.tsx"
);
const OUTPUT_PATH = path.resolve(process.cwd(), "app", "sandbox", "page.tsx");

export function generateSandboxPage(): void {
  let templateContent = "";

  // Vérifier si le template existe; sinon, afficher une erreur et arrêter
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Template not found at: ${TEMPLATE_PATH}`);
    process.exit(1);
  }
  templateContent = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  // Récupérer les composants scannés
  const components = scanComponents();

  // Générer le code d'importation et le rendu des composants
  let importsCode = "";
  let componentsRender = "";

  components.forEach((c) => {
    // Générer une instruction d'importation pour chaque composant
    importsCode += `import ${c.name} from '${c.filePath}';\n`;
    // Générer un bloc de rendu pour le composant
    componentsRender += `<div><h2>${c.name}</h2><${c.name} /></div>\n`;
  });

  // Préparer le contenu généré : on ajoute les imports en haut et on remplace le placeholder
  let generatedContent = `${importsCode}\n` + templateContent;
  generatedContent = generatedContent.replace(
    "<!-- COMPONENTS_RENDER -->",
    componentsRender
  );

  // S'assurer que le dossier de sortie existe
  fs.ensureDirSync(path.dirname(OUTPUT_PATH));

  // Écrire le contenu généré dans le fichier de sortie
  fs.writeFileSync(OUTPUT_PATH, generatedContent, "utf-8");

  console.log(`Page Sandbox générée à : ${OUTPUT_PATH}`);
}
