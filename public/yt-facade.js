(function () {
  const YT_EMBED = "https://www.youtube-nocookie.com/embed/";

  function mountIframe(root, videoId) {
    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      YT_EMBED + encodeURIComponent(videoId) + "?autoplay=1",
    );
    iframe.setAttribute("title", "YouTube");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    );
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    const player = root.querySelector(".video-card__player");
    if (!player) return;
    player.replaceChildren(iframe);
  }

  function onPlayClick(event) {
    const button = event.target.closest(".video-card__play");
    if (!button) return;
    const root = button.closest("[data-yt-facade]");
    if (!root || root.dataset.ytFacadeReady === "true") return;
    const videoId = root.getAttribute("data-youtube-id");
    if (!videoId) return;
    root.dataset.ytFacadeReady = "true";
    mountIframe(root, videoId);
  }

  document.addEventListener("click", onPlayClick);
})();
