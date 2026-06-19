// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // dist = build output; jest.config.js is a CommonJS tooling file that
    // legitimately uses require() and is not part of the linted app source.
    ignores: ["dist/**", "node_modules/**", "jest.config.js"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
);
