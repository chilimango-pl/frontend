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
      {
        youtubeId: "aaaaaaaaaaa",
        title: "a",
        playlist: "europa",
        publishedOn: null,
        tripDate: null,
      },
      {
        youtubeId: "bbbbbbbbbbb",
        title: "b",
        playlist: "europa",
        publishedOn: "soon",
        tripDate: null,
      },
      {
        youtubeId: "ccccccccccc",
        title: "c",
        playlist: "europa",
        publishedOn: "2020-01-02",
        tripDate: null,
      },
      {
        youtubeId: "ddddddddddd",
        title: "d",
        playlist: "europa",
        publishedOn: "2020-01-02",
        tripDate: null,
      },
    ];
    expect(latestDatedVideos(fixture, 3).map((video) => video.youtubeId)).toEqual([
      "ccccccccccc",
      "ddddddddddd",
    ]);
  });
});
