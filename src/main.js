import "./style.css";

const tracks = [
  {
    id: "t1",
    title: "Track 1 — Metro 51 (Brinkstraat, 2014–2019)",
    subtitle: "Routine → pressure → escape → cliffhanger",
    code: `
setGainCurve(x => Math.pow(x, 2))
samples('github:switchangel/breaks')
samples('github:switchangel/pad')
samples('github:tidalcycles/uzu-drumkit')
setCps(128/60/4)

let kick = s("bd:1")
  .beat("0,4,8,12", 16)
  .bank("RolandTR909")
  .duck(2)
  .duckattack(0.2)
  .gain(0.6)

let snare = s("sd:2, cp:1")
  .beat("4,12", 16)
  .bank("RolandTR909")
  .room(0)
  .gain(0.6)

let oh = s("oh:16")
  .beat("2,6,10,14", 16)
  .bank("RolandTR909")
  .room(0)
  .gain(0.6)

let hh = s("hh:16")
  .bank("RolandTR909")
  .beat("3,7,11,15", 16)
  .room(0)
  .gain(0.6)

let drums_kick = kick

let drums_groove = stack(
  kick,
  snare
)

let drums_full = stack(
  kick,
  snare,
  oh,
  hh
)

let drum_loop = s("drumsamples")
  .begin(0.048)
  .speed(128/93)
  .loopAt(1)
  .attack(0.02)
  .release(0.05)
  .orbit(2)
  .postgain(2)

let drum_loop_quiet = drum_loop
  .lpf(2000)
  .gain(0.5)

let funk_lead = s("test").n(0)
  .scrub(
    perlin.range(0.6, 0.2).slow(1).seg(8)
  )
  .rib("<30>", 2)
  .speed("<1 1 1 -1>")
  .phaser(0.4)
  //.legato(1)
  .attack(0.01)
  .release(0.1)
  .orbit(2)
  .gain(0.6)
  .mask("1 1 1 0")
  //.every(4, x => x.ply(2))
  .delay(0.3)

let funk_intro = funk_lead
  .hpf(400)
  .lpf(2000)
  .gain(0.5)
  .mask("1")

let funk_break = funk_lead
  .speed(0.5)
  .mask("1 0 1 0")
  .room(0.8)

let funk_peak = funk_lead
  //.every(2, x => x.ply("2 | 4"))
  .mask("1")
  .gain(0.7)

$: arrange(
  [8, stack(drums_kick, drum_loop_quiet)],
  [8, stack(drums_groove, drum_loop, funk_intro)],
  [8, stack(drums_full, drum_loop, funk_lead)],
  [8, stack(drums_full, drum_loop, funk_peak)],
  [8, stack(drums_kick, funk_break)],
  [8, stack(drums_groove, drum_loop, funk_intro)],
  [16, stack(drums_full, drum_loop, funk_peak)],
  [8, stack(drums_groove, drum_loop, funk_lead)],
  [16, stack(drums_kick, drum_loop_quiet)]
).punchcard()
`.trim()
  },
  {
    id: "t2",
    title: "Track 2 — First Light in Breda (Valkenberg, post‑Covid)",
    subtitle: "Relief → freedom → connection → new home base",
    code: `
setCps(128/60/4)
samples('github:tidalcycles/uzu-drumkit')

stack(
  s("bd:1").beat("0,4,8,12",16).gain(0.6),
  s("sd:2").beat("4,12",16).gain(0.45),
  s("hh:16").beat("2,6,10,14",16).gain(0.3)
)
`.trim()
  },
  {
    id: "t3",
    title: "Track 3 — Not Allowed / Minder",
    subtitle: "Humiliation → anger → breakcore response → aftermath",
    code: `
setCps(170/60/4)
samples('github:switchangel/breaks')

// Replace with your real Track 3
s("breaks/2").fit().scrub(irand(16).div(16).seg(8)).gain(0.7)
`.trim()
  }
];

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="wrap">
    <aside class="sidebar">
      <h1>WarpSong</h1>
      <p class="hint">
        Album as software. Choose a track. The right panel is Strudel REPL.
      </p>

      <div id="trackList" class="trackList"></div>

      <div class="meta">
        <div class="label">Now loaded</div>
        <div id="nowTitle" class="nowTitle"></div>
        <div id="nowSubtitle" class="nowSubtitle"></div>
      </div>
    </aside>

    <main class="main">
      <div id="replMount"></div>
    </main>
  </div>
`;

const trackList = document.querySelector("#trackList");
const nowTitle = document.querySelector("#nowTitle");
const nowSubtitle = document.querySelector("#nowSubtitle");
const replMount = document.querySelector("#replMount");

let current = tracks[0];
let replEl = null;

/**
 * Force iframe inside <strudel-repl> to fill 100% of the host.
 * Works only if the component uses an OPEN shadowRoot.
 */
function forceReplIframeFullSize(repl) {
  const tryPatch = () => {
    const root = repl.shadowRoot;
    if (!root) return false;

    const iframe = root.querySelector("iframe");
    if (!iframe) return false;

    // Override any inline px sizing
    iframe.removeAttribute("width");
    iframe.removeAttribute("height");

    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";

    // Make sure containers also fill
    const p = iframe.parentElement;
    if (p) {
      p.style.width = "100%";
      p.style.height = "100%";
    }
    return true;
  };

  // Try immediately
  if (tryPatch()) return;

  // Retry while the iframe is being created
  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (tryPatch() || tries > 60) clearInterval(timer);
  }, 100);
}

/**
 * Creates a new Strudel REPL instance for a given code string.
 * This is the most robust way to "switch tracks" because some embed builds
 * don't reliably react to changing the "code" attribute.
 */
function createReplWithCode(code) {
  const repl = document.createElement("strudel-repl");
  repl.setAttribute("code", code);
  return repl;
}

function mountReplForTrack(track) {
  // Remove previous REPL
  if (replEl) replEl.remove();

  // Create new
  replEl = createReplWithCode(track.code);

  // Mount
  replMount.replaceChildren(replEl);

  // Try to force iframe sizing
  forceReplIframeFullSize(replEl);
}

function loadTrack(track) {
  current = track;
  nowTitle.textContent = track.title;
  nowSubtitle.textContent = track.subtitle;

  mountReplForTrack(track);
}

tracks.forEach((t) => {
  const btn = document.createElement("button");
  btn.className = "trackBtn";
  btn.innerHTML = `<div class="tTitle">${t.title}</div><div class="tSub">${t.subtitle}</div>`;
  btn.addEventListener("click", () => loadTrack(t));
  trackList.appendChild(btn);
});

// Initial load
loadTrack(tracks[0]);

// Debug helper: check if shadowRoot is open
window.__debugRepl = () => {
  const r = document.querySelector("strudel-repl");
  return {
    hasRepl: !!r,
    shadowRoot: r?.shadowRoot,
    iframe: r?.shadowRoot?.querySelector("iframe") || null
  };
};