import type { Video } from "../data/videos";

/** Czas trwania z miniatury szkicu v2 (YouTube). */
export const VIDEO_DURATIONS: Record<string, string> = {
  "0kEZ_dyK3wc": "1:46",
  mrvSIZmhyHM: "10:29",
  "9TE8NQts6S0": "12:38",
  z58JuftX_Yc: "11:22",
  tbEMn5TWEuU: "7:00",
  Ks5k02lShrU: "8:55",
  XRNZnQu6Mvs: "9:31",
  "8Dou9BRpJuc": "12:24",
  l39AQwp_80s: "10:36",
  "7-3rGVgGZrE": "9:40",
  ksFhQG2UzcY: "7:21",
  "wT-bbaieZSI": "9:42",
  D8fzd568sfs: "7:57",
  "Jpe-JITSIYE": "13:46",
  ahD_wBBBwn4: "12:05",
  "u2ng-fKx4Ws": "12:16",
  VYQbfovzJX8: "9:09",
  ulBfsb9cmk4: "9:15",
  RTrMZgT2M_s: "11:44",
  d6lqoi_hqGc: "8:29",
  jc_LfYdyJfc: "3:32",
  kVdBprxFOuM: "0:38",
  "3VxS5J5BwR4": "10:08",
};

export type CountryFilter =
  | "all"
  | "do"
  | "cr"
  | "ni"
  | "sv"
  | "gt"
  | "mx"
  | "eu";

const COUNTRY_RULES: { code: CountryFilter; flag: string; label: string; test: RegExp }[] =
  [
    { code: "do", flag: "🇩🇴", label: "Dominikana", test: /dominikana/i },
    { code: "cr", flag: "🇨🇷", label: "Kostaryka", test: /kostaryka/i },
    { code: "ni", flag: "🇳🇮", label: "Nikaragua", test: /nikaragua/i },
    { code: "sv", flag: "🇸🇻", label: "Salwador", test: /salwador/i },
    { code: "gt", flag: "🇬🇹", label: "Gwatemala", test: /gwatemala/i },
    { code: "mx", flag: "🇲🇽", label: "Meksyk", test: /meksyk/i },
  ];

export function countryForVideo(video: Video): CountryFilter {
  if (video.playlist === "europa") return "eu";
  if (/cała wyprawa|ameryka środkowa i dominikana/i.test(video.title)) {
    return "all";
  }
  for (const rule of COUNTRY_RULES) {
    if (rule.test.test(video.title)) return rule.code;
  }
  return "all";
}

export function metaLine(video: Video): string {
  if (video.playlist === "europa") {
    const date = formatSketchDate(video.publishedOn);
    return `🇪🇺 Europa · ${date}`;
  }
  const code = countryForVideo(video);
  if (code === "all") {
    return "🌎 Cała wyprawa · 2020";
  }
  const rule = COUNTRY_RULES.find((r) => r.code === code);
  const date = formatSketchDate(video.publishedOn);
  return `${rule?.flag ?? "🌎"} ${rule?.label ?? ""} · ${date}`;
}

function formatSketchDate(publishedOn: string | null): string {
  if (!publishedOn) return "2020";
  const [y, m, d] = publishedOn.split("-");
  if (y === "2020" && m && d) {
    return `${d}.${m}.${y}`;
  }
  return y ?? "2020";
}

export function durationFor(video: Video): string | undefined {
  return VIDEO_DURATIONS[video.youtubeId];
}

/** Pierwsze 8 kart widoczne przed „Pokaż wszystkie” (jak szkic). */
export function initiallyCollapsed(index: number, playlist: Video["playlist"]): boolean {
  return playlist === "ameryka" && index >= 8;
}
