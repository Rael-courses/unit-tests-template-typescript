export class NumberValidation {
  public validatePositive(input: string): number {
    let number: number;
    try {
      number = this.validateNumber(input);
      if (number <= 0) {
        throw new Error();
      }
    } catch {
      throw new Error("La valeur doit être un nombre positif.");
    }

    return number;
  }

  public validateInteger(input: string): number {
    let number: number;
    try {
      number = this.validateNumber(input);

      if (!Number.isInteger(number)) {
        throw new Error();
      }
    } catch {
      throw new Error("La valeur doit représenter un nombre entier.");
    }

    return number;
  }

  public validateNumber(input: string): number {
    const trimmedInput = input.trim();
    const numberedInput = parseFloat(input);
    if (
      isNaN(numberedInput) ||
      trimmedInput.startsWith("-.") ||
      trimmedInput.startsWith(".") ||
      trimmedInput.endsWith(".") ||
      trimmedInput.startsWith("+.") ||
      trimmedInput.endsWith("e")
    ) {
      throw new Error("La valeur doit représenter un nombre.");
    }
    return numberedInput;
  }
}
