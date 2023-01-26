module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  plugins: [require.resolve("prettier-plugin-svelte")],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
