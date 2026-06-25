import { StringValidation } from "../StringValidation";

const INVALID_NAME_MESSAGE =
  "Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules et doit être munie de 2 caractères minimum";

export class NameValidation {
  private stringValidation = new StringValidation();

  public validateName(input: string): string {
    const parts = input.split("-");
    for (const part of parts) {
      let isCapitalized = true;
      try {
        this.stringValidation.validateCapitalized(part);
      } catch {
        isCapitalized = false;
      }
      if (!isCapitalized || part.length < 2) {
        throw new Error(INVALID_NAME_MESSAGE);
      }
    }
    return input;
  }
}
