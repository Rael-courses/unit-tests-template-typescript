import { StringValidation } from ".";

describe("StringValidation", () => {
  describe("validateLettersOnly", () => {
    it("should return the input when it contains only alphabet letters", () => {
      // Arrange
      const stringValidation = new StringValidation();
      const input = "abc";

      // Act
      const result = stringValidation.validateLettersOnly(input);

      // Assert
      expect(result).toBe(input);
    });

    it("should throw when the input contains a non-letter character", () => {
      // Arrange
      const stringValidation = new StringValidation();
      const input = "abc123";

      // Act
      const act = () => stringValidation.validateLettersOnly(input);

      // Assert
      expect(act).toThrow(
        "La chaîne de caractère ne doit contenir que des lettres de l'alphabet",
      );
    });
  });

  describe("validateLowercaseLettersOnly", () => {
    it("should return the input when it contains only lowercase letters", () => {
      // Arrange
      const stringValidation = new StringValidation();
      const input = "abc";

      // Act
      const result = stringValidation.validateLowercaseLettersOnly(input);

      // Assert
      expect(result).toBe(input);
    });
  });
});
