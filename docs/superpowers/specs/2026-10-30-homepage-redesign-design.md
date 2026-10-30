# Chilimango homepage redesign

Approved 30 October 2026. This document is the source of truth for the homepage. Implement this page. Do not invent a second layout.

The reference for the structure is the Chicago Jacobs homepage (https://chicagojacobs.com/). The palette is the warm-paper direction approved in review, not the black-and-gold reference palette and not the current chili/mango theme.

## Goal

Replace the current cream homepage with one Polish editorial page: a typographic hero, the three newest dated films, the places already visited, a short about block, and a footer. A photo can be added later by dropping one file in the repo. No other page is part of this work.

## Decisions

- Polish only. Remove the PL/EN switch. Do not create `/en/`.
- Hero lines, in this order: `Chilimango`, then italic `rodzina w podróży`.
- No “now showing” strip.
- Latest episodes: the newest dated film, large, with the next two dated films beside it.
- Places already visited only. No planned trip.
- Short about block, then the footer. No separate subscribe banner.
- First ship has no photograph. The live hero does not show a dashed box or the words “Miejsce na zdjęcie”.
- Film titles on the page are the full `title` strings from `src/data/videos.ts`. The preview shortened two of them to fit the mockup. Do not invent display titles.

## Visual system

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f6f1e7` | Page background |
| Ink | `#1c1612` | Headlines, body, filled button background, footer rule |
| Brown | `#8a6232` | Italic hero line, dates, “Wszystkie na YouTube” |
| Muted | `#6b5e52` | Header nav, footer |
| Body | `#3c332c` | Supporting paragraph |
| Hairline | `#e0d3c2` | Section rules |

Body text, labels, dates, nav, and buttons use `system-ui, sans-serif`. Headlines use `Georgia, "Iowan Old Style", Palatino, serif`. Do not load Baloo 2, Nunito, or any other webfont. Remove the Google Fonts links from `src/layouts/Base.astro`.

Buttons are rectangular, filled ink, cream text (`#f6f1e7`), uppercase, letter-spacing `0.14em`. No pill radius. No chili red, mango orange, or jungle green on this page.

The wordmark is the word `Chilimango` in uppercase with letter-spacing `0.18em`. Do not render the colored chili/mango logo mark.

Keep a visible focus style and the existing skip link “Przejdź do treści”.

## Page

One column, content width `880px`, centered. `html lang="pl"`. The layout stacks below `800px`.

Document title: `Chilimango – rodzina w podróży`.

Meta description: `Podróżujemy, kręcimy filmy, jemy roślinnie i podróżujemy świadomie.`

Order:

1. Header
2. Hero
3. Najnowsze odcinki (`id="filmy"`)
4. Gdzie byliśmy (`id="gdzie-bylismy"`)
5. O nas (`id="o-nas"`)
6. Footer

### Header

Left: wordmark linking to `/`. Right: text links `Filmy`, `Gdzie byliśmy`, `O nas`, pointing at `#filmy`, `#gdzie-bylismy`, and `#o-nas`. No English link. No hamburger. Below 800px, the links sit on a line under the wordmark.

### Hero

`h1` text `Chilimango`. The next line is italic brown: `rodzina w podróży`. It is not part of the `h1`.

Supporting paragraph, ink body color:

`Podróżujemy, kręcimy filmy, jemy roślinnie i podróżujemy świadomie.`

Button label `Oglądaj najnowszy`. It is an anchor to `#filmy`.

When `public/hero.jpg` exists, the hero is two columns at 800px and wider: words on the left, the photograph on the right, `object-fit: cover`. Below 800px the words come first and the photograph follows the button. When the file does not exist, render no `img` and let the words use the full content width.

### Najnowsze odcinki

Heading: `Najnowsze odcinki`. Beside it, on the right: `Wszystkie na YouTube`, linking to `https://www.youtube.com/@Chilimango` with `target="_blank"` and `rel="noopener"`.

At 800px and wider, the first film is the large left card and the other two stack on the right. Below 800px, the three cards stack, newest first.

Each card shows:

- The YouTube thumbnail `https://i.ytimg.com/vi/{youtubeId}/hqdefault.jpg`
- The publish date in Polish, day without a leading zero, month in genitive, then the year. `2021-02-20` renders as `20 lutego 2021`. Months: stycznia, lutego, marca, kwietnia, maja, czerwca, lipca, sierpnia, września, października, listopada, grudnia.
- The full catalog title
- The existing notice: `Odtworzenie ładuje YouTube i może zapisać ciasteczka YouTube.`

### Gdzie byliśmy

Heading: `Gdzie byliśmy`.

One line, in this order, separated with ` · `:

Dominikana, Kostaryka, Nikaragua, Salwador, Gwatemala, Meksyk, Francja, Belgia, Luksemburg, Andora.

No second column. No heading “W planach”. No map drawing, pins, or route SVG.

### O nas

Heading: `O nas`.

Paragraph:

`Chilimango to my, Marta i Bartek. Podróżujemy, kręcimy filmy, jemy roślinnie i podróżujemy świadomie. Odcinki są na kanale @Chilimango.`

`@Chilimango` links to `https://www.youtube.com/@Chilimango` with `target="_blank"` and `rel="noopener"`.

Do not include the backpack sentence, the Insta360 sentence, the language chips, or the illustration from the current about block.

### Footer

A top rule in ink. Left: `Chilimango`. Right: `YouTube · @Chilimango`, same channel URL, `target="_blank"`, `rel="noopener"`. No Instagram, Facebook, or email.

## Films

Read `src/data/videos.ts`. Do not change video ids, titles, or dates in that file.

Put the selection in `src/lib/latestVideos.ts` as `latestDatedVideos(videos, count)`. The homepage calls it with the catalog and `3`.

A film is eligible when `publishedOn` matches `^\d{4}-\d{2}-\d{2}$`. Sort eligible films by `publishedOn` descending. If two dates are equal, keep the earlier catalog order. Take the first three.

With the catalog as of this spec, the homepage order is:

| Role | youtubeId | publishedOn |
| --- | --- | --- |
| Large | `3VxS5J5BwR4` | 2021-02-20 |
| Side, top | `kVdBprxFOuM` | 2021-02-06 |
| Side, bottom | `ahD_wBBBwn4` | 2020-10-11 |

Films with `publishedOn: null` stay in the catalog and do not appear on the homepage. If fewer than three films are eligible, show the eligible ones and do not invent cards.

## Playback

Keep `public/yt-facade.js` and the current card contract: `data-yt-facade`, `data-youtube-id`, a thumbnail, and a play button. The HTML has no iframe. A click replaces the thumbnail with an iframe whose `src` starts with `https://www.youtube-nocookie.com/embed/` and includes `autoplay=1`.

Stop loading `public/homepage.js`. It only drives the old burger, the recording clock, and the series filter. Delete it if nothing else references it.

## What leaves the homepage

`src/pages/index.astro` no longer renders the Central America grid, the Europe grid, the SVG map, the subscribe banner, or the language switch.

Delete a component after this change only when nothing imports it. Leave `src/data/videos.ts` in place.

Do not edit Azure, GitHub workflows, DNS, or `docs/plans/chilimango-www-v2.md`.

## Edge cases

- Missing `public/hero.jpg`: no image element, full-width type.
- A `publishedOn` value that is null or not `YYYY-MM-DD`: the film is skipped.
- Fewer than three eligible films: render the ones that exist, newest first.
- The about source and the built homepage must not contain `córk`, `czworo`, or `3 i 5`. The word `rodzina` in the hero is required and does not violate that check.
- The built homepage must not contain a `<form`.

## Tests

Extend the existing Vitest homepage checks. `npm test` and `npm run build` both pass.

Assert all of the following on the built `dist/index.html`, case as written unless noted:

- `Chilimango` and `rodzina w podróży` are present.
- The three youtube ids appear in document order: `3VxS5J5BwR4`, then `kVdBprxFOuM`, then `ahD_wBBBwn4`.
- The ten visited place names are present.
- These strings are absent: `W planach`, `Urugwaj`, `Argentyna`, `Floryda`, `Nie przegap kolejnej wyprawy`, `sub_confirmation`, `href="/en/`.
- No `<form`.
- No `<iframe` before any click (the built file has none).
- No `córk`.
- `public/hero.jpg` is not required for the build. The built HTML contains no `hero.jpg` while that file is absent.

Add a unit test for the selection function: given the catalog, it returns those three ids in that order, and a fixture with a null date and a non-date string omits both.

## Out of scope

English pages, planned trips, a subscribe banner, photo galleries, a year archive, series index pages, a spinning globe, new photographs, changes to the video catalog, and hosting.
