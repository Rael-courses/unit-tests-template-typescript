import { StringValidation } from "../StringValidation";

const INVALID_NAME_MESSAGE =
  "Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules et doit être munie de 2 caractères minimum";

const INVALID_CHARACTER_MESSAGE =
  "Le nom ne doit contenir que des lettres, espaces ou tirets";

export class NameValidation {
  private stringValidation = new StringValidation();

  public validateName(input: string): string {
    if (!/^[A-Za-z -]+$/.test(input)) {
      throw new Error(INVALID_CHARACTER_MESSAGE);
    }
    const parts = input.split(/[- ]/);
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
