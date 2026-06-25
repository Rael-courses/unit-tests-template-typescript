import { calcFibonacci } from ".";

describe("Fibonacci", () => {
  describe("calcFibonacci", () => {
    it.each`
      input | expected
      ${-1} | ${0}
      ${0}  | ${0}
    `("should return 0 for input negative or zero", () => {
      // Arrange
      const input = -1;
      const expected = 0;

      // Act
      const result = calcFibonacci(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("should return 1 for input 1", () => {
      // Arrange
      const input = 1;
      const expected = 1;

      // Act
      const result = calcFibonacci(input);

      // Assert
      expect(result).toBe(expected);
    });

    it.each`
      input | expected
      ${2}  | ${1}
      ${2}  | ${1}
      ${3}  | ${2}
      ${4}  | ${3}
      ${5}  | ${5}
      ${6}  | ${8}
      ${7}  | ${13}
    `("should return $expected for input $input", ({ input, expected }) => {
      // Arrange
      // Act
      const result = calcFibonacci(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
