import { StringValidation } from "../StringValidation";

export class NameValidation {
  private stringValidation = new StringValidation();

  public validateName(input: string): string {
    const parts = input.split("-");
    for (const part of parts) {
      try {
        this.stringValidation.validateCapitalized(part);
      } catch {
        throw new Error(
          "Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules",
        );
      }
    }
    return input;
  }
}
