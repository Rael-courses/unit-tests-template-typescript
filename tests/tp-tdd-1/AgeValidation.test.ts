import { AgeValidation } from "@/tp-tdd-1/AgeValidation";
import { container } from "tsyringe";

describe("AgeValidation", () => {
  const ageValidation = container.resolve(AgeValidation);

  describe("validateAge", () => {
    it.each`
      input  | expected
      ${"1"} | ${1}
      ${"2"} | ${2}
    `(
      "should return a valid number: $expected for this age: $input",
      ({ input, expected }) => {
        const result = ageValidation.validateAge(input);
        expect(result).toBe(expected);
      }
    );

    it.each`
      input
      ${"0.1"}
      ${"0"}
      ${"-1"}
    `("should throw an error for an invalid age: $input", ({ input }) => {
      const act = () => {
        ageValidation.validateAge(input);
      };

      expect(act).toThrow("L'age doit représenter un nombre entier positif");
    });
  });

  describe("validateAdult", () => {
    it.each`
      input    | expected
      ${"18"}  | ${18}
      ${"50"}  | ${50}
      ${"130"} | ${130}
    `(
      "should return an adult age as number: $expected for this age: $input",
      ({ input, expected }) => {
        const result = ageValidation.validateAdult(input);

        expect(result).toBe(expected);
      }
    );

    it.each`
      input
      ${"17"}
      ${"131"}
      ${"-1"}
    `("should throw an error for an invalid adult age: $input", ({ input }) => {
      const act = () => {
        ageValidation.validateAdult(input);
      };

      expect(act).toThrow("L'age doit être compris entre 18 et 130 ans");
    });
  });
});
