export const PLAYLIST_IDS = {
  ameryka: "PLPaMIRjW6qqvB2Fgh32HcM4wttnOQ1u5I",
  europa: "PLPaMIRjW6qqufkgJL_aNsanSjry60zTYL",
} as const;

export type PlaylistSlug = keyof typeof PLAYLIST_IDS;

export type Video = {
  youtubeId: string;
  title: string;
  playlist: PlaylistSlug;
  publishedOn: string | null;
  tripDate: null;
};

export const videos: Video[] = [
  {
    youtubeId: "0kEZ_dyK3wc",
    title:
      "Ameryka Środkowa i Dominikana z Plecakiem w 3 Miesiące / 4K",
    playlist: "ameryka",
    publishedOn: "2019-11-06",
    tripDate: null,
  },
  {
    youtubeId: "mrvSIZmhyHM",
    title:
      "#1 Dominikana - Wakacje na Karaibach | Jak Samodzielnie Podróżować | 4K",
    playlist: "ameryka",
    publishedOn: "2019-11-15",
    tripDate: null,
  },
  {
    youtubeId: "9TE8NQts6S0",
    title:
      "#2 Kostaryka | Czy Wejście na Aktywny WULKAN Jest Bezpieczne? | Krokodyle i Leniwce | 4K",
    playlist: "ameryka",
    publishedOn: "2019-12-11",
    tripDate: null,
  },
  {
    youtubeId: "z58JuftX_Yc",
    title: "#3 Kostaryka | Idziemy na Cmentarz Dnem Oceanu Spokojnego | 4K",
    playlist: "ameryka",
    publishedOn: "2020-01-01",
    tripDate: null,
  },
  {
    youtubeId: "tbEMn5TWEuU",
    title: "#4 Kostaryka - Uratowaliśmy Żółwie | Niezwykła Wycieczka | 4K",
    playlist: "ameryka",
    publishedOn: "2020-01-18",
    tripDate: null,
  },
  {
    youtubeId: "Ks5k02lShrU",
    title:
      "#5 Nikaragua - Mieszkamy z Rodziną | Nauka Hiszpańskiego i Surfing | 4K",
    playlist: "ameryka",
    publishedOn: "2020-03-02",
    tripDate: null,
  },
  {
    youtubeId: "XRNZnQu6Mvs",
    title:
      "#6 Nikaragua | Przeprawiamy Się Przez NAJWIĘKSZE JEZIORO Ameryki Środkowej | 4K",
    playlist: "ameryka",
    publishedOn: "2020-03-12",
    tripDate: null,
  },
  {
    youtubeId: "8Dou9BRpJuc",
    title: "#7 Dlaczego Nie Ma Turystów Na Wyspie Ometepe? | Nikaragua | 4K",
    playlist: "ameryka",
    publishedOn: "2020-04-09",
    tripDate: null,
  },
  {
    youtubeId: "l39AQwp_80s",
    title:
      "#8 Niezwykłe Nocne Rozbłyski Fal Oceanicznych - Bioluminescencja | Nikaragua | 4k",
    playlist: "ameryka",
    publishedOn: "2020-04-18",
    tripDate: null,
  },
  {
    youtubeId: "7-3rGVgGZrE",
    title:
      "#9 Straciliśmy Bilety za 4700 zł i Nie Możemy Wrócić do Polski | Granada Nikaragua | 4K",
    playlist: "ameryka",
    publishedOn: "2020-05-03",
    tripDate: null,
  },
  {
    youtubeId: "ksFhQG2UzcY",
    title: "#10 Piekielne Jezioro Lawy | Wulkan Masaya Nikaragua | 4K",
    playlist: "ameryka",
    publishedOn: "2020-05-12",
    tripDate: null,
  },
  {
    youtubeId: "wT-bbaieZSI",
    title:
      "#11 Salwador - Tu Rządzą Gangi, Przemoc i Strach | San Salvador | Ameryka Centralna",
    playlist: "ameryka",
    publishedOn: "2020-06-07",
    tripDate: null,
  },
  {
    youtubeId: "D8fzd568sfs",
    title: "#12 Czy Tu Jest Bezpiecznie? | Salwador Juayua | 4K",
    playlist: "ameryka",
    publishedOn: "2020-06-21",
    tripDate: null,
  },
  {
    youtubeId: "Jpe-JITSIYE",
    title: "#13 W Głębi Lasu Deszczowego | Salwador 4K",
    playlist: "ameryka",
    publishedOn: "2020-09-27",
    tripDate: null,
  },
  {
    youtubeId: "ahD_wBBBwn4",
    title:
      "#14 Co Jedzą Weganie w Podróży? | Weganizm w Gwatemali | Antigua | 4K",
    playlist: "ameryka",
    publishedOn: "2020-10-11",
    tripDate: null,
  },
  {
    youtubeId: "u2ng-fKx4Ws",
    title: "#15 Magiczna Wioska Hipisów w Gwatemali | San Marcos La Laguna 4K",
    playlist: "ameryka",
    publishedOn: null,
    tripDate: null,
  },
  {
    youtubeId: "VYQbfovzJX8",
    title:
      "#16 Wyprawa w Głąb Gwatemali | Pomnik Przyrody w Semuc Champey | 4K",
    playlist: "ameryka",
    publishedOn: null,
    tripDate: null,
  },
  {
    youtubeId: "ulBfsb9cmk4",
    title: "#17 Tikal - Ruiny Miasta Majów w Gwatemali | Flores 4K",
    playlist: "ameryka",
    publishedOn: null,
    tripDate: null,
  },
  {
    youtubeId: "RTrMZgT2M_s",
    title:
      "#18 Meksykańskie Wybrzeże, Cenoty i Turkusowa Laguna | Tulum, Bacalar, Jukatan 4K",
    playlist: "ameryka",
    publishedOn: null,
    tripDate: null,
  },
  {
    youtubeId: "d6lqoi_hqGc",
    title: "#19 Meksyk - Wydaliśmy Nasze Ostatnie Pieniądze | Playa del Carmen 4K",
    playlist: "ameryka",
    publishedOn: null,
    tripDate: null,
  },
  {
    youtubeId: "jc_LfYdyJfc",
    title:
      "Jak Wygląda Podróż w Czasie Pandemii? Europa Samochodem i Rowerem | 4K",
    playlist: "europa",
    publishedOn: "2020-07-23",
    tripDate: null,
  },
  {
    youtubeId: "kVdBprxFOuM",
    title: "Francja, Andora, Belgia, Luksemburg - rowerem i samochodem.",
    playlist: "europa",
    publishedOn: "2021-02-06",
    tripDate: null,
  },
  {
    youtubeId: "3VxS5J5BwR4",
    title: "Weekend w Luksemburgu i Wycieczka Rowerowa do Schengen | 4K",
    playlist: "europa",
    publishedOn: "2021-02-20",
    tripDate: null,
  },
];

export function videosByPlaylist(playlist: PlaylistSlug): Video[] {
  return videos.filter((v) => v.playlist === playlist);
}
