const { program } = require("commander"); // 终端输入框架
const chalk = require("chalk"); // 美化终端
const symbols = require("log-symbols"); // 美化终端
const handlebars = require("handlebars"); //修改模版文件内容
const inquirer = require("inquirer"); // 提示文本
const fs = require("fs");
const path = require("path");

const pageTemp = require("./temp/page.template");
const componentTemp = require("./temp/component.template");

const pageRe = new RegExp("^[a-z-]+$");
const componentRe = new RegExp("^[A-Z][a-zA-Z]+$");

const writeFile = (path, content) => {
  const error = (error) => error && console.log("error in create");
  fs.writeFile(path, content, "utf8", error);
  fs.writeFile(path, content, "utf8", error);
};

program.command("page <name>").action((name) => {
  if (!pageRe.test(name)) {
    console.log(symbols.error, chalk.red("The page's name only support [a-z-]"));
    return;
  }

  const changeName = {
    name: name,
    Name: name.replace(/(-|\b)(\b)([a-z])([a-z]*)/g, ($0, $1, $2, $3, $4) => `${$3.toUpperCase()}${$4}`),
  };
  const dirPath = `src/pages/${changeName.name}`;

  if (!fs.existsSync(dirPath)) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "type",
          message: "是否需要测试单元?",
          choices: ["yes", "no"],
        },
      ])
      .then((answers) => {
        const tsxResult = handlebars.compile(pageTemp.tsx)(changeName);
        const styleResult = handlebars.compile(pageTemp.style)(changeName);
        const testResult = handlebars.compile(pageTemp.test)(changeName);

        fs.mkdir(dirPath, (err) => {
          if (err) return console.log(symbols.error, chalk.red("The dir is't existed"));
          writeFile(`${dirPath}/${changeName.name}.tsx`, tsxResult);
          writeFile(`${dirPath}/${changeName.name}.scss`, styleResult);
          if (answers.type === "yes") {
            writeFile(`${dirPath}/${changeName.name}.test.tsx`, testResult);
          }
        });
      });
  } else {
    console.log(symbols.error, chalk.red("The dir is existed"));
  }
});

program.command("component <name>").action((name) => {
  if (!componentRe.test(name)) {
    console.log(symbols.error, chalk.red("The component's name only support [a-zA-Z]"));
    return;
  }

  const changeName = {
    name: (() => {
      const str = name.replace(/([A-Z])([a-z]*)/g, ($0, $1, $2) => `${$1.toLowerCase()}${$2}-`);
      return str.slice(0, str.length - 1);
    })(),
    Name: name,
  };
  const dirPath = `src/components/${changeName.Name}`;

  if (!fs.existsSync(dirPath)) {
    const tsxResult = handlebars.compile(componentTemp.tsx)(changeName);
    const styleResult = handlebars.compile(componentTemp.style)(changeName);

    fs.mkdir(dirPath, (err) => {
      if (err) return console.log(symbols.error, chalk.red("The dir is't existed"));
      writeFile(`${dirPath}/${changeName.Name}.tsx`, tsxResult);
      writeFile(`${dirPath}/${changeName.Name}.scss`, styleResult);
    });
  } else {
    console.log(symbols.error, chalk.red("The dir is existed"));
  }
});

program.parse(process.argv);
