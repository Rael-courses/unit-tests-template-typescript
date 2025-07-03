import { ColorParser } from "@/tp-hexa-color-parser/ColorParser";
import { container } from "tsyringe";

describe("ColorParser", () => {
  const colorParser = container.resolve(ColorParser);

  it("should throw an error 'Couleur hexadécimale invalide, ne doit pas être vide' for empty input", () => {
    const act = () => colorParser.parse("");
    expect(act).toThrow("Couleur hexadécimale invalide, ne doit pas être vide");
  });

  it("should throw an error 'Couleur hexadécimale invalide, doit commencer par #' for input not starting with #", () => {
    const act = () => colorParser.parse("FFFFFF");
    expect(act).toThrow("Couleur hexadécimale invalide, doit commencer par #");
  });

  it.each`
    input
    ${"#FFFFF"}
  `(
    "should throw an error 'Couleur hexadécimale invalide, doit contenir 3 paires de caractères' for input with more or less than 7 characters",
    ({ input }) => {
      const act = () => colorParser.parse(input);
      expect(act).toThrow(
        "Couleur hexadécimale invalide, doit contenir 3 paires de caractères"
      );
    }
  );

  it.each`
    input
    ${"#AB012G"}
    ${"#A.012B"}
    ${"#ABG12B"}
  `(
    "should throw an error 'Couleur hexadécimale invalide, caractères invalides' for input with invalid characters",
    ({ input }) => {
      const act = () => colorParser.parse(input);
      expect(act).toThrow(
        "Couleur hexadécimale invalide, caractères invalides"
      );
    }
  );

  it.each`
    input        | expected
    ${"#BD3F0A"} | ${"rgb(189,63,10)"}
    ${"#A3BF7E"} | ${"rgb(163,191,126)"}
  `("should parse color $input to $expected", ({ input, expected }) => {
    const result = colorParser.parse(input);
    expect(result).toBe(expected);
  });
});
