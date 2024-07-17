import { truncateAfterDomain } from "./shortenUrl";

import { it, describe, expect } from "vitest";

describe("test suit for shortenUrl", () => {
  const url = "https://www.github.com/tim-quattrochi";

  const shortenedUrl = truncateAfterDomain(url);

  it("should return only the domain", () => {
    expect(shortenedUrl).toBe("www.github.com");
  });

  it("should end with .com", () => {
    expect(shortenedUrl.endsWith(".com")).toBe(true);
  });

  it("should be a string", () => {
    expect(typeof shortenedUrl).toBe("string");
  });

  it("should return an empty string if passed a falsy value", () => {
    expect(truncateAfterDomain(null)).toBe("");
    expect(truncateAfterDomain(0)).toBe("");
    expect(truncateAfterDomain(undefined)).toBe("");
    expect(truncateAfterDomain(2)).toBe("");
  });
  it("should throw an error if passed a non string value", () => {
    expect(truncateAfterDomain()).toBe("");
  });

  it("should throw an error if passed a url without a top level domain(TLD)", () => {
    expect(() =>
      truncateAfterDomain("https://www.yahoo")
    ).toThrowError("Invalid URL");
  });
});
