/**
 * TP « Mutation Arena » — kata du Bowling.
 *
 * ⚠️ CETTE IMPLÉMENTATION EST CORRECTE ET COMPLÈTE. On n'y touche pas.
 * Le but du TP n'est PAS de coder, mais de mesurer la qualité d'une suite de
 * tests : Stryker va injecter des bugs (mutants) dans ce fichier et vérifier si
 * vos tests les attrapent. Tout mutant « survivant » = un trou dans vos tests.
 *
 * Règles du bowling :
 *   - 10 frames. Dans une frame, on lance 1 ou 2 fois pour faire tomber 10 quilles.
 *   - Spare  : 10 quilles en 2 lancers  -> bonus = le lancer suivant.
 *   - Strike : 10 quilles au 1er lancer -> bonus = les 2 lancers suivants.
 *   - Score parfait (12 strikes) = 300.
 *
 * Voir src/tp-mutation-arena/README.md pour les règles du jeu.
 */
export class BowlingGame {
  private readonly rolls: number[] = [];

  public roll(pins: number): void {
    this.rolls.push(pins);
  }

  public score(): number {
    let total = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        total += 10 + this.strikeBonus(rollIndex);
        rollIndex += 1;
      } else if (this.isSpare(rollIndex)) {
        total += 10 + this.spareBonus(rollIndex);
        rollIndex += 2;
      } else {
        total += this.openFrameScore(rollIndex);
        rollIndex += 2;
      }
    }

    return total;
  }

  private isStrike(rollIndex: number): boolean {
    return this.pinsAt(rollIndex) === 10;
  }

  private isSpare(rollIndex: number): boolean {
    return this.pinsAt(rollIndex) + this.pinsAt(rollIndex + 1) === 10;
  }

  private strikeBonus(rollIndex: number): number {
    return this.pinsAt(rollIndex + 1) + this.pinsAt(rollIndex + 2);
  }

  private spareBonus(rollIndex: number): number {
    return this.pinsAt(rollIndex + 2);
  }

  private openFrameScore(rollIndex: number): number {
    return this.pinsAt(rollIndex) + this.pinsAt(rollIndex + 1);
  }

  private pinsAt(rollIndex: number): number {
    return this.rolls[rollIndex] ?? 0;
  }
}
