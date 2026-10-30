import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const DIST_INDEX = resolve(process.cwd(), "dist/index.html");
const ABOUT_SOURCE = resolve(process.cwd(), "src/components/AboutHome.astro");
const PLACES = [
  "Dominikana",
  "Kostaryka",
  "Nikaragua",
  "Salwador",
  "Gwatemala",
  "Meksyk",
  "Francja",
  "Belgia",
  "Luksemburg",
  "Andora",
];

describe("AboutHome source", () => {
  it("does not mention córki or child ages", () => {
    const source = readFileSync(ABOUT_SOURCE, "utf8").toLowerCase();
    expect(source).not.toContain("córk");
    expect(source).not.toContain("czworo");
    expect(source).not.toMatch(/\b3 i 5\b/);
  });
});

describe("homepage dist", () => {
  it("matches the warm-paper homepage", () => {
    execSync("npm run build", {
      cwd: process.cwd(),
      stdio: "pipe",
      env: process.env,
    });
    const html = readFileSync(DIST_INDEX, "utf8");
    const lower = html.toLowerCase();

    expect(html).toContain("Chilimango");
    expect(html).toContain("rodzina w podróży");
    for (const place of PLACES) expect(html).toContain(place);

    const first = html.indexOf("3VxS5J5BwR4");
    const second = html.indexOf("kVdBprxFOuM");
    const third = html.indexOf("ahD_wBBBwn4");
    expect(first).toBeGreaterThanOrEqual(0);
    expect(first).toBeLessThan(second);
    expect(second).toBeLessThan(third);

    expect(lower).not.toContain("w planach");
    expect(html).not.toContain("Urugwaj");
    expect(html).not.toContain("Argentyna");
    expect(html).not.toContain("Floryda");
    expect(html).not.toContain("Nie przegap kolejnej wyprawy");
    expect(html).not.toContain("sub_confirmation");
    expect(html).not.toContain('href="/en/');
    expect(lower).not.toMatch(/<form\b/);
    expect(lower).not.toMatch(/<iframe/);
    expect(lower).not.toContain("córk");
    expect(html).not.toContain("hero.jpg");
  });
});
