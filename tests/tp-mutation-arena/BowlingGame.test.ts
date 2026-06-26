import { container } from "tsyringe";
import { BowlingGame } from "./BowlingGame";

/**
 * 🧬 Mutation Arena — suite de DÉPART (volontairement incomplète).
 *
 * Cette suite est VERTE et couvre ~100 % des lignes de BowlingGame.
 * Pourtant, quand vous lancerez `npm run test:mutation`, Stryker trouvera des
 * mutants SURVIVANTS : la couverture de lignes ment, elle ne prouve pas que vos
 * tests vérifient quoi que ce soit.
 *
 * 🎯 Mission : ajoutez des tests jusqu'à ce que le mutation score atteigne 100 %
 *    (zéro survivant). Ouvrez le rapport HTML pour voir où sont les trous :
 *    reports/mutation/mutation.html
 *
 * 👉 Indice : que se passe-t-il pour une partie PARFAITE ? une partie 100 % de
 *    spares ? les lancers bonus de la 10e frame ?
 */
describe("BowlingGame — mutation arena", () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = container.resolve(BowlingGame);
  });

  const rollMany = (times: number, pins: number): void => {
    for (let i = 0; i < times; i++) {
      game.roll(pins);
    }
  };

  it("score une partie dans le caniveau (que des 0) à 0", () => {
    rollMany(20, 0);

    expect(game.score()).toBe(0);
  });

  it("score une partie de tous les 1 à 20", () => {
    rollMany(20, 1);

    expect(game.score()).toBe(20);
  });

  it("ajoute le bonus du lancer suivant après un spare", () => {
    game.roll(5);
    game.roll(5); // spare
    game.roll(3);
    rollMany(17, 0);

    expect(game.score()).toBe(16); // 10 + 3 (bonus) + 3
  });

  it("ajoute le bonus des deux lancers suivants après un strike", () => {
    game.roll(10); // strike
    game.roll(3);
    game.roll(4);
    rollMany(16, 0);

    expect(game.score()).toBe(24); // 10 + 3 + 4 (bonus) + 3 + 4
  });

  // ⬇️ À toi : ajoute les tests qui tuent les mutants survivants.
});
