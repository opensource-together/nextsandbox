import { Command } from "commander";

const program = new Command();

program.version("1.0.0");

program.command("init").description("Initalise la sandbox");

program.parse(process.argv);
