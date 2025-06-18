import { MathUtilsTdd } from "@/tp-math-utils-tdd/MathUtilsTdd";
import { container } from "tsyringe";

describe("Math Utils TDD", () => {
  const mathUtils = container.resolve(MathUtilsTdd);
  describe("method divide", () => {
    it.each`
      num1   | num2  | expected
      ${6}   | ${2}  | ${3}
      ${10}  | ${5}  | ${2}
      ${-15} | ${3}  | ${-5}
      ${0}   | ${1}  | ${0}
      ${-8}  | ${-2} | ${4}
    `(
      "should return $expected when dividing $num1 by $num2",
      ({ num1, num2, expected }) => {
        const result = mathUtils.divide(num1, num2);

        expect(result).toBe(expected);
      }
    );

    it("should throw an error when dividing by zero", () => {
      const act = () => mathUtils.divide(10, 0);
      expect(act).toThrow("Division by zero is not allowed.");
    });
  });

  describe("method remove duplicates", () => {
    it("should throw an error when array is empty", () => {
      const act = () => mathUtils.removeDuplicates([]);
      expect(act).toThrow("Array cannot be empty.");
    });

    it.each`
      arr                | expected
      ${[1]}             | ${[1]}
      ${[1, 2, 3]}       | ${[1, 2, 3]}
      ${[1, 2, 2, 3]}    | ${[1, 2, 3]}
      ${[1, 2, 2, 1, 3]} | ${[1, 2, 3]}
      ${[2, 2, 1, 4, 3]} | ${[2, 1, 4, 3]}
    `(
      "should return an array representing a set of input array: $arr",
      ({ arr, expected }) => {
        const result = mathUtils.removeDuplicates(arr);
        expect(result).toEqual(expected);
      }
    );
  });
});
