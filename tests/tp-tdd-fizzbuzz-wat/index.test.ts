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
  });
});
