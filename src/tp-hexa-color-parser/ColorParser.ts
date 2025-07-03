import { container } from "tsyringe";
import { TintParser } from "./TintParser";

export class ColorParser {
  public constructor(
    private readonly tintParser: TintParser = container.resolve(TintParser)
  ) {}

  public parse(input: string) {
    if (input.length === 0) {
      throw new Error("Couleur hexadécimale invalide, ne doit pas être vide");
    }

    if (!input.startsWith("#")) {
      throw new Error("Couleur hexadécimale invalide, doit commencer par #");
    }

    if (input.length !== 7) {
      throw new Error(
        "Couleur hexadécimale invalide, doit contenir 3 paires de caractères"
      );
    }

    const hexRed = input.slice(1, 3);
    const hexGreen = input.slice(3, 5);
    const hexBlue = input.slice(5, 7);
    let redTint: number;
    let greenTint: number;
    let blueTint: number;
    try {
      redTint = this.tintParser.parse(hexRed);
      greenTint = this.tintParser.parse(hexGreen);
      blueTint = this.tintParser.parse(hexBlue);
    } catch (error) {
      throw new Error("Couleur hexadécimale invalide, caractères invalides");
    }

    return `rgb(${redTint},${greenTint},${blueTint})`;
  }
}
