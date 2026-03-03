import "./style.css";
import "@strudel/repl";

const tracks = [
  {
    id: "t1",
    folder: "01_Brinkstraat",
    title: "BRINKSTRAAT",
    location: "Breda - Brinkstraat",
    theme: "Uitsluiting en toegang geweigerd",
    mood: "Beklemmend, zoekend",
    duration_target: "03:20",
    status: "hero",
    validation_hypothesis: "Luisteraar voelt de spanning van afgewezen worden en begrijpt dat de bronmaterialen persoonlijke herinneringen zijn.",
    strudel_code: `
setGainCurve(x => Math.pow(x, 2))
samples('github:switchangel/breaks')
samples('github:switchangel/pad')
samples('github:tidalcycles/uzu-drumkit')
setCps(128/60/4)

let kick = s("bd:1").beat("0,4,8,12", 16).bank("RolandTR909").gain(0.65)
let snare = s("sd:2, cp:1").beat("4,12", 16).bank("RolandTR909").gain(0.5)
let hat = s("hh:16").beat("3,7,11,15", 16).bank("RolandTR909").gain(0.45)
let loop = s("drumsamples").begin(0.048).speed(128/93).loopAt(1).postgain(1.4)

$: arrange(
  [8, stack(kick, loop)],
  [8, stack(kick, snare, loop)],
  [8, stack(kick, snare, hat, loop)],
  [8, stack(kick, loop)]
).punchcard()
`.trim(),
    liner_notes: {
      personal_context:
        "Brinkstraat staat voor de avonden waar ik fysiek aanwezig was maar sociaal niet werd toegelaten. Die spanning vormt de motor van deze track.",
      what_this_track_should_make_you_feel:
        "Een ritmische druk: je blijft proberen binnen te raken, ook als de omgeving je afwijst.",
      design_intent_audio:
        "Kick en loop blijven terugkomen als pogingen. Kleine variaties in snare/hat representeren sociale frictie.",
      design_intent_visual:
        "Koele, knipperende wallpaper met gefragmenteerde panelen die nooit volledig stabiel worden."
    },
    sources: [
      {
        sample_name: "Doorstep Rhythm",
        origin_artist: "Field Recording (Abdel Ouzzine)",
        origin_title: "Brinkstraat Steps",
        origin_label: "Unreleased Personal Archive",
        origin_year: "2024",
        license_or_usage_note: "Eigen opname",
        why_it_matters_personally: "Het is letterlijk de plek waar ik me uitgesloten voelde.",
        where_used_in_track: "Intro pulse + low percussion layer"
      },
      {
        sample_name: "Club Exterior Ambience",
        origin_artist: "Field Recording (Abdel Ouzzine)",
        origin_title: "Queue Ambience",
        origin_label: "Unreleased Personal Archive",
        origin_year: "2024",
        license_or_usage_note: "Eigen opname",
        why_it_matters_personally: "De afstand tussen binnen en buiten is hoorbaar als ruislaag.",
        where_used_in_track: "Background texture (mid section)"
      },
      {
        sample_name: "TR909 Core Kit",
        origin_artist: "Roland TR-909",
        origin_title: "BD/SD/HH kit",
        origin_label: "Classic Drum Machine Library",
        origin_year: "1983",
        license_or_usage_note: "Library usage in Strudel context",
        why_it_matters_personally: "Mechanische drums geven het gevoel van een onverbiddelijke omgeving.",
        where_used_in_track: "Main groove"
      }
    ]
  },
  {
    id: "t2",
    folder: "02_Internet_Explorer",
    title: "INTERNET EXPLORER",
    location: "Browser-era internet",
    theme: "Cultuurclash en hybride identiteit",
    mood: "Chaotisch, digitaal, botsend",
    duration_target: "04:10",
    status: "hero",
    validation_hypothesis:
      "Luisteraar herkent twee culturele lagen die bewust tegen elkaar schuren en begrijpt dat dit over hybride identiteit gaat.",
    strudel_code: `
setCps(100/60/4)
samples('github:tidalcycles/uzu-drumkit')

let click = s("cp:1").beat("2,6,10,14", 16).gain(0.35)
let drone = s("pad").n(0).slow(4).lpf(900).room(0.8).gain(0.32)
let breakLayer = s("drumsamples").begin(0.2).loopAt(2).gain(0.25)

$: stack(click, drone, breakLayer)
`.trim(),
    liner_notes: {
      personal_context:
        "Mijn online vorming gebeurde tussen open-source forums, games, en familiecultuur thuis. Deze track laat die simultane invloeden botsen.",
      what_this_track_should_make_you_feel:
        "Geen nette balans, maar een frictie die toch een eigen ritme vindt.",
      design_intent_audio:
        "Contrasterende lagen lopen tegelijk: klikgeluiden, pads, en gebroken ritmes zonder volledige oplossing.",
      design_intent_visual:
        "Desktop voelt als browser-ruis: vensters die context tonen naast code, zonder de clash te verbergen."
    },
    sources: [
      {
        sample_name: "Chaabi Vocal Fragment",
        origin_artist: "Regional Wedding Tape Archive",
        origin_title: "Family Collection Extract",
        origin_label: "Private Family Archive",
        origin_year: "1990s",
        license_or_usage_note: "Familie-archief, intern gebruik in afstudeerproject",
        why_it_matters_personally: "Verwijst naar de kant van thuis en familie-erfenis.",
        where_used_in_track: "Textural vocal layer (processed)"
      },
      {
        sample_name: "Net Cafe Error Beep",
        origin_artist: "System UI SFX",
        origin_title: "Browser Error Tone",
        origin_label: "Public-era internet sound",
        origin_year: "2000s",
        license_or_usage_note: "Heavily transformed one-shot",
        why_it_matters_personally: "Symboliseert mijn jeugd op het internet.",
        where_used_in_track: "Percussive transient accents"
      },
      {
        sample_name: "Break Loop 93 BPM",
        origin_artist: "Switchangel Breaks",
        origin_title: "Drumsamples segment",
        origin_label: "Sample Pack",
        origin_year: "Unknown",
        license_or_usage_note: "Pack usage according to source terms",
        why_it_matters_personally: "Verbindt mijn huidige producer-identiteit met vroegere luistergeschiedenis.",
        where_used_in_track: "Main loop backbone"
      }
    ]
  },
  {
    id: "t3",
    folder: "03_Blankenberge",
    title: "BLANKENBERGE",
    location: "Blankenberge nachtstraten",
    theme: "Intimiteit, thuisgevoel, maar ook afstand",
    mood: "Koud licht, introspectief",
    duration_target: "03:45",
    status: "hero",
    validation_hypothesis:
      "Luisteraar voelt zowel nabijheid als afstand, en koppelt die spanning aan plek, familie en sociale toegang.",
    strudel_code: `
await initHydra({ detectAudio: true })
a.setSmooth(0.8)

osc(40, 0.1, 1)
  .color(0.9, 0, 0.5)
  .mult(osc(10, 0.1).kaleid(6))
  .modulateScrollY(noise(2), 0.1)
  .scale(() => 1 + a.fft[0] * 0.3)
  .contrast(1.3)
  .out();

setCps(90/60/4)
samples('github:tidalcycles/uzu-drumkit')

let kick = s("bd:1").beat("0,4,8,12", 16).gain(0.42)
let loop = s("drumsamples").begin(0.048).loopAt(4).gain(0.33)

$: stack(kick, loop)
`.trim(),
    liner_notes: {
      personal_context:
        "Blankenberge is een plek van dubbele ervaring: ik ben er fysiek, maar emotioneel vaak op afstand. Dat wordt in deze track niet opgelost, alleen hoorbaar gemaakt.",
      what_this_track_should_make_you_feel:
        "Nachtelijke beweging met onderliggende twijfel: ben ik binnen of buiten dit verhaal?",
      design_intent_audio:
        "Kick en loop blijven sober. Ruimte en herhaling moeten de leegte laten spreken.",
      design_intent_visual:
        "Koud straatlicht en donkere vlakken; weinig ornament, veel ruimte."
    },
    sources: [
      {
        sample_name: "Street Wind Bed",
        origin_artist: "Field Recording (Abdel Ouzzine)",
        origin_title: "Sea Front Wind",
        origin_label: "Unreleased Personal Archive",
        origin_year: "2024",
        license_or_usage_note: "Eigen opname",
        why_it_matters_personally: "Verwijst direct naar plek en lichaamservaring op locatie.",
        where_used_in_track: "Low ambience layer"
      },
      {
        sample_name: "Door Latch Hit",
        origin_artist: "Field Recording (Abdel Ouzzine)",
        origin_title: "Closed Door",
        origin_label: "Unreleased Personal Archive",
        origin_year: "2024",
        license_or_usage_note: "Eigen opname",
        why_it_matters_personally: "Symboliseert letterlijk niet binnengelaten worden.",
        where_used_in_track: "Transient marker in transitions"
      },
      {
        sample_name: "Roland BD Core",
        origin_artist: "Roland TR-909",
        origin_title: "Bass Drum",
        origin_label: "Classic Drum Machine Library",
        origin_year: "1983",
        license_or_usage_note: "Library usage in Strudel context",
        why_it_matters_personally: "Geeft een menselijke wandeling een mechanische puls.",
        where_used_in_track: "Main pulse"
      }
    ]
  },
  {
    id: "t4",
    folder: "04_Breindood",
    title: "BREINDOOD",
    location: "Interne reset",
    theme: "Stilte na overprikkeling",
    mood: "Licht herstel",
    duration_target: "TBD",
    status: "placeholder",
    validation_hypothesis: "Nog in ontwikkeling",
    strudel_code: `
// in development
setCps(60/60/4)
$: silence
`.trim(),
    liner_notes: {
      personal_context: "In ontwikkeling",
      what_this_track_should_make_you_feel: "In ontwikkeling",
      design_intent_audio: "In ontwikkeling",
      design_intent_visual: "In ontwikkeling"
    },
    sources: []
  },
  {
    id: "t5",
    folder: "05_Carnaval",
    title: "CARNAVAL INTERMEZZO",
    location: "Breda carnaval",
    theme: "Maskers en belonging",
    mood: "Chaotisch maar warm",
    duration_target: "TBD",
    status: "placeholder",
    validation_hypothesis: "Nog in ontwikkeling",
    strudel_code: `
// in development
setCps(120/60/4)
$: silence
`.trim(),
    liner_notes: {
      personal_context: "In ontwikkeling",
      what_this_track_should_make_you_feel: "In ontwikkeling",
      design_intent_audio: "In ontwikkeling",
      design_intent_visual: "In ontwikkeling"
    },
    sources: []
  },
  {
    id: "t6",
    folder: "06_Thuiskeuken",
    title: "THUISKEUKEN",
    location: "Familiekeuken",
    theme: "Intimiteit en herinnering",
    mood: "Zacht, dichtbij",
    duration_target: "TBD",
    status: "placeholder",
    validation_hypothesis: "Nog in ontwikkeling",
    strudel_code: `
// in development
setCps(72/60/4)
$: silence
`.trim(),
    liner_notes: {
      personal_context: "In ontwikkeling",
      what_this_track_should_make_you_feel: "In ontwikkeling",
      design_intent_audio: "In ontwikkeling",
      design_intent_visual: "In ontwikkeling"
    },
    sources: []
  },
  {
    id: "t7",
    folder: "07_OpenSource",
    title: "OPEN SOURCE HEART",
    location: "Internet commons",
    theme: "Collectieve bouwstenen",
    mood: "Analytisch, energiek",
    duration_target: "TBD",
    status: "placeholder",
    validation_hypothesis: "Nog in ontwikkeling",
    strudel_code: `
// in development
setCps(110/60/4)
$: silence
`.trim(),
    liner_notes: {
      personal_context: "In ontwikkeling",
      what_this_track_should_make_you_feel: "In ontwikkeling",
      design_intent_audio: "In ontwikkeling",
      design_intent_visual: "In ontwikkeling"
    },
    sources: []
  },
  {
    id: "t8",
    folder: "08_Postscript",
    title: "POSTSCRIPT",
    location: "Eindkader",
    theme: "Integratie van alle lagen",
    mood: "Open einde",
    duration_target: "TBD",
    status: "placeholder",
    validation_hypothesis: "Nog in ontwikkeling",
    strudel_code: `
// in development
setCps(84/60/4)
$: silence
`.trim(),
    liner_notes: {
      personal_context: "In ontwikkeling",
      what_this_track_should_make_you_feel: "In ontwikkeling",
      design_intent_audio: "In ontwikkeling",
      design_intent_visual: "In ontwikkeling"
    },
    sources: []
  }
];

