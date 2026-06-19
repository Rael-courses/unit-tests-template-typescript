import { multiplyArrays } from ".";

describe("tp-multiplyArrays", () => {
  describe("multiplyArrays", () => {
    it.each`
      arr1         | arr2         | expected
      ${[3, 5, 2]} | ${[4, 3, 1]} | ${[12, 15, 2]}
      ${[1, 2, 3]} | ${[4, 5, 6]} | ${[4, 10, 18]}
      ${[0, 0, 0]} | ${[1, 2, 3]} | ${[0, 0, 0]}
    `("should return the product of two arrays", ({ arr1, arr2, expected }) => {
      // Arrange
      // Act
      const result = multiplyArrays(arr1, arr2);

      // Assert
      expect(result).toEqual(expected);
    });

    it("should throw an error when arrays have different lengths", () => {
      // Arrange
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5];

      // Act
      const act = () => multiplyArrays(arr1, arr2);

      // Assert
      expect(act).toThrow("Arrays must have the same length");
    });

    it.each`
      arr1         | arr2
      ${[]}        | ${[1, 2, 3]}
      ${[1, 2, 3]} | ${[]}
    `("should throw an error when arrays are empty", ({ arr1, arr2 }) => {
      // Arrange
      // Act
      const act = () => multiplyArrays(arr1, arr2);

      // Assert
      expect(act).toThrow("Arrays cannot be empty");
    });
  });
});
