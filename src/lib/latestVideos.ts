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
    .filter(
      ({ video }) => video.publishedOn !== null && DATE.test(video.publishedOn),
    )
    .sort((a, b) => {
      const byDate = b.video.publishedOn!.localeCompare(a.video.publishedOn!);
      return byDate !== 0 ? byDate : a.index - b.index;
    })
    .slice(0, count)
    .map(({ video }) => video);
}