const DESKTOP_TRACK_IDS = new Set(["t1", "t2"]);
function getAvailableTracks() {
  return tracks.filter((track) => DESKTOP_TRACK_IDS.has(track.id));
}

const trackMap = new Map(tracks.map((track) => [track.id, track]));

const TASKBAR_HEIGHT = 40;
const WINDOW_EDGE = 6;
const VARIANTS = {
  v1: {
    label: "V1 Files",
    short: "V1",
    description: "XP explorer style with track files and sample folder",
    libraryRenderer: "library-v1",
    samplesRenderer: "samples-v1-files",
    playerOverlayRenderer: null,
    workspaceLayoutRatios: { liner: 0.3, player: 0.4, source: 0.3 }
  },
  v2: {
    label: "V2 Strip",
    short: "V2",
    description: "Now-playing sample strip during listening",
    libraryRenderer: "library-v2",
    samplesRenderer: "samples-v2-strip",
    playerOverlayRenderer: "now-playing-strip",
    workspaceLayoutRatios: { liner: 0.38, player: 0.37, source: 0.25 }
  },
  v3: {
    label: "V3 Cards",
    short: "V3",
    description: "Provenance board with visual sample cards",
    libraryRenderer: "library-v3",
    samplesRenderer: "samples-v3-cards",
    playerOverlayRenderer: null,
    workspaceLayoutRatios: { liner: 0.25, player: 0.37, source: 0.38 }
  }
};
const DEMO_HYDRA_TRACK_ID = "t2";

const state = {
  view: "boot",
  windows: [],
  z: 10,
  activeId: null,
  startMenuOpen: false,
  startMenuPath: "root",
  workspaceRegistry: {},
  designVariant: "v1",
  desktopStep: "intro",
  showAllTracks: false,
  bootDone: false
};

const replRegistry = new Map();
const playerState = new Map();
const playerHydraRegistry = new Map();

const app = document.querySelector("#app");

const wallpaperState = {
  hydra: null,
  HydraCtor: null,
  canvas: null,
  fallbackFrame: 0,
  fallbackTime: 0,
  resizeHandler: null,
  loadingPromise: null
};

let clockTimer = null;
let desktopHandlersAttached = false;
let windowManagerHandlersAttached = false;

