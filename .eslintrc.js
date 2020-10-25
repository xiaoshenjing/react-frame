module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  ignorePatterns: ["dist"],
  rules: {
    "prettier/prettier": [
      // 内部配置 prettier
      1,
      {
        printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为80
        singleQuote: false, // 字符串是否使用单引号，默认为false，使用双引号
        trailingComma: "es5", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
        bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
        jsxBracketSameLine: true, // JSX 标签闭合位置，默认false，换行闭合
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
  },
  overrides: [
    {
      files: ".eslintrc.js",
      rules: {
        "no-undef": 0,
      },
    },
    {
      files: ["template/*.js", "webpack.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": 0,
      },
    },
  ],
};
