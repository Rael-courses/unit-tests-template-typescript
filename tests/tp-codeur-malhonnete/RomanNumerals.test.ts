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
  it("convertit 1 en 'I'", () => {
    expect(romanNumerals.convert(1)).toBe("I");
  });

  // ⬇️ À toi de jouer : ajoute ci-dessous LE test qui démasque la triche.
  //    (un seul test à la fois, puis relance `npm test` et observe la triche suivante)
});