const byId = (id) => document.getElementById(id);
const nextZ = () => (state.z += 1);
const nowTime = () => new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function excerpt(text, max = 120) {
  const value = String(text || "").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}...`;
}

function getDesktopBounds() {
  const taskbarEl = byId("taskbar");
  const taskbarHeight = taskbarEl ? taskbarEl.offsetHeight : TASKBAR_HEIGHT;
  return {
    width: window.innerWidth,
    height: window.innerHeight - taskbarHeight
  };
}

function getWorkspace(trackId) {
  if (!state.workspaceRegistry[trackId]) {
    state.workspaceRegistry[trackId] = {
      windowIds: {
        liner: `liner-${trackId}`,
        player: `player-${trackId}`,
        source: `source-${trackId}`
      },
      layoutPreset: "triad",
      lastPositions: {},
      lastPositionsByVariant: {}
    };
  }
  if (!state.workspaceRegistry[trackId].lastPositionsByVariant) {
    state.workspaceRegistry[trackId].lastPositionsByVariant = {};
  }
  return state.workspaceRegistry[trackId];
}

function findWindowById(id) {
  return state.windows.find((windowItem) => windowItem.id === id);
}

function persistWorkspaceWindow(windowState) {
  if (!windowState || !windowState.trackId || !windowState.kind) return;
  const workspace = getWorkspace(windowState.trackId);
  const nextRect = {
    x: windowState.x,
    y: windowState.y,
    w: windowState.w,
    h: windowState.h,
    maximized: windowState.maximized
  };
  workspace.lastPositions[windowState.kind] = nextRect;
  if (!workspace.lastPositionsByVariant[state.designVariant]) {
    workspace.lastPositionsByVariant[state.designVariant] = {};
  }
  workspace.lastPositionsByVariant[state.designVariant][windowState.kind] = { ...nextRect };
}

function getVariantRatios(variant) {
  return VARIANTS[variant]?.workspaceLayoutRatios || VARIANTS.v1.workspaceLayoutRatios;
}

function fitCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const width = Math.floor(window.innerWidth * ratio);
  const height = Math.floor(window.innerHeight * ratio);
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  return { width, height };
}

function runFallbackWallpaper(canvas) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const render = () => {
    wallpaperState.fallbackTime += 0.015;
    const width = canvas.width;
    const height = canvas.height;
    const hasActiveAudio = Array.from(playerState.values()).some((entry) => entry.playing);
    const pulse = hasActiveAudio
      ? 0.45 + Math.sin(wallpaperState.fallbackTime * 8) * 0.25
      : 0.22 + Math.sin(wallpaperState.fallbackTime * 1.5) * 0.05;

    context.fillStyle = "#070707";
    context.fillRect(0, 0, width, height);

    const radial = context.createRadialGradient(
      width * (0.22 + pulse * 0.15),
      height * (0.35 - pulse * 0.08),
      0,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * (0.85 + pulse * 0.1)
    );
    radial.addColorStop(0, `rgba(${Math.round(80 + pulse * 160)}, 25, ${Math.round(120 + pulse * 60)}, 0.55)`);
    radial.addColorStop(1, "rgba(8, 8, 8, 1)");
    context.fillStyle = radial;
    context.fillRect(0, 0, width, height);

    context.globalAlpha = 0.14 + pulse * 0.17;
    for (let i = 0; i < 24; i += 1) {
      const x = ((i * 73 + wallpaperState.fallbackTime * 180) % (width + 160)) - 80;
      const y = (i * 41 + Math.sin(wallpaperState.fallbackTime + i) * 90 + height * 0.4) % height;
      const size = 26 + (i % 5) * 24 + pulse * 56;
      context.strokeStyle = i % 2 ? "rgba(100, 255, 120, 0.22)" : "rgba(255, 80, 140, 0.2)";
      context.lineWidth = 1.1;
      context.strokeRect(x, y, size, size * 0.62);
    }
    context.globalAlpha = 1;

    wallpaperState.fallbackFrame = requestAnimationFrame(render);
  };

  wallpaperState.fallbackFrame = requestAnimationFrame(render);
}

async function loadHydraCtor() {
  if (wallpaperState.HydraCtor) return wallpaperState.HydraCtor;
  if (wallpaperState.loadingPromise) return wallpaperState.loadingPromise;

  wallpaperState.loadingPromise = (async () => {
    if (typeof globalThis.global === "undefined") globalThis.global = globalThis;
    if (typeof globalThis.process === "undefined") globalThis.process = { env: {} };
    const module = await import("hydra-synth");
    wallpaperState.HydraCtor = module.default;
    return wallpaperState.HydraCtor;
  })();

  try {
    return await wallpaperState.loadingPromise;
  } finally {
    wallpaperState.loadingPromise = null;
  }
}

async function mountWallpaper() {
  const canvas = byId("hydraWallpaper");
  if (!canvas) return;

  if (wallpaperState.canvas === canvas && (wallpaperState.hydra || wallpaperState.fallbackFrame || wallpaperState.loadingPromise)) {
    return;
  }

  wallpaperState.canvas = canvas;
  const { width, height } = fitCanvas(canvas);

  if (wallpaperState.resizeHandler) {
    window.removeEventListener("resize", wallpaperState.resizeHandler);
    wallpaperState.resizeHandler = null;
  }
  if (wallpaperState.fallbackFrame) {
    cancelAnimationFrame(wallpaperState.fallbackFrame);
    wallpaperState.fallbackFrame = 0;
  }

  const fallback = () => {
    wallpaperState.resizeHandler = () => {
      fitCanvas(canvas);
    };
    window.addEventListener("resize", wallpaperState.resizeHandler);
    runFallbackWallpaper(canvas);
  };

  if (!wallpaperState.hydra) {
    try {
      const HydraCtor = await loadHydraCtor();
      wallpaperState.hydra = new HydraCtor({
        canvas,
        makeGlobal: false,
        autoLoop: true,
        detectAudio: true,
        enableStreamCapture: false,
        width,
        height
      });

      const synth = wallpaperState.hydra.synth;
      if (synth.a && typeof synth.a.setSmooth === "function") synth.a.setSmooth(0.82);
      synth
        .osc(9, 0.08, 1.04)
        .color(
          () => 0.12 + (synth.a?.fft?.[0] || 0) * 1.35,
          () => 0.35 + (synth.a?.fft?.[1] || 0) * 0.6,
          () => 0.46 + (synth.a?.fft?.[2] || 0) * 0.45
        )
        .modulate(synth.noise(3, 0.16), 0.18)
        .add(
          synth
            .shape(6, () => 0.2 + (synth.a?.fft?.[0] || 0) * 0.45, 0.3)
            .scrollX(() => Math.sin(synth.time * 0.12) * 0.06)
            .scrollY(() => Math.cos(synth.time * 0.09) * 0.05)
            .color(0.88, 0.15, 0.4)
            .luma(0.2)
        )
        .brightness(-0.12)
        .contrast(1.18)
        .out(synth.o0);

      wallpaperState.resizeHandler = () => {
        const size = fitCanvas(canvas);
        wallpaperState.hydra.setResolution(size.width, size.height);
      };
      window.addEventListener("resize", wallpaperState.resizeHandler);
      return;
    } catch (error) {
      console.warn("Hydra wallpaper fallback active:", error);
      wallpaperState.hydra = null;
    }
  }

  if (wallpaperState.hydra) {
    wallpaperState.hydra.canvas = canvas;
    wallpaperState.resizeHandler = () => {
      const size = fitCanvas(canvas);
      wallpaperState.hydra.setResolution(size.width, size.height);
    };
    wallpaperState.resizeHandler();
    window.addEventListener("resize", wallpaperState.resizeHandler);
    return;
  }

  fallback();
}

function fitPlayerHydraCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const host = canvas.parentElement;
  if (!host) return { width: canvas.width || 1, height: canvas.height || 1 };
  const widthCss = Math.max(1, host.clientWidth);
  const heightCss = Math.max(1, host.clientHeight);
  canvas.width = Math.floor(widthCss * ratio);
  canvas.height = Math.floor(heightCss * ratio);
  canvas.style.width = `${widthCss}px`;
  canvas.style.height = `${heightCss}px`;
  return { width: canvas.width, height: canvas.height };
}

function runFallbackPlayerHydra(entry) {
  const canvas = entry.canvas;
  const context = canvas.getContext("2d");
  if (!context) return;

  const render = () => {
    entry.fallbackTime += 0.022;
    const width = canvas.width;
    const height = canvas.height;
    const level = entry.isPlaying ? 0.42 : 0.18;

    context.fillStyle = "#050812";
    context.fillRect(0, 0, width, height);

    const radial = context.createRadialGradient(
      width * (0.5 + Math.sin(entry.fallbackTime * 0.3) * 0.14),
      height * (0.5 + Math.cos(entry.fallbackTime * 0.28) * 0.18),
      0,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.85
    );
    radial.addColorStop(0, `rgba(70, ${Math.floor(150 + level * 100)}, 240, 0.22)`);
    radial.addColorStop(1, "rgba(8, 10, 16, 0.96)");
    context.fillStyle = radial;
    context.fillRect(0, 0, width, height);

    context.globalAlpha = 0.24 + level * 0.2;
    for (let i = 0; i < 16; i += 1) {
      const t = entry.fallbackTime * (0.6 + i * 0.03);
      const x = width * 0.5 + Math.sin(t + i) * width * 0.42;
      const y = height * 0.5 + Math.cos(t * 1.2 + i) * height * 0.32;
      const r = 18 + (i % 5) * 8 + Math.sin(t * 2) * 5;
      context.strokeStyle = i % 2 ? "rgba(103, 228, 255, 0.44)" : "rgba(189, 111, 255, 0.34)";
      context.lineWidth = 1.1;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.stroke();
    }
    context.globalAlpha = 1;

    entry.fallbackFrame = requestAnimationFrame(render);
  };

  entry.fallbackFrame = requestAnimationFrame(render);
}

function destroyPlayerHydra(windowId) {
  const entry = playerHydraRegistry.get(windowId);
  if (!entry) return;
  if (entry.fallbackFrame) cancelAnimationFrame(entry.fallbackFrame);
  if (entry.resizeHandler) window.removeEventListener("resize", entry.resizeHandler);
  if (entry.hydra && typeof entry.hydra.tick === "function") {
    try {
      entry.hydra.tick = () => {};
    } catch {
      // no-op
    }
  }
  playerHydraRegistry.delete(windowId);
}

async function mountPlayerHydra(windowId, trackId) {
  if (trackId !== DEMO_HYDRA_TRACK_ID) {
    destroyPlayerHydra(windowId);
    return;
  }

  const canvas = document.querySelector(`[data-player-hydra="${windowId}"]`);
  if (!canvas) return;

  const current = playerHydraRegistry.get(windowId);
  if (current && current.canvas === canvas && (current.hydra || current.fallbackFrame)) return;
  if (current) destroyPlayerHydra(windowId);

  const entry = {
    canvas,
    hydra: null,
    resizeHandler: null,
    fallbackFrame: 0,
    fallbackTime: 0,
    controls: { energy: playerState.get(windowId)?.playing ? 0.45 : 0.16 },
    isPlaying: !!playerState.get(windowId)?.playing
  };
  playerHydraRegistry.set(windowId, entry);

  const { width, height } = fitPlayerHydraCanvas(canvas);

  try {
    const HydraCtor = await loadHydraCtor();
    entry.hydra = new HydraCtor({
      canvas,
      makeGlobal: false,
      autoLoop: true,
      detectAudio: false,
      enableStreamCapture: false,
      width,
      height
    });

    const synth = entry.hydra.synth;
    const controls = entry.controls;
    synth
      .osc(14, 0.06, 1)
      .color(
        () => 0.12 + controls.energy * 0.8,
        () => 0.2 + Math.sin(synth.time * 0.16) * 0.18 + controls.energy * 0.28,
        () => 0.45 + controls.energy * 0.45
      )
      .modulate(synth.noise(2.8, 0.12), () => 0.06 + controls.energy * 0.16)
      .kaleid(() => 3 + controls.energy * 5)
      .rotate(() => Math.sin(synth.time * 0.07) * 0.08)
      .contrast(1.16)
      .brightness(-0.14)
      .out(synth.o0);

    entry.resizeHandler = () => {
      const next = fitPlayerHydraCanvas(canvas);
      if (entry.hydra) entry.hydra.setResolution(next.width, next.height);
    };
    window.addEventListener("resize", entry.resizeHandler);
  } catch (error) {
    console.warn("Player Hydra fallback active:", error);
    runFallbackPlayerHydra(entry);
    entry.resizeHandler = () => fitPlayerHydraCanvas(canvas);
    window.addEventListener("resize", entry.resizeHandler);
  }
}

function setPlayerHydraPlayback(windowId, playing) {
  const entry = playerHydraRegistry.get(windowId);
  if (!entry) return;
  entry.isPlaying = playing;
  if (entry.controls) entry.controls.energy = playing ? 0.48 : 0.16;
}

function createWindow({ id, title, body, x, y, w, h, className, type, trackId, kind, minW = 260, minH = 180 }) {
  const existing = findWindowById(id);
  if (existing) {
    existing.title = title;
    existing.body = body;
    existing.className = className || "";
    existing.type = type;
    existing.trackId = trackId || null;
    existing.kind = kind || null;
    existing.minimized = false;
    existing.z = nextZ();
    state.activeId = existing.id;
    renderDesktop();
    return existing;
  }

  const bounds = getDesktopBounds();
  const width = clamp(w, minW, bounds.width - WINDOW_EDGE * 2);
  const height = clamp(h, minH, bounds.height - WINDOW_EDGE * 2);
  const xPos = clamp(x, WINDOW_EDGE, Math.max(WINDOW_EDGE, bounds.width - width - WINDOW_EDGE));
  const yPos = clamp(y, WINDOW_EDGE, Math.max(WINDOW_EDGE, bounds.height - height - WINDOW_EDGE));

  const windowState = {
    id,
    title,
    body,
    x: xPos,
    y: yPos,
    w: width,
    h: height,
    z: nextZ(),
    className: className || "",
    type,
    trackId: trackId || null,
    kind: kind || null,
    minimized: false,
    maximized: false,
    prevRect: null,
    minW,
    minH
  };

  state.windows.push(windowState);
  persistWorkspaceWindow(windowState);
  state.startMenuOpen = false;
  state.activeId = id;
  renderDesktop();
  return windowState;
}

function closeWindow(id) {
  if (id.startsWith("player-")) {
    stopTrack(id);
    destroyPlayerHydra(id);
    playerState.delete(id);
    replRegistry.delete(id);
  }

  const idx = state.windows.findIndex((windowItem) => windowItem.id === id);
  if (idx !== -1) {
    state.windows.splice(idx, 1);
    state.startMenuOpen = false;
    const nextActive = [...state.windows]
      .filter((windowItem) => !windowItem.minimized)
      .sort((a, b) => b.z - a.z)[0];
    state.activeId = nextActive ? nextActive.id : null;
    renderDesktop();
  }
}

function focusWindow(id, shouldRender = true) {
  const windowState = findWindowById(id);
  if (!windowState) return;
  if (windowState.minimized) windowState.minimized = false;
  state.startMenuOpen = false;
  windowState.z = nextZ();
  state.activeId = id;
  if (shouldRender) renderDesktop();
}

function minimizeWindow(id) {
  const windowState = findWindowById(id);
  if (!windowState) return;
  windowState.minimized = true;
  if (state.activeId === id) {
    const nextActive = [...state.windows]
      .filter((candidate) => !candidate.minimized && candidate.id !== id)
      .sort((a, b) => b.z - a.z)[0];
    state.activeId = nextActive ? nextActive.id : null;
  }
  persistWorkspaceWindow(windowState);
  renderDesktop();
}

function toggleTaskWindow(id) {
  const windowState = findWindowById(id);
  if (!windowState) return;
  if (windowState.minimized) {
    windowState.minimized = false;
    focusWindow(id);
    return;
  }
  if (state.activeId === id) {
    minimizeWindow(id);
    return;
  }
  focusWindow(id);
}

function toggleMaximizeWindow(id) {
  const windowState = findWindowById(id);
  if (!windowState) return;
  const bounds = getDesktopBounds();
  if (!windowState.maximized) {
    windowState.prevRect = { x: windowState.x, y: windowState.y, w: windowState.w, h: windowState.h };
    windowState.x = WINDOW_EDGE;
    windowState.y = WINDOW_EDGE;
    windowState.w = bounds.width - WINDOW_EDGE * 2;
    windowState.h = bounds.height - WINDOW_EDGE * 2;
    windowState.maximized = true;
  } else if (windowState.prevRect) {
    windowState.x = windowState.prevRect.x;
    windowState.y = windowState.prevRect.y;
    windowState.w = windowState.prevRect.w;
    windowState.h = windowState.prevRect.h;
    windowState.maximized = false;
    windowState.prevRect = null;
  }
  persistWorkspaceWindow(windowState);
  focusWindow(id);
}

function snapToWorkspacePreset(trackId) {
  const track = trackMap.get(trackId);
  const bounds = getDesktopBounds();
  if (!track) return "triad";
  if (track.status !== "hero") return "cascade";
  if (bounds.width < 1180) return "cascade";
  return "triad";
}

function cascadeWorkspace(trackId) {
  const workspace = getWorkspace(trackId);
  workspace.layoutPreset = "cascade";
  const bounds = getDesktopBounds();
  const width = Math.min(bounds.width - 80, 760);
  const height = Math.min(bounds.height - 90, 440);

  return {
    liner: { x: 28, y: 26, w: width, h: height },
    player: { x: 58, y: 56, w: width, h: height },
    source: { x: 88, y: 86, w: width, h: height }
  };
}

function triadWorkspace(trackId, variant = state.designVariant) {
  const workspace = getWorkspace(trackId);
  workspace.layoutPreset = `triad-${variant}`;
  const bounds = getDesktopBounds();
  const ratios = getVariantRatios(variant);

  const margin = 16;
  const gap = 14;
  const availableW = bounds.width - margin * 2;
  const availableH = bounds.height - margin * 2;

  const leftW = Math.floor(availableW * ratios.liner);
  const centerW = Math.floor(availableW * ratios.player);
  const rightW = availableW - leftW - centerW - gap * 2;

  const x1 = margin;
  const x2 = x1 + leftW + gap;
  const x3 = x2 + centerW + gap;

  return {
    liner: { x: x1, y: margin, w: leftW, h: availableH },
    player: { x: x2, y: margin, w: centerW, h: availableH },
    source: { x: x3, y: margin, w: rightW, h: availableH }
  };
}

function restoreWorkspace(trackId, kind, variant = state.designVariant) {
  const workspace = getWorkspace(trackId);
  const byVariant = workspace.lastPositionsByVariant?.[variant]?.[kind];
  if (byVariant) return byVariant;
  return workspace.lastPositions[kind] || null;
}

function computeWorkspaceRects(trackId, variant = state.designVariant) {
  const preset = snapToWorkspacePreset(trackId);
  if (preset === "triad") return triadWorkspace(trackId, variant);
  return cascadeWorkspace(trackId);
}

function setDesignVariant(variantId) {
  if (!VARIANTS[variantId] || variantId === state.designVariant) return;
  state.designVariant = variantId;
  state.startMenuOpen = false;
  state.startMenuPath = "root";
  Object.keys(state.workspaceRegistry).forEach((trackId) => {
    const workspace = getWorkspace(trackId);
    const windows = ["liner", "player", "source"].map((kind) => findWindowById(workspace.windowIds[kind])).filter(Boolean);
    if (!windows.length) return;
    if (windows.some((windowItem) => windowItem.maximized)) return;
    const nextRects = computeWorkspaceRects(trackId, variantId);
    windows.forEach((windowItem) => {
      const next = nextRects[windowItem.kind];
      if (!next) return;
      windowItem.x = next.x;
      windowItem.y = next.y;
      windowItem.w = next.w;
      windowItem.h = next.h;
      windowItem.maximized = false;
      windowItem.prevRect = null;
      persistWorkspaceWindow(windowItem);
    });
  });
  renderDesktop();
}

function buildLinerBody(track) {
  const notes = track.liner_notes;
  const statusBadge = track.status === "hero" ? "HERO TRACK" : "IN DEVELOPMENT";
  const feeling = excerpt(notes.what_this_track_should_make_you_feel, 140);
  const personal = excerpt(notes.personal_context, 170);
  const audioIntent = excerpt(notes.design_intent_audio, 110);
  const visualIntent = excerpt(notes.design_intent_visual, 110);

  return `
    <div class="liner-panel ${track.status === "placeholder" ? "placeholder-panel" : ""}">
      <div class="panel-topline">Liner Notes</div>
      <div class="panel-track">${track.title}</div>
      <div class="panel-meta">${track.location} · ${track.theme}</div>
      <div class="panel-status">${statusBadge}</div>
      <div class="liner-pill-row">
        <span class="liner-pill">Mood: ${track.mood}</span>
        <span class="liner-pill">Theme: ${track.theme}</span>
        <span class="liner-pill">Duration: ${track.duration_target}</span>
      </div>
      <section class="liner-section compact">
        <h4>Personal Context</h4>
        <p>${personal}</p>
      </section>
      <section class="liner-section compact">
        <h4>Feel</h4>
        <p>${feeling}</p>
      </section>
      <div class="intent-grid">
        <section class="liner-section compact">
          <h4>Audio</h4>
          <p>${audioIntent}</p>
        </section>
        <section class="liner-section compact">
          <h4>Visual</h4>
          <p>${visualIntent}</p>
        </section>
      </div>
      <section class="liner-section compact">
        <h4>Validation Prompt</h4>
        <p>${excerpt(track.validation_hypothesis, 120)}</p>
      </section>
    </div>
  `;
}

function getConciseSources(track) {
  return (track.sources || []).map((source, index) => ({
    idx: index,
    name: source.sample_name,
    origin: `${source.origin_title} / ${source.origin_artist}`,
    year: source.origin_year,
    usedIn: source.where_used_in_track,
    why: source.why_it_matters_personally
  }));
}

function buildSamplesBodyV1(track, conciseSources) {
  return `
    <div class="source-panel samples-v1-files ${track.status === "placeholder" ? "placeholder-panel" : ""}">
      <div class="panel-topline">Samples Explorer</div>
      <div class="panel-track">${track.title}</div>
      <div class="panel-meta">XP folder view: track.mp3, liner.txt, samples/</div>
      <div class="files-list">
        <div class="file-row"><span class="file-icon">♪</span><span>track.mp3</span></div>
        <div class="file-row"><span class="file-icon">TXT</span><span>liner.txt</span></div>
        <div class="file-row"><span class="file-icon">DIR</span><span>samples/</span></div>
      </div>
      <div class="source-detail-grid">
        ${
          conciseSources.length
            ? conciseSources
                .map(
                  (sample) => `
                  <button class="source-detail-card file-sample-card" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">
                    <div class="source-detail-title">${sample.name}</div>
                    <div class="source-detail-line"><strong>From:</strong> ${excerpt(sample.origin, 68)}</div>
                    <div class="source-detail-line"><strong>Year:</strong> ${sample.year}</div>
                  </button>
                `
                )
                .join("")
            : `<div class="source-empty-note">No samples yet for this placeholder track.</div>`
        }
      </div>
    </div>
  `;
}

function buildSamplesBodyV2(track, conciseSources) {
  return `
    <div class="source-panel samples-v2-strip ${track.status === "placeholder" ? "placeholder-panel" : ""}">
      <div class="panel-topline">Samples / Listening Strip Context</div>
      <div class="panel-track">${track.title}</div>
      <div class="panel-meta">Click any source for quick detail</div>
      <div class="strip-source-list">
        ${
          conciseSources.length
            ? conciseSources
                .map(
                  (sample) => `
                  <button class="strip-source-item" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">
                    <span class="strip-source-name">${sample.name}</span>
                    <span class="strip-source-use">${excerpt(sample.usedIn, 48)}</span>
                  </button>
                `
                )
                .join("")
            : `<div class="source-empty-note">No samples yet for this placeholder track.</div>`
        }
      </div>
    </div>
  `;
}

function buildSamplesBodyV3(track, conciseSources) {
  return `
    <div class="source-panel samples-v3-cards ${track.status === "placeholder" ? "placeholder-panel" : ""}">
      <div class="panel-topline">Provenance Board</div>
      <div class="panel-track">${track.title}</div>
      <div class="panel-meta">Name / From / Year / Used in / Why</div>
      <div class="source-detail-grid cards-grid">
        ${
          conciseSources.length
            ? conciseSources
                .map(
                  (sample) => `
                  <button class="source-detail-card provenance-card" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">
                    <div class="source-detail-title">${sample.name}</div>
                    <div class="source-detail-line"><strong>From:</strong> ${excerpt(sample.origin, 58)}</div>
                    <div class="source-detail-line"><strong>Year:</strong> ${sample.year}</div>
                    <div class="source-detail-line"><strong>Used in:</strong> ${excerpt(sample.usedIn, 56)}</div>
                    <div class="source-detail-line"><strong>Why:</strong> ${excerpt(sample.why, 70)}</div>
                  </button>
                `
                )
                .join("")
            : `<div class="source-empty-note">No samples yet for this placeholder track.</div>`
        }
      </div>
    </div>
  `;
}

function buildSamplesBody(track) {
  const conciseSources = getConciseSources(track);
  if (state.designVariant === "v2") return buildSamplesBodyV2(track, conciseSources);
  if (state.designVariant === "v3") return buildSamplesBodyV3(track, conciseSources);
  return buildSamplesBodyV1(track, conciseSources);
}

function buildSampleDetailBody(track, sample) {
  if (state.designVariant === "v2") {
    return `
      <div class="liner-panel sample-detail-v2">
        <div class="panel-topline">Source Trace</div>
        <div class="panel-track">${sample.name}</div>
        <div class="panel-meta">${track.title}</div>
        <div class="sample-badge-row">
          <span class="sample-badge">Year: ${sample.year}</span>
          <span class="sample-badge">Track: ${track.title}</span>
        </div>
        <ol class="sample-timeline">
          <li>
            <h4>Origin</h4>
            <p>${sample.origin}</p>
          </li>
          <li>
            <h4>Used In</h4>
            <p>${sample.usedIn}</p>
          </li>
          <li>
            <h4>Why It Matters</h4>
            <p>${sample.why}</p>
          </li>
        </ol>
      </div>
    `;
  }

  if (state.designVariant === "v3") {
    return `
      <div class="liner-panel sample-detail-v3">
        <div class="sample-hero">
          <div class="panel-topline">Sample Spotlight</div>
          <div class="panel-track">${sample.name}</div>
          <div class="panel-meta">${track.title}</div>
        </div>
        <div class="sample-info-grid">
          <section class="liner-section compact">
            <h4>From</h4>
            <p>${sample.origin}</p>
          </section>
          <section class="liner-section compact">
            <h4>Year</h4>
            <p>${sample.year}</p>
          </section>
        </div>
        <section class="liner-section compact">
          <h4>Used In</h4>
          <p>${sample.usedIn}</p>
        </section>
        <section class="liner-section compact">
          <h4>Personal Meaning</h4>
          <p>${sample.why}</p>
        </section>
      </div>
    `;
  }

  return `
    <div class="liner-panel sample-detail-v1">
      <div class="panel-topline">Sample Detail</div>
      <div class="panel-track">${sample.name}</div>
      <div class="panel-meta">${track.title}</div>
      <section class="liner-section compact">
        <h4>From</h4>
        <p>${sample.origin}</p>
      </section>
      <section class="liner-section compact">
        <h4>Year</h4>
        <p>${sample.year}</p>
      </section>
      <section class="liner-section compact">
        <h4>Used In</h4>
        <p>${sample.usedIn}</p>
      </section>
      <section class="liner-section compact">
        <h4>Why It Matters</h4>
        <p>${sample.why}</p>
      </section>
    </div>
  `;
}

function openSampleDetailWindow(trackId, sampleIndex) {
  const track = trackMap.get(trackId);
  if (!track) return;
  const conciseSources = getConciseSources(track);
  const sample = conciseSources.find((entry) => entry.idx === Number(sampleIndex));
  if (!sample) return;

  createWindow({
    id: `sample-detail-${trackId}-${sample.idx}`,
    title: `Sample Detail - ${sample.name}`,
    type: "meta",
    className: "window-liner",
    x: 240,
    y: 110,
    w: 440,
    h: 360,
    minW: 360,
    minH: 280,
    body: buildSampleDetailBody(track, sample)
  });
}

function buildLibraryView(visibleTracks) {
  if (state.desktopStep === "intro") return "";

  return `
    <section class="library-host library-${state.designVariant}">
      <div class="desktop-shortcuts">
        <button class="desktop-icon xp-shortcut applications" data-open-app-folder-desktop="1">
          <span class="desktop-icon-glyph"></span>
          <span class="desktop-icon-label">Applications</span>
        </button>
        <button class="desktop-icon xp-shortcut music" data-open-music-folder="1">
          <span class="desktop-icon-glyph"></span>
          <span class="desktop-icon-label">My Music</span>
        </button>
        <button class="desktop-icon xp-shortcut computer" data-open-about-desktop="1">
          <span class="desktop-icon-glyph"></span>
          <span class="desktop-icon-label">My Computer</span>
        </button>
      </div>
    </section>
  `;
}

function buildDesktopTrackFolders(visibleTracks) {
  if (state.desktopStep === "intro") return "";
  return `
    <section class="desktop-track-folders">
      ${visibleTracks
        .map(
          (track) => `
          <button class="track-folder-icon ${track.status}" data-run-track-exe="${track.id}">
            <span class="track-folder-glyph"></span>
            <span class="track-folder-label">${track.folder}</span>
          </button>
        `
        )
        .join("")}
    </section>
  `;
}

function buildTrackFolderBody(track) {
  return `
    <div class="source-panel samples-v1-files">
      <div class="panel-topline">Application Folder</div>
      <div class="panel-track">${track.folder}</div>
      <div class="panel-meta">Open executable to launch media player</div>
      <div class="files-list">
        <div class="file-row"><span class="file-icon">EXE</span><span>${track.title}.exe</span></div>
        <div class="file-row"><span class="file-icon">TXT</span><span>liner.txt</span></div>
        <div class="file-row"><span class="file-icon">DIR</span><span>samples/</span></div>
      </div>
      <div class="folder-actions">
        <button class="button" data-run-track-exe="${track.id}">Run ${track.title}.exe</button>
      </div>
    </div>
  `;
}

function openTrackFolderWindow(trackId) {
  const track = trackMap.get(trackId);
  if (!track) return;
  createWindow({
    id: `folder-${track.id}`,
    title: `${track.folder} / Applications`,
    type: "meta",
    className: "window-source",
    x: 90,
    y: 84,
    w: 430,
    h: 330,
    minW: 360,
    minH: 260,
    body: buildTrackFolderBody(track)
  });
}

function openMusicFolderWindow() {
  const visibleTracks = getAvailableTracks();
  createWindow({
    id: "desktop-my-music",
    title: "My Music",
    type: "meta",
    className: "window-source",
    x: 120,
    y: 96,
    w: 420,
    h: 320,
    minW: 360,
    minH: 260,
    body: `
      <div class="source-panel samples-v1-files">
        <div class="panel-topline">Music Folder</div>
        <div class="panel-track">Album Chapters</div>
        <div class="panel-meta">Open a track folder, then run its executable.</div>
        <div class="files-list">
          ${visibleTracks
            .map(
              (track) => `
              <button class="file-row music-folder-row" data-open-folder-track="${track.id}">
                <span class="file-icon">DIR</span>
                <span>${track.folder}</span>
              </button>
            `
            )
            .join("")}
        </div>
      </div>
    `
  });
}

function openApplicationsFolderWindow() {
  const visibleTracks = getAvailableTracks();
  createWindow({
    id: "desktop-applications",
    title: "Applications",
    type: "meta",
    className: "window-source",
    x: 108,
    y: 92,
    w: 440,
    h: 340,
    minW: 380,
    minH: 280,
    body: `
      <div class="source-panel samples-v1-files">
        <div class="panel-topline">Applications Folder</div>
        <div class="panel-track">Media Player Shortcuts</div>
        <div class="panel-meta">Open a track app directly from the desktop.</div>
        <div class="files-list">
          ${visibleTracks
            .map(
              (track) => `
              <button class="file-row music-folder-row" data-run-track-exe="${track.id}">
                <span class="file-icon">EXE</span>
                <span>${track.title}.exe</span>
              </button>
            `
            )
            .join("")}
        </div>
      </div>
    `
  });
}

function openDesktopAboutWindow() {
  createWindow({
    id: "desktop-about",
    title: "My Computer",
    type: "meta",
    className: "window-liner",
    x: 90,
    y: 80,
    w: 420,
    h: 300,
    minW: 340,
    minH: 240,
    body: `
      <div class="liner-panel">
        <div class="panel-topline">Desktop Guide</div>
        <div class="panel-track">Head As OS</div>
        <section class="liner-section compact">
          <h4>Applications</h4>
          <p>Open track folders and run the executable to launch a media player.</p>
        </section>
        <section class="liner-section compact">
          <h4>Tracks</h4>
          <p>Each track folder is a chapter in the album.</p>
        </section>
        <section class="liner-section compact">
          <h4>Sources</h4>
          <p>Sample origins are clickable and open detail windows.</p>
        </section>
      </div>
    `
  });
}

function buildPlayerBody(track) {
  const placeholderClass = track.status === "placeholder" ? "placeholder-panel" : "";
  const disabled = track.status === "placeholder";
  const showHydra = track.status === "hero" && track.id === DEMO_HYDRA_TRACK_ID;
  const conciseSources = getConciseSources(track);
  const showStrip = false;
  const showXpMediaLayout = state.designVariant === "v1";
  const showExplorerLayout = state.designVariant === "v2";
  const showStudioLayout = state.designVariant === "v3";

  return `
    <div class="player-app ${placeholderClass}">
      <div class="player-header">
        <div class="player-header-top">Strudel Player</div>
        <div class="player-title">${track.title}</div>
        <div class="player-sub">${track.location} · ${track.mood} · target ${track.duration_target}</div>
      </div>
      <div class="player-controls">
        <button class="button ${disabled ? "is-disabled" : ""}" ${disabled ? "disabled" : ""} data-play="player-${track.id}">Play</button>
        <button class="button ${disabled ? "is-disabled" : ""}" ${disabled ? "disabled" : ""} data-stop="player-${track.id}">Stop</button>
        <button class="button" data-reset="player-${track.id}">Reset</button>
        ${track.id === "t3" ? `<button class="button" data-identity-error="1">Trigger Error</button>` : ""}
      </div>
      ${
        showXpMediaLayout
          ? `
        <div class="media-layout-v1">
          <div class="media-code-pane">
            <div class="media-pane-title">Strudel Code</div>
            <div class="player-stage">
              ${
                showHydra
                  ? `<div class="player-hydra-layer"><canvas class="player-hydra-canvas" data-player-hydra="player-${track.id}"></canvas></div>`
                  : ""
              }
              <div class="player-glass"></div>
              <div class="player-repl" data-repl="player-${track.id}"></div>
            </div>
          </div>
          <fieldset class="media-sources-pane">
            <legend>Sample Origins</legend>
            <div class="media-sources-grid">
              ${
                conciseSources.length
                  ? conciseSources
                      .map(
                        (sample) => `
                        <button class="media-origin-card" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">
                          <span class="media-origin-name">${sample.name}</span>
                          <span class="media-origin-from">${excerpt(sample.origin, 44)}</span>
                          <span class="media-origin-meta">${sample.year} · ${excerpt(sample.usedIn, 30)}</span>
                        </button>
                      `
                      )
                      .join("")
                  : `<div class="source-empty-note">No sample origins yet.</div>`
              }
            </div>
          </fieldset>
        </div>
      `
          : ""
      }
      ${
        showExplorerLayout
          ? `
        <div class="media-layout-v2">
          <aside class="v2-left-tree">
            <div class="media-pane-title">Library</div>
            <ul role="tree" class="tree-view v2-tree">
              <li>track.mp3</li>
              <li>liner.txt</li>
              <li>samples/
                <ul>
                  ${conciseSources.map((sample) => `<li><button class="v2-sample-link" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">${sample.name}</button></li>`).join("")}
                </ul>
              </li>
            </ul>
          </aside>
          <div class="v2-center-code">
            <div class="media-pane-title">Strudel Code</div>
            <div class="player-stage">
              ${
                showHydra
                  ? `<div class="player-hydra-layer"><canvas class="player-hydra-canvas" data-player-hydra="player-${track.id}"></canvas></div>`
                  : ""
              }
              <div class="player-glass"></div>
              <div class="player-repl" data-repl="player-${track.id}"></div>
            </div>
          </div>
          <fieldset class="v2-right-origin">
            <legend>Origins</legend>
            ${conciseSources
              .map(
                (sample) => `
                <button class="media-origin-card" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">
                  <span class="media-origin-name">${sample.name}</span>
                  <span class="media-origin-from">${excerpt(sample.origin, 52)}</span>
                  <span class="media-origin-meta">${sample.year}</span>
                </button>
              `
              )
              .join("")}
          </fieldset>
        </div>
      `
          : ""
      }
      ${
        showStudioLayout
          ? `
        <div class="media-layout-v3">
          <div class="v3-visual-bar">
            ${
              showHydra
                ? `<div class="player-hydra-layer"><canvas class="player-hydra-canvas" data-player-hydra="player-${track.id}"></canvas></div>`
                : `<div class="v3-visual-placeholder">Visualizer</div>`
            }
            <div class="player-glass"></div>
          </div>
          <div class="v3-bottom">
            <div class="v3-code">
              <div class="media-pane-title">Strudel Code</div>
              <div class="player-stage">
                <div class="player-glass"></div>
                <div class="player-repl" data-repl="player-${track.id}"></div>
              </div>
            </div>
            <fieldset class="v3-origins">
              <legend>Sample Origins</legend>
              ${conciseSources
                .map(
                  (sample) => `
                  <button class="media-origin-card v3-origin-card" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">
                    <span class="media-origin-name">${sample.name}</span>
                    <span class="media-origin-meta">${sample.year} · ${excerpt(sample.usedIn, 28)}</span>
                  </button>
                `
                )
                .join("")}
            </fieldset>
          </div>
        </div>
      `
          : ""
      }
      ${
        showStrip
          ? `
        <div class="now-playing-strip">
          <div class="strip-label">Now Playing Sources</div>
          <div class="strip-chips">
            ${
              conciseSources.length
                ? conciseSources
                    .map(
                      (sample) => `
                      <button class="strip-chip" data-sample-detail-track="${track.id}" data-sample-detail-index="${sample.idx}">
                        <span>${sample.name}</span>
                      </button>
                    `
                    )
                    .join("")
                : `<span class="strip-empty">No sources yet</span>`
            }
          </div>
        </div>
      `
          : ""
      }
      ${
        showXpMediaLayout || showExplorerLayout || showStudioLayout
          ? ""
          : `
        <div class="player-stage">
          ${
            showHydra
              ? `<div class="player-hydra-layer"><canvas class="player-hydra-canvas" data-player-hydra="player-${track.id}"></canvas></div>`
              : ""
          }
          <div class="player-glass"></div>
          <div class="player-repl" data-repl="player-${track.id}"></div>
        </div>
      `
      }
      <div class="status-bar media-status-bar">
        <p class="status-bar-field">${track.location}</p>
        <p class="status-bar-field">${track.duration_target}</p>
        <p class="status-bar-field">${VARIANTS[state.designVariant].short}</p>
      </div>
      ${disabled ? `<div class="player-placeholder-note">Track is nog in development. Dit venster toont de beoogde applicatie-structuur.</div>` : ""}
    </div>
  `;
}

