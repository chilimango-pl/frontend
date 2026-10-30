# Warm-paper homepage implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the cream Chilimango homepage with the approved warm-paper page.

**Architecture:** `latestDatedVideos` picks three catalog films. The homepage is five sections plus a header and footer. Playback stays on the existing YouTube facade. `public/hero.jpg` is optional and is not committed.

**Tech Stack:** Astro 7.4.0, TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-30-homepage-redesign-design.md`. If this plan and the spec disagree, the spec wins.

## Global Constraints

- Polish only. No `/en/` link and no English pages.
- Hero text is `Chilimango` then italic `rodzina w podróży`.
- No planned-trip list, no subscribe banner, no `<form`, no `córk` / `czworo` / `3 i 5`.
- Do not change ids, titles, or dates in `src/data/videos.ts`.
- Do not edit Azure, workflows, DNS, or `docs/plans/chilimango-www-v2.md`.
- Do not load a webfont. Body is `system-ui`. Headlines are `Georgia, "Iowan Old Style", Palatino, serif`.
- Colors: paper `#f6f1e7`, ink `#1c1612`, brown `#8a6232`, muted `#6b5e52`, body `#3c332c`, hairline `#e0d3c2`, button text `#f6f1e7`.
- Film cards use the full catalog `title`.
- No iframe in the built HTML. Click uses `youtube-nocookie.com`.
- `npm test` and `npm run build` pass.
- Content width `880px`. Stack below `800px`.

---

### Task 1: Dated-film selection

**Files:**
- Create: `src/lib/latestVideos.ts`
- Test: `src/lib/latestVideos.test.ts`

**Interfaces:**
- Consumes: `Video` from `src/data/videos.ts`
- Produces: `latestDatedVideos(videos: Video[], count: number): Video[]` and `formatPublishedOn(iso: string): string`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from "vitest";
import { videos, type Video } from "../data/videos";
import { formatPublishedOn, latestDatedVideos } from "./latestVideos";

describe("formatPublishedOn", () => {
  it("formats an ISO date in Polish", () => {
    expect(formatPublishedOn("2021-02-20")).toBe("20 lutego 2021");
    expect(formatPublishedOn("2020-10-11")).toBe("11 października 2020");
  });
});

