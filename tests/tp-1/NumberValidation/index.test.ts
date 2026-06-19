import { NumberValidation } from ".";

describe("NumberValidation", () => {
  let numberValidation: NumberValidation;

  beforeAll(() => {
    numberValidation = new NumberValidation();
  });

  describe("validateNumber", () => {
    it("should throw an error for invalid input", () => {
      // Arrange
      const invalidInput = "abc";

      // Act
      const act = () => numberValidation.validateNumber(invalidInput);

      // Assert
      expect(act).toThrow("La valeur doit représenter un nombre");
    });

    it.each`
      input       | expected
      ${"123"}    | ${123}
      ${"0"}      | ${0}
      ${"-456"}   | ${-456}
      ${"3.14"}   | ${3.14}
      ${"-0.001"} | ${-0.001}
    `(
      "should return the parsed number for valid input",
      ({ input, expected }) => {
        // Arrange
        // Act
        const result = numberValidation.validateNumber(input);

        // Assert
        expect(result).toBe(expected);
      },
    );
  });

  describe("validateInteger", () => {
    it("should throw an error for non-integer input", () => {
      // Arrange
      const nonIntegerInput = "3.14";

      // Act
      const act = () => numberValidation.validateInteger(nonIntegerInput);

      // Assert
      expect(act).toThrow("La valeur doit représenter un nombre entier");
    });

    it.each`
      input     | expected
      ${"123"}  | ${123}
      ${"0"}    | ${0}
      ${"-456"} | ${-456}
    `(
      "should return the parsed integer for valid integer input",
      ({ input, expected }) => {
        // Arrange
        // Act
        const result = numberValidation.validateInteger(input);

        // Assert
        expect(result).toBe(expected);
      },
    );
  });

  describe("validatePositive", () => {
    it.each`
      input
      ${"-5"}
      ${"0"}
    `("should throw an error for non-positive input", ({ input }) => {
      // Arrange
      // Act
      const act = () => numberValidation.validatePositive(input);

      // Assert
      expect(act).toThrow("La valeur doit représenter un nombre positif");
    });

    it.each`
      input    | expected
      ${"5"}   | ${5}
      ${"0.1"} | ${0.1}
      ${"100"} | ${100}
    `(
      "should return the parsed positive number for valid positive input",
      ({ input, expected }) => {
        // Arrange
        // Act
        const result = numberValidation.validatePositive(input);

        // Assert
        expect(result).toBe(expected);
      },
    );
  });
});
