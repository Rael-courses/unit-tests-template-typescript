export class NameValidation {
  public validateName(input: string): string {
    const parts = input.split("-");
    for (const part of parts) {
      if (!/^[A-Z][a-z]*$/.test(part)) {
        throw new Error(
          "Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules",
        );
      }
    }
    return input;
  }
}
