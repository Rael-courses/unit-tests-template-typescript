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

    it.each`
      input
      ${"jean-PierRe"}
      ${"Jean-pierre"}
      ${"Jean-Pierr3"}
    `(
      "should throw when a part is not one uppercase letter followed by lowercase letters",
      ({ input }) => {
        // Arrange
        const nameValidation = new NameValidation();

        // Act
        const act = () => nameValidation.validateName(input);

        // Assert
        expect(act).toThrow(
          "Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules et doit être munie de 2 caractères minimum",
        );
      },
    );

    it.each`
      input
      ${"J-Pierre"}
      ${"P"}
    `(
      "should throw when a part has fewer than 2 characters",
      ({ input }) => {
        // Arrange
        const nameValidation = new NameValidation();

        // Act
        const act = () => nameValidation.validateName(input);

        // Assert
        expect(act).toThrow(
          "Le nom peut être composé mais chacune de ses parties doit être faite d'une première lettre majuscule suivie de minuscules et doit être munie de 2 caractères minimum",
        );
      },
    );
  });
});
