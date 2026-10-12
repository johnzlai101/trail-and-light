/* Shared rendering for the trip journal. No external dependencies. */

function formatDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* ── Homepage ── */
function renderHome() {
  const el = document.getElementById("trip-cards");
  const trips = [...TRIPS].sort((a, b) => b.date.localeCompare(a.date));
  el.innerHTML = trips.map(t => `
    <article class="card">
      <a href="trip.html?id=${encodeURIComponent(t.id)}">
        <img src="${escapeHtml(t.cover)}" alt="${escapeHtml(t.title)}" loading="lazy">
        <div class="card-body">
          <div class="card-date">${formatDate(t.date)} · ${escapeHtml(t.location)}</div>
          <h2>${escapeHtml(t.title)}</h2>
          <p>${escapeHtml(t.summary)}</p>
          <div class="card-tags">${t.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
      </a>
    </article>`).join("");
}

/* ── Trip page ── */
function renderTrip() {
  const id = new URLSearchParams(location.search).get("id");
  const trips = [...TRIPS].sort((a, b) => b.date.localeCompare(a.date));
  const i = trips.findIndex(t => t.id === id);
  const t = trips[i];
  const el = document.getElementById("trip");

  if (!t) {
    document.title = "Trip not found — Trail & Light";
    el.innerHTML = "<p>Trip not found. <a href='index.html'>Back to all trips</a>.</p>";
    return;
  }
  document.title = `${t.title} — Trail & Light`;

  const stats = [
    ["Distance", t.distance], ["Elevation gain", t.elevation], ["Duration", t.duration]
  ].filter(([, v]) => v).map(([k, v]) => `<div class="stat">${escapeHtml(k)}: <b>${escapeHtml(v)}</b></div>`).join("");

  el.innerHTML = `
    <div class="trip-hero"><img src="${escapeHtml(t.cover)}" alt="${escapeHtml(t.title)}"></div>
    <div class="trip-meta">${formatDate(t.date)} · ${escapeHtml(t.location)}</div>
    <h1 class="trip-title">${escapeHtml(t.title)}</h1>
    <div class="trip-stats">${stats}</div>
    <div class="trip-story">${t.story.map(p => `<p>${escapeHtml(p)}</p>`).join("")}</div>
    <div class="card-tags" style="margin-bottom:28px">${t.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>

    ${t.photos && t.photos.length ? `
    <h2 class="section-title">Photos</h2>
    <div class="gallery">
      ${t.photos.map((p, n) => `
        <figure>
          <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.caption || t.title)}" loading="lazy" data-cap="${escapeHtml(p.caption || "")}" data-n="${n}">
          ${p.caption ? `<figcaption>${escapeHtml(p.caption)}</figcaption>` : ""}
        </figure>`).join("")}
    </div>` : ""}

    ${t.videos && t.videos.length ? `
    <h2 class="section-title">Videos</h2>
    <div class="videos">
      ${t.videos.map(v => `
        <div>
          <video controls playsinline preload="metadata" src="${escapeHtml(v.src)}"></video>
          ${v.caption ? `<p class="video-cap">${escapeHtml(v.caption)}</p>` : ""}
        </div>`).join("")}
    </div>` : ""}
  `;

  // Prev / next
  const nav = document.getElementById("trip-nav");
  const prev = trips[i + 1], next = trips[i - 1]; // sorted newest-first
  nav.innerHTML = `
    ${prev ? `<a href="trip.html?id=${encodeURIComponent(prev.id)}">← ${escapeHtml(prev.title)}</a>` : "<span></span>"}
    ${next ? `<a href="trip.html?id=${encodeURIComponent(next.id)}">${escapeHtml(next.title)} →</a>` : "<span></span>"}`;

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCap = document.getElementById("lightbox-cap");
  el.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.dataset.cap || "";
      lb.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; };
  lb.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}
