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

    it("should throw when the input contains an uppercase letter", () => {
      // Arrange
      const stringValidation = new StringValidation();
      const input = "Abc";

      // Act
      const act = () => stringValidation.validateLowercaseLettersOnly(input);

      // Assert
      expect(act).toThrow(
        "La chaîne de caractère ne doit contenir que des lettres minuscules de l'alphabet",
      );
    });
  });

  describe("validateUppercaseLettersOnly", () => {
    it("should return the input when it contains only uppercase letters", () => {
      // Arrange
      const stringValidation = new StringValidation();
      const input = "ABC";

      // Act
      const result = stringValidation.validateUppercaseLettersOnly(input);

      // Assert
      expect(result).toBe(input);
    });

    it("should throw when the input contains a lowercase letter", () => {
      // Arrange
      const stringValidation = new StringValidation();
      const input = "abc";

      // Act
      const act = () => stringValidation.validateUppercaseLettersOnly(input);

      // Assert
      expect(act).toThrow(
        "La chaîne de caractère ne doit contenir que des lettres majuscules de l'alphabet",
      );
    });
  });

  describe("validateCapitalized", () => {
    it("should return the input when it is one uppercase letter followed by lowercase letters", () => {
      // Arrange
      const stringValidation = new StringValidation();
      const input = "Pierre";

      // Act
      const result = stringValidation.validateCapitalized(input);

      // Assert
      expect(result).toBe(input);
    });

    it.each`
      input
      ${"pierre"}
      ${"PIERRE"}
      ${"Pierr3"}
    `(
      "should throw when the input is not one uppercase letter followed by lowercase letters",
      ({ input }) => {
        // Arrange
        const stringValidation = new StringValidation();

        // Act
        const act = () => stringValidation.validateCapitalized(input);

        // Assert
        expect(act).toThrow(
          "Le nom doit être constitué d'une première lettre majuscule suivie de minuscules",
        );
      },
    );
  });
});
