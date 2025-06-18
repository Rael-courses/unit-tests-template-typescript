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
});
