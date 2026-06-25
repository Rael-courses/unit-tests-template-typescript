import { calcFizzbuzz } from ".";

describe("FizzBuzz", () => {
  describe("calcFizzbuzz", () => {
    it("should return 'fizzbuzz' when n is a multiple of 15", () => {
      // Arrange
      const input = 15;
      const expected = "fizzbuzz";

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("should return 'fizz' when n is a multiple of 3 (and not of 5)", () => {
      // Arrange
      const input = 9;
      const expected = "fizz";

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
