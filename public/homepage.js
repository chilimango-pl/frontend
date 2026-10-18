(function () {
  const burger = document.querySelector(".burger");
  const menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    });
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  let seconds = 0;
  const tc = document.getElementById("tc");
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (tc) {
    setInterval(() => {
      if (paused) return;
      seconds += 1;
      tc.textContent = [seconds / 3600 | 0, (seconds / 60 | 0) % 60, seconds % 60]
        .map((n) => String(n).padStart(2, "0"))
        .join(":");
    }, 1000);
  }

  const pauseBtn = document.getElementById("pauseBtn");
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      paused = !paused;
      document.body.classList.toggle("paused", paused);
      pauseBtn.setAttribute("aria-pressed", String(paused));
      pauseBtn.textContent = paused ? "▶ Wznów animację" : "❚❚ Zatrzymaj animację";
    });
  }

  const cards = [...document.querySelectorAll("#caGrid .vcard")];
  const moreBtn = document.getElementById("moreBtn");
  const moreWrap = document.getElementById("caMore");
  let expanded = false;
  let filter = "*";

  function renderGrid() {
    cards.forEach((card) => {
      const country = card.dataset.c;
      const isMore = card.hasAttribute("data-more");
      let ok = false;
      if (filter === "*") {
        ok = expanded || !isMore;
      } else {
        ok = country === filter;
      }
      card.hidden = !ok;
    });
    if (moreWrap) {
      moreWrap.hidden = filter !== "*" || expanded;
    }
  }

  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      expanded = true;
      moreBtn.setAttribute("aria-expanded", "true");
      renderGrid();
    });
  }

  function setFilter(next) {
    filter = next;
    document.querySelectorAll("#caChips button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.f === next));
    });
    renderGrid();
  }

  document.querySelectorAll("#caChips button").forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.f));
  });

  document.querySelectorAll("[data-filter]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const code = link.getAttribute("data-filter");
      if (!code) return;
      event.preventDefault();
      setFilter(code);
      document.getElementById("ca")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (cards.length) renderGrid();
})();
