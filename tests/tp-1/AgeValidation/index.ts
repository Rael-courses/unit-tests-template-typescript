import { container } from "tsyringe";
import { NumberValidation } from "../NumberValidation";

export class AgeValidation {
  private numberValidation: NumberValidation =
    container.resolve(NumberValidation);

  public validateAge(input: string): number {
    try {
      this.numberValidation.validateInteger(input);
      const parsedPositive = this.numberValidation.validatePositive(input);
      return parsedPositive;
    } catch {
      throw new Error("L'age doit représenter un nombre entier positif");
    }
  }

  public validateAdult(input: string): number {
    const age = this.validateAge(input);
    if (age < 18 || age > 130) {
      throw new Error("L'age doit être compris entre 18 et 130 ans");
    }
    return age;
  }
}
