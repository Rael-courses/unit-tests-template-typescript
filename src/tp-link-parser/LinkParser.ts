export class LinkParser {
  public parseLinkWithoutRegex(input: string) {
    const href = input.replace('<a href="', "").split('"')[0];
    const text = (input.split(">")?.[1] ?? "").split("<")[0];

    const isTagValid =
      input.startsWith("<a href=") &&
      input.endsWith("</a>") &&
      input.split("</a>")?.[0]?.split(">")?.length === 2;
    if (!isTagValid) {
      throw new Error("InvalidTag");
    }

    const isTextEmpty = !text || text.trim() === "";
    if (isTextEmpty) {
      throw new Error("InvalidText");
    }

    const isHrefEmpty = !href;
    if (isHrefEmpty) {
      throw new Error("InvalidHref");
    }

    const isHrefStartingWithProtocol =
      href.startsWith("https://") || href.startsWith("http://");

    if (!isHrefStartingWithProtocol) {
      throw new Error("InvalidHref");
    }

    const parts = href.split(".");
    const isHrefMissingParts = parts.length < 2 || parts.some((part) => !part);
    if (isHrefMissingParts) {
      throw new Error("InvalidHref");
    }
    return {
      href,
      text,
    };
  }

  public parseLinkWithRegex(input: string) {
    const tagPattern = /^<a href="([^"]*)">([^<]*)<\/a>$/;
    const match = input.match(tagPattern);
    if (!match) {
      throw new Error("InvalidTag");
    }

    const href = match[1];
    const text = match[2];

    if (!text || text.trim() === "") {
      throw new Error("InvalidText");
    }

    if (!href || !/^https?:\/\/.+\..+/.test(href)) {
      throw new Error("InvalidHref");
    }

    return { href, text };
  }
}
