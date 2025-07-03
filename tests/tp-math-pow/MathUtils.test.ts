import { MathUtils } from "@/tp-math-pow/MathUtils";
import { container } from "tsyringe";

describe("MathUtils", () => {
  const mathUtils = container.resolve(MathUtils);

  afterEach(() => {
    jest.resetAllMocks(); // Reset mock calls and implementations (not the original implementation, but the mock itself)
    jest.restoreAllMocks(); // Restore original implementations
  });

  describe("pow", () => {
    it.each`
      num  | exponent
      ${2} | ${3}
      ${3} | ${5}
    `(
      "should call Math.pow with num=$num and exponent=$exponent",
      ({ num, exponent }) => {
        const whateverResult = 1; // Mocked result, not used in this test
        jest.spyOn(Math, "pow").mockReturnValue(whateverResult);
        mathUtils.pow(num, exponent);

        expect(Math.pow).toHaveBeenCalledWith(num, exponent);
        expect(Math.pow).toHaveBeenCalledTimes(1);
      }
    );
  });
});
