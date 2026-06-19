export class NumberValidation {
  public validateNumber(input: string): number {
    const parsedNumber = parseFloat(input);
    if (isNaN(parsedNumber)) {
      throw new Error("La valeur doit représenter un nombre");
    }

    return parsedNumber;
  }

  public validateInteger(input: string): number {
    const parsedNumber = this.validateNumber(input);
    if (!Number.isInteger(parsedNumber)) {
      throw new Error("La valeur doit représenter un nombre entier");
    }

    return parsedNumber;
  }

  public validatePositive(input: string): number {
    const parsedNumber = this.validateNumber(input);
    if (parsedNumber <= 0) {
      throw new Error("La valeur doit représenter un nombre positif");
    }

    return parsedNumber;
  }
}
