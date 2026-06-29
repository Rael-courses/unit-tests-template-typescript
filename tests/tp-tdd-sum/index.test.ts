import { sumNumbers } from ".";

describe("tp-tdd-sum", () => {
  describe("sumNumbers", () => {
    it("should return an empty array sum of 0", () => {
      expect(sumNumbers([])).toBe(0);
    });

    it("should return the sum of an array with multiple numbers", () => {
      expect(sumNumbers([1, 2, 3, 4, 5])).toBe(15);
    });

    it("should return the sum of an array with negative numbers", () => {
      expect(sumNumbers([-1, -2, -3])).toBe(-6);
    });

    it("should return the sum of an array with mixed positive and negative numbers", () => {
      expect(sumNumbers([10, -5, 3, -2])).toBe(6);
    });

    it("should return the sum of an array with a single number", () => {
      expect(sumNumbers([42])).toBe(42);
    });

    it("should return the sum of an array with zeros", () => {
      expect(sumNumbers([0, 0, 0])).toBe(0);
    });
  });
});
