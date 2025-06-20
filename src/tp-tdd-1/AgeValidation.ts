import { container } from "tsyringe";
import { NumberValidation } from "./NumberValidation";

export class AgeValidation {
  public constructor(
    private readonly numberValidation: NumberValidation = container.resolve(
      NumberValidation
    )
  ) {}

  public validateAge(input: string): number {
    try {
      this.numberValidation.validateInteger(input);
      return this.numberValidation.validatePositive(input);
    } catch {
      throw new Error("L'age doit représenter un nombre entier positif");
    }
  }

  public validateAdult(input: string): number {
    let age: number;
    try {
      age = this.validateAge(input);
      if (age < 18 || age > 130) {
        throw new Error();
      }
    } catch {
      throw new Error("L'age doit être compris entre 18 et 130 ans");
    }
    return age;
  }
}
