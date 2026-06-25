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

    it("should return 'buzz' when n is a multiple of 5 (and not of 3)", () => {
      // Arrange
      const input = 10;
      const expected = "buzz";

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("should return the number as a string when n is a multiple of neither 3 nor 5", () => {
      // Arrange
      const input = 13;
      const expected = "13";

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
