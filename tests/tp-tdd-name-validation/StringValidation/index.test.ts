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
  });
});
