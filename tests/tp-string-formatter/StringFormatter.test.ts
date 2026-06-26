import { container } from "tsyringe";
import { StringFormatter } from "./StringFormatter";

describe("StringFormatter", () => {
  const stringFormatter = container.resolve(StringFormatter);

  it("should normalize a string", () => {
    const input = " Hello world   ";
    const expected = "HELLO_WORLD";

    const result = stringFormatter.normalize(input);
    expect(result).toBe(expected);
  });
});
