export class PhoneValidation {
  private readonly phoneRegex = /^\d{10}$/;
  private readonly phoneWithSeparatorRegex = /^(\d{2}[/. ]){4}\d{2}$/;
  private readonly validPrefixes = ["04", "06", "07", "08"];

  public validatePhone(input: string): string {
    const trimmedInput = input.trim();
    if (trimmedInput === "") {
      throw new Error("Le numéro de téléphone ne peut pas être vide.");
    }

    const isStartingWithValidPrefix = this.validPrefixes.some((prefix) =>
      trimmedInput.startsWith(prefix)
    );
    if (!isStartingWithValidPrefix) {
      throw new Error(
        "Le numéro de téléphone doit commencer par 04, 06, 07 ou 08."
      );
    }

    const hasSeparators = /[/. ]/.test(trimmedInput);
    if (hasSeparators) {
      if (!this.phoneWithSeparatorRegex.test(trimmedInput)) {
        throw new Error(
          "Le numéro doit être composé de 5 paires de deux chiffre quand il contient des séparateurs."
        );
      }

      // Assuming the separator is consistent because we are in separator regex case
      // we can take the third character
      const separator = trimmedInput[2]!;
      const parts = trimmedInput.split(separator);
      if (parts.length !== 5) {
        throw new Error(
          "Les séparateurs acceptés ne sont que espaces, point ou slash et doivent être identiques."
        );
      }
    } else {
      if (!this.phoneRegex.test(trimmedInput)) {
        throw new Error(
          "Le numéro ne doit contenir que 10 chiffres au total s'il ne contient pas de séparateur."
        );
      }
    }

    return trimmedInput;
  }
}
