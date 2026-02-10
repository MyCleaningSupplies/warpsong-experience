// Default patches for WarpSong experience
// These provide additional samples and helper functions

// Note: Do not auto-load remote samples here.
// Tracks should declare their own samples to avoid unexpected network failures.

// Helper functions for commonly used patterns
let amen = s("drumsamples").n(0).fit()
let amen2 = s("drumsamples").n(0).fit()

// Common drum patterns
let fourOnFloor = s("bd").every(4, x => x)
let kickSnare = stack(
  s("bd").every(4, x => x),
  s("sd").every(8, x => x).off(1/2)
)

// Effects helpers
let space = room(0.5).delay(0.2)
let verb = room(0.8)

// Remote sample loading helper
function loadRemoteSamples(urls, name = 'remote') {
  if (typeof urls === 'string') {
    urls = [urls];
  }
  
  // Create a virtual sample bank from remote URLs
  const remoteBank = urls.map((url, index) => ({
    url: url,
    name: name + "_" + index
  }));
  
  return remoteBank;
}

// Strudel patch helper for creating reusable patterns
function createPattern(name, patternFunc) {
  // Store the pattern function for later use
  if (typeof window !== 'undefined') {
    window.strudelPatterns = window.strudelPatterns || {};
    window.strudelPatterns[name] = patternFunc;
  }
  
  return patternFunc;
}

// Predefined patch patterns
const patches = {
  // Basic beat patterns
  basicBeat: () => stack(s("bd").every(4), s("sd").every(8).off(1/2)),
  
  // Funk patterns
  funkBeat: () => stack(
    s("bd").every(4),
    s("sd").off(1/8).every(8),
    s("hh").fast(2).mask("<1!3 1!3>")
  ),
  
  // Ambient pads
  ambientPad: (notes = "c2 g2 e3") => s("sine").note(notes).decay(8).room(0.8),
  
  // Arpeggiators
  arp: (scale = "minor", speed = 8) => s("sawtooth").note(scale + " arp").fast(speed).decay(0.3),
  
  // Glitch effects
  glitch: () => s("drum").slice(8).speed("<1 2 4 8>").gain(0.3).degradeBy(0.3),
  
  // Bass lines
  bassline: (pattern = "c2 e2 g2") => s("sawtooth").note(pattern).lpf(800).decay(0.2).gain(0.6)
};

// Export patches for use in tracks
if (typeof window !== 'undefined') {
  window.strudelPatches = patches;
}
