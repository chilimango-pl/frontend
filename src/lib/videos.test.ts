import { describe, expect, it } from "vitest";
import astroConfig from "../../astro.config.mjs";

describe("site", () => {
  it("site.url is https://chilimango.pl", () => {
    expect(String(astroConfig.site)).toBe("https://chilimango.pl");
  });
});
