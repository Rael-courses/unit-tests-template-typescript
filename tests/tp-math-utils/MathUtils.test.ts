import { MathUtils } from "@/tp-math-utils/MathUtils";
import { container } from "tsyringe";

describe("MathUtils", () => {
  const mathUtils = container.resolve(MathUtils);

  describe("method multiply", () => {
    it.each`
      a     | b     | expected
      ${2}  | ${3}  | ${6}
      ${4}  | ${5}  | ${20}
      ${-1} | ${-1} | ${1}
      ${0}  | ${5}  | ${0}
    `(
      "should multiply two numbers correctly $a * $b = $expected",
      ({ a, b, expected }) => {
        const result = mathUtils.multiply(a, b);
        expect(result).toBe(expected);
      }
    );
  });

  describe("method divide", () => {
    it.each`
      a     | b     | expected
      ${20} | ${5}  | ${4}
      ${-1} | ${-1} | ${1}
      ${0}  | ${5}  | ${0}
      ${-4} | ${2}  | ${-2}
    `(
      "should divide two numbers correctly $a / $b = $expected",
      ({ a, b, expected }) => {
        const result = mathUtils.divide(a, b);
        expect(result).toBe(expected);
      }
    );

    it("should throw an error when dividing by zero", () => {
      const act = () => {
        mathUtils.divide(10, 0);
      };
      expect(act).toThrow("Division by zero is not allowed.");
    });
  });

  describe("method multiplyArrays", () => {
    it("should multiply two arrays of the same length", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];
      const expected = [4, 10, 18];

      const result = mathUtils.multiplyArrays(arr1, arr2);
      expect(result).toEqual(expected);
    });

    it("should throw an error when arrays are of different lengths", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5];

      const act = () => {
        mathUtils.multiplyArrays(arr1, arr2);
      };

      expect(act).toThrow("Arrays must be of the same length.");
    });

    it.each`
      arr1         | arr2
      ${[1, 2, 3]} | ${[]}
      ${[]}        | ${[4, 5, 6]}
      ${[]}        | ${[]}
    `("should throw an error when one array is empty", ({ arr1, arr2 }) => {
      const act = () => {
        mathUtils.multiplyArrays(arr1, arr2);
      };

      expect(act).toThrow("Arrays must not be empty.");
    });
  });

  describe("method removeDuplicates", () => {
    it("should remove duplicates from an array", () => {
      const arr = [1, 0, 2, 3, 2, 4, 4, 5, 1];
      const expected = [1, 0, 2, 3, 4, 5];
      const result = mathUtils.removeDuplicates(arr);
      expect(result).toEqual(expected);
    });

    it("should throw an error when the array is empty", () => {
      const act = () => {
        mathUtils.removeDuplicates([]);
      };
      expect(act).toThrow("Array must not be empty.");
    });
  });
});