function openWorkspaceWindow(track, kind, rect) {
  if (kind === "player") {
    return createWindow({
      id: `player-${track.id}`,
      title: `Strudel Player - ${track.title}`,
      type: "player",
      className: "window-player",
      trackId: track.id,
      kind,
      x: rect.x,
      y: rect.y,
      w: rect.w,
      h: rect.h,
      minW: 500,
      minH: 320,
      body: buildPlayerBody(track)
    });
  }

  if (kind === "liner") {
    return createWindow({
      id: `liner-${track.id}`,
      title: `Liner Notes - ${track.title}`,
      type: "liner",
      className: "window-liner",
      trackId: track.id,
      kind,
      x: rect.x,
      y: rect.y,
      w: rect.w,
      h: rect.h,
      minW: 320,
      minH: 320,
      body: buildLinerBody(track)
    });
  }

  return createWindow({
    id: `source-${track.id}`,
    title: `Samples - ${track.title}`,
    type: "source",
    className: "window-source",
    trackId: track.id,
    kind,
    x: rect.x,
    y: rect.y,
    w: rect.w,
    h: rect.h,
    minW: 360,
    minH: 320,
    body: buildSamplesBody(track)
  });
}

function openTrackWorkspace(trackId) {
  const track = trackMap.get(trackId);
  if (!track) return;

  const preset = computeWorkspaceRects(trackId, state.designVariant);
  const restoreRect = restoreWorkspace(trackId, "player", state.designVariant);
  const nextRect = restoreRect ? { x: restoreRect.x, y: restoreRect.y, w: restoreRect.w, h: restoreRect.h } : preset.player;
  const playerWindow = openWorkspaceWindow(track, "player", nextRect);
  if (restoreRect && restoreRect.maximized && playerWindow && !playerWindow.maximized) {
    toggleMaximizeWindow(playerWindow.id);
  }
  focusWindow(`player-${track.id}`);

  if (track.id === "t3") {
    showSystemError();
  }
}

