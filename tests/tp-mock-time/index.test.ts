import { TimeUtils } from ".";

describe("TimeUtils", () => {
  describe("isFuture", () => {
    it("should return true for a future date", () => {
      // Arrange
      const futureDate = new Date("2026-06-26T10:14:00.000Z");

      // Act
      const result = TimeUtils.isFuture(futureDate);

      // Assert
      expect(result).toBe(true);
    });
  });
});
