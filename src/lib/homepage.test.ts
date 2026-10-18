import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const DIST_INDEX = resolve(process.cwd(), "dist/index.html");
const ABOUT_SOURCE = resolve(process.cwd(), "src/components/AboutHome.astro");

describe("AboutHome source", () => {
  it("does not mention córki or child ages", () => {
    const source = readFileSync(ABOUT_SOURCE, "utf8").toLowerCase();
    expect(source).not.toContain("córk");
    expect(source).not.toContain("czworo");
    expect(source).not.toMatch(/\b3 i 5\b/);
  });
});

describe("homepage dist", () => {
  it("dist/index.html has no córk nor form tags", () => {
    if (!existsSync(DIST_INDEX)) {
      execSync("npm run build", {
        cwd: process.cwd(),
        stdio: "pipe",
        env: process.env,
      });
    }
    const html = readFileSync(DIST_INDEX, "utf8").toLowerCase();
    expect(html).not.toContain("córk");
    expect(html).not.toMatch(/<form\b/);
  });
});
