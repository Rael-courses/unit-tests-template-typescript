import { TintParser } from "@/tp-hexa-color-parser/TintParser";
import { container } from "tsyringe";

describe("TintParser", () => {
  const tintParser = container.resolve(TintParser);

  it.each`
    input   | expected
    ${"CE"} | ${206}
    ${"9B"} | ${155}
    ${"E6"} | ${230}
    ${"25"} | ${37}
  `("should parse tint $input to $expected", ({ input, expected }) => {
    const result = tintParser.parse(input);
    expect(result).toBe(expected);
  });

  it("should throw an error 'Teinte hexadécimale invalide, teinte vide' for empty input", () => {
    const act = () => tintParser.parse("");
    expect(act).toThrow("Teinte hexadécimale invalide, teinte vide");
  });

  it.each`
    input
    ${"B"}
    ${"2BC"}
  `(
    "should throw an error 'Teinte hexadécimale invalide, la teinte doit contenir 2 caractères' for input with more or less than 2 characters",
    ({ input }) => {
      const act = () => tintParser.parse(input);
      expect(act).toThrow(
        "Teinte hexadécimale invalide, la teinte doit contenir 2 caractères"
      );
    }
  );

  it.each`
    input
    ${"-G"}
    ${"1."}
    ${"G0"}
    ${"0G"}
  `(
    "should throw an error 'Teinte hexadécimale invalide, caractère non valide' for input with invalid characters",
    ({ input }) => {
      const act = () => tintParser.parse(input);
      expect(act).toThrow("Teinte hexadécimale invalide, caractère non valide");
    }
  );
});
