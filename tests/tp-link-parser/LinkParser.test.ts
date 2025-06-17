import { LinkParser } from "@/tp-link-parser/LinkParser";
import { container } from "tsyringe";

describe("LinkParser", () => {
  const linkParser = container.resolve(LinkParser);

  it.each`
    input                                                              | expected
    ${'<a href="https://example.com/path/to/resource">Click here</a>'} | ${{ href: "https://example.com/path/to/resource", text: "Click here" }}
    ${'<a href="http://example.com">Visit Example</a>'}                | ${{ href: "http://example.com", text: "Visit Example" }}
  `("should parse a valid link: $input", ({ input, expected }) => {
    const result = linkParser.parseLinkWithoutRegex(input);
    expect(result).toEqual(expected);
  });

  it.each`
    input
    ${'<a href="https://example.com"></'}
    ${'<a href="https://example.com"Click here</a>'}
  `("should throw an error for invalid tag: $input", ({ input }) => {
    const act = () => linkParser.parseLinkWithoutRegex(input);
    expect(act).toThrow("InvalidTag");
  });

  it.each`
    input
    ${'<a href="https://example.com"></a>'}
    ${'<a href="https://example.com"> </a>'}
  `("should throw an error for empty text: $input", ({ input }) => {
    const act = () => linkParser.parseLinkWithoutRegex(input);
    expect(act).toThrow("InvalidText");
  });

  it.each`
    input
    ${'<a href="">Empty Link</a>'}
    ${'<a href="invalid-url">Invalid Link</a>'}
    ${'<a href="https://">Incomplete URL</a>'}
    ${'<a href="http://example">Missing TLD</a>'}
    ${'<a href="http://example.">Incomplete Domain</a>'}
  `("should throw an error for invalid href format: $input", ({ input }) => {
    const act = () => linkParser.parseLinkWithoutRegex(input);
    expect(act).toThrow("InvalidHref");
  });

  it.each`
    input                                                              | expected
    ${'<a href="https://example.com/path/to/resource">Click here</a>'} | ${{ href: "https://example.com/path/to/resource", text: "Click here" }}
    ${'<a href="http://example.com">Visit Example</a>'}                | ${{ href: "http://example.com", text: "Visit Example" }}
  `("should parse a valid link: $input", ({ input, expected }) => {
    const result = linkParser.parseLinkWithRegex(input);
    expect(result).toEqual(expected);
  });

  it.each`
    input
    ${'<a href="https://example.com"></'}
    ${'<a href="https://example.com"Click here</a>'}
  `("should throw an error for invalid tag: $input", ({ input }) => {
    const act = () => linkParser.parseLinkWithRegex(input);
    expect(act).toThrow("InvalidTag");
  });

  it.each`
    input
    ${'<a href="https://example.com"></a>'}
    ${'<a href="https://example.com"> </a>'}
  `("should throw an error for empty text: $input", ({ input }) => {
    const act = () => linkParser.parseLinkWithRegex(input);
    expect(act).toThrow("InvalidText");
  });

  it.each`
    input
    ${'<a href="">Empty Link</a>'}
    ${'<a href="invalid-url">Invalid Link</a>'}
    ${'<a href="https://">Incomplete URL</a>'}
    ${'<a href="http://example">Missing TLD</a>'}
    ${'<a href="http://example.">Incomplete Domain</a>'}
  `("should throw an error for invalid href format: $input", ({ input }) => {
    const act = () => linkParser.parseLinkWithRegex(input);
    expect(act).toThrow("InvalidHref");
  });
});
