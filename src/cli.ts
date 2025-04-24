#!/usr/bin/env node
import { Command } from "commander";
import { generateSandboxPage } from "./generator";

const program = new Command();

program.version("1.0.0");

program
  .command("init")
  .description("Initialise la sandbox NextSandbox")
  .action(async () => {
    console.log("DEBUG: Entrée dans l'action init.");
    console.log("Initialisation de NextSandbox...");
    try {
      console.log("DEBUG: Appel de generateSandboxPage...");
      await generateSandboxPage();
      console.log("DEBUG: generateSandboxPage terminé.");
      console.log("NextSandbox initialisé avec succès.");
    } catch (error) {
      console.error("Erreur lors de l'initialisation:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
