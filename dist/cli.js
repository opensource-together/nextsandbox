#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const generator_1 = require("./generator");
const program = new commander_1.Command();
program.version("1.0.0");
program
    .command("init")
    .description("Initialise la sandbox NextSandbox")
    .action(async () => {
    console.log("DEBUG: Entrée dans l'action init.");
    console.log("Initialisation de NextSandbox...");
    try {
        console.log("DEBUG: Appel de generateSandboxPage...");
        await (0, generator_1.generateSandboxPage)();
        console.log("DEBUG: generateSandboxPage terminé.");
        console.log("NextSandbox initialisé avec succès.");
    }
    catch (error) {
        console.error("Erreur lors de l'initialisation:", error);
        process.exit(1);
    }
});
program.parse(process.argv);
