/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  //  make Jest read the alias straight from tsconfig (paths are prefixed with
  //  ./src/ now that baseUrl is gone — TS 6 deprecated baseUrl)
  modulePaths: ["<rootDir>"],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: "<rootDir>/" } // absolute on disk
  ),
};
