import { NameValidation } from ".";

describe("NameValidation", () => {
  describe("validateName", () => {
    it("should return the input for a hyphenated name whose parts are each capitalized", () => {
      // Arrange
      const nameValidation = new NameValidation();
      const input = "Jean-Pierre";

      // Act
      const result = nameValidation.validateName(input);

      // Assert
      expect(result).toBe(input);
    });
  });
});
