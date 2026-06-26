import { container } from "tsyringe";
import { RomanNumerals } from "./RomanNumerals";

/**
 * 🏴‍☠️ L'IA, le codeur malhonnête — manche chiffres romains.
 *
 * RÈGLE D'OR : l'élève n'écrit QUE des tests dans ce fichier.
 * L'IA, elle, n'a le droit de modifier QUE
 * src/tp-codeur-malhonnete/RomanNumerals.ts, et doit le faire en trichant au
 * maximum (hardcode, if sur les valeurs des tests…) tant qu'un test l'y autorise.
 *
 * Cycle :
 *   1. L'élève écrit UN test (🔴 RED).
 *   2. L'IA le fait passer en trichant le plus possible (🟢 GREEN).
 *   3. L'élève écrit le test suivant qui démasque la triche.
 *   4. Répéter jusqu'à ce que tricher coûte plus cher qu'implémenter pour de vrai.
 *
 * Score de l'équipe = nombre de tests qu'il a fallu écrire pour forcer une
 * implémentation honnête. Moins il en faut, mieux c'est.
 */
describe("RomanNumerals — l'IA codeur malhonnête", () => {
  const romanNumerals = container.resolve(RomanNumerals);

  // 🔴 Test 1 — fourni en exemple. À l'IA de le faire passer… en trichant.
  it.each`
    input    | expected
    ${1}     | ${"I"}
    ${2}     | ${"II"}
    ${3}     | ${"III"}
    ${4}     | ${"IV"}
    ${5}     | ${"V"}
    ${6}     | ${"VI"}
    ${8}     | ${"VIII"}
    ${9}     | ${"IX"}
    ${10}    | ${"X"}
    ${14}    | ${"XIV"}
    ${19}    | ${"XIX"}
    ${30}    | ${"XXX"}
    ${40}    | ${"XL"}
    ${44}    | ${"XLIV"}
    ${49}    | ${"XLIX"}
    ${50}    | ${"L"}
    ${90}    | ${"XC"}
    ${99}    | ${"XCIX"}
    ${100}   | ${"C"}
    ${188}   | ${"CLXXXVIII"}
    ${199}   | ${"CXCIX"}
    ${400}   | ${"CD"}
    ${444}   | ${"CDXLIV"}
    ${500}   | ${"D"}
    ${900}   | ${"CM"}
    ${999}   | ${"CMXCIX"}
    ${1000}  | ${"M"}
    ${1444}  | ${"MCDXLIV"}
    ${1990}  | ${"MCMXC"}
    ${2024}  | ${"MMXXIV"}
    ${3000}  | ${"MMM"}
    ${3888}  | ${"MMMDCCCLXXXVIII"}
    ${3999}  | ${"MMMCMXCIX"}
    ${4000}  | ${"MMMM"}
    ${9000}  | ${"MMMMMMMMM"}
    ${14999} | ${"MMMMMMMMMMMMMMCMXCIX"}
    ${30000} | ${"MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"}
  `("convertit $input en $expected", ({ input, expected }) => {
    expect(romanNumerals.convert(input)).toBe(expected);
  });
});
