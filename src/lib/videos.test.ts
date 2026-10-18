import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import astroConfig from "../../astro.config.mjs";
import VideoCard from "../components/VideoCard.astro";
import { PLAYLIST_IDS, videos, videosByPlaylist } from "../data/videos";

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

describe("site", () => {
  it("site.url is https://chilimango.pl", () => {
    expect(String(astroConfig.site)).toBe("https://chilimango.pl");
  });
});

describe("videos data", () => {
  it("has 20 ameryka and 3 europa videos", () => {
    expect(videosByPlaylist("ameryka")).toHaveLength(20);
    expect(videosByPlaylist("europa")).toHaveLength(3);
  });

  it("uses playlist ids from plan section 4", () => {
    expect(PLAYLIST_IDS.ameryka).toBe("PLPaMIRjW6qqvB2Fgh32HcM4wttnOQ1u5I");
    expect(PLAYLIST_IDS.europa).toBe("PLPaMIRjW6qqufkgJL_aNsanSjry60zTYL");
  });

  it("every youtubeId matches YouTube id format", () => {
    for (const video of videos) {
      expect(video.youtubeId).toMatch(YOUTUBE_ID);
    }
  });

  it("tripDate is null for every video until D2", () => {
    for (const video of videos) {
      expect(video.tripDate).toBeNull();
    }
  });
});

describe("VideoCard facade", () => {
  it("renders without iframe before click", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(VideoCard, {
      props: { video: videos[0] },
    });
    expect(html.toLowerCase()).not.toContain("<iframe");
  });
});

describe("yt-facade.js", () => {
  it("embeds via youtube-nocookie.com", () => {
    const js = readFileSync(
      resolve(process.cwd(), "public/yt-facade.js"),
      "utf8",
    );
    expect(js).toContain("youtube-nocookie.com");
    expect(js).not.toMatch(/<iframe/i);
  });
});
