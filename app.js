(function () {
  const params = new URLSearchParams(location.search);
  const PREVIEW = params.has("preview");          // ?preview unlocks every door for testing
  const STORE_KEY = "snackzone-advent-opened";
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const $ = (id) => document.getElementById(id);

  // Preview mode always starts fresh and never saves, so testing can't spoil the real calendar.
  let opened = new Set();
  if (!PREVIEW) {
    try { opened = new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]")); } catch (e) {}
  }
  const save = () => {
    if (PREVIEW) return;
    try { localStorage.setItem(STORE_KEY, JSON.stringify([...opened])); } catch (e) {}
  };

  // Doors unlock at local midnight on the viewer's device.
  // ?now=2026-12-04T23:59:50 simulates a clock (it keeps ticking from that moment) for testing.
  let clockOffset = 0;
  const fakeNow = params.get("now");
  if (fakeNow && !isNaN(new Date(fakeNow))) clockOffset = new Date(fakeNow) - Date.now();
  const now = () => new Date(Date.now() + clockOffset);

  const isUnlocked = (day) => PREVIEW || now() >= new Date(ADVENT_YEAR, 11, day);
  const isToday = (day) => {
    const n = now();
    return n.getFullYear() === ADVENT_YEAR && n.getMonth() === 11 && n.getDate() === day;
  };

  const tiles = new Map();
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const dim = document.createElement("div");
  dim.className = "dim";
  document.body.appendChild(dim);
  let busy = false;

  // Timeline (ms): dim + lift -> dramatic flip -> letters pop in -> hold in spotlight -> card fades in.
  const T = { lift: 450, flip: 1200, letter: 35, hold: 1100 };

  function revealTitle(el, text, startDelay) {
    el.textContent = "";
    // Letters are grouped per word so lines only break between words.
    let i = 0;
    text.split(" ").forEach((word, w) => {
      if (w > 0) { el.appendChild(document.createTextNode(" ")); i++; }
      const wordEl = document.createElement("span");
      wordEl.className = "word";
      [...word].forEach((c) => {
        const s = document.createElement("span");
        s.className = "ch";
        s.textContent = c;
        s.style.animationDelay = startDelay + i++ * T.letter + "ms";
        wordEl.appendChild(s);
      });
      el.appendChild(wordEl);
    });
  }

  async function reveal(tile, titleEl, s) {
    busy = true;
    tile.scrollIntoView({ block: "center", behavior: "smooth" });
    dim.classList.add("on");
    tile.classList.add("spot");
    await wait(T.lift);

    tile.classList.add("flipping", "flipped");
    revealTitle(titleEl, s.snack, T.flip * 0.75); // letters start as the back face settles
    await wait(T.flip * 0.75 + s.snack.length * T.letter + T.hold);

    showCard(s);          // card + its backdrop fade in over the dimmed page
    dim.classList.remove("on");
    tile.classList.remove("spot", "flipping");
    busy = false;
  }

  SNACKS.forEach((s) => {
    // A div rather than <button>: Firefox's button internals can flatten 3D transforms.
    const b = document.createElement("div");
    b.className = "tile";
    b.setAttribute("role", "button");
    b.tabIndex = 0;
    b.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); b.click(); }
    });
    b.setAttribute("aria-label", "Door " + s.day);
    b.innerHTML =
      '<div class="inner">' +
        '<div class="face front"><span class="num">' + s.day + '</span><span class="dec">Dec ' + s.day + '</span></div>' +
        '<div class="face back"><span class="dayno">DAY ' + s.day + '</span><span class="title"></span></div>' +
      "</div>";
    const titleEl = b.querySelector(".title");
    tiles.set(s.day, b);

    if (opened.has(s.day)) { b.classList.add("flipped"); titleEl.textContent = s.snack; }

    b.addEventListener("click", () => {
      if (!isUnlocked(s.day)) {
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
        return;
      }
      if (busy) return;
      if (b.classList.contains("flipped")) { showCard(s); return; }
      opened.add(s.day); save();
      reveal(b, titleEl, s);
    });
    grid.appendChild(b);
  });

  // Re-evaluate locks live, so a page left open unlocks the new door right at midnight.
  function refreshLocks() {
    tiles.forEach((b, day) => {
      b.classList.toggle("locked", !isUnlocked(day));
      b.classList.toggle("today", isToday(day));
    });
  }
  function scheduleMidnight() {
    const n = now();
    const next = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1);
    setTimeout(() => { refreshLocks(); scheduleMidnight(); }, next - n + 50);
  }
  refreshLocks();
  scheduleMidnight();
  // Timers can drift or pause while a phone sleeps; these catch up when it wakes.
  setInterval(refreshLocks, 30000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshLocks(); });

  /* ---- info card ---- */
  let current = null;

  function showCard(s) {
    current = s;
    $("card-day").textContent = "Dec " + s.day;
    $("card-title").textContent = s.snack;
    $("card-storage").textContent = s.storage;
    $("card-episode").textContent = "Season " + s.season + ", Episode " + s.episode;
    $("card-country").textContent = s.country;

    const tabs = $("video-tabs");
    tabs.innerHTML = "";
    if (s.videos.length > 1) {
      s.videos.forEach((v, i) => {
        const t = document.createElement("button");
        t.textContent = v.label || "Video " + (i + 1);
        t.addEventListener("click", () => { setVideo(v); [...tabs.children].forEach((c) => c.setAttribute("aria-pressed", c === t)); });
        t.setAttribute("aria-pressed", i === 0);
        tabs.appendChild(t);
      });
    }
    setVideo(s.videos[0]);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".close").focus();
  }

  function setVideo(v) {
    const frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + v.id + "?start=" + v.t + "&rel=0";
    frame.title = "Snack Zone segment";
    frame.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    // YouTube rejects embeds that don't send a referrer (Error 153), so request one explicitly.
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    $("video").replaceChildren(frame);
    $("video-link").href = "https://youtu.be/" + v.id + "?t=" + v.t;
  }

  function closeCard() {
    modal.hidden = true;
    $("video").replaceChildren(); // stops playback
    document.body.style.overflow = "";
    if (current) tiles.get(current.day).focus();
    current = null;
  }
  modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeCard(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeCard(); });
})();
