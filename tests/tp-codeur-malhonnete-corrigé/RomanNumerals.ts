/**
 * TP « L'IA, le codeur malhonnête ».
 *
 * Ce fichier est le terrain de jeu de l'IA. Les élèves n'y touchent JAMAIS :
 * ils n'écrivent que des tests. C'est l'IA (jouant le codeur paresseux et
 * malhonnête) qui modifie ce fichier pour faire passer les tests avec le
 * minimum absolu de code — quitte à tricher honteusement.
 *
 */
export class RomanNumerals {
  private static readonly NUMERALS: ReadonlyArray<[number, string]> = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  public convert(n: number): string {
    let remaining = n;
    let result = "";
    for (const [value, symbol] of RomanNumerals.NUMERALS) {
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }
    return result;
  }
}