function mountRepl(windowId, code) {
  const container = document.querySelector(`[data-repl="${windowId}"]`);
  if (!container) return;

  let repl = replRegistry.get(windowId);
  if (!repl) {
    repl = document.createElement("strudel-editor");
    replRegistry.set(windowId, repl);
  }

  if (!container.contains(repl)) {
    container.innerHTML = "";
    container.appendChild(repl);
  }

  repl.setAttribute("code", code);
  forceReplIframeFullSize(repl);
}

function forceReplIframeFullSize(repl) {
  const tryPatch = () => {
    const root = repl.shadowRoot;
    if (!root) return false;
    const iframe = root.querySelector("iframe");
    if (!iframe) return false;

    iframe.removeAttribute("width");
    iframe.removeAttribute("height");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";

    const parent = iframe.parentElement;
    if (parent) {
      parent.style.width = "100%";
      parent.style.height = "100%";
    }

    return true;
  };

  if (tryPatch()) return;
  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (tryPatch() || tries > 60) clearInterval(timer);
  }, 100);
}

function showSystemError() {
  if (document.querySelector("#systemError")) return;
  const overlay = document.createElement("div");
  overlay.id = "systemError";
  overlay.className = "system-error-overlay";
  overlay.innerHTML = `
    <div class="window system-error" style="width: 420px; left: calc(50% - 210px); top: calc(50% - 90px); height: 180px; z-index: 1200;">
      <div class="title-bar">
        <div class="title-bar-text">System Error</div>
        <div class="title-bar-controls">
          <button aria-label="Close" class="error-close">x</button>
        </div>
      </div>
      <div class="window-body">
        <div class="error-body">
          <div class="error-icon">!</div>
          <div class="error-text">Access Denied: Identity not recognized by environment.</div>
        </div>
        <div class="error-actions">
          <button class="button error-ok">OK</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector(".error-ok")?.addEventListener("click", () => overlay.remove());
  overlay.querySelector(".error-close")?.addEventListener("click", () => overlay.remove());
}

function playTrack(windowId) {
  const repl = replRegistry.get(windowId);
  if (repl && repl.editor) repl.editor.evaluate();
  playerState.set(windowId, { playing: true });
  setPlayerHydraPlayback(windowId, true);
}

function stopTrack(windowId) {
  const repl = replRegistry.get(windowId);
  if (repl && repl.editor) repl.editor.stop();
  playerState.set(windowId, { playing: false });
  setPlayerHydraPlayback(windowId, false);
}

function resetTrack(windowId, code) {
  const repl = replRegistry.get(windowId);
  if (!repl || !repl.editor) return;
  repl.editor.setCode(code);
}

function attachDragHandlers() {
  document.querySelectorAll("#windows .window[data-id]").forEach((windowEl) => {
    const id = windowEl.getAttribute("data-id");
    const windowState = findWindowById(id);
    if (!windowState) return;

    const header = windowEl.querySelector(".title-bar");
    if (!header) return;

    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const onMouseMove = (event) => {
      const bounds = getDesktopBounds();
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const nextLeft = clamp(startLeft + dx, WINDOW_EDGE, Math.max(WINDOW_EDGE, bounds.width - windowState.w - WINDOW_EDGE));
      const nextTop = clamp(startTop + dy, WINDOW_EDGE, Math.max(WINDOW_EDGE, bounds.height - windowState.h - WINDOW_EDGE));
      windowEl.style.left = `${nextLeft}px`;
      windowEl.style.top = `${nextTop}px`;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      windowState.x = parseInt(windowEl.style.left || "0", 10);
      windowState.y = parseInt(windowEl.style.top || "0", 10);
      persistWorkspaceWindow(windowState);
      renderDesktop();
    };

    header.addEventListener("mousedown", (event) => {
      if (event.target.closest(".title-bar-controls") || windowState.maximized) return;
      event.preventDefault();
      focusWindow(id, false);
      windowEl.style.zIndex = String(windowState.z);
      startX = event.clientX;
      startY = event.clientY;
      startLeft = parseInt(windowEl.style.left || "0", 10);
      startTop = parseInt(windowEl.style.top || "0", 10);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });

    header.addEventListener("dblclick", (event) => {
      if (event.target.closest(".title-bar-controls")) return;
      toggleMaximizeWindow(id);
    });
  });
}

function attachResizeHandlers() {
  document.querySelectorAll("#windows [data-resize]").forEach((handle) => {
    const id = handle.getAttribute("data-resize");
    const windowState = findWindowById(id);
    if (!windowState || windowState.maximized) return;

    const windowEl = handle.closest(".window");
    if (!windowEl) return;

    let startX = 0;
    let startY = 0;
    let startW = 0;
    let startH = 0;

    const onMouseMove = (event) => {
      const bounds = getDesktopBounds();
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const maxWidth = bounds.width - windowState.x - WINDOW_EDGE;
      const maxHeight = bounds.height - windowState.y - WINDOW_EDGE;
      const nextW = clamp(startW + dx, windowState.minW || 260, Math.max(windowState.minW || 260, maxWidth));
      const nextH = clamp(startH + dy, windowState.minH || 180, Math.max(windowState.minH || 180, maxHeight));
      windowEl.style.width = `${nextW}px`;
      windowEl.style.height = `${nextH}px`;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      windowState.w = parseInt(windowEl.style.width || "0", 10);
      windowState.h = parseInt(windowEl.style.height || "0", 10);
      persistWorkspaceWindow(windowState);
      renderDesktop();
    };

    handle.addEventListener("mousedown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      focusWindow(id, false);
      windowEl.style.zIndex = String(windowState.z);
      startX = event.clientX;
      startY = event.clientY;
      startW = windowState.w;
      startH = windowState.h;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
  });
}

function renderLogin() {
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-panel window" style="left: calc(50% - 190px); top: calc(50% - 150px); width: 380px; height: 300px;">
        <div class="title-bar">
          <div class="title-bar-text">BREINDOOD / Login</div>
        </div>
        <div class="window-body login-body">
          <div class="login-title">Autobiografisch Desktop Album</div>
          <label class="field">
            <span>Gebruiker</span>
            <input id="loginUser" type="text" value="karim" />
          </label>
          <label class="field">
            <span>Wachtwoord</span>
            <input id="loginPass" type="password" value="identiteit" />
          </label>
          <div class="login-actions">
            <button id="loginBtn" class="button">Login</button>
          </div>
          <p class="login-hint">Deze desktop visualiseert identiteit via locaties, code, samples en context.</p>
        </div>
      </div>
    </div>
  `;

  byId("loginBtn").addEventListener("click", () => {
    const user = byId("loginUser").value.trim();
    const pass = byId("loginPass").value.trim();
    if (user === "karim" && pass === "identiteit") {
      state.view = "desktop";
      state.desktopStep = "intro";
      state.showAllTracks = false;
      state.startMenuPath = "root";
      state.windows = [];
      state.activeId = null;
      renderApp();
    } else {
      showSystemError();
    }
  });

  byId("loginPass").addEventListener("keydown", (event) => {
    if (event.key === "Enter") byId("loginBtn").click();
  });
}

