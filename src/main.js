import "./style.css";
import "@strudel/repl"; // Import local Strudel REPL component
import defaultPatches from "./patches.js?raw";

// -----------------------------------------------------------------------------
// DEFAULT DATA
// -----------------------------------------------------------------------------
const defaultTracks = [
  {
    id: "t1",
    title: "BRINKSTRAAT",
    subtitle: "een innerlijke strijd tussen identiteiten",
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
    title: "BLANKENBERGE",
    subtitle: "lopen door de straten van Blankenberge, hopen dat jouw vrienden naar buitenkomen omdat je niet wordt binnengelaten",
    code: `
/// 777X - BLANKENBERGE
/// TRACK 3 

await initHydra({ detectAudio: true })
a.setSmooth(0.8) 

// 2. THE VISUALS: "The Pulsing Barrier"
osc(40, 0.1, 1)
  .color(0.9, 0, 0.5) 
  .mult(osc(10, 0.1).kaleid(6)) 
  .mask(shape(4, 0.3, 0.1).scrollX(0.2)) 
  .add(
    noise(3, 0.2)
      .color(0, 0.5, 0.8) // Cold blue street-light
      // Reacts to kick: gets "grittier" when the bass hits
      .pixelate(() => 20 + a.fft[0] * 60, () => 20 + a.fft[0] * 60)
  )
  .modulateScrollY(noise(2), 0.1)
  // Reacts to kick: The whole view "thuds" or zooms slightly
  .scale(() => 1 + a.fft[0] * 0.3) 
  .brightness(-0.1)
  .contrast(1.3)
  .out();

// 3. THE MUSIC
setCps(90/60/4)
samples('github:tidalcycles/uzu-drumkit')
samples('github:switchangel/breaks')

let kick = s("bd:1")
  .beat("0,4,8,12", 16)
  .bank("RolandTR909")
  .gain(0.4)
  .duck(2)
  .duckattack(0.2)

let loop_base = s("drumsamples")
  .begin(0.048)
  .hpf(400)
  .speed(90/93)
  .loopAt(4)
  .attack(0.02)
  .release(0.05)
  .sometimes(x=>x.ply(2))
  .sometimesBy(.4, x=>x.delay(".5"))
  .phaser(0.5)
  .orbit(2)
  .postgain(0.8)

let amen_stamp = s("breaks/2")
  .n(3)
  .fit()
  .scrub("0 0.0625 0.125 0.125")
  .sometimesBy(.4, x=>x.delay(".5"))
  .gain(0.1)
  .room(0.4)           
  .decay(0.15)

let live_a = s("breaks/2").n(0)
  .scrub(irand(2).div(16).seg(8))
  .sometimes(x=>x.ply(1))
  .rarely(x=>x.speed("1 | -1"))
  .sometimesBy(.4, x=>x.delay(".5"))
  .degradeBy(0.1)
  .rib(1, 4)
  .lpf(800)
  .decay(0.5)
  .room(0.5)
  .postgain(0.4)

let live_b = s("breaks/2").n(3).fit()
  .scrub(irand(5).div(16).seg(8))
  .rib(5, 1)
  .sustain(0.3)
  .decay(0.5)
  .room(0.5)
  .gain(0.3)
  .phaser(0.5)

let live_c = s("breaks/2").n(3).fit()
  .scrub(irand(5).div(16).seg(4))
  .rib(10, 2)
  .degradeBy(0.1)
  .almostNever(ply("2 | 4"))
  .sustain(0.3)
  .decay(0.5)
  .room(0.5)
  .phaser(0.5)
  .postgain(0.3)

let bourdain_intro = s("voices").n(0) 
  .gain(0.9)
  .speed(1)
  .delay(0.3)
  .room(0.5)
  .lpf(400)
  .sustain(0.4)
  .mask("1 0!7".slow(8))

let club_ambience = s("ambience-sample").n(0)
  .gain(0.9)
  .speed(1)
  .delay(0.5)
  .room(0.5)
  .sustain(0.4)
  .lpf(200)
  .cut(1)
  .mask("1 0!7".slow(8))

let door = s("sfx").n(0)
  .room(0.4)
  .delay(0.3)
  .sustain(0.4)
  .cut(1)
  .mask("1 0!7".slow(8))

let stem = s("stems/4").n(13).fit().transpose(-14)
  .scrub(irand(4).div(4).seg(4))
  .rib("<11>", 1)
  .slow(4)
  .delay(0.12)         
  .sustain(0.5)
  .lpf(1200)       
  .phaser(1)
  .phaserdepth(.5)
  .room(0.05)         
  .orbit(2)
  .postgain(0.85)

$: arrange(
  [7, club_ambience],
  [2, door],
  [8, stack(kick, live_a, loop_base)],
  [8, stack(kick, loop_base, live_a)],
  [8, stack(kick, loop_base, live_a, live_b)],
  [16, stack(stem, kick, loop_base, live_a, live_b, live_c)],
  [2, stack(kick, loop_base.gain(0), kick.gain(0), live_a.gain(0), live_b.gain(0), live_c.gain(0))],
  [8, stack(stem, amen_stamp, loop_base)],
  [16, stack(stem, kick.gain(0.12), live_b.gain(0.25), live_c.gain(0.25))],
  [8, stack(stem.gain(0.7), amen_stamp.gain(0.08))],
  [16, stack(stem, kick.gain(0.12), live_a.gain(0.25), live_c.gain(0.25))],
  [8, stack(stem.gain(0.7), amen_stamp.gain(0.08))],
  [8, stack(kick.gain(0), loop_base.gain(0), stem.gain(0))]
).punchcard()
`.trim()
  },
  {
    id: "t3",
    title: "BREDA",
    subtitle: "acceptatie en mn plek gevonden.",
    code: `
setCps(170/60/4)
samples('github:switchangel/breaks')

// Replace with your real Track 3
s("breaks/2").fit().scrub(irand(16).div(16).seg(8)).gain(0.7)
`.trim(),
    samples: []
  }
];

