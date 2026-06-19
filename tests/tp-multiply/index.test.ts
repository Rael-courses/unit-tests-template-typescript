import { multiply } from ".";

describe("tp-multiply", () => {
  describe("multiply", () => {
    it.each`
      num1   | num2   | expected
      ${2}   | ${2}   | ${4}
      ${3}   | ${5}   | ${15}
      ${0}   | ${4}   | ${0}
      ${7}   | ${0}   | ${0}
      ${-3}  | ${5}   | ${-15}
      ${-2}  | ${-3}  | ${6}
      ${0.1} | ${0.2} | ${0.02}
    `(
      "should return the product of two numbers",
      ({ num1, num2, expected }) => {
        // Arrange
        // Act
        const result = multiply(num1, num2);

        // Assert
        expect(result).toBeCloseTo(expected, 10);
      },
    );
  });
});
