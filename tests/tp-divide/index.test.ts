import { divide } from ".";

describe("tp-divide", () => {
  describe("divide", () => {
    it.each`
      num1   | num2   | expected
      ${15}  | ${3}   | ${5}
      ${-2}  | ${2}   | ${-1}
      ${0}   | ${5}   | ${0}
      ${0.8} | ${0.2} | ${4}
    `(
      "should return the quotient of two numbers",
      ({ num1, num2, expected }) => {
        // Arrange
        // Act
        const result = divide(num1, num2);

        // Assert
        expect(result).toBeCloseTo(expected, 10);
      },
    );

    it("should throw an error when dividing by zero", () => {
      // Arrange
      const num1 = 10;
      const num2 = 0;

      // Act
      const act = () => divide(num1, num2);

      // Assert
      expect(act).toThrow("Denominator cannot be zero");
    });
  });
});
