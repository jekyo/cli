module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
    sourceType: "module",
    ecmaVersion: "2018",
  },
  extends: ["prettier"],
  plugins: [],

  // add your custom rules here
  rules: {
    quotes: ["warn", "double"],
    "no-var": ["error"],
    "no-console": ["off"],
    "no-unused-vars": ["warn"],
    "no-mixed-spaces-and-tabs": ["warn"],
    "object-shorthand": 0,
  },
}
