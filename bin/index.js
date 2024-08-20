#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import gradient from "gradient-string";
import simpleGit from "simple-git";
import figlet from "figlet";

const git = simpleGit();

const gradientText = gradient(["#FC466B", "#3F5EFB"]);

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const line = () => console.log(chalk.blue("-------------------- \n"));

const welcome = async () => {
  console.log(gradientText(figlet.textSync("Dynamic JSON Starter", { horizontalLayout: "full" })));
  console.log(gradientText("Welcome to Dynamic JSON Starter!"));
  console.log(chalk.yellow("Easily start your next React TypeScript project with dynamic JSON features."));
  line();
  await sleep(1000);
};

const QUESTIONS = [
  {
    type: "list",
    name: "template",
    message: "Which template would you like to use?",
    choices: ["react-ts"],
  },
  {
    type: "input",
    name: "projectName",
    message: "Enter your project name:",
    default: "my-new-app",
  },
];

const askFeature = async () => {
  const answers = await inquirer.prompt(QUESTIONS);

  const projectPath = path.join(process.cwd(), answers.projectName);
  await cloneRepo(answers.template, projectPath);
};

async function cloneRepo(template, targetPath) {
  const repoUrl = "https://github.com/HtetKo510217/dynamic-json-demo-app.git";
  
  console.log(gradientText(`Downloading ${template} ...`));
  await git.clone(repoUrl, targetPath);

  console.log(chalk.green("✔ Template successfully downloaded."));
  console.log(chalk.blue(`Navigate to your project directory using:\n`));
  console.log(chalk.cyan(`cd ${targetPath}`));
  console.log(chalk.blue(`\nTo get started, run:\n`));
  console.log(chalk.cyan(`cd ${targetPath}`));
  console.log(chalk.cyan(`npm install`));
  console.log(chalk.cyan(`npm start`));
}

(async () => {
  await welcome();
  await askFeature();
})();
