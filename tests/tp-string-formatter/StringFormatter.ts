export class StringFormatter {
  public normalize(input: string) {
    return input.trim().toUpperCase().replace(/\s+/g, "_");
  }
}
