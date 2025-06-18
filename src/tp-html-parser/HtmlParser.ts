export class HtmlParser {
  private readonly aTagRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>(.*)<\/a>/i;
  private readonly urlRegex = /^(https?:\/\/)/i;

  public parseLink(aTag: string): {
    href: string;
    text: string;
  } {
    const matches = this.aTagRegex.exec(aTag);
    if (!matches) {
      throw new Error("InvalidTag");
    }

    const href = matches[1]?.trim();
    const text = matches[2]?.trim();

    if (!href) {
      throw new Error("InvalidHref");
    }
    if (!this.urlRegex.test(href) || href.split(".").length < 2) {
      throw new Error("InvalidHref");
    }

    if (!text) {
      throw new Error("InvalidText");
    }

    return {
      href,
      text,
    };
  }
}
