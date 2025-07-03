import { Logger } from "@/tp-mock-console/Logger";
import { container } from "tsyringe";

describe("Logger", () => {
  const logger = container.resolve(Logger);

  it("should log a message", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const message =
      "Test message with jest.spyOn() only which keep original behavior";

    logger.log(message);
    expect(consoleSpy).toHaveBeenCalledWith(message);
  });

  it("should log a message", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const message =
      "Test message with jest.spyOn().mockImplementation(() => {}) which suppresses the original behavior";

    logger.log(message);
    expect(consoleSpy).toHaveBeenCalledWith(message);
  });

  it("should log a message", () => {
    console.log = jest.fn();
    const message =
      "Test message with jest.fn() which replaces console.log by a mock function: () => {}";

    logger.log(message);
    expect(console.log).toHaveBeenCalledWith(message);
  });
});