function renderBoot() {
  app.innerHTML = `
    <div class="boot-screen">
      <div class="boot-logo">BREINDOOD</div>
      <div class="boot-sub">Booting identity map...</div>
      <div class="boot-bar">
        <div class="boot-progress"></div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (!state.bootDone) {
      state.bootDone = true;
      state.view = "desktop";
      state.desktopStep = "intro";
      state.showAllTracks = false;
      state.startMenuOpen = false;
      state.startMenuPath = "root";
      state.windows = [];
      state.activeId = null;
    }
    renderApp();
  }, 1200);
}

function renderIntroStep() {
  return `
    <section class="desktop-intro-window window desktop-intro">
      <div class="title-bar">
        <div class="title-bar-text">BREINDOOD / Intro</div>
      </div>
      <div class="window-body login-body">
        <div class="login-title">Head As OS</div>
        <p>You are browsing my mental stack.</p>
        <p>Each song opens 3 windows:<br/>1. Strudel Player<br/>2. Liner Notes<br/>3. Samples</p>
        <p>Start with one song and move through the chapters.</p>
        <div class="login-actions">
          <button class="button" data-enter-library="1">Go to songs</button>
        </div>
      </div>
    </section>
  `;
}

function renderLibraryStep(visibleTracks) {
  return `<div id="libraryHost">${buildLibraryView(visibleTracks)}</div>`;
}

function renderDesktopShell(visibleTracks) {
  return `
    <div class="desktop variant-${state.designVariant}">
      <div class="bliss-wallpaper"></div>
      <div class="desktop-overlay"></div>
      ${renderLibraryStep(visibleTracks)}
      <div id="desktopFoldersHost">${buildDesktopTrackFolders(visibleTracks)}</div>
      ${state.desktopStep === "intro" ? renderIntroStep() : ""}
      <div id="startMenuHost"></div>
      <div id="windows" class="windows-layer"></div>
      <div id="taskbar" class="taskbar">
        <button id="startBtn" class="start-btn">BREINDOOD</button>
        <div id="taskbarWindows" class="taskbar-windows"></div>
        <div class="taskbar-right">
          <div class="variant-badge">${VARIANTS[state.designVariant].label}</div>
          <div id="clock" class="taskbar-clock">${nowTime()}</div>
        </div>
      </div>
    </div>
  `;
}

function renderDesktop() {
  const visibleTracks = getAvailableTracks();

  if (!app.querySelector(".desktop")) {
    app.innerHTML = renderDesktopShell(visibleTracks);
  }

  const desktopRoot = app.querySelector(".desktop");
  if (desktopRoot) {
    desktopRoot.className = `desktop variant-${state.designVariant}`;
  }

  const libraryHost = byId("libraryHost");
  if (libraryHost) libraryHost.innerHTML = buildLibraryView(visibleTracks);
  const foldersHost = byId("desktopFoldersHost");
  if (foldersHost) foldersHost.innerHTML = buildDesktopTrackFolders(visibleTracks);

  const existingIntro = document.querySelector(".desktop-intro-window");
  if (state.desktopStep === "intro" && !existingIntro) {
    const intro = document.createElement("div");
    intro.innerHTML = renderIntroStep();
    const introNode = intro.firstElementChild;
    if (introNode) desktopRoot?.appendChild(introNode);
  }
  if (state.desktopStep !== "intro" && existingIntro) {
    existingIntro.remove();
  }

  const taskbarWindows = byId("taskbarWindows");
  if (taskbarWindows) {
    taskbarWindows.innerHTML = state.windows
      .map(
        (windowItem) => `
          <button class="task-btn ${state.activeId === windowItem.id && !windowItem.minimized ? "active" : ""} ${
            windowItem.minimized ? "minimized" : ""
          }" data-task="${windowItem.id}">${windowItem.title}</button>
        `
      )
      .join("");
  }

  const startMenuHost = byId("startMenuHost");
  if (startMenuHost) {
    const startAppsList = getAvailableTracks()
      .map(
        (track) => `
        <button class="start-item" data-start-track="${track.id}">
          ${track.folder} (${track.status === "hero" ? "hero" : "placeholder"})
        </button>
      `
      )
      .join("");

    const startAppFlow =
      state.startMenuPath === "apps"
        ? `
          <div class="start-group">Applications Folder</div>
          <button class="start-item" data-back-root="1">.. Back</button>
          ${startAppsList}
        `
        : `
          <div class="start-group">Programs</div>
          <button class="start-item" data-open-app-folder="1">Applications ></button>
        `;

    startMenuHost.innerHTML = state.startMenuOpen
      ? `
      <div id="startMenu" class="start-menu window" style="left: 10px; bottom: 44px; width: 340px; height: 360px; z-index: 80;">
        <div class="title-bar">
          <div class="title-bar-text">BREINDOOD / Start</div>
        </div>
        <div class="window-body start-menu-body">
          ${startAppFlow}
          <div class="start-group">Design Variant</div>
          ${Object.keys(VARIANTS).map(
            (variantId) => `
            <button class="start-item ${state.designVariant === variantId ? "active-variant" : ""}" data-set-variant="${variantId}">
              ${VARIANTS[variantId].label}
            </button>
          `
          ).join("")}
        </div>
      </div>
    `
      : "";
  }

  const windowsLayer = byId("windows");
  if (windowsLayer) {
    windowsLayer.innerHTML = state.windows
      .filter((windowItem) => !windowItem.minimized)
      .map(
        (windowItem) => `
          <div class="window ${windowItem.className} ${windowItem.maximized ? "window-maximized" : ""}" data-id="${windowItem.id}" style="left:${
            windowItem.x
          }px; top:${windowItem.y}px; width:${windowItem.w}px; height:${windowItem.h}px; z-index:${windowItem.z};">
            <div class="title-bar">
              <div class="title-bar-text">${windowItem.title}</div>
              <div class="title-bar-controls">
                <button aria-label="Minimize" data-minimize="${windowItem.id}" class="window-control"></button>
                <button aria-label="${windowItem.maximized ? "Restore" : "Maximize"}" data-maximize="${windowItem.id}" class="window-control"></button>
                <button aria-label="Close" data-close="${windowItem.id}" class="window-control"></button>
              </div>
            </div>
            <div class="window-body">${windowItem.body}</div>
            ${windowItem.maximized ? "" : `<div class="window-resizer" data-resize="${windowItem.id}"></div>`}
          </div>
        `
      )
      .join("");
  }

  const clock = byId("clock");
  const variantBadge = document.querySelector(".variant-badge");
  if (variantBadge) variantBadge.textContent = VARIANTS[state.designVariant].label;
  if (clock && !clockTimer) {
    clockTimer = window.setInterval(() => {
      const target = byId("clock");
      if (target) target.textContent = nowTime();
    }, 1000);
  }
  if (clock) clock.textContent = nowTime();

  const startButton = byId("startBtn");
  if (startButton) {
    startButton.onclick = (event) => {
      event.stopPropagation();
      state.startMenuOpen = !state.startMenuOpen;
      if (state.startMenuOpen) state.startMenuPath = "root";
      renderDesktop();
    };
  }

  document.querySelectorAll("[data-track]").forEach((button) => {
    button.addEventListener("click", () => {
      const trackId = button.getAttribute("data-track");
      state.desktopStep = "select";
      openTrackWorkspace(trackId);
    });
  });

  document.querySelectorAll("[data-open-folder-track]").forEach((button) => {
    button.addEventListener("click", () => {
      const trackId = button.getAttribute("data-open-folder-track");
      const target = findWindowById(`folder-${trackId}`);
      if (target) {
        focusWindow(target.id);
        return;
      }
      openTrackFolderWindow(trackId);
    });
  });

  document.querySelectorAll("[data-start-track]").forEach((button) => {
    button.addEventListener("click", () => {
      const trackId = button.getAttribute("data-start-track");
      state.startMenuOpen = false;
      state.desktopStep = "select";
      renderDesktop();
      openTrackWorkspace(trackId);
    });
  });

  document.querySelectorAll("[data-enter-library]").forEach((button) => {
    button.addEventListener("click", () => {
      state.desktopStep = "select";
      renderDesktop();
    });
  });

  document.querySelectorAll("[data-toggle-all-tracks]").forEach((button) => {
    button.addEventListener("click", () => {
      state.showAllTracks = !state.showAllTracks;
      renderDesktop();
    });
  });

  document.querySelectorAll("[data-set-variant]").forEach((button) => {
    button.addEventListener("click", () => {
      const variantId = button.getAttribute("data-set-variant");
      setDesignVariant(variantId);
    });
  });

  document.querySelectorAll("[data-open-app-folder]").forEach((button) => {
    button.addEventListener("click", () => {
      state.startMenuPath = "apps";
      renderDesktop();
    });
  });

  document.querySelectorAll("[data-open-app-folder-desktop]").forEach((button) => {
    button.addEventListener("click", () => {
      openApplicationsFolderWindow();
    });
  });

  document.querySelectorAll("[data-open-music-folder]").forEach((button) => {
    button.addEventListener("click", () => {
      openMusicFolderWindow();
    });
  });

  document.querySelectorAll("[data-open-about-desktop]").forEach((button) => {
    button.addEventListener("click", () => {
      openDesktopAboutWindow();
    });
  });

  document.querySelectorAll("[data-run-track-exe]").forEach((button) => {
    button.addEventListener("click", () => {
      const trackId = button.getAttribute("data-run-track-exe");
      openTrackWorkspace(trackId);
    });
  });

  document.querySelectorAll("[data-back-root]").forEach((button) => {
    button.addEventListener("click", () => {
      state.startMenuPath = "root";
      renderDesktop();
    });
  });

  document.querySelectorAll("[data-sample-detail-track]").forEach((button) => {
    button.addEventListener("click", () => {
      const trackId = button.getAttribute("data-sample-detail-track");
      const sampleIndex = button.getAttribute("data-sample-detail-index");
      openSampleDetailWindow(trackId, sampleIndex);
    });
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => closeWindow(button.getAttribute("data-close")));
  });

  document.querySelectorAll("[data-task]").forEach((button) => {
    button.addEventListener("click", () => toggleTaskWindow(button.getAttribute("data-task")));
  });

  document.querySelectorAll("[data-minimize]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      minimizeWindow(button.getAttribute("data-minimize"));
    });
  });

  document.querySelectorAll("[data-maximize]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMaximizeWindow(button.getAttribute("data-maximize"));
    });
  });

  document.querySelectorAll("[data-play]").forEach((button) => {
    button.addEventListener("click", () => playTrack(button.getAttribute("data-play")));
  });

  document.querySelectorAll("[data-stop]").forEach((button) => {
    button.addEventListener("click", () => stopTrack(button.getAttribute("data-stop")));
  });

  document.querySelectorAll("[data-reset]").forEach((button) => {
    const playerId = button.getAttribute("data-reset");
    const trackId = playerId.replace("player-", "");
    const track = trackMap.get(trackId);
    if (!track) return;
    button.addEventListener("click", () => resetTrack(playerId, track.strudel_code));
  });

  document.querySelectorAll("[data-identity-error]").forEach((button) => {
    button.addEventListener("click", () => showSystemError());
  });

  document.querySelectorAll("#windows .window[data-id]").forEach((windowEl) => {
    windowEl.addEventListener("mousedown", () => {
      const id = windowEl.getAttribute("data-id");
      const windowState = findWindowById(id);
      if (!windowState) return;
      focusWindow(id, false);
      windowEl.style.zIndex = String(windowState.z);
    });
  });

  attachDragHandlers();
  attachResizeHandlers();

  Array.from(playerHydraRegistry.keys()).forEach((windowId) => {
    if (!document.querySelector(`[data-player-hydra="${windowId}"]`)) {
      destroyPlayerHydra(windowId);
    }
  });

  state.windows.forEach((windowItem) => {
    if (windowItem.kind !== "player") return;
    const track = trackMap.get(windowItem.trackId);
    if (!track) return;
    mountRepl(windowItem.id, track.strudel_code);
    mountPlayerHydra(windowItem.id, track.id);
  });

  if (!desktopHandlersAttached) {
    document.addEventListener("mousedown", (event) => {
      const startMenu = byId("startMenu");
      const startBtn = byId("startBtn");
      if (!startMenu || !state.startMenuOpen) return;
      const insideMenu = startMenu.contains(event.target);
      const onButton = startBtn && startBtn.contains(event.target);
      if (!insideMenu && !onButton) {
        state.startMenuOpen = false;
        renderDesktop();
      }
    });
    desktopHandlersAttached = true;
  }

  if (!windowManagerHandlersAttached) {
    window.addEventListener("resize", () => {
      const bounds = getDesktopBounds();
      state.windows.forEach((windowItem) => {
        if (windowItem.maximized) {
          windowItem.x = WINDOW_EDGE;
          windowItem.y = WINDOW_EDGE;
          windowItem.w = bounds.width - WINDOW_EDGE * 2;
          windowItem.h = bounds.height - WINDOW_EDGE * 2;
          persistWorkspaceWindow(windowItem);
          return;
        }
        windowItem.w = clamp(windowItem.w, windowItem.minW || 260, bounds.width - WINDOW_EDGE * 2);
        windowItem.h = clamp(windowItem.h, windowItem.minH || 180, bounds.height - WINDOW_EDGE * 2);
        windowItem.x = clamp(windowItem.x, WINDOW_EDGE, Math.max(WINDOW_EDGE, bounds.width - windowItem.w - WINDOW_EDGE));
        windowItem.y = clamp(windowItem.y, WINDOW_EDGE, Math.max(WINDOW_EDGE, bounds.height - windowItem.h - WINDOW_EDGE));
        persistWorkspaceWindow(windowItem);
      });
      if (state.view === "desktop") renderDesktop();
    });
    windowManagerHandlersAttached = true;
  }

}

function renderApp() {
  if (state.view === "boot") {
    renderBoot();
    return;
  }
  renderDesktop();
}

renderApp();
