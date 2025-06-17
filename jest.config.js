/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  setupFiles: ["<rootDir>/jest.setup.ts"],

  //  make Jest read the alias straight from tsconfig
  modulePaths: [compilerOptions.baseUrl], // "=" "."
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: "<rootDir>/" } // absolute on disk
  ),
};
