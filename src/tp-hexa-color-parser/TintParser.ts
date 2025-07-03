export class TintParser {
  private readonly HexaCharToDecMap: Record<string, number> = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };

  public parse(input: string): number {
    if (input.length === 0) {
      throw new Error("Teinte hexadécimale invalide, teinte vide");
    }

    const firstChar = input[0];
    const secondChar = input[1];
    if (
      firstChar === undefined ||
      secondChar === undefined ||
      input.length !== 2
    ) {
      throw new Error(
        "Teinte hexadécimale invalide, la teinte doit contenir 2 caractères"
      );
    }

    const firstCharDecValue = this.HexaCharToDecMap[firstChar.toUpperCase()];
    const secondCharDecValue = this.HexaCharToDecMap[secondChar.toUpperCase()];

    if (firstCharDecValue === undefined || secondCharDecValue === undefined) {
      throw new Error("Teinte hexadécimale invalide, caractère non valide");
    }

    const tintValue = firstCharDecValue * 16 + secondCharDecValue;
    return tintValue;
  }
}
