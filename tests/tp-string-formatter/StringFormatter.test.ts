import { StringFormatter } from "@/tp-string-formatter/StringFormatter";
import { container } from "tsyringe";

describe("StringFormatter", () => {
  const stringFormatter = container.resolve(StringFormatter);

  it("should normalize a string", () => {
    const input = " Hello world   ";
    const expected = "HELLO_WORLD";

    const result = stringFormatter.normalize(input);
    expect(result).toBe(expected);
  });
});
