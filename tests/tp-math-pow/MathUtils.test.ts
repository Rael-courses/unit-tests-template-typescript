import { MathUtils } from "@/tp-math-pow/MathUtils";
import { container } from "tsyringe";

describe("MathUtils", () => {
  const mathUtils = container.resolve(MathUtils);

  describe("pow", () => {
    it.each`
      num  | exponent
      ${2} | ${3}
      ${3} | ${5}
    `(
      "should call Math.pow with num=$num and exponent=$exponent",
      ({ num, exponent }) => {
        Math.pow = jest.fn();
        mathUtils.pow(num, exponent);

        expect(Math.pow).toHaveBeenCalledWith(num, exponent);
        expect(Math.pow).toHaveBeenCalledTimes(1);
      }
    );
  });
});
