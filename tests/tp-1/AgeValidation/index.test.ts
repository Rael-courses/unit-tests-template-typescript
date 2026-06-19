import { AgeValidation } from ".";

describe("AgeValidation", () => {
  let ageValidation: AgeValidation;

  beforeAll(() => {
    ageValidation = new AgeValidation();
  });

  describe("validateAge", () => {
    it.each`
      input
      ${"abc"}
      ${"3.14"}
      ${"-5"}
    `("should throw an error for non-integer input", ({ input }) => {
      // Arrange
      // Act
      const act = () => ageValidation.validateAge(input);

      // Assert
      expect(act).toThrow("L'age doit représenter un nombre entier positif");
    });

    it.each`
      input    | expected
      ${"123"} | ${123}
      ${"18"}  | ${18}
      ${"456"} | ${456}
    `(
      "should return the parsed integer for valid integer input",
      ({ input, expected }) => {
        // Arrange
        // Act
        const result = ageValidation.validateAge(input);

        // Assert
        expect(result).toBe(expected);
      },
    );
  });

  describe("validateAdult", () => {
    it.each`
      input    | expected
      ${"18"}  | ${18}
      ${"25"}  | ${25}
      ${"130"} | ${130}
    `(
      "should return the parsed integer for valid adult age input",
      ({ input, expected }) => {
        // Arrange
        // Act
        const result = ageValidation.validateAdult(input);

        // Assert
        expect(result).toBe(expected);
      },
    );

    it.each`
      input
      ${"17"}
      ${"131"}
    `("should throw an error for invalid adult age input", ({ input }) => {
      // Arrange
      // Act
      const act = () => ageValidation.validateAdult(input);

      // Assert
      expect(act).toThrow("L'age doit être compris entre 18 et 130 ans");
    });
  });
});
