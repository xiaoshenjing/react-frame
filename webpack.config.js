const path = require("path");
const resolve = (dir) => path.join(__dirname, `./${dir}`);

module.exports = (config, env) => {
  console.log(config);
  config.resolve.alias = {
    ...config.resolve.alias,
    src: resolve("src"),
  };
  return config;
};
