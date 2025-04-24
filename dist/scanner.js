"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanComponents = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob = __importStar(require("glob"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
/**
 * Scanne les composants selon la configuration
 *
 * @param config Configuration de la sandbox
 * @returns Liste des métadonnées des composants trouvés
 */
const scanComponents = async (config) => {
    const components = [];
    const workingDir = process.cwd();
    // Récupérer les répertoires à scanner
    const componentDirs = config.componentDirs || [];
    const excludePatterns = config.exclude || [];
    // Scanner chaque dossier de composants
    for (const pattern of componentDirs) {
        try {
            // Utiliser glob pour trouver les fichiers selon le pattern
            const files = glob.sync(pattern, {
                cwd: workingDir,
                ignore: excludePatterns,
                absolute: false,
            });
            // Parcourir les fichiers trouvés
            for (const file of files) {
                try {
                    const filePath = path_1.default.join(workingDir, file);
                    // Vérifier si c'est un fichier avant de lire
                    if (!fs_extra_1.default.statSync(filePath).isFile()) {
                        continue; // Passer au suivant si c'est un répertoire
                    }
                    const normalizedPath = (0, utils_1.normalizePath)(file);
                    const name = (0, utils_1.extractComponentName)(normalizedPath);
                    const category = (0, utils_1.extractCategory)(normalizedPath, config.categories);
                    const id = (0, utils_1.generateComponentId)(name, normalizedPath);
                    // Lire le contenu du fichier pour extraire des informations supplémentaires
                    const content = fs_extra_1.default.readFileSync(filePath, "utf-8");
                    // Déterminer le nom d'export (si différent du nom du fichier)
                    // Cette détection est simplifiée, une analyse plus robuste pourrait être implémentée
                    let exportName = name;
                    if (content.includes(`export default ${name}`)) {
                        exportName = name;
                    }
                    else if (content.match(/export default function\s+([A-Za-z0-9_]+)/)) {
                        const match = content.match(/export default function\s+([A-Za-z0-9_]+)/);
                        if (match && match[1]) {
                            exportName = match[1];
                        }
                    }
                    // Ajouter le composant à la liste
                    components.push({
                        id,
                        name,
                        path: normalizedPath,
                        category,
                        exportName,
                    });
                }
                catch (error) {
                    console.warn(`Erreur lors de l'analyse du fichier ${file}: ${error}`);
                }
            }
        }
        catch (error) {
            console.error(`Erreur lors du scanning du pattern ${pattern}: ${error}`);
        }
    }
    return components;
};
exports.scanComponents = scanComponents;