describe("latestDatedVideos", () => {
  it("returns the three newest dated catalog films", () => {
    expect(latestDatedVideos(videos, 3).map((video) => video.youtubeId)).toEqual([
      "3VxS5J5BwR4",
      "kVdBprxFOuM",
      "ahD_wBBBwn4",
    ]);
  });

  it("skips null and non-ISO dates", () => {
    const fixture: Video[] = [
      { youtubeId: "aaaaaaaaaaa", title: "a", playlist: "europa", publishedOn: null, tripDate: null },
      { youtubeId: "bbbbbbbbbbb", title: "b", playlist: "europa", publishedOn: "soon", tripDate: null },
      { youtubeId: "ccccccccccc", title: "c", playlist: "europa", publishedOn: "2020-01-02", tripDate: null },
      { youtubeId: "ddddddddddd", title: "d", playlist: "europa", publishedOn: "2020-01-02", tripDate: null },
    ];
    expect(latestDatedVideos(fixture, 3).map((video) => video.youtubeId)).toEqual([
      "ccccccccccc",
      "ddddddddddd",
    ]);
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npx vitest run src/lib/latestVideos.test.ts`

Expected: FAIL because `./latestVideos` does not exist.

- [ ] **Step 3: Implement**

```ts
import type { Video } from "../data/videos";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MONTHS = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

export function formatPublishedOn(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function latestDatedVideos(videos: Video[], count: number): Video[] {
  return videos
    .map((video, index) => ({ video, index }))
    .filter(({ video }) => video.publishedOn !== null && DATE.test(video.publishedOn))
    .sort((a, b) => {
      const byDate = b.video.publishedOn!.localeCompare(a.video.publishedOn!);
      return byDate !== 0 ? byDate : a.index - b.index;
    })
    .slice(0, count)
    .map(({ video }) => video);
}
```

- [ ] **Step 4: Re-run the test**

Run: `npx vitest run src/lib/latestVideos.test.ts`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/latestVideos.ts src/lib/latestVideos.test.ts
git commit -m "feat: select the three newest dated films"
```

### Task 2: Warm-paper shell

**Files:**
- Modify: `src/layouts/Base.astro`
- Modify: `src/styles/global.css`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

**Interfaces:**
- Consumes: nothing from Task 1
- Produces: header anchors `#filmy`, `#gdzie-bylismy`, `#o-nas`; footer channel link; page tokens on `body`

- [ ] **Step 1: Remove webfonts from Base.astro**

Delete both preconnect links and the Baloo/Nunito stylesheet link. Set the default description to `Podróżujemy, kręcimy filmy, jemy roślinnie i podróżujemy świadomie.` Keep the skip link and `yt-facade.js`. Remove the `homepage.js` script tag.

- [ ] **Step 2: Replace `src/styles/global.css`**

The file becomes the warm-paper theme only. Required rules:

```css
:root {
  --paper: #f6f1e7;
  --ink: #1c1612;
  --brown: #8a6232;
  --muted: #6b5e52;
  --body: #3c332c;
  --hairline: #e0d3c2;
  --serif: Georgia, "Iowan Old Style", Palatino, serif;
  --sans: system-ui, sans-serif;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  line-height: 1.5;
}
img { max-width: 100%; display: block; }
a { color: inherit; }
h1, h2 { font-family: var(--serif); font-weight: 500; line-height: 1.05; margin: 0; }
.wrap { max-width: 880px; margin: 0 auto; padding: 0 32px; }
.skip { position: absolute; left: -999px; top: 8px; background: var(--ink); color: var(--paper); padding: 8px 14px; }
.skip:focus { left: 8px; }
:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.wordmark { font-family: var(--sans); letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none; }
.nav-links { display: flex; gap: 18px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.nav-links a { text-decoration: none; }
.site-header, .site-footer { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
.site-header { padding: 28px 0 18px; border-bottom: 1px solid var(--hairline); }
.hero { padding: 64px 0 48px; }
.hero h1 { font-size: clamp(40px, 7vw, 64px); }
.hero-italic { font-family: var(--serif); font-size: clamp(28px, 4vw, 40px); font-style: italic; color: var(--brown); margin: 10px 0 0; }
.hero-lead { color: var(--body); max-width: 42ch; margin: 22px 0 0; }
.btn-ink { display: inline-block; margin-top: 26px; background: var(--ink); color: var(--paper); text-decoration: none; letter-spacing: 0.14em; text-transform: uppercase; font-size: 12px; padding: 14px 18px; }
.section-rule { border-top: 1px solid var(--hairline); padding: 28px 0; }
.row-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; border-bottom: 1px solid var(--ink); padding-bottom: 8px; }
.row-head a { color: var(--brown); letter-spacing: 0.14em; text-transform: uppercase; font-size: 12px; text-decoration: none; }
.episodes { display: grid; grid-template-columns: 1.45fr 0.8fr; gap: 18px; margin-top: 18px; }
.episodes-side { display: grid; gap: 18px; align-content: start; }
.episode-date { color: var(--brown); letter-spacing: 0.14em; text-transform: uppercase; font-size: 11px; margin: 12px 0 4px; }
.episode h3 { font-family: var(--serif); font-weight: 500; font-size: 16px; line-height: 1.25; margin: 0; }
.episode-feature h3 { font-size: 26px; }
.episode-thumb { width: 100%; object-fit: cover; background: #e7dccb; }
.episode-feature .episode-thumb { height: 250px; }
.episodes-side .episode-thumb { height: 96px; }
.places { font-size: 16px; line-height: 1.7; margin: 8px 0 0; }
.about { display: grid; grid-template-columns: 180px 1fr; gap: 24px; }
.about p { margin: 0; max-width: 58ch; font-size: 16px; line-height: 1.55; }
.site-footer { border-top: 1px solid var(--ink); padding: 16px 0 32px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.hero-split { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 36px; align-items: end; }
.hero-photo { width: 100%; height: 100%; min-height: 220px; object-fit: cover; }
@media (max-width: 799px) {
  .site-header, .hero-split, .episodes, .about { display: block; }
  .nav-links { margin-top: 12px; }
  .episodes-side { margin-top: 18px; }
  .hero-photo { margin-top: 24px; height: 220px; }
}
```

- [ ] **Step 3: Rewrite the header and footer**

Header: wordmark to `/`, links Filmy / Gdzie byliśmy / O nas to the three ids. No `LogoMark`, no language switch, no burger.

Footer: left text `Chilimango`. Right link `YouTube · @Chilimango` to `https://www.youtube.com/@Chilimango` with `target="_blank"` and `rel="noopener"`. No Instagram.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro src/styles/global.css src/components/Header.astro src/components/Footer.astro
git commit -m "feat: set the warm-paper page shell"
```

### Task 3: Homepage sections

**Files:**
- Create: `src/components/LatestEpisodes.astro`
- Create: `src/components/VisitedPlaces.astro`
- Modify: `src/components/Hero.astro`
- Modify: `src/components/AboutHome.astro`
- Modify: `src/components/VideoCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `latestDatedVideos`, `formatPublishedOn`, `videos`
- Produces: the homepage section order from the spec

- [ ] **Step 1: Hero**

`h1` is `Chilimango`. Italic paragraph is `rodzina w podróży`. Lead is `Podróżujemy, kręcimy filmy, jemy roślinnie i podróżujemy świadomie.` Button `Oglądaj najnowszy` links to `#filmy`.

If `src/../public/hero.jpg` exists at build time (`import.meta` is wrong here; use `existsSync` from `node:fs` on `new URL("../../public/hero.jpg", import.meta.url)`), render `<img class="hero-photo" src="/hero.jpg" alt="">` inside `.hero-split`. If it does not exist, render only the text and no `img`.

- [ ] **Step 2: Episode variant on VideoCard**

Add `variant: "episode"` and a required `dateLabel: string` for that variant. Episode cards are never `hidden`. They show the thumbnail, `dateLabel`, the full `video.title` in an `h3`, and the notice `Odtworzenie ładuje YouTube i może zapisać ciasteczka YouTube.` Keep `data-yt-facade`, `data-youtube-id`, and the play button. Do not show flag meta lines on this variant.

- [ ] **Step 3: LatestEpisodes**

Section `id="filmy"`. Heading `Najnowsze odcinki`. Link `Wszystkie na YouTube` to the channel, `target="_blank"`, `rel="noopener"`.

```ts
const latest = latestDatedVideos(videos, 3);
```

First item uses classes `episode episode-feature`. The other items sit in `.episodes-side`. Pass `dateLabel={formatPublishedOn(video.publishedOn!)}`.

- [ ] **Step 4: VisitedPlaces**

Section `id="gdzie-bylismy"`, class `section-rule`. Heading `Gdzie byliśmy`. One paragraph, class `places`:

`Dominikana · Kostaryka · Nikaragua · Salwador · Gwatemala · Meksyk · Francja · Belgia · Luksemburg · Andora`

- [ ] **Step 5: About**

Section `id="o-nas"`, class `section-rule about`. Heading `O nas`. One paragraph:

`Chilimango to my, Marta i Bartek. Podróżujemy, kręcimy filmy, jemy roślinnie i podróżujemy świadomie. Odcinki są na kanale @Chilimango.`

The `@Chilimango` link uses the channel URL, `target="_blank"`, `rel="noopener"`. No illustration, language chips, Insta360 sentence, or backpack sentence.

- [ ] **Step 6: index.astro**

```astro
<Base title="Chilimango – rodzina w podróży">
  <Header />
  <main id="main">
    <Hero />
    <LatestEpisodes />
    <VisitedPlaces />
    <AboutHome />
  </main>
  <Footer />
</Base>
```

- [ ] **Step 7: Commit**

```bash
git add src/components/LatestEpisodes.astro src/components/VisitedPlaces.astro src/components/Hero.astro src/components/AboutHome.astro src/components/VideoCard.astro src/pages/index.astro
git commit -m "feat: compose the warm-paper homepage"
```

### Task 4: Remove the old homepage and prove the build

**Files:**
- Modify: `src/lib/homepage.test.ts`
- Delete when unreferenced: `src/components/SeriesAmeryka.astro`, `src/components/SeriesEuropa.astro`, `src/components/MapHome.astro`, `src/components/SubscribeCta.astro`, `src/components/LogoMark.astro`, `src/components/Banana.astro`, `public/homepage.js`

**Interfaces:**
- Consumes: the built `dist/index.html`
- Produces: the spec's test list

- [ ] **Step 1: Confirm deletions**

Run `rg` for each component name and for `homepage.js`. Delete a file only when no remaining source imports it.

- [ ] **Step 2: Replace the dist test so it always rebuilds**

The old test skips the build when `dist/index.html` already exists. That would assert a stale page. Always run `npm run build` inside the test before reading `dist/index.html`, then assert:

- HTML includes `Chilimango` and `rodzina w podróży`
- ids appear in order: `3VxS5J5BwR4`, then `kVdBprxFOuM`, then `ahD_wBBBwn4`
- all ten place names are present
- HTML does not include `W planach`, `Urugwaj`, `Argentyna`, `Floryda`, `Nie przegap kolejnej wyprawy`, `sub_confirmation`, `href="/en/"`, `<form`, `<iframe`, `córk`, or `hero.jpg`
- About source still has no `córk`, `czworo`, or `3 i 5`

- [ ] **Step 3: Run the suite**

Run: `npm test` then `npm run build`

Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add -A src public
git commit -m "feat: drop the cream homepage and lock the built page"
```

Do not stage secrets, `public/hero.jpg`, or `node_modules`.
