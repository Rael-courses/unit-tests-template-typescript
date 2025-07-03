import { Logger } from "@/tp-mock-console/Logger";
import { container } from "tsyringe";

describe("Logger", () => {
  const logger = container.resolve(Logger);

  describe("logInfo", () => {
    it("should log an information message", () => {
      const consoleSpy = jest.spyOn(console, "log");
      const message =
        "Test message with jest.spyOn() only which keep original behavior";

      logger.logInfo(message);
      expect(consoleSpy).toHaveBeenCalledWith(message);
    });

    it("should log an information message", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      const message =
        "Test message with jest.spyOn().mockImplementation(() => {}) which suppresses the original behavior";

      logger.logInfo(message);
      expect(consoleSpy).toHaveBeenCalledWith(message);
    });

    it("should log an information message", () => {
      console.log = jest.fn();
      const message =
        "Test message with jest.fn() which replaces console.log by a mock function: () => {}";

      logger.logInfo(message);
      expect(console.log).toHaveBeenCalledWith(message);
    });
  });

  describe("error", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it.each`
      errorMessage
      ${"Test 1 error message"}
      ${"Test 2 error message"}
    `("should log an error message", ({ errorMessage }) => {
      const consoleErrorSpy = jest.spyOn(console, "error");

      logger.logError(errorMessage);
      expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
  });
});
