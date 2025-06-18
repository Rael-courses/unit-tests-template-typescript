import { HtmlParser } from "@/tp-html-parser/HtmlParser";
import { container } from "tsyringe";

describe("HTML Parser", () => {
  const htmlParser = container.resolve(HtmlParser);

  it.each`
    input                                                                                | expected
    ${'<a href="https://example.com">Example</a>'}                                       | ${{ href: "https://example.com", text: "Example" }}
    ${'<a href="https://example.com" class="link">Example</a>'}                          | ${{ href: "https://example.com", text: "Example" }}
    ${'<a class="link" href="https://example.com">Example</a>'}                          | ${{ href: "https://example.com", text: "Example" }}
    ${'<a class="link" href="https://example.com" aria-label="label sample>Example</a>'} | ${{ href: "https://example.com", text: "Example" }}
    ${'<a href="http://example.com">Example</a>'}                                        | ${{ href: "http://example.com", text: "Example" }}
    ${'<a href="http://example.com" class="link">Example</a>'}                           | ${{ href: "http://example.com", text: "Example" }}
    ${'<a class="link" href="http://example.com">Example</a>'}                           | ${{ href: "http://example.com", text: "Example" }}
    ${'<a class="link" href="http://example.com" aria-label="label sample>Example</a>'}  | ${{ href: "http://example.com", text: "Example" }}
  `("should parse <a> tags for $input", ({ input, expected }) => {
    const result = htmlParser.parseLink(input);
    expect(result).toEqual(expected);
  });

  it.each`
    input
    ${'<a href="https://example"Example</a>'}
    ${'<a class="invalid-url">Example</a>'}
    ${'<a href="https://example">Example<a>'}
  `("should throw error for invalid <a> tags: $input", ({ input }) => {
    const act = () => htmlParser.parseLink(input);
    expect(act).toThrow("InvalidTag");
  });

  it.each`
    input
    ${'<a href="https://example">Example</a>'}
    ${'<a href="invalid-url">Example</a>'}
    ${'<a href="">Example</a>'}
  `("should throw error for invalid href value: $input", ({ input }) => {
    const act = () => htmlParser.parseLink(input);
    expect(act).toThrow("InvalidHref");
  });

  it.each`
    input
    ${'<a href="https://example.com"></a>'}
    ${'<a href="https://example.com" class="link">  </a>'}
  `("should throw error for invalid <a> tags: $input", ({ input }) => {
    const act = () => htmlParser.parseLink(input);
    expect(act).toThrow("InvalidText");
  });
});
