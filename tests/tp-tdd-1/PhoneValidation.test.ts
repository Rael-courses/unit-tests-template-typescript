import { PhoneValidation } from "@/tp-tdd-1/PhoneValidation";
import { container } from "tsyringe";

describe("PhoneValidation", () => {
  const phoneValidation = container.resolve(PhoneValidation);

  describe("validatePhone", () => {
    it.each`
      input
      ${""}
      ${" "}
    `("should throw an error for empty input", ({ input }) => {
      const act = () => {
        phoneValidation.validatePhone(input);
      };

      expect(act).toThrow("Le numéro de téléphone ne peut pas être vide.");
    });

    it.each`
      input
      ${"04345678901"}
      ${"043456789"}
    `(
      "should throw an error for invalid phone number because of length",
      ({ input }) => {
        const act = () => {
          phoneValidation.validatePhone(input);
        };

        expect(act).toThrow(
          "Le numéro ne doit contenir que 10 chiffres au total s'il ne contient pas de séparateur."
        );
      }
    );

    it.each`
      input
      ${"04/34/56/78"}
      ${"04/34/56/78/90/12"}
    `(
      "should throw an error for invalid phone number because of pairs number: $input",
      ({ input }) => {
        const act = () => {
          phoneValidation.validatePhone(input);
        };

        expect(act).toThrow(
          "Le numéro doit être composé de 5 paires de deux chiffre quand il contient des séparateurs."
        );
      }
    );

    it.each`
      input
      ${"04/34.56/78/90"}
    `(
      "should throw an error for invalid phone number because of separators: $input",
      ({ input }) => {
        const act = () => {
          phoneValidation.validatePhone(input);
        };

        expect(act).toThrow(
          "Les séparateurs acceptés ne sont que espaces, point ou slash et doivent être identiques."
        );
      }
    );

    it.each`
      input
      ${"03 12 34 56 78"}
    `(
      "should throw an error for invalid phone number because of separators",
      ({ input }) => {
        const act = () => {
          phoneValidation.validatePhone(input);
        };

        expect(act).toThrow(
          "Le numéro de téléphone doit commencer par 04, 06, 07 ou 08."
        );
      }
    );

    it.each`
      input
      ${"0412345678"}
      ${"06.12.34.56.78"}
      ${"07 12 34 56 78"}
      ${"08/12/34/56/78"}
    `("should return a valid phone number: $input", ({ input }) => {
      const result = phoneValidation.validatePhone(input);

      expect(result).toBe(input);
    });
  });
});
