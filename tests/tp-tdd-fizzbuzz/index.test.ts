import { calcFizzbuzz } from "./";

describe("Fizzbuzz", () => {
  describe("calcFizzbuzz", () => {
    it.each`
      input | expected
      ${1}  | ${"1"}
      ${2}  | ${"2"}
      ${4}  | ${"4"}
      ${7}  | ${"7"}
    `(
      "should return the string representation of the number for non-multiples of 3 and 5",
      ({ input, expected }) => {
        // Arrange
        // Act
        const result = calcFizzbuzz(input);

        // Assert
        expect(result).toStrictEqual(expected);
      },
    );

    it.each`
      input | expected
      ${3}  | ${"Fizz"}
      ${6}  | ${"Fizz"}
      ${9}  | ${"Fizz"}
    `('should return "Fizz" for multiples of 3', ({ input, expected }) => {
      // Arrange
      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toStrictEqual(expected);
    });

    it.each`
      input | expected
      ${5}  | ${"Buzz"}
      ${10} | ${"Buzz"}
      ${20} | ${"Buzz"}
    `('should return "Buzz" for multiples of 5', ({ input, expected }) => {
      // Arrange
      // Act
      const result = calcFizzbuzz(input);

      // Assert
      expect(result).toStrictEqual(expected);
    });

    it.each`
      input | expected
      ${15} | ${"FizzBuzz"}
      ${30} | ${"FizzBuzz"}
      ${45} | ${"FizzBuzz"}
    `(
      'should return "FizzBuzz" for multiples of both 3 and 5',
      ({ input, expected }) => {
        // Arrange
        // Act
        const result = calcFizzbuzz(input);

        // Assert
        expect(result).toStrictEqual(expected);
      },
    );
  });
});
