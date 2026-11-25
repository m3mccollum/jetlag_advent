(function () {
  const params = new URLSearchParams(location.search);
  const PREVIEW = params.has("preview");          // ?preview unlocks every door for testing
  const STORE_KEY = "snackzone-advent-opened";
  const grid = document.getElementById("grid");
  const modal = document.getElementById("modal");
  const $ = (id) => document.getElementById(id);

  let opened = new Set();
  try { opened = new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]")); } catch (e) {}
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify([...opened])); } catch (e) {} };

  const now = new Date();
  const isUnlocked = (day) => PREVIEW || now >= new Date(ADVENT_YEAR, 11, day);
  const isToday = (day) => now.getFullYear() === ADVENT_YEAR && now.getMonth() === 11 && now.getDate() === day;

  const tiles = new Map();

  function revealTitle(el, text) {
    el.textContent = "";
    [...text].forEach((c, i) => {
      const s = document.createElement("span");
      s.className = c === " " ? "sp" : "ch";
      s.textContent = c === " " ? "" : c;
      s.style.animationDelay = 450 + i * 35 + "ms"; // starts as the flip lands
      el.appendChild(s);
    });
  }

  SNACKS.forEach((s) => {
    const b = document.createElement("button");
    b.className = "tile";
    b.setAttribute("aria-label", "Door " + s.day);
    b.innerHTML =
      '<div class="inner">' +
        '<div class="face front"><span class="num">' + s.day + '</span><span class="dec">Dec ' + s.day + '</span></div>' +
        '<div class="face back"><span class="dayno">DAY ' + s.day + '</span><span class="title"></span></div>' +
      "</div>";
    if (!isUnlocked(s.day)) b.classList.add("locked");
    if (isToday(s.day)) b.classList.add("today");
    const titleEl = b.querySelector(".title");
    tiles.set(s.day, b);

    if (opened.has(s.day)) { b.classList.add("flipped"); titleEl.textContent = s.snack; }

    b.addEventListener("click", () => {
      if (!isUnlocked(s.day)) {
        b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake");
        return;
      }
      if (b.classList.contains("flipped")) { showCard(s); return; }
      b.classList.add("flipped");
      revealTitle(titleEl, s.snack);
      opened.add(s.day); save();
      setTimeout(() => showCard(s), 900 + Math.min(s.snack.length, 30) * 35 + 500);
    });
    grid.appendChild(b);
  });

  /* ---- info card ---- */
  let current = null;

  function showCard(s) {
    current = s;
    $("card-day").textContent = "Dec " + s.day;
    $("card-flavor").textContent = s.flavor;
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

  if (PREVIEW) {
    const r = $("reset");
    r.hidden = false;
    r.addEventListener("click", () => { opened.clear(); save(); location.reload(); });
  }
})();
