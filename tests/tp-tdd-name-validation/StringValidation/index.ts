export class StringValidation {
  public validateLettersOnly(input: string): string {
    if (!/^[a-zA-Z]+$/.test(input)) {
      throw new Error(
        "La chaîne de caractère ne doit contenir que des lettres de l'alphabet",
      );
    }
    return input;
  }

  public validateLowercaseLettersOnly(input: string): string {
    if (!/^[a-z]+$/.test(input)) {
      throw new Error(
        "La chaîne de caractère ne doit contenir que des lettres minuscules de l'alphabet",
      );
    }
    return input;
  }

  public validateUppercaseLettersOnly(input: string): string {
    if (!/^[A-Z]+$/.test(input)) {
      throw new Error(
        "La chaîne de caractère ne doit contenir que des lettres majuscules de l'alphabet",
      );
    }
    return input;
  }

  public validateCapitalized(input: string): string {
    return input;
  }
}
