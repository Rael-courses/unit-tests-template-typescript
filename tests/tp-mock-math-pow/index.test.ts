import { listToSquares } from ".";

describe("tp-mock-math-pow", () => {
  describe("listToSquares", () => {
    it("should return the list with each element raised to the power of 2", () => {
      // Arrange
      const mathPowSpy = jest.spyOn(Math, "pow");
      mathPowSpy
        .mockImplementationOnce(() => 9)
        .mockImplementationOnce(() => 25)
        .mockImplementationOnce(() => 81);
      const powSquare = 2;
      const inputList = [3, 5, 9];
      const expected = ["009", "025", "081"];

      // Act
      const result = listToSquares(inputList);

      // Assert
      expect(mathPowSpy).toHaveBeenCalledTimes(3);
      expect(mathPowSpy).toHaveBeenNthCalledWith(1, 3, powSquare);
      expect(mathPowSpy).toHaveBeenNthCalledWith(2, 5, powSquare);
      expect(mathPowSpy).toHaveBeenNthCalledWith(3, 9, powSquare);
      expect(result).toStrictEqual(expected);
    });
  });
});