// -----------------------------------------------------------------------------
// STATE & STORAGE
// -----------------------------------------------------------------------------
const STORAGE_KEY = "warpsong_data_v1";

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure we have defaults if something is missing
      const tracks = (parsed.tracks || defaultTracks).map(t => ({
        ...t,
        samples: t.samples || [] // Backfill samples if missing
      }));
      
      return {
        view: "splash", // Always start at splash on reload
        currentTrackId: parsed.currentTrackId || defaultTracks[0].id,
        tracks: tracks,
        patches: parsed.patches || defaultPatches,
        // Reset editor state
        editorTrackId: parsed.editorTrackId || defaultTracks[0].id
      };
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
  }
  return {
    view: "splash",
    currentTrackId: defaultTracks[0].id,
    tracks: JSON.parse(JSON.stringify(defaultTracks)), // Deep copy
    patches: defaultPatches,
    editorTrackId: defaultTracks[0].id
  };
}

function saveState() {
  const toSave = {
    currentTrackId: state.currentTrackId,
    tracks: state.tracks,
    patches: state.patches,
    editorTrackId: state.editorTrackId
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

const state = loadState();
const app = document.querySelector("#app");
let replEl = null; // Keep track of the REPL element
let isPlaying = false; // Track playback state for transparency

// -----------------------------------------------------------------------------
// REPL HELPERS
// -----------------------------------------------------------------------------
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

    const p = iframe.parentElement;
    if (p) {
      p.style.width = "100%";
      p.style.height = "100%";
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

function setReplTransparency(transparent) {
  const replContainer = document.querySelector("#replMount > div:not(strudel-editor)");
  if (!replContainer) return;
  
  if (transparent) {
    replContainer.classList.add("playing");
    
    // Wait a moment for DOM to update, then force transparency on everything
    setTimeout(() => {
      // Target all possible elements that might have background
      const allElements = replContainer.querySelectorAll('*');
      allElements.forEach(el => {
        el.style.backgroundColor = 'transparent';
        el.style.background = 'transparent';
        el.style.backgroundImage = 'none';
      });
      
      // Specific targeting for known CodeMirror elements
      const cmEditor = replContainer.querySelector(".cm-editor");
      if (cmEditor) {
        cmEditor.style.backgroundColor = "transparent";
        cmEditor.style.background = "transparent";
        
        const scroller = cmEditor.querySelector(".cm-scroller");
        if (scroller) {
          scroller.style.backgroundColor = "transparent";
          scroller.style.background = "transparent";
        }
        
        const content = cmEditor.querySelector(".cm-content");
        if (content) {
          content.style.backgroundColor = "transparent";
          content.style.background = "transparent";
        }
        
        const lines = cmEditor.querySelectorAll(".cm-line");
        lines.forEach(line => {
          line.style.backgroundColor = "transparent";
          line.style.background = "transparent";
        });
        
        // Make gutter very subtle
        const gutter = cmEditor.querySelector(".cm-gutter");
        if (gutter) {
          gutter.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
          gutter.style.background = "rgba(0, 0, 0, 0.05)";
        }
      }
      
      // Also try to target iframe if it exists
      const iframe = replContainer.querySelector("iframe");
      if (iframe && iframe.contentDocument) {
        try {
          const iframeElements = iframe.contentDocument.querySelectorAll('*');
          iframeElements.forEach(el => {
            el.style.backgroundColor = 'transparent';
            el.style.background = 'transparent';
            el.style.backgroundImage = 'none';
          });
        } catch (e) {
          // Cross-origin iframe access might be blocked
          console.log('Cannot access iframe content due to same-origin policy');
        }
      }
    }, 100);
    
  } else {
    replContainer.classList.remove("playing");
  }
}

function createReplWithCode(code) {
  const repl = document.createElement("strudel-editor");
  repl.setAttribute("code", code);
  return repl;
}

// -----------------------------------------------------------------------------
// RENDERERS
// -----------------------------------------------------------------------------

function renderSplash() {
  app.innerHTML = `
    <div class="splash">
      <div class="splash-card">
        <h1>Welkom bij BREINDOOD.</h1>
        <p class="splash-sub">
          Kies een track, druk op Afspelen, en ervaar muziek met responsieve visuals.
        </p>
        <div class="splash-how">
          <div class="how-item">• Links: kies een track</div>
          <div class="how-item">• Boven: Afspelen/Stoppen om te starten en pauzeren</div>
          <div class="how-item">• Samples: auto‑slideshow met context en betekenis</div>
          <div class="how-item">• Herstellen: Reset de track code als afspelen faalt</div>
        </div>
        <div class="splash-actions">
          <button id="enterBtn" class="enterBtn">Ontdek</button>
        </div>
      </div>
    </div>
  `;

  document.querySelector("#enterBtn").addEventListener("click", () => {
    state.view = "player";
    renderApp();
  });
}

function renderPlayer() {
  const track = state.tracks.find(t => t.id === state.currentTrackId) || state.tracks[0];
  
  // Add loading overlay for track switching
  const loadingOverlay = document.createElement("div");
  loadingOverlay.className = "track-loading-overlay";
  loadingOverlay.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">Laden van “${track.title}”</div>
    <div class="loading-subtitle">${track.subtitle}</div>
  `;

  app.innerHTML = `
    <div class="wrap">
      <aside class="sidebar">
        <h1>BREINDOOD</h1>
        <p class="hint">
          Klik tussen de verschillende tracks om een track te laden.
        </p>

        <div id="trackList" class="trackList"></div>

        ${track.samples && track.samples.length > 0 ? `
        <div class="sample-slideshow">
          <div class="slideshow-image">
            <img id="slideImage" alt="Sample‑afbeelding">
          </div>
          <div class="slideshow-info">
            <div id="slideName" class="sample-display-name"></div>
            <div id="slideDesc" class="sample-display-desc"></div>
            <div id="slideSig" class="sample-display-sig"></div>
          </div>
          <div class="slideshow-controls">
            <button id="slidePrev" class="control-btn">‹</button>
            <div id="slideIndicator" class="slide-indicator"></div>
            <button id="slideNext" class="control-btn">›</button>
          </div>
        </div>
        ` : ""}

        <div class="meta">
          <div class="label">Nu geladen</div>
          <div class="nowTitle">${track.title}</div>
          <div class="nowSubtitle">${track.subtitle}</div>
        </div>

        <button id="adminBtn" class="adminBtn">Editor openen</button>
      </aside>

      <main class="main">
        <div class="repl-controls">
           <button id="btnPlay" class="control-btn">▶ Afspelen / Bijwerken</button>
           <button id="btnStop" class="control-btn">■ Stoppen</button>
           <button id="btnRestore" class="control-btn restore-btn">↺ Track herstellen</button>
        </div>
        <div id="replMount"></div>
      </main>
    </div>
  `;

  // Render Track List
  const list = document.querySelector("#trackList");
  state.tracks.forEach(t => {
    const btn = document.createElement("button");
    btn.className = `trackBtn ${t.id === track.id ? "active" : ""}`;
    btn.innerHTML = `<div class="tTitle">${t.title}</div><div class="tSub">${t.subtitle}</div>`;
    btn.addEventListener("click", () => {
      // Visual feedback for track switching
      document.querySelectorAll(".trackBtn").forEach(b => b.classList.remove("switching"));
      btn.classList.add("switching");
      
      // Stop current playback before switching
      if (isPlaying && replEl && replEl.editor) {
        replEl.editor.stop();
        isPlaying = false;
        setReplTransparency(false);
        
        // Reset play button state
        const playBtn = document.querySelector("#btnPlay");
        if (playBtn) {
          playBtn.classList.remove("playing");
          playBtn.innerHTML = "▶ Afspelen / Bijwerken";
        }
      }
      
      state.currentTrackId = t.id;
      saveState();
      
      // Small delay for visual feedback
      setTimeout(() => {
        renderApp(); // Re-render to update UI and REPL
      }, 150);
  });
  list.appendChild(btn);
});

  // Sample slideshow logic
  if (track.samples && track.samples.length > 0) {
    let slideIndex = 0;
    const samples = track.samples;
    const imgEl = document.querySelector("#slideImage");
    const nameEl = document.querySelector("#slideName");
    const descEl = document.querySelector("#slideDesc");
    const sigEl = document.querySelector("#slideSig");
    const indEl = document.querySelector("#slideIndicator");
    const prevBtn = document.querySelector("#slidePrev");
    const nextBtn = document.querySelector("#slideNext");
    const container = document.querySelector(".sample-slideshow");
    const total = samples.length;

    const getSrc = (s) => s.imageUrl || s.imageData || "";
    const updateSlide = () => {
      const s = samples[slideIndex] || {};
      if (imgEl) {
        const src = getSrc(s);
        if (src) {
          imgEl.src = src;
          imgEl.style.display = "block";
        } else {
          imgEl.style.display = "none";
        }
      }
      if (nameEl) nameEl.textContent = s.name || "";
      if (descEl) descEl.textContent = s.description || "";
      if (sigEl) sigEl.textContent = s.significance ? `"${s.significance}"` : "";
      if (indEl) indEl.textContent = `${slideIndex + 1}/${total}`;
    };

    prevBtn?.addEventListener("click", () => {
      slideIndex = (slideIndex - 1 + total) % total;
      updateSlide();
    });
    nextBtn?.addEventListener("click", () => {
      slideIndex = (slideIndex + 1) % total;
      updateSlide();
    });
    let autoTimer = null;
    const startAuto = () => {
      stopAuto();
      autoTimer = setInterval(() => {
        slideIndex = (slideIndex + 1) % total;
        updateSlide();
      }, 6000);
    };
    const stopAuto = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };
    container?.addEventListener("mouseenter", stopAuto);
    container?.addEventListener("mouseleave", startAuto);
    updateSlide();
    startAuto();
  }
  // Mount REPL
  const replMount = document.querySelector("#replMount");
  
  // Start with REPL hidden
  replMount.classList.remove("visible");
  
  // Show loading overlay
  replMount.appendChild(loadingOverlay);
  
  // Initial REPL shows ONLY the track code; samples and patches are applied at play-time
  const visibleCode = `${track.code}`;
  
  if (replEl) replEl.remove();
  replEl = createReplWithCode(visibleCode);
  replMount.appendChild(replEl);
  forceReplIframeFullSize(replEl);
  
  // Wait for REPL to fully initialize, then show it
  setTimeout(() => {
    if (loadingOverlay.parentNode) {
      loadingOverlay.remove();
    }
    replMount.classList.add("visible");
    
    // Apply initial transparency state
    if (isPlaying) {
      setReplTransparency(true);
    }
  }, 1000); // Give REPL time to initialize

  // Admin Button
  document.querySelector("#adminBtn").addEventListener("click", () => {
    state.view = "editor";
    state.editorTrackId = state.currentTrackId; // Start editing current track
    renderApp();
  });

  // Playback Controls
  const btnPlay = document.querySelector("#btnPlay");
  const btnStop = document.querySelector("#btnStop");
  const btnRestore = document.querySelector("#btnRestore");
  let lastFaultMessage = "";
  
  const restoreCurrentTrack = () => {
    const original = (defaultTracks || []).find(dt => dt.id === track.id);
    if (!original) return;
    const idx = state.tracks.findIndex(t => t.id === track.id);
    if (idx !== -1) {
      state.tracks[idx].code = original.code;
      saveState();
      if (replEl && replEl.editor) {
        replEl.editor.setCode(original.code);
      }
      const originalText = btnRestore.textContent;
      btnRestore.textContent = "Restored";
      setTimeout(() => {
        btnRestore.textContent = originalText;
      }, 1000);
    }
  };
  
  const handleFaultDetected = () => {
    isPlaying = false;
    setReplTransparency(false);
    if (replEl && replEl.editor) {
      replEl.editor.stop();
    }
    btnPlay.classList.remove("playing");
    btnPlay.innerHTML = "▶ Afspelen / Bijwerken";
    showFaultPrompt();
  };
  
  const evaluateWithGuard = () => {
    let fault = false;
    const originalConsoleError = console.error;
    const errListener = (e) => { fault = true; lastFaultMessage = e?.message || ""; };
    const rejListener = (e) => { fault = true; lastFaultMessage = e?.reason?.message || e?.message || ""; };
    console.error = function(...args) {
      fault = true;
      if (args && args.length) {
        const msg = typeof args[0] === "string" ? args[0] : (args[0]?.message || "");
        if (msg) lastFaultMessage = msg;
      }
      originalConsoleError.apply(console, args);
    };
    window.addEventListener("error", errListener, { once: true });
    window.addEventListener("unhandledrejection", rejListener, { once: true });
    try {
      const originalCode = replEl.editor.code || "";
      const prelude = `samples('/samples.json?ts=${Date.now()}')\n\n${state.patches}\n\n`;
      replEl.editor.setCode(prelude + originalCode);
      replEl.editor.evaluate();
      setTimeout(() => {
        // Restore visible editor to only user track code
        replEl.editor.setCode(originalCode);
      }, 50);
    } catch (e) {
      fault = true;
      lastFaultMessage = e?.message || "";
    }
    setTimeout(() => {
      console.error = originalConsoleError;
      window.removeEventListener("error", errListener);
      window.removeEventListener("unhandledrejection", rejListener);
      if (fault) {
        handleFaultDetected();
      }
    }, 1200);
  };
  
  const showFaultPrompt = () => {
    if (document.querySelector("#faultModal")) return;
    const overlay = document.createElement("div");
    overlay.id = "faultModal";
    overlay.className = "fault-modal";
    overlay.innerHTML = `
      <div class="fault-dialog">
        <div class="fault-title">Afspelen mislukt</div>
        <div class="fault-message">Er is een fout in de code gevonden. De track kan niet worden afgespeeld.</div>
        ${lastFaultMessage ? `<div class="fault-details">${lastFaultMessage}</div>` : ""}
        <div class="fault-actions">
          <button id="faultRestore" class="control-btn btn-restore">↺ Herstellen</button>
          <button id="faultCancel" class="control-btn btn-cancel">Annuleren</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    const r = document.querySelector("#faultRestore");
    const c = document.querySelector("#faultCancel");
    r?.addEventListener("click", () => {
      restoreCurrentTrack();
      overlay.remove();
    });
    c?.addEventListener("click", () => {
      overlay.remove();
    });
  };
  
  // Set initial button state based on current playing status
  if (isPlaying) {
    btnPlay.classList.add("playing");
    btnPlay.innerHTML = "⏸ Speelt af";
  } else {
    btnPlay.classList.remove("playing");
    btnPlay.innerHTML = "▶ Afspelen / Bijwerken";
  }

btnPlay.addEventListener("click", () => {
    if (replEl && replEl.editor) {
      isPlaying = true;
      setReplTransparency(true);
      btnPlay.classList.add("playing");
      btnPlay.innerHTML = "⏸ Speelt af";
      evaluateWithGuard();
    }
  });

  btnStop.addEventListener("click", () => {
    if (replEl && replEl.editor) {
      btnStop.classList.add("stopping");
      isPlaying = false;
      setReplTransparency(false);
      replEl.editor.stop();
      btnPlay.classList.remove("playing");
      btnPlay.innerHTML = "▶ Afspelen / Bijwerken";
      setTimeout(() => {
        btnStop.classList.remove("stopping");
      }, 500);
    }
  });

  btnStop.addEventListener("click", () => {
    if (replEl && replEl.editor) {
      btnStop.classList.add("stopping");
      isPlaying = false;
      setReplTransparency(false);
      replEl.editor.stop();
      setTimeout(() => {
        btnStop.classList.remove("stopping");
      }, 500);
    }
  });

  btnRestore.addEventListener("click", () => {
    restoreCurrentTrack();
  });
}

function renderEditor() {
  // Determine what we are editing: a specific track or the global patches
  const isGlobal = state.editorTrackId === "global";
  const track = state.tracks.find(t => t.id === state.editorTrackId);
  
  const currentCode = isGlobal ? state.patches : (track ? track.code : "");
  const currentTitle = isGlobal ? "Globale patches" : (track ? track.title : "");
  const sidebarWidth = state.sidebarWidth || 300; // Persist width in state if possible, or just default

  app.innerHTML = `
    <div class="editor-layout">
      <aside class="editor-sidebar" style="width: ${sidebarWidth}px">
        <button id="backBtn" class="backBtn">← Terug naar speler</button>
        
        <div style="margin-top: 20px; font-weight: bold; color: #888;">BEWERKEN</div>
        
        <div class="input-group">
          <label>Bestand kiezen</label>
          <select id="fileSelect" style="padding: 8px; background: #222; color: #fff; border: 1px solid #333;">
            <option value="global" ${isGlobal ? "selected" : ""}>Globale patches (samples, helpers)</option>
            <optgroup label="Nummers">
              ${state.tracks.map(t => `<option value="${t.id}" ${t.id === state.editorTrackId ? "selected" : ""}>${t.title}</option>`).join("")}
            </optgroup>
          </select>
        </div>

        ${!isGlobal && track ? `
        <div class="input-group">
          <label>Titel</label>
          <input id="editTitle" type="text" value="${track.title}">
        </div>
        <div class="input-group">
          <label>Subtitel / Beschrijving</label>
          <textarea id="editSubtitle">${track.subtitle}</textarea>
        </div>

        <div class="input-group">
          <label>Sample‑verwijzingen van de track</label>
          <div class="sample-edit-list" id="sampleList">
            ${(track.samples || []).map((s, idx) => `
              <div class="sample-edit-item">
                <div class="sample-edit-header">
                  <span>Sample #${idx + 1}</span>
                  <button class="btn-small btn-remove-sample" data-idx="${idx}">✕</button>
                </div>
                <div class="sample-edit-grid">
                  <div class="input-group">
                    <input type="text" class="sample-name-input" data-idx="${idx}" placeholder="Naam" value="${s.name}">
                  </div>
                  <div class="input-group">
                    <input type="text" class="sample-desc-input" data-idx="${idx}" placeholder="Beschrijving" value="${s.description}">
                  </div>
                  <div class="input-group">
                    <input type="text" class="sample-sig-input" data-idx="${idx}" placeholder="Betekenis" value="${s.significance}">
                  </div>
                </div>
                <details>
                  <summary>Afbeelding</summary>
                  <div class="input-group" style="margin-top:8px;">
                    <input type="text" class="sample-image-url-input" data-idx="${idx}" placeholder="/samples/images/example.jpg" value="${s.imageUrl || ""}">
                  </div>
                  <div class="input-group">
                    <input type="file" class="sample-image-file-input" data-idx="${idx}" accept="image/*">
                  </div>
                  <div class="sample-image-preview">
                    ${s.imageUrl || s.imageData ? `<img src="${s.imageUrl || s.imageData}" alt="Sample‑afbeelding">` : `<div class="no-image">Geen afbeelding</div>`}
                  </div>
                </details>
              </div>
            `).join("")}
          </div>
          <button id="addSampleBtn" class="btn-add">+ Sample‑verwijzing toevoegen</button>
        </div>

        <div class="input-group" style="margin-top: 10px; border-top: 1px solid #333; padding-top: 10px;">
          <label>Automatisch audio‑sampleverwijzing toevoegen</label>
          <input type="file" id="sampleUpload" accept="audio/*">
          <div style="font-size: 10px; opacity: 0.7; margin-top: 6px;">
            Dit voegt een sampleverwijzing toe op basis van de bestandsnaam. Om het audio‑bestand in Strudel te gebruiken, plaats het onder <code>public/samples/</code> en verwerk het in <code>/samples.json</code>.
          </div>
        </div>
        ` : ""}
        
        <div style="margin-top: auto; opacity: 0.5; font-size: 12px;">
          Wijzigingen worden in de lokale opslag van je browser bewaard.
        </div>
      </aside>

      <div class="resizer" id="dragHandle"></div>

      <main class="editor-main">
        <div class="editor-header">
          <div style="font-weight: bold;">${currentTitle}</div>
          <button id="saveBtn" class="saveBtn">Opslaan & Bijwerken</button>
        </div>
        <div id="editorMount" style="height:100%"></div>
      </main>
    </div>
  `;

  const editorMount = document.querySelector("#editorMount");
  const editorRepl = createReplWithCode(currentCode);
  editorMount.appendChild(editorRepl);

  // --- Event Handlers ---

  // Resizable Sidebar
  const sidebar = document.querySelector(".editor-sidebar");
  const resizer = document.querySelector("#dragHandle");
  let isResizing = false;

  resizer.addEventListener("mousedown", (e) => {
    isResizing = true;
    resizer.classList.add("resizing");
    document.body.style.cursor = "col-resize";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const newWidth = e.clientX;
    if (newWidth > 200 && newWidth < window.innerWidth * 0.5) {
      sidebar.style.width = `${newWidth}px`;
      state.sidebarWidth = newWidth; // Save temporarily to state
    }
  });

  window.addEventListener("mouseup", () => {
    if (isResizing) {
      isResizing = false;
      resizer.classList.remove("resizing");
      document.body.style.cursor = "default";
    }
  });

  // Navigation
  document.querySelector("#backBtn").addEventListener("click", () => {
    state.view = "player";
    renderApp();
  });

  const fileSelect = document.querySelector("#fileSelect");
  fileSelect.addEventListener("change", (e) => {
    state.editorTrackId = e.target.value;
    renderApp();
  });

  // Save Functionality
  const saveBtn = document.querySelector("#saveBtn");
  saveBtn.addEventListener("click", () => {
    const newCode = editorRepl.editor.code;
    
    if (isGlobal) {
      state.patches = newCode;
    } else if (track) {
      track.code = newCode;
      track.title = document.querySelector("#editTitle").value;
      track.subtitle = document.querySelector("#editSubtitle").value;

      // Harvest Sample Data
      const names = document.querySelectorAll(".sample-name-input");
      const descs = document.querySelectorAll(".sample-desc-input");
      const sigs = document.querySelectorAll(".sample-sig-input");
      const imageUrls = document.querySelectorAll(".sample-image-url-input");
      
      const newSamples = [];
      names.forEach((el, i) => {
        newSamples.push({
          name: el.value,
          description: descs[i].value,
          significance: sigs[i].value,
          imageUrl: imageUrls[i]?.value || "",
          imageData: (track.samples && track.samples[i] && track.samples[i].imageData) || ""
        });
      });
      track.samples = newSamples;
    }
    
    saveState();
    
    // Visual feedback
    const originalText = saveBtn.textContent;
    saveBtn.textContent = "Opgeslagen!";
    saveBtn.style.background = "#fff";
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.background = "#2ecc71";
    }, 1000);
  });

  // Sample Management
  if (!isGlobal && track) {
    // Add Sample Manually
    document.querySelector("#addSampleBtn").addEventListener("click", () => {
      if (!track.samples) track.samples = [];
      track.samples.push({ name: "Nieuwe sample", description: "", significance: "", imageUrl: "", imageData: "" });
      // We need to re-render to show the new input fields. 
      // Instead of full re-render, we could just append, but full render is safer/easier here.
      // But we need to save current text inputs first? 
      // Actually, since we are in local state, let's just save current state of text inputs to `track` temporarily?
      // Or just save everything and re-render.
      // Let's trigger a save first implicitly or just re-render.
      // If user typed in other fields, we lose it.
      // Let's do a partial re-render of the list? No, simpler: Save State then Re-render.
      
      // Quick save of current inputs
      track.title = document.querySelector("#editTitle").value;
      track.subtitle = document.querySelector("#editSubtitle").value;
      // ... (harvest samples logic repeated) ...
      // To avoid duplication, let's just push empty and re-render. User loses unsaved text in other fields if not careful.
      // Better: Update state from DOM before re-rendering.
      const names = document.querySelectorAll(".sample-name-input");
      const descs = document.querySelectorAll(".sample-desc-input");
      const sigs = document.querySelectorAll(".sample-sig-input");
      const imageUrls = document.querySelectorAll(".sample-image-url-input");
      const currentSamples = [];
      names.forEach((el, i) => {
        currentSamples.push({
          name: el.value,
          description: descs[i].value,
          significance: sigs[i].value,
          imageUrl: imageUrls[i]?.value || "",
          imageData: (track.samples && track.samples[i] && track.samples[i].imageData) || ""
        });
      });
      track.samples = currentSamples;
      track.samples.push({ name: "Nieuwe sample", description: "", significance: "", imageUrl: "", imageData: "" });
      
      renderEditor(); // Re-render editor
    });

    // Remove Sample
    document.querySelectorAll(".btn-remove-sample").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.dataset.idx);
        // Save current state first
        const names = document.querySelectorAll(".sample-name-input");
        const descs = document.querySelectorAll(".sample-desc-input");
        const sigs = document.querySelectorAll(".sample-sig-input");
        const imageUrls = document.querySelectorAll(".sample-image-url-input");
        const currentSamples = [];
        names.forEach((el, i) => {
          currentSamples.push({
            name: el.value,
            description: descs[i].value,
            significance: sigs[i].value,
            imageUrl: imageUrls[i]?.value || "",
            imageData: (track.samples && track.samples[i] && track.samples[i].imageData) || ""
          });
        });
        track.samples = currentSamples;
        
        track.samples.splice(idx, 1);
        renderEditor();
      });
    });

    // Upload Simulation
    const uploadInput = document.querySelector("#sampleUpload");
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        // Auto-add a sample entry
        // Save current state first
        const names = document.querySelectorAll(".sample-name-input");
        const descs = document.querySelectorAll(".sample-desc-input");
        const sigs = document.querySelectorAll(".sample-sig-input");
        const imageUrls = document.querySelectorAll(".sample-image-url-input");
        const currentSamples = [];
        names.forEach((el, i) => {
          currentSamples.push({
            name: el.value,
            description: descs[i].value,
            significance: sigs[i].value,
            imageUrl: imageUrls[i]?.value || "",
            imageData: (track.samples && track.samples[i] && track.samples[i].imageData) || ""
          });
        });
        track.samples = currentSamples;

        track.samples.push({
          name: file.name.replace(/\.[^/.]+$/, ""),
          description: `Added from ${file.name}`,
          significance: "Mijn geüploade sample",
          imageUrl: "",
          imageData: ""
        });
        
        alert(`Item toegevoegd voor "${file.name}".\n\nLET OP: Plaats dit bestand handmatig in "public/samples/" zodat het permanent geladen kan worden.`);
        renderEditor();
      }
    });

    // Image upload handlers
    document.querySelectorAll(".sample-image-file-input").forEach(input => {
      input.addEventListener("change", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const dataUrl = ev.target.result;
          if (!track.samples) track.samples = [];
          if (!track.samples[idx]) track.samples[idx] = { name: "", description: "", significance: "" };
          track.samples[idx].imageData = dataUrl;
          // Update preview inline without full re-render
          const previews = document.querySelectorAll(".sample-image-preview");
          const preview = previews[idx];
          if (preview) {
            preview.innerHTML = `<img src="${dataUrl}" alt="Sample‑afbeelding">`;
          }
          saveState();
        };
        reader.readAsDataURL(file);
      });
    });
  }
}

function renderApp() {
  if (state.view === "splash") {
    renderSplash();
  } else if (state.view === "player") {
    renderPlayer();
  } else if (state.view === "editor") {
    renderEditor();
  }
}

// -----------------------------------------------------------------------------
// INIT
// -----------------------------------------------------------------------------
renderApp();

// Debug helper
window.__debugRepl = () => {
  const r = document.querySelector("strudel-editor");
  return {
    hasRepl: !!r,
    shadowRoot: r?.shadowRoot
  };
};
