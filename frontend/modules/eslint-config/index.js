module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    project: "./tsconfig.json",
    extraFileExtensions: [".svelte"],
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:svelte/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:eslint-comments/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import", "eslint-plugin-tsdoc"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".json"],
      },
      typescript: {},
    },
    "import/extensions": [".js", ".ts"],
  },
  rules: {
    // TypeScript
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "tsdoc/syntax": "warn",
    // Svelte
    "new-cap": "off",
    "import/no-extraneous-dependencies": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "eslint-comments/disable-enable-pair": "off",
    "import/extensions": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "no-param-reassign": "off",
    "import/no-mutable-exports": "off",
    "import/extensions": "off",
    "svelte/no-at-html-tags": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // v4 changes
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  ignorePatterns: [
    "*.mjs",
    "*.cjs",
    "**/*.js",
    "svelte.config.js",
    "vite.config.js",
    "tailwind.config.cjs",
  ],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
};
