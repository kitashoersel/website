module.exports = {
  env: { browser: true, es2020: true, node: true },
  ignorePatterns: ["*.mjs", "*.cjs", "**/*.js"],
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
    "eslint:recommended",
    "plugin:svelte/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    // Most of the files will probably get extended in the future, which
    // could result into multiple refactoring. Named exports can also help
    // with tree shaking. Thats why they are preferred in general.
    "import/prefer-default-export": "off",

    // Because svelte bundles all relevant dependencies into it's build
    // directory, the node_modules folder is in either case	development only.
    "import/no-extraneous-dependencies": "off",

    // Svelte lets typescript handle the extension names, so they are not needed
    // for the bundle to work.
    "import/extensions": "off",

    // Creating svelte actions sometimes results into overriding properties of
    // an HTML Element which in this case counts as param reassign. There is
    // no better way of doing this.
    "no-param-reassign": "off",

    // Unnamed arrow functions are preferred generally. However sometimes the
    // access to the `this` property, which is only accessible with `function` keyword.
    "func-names": "off",

    // Sometimes it is just not possible for a value to be null, based on the code before.
    // Typescript doesn't have the ability to detect these cases. Then it's ok to use a no
    // null assertion.
    "@typescript-eslint/no-non-null-assertion": "off",

    // This rule is enabled to prevent typos. It shows an error because it's likely possible,
    // that you didn't want to return an assignment, instead wanted to use the comparison operator.
    // These issues should get caught by typings. Also sometimes it allows to write shorter and more
    // readable code.
    "no-return-assign": "off",
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: { parser: "@typescript-eslint/parser" },
      rules: {
        // Being aware of `{@html}` possible leading to XSS attack. This tag
        // is only used for authorized cms content.
        "svelte/no-at-html-tags": "off",

        // Import resolver doesn't work with svelte files. So it gets disabled
        // completely.
        "import/no-unresolved": "off",

        // Exporting mutable let bindings is a essential feature of svelte and should
        // not throw linting errors.
        "import/no-mutable-exports": "off",

        // Sometimes you want to loop n times inside a svelte component with code
        // like this `{#each { length:n } as _, i}` which results into _ being unused.
        // However there is no other reasonable way of do
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
