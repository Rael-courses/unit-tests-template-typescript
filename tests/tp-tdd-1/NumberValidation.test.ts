import { NumberValidation } from "@/tp-tdd-1/NumberValidation";
import { container } from "tsyringe";

describe("Number validation", () => {
  const numberValidation = container.resolve(NumberValidation);

  describe("validateNumber", () => {
    it.each`
      input
      ${"abc"}
      ${""}
      ${" "}
      ${".1"}
      ${"1."}
      ${"-.1"}
      ${"+.1"}
      ${" +.1"}
      ${" 2e"}
    `("should throw an error for non-numeric input '$input'", ({ input }) => {
      const act = () => {
        numberValidation.validateNumber(input);
      };

      expect(act).toThrow("La valeur doit représenter un nombre.");
    });

    it.each`
      input       | expected
      ${"123"}    | ${123}
      ${"123.45"} | ${123.45}
      ${"0"}      | ${0}
      ${"-42"}    | ${-42}
      ${"2e3"}    | ${2000}
      ${"2e-3"}   | ${0.002}
    `(
      "should return a valid number for numeric input: $input",
      ({ input, expected }) => {
        const result = numberValidation.validateNumber(input);

        expect(result).toBe(expected);
      }
    );
  });

  describe("validateInteger", () => {
    it.each`
      input
      ${"123.45"}
      ${"abc"}
    `("should throw an error for non-integer: $input", ({ input }) => {
      const act = () => {
        numberValidation.validateInteger(input);
      };

      expect(act).toThrow("La valeur doit représenter un nombre entier.");
    });

    it.each`
      input    | expected
      ${"123"} | ${123}
      ${"-42"} | ${-42}
      ${"0"}   | ${0}
    `(
      "should return a valid integer for numeric integer input",
      ({ input, expected }) => {
        const result = numberValidation.validateInteger(input);

        expect(result).toBe(expected);
      }
    );
  });

  describe("validatePositive", () => {
    it.each`
      input
      ${"-2"}
      ${"1."}
    `("should throw an error for non-positive numeric input", ({ input }) => {
      const act = () => {
        numberValidation.validatePositive(input);
      };

      expect(act).toThrow("La valeur doit être un nombre positif.");
    });

    it.each`
      input    | expected
      ${"7"}   | ${7}
      ${"1"}   | ${1}
      ${"0.1"} | ${0.1}
    `(
      "should return a valid positive number for positive numeric input",
      ({ input, expected }) => {
        expect(numberValidation.validatePositive(input)).toBe(expected);
      }
    );
  });
});
