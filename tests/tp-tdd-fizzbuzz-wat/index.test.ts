import { loadWatExports } from "./wat-loader";

describe("FizzBuzz (WAT)", () => {
  describe("calcFizzbuzz", () => {
    it("should return 3 (fizzbuzz) when n is a multiple of 15", async () => {
      // Arrange
      const { calcFizzbuzz } = await loadWatExports<{
        calcFizzbuzz(n: number): number;
      }>("fizzbuzz.wat");
      const input = 15;
      const expected = 3;

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("should return 1 (fizz) when n is a multiple of 3 (and not of 5)", async () => {
      // Arrange
      const { calcFizzbuzz } = await loadWatExports<{
        calcFizzbuzz(n: number): number;
      }>("fizzbuzz.wat");
      const input = 9;
      const expected = 1;

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("should return 2 (buzz) when n is a multiple of 5 (and not of 3)", async () => {
      // Arrange
      const { calcFizzbuzz } = await loadWatExports<{
        calcFizzbuzz(n: number): number;
      }>("fizzbuzz.wat");
      const input = 10;
      const expected = 2;

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("should return 0 (number) when n is a multiple of neither 3 nor 5", async () => {
      // Arrange
      const { calcFizzbuzz } = await loadWatExports<{
        calcFizzbuzz(n: number): number;
      }>("fizzbuzz.wat");
      const input = 13;
      const expected = 0;

      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
