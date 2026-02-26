export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        alert: "readonly",
        Blob: "readonly",
        confirm: "readonly",
        crypto: "readonly",
        document: "readonly",
        localStorage: "readonly",
        URL: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["warn", { args: "none" }],
    },
  },
];
