/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// Config Jest dédiée à Stryker : on ne lance QUE les tests de la mutation arena.
// Le reste de la suite (ex. tp-codeur-malhonnete, volontairement non implémenté)
// ferait échouer le dry-run initial de Stryker.
const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  roots: ["<rootDir>/tests/tp-mutation-arena"],
};
