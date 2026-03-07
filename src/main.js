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
///BREINDOOD
///TRACK 1 = BRINKSTRAAT

setGainCurve(x => Math.pow(x, 2))
samples('github:switchangel/breaks')
samples('github:switchangel/pad')
samples('github:tidalcycles/uzu-drumkit')
samples('github:MyCleaningSupplies/breindoodsamples')

setCps(175/60/4)

// --- DRUMS ---
let kick = s("bd:1")
  .beat("0,4,8,12", 16)
  .bank("RolandTR909")
  .room(0.3)
  .duck(2)
  .duckattack(0.1)
  .gain(0.4)

let snare = s("sd:2, cp:1")
  .beat("4,12", 16)
  .bank("RolandTR909")
  .gain(0.7)

let oh = s("oh:16")
  .beat("2,6,10,14", 16)
  .bank("RolandTR909")
  .gain(0.6)

let hh = s("hh:16")
  .beat("3,7,11,15", 16)
  .cut(1)
  .gain(0.6)

let drums_kick = kick
let drums_groove = stack(kick, snare)
let drums_full = stack(kick, snare, oh, hh)
let drums_ghost = stack(kick.gain(0.35), snare.gain(0.3))

// --- BREAKS ---
let breaks_base = s("breaks/2").fit()
  .scrub(irand(16).div(16).seg(8))
  .orbit(2)
  .phaser(0.7)
  .room(1)

let breaks_intro = s("breaks/2").fit()
  .scrub("0 1".div(2)) 
  .phaser(0.7)
  .room(1)
  .gain(0.6)

let breaks_pattern_n = (n_val) => s("breaks/2").n(n_val).fit()
  .scrub("0 1 2 3 4 4 6 7".div(8))
  .almostNever(ply("2 | 4"))
  .orbit(2)
  .room(1)
  .gain(0.6)

let breaks_pattern_main = breaks_pattern_n(0) 
let breaks_pattern_alt1 = breaks_pattern_n(6) 
let breaks_pattern_alt2 = breaks_pattern_n(5) 

let jungle_rustig = breaks_pattern_main
  .lpf(1500)
  .gain(0.4)

let jungle_rustig_alt = breaks_pattern_alt1
  .lpf(1500)
  .gain(0.4)

let jungle_agressief = breaks_pattern_main
  .rib("<30 50>", 2)
  .gain(0.7)

let jungle_agressief_alt = breaks_pattern_alt1
  .rib("<30 50>", 2)
  .gain(0.7)

let breaks_hard_n = (n_val) => breaks_base.n(n_val)
  .rib("<50 5>", 2)
  .almostNever(ply("2 | 4"))
  .gain(0.7)

let breaks_hard_main = breaks_hard_n(0) // Default hard break 1
let breaks_hard_alt1 = breaks_hard_n(1) // Alternatieve hard break 1
let breaks_hard_alt2 = breaks_hard_n(2) // Alternatieve hard break 2

let breaks_build_n = (n_val) => breaks_pattern_n(n_val)
  .rib("<5>", 4)
  .fast(2)
  .lpf(saw.range(800, 8000).slow(4))
  .gain(0.9)

let breaks_build_main = breaks_build_n(4)
let breaks_build_alt1 = breaks_build_n(5)

// Snare Roll
let snare_roll = s("sd:2")
  .bank("RolandTR909")
  .struct("x*16")
  .gain(tri.range(0.1, 0.9).slow(2))


// --- MELODIES --- 

let rifi_start = s("pre-loop/2").n(3)
  .scrub("0.15 0.25 0.3 0.5")
  .slow(1)
  .cut(2)
  .lpf(800)
  .sustain(0.5)
  .distort(0.8)
  .phaser(0.5)
  .room(0.5)
  .delay(0.5)
  .gain(0.7)
  //.almostNever(ply("2 | 4"))
//.cut(1)
  //.mask("1 0!7".slow(4))

let rifi_start_alt = s("loops/2").n(3)
  .scrub("0.15 0.25 0.3 0.5")  // small preview
  .lpf(400)
  .room(0.5)
  .delay(0.5)
  .gain(0.7)
  //.almostNever(ply("2 | 4"))
.cut(1)
  //.mask("1 0!7".slow(4))

let rifi_loop = s("pre-loop/8").n(4).fit()
  .scrub(irand(8).div(8).seg(8))   
  .rib("<45 50 50 55>", 8)        
  .distort(0.8)          
  .almostNever(ply("2 | 4"))
  .lpf(saw.range(800, 8000).slow(4))
  .delay(0.1)      
  .sustain(0.5)
  .room(0.5)
  .gain(0.6)
  .orbit(2)
  .mask("1 1 0 1")    

let rifi_loop_alt = s("loops/8").n(3).fit()
  .scrub(irand(8).div(8).seg(8))
  .rib("<10 25>", 2)
  .lpf(1100)
  .almostNever(ply("2 | 4"))
  //.distort(1.3)
  .sustain(0.5)
  .delay(0.15)
  .room(0.5)
  .gain(0.65)
  .orbit(2)
  .mask("1 0 1 1")


let misc_unchanged = s("loops").n(3).transpose(-14)
  .cut(1)
  .vib("4:.4")
  .gain(1)
  .speed(1)
  .delay(0.5)
  .phaser(2)
  .phaserdepth(.1)
  .distort(1.5)
  .room(0.5)
  .sustain(0.4)
  .lpf(400)
  .mask("1 0!15".slow(16))

let misc_unchanged_2 = s("pre-loop/8").n(0).transpose(-14)
  .cut(1)
  .vib("4:.4")
  .gain(1)
  .speed(1)
  .delay(0.5)
  .phaser(2)
  .phaserdepth(.1)
  .distort(1.5)
  .room(0.5)
  .sustain(0.4)
  .lpf(400)
  .mask("1 0!15".slow(16))


let bourdain_intro = s("voices").n(0) 
  .gain(0.9)
  .speed(1)
  .delay(0.3)
  .room(0.5)
  .hpf(400)
  .sustain(0.4)
  .mask("1 0!7".slow(8))
  .crush(4)
  .phaser(1)


let bourdain_intro_2 = s("voices").n(1) 
  .gain(0.9)
  .speed(1)
  .delay(0.3)
  .room(0.5)
  .hpf(400)
  .sustain(0.4)
  .mask("1 0!7".slow(8))
  .phaser(1)
  .crush(4)

all(x=>x.fft(4).scope({pos:0,smear:.95}))

// --- ARRANGEMENT ---
$: arrange(
  [8, stack(misc_unchanged_2, drums_kick.gain(0.3))],
  [8, stack(misc_unchanged_2, drums_kick.gain(0.3))],
  [8, stack(rifi_start.gain(0.3), drums_kick.gain(0.3), jungle_rustig.gain(0.3))],
  [8, stack(drums_groove, rifi_loop, jungle_rustig)],
  [8, stack(drums_groove, rifi_loop_alt, jungle_rustig)],
  [8, stack(drums_full, rifi_loop.phaser(0.5), breaks_hard_main)],
  [8, stack(drums_full, rifi_loop_alt.phaser(0.5), breaks_hard_main)],
  [8, stack(bourdain_intro, drums_kick, breaks_hard_alt2)],
  [8, stack(bourdain_intro_2, drums_kick, breaks_hard_alt2)],
  [8, stack(rifi_loop_alt.lpf(800), breaks_hard_alt2.gain(0.7))],
  [8, stack(rifi_loop.lpf(800), drums_groove, breaks_hard_alt2.gain(0.7))],
  [8, stack(rifi_loop_alt.lpf(800), drums_groove, breaks_hard_alt2.gain(0.7))],
  [16, stack(drums_full, rifi_loop.phaser(0.5), breaks_hard_alt2)],
  [16, stack(drums_full, rifi_loop_alt.phaser(0.5), breaks_hard_alt2)],
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
        sample_name: "tr909",
        origin_artist: "Roland TR-909",
        origin_title: "BD/SD/HH/OH kit",
        origin_label: "Classic Drum Machine Library",
        origin_year: "1983",
        license_or_usage_note: "Library usage in Strudel context",
        why_it_matters_personally: "Mechanische drums geven de sociale druk van Brinkstraat.",
        where_used_in_track: "Kick/snare/hats in alle groove-secties"
      },
      {
        sample_name: "breaks",
        origin_artist: "Switchangel",
        origin_title: "breaks/2 slice bank",
        origin_label: "github:switchangel/breaks",
        origin_year: "Unknown",
        license_or_usage_note: "Pack usage according to source terms",
        why_it_matters_personally: "Jungle-energie als spanning en onrust.",
        where_used_in_track: "Jungle layers en hard break passages"
      },
      {
        sample_name: "preloop",
        origin_artist: "BREINDOOD sample bank",
        origin_title: "pre-loop/2 + pre-loop/8",
        origin_label: "github:MyCleaningSupplies/breindoodsamples",
        origin_year: "2024",
        license_or_usage_note: "Eigen samplebank",
        why_it_matters_personally: "Melodische fragmenten uit mijn eigen materiaal.",
        where_used_in_track: "Rifi start/loop motieven en textures"
      },
      {
        sample_name: "loops",
        origin_artist: "BREINDOOD sample bank",
        origin_title: "loops + loops/8",
        origin_label: "github:MyCleaningSupplies/breindoodsamples",
        origin_year: "2024",
        license_or_usage_note: "Eigen samplebank",
        why_it_matters_personally: "Herhalende gedachte-lagen die blijven terugkomen.",
        where_used_in_track: "Misc bed en alternatieve rifi passages"
      },
      {
        sample_name: "voices",
        origin_artist: "BREINDOOD sample bank",
        origin_title: "voices (0/1)",
        origin_label: "github:MyCleaningSupplies/breindoodsamples",
        origin_year: "2024",
        license_or_usage_note: "Eigen samplebank",
        why_it_matters_personally: "Spoken fragments dragen de persoonlijke laag expliciet.",
        where_used_in_track: "Bourdain intro-secties"
      }
    ]
  },
  {
    id: "t2",
    folder: "02_Blankenberge",
    title: "BLANKENBERGE",
    location: "Blankenberge",
    theme: "Nachtleven, spanning, ruwe herinnering",
    mood: "Rauw, pulserend, chaotisch",
    duration_target: "04:10",
    status: "hero",
    validation_hypothesis: "Luisteraar voelt de overgang van club-ruis naar introspectie via samplelagen en breakstructuren.",
    strudel_code: `
///BREINDOOD
///TRACK 2 - BLANKENBERGE

await initHydra({ detectAudio: true })
a.setSmooth(0.8) 

osc(40, 0.1, 1)
  .color(0.9, 0, 0.5) 
  .mult(osc(10, 0.1).kaleid(6)) 
  .mask(shape(4, 0.3, 0.1).scrollX(0.2)) 
  .add(
    noise(3, 0.2)
      .color(0, 0.5, 0.8) 
      .pixelate(() => 20 + a.fft[0] * 70, () => 20 + a.fft[0] * 60)
  )
  .modulateScrollY(noise(2), 0.1)
  .scale(() => 1 + a.fft[0] * 0.4) 
  .brightness(-0.1)
  .contrast(1.3)
  .out();

setCps(90/60/4)
samples('github:tidalcycles/uzu-drumkit')
samples('github:switchangel/breaks')
samples('github:MyCleaningSupplies/breindoodsamples')

let kick = s("bd:1")
  .beat("0,4,8,12", 16)
  .bank("RolandTR909")
  .duck(2)
  .duckattack(0.2)
  .rarely(x=>x.speed("1 | -1"))
  .sometimesBy(.4, x=>x.delay(".5"))
  .lpf(400)
  .room(0.4)
  .degradeBy(0.1)
  .compress(.25, 1)
  .postgain(0.4)

let loop_base = s("drumsamples")
  .begin(0.048)
  .speed(90/93)
  .cut(2)
  .loopAt(4)
  .attack(0.02)
  .release(0.05)
  .sometimes(x=>x.ply(2))
  .phaser(0.5)
  .orbit(2)
  .postgain(0.8)

let loop_base2 = s("drumsamples")
  .begin(0.048)
  .speed(90/93)
  .cut(2)
  .loopAt(1)
  .attack(0.02)
  .release(0.3)
  .orbit(2)
  .room(0.4)
  .postgain(0.8)

let loop_base_unchanged = s("drumsamples")
  .begin(0.048)
  .lpf(800)
  .speed(90/93)
  .attack(0.02)
  .release(0.3)
  .cut(1)
  .fast(2)
  .distort(1.5)
  .every(4, x=>x.rev())
  .rarely(x=>x.speed("1 | -1"))
  .sometimesBy(.4, x=>x.delay(".5"))
  .sometimes(x=>x.ply(2))
  .room(0.4)
  .compress(.25, .75)
  ._scope()
  .postgain(0.8)

let loop_base_unchanged_alt = s("drumsamples")
  .begin(0.048)
  .lpf(800)
  .speed(90/93)
  .attack(0.02)
  .release(0.3)
  .cut(1)
  .fast(4)
  .distort(1.5)
  .every(4, x=>x.rev())
  .rarely(x=>x.speed("1 | -1"))
  .sometimesBy(.4, x=>x.delay(".5"))
  .sometimes(x=>x.ply(2))
  .room(0.4)
  .compress(.25, .75)
  ._scope()
  .postgain(0.8)

let amen_stamp = s("live_drums/2")
  .n(3)
  .fit()
  .scrub("0 0.0625 0.125 0.125")
  .sometimesBy(.4, x=>x.delay(".5"))
  .gain(0.1)
  .room(0.4)           
  .decay(0.15)

let live_a = s("live_drums/2").n(1)
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

let club_ambience = s("ambience-sample").n(0)
  .speed(1)
  .delay(0.5)
  .room(0.5)
  .lpf(200)
  .cut(1)
  .mask("1 0!7".slow(8))
  .postgain(0.5)

let beach_ambience = s("ambience-sample").n(1)
  .speed(1)
  .delay(0.5)
  .room(0.5)
  .lpf(200)
  .cut(1)
  .mask("1 0!7".slow(8))
  .postgain(0.5)

let door = s("sfx").n(0)
  .room(0.4)
  .delay(0.3)
  .sustain(0.4)
  .cut(1)
  .mask("1 0!7".slow(8))

let stem = s("stems/4").n(13).fit().transpose(-14)
  .scrub(irand(4).div(4).seg(4))
  .rib("<11>", 2)
  .slow(1)
  .delay(0.12)         
  .sustain(0.5)
  .release(0.2)
  .lpf(1200)       
  .phaser(1)
  .phaserdepth(.5)
  .room(0.05)         
  .orbit(2)
  ._scope()
  .postgain(0.85)

let stem2 = s("stems/4").n(13).fit().transpose(-14)
  .scrub(irand(3).div(8).seg(8))
  .rib("<11>", 2)
  .delay(0.12)         
  .sustain(0.5)
  .lpf(1200)       
  .room(0.05)         
  .orbit(2)
  ._scope()
  .postgain(0.85)

$: arrange(
  [4, loop_base2],
  [4, stack(club_ambience.lpf(200), loop_base2)],
  [4, loop_base_unchanged],
  [4, stack(loop_base_unchanged, loop_base)._scope()],
  [3, stack(stem, kick, loop_base_unchanged)],
  [1, stack(stem2, loop_base_unchanged_alt)],
  [3, stack(beach_ambience, stem, kick, loop_base_unchanged)],
  [1, loop_base_unchanged_alt],
  [8, stack(stem, kick, loop_base_unchanged)],
  [1, loop_base_unchanged_alt],
  [8, stack(beach_ambience, stem2, kick, loop_base, live_a, live_b, live_c)],
  [4, stack(live_b, live_c)],
  [3, stack(beach_ambience, stem, amen_stamp, loop_base_unchanged)],
  [1, loop_base_unchanged],
  [8, stack(stem, kick.gain(0.12), live_b.gain(0.25), live_c.gain(0.25))],
  [4, stack(stem.gain(0.7), amen_stamp.gain(0.08))],
  [8, stack(stem, kick.gain(0.12), live_a.gain(0.25), live_c.gain(0.25))],
  [4, stack(stem.gain(0.7), amen_stamp.gain(0.08))],
  [4, stack(kick.gain(0), loop_base.gain(0), stem.gain(0))]
).spiral({ steady: .96, activeColor: 1, fold: 1, labels: 1, vertical: 1, cycles: 2 })
`.trim(),
    liner_notes: {
      personal_context:
        "Blankenberge voelt als dubbel perspectief: uitgaan, afstand, en terugvallen in herinnering.",
      what_this_track_should_make_you_feel:
        "Een nacht die voortdurend kantelt tussen euforie en onrust.",
      design_intent_audio:
        "Breaks, stems en ambience schuiven tegen elkaar terwijl kick en loop de ruggengraat blijven.",
      design_intent_visual:
        "Hydra-beeld reageert op audio met korrel, maskers en schaalverschuiving."
    },
    sources: [
      {
        sample_name: "tr909",
        origin_artist: "Roland TR-909",
        origin_title: "BD/SD kit",
        origin_label: "uzu-drumkit",
        origin_year: "1983",
        license_or_usage_note: "Library use",
        why_it_matters_personally: "Mechanische puls tegenover onvoorspelbare lagen.",
        where_used_in_track: "kick/snare backbone"
      },
      {
        sample_name: "drumsamples",
        origin_artist: "BREINDOOD sample bank",
        origin_title: "drumsamples",
        origin_label: "local",
        origin_year: "2024",
        license_or_usage_note: "Eigen samplebank",
        why_it_matters_personally: "Basale groove-laag van de track.",
        where_used_in_track: "loop_base / loop_base2 / loop_base_unchanged"
      },
      {
        sample_name: "breaks",
        origin_artist: "Switchangel Breaks",
        origin_title: "breaks/2",
        origin_label: "github:switchangel/breaks",
        origin_year: "Unknown",
        license_or_usage_note: "Pack usage",
        why_it_matters_personally: "Ruwe energie en contrast.",
        where_used_in_track: "live_b / live_c"
      },
      {
        sample_name: "live_drums",
        origin_artist: "BREINDOOD sample bank",
        origin_title: "live_drums/2",
        origin_label: "local",
        origin_year: "2024",
        license_or_usage_note: "Eigen samplebank",
        why_it_matters_personally: "Live slices houden het menselijk en instabiel.",
        where_used_in_track: "amen_stamp / live_a"
      },
      {
        sample_name: "ambience-sample",
        origin_artist: "Field recordings",
        origin_title: "club+beach ambience",
        origin_label: "local",
        origin_year: "2024",
        license_or_usage_note: "Eigen opnames",
        why_it_matters_personally: "Plaatsgevoel en overgang tussen scènes.",
        where_used_in_track: "club_ambience / beach_ambience"
      },
      {
        sample_name: "sfx",
        origin_artist: "Field recordings",
        origin_title: "door",
        origin_label: "local",
        origin_year: "2024",
        license_or_usage_note: "Eigen opnames",
        why_it_matters_personally: "Marker van grens en toegang.",
        where_used_in_track: "door"
      },
      {
        sample_name: "stems",
        origin_artist: "BREINDOOD stems",
        origin_title: "stems/4",
        origin_label: "local",
        origin_year: "2024",
        license_or_usage_note: "Eigen stems",
        why_it_matters_personally: "Hoofdmelodische identiteit van de track.",
        where_used_in_track: "stem / stem2"
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
const DEMO_HYDRA_TRACK_ID = "";

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
const replUpdateRegistry = new Map();
const playerState = new Map();
const playerHydraRegistry = new Map();
const playbackRuntime = new Map();
const stopInProgress = new Set();
const playbackPrimed = new Set();

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
let preserveWindowDom = false;
let strudelErrorGuardAttached = false;
let strudelErrorBurstCount = 0;
let strudelErrorBurstStart = 0;

const byId = (id) => document.getElementById(id);
const nextZ = () => (state.z += 1);
const nowTime = () => new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
let consoleNoiseFilterInstalled = false;
let hydraInitGuardInstalled = false;

function installConsoleNoiseFilter() {
  if (consoleNoiseFilterInstalled) return;
  consoleNoiseFilterInstalled = true;
  const originalLog = console.log.bind(console);
  console.log = (...args) => {
    const message = String(args[0] || "").replace(/^%c/, "");
    if (message.includes("[tonal] transpose: not a note")) return;
    if (message.includes("[superdough] error: duck target orbit 2 does not exist")) return;
    originalLog(...args);
  };
}

function installHydraAudioCompatGuard() {
  if (hydraInitGuardInstalled) return;
  if (typeof globalThis.initHydra !== "function") return;
  const original = globalThis.initHydra;
  if (original?.__warpsongHydraGuarded) {
    hydraInitGuardInstalled = true;
    return;
  }

  const wrapped = async (options = {}) => {
    try {
      return await original(options);
    } catch (error) {
      const message = String(error?.message || error || "");
      const detectAudio = !!options?.detectAudio;
      if (detectAudio && /object can not be found here|domexception/i.test(message)) {
        return original({ ...options, detectAudio: false });
      }
      throw error;
    }
  };
  wrapped.__warpsongHydraGuarded = true;
  globalThis.initHydra = wrapped;
  hydraInitGuardInstalled = true;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function excerpt(text, max = 120) {
  const value = String(text || "").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}...`;
}

function parseCpsFromCode(code) {
  const match = String(code || "").match(/setCps\(([^)]+)\)/i);
  if (!match) return 0.5;
  const expr = match[1].trim();
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) return 0.5;
  try {
    const value = Function(`"use strict"; return (${expr});`)();
    return Number.isFinite(value) && value > 0 ? value : 0.5;
  } catch {
    return 0.5;
  }
}

function parseVizSpec(vizSpec, sources) {
  const sourceList = Array.isArray(sources) ? sources : [];
  const sourceCount = sourceList.length;
  if (!sourceCount) return [];
  const fallback = [0];
  if (!vizSpec) return fallback;
  const cleaned = vizSpec.trim();
  if (!cleaned) return fallback;

  // Allow compact numeric combos like "01" => [0,1]
  if (/^\d{2,}$/.test(cleaned)) {
    return [...new Set(cleaned.split("").map((char) => Number.parseInt(char, 10) % sourceCount))];
  }

  const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const sourceNameIndex = new Map(sourceList.map((source, idx) => [normalize(source.sample_name), idx]));
  const parts = cleaned
    .split(/[_+,\s|/]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const indexes = [];
  parts.forEach((part) => {
    const numeric = Number.parseInt(part, 10);
    if (Number.isFinite(numeric)) {
      indexes.push(((numeric % sourceCount) + sourceCount) % sourceCount);
      return;
    }
    const token = normalize(part);
    const exact = sourceNameIndex.get(token);
    if (typeof exact === "number") {
      indexes.push(exact);
      return;
    }
    // Partial fallback: viz token "preloop" should match sample_name containing "preloop", etc.
    for (const [sourceToken, idx] of sourceNameIndex.entries()) {
      if (sourceToken.includes(token) || token.includes(sourceToken)) {
        indexes.push(idx);
        break;
      }
    }
  });

  return indexes.length ? [...new Set(indexes)] : fallback;
}

function normalizeSampleToken(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function mapTokenToSourceIndexes(token, sources) {
  const sourceList = Array.isArray(sources) ? sources : [];
  if (!sourceList.length) return [];
  const normalized = normalizeSampleToken(token);
  if (!normalized) return [];

  const aliases = [normalized];
  if (/(^|[^a-z])(bd|sd|hh|oh|cp)([^a-z]|$)|rolandtr909|tr909/.test(normalized)) aliases.push("tr909");
  if (/break/.test(normalized)) aliases.push("breaks");
  if (/preloop|preloops|preloop8|preloop2/.test(normalized)) aliases.push("preloop");
  if (/loops?/.test(normalized)) aliases.push("loops");
  if (/voices?/.test(normalized)) aliases.push("voices");

  const hit = new Set();
  sourceList.forEach((source, index) => {
    const sampleToken = normalizeSampleToken(source.sample_name);
    if (!sampleToken) return;
    for (const alias of aliases) {
      if (!alias) continue;
      if (sampleToken === alias || sampleToken.includes(alias) || alias.includes(sampleToken)) {
        hit.add(index);
        break;
      }
    }
  });
  return [...hit];
}

function collectLiveSourceTokens(value, output) {
  if (value == null) return;
  if (Array.isArray(value)) {
    value.forEach((entry) => collectLiveSourceTokens(entry, output));
    return;
  }
  if (typeof value === "string") {
    value
      .split(/[,\s]+/)
      .map((token) => token.trim())
      .filter(Boolean)
      .forEach((token) => output.add(token));
    return;
  }
  if (typeof value === "number") {
    output.add(String(value));
    return;
  }
  if (typeof value === "object") {
    if ("value" in value) collectLiveSourceTokens(value.value, output);
    if ("name" in value) collectLiveSourceTokens(value.name, output);
  }
}

function inferLiveSourceIndexesFromHaps(haps, track) {
  const sourceList = Array.isArray(track?.sources) ? track.sources : [];
  if (!sourceList.length || !Array.isArray(haps) || !haps.length) return [];

  const tokens = new Set();
  haps.forEach((hap) => {
    const value = hap?.value;
    if (!value || typeof value !== "object") return;
    collectLiveSourceTokens(value.s, tokens);
    collectLiveSourceTokens(value.sound, tokens);
    collectLiveSourceTokens(value.bank, tokens);
  });

  const indexes = new Set();
  tokens.forEach((token) => {
    mapTokenToSourceIndexes(token, sourceList).forEach((idx) => indexes.add(idx));
  });
  return [...indexes];
}

function extractIdentifiers(expr) {
  const source = String(expr || "");
  const ids = source.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
  const reserved = new Set([
    "let",
    "const",
    "var",
    "await",
    "return",
    "stack",
    "arrange",
    "silence",
    "s",
    "n",
    "fit",
    "scrub",
    "orbit",
    "phaser",
    "room",
    "gain",
    "lpf",
    "hpf",
    "mask",
    "slow",
    "fast",
    "beat",
    "bank",
    "duck",
    "duckattack",
    "delay",
    "sustain",
    "distort",
    "vib",
    "phaserdepth",
    "crush",
    "transpose",
    "cut",
    "begin",
    "loopAt",
    "setCps",
    "setGainCurve",
    "samples",
    "all",
    "x",
    "scope",
    "fft",
    "createParams",
    "initHydra",
    "src",
    "osc",
    "noise",
    "kaleid",
    "diff",
    "modulateScale",
    "pixelate",
    "brightness",
    "contrast",
    "out",
    "irand",
    "ply",
    "saw",
    "tri",
    "Math",
    "pow",
    "chapter",
    "note",
    "pos",
    "smear",
    "punchcard"
  ]);
  return [...new Set(ids.filter((id) => !reserved.has(id)))];
}

function extractSampleTokensFromExpr(expr) {
  const source = String(expr || "");
  const tokens = [];

  source.replace(/s\(\s*["']([^"']+)["']\s*\)/g, (_, content) => {
    String(content)
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((part) => tokens.push(part));
    return _;
  });

  source.replace(/bank\(\s*["']([^"']+)["']\s*\)/g, (_, content) => {
    if (content) tokens.push(String(content).trim());
    return _;
  });

  return [...new Set(tokens)];
}

function parseLetDefinitions(code) {
  const source = String(code || "");
  const definitions = new Map();
  const regex = /let\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([\s\S]*?)(?=\nlet\s+[a-zA-Z_][a-zA-Z0-9_]*\s*=|\n\$:\s*arrange\(|$)/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const name = match[1];
    const expr = String(match[2] || "").trim();
    definitions.set(name, {
      name,
      expr,
      refs: extractIdentifiers(expr),
      tokens: extractSampleTokensFromExpr(expr)
    });
  }
  return definitions;
}

function resolveDefinitionSources(name, definitions, sources, memo = new Map(), visiting = new Set()) {
  if (memo.has(name)) return memo.get(name);
  if (visiting.has(name)) return [];
  visiting.add(name);

  const node = definitions.get(name);
  if (!node) {
    visiting.delete(name);
    memo.set(name, []);
    return [];
  }

  const hit = new Set();
  node.tokens.forEach((token) => {
    mapTokenToSourceIndexes(token, sources).forEach((idx) => hit.add(idx));
  });
  node.refs.forEach((ref) => {
    if (!definitions.has(ref)) return;
    resolveDefinitionSources(ref, definitions, sources, memo, visiting).forEach((idx) => hit.add(idx));
  });

  visiting.delete(name);
  const result = [...hit];
  memo.set(name, result);
  return result;
}

function inferSourceIndexesFromPattern(patternExpr, sources) {
  const sourceList = Array.isArray(sources) ? sources : [];
  if (!sourceList.length) return [];
  const text = String(patternExpr || "");
  const hit = new Set();
  extractSampleTokensFromExpr(text).forEach((token) => {
    mapTokenToSourceIndexes(token, sourceList).forEach((idx) => hit.add(idx));
  });
  return [...hit];
}

function parseArrangeSections(code) {
  const source = String(code || "");
  const arrangeStart = source.indexOf("arrange(");
  if (arrangeStart === -1) return [];

  let i = arrangeStart + "arrange(".length;
  let depth = 1;
  let block = "";
  let inSingle = false;
  let inDouble = false;

  while (i < source.length && depth > 0) {
    const ch = source[i];
    const prev = source[i - 1];

    if (!inDouble && ch === "'" && prev !== "\\") {
      inSingle = !inSingle;
    } else if (!inSingle && ch === '"' && prev !== "\\") {
      inDouble = !inDouble;
    } else if (!inSingle && !inDouble) {
      if (ch === "(") depth += 1;
      if (ch === ")") depth -= 1;
    }

    if (depth > 0) block += ch;
    i += 1;
  }

  if (!block.trim()) return [];
  const sections = [];
  const chunks = [];
  let chunk = "";
  let bracketDepth = 0;
  inSingle = false;
  inDouble = false;

  for (let cursor = 0; cursor < block.length; cursor += 1) {
    const ch = block[cursor];
    const prev = block[cursor - 1];

    if (!inDouble && ch === "'" && prev !== "\\") {
      inSingle = !inSingle;
    } else if (!inSingle && ch === '"' && prev !== "\\") {
      inDouble = !inDouble;
    } else if (!inSingle && !inDouble) {
      if (ch === "[") bracketDepth += 1;
      if (ch === "]") bracketDepth -= 1;
    }

    if (bracketDepth > 0 || (bracketDepth === 0 && ch === "]")) chunk += ch;
    if (bracketDepth === 0 && chunk.trim()) {
      chunks.push(chunk.trim());
      chunk = "";
    }
  }

  for (const rawChunk of chunks) {
    const match = rawChunk.match(/^\[\s*(\d+)\s*,([\s\S]*)\]$/);
    if (!match) continue;
    const cycles = Number.parseInt(match[1], 10);
    if (!Number.isFinite(cycles) || cycles <= 0) continue;
    const patternExpr = match[2] || "";
    const vizMatch = patternExpr.match(/\.viz\((["'])(.*?)\1\)/);
    sections.push({
      cycles,
      patternExpr,
      vizSpec: vizMatch ? vizMatch[2] : ""
    });
  }
  return sections;
}

function getPlaybackPlan(track) {
  if (!track || !track.strudel_code) return null;
  const parsedSections = parseArrangeSections(track.strudel_code);
  if (!parsedSections.length) return null;
  const definitions = parseLetDefinitions(track.strudel_code);
  const memo = new Map();
  const definitionNames = new Set(definitions.keys());

  const totalCycles = parsedSections.reduce((sum, section) => sum + section.cycles, 0);
  const sections = parsedSections.map((section, index) => {
    const symbolNames = extractIdentifiers(section.patternExpr).filter((name) => definitionNames.has(name));
    const resolvedFromSymbols = new Set();
    symbolNames.forEach((name) => {
      resolveDefinitionSources(name, definitions, track.sources || [], memo).forEach((idx) => resolvedFromSymbols.add(idx));
    });

    const directSources = inferSourceIndexesFromPattern(section.patternExpr, track.sources || []);
    directSources.forEach((idx) => resolvedFromSymbols.add(idx));
    const finalSources = section.vizSpec
      ? parseVizSpec(section.vizSpec, track.sources || [])
      : [...resolvedFromSymbols];

    return {
      idx: index,
      cycles: section.cycles,
      label: symbolNames.length ? symbolNames.slice(0, 3).join(" + ") : `Section ${index + 1}`,
      sourceIndexes: finalSources,
      symbolNames,
      vizSpec: section.vizSpec,
      energy: 0.3 + (index / Math.max(1, parsedSections.length - 1)) * 0.4
    };
  });

  return {
    cps: parseCpsFromCode(track.strudel_code),
    totalCycles,
    sections
  };
}

function clearPlaybackRuntime(windowId) {
  const runtime = playbackRuntime.get(windowId);
  if (!runtime) return;
  if (runtime.timer) window.clearInterval(runtime.timer);
  playbackRuntime.delete(windowId);
}

function highlightActiveSources(windowId, sourceIndexes = [], trackId = null) {
  const selectors = [`.window[data-id="${windowId}"]`];
  if (trackId) selectors.push(`.window[data-id="source-${trackId}"]`);
  selectors.forEach((selector) => {
    const root = document.querySelector(selector);
    if (!root) return;
    root.querySelectorAll("[data-sample-detail-index]").forEach((el) => {
      const idx = Number.parseInt(el.getAttribute("data-sample-detail-index") || "", 10);
      if (sourceIndexes.includes(idx)) {
        el.classList.add("is-playing-source");
      } else {
        el.classList.remove("is-playing-source");
      }
    });
  });
}

function setPlaybackSectionLabel(windowId, label) {
  const root = document.querySelector(`.window[data-id="${windowId}"]`);
  if (!root) return;
  const field = root.querySelector(`[data-play-section="${windowId}"]`);
  if (field) field.textContent = label || "Idle";
  const fieldLarge = root.querySelector(`[data-play-section-large="${windowId}"]`);
  if (fieldLarge) fieldLarge.textContent = label || "Idle";
}

function setPlaybackSourcesLabel(windowId, sourceIndexes = [], trackId = null) {
  const root = document.querySelector(`.window[data-id="${windowId}"]`);
  if (!root) return;
  const track = trackId ? trackMap.get(trackId) : null;
  const names = sourceIndexes
    .map((idx) => track?.sources?.[idx]?.sample_name)
    .filter(Boolean)
    .join(" + ");
  const field = root.querySelector(`[data-play-sources-large="${windowId}"]`);
  if (field) field.textContent = names || "—";
}

function setPlaybackTimelineLabel(windowId, timeline = null) {
  const root = document.querySelector(`.window[data-id="${windowId}"]`);
  if (!root) return;
  const nowField = root.querySelector(`[data-play-now-large="${windowId}"]`);
  const beatField = root.querySelector(`[data-play-beat="${windowId}"]`);
  if (!timeline) {
    if (nowField) nowField.textContent = "—";
    if (beatField) beatField.textContent = "—";
    return;
  }

  const section = timeline.sectionIndex + 1;
  const total = timeline.sectionTotal;
  const cycle = timeline.cycle;
  const beat = timeline.beat;
  if (nowField) nowField.textContent = `sec ${section}/${total} · cycle ${cycle}`;
  if (beatField) beatField.textContent = `${beat.toFixed(2)}`;
}

function applyPlaybackScene(windowId, trackId, scene) {
  setPlaybackSectionLabel(windowId, scene?.label || "Idle");
  setPlaybackSourcesLabel(windowId, scene?.sourceIndexes || [], trackId);
  setPlaybackTimelineLabel(windowId, scene?.timeline || null);
  highlightActiveSources(windowId, scene?.sourceIndexes || [], trackId);

  const playerWindow = document.querySelector(`.window[data-id="${windowId}"]`);
  if (playerWindow) {
    if (scene) {
      playerWindow.style.setProperty("--react-hue", String(scene.hue || 210));
      playerWindow.style.setProperty("--react-strength", String(scene.energy || 0.2));
      playerWindow.classList.add("window-reactive");
      playerWindow.setAttribute("data-react-scene", scene.label || "");
      playerWindow.setAttribute("data-react-sources", (scene.sourceIndexes || []).join(","));
      if (scene.vizSpec) playerWindow.setAttribute("data-react-viz", scene.vizSpec);
      else playerWindow.removeAttribute("data-react-viz");
    } else {
      playerWindow.style.removeProperty("--react-hue");
      playerWindow.style.removeProperty("--react-strength");
      playerWindow.classList.remove("window-reactive");
      playerWindow.removeAttribute("data-react-scene");
      playerWindow.removeAttribute("data-react-sources");
      playerWindow.removeAttribute("data-react-viz");
    }
  }

  const sourceWindow = trackId ? document.querySelector(`.window[data-id="source-${trackId}"]`) : null;
  if (sourceWindow) {
    if (scene) {
      sourceWindow.style.setProperty("--react-hue", String(scene.hue || 210));
      sourceWindow.style.setProperty("--react-strength", String(scene.energy || 0.2));
      sourceWindow.classList.add("window-reactive-source");
      if (scene.vizSpec) sourceWindow.setAttribute("data-react-viz", scene.vizSpec);
      else sourceWindow.removeAttribute("data-react-viz");
    } else {
      sourceWindow.style.removeProperty("--react-hue");
      sourceWindow.style.removeProperty("--react-strength");
      sourceWindow.classList.remove("window-reactive-source");
      sourceWindow.removeAttribute("data-react-viz");
    }
  }

  const desktopRoot = document.querySelector(".desktop");
  if (desktopRoot) {
    if (scene) {
      desktopRoot.style.setProperty("--desktop-react-hue", String(scene.hue || 210));
      desktopRoot.style.setProperty("--desktop-react-strength", String(scene.energy || 0.2));
      desktopRoot.classList.add("desktop-reactive");
    } else {
      desktopRoot.style.removeProperty("--desktop-react-hue");
      desktopRoot.style.removeProperty("--desktop-react-strength");
      desktopRoot.classList.remove("desktop-reactive");
    }
  }
}

function startPlaybackRuntime(windowId, track, editor = null) {
  clearPlaybackRuntime(windowId);
  const plan = getPlaybackPlan(track);
  if (!plan) return;

  const scheduler = editor?.repl?.scheduler;
  const schedulerNow = typeof scheduler?.now === "function" ? scheduler.now.bind(scheduler) : null;
  const startedAt = schedulerNow ? schedulerNow() : performance.now() / 1000;

  const runtime = {
    startedAt,
    timer: 0,
    sectionIndex: -1,
    phaseKey: "",
    trackId: track.id,
    currentScene: null,
    schedulerNow,
    schedulerUsesCycles: !!schedulerNow
  };

  const sectionBoundaries = [];
  let cumulative = 0;
  plan.sections.forEach((section) => {
    cumulative += section.cycles;
    sectionBoundaries.push(cumulative);
  });

  runtime.timer = window.setInterval(() => {
    const now = runtime.schedulerNow ? runtime.schedulerNow() : performance.now() / 1000;
    const elapsed = Math.max(0, now - runtime.startedAt);
    const currentCycle = runtime.schedulerUsesCycles ? elapsed : elapsed * plan.cps;
    let sectionIndex = sectionBoundaries.findIndex((edge) => currentCycle < edge);
    if (sectionIndex === -1) {
      stopTrack(windowId);
      return;
    }

    const activeSection = plan.sections[sectionIndex];
    if (!activeSection) return;
    const sectionStart = sectionIndex === 0 ? 0 : sectionBoundaries[sectionIndex - 1];
    const sectionProgress = (currentCycle - sectionStart) / Math.max(activeSection.cycles, 1);
    const sourceCount = Math.max((track.sources || []).length, 1);
    const sectionSources = activeSection.sourceIndexes?.length ? activeSection.sourceIndexes : [sectionIndex % sourceCount];
    let activeSources = [];
    const pattern = editor?.repl?.state?.pattern;
    if (pattern && typeof pattern.queryArc === "function") {
      const arcStart = Math.max(0, currentCycle - 0.125);
      const arcEnd = currentCycle + 0.125;
      const haps = pattern.queryArc(arcStart, arcEnd, { _cps: plan.cps }) || [];
      activeSources = inferLiveSourceIndexesFromHaps(haps, track);
    }
    if (!activeSources.length) activeSources = sectionSources;
    const primary = activeSources[0] ?? sectionSources[0] ?? (sectionIndex % sourceCount);
    const cycle = Math.floor(currentCycle) + 1;
    const beat = ((currentCycle - Math.floor(currentCycle)) * 4) + 1;
    setPlaybackTimelineLabel(windowId, {
      sectionIndex,
      sectionTotal: plan.sections.length,
      cycle,
      beat
    });
    const phaseKey = `${sectionIndex}:${activeSources.join("-")}:${Math.floor(sectionProgress * 8)}`;

    if (phaseKey !== runtime.phaseKey || sectionIndex !== runtime.sectionIndex) {
      runtime.sectionIndex = sectionIndex;
      runtime.phaseKey = phaseKey;
      const scene = {
        label: `${activeSection.label}${activeSection.vizSpec ? ` [viz:${activeSection.vizSpec}]` : ""}`,
        sourceIndexes: activeSources,
        energy: Math.min(0.92, activeSection.energy + Math.min(0.24, activeSources.length * 0.07)),
        hue: 200 + ((primary * 47) % 160),
        vizSpec: activeSection.vizSpec || "",
        timeline: {
          sectionIndex,
          sectionTotal: plan.sections.length,
          cycle,
          beat
        }
      };
      runtime.currentScene = scene;
      applyPlaybackScene(windowId, track.id, scene);
      const entry = playerHydraRegistry.get(windowId);
      if (entry?.controls) {
        entry.controls.energy = scene.energy;
        entry.controls.hue = scene.hue;
      }
    }
  }, 120);

  playbackRuntime.set(windowId, runtime);
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

function renderWindowMarkup(windowItem) {
  const track = windowItem.trackId ? trackMap.get(windowItem.trackId) : null;
  const hasEmbeddedVisuals =
    windowItem.kind === "player" && (trackUsesEmbeddedHydra(track) || trackUsesStrudelCanvasVisuals(track)) ? "1" : "0";
  return `
    <div class="window ${windowItem.className} ${windowItem.maximized ? "window-maximized" : ""}" data-id="${windowItem.id}" style="left:${
      windowItem.x
    }px; top:${windowItem.y}px; width:${windowItem.w}px; height:${windowItem.h}px; z-index:${windowItem.z};" data-embedded-visuals="${hasEmbeddedVisuals}">
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
  `;
}

function createWindowElement(windowItem) {
  const host = document.createElement("div");
  host.innerHTML = renderWindowMarkup(windowItem).trim();
  return host.firstElementChild;
}

function findWindowById(id) {
  return state.windows.find((windowItem) => windowItem.id === id);
}

function syncWindowLayerFromState(windowsLayer) {
  if (!windowsLayer) return false;
  const stateIds = new Set(state.windows.map((windowItem) => windowItem.id));

  state.windows.forEach((windowItem) => {
    const el = windowsLayer.querySelector(`.window[data-id="${windowItem.id}"]`);
    if (windowItem.minimized) {
      if (el) el.style.display = "none";
      return;
    }
    if (!el) {
      const node = createWindowElement(windowItem);
      if (node) windowsLayer.appendChild(node);
      return;
    }

    el.style.display = "";
    el.style.left = `${windowItem.x}px`;
    el.style.top = `${windowItem.y}px`;
    el.style.width = `${windowItem.w}px`;
    el.style.height = `${windowItem.h}px`;
    el.style.zIndex = String(windowItem.z);
    el.className = `window ${windowItem.className} ${windowItem.maximized ? "window-maximized" : ""}`;
    const track = windowItem.trackId ? trackMap.get(windowItem.trackId) : null;
    const hasEmbeddedVisuals =
      windowItem.kind === "player" && (trackUsesEmbeddedHydra(track) || trackUsesStrudelCanvasVisuals(track)) ? "1" : "0";
    el.dataset.embeddedVisuals = hasEmbeddedVisuals;

    const title = el.querySelector(".title-bar-text");
    if (title && title.textContent !== windowItem.title) title.textContent = windowItem.title;

    const maxBtn = el.querySelector(`[data-maximize="${windowItem.id}"]`);
    if (maxBtn) maxBtn.setAttribute("aria-label", windowItem.maximized ? "Restore" : "Maximize");

    const resizer = el.querySelector(".window-resizer");
    if (resizer) {
      resizer.style.display = windowItem.maximized ? "none" : "";
    }
  });

  windowsLayer.querySelectorAll(".window[data-id]").forEach((el) => {
    const id = el.getAttribute("data-id");
    if (!id) return;
    if (!stateIds.has(id)) el.remove();
  });

  return true;
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
    controls: { energy: playerState.get(windowId)?.playing ? 0.45 : 0.16, hue: 220 },
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
        () => 0.12 + controls.energy * 0.4 + 0.3 * Math.sin(synth.time * 0.18 + controls.hue * 0.01),
        () => 0.2 + controls.energy * 0.22 + 0.26 * Math.sin(synth.time * 0.21 + controls.hue * 0.015),
        () => 0.35 + controls.energy * 0.42 + 0.3 * Math.sin(synth.time * 0.14 + controls.hue * 0.009)
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
  if (entry.controls) {
    entry.controls.energy = playing ? 0.48 : 0.16;
    if (!playing) entry.controls.hue = 220;
  }
}

function createWindow({ id, title, body, x, y, w, h, className, type, trackId, kind, minW = 260, minH = 180 }) {
  const existing = findWindowById(id);
  if (existing) {
    existing.title = title;
    const isPlaying = existing.kind === "player" && !!playerState.get(existing.id)?.playing;
    // Avoid replacing a live player body; this remounts the REPL iframe.
    if (!(existing.kind === "player" && isPlaying)) {
      existing.body = body;
    }
    existing.className = className || "";
    existing.type = type;
    existing.trackId = trackId || null;
    existing.kind = kind || null;
    existing.minimized = false;
    existing.z = nextZ();
    state.activeId = existing.id;
    preserveWindowDom = true;
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
  preserveWindowDom = true;
  renderDesktop();
  return windowState;
}

function closeWindow(id) {
  if (id.startsWith("player-")) {
    stopTrack(id);
    destroyPlayerHydra(id);
    playerState.delete(id);
    const binding = replUpdateRegistry.get(id);
    if (binding?.repl && binding?.handler) {
      binding.repl.removeEventListener("update", binding.handler);
    }
    replUpdateRegistry.delete(id);
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
    preserveWindowDom = true;
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
  preserveWindowDom = true;
  renderDesktop();
}

function toggleTaskWindow(id) {
  const windowState = findWindowById(id);
  if (!windowState) return;
  if (windowState.minimized) {
    windowState.minimized = false;
    preserveWindowDom = true;
    focusWindow(id);
    return;
  }
  if (state.activeId === id) {
    minimizeWindow(id);
    return;
  }
  preserveWindowDom = true;
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
  preserveWindowDom = true;
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
        <div class="player-purpose">Doel: luister de track en klik op <strong>Sample Origins</strong> om bron + betekenis te zien.</div>
      </div>
      <div class="player-controls">
        <button class="button ${disabled ? "is-disabled" : ""}" ${disabled ? "disabled" : ""} data-play="player-${track.id}">Play</button>
        <button class="button ${disabled ? "is-disabled" : ""}" ${disabled ? "disabled" : ""} data-stop="player-${track.id}">Stop</button>
        <button class="button" data-reset="player-${track.id}">Reset</button>
        ${track.id === "t3" ? `<button class="button" data-identity-error="1">Trigger Error</button>` : ""}
      </div>
      <div class="player-live-strip">
        <span class="player-live-pill">Section: <strong data-play-section-large="player-${track.id}">Idle</strong></span>
        <span class="player-live-pill">Sources: <strong data-play-sources-large="player-${track.id}">—</strong></span>
        <span class="player-live-pill">Now: <strong data-play-now-large="player-${track.id}">—</strong></span>
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
            <div class="origin-help">Sample = eerder opgenomen geluid. Klik op een kaart voor herkomst en persoonlijke context.</div>
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
            <div class="origin-help">Klik op een bron om te zien waar het sample vandaan komt en waarom het belangrijk is.</div>
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
              <div class="origin-help">Open bronkaarten voor: herkomst, jaar, trackgebruik en persoonlijke link.</div>
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
        <p class="status-bar-field">Section: <span data-play-section="player-${track.id}">Idle</span></p>
        <p class="status-bar-field">Beat: <span data-play-beat="player-${track.id}">—</span></p>
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
  const safePlayerRestore = restoreRect && !restoreRect.maximized ? restoreRect : null;
  const nextRect = safePlayerRestore
    ? { x: safePlayerRestore.x, y: safePlayerRestore.y, w: safePlayerRestore.w, h: safePlayerRestore.h }
    : preset.player;
  const playerWindow = openWorkspaceWindow(track, "player", nextRect);

  const sourceRestore = restoreWorkspace(trackId, "source", state.designVariant);
  const safeSourceRestore = sourceRestore && !sourceRestore.maximized ? sourceRestore : null;
  const sourceRect = safeSourceRestore
    ? { x: safeSourceRestore.x, y: safeSourceRestore.y, w: safeSourceRestore.w, h: safeSourceRestore.h }
    : preset.source;
  const sourceWindow = openWorkspaceWindow(track, "source", sourceRect);

  if (sourceWindow && playerWindow) {
    const overlapX = Math.max(
      0,
      Math.min(playerWindow.x + playerWindow.w, sourceWindow.x + sourceWindow.w) - Math.max(playerWindow.x, sourceWindow.x)
    );
    const overlapY = Math.max(
      0,
      Math.min(playerWindow.y + playerWindow.h, sourceWindow.y + sourceWindow.h) - Math.max(playerWindow.y, sourceWindow.y)
    );
    const overlapArea = overlapX * overlapY;
    const sourceArea = Math.max(1, sourceWindow.w * sourceWindow.h);
    if (overlapArea / sourceArea > 0.72) {
      sourceWindow.x = preset.source.x;
      sourceWindow.y = preset.source.y;
      sourceWindow.w = preset.source.w;
      sourceWindow.h = preset.source.h;
      sourceWindow.maximized = false;
      sourceWindow.prevRect = null;
      persistWorkspaceWindow(sourceWindow);
    }
  }

  preserveWindowDom = true;
  focusWindow(`player-${track.id}`);

  if (track.id === "t3") {
    showSystemError();
  }
}

async function runPlaybackUiSelfTest(trackId = "t1") {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const result = [];

  state.desktopStep = "select";
  openTrackWorkspace(trackId);
  await wait(120);

  const playerId = `player-${trackId}`;
  const replBefore = replRegistry.get(playerId);
  playTrack(playerId);
  await wait(240);
  const playingAfterPlay = !!playerState.get(playerId)?.playing;
  result.push({ step: "play", pass: playingAfterPlay });

  toggleMaximizeWindow(playerId);
  await wait(180);
  const replAfterMax = replRegistry.get(playerId);
  result.push({ step: "maximize_keeps_repl_node", pass: replBefore === replAfterMax });

  toggleMaximizeWindow(playerId);
  await wait(180);
  const replAfterRestore = replRegistry.get(playerId);
  result.push({ step: "restore_keeps_repl_node", pass: replAfterMax === replAfterRestore });

  minimizeWindow(playerId);
  await wait(180);
  toggleTaskWindow(playerId);
  await wait(220);
  const replAfterMinRestore = replRegistry.get(playerId);
  result.push({ step: "min_restore_keeps_repl_node", pass: replAfterRestore === replAfterMinRestore });

  stopTrack(playerId);
  await wait(250);
  result.push({ step: "stop_after_state_changes", pass: !playerState.get(playerId)?.playing });

  openTrackWorkspace(trackId);
  await wait(180);
  const replAfterReopen = replRegistry.get(playerId);
  result.push({ step: "reopen_keeps_repl_node", pass: replAfterMinRestore === replAfterReopen });

  console.table(result);
  return result;
}

function mountRepl(windowId, code, trackId = null) {
  const container = document.querySelector(`[data-repl="${windowId}"]`);
  if (!container) return;

  let repl = replRegistry.get(windowId);
  if (!repl) {
    repl = document.createElement("strudel-editor");
    repl.style.display = "block";
    repl.style.width = "100%";
    repl.style.height = "100%";
    repl.dataset.currentCode = "";
    replRegistry.set(windowId, repl);
  }

  if (!container.contains(repl)) {
    container.innerHTML = "";
    container.appendChild(repl);
    if (!playerState.get(windowId)?.playing) resetReplViewport(repl);
  }
  ensureReplHostLayout(repl);
  bindReplUpdateEvents(windowId, trackId, repl);

  const nextCode = String(code || "");
  const isPlaying = !!playerState.get(windowId)?.playing;
  const currentCode = repl.dataset.currentCode || "";
  const syncQueued = repl.dataset.codeSyncQueued === "1";

  const syncCode = (value) => {
    repl.setAttribute("code", value);
    if (repl.editor && typeof repl.editor.setCode === "function") {
      repl.editor.setCode(value);
      repl.dataset.codeSyncQueued = "0";
      return true;
    }
    return false;
  };

  // Important: avoid resetting code while playing; it reinitializes the editor/iframe.
  const shouldSyncCode = currentCode !== nextCode && (!isPlaying || !currentCode);
  if (shouldSyncCode) {
    const synced = syncCode(nextCode);
    repl.dataset.currentCode = nextCode;
    if (!synced && !syncQueued) {
      repl.dataset.codeSyncQueued = "1";
      window.setTimeout(() => {
        const activeRepl = replRegistry.get(windowId);
        if (!activeRepl || activeRepl !== repl) return;
        if ((activeRepl.dataset.currentCode || "") !== nextCode) return;
        syncCode(nextCode);
      }, 120);
    }
  }

  ensureReplHostLayout(repl);
  forceReplIframeFullSize(repl);
}

function ensureReplHostLayout(repl) {
  if (!repl || !repl.parentElement) return;
  const host = repl.nextElementSibling;
  if (!(host instanceof HTMLElement) || host.parentElement !== repl.parentElement) {
    if (repl.dataset.hostLayoutQueued === "1") return;
    repl.dataset.hostLayoutQueued = "1";
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (!repl.isConnected) {
        window.clearInterval(timer);
        repl.dataset.hostLayoutQueued = "0";
        return;
      }
      const next = repl.nextElementSibling;
      if (next instanceof HTMLElement && next.parentElement === repl.parentElement) {
        next.classList.add("player-repl-host");
        next.style.position = "absolute";
        next.style.inset = "0";
        next.style.width = "100%";
        next.style.height = "100%";
        next.style.zIndex = "2";
        window.clearInterval(timer);
        repl.dataset.hostLayoutQueued = "0";
        return;
      }
      if (tries > 30) {
        window.clearInterval(timer);
        repl.dataset.hostLayoutQueued = "0";
      }
    }, 100);
    return;
  }
  host.classList.add("player-repl-host");
  host.style.position = "absolute";
  host.style.inset = "0";
  host.style.width = "100%";
  host.style.height = "100%";
  host.style.zIndex = "2";
}

function getCompatRuntimeCode(track, compatibilityMode = false) {
  if (!track) return "";
  return String(track.strudel_code || "");
}

function trackUsesEmbeddedHydra(track) {
  return /\binitHydra\s*\(/.test(String(track?.strudel_code || ""));
}

function trackUsesStrudelCanvasVisuals(track) {
  const code = String(track?.strudel_code || "");
  return /\.(punchcard|spiral|scope|_scope)\s*\(/.test(code);
}

function dockStrudelVisualCanvases(windowId, track) {
  const hasHydraVisuals = trackUsesEmbeddedHydra(track);
  const hasStrudelVisuals = trackUsesStrudelCanvasVisuals(track);
  if (!hasHydraVisuals && !hasStrudelVisuals) return;
  const replContainer = document.querySelector(`[data-repl="${windowId}"]`);
  if (!replContainer) return;
  const stage = replContainer.closest(".player-stage") || replContainer;
  if (!(stage instanceof HTMLElement)) return;

  const dock = (canvasId, zIndex) => {
    const canvas = document.getElementById(canvasId);
    if (!(canvas instanceof HTMLCanvasElement)) return;
    if (canvas.parentElement !== stage) stage.prepend(canvas);
    canvas.dataset.strudelDockedTo = windowId;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = String(zIndex);
  };

  if (hasHydraVisuals) dock("hydra-canvas", 0);
  if (hasStrudelVisuals || hasHydraVisuals) dock("test-canvas", 1);
}

function ensureStrudelErrorGuard() {
  if (strudelErrorGuardAttached) return;
  strudelErrorGuardAttached = true;

  document.addEventListener("strudel.log", (event) => {
    const detail = event?.detail || {};
    if (detail.type !== "error") return;
    const message = String(detail.message || "");
    if (!message.includes("[eval] error")) return;

    const now = performance.now();
    if (!strudelErrorBurstStart || now - strudelErrorBurstStart > 2500) {
      strudelErrorBurstStart = now;
      strudelErrorBurstCount = 0;
    }
    strudelErrorBurstCount += 1;
    if (strudelErrorBurstCount < 8) return;

    let stoppedAny = false;
    playerState.forEach((entry, id) => {
      if (!entry?.playing) return;
      stopTrack(id);
      stoppedAny = true;
    });

    if (stoppedAny) {
      console.warn("Emergency stop: repeated Strudel runtime errors detected.");
    }

    strudelErrorBurstStart = now;
    strudelErrorBurstCount = 0;
  });
}

function bindReplUpdateEvents(windowId, trackId, repl) {
  if (!repl) return;
  const existing = replUpdateRegistry.get(windowId);
  if (existing?.repl === repl) return;
  if (existing?.repl && existing?.handler) {
    existing.repl.removeEventListener("update", existing.handler);
  }

  const handler = (event) => {
    const state = event?.detail || {};
    const isPlaying = !!playerState.get(windowId)?.playing;
    const stopping = stopInProgress.has(windowId);
    if (state?.pending) return;

    if (state?.evalError || state?.schedulerError) {
      playerState.set(windowId, { playing: false });
      setPlayerHydraPlayback(windowId, false);
      clearPlaybackRuntime(windowId);
      applyPlaybackScene(windowId, trackId || null, null);
      return;
    }

    if (stopping) {
      playerState.set(windowId, { playing: false });
      return;
    }

    const started = !!state?.started;
    if (started && !isPlaying) {
      playerState.set(windowId, { playing: true });
      setPlayerHydraPlayback(windowId, true);
      const track = trackId ? trackMap.get(trackId) : null;
      if (track) startPlaybackRuntime(windowId, track, repl.editor);
      return;
    }

    if (!started && isPlaying) {
      playerState.set(windowId, { playing: false });
      setPlayerHydraPlayback(windowId, false);
      clearPlaybackRuntime(windowId);
      applyPlaybackScene(windowId, trackId || null, null);
    }
  };

  repl.addEventListener("update", handler);
  replUpdateRegistry.set(windowId, { repl, handler });
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
    iframe.style.position = "relative";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.inset = "auto";
    iframe.style.verticalAlign = "top";

    const parent = iframe.parentElement;
    if (parent) {
      parent.style.width = "100%";
      parent.style.height = "100%";
      parent.style.overflow = "hidden";
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

function resetReplViewport(repl) {
  const apply = () => {
    const root = repl.shadowRoot;
    const iframe = root?.querySelector("iframe");
    if (!iframe) return false;
    try {
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      if (win) win.scrollTo(0, 0);
      if (doc?.documentElement) doc.documentElement.scrollTop = 0;
      if (doc?.body) doc.body.scrollTop = 0;
      const scroller = doc?.querySelector(".cm-scroller");
      if (scroller) scroller.scrollTop = 0;
    } catch {
      // no-op
    }
    return true;
  };

  if (apply()) return;
  let tries = 0;
  const timer = setInterval(() => {
    tries += 1;
    if (apply() || tries > 40) clearInterval(timer);
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

async function playTrack(windowId) {
  installConsoleNoiseFilter();
  ensureStrudelErrorGuard();
  stopInProgress.delete(windowId);
  const repl = replRegistry.get(windowId);
  const windowState = findWindowById(windowId);
  const track = windowState?.trackId ? trackMap.get(windowState.trackId) : null;
  const editor = repl?.editor;
  if (!editor || typeof editor.evaluate !== "function") return;
  if (trackUsesEmbeddedHydra(track)) installHydraAudioCompatGuard();

  const runEvaluate = async (code) => {
    if (typeof editor.setCode === "function") editor.setCode(code);
    if (typeof editor.evaluate === "function") {
      await Promise.resolve(editor.evaluate());
    } else if (typeof editor?.repl?.evaluate === "function") {
      await Promise.resolve(editor.repl.evaluate(code));
    }
    const evalState = editor?.repl?.state;
    const evalError = evalState?.evalError || evalState?.schedulerError || null;
    return {
      ok: !evalError,
      error: evalError
    };
  };

  try {
    const authoredCode = getCompatRuntimeCode(track, false);
    if (repl) repl.dataset.currentCode = authoredCode;

    const result = await runEvaluate(authoredCode);
    if (!result.ok) throw result.error || new Error("Strudel evaluate failed");
  } catch (error) {
    playerState.set(windowId, { playing: false });
    setPlayerHydraPlayback(windowId, false);
    clearPlaybackRuntime(windowId);
    const trackId = windowState?.trackId || null;
    applyPlaybackScene(windowId, trackId, null);
    throw error;
  }

  playerState.set(windowId, { playing: true });
  setPlayerHydraPlayback(windowId, true);
  if (track && !playbackRuntime.get(windowId)) startPlaybackRuntime(windowId, track, editor);

  const hasEmbeddedHydra = trackUsesEmbeddedHydra(track);
  const hasCanvasVisuals = hasEmbeddedHydra || trackUsesStrudelCanvasVisuals(track);
  if (hasCanvasVisuals) {
    dockStrudelVisualCanvases(windowId, track);
    window.setTimeout(() => dockStrudelVisualCanvases(windowId, track), 120);
    window.setTimeout(() => dockStrudelVisualCanvases(windowId, track), 550);
    window.setTimeout(() => dockStrudelVisualCanvases(windowId, track), 1200);
  }
  if (track && !hasEmbeddedHydra && !playbackPrimed.has(windowId)) {
    playbackPrimed.add(windowId);
    window.setTimeout(async () => {
      if (!playerState.get(windowId)?.playing) return;
      const activeRepl = replRegistry.get(windowId);
      const activeEditor = activeRepl?.editor;
      if (!activeEditor?.repl?.evaluate) return;
      try {
        await Promise.resolve(activeEditor.repl.evaluate(getCompatRuntimeCode(track, false), true, false));
      } catch {
        // no-op
      }
    }, 900);
  }
}

function stopEditorSafely(editor) {
  if (!editor) return false;
  let stopped = false;

  if (typeof editor.stop === "function") {
    try {
      editor.stop();
      stopped = true;
    } catch {
      // no-op
    }
  }

  if (typeof editor.hush === "function") {
    try {
      editor.hush();
      stopped = true;
    } catch {
      // no-op
    }
  }

  return stopped;
}

function stopAllEditors() {
  let stopped = false;
  replRegistry.forEach((repl) => {
    if (repl?.editor) {
      stopped = stopEditorSafely(repl.editor) || stopped;
    }
  });
  return stopped;
}

function stopTrackWithRetry(windowId, attempts = 10) {
  let tryCount = 0;
  const tick = () => {
    tryCount += 1;
    const repl = replRegistry.get(windowId);
    const editor = repl?.editor;
    const done = stopEditorSafely(editor) || stopAllEditors();
    if (done || tryCount >= attempts) return;
    window.setTimeout(tick, 120);
  };
  tick();
}

function stopTrack(windowId) {
  stopInProgress.add(windowId);
  stopTrackWithRetry(windowId);
  window.setTimeout(() => {
    stopTrackWithRetry(windowId, 4);
  }, 180);
  window.setTimeout(() => {
    stopInProgress.delete(windowId);
  }, 1200);
  playerState.set(windowId, { playing: false });
  setPlayerHydraPlayback(windowId, false);
  clearPlaybackRuntime(windowId);
  const windowState = findWindowById(windowId);
  applyPlaybackScene(windowId, windowState?.trackId || null, null);
}

function resetTrack(windowId, code) {
  const repl = replRegistry.get(windowId);
  if (!repl || !repl.editor) return;
  if (typeof repl.editor.stop === "function") repl.editor.stop();
  repl.editor.setCode(code);
  repl.dataset.currentCode = String(code || "");
  playerState.set(windowId, { playing: false });
  setPlayerHydraPlayback(windowId, false);
  clearPlaybackRuntime(windowId);
  const windowState = findWindowById(windowId);
  applyPlaybackScene(windowId, windowState?.trackId || null, null);
}

function attachDragHandlers() {
  document.querySelectorAll("#windows .window[data-id]").forEach((windowEl) => {
    const id = windowEl.getAttribute("data-id");
    const windowState = findWindowById(id);
    if (!windowState) return;

    const header = windowEl.querySelector(".title-bar");
    if (!header) return;
    if (header.dataset.dragBound === "1") return;
    header.dataset.dragBound = "1";

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
      preserveWindowDom = true;
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
    if (handle.dataset.resizeBound === "1") return;
    handle.dataset.resizeBound = "1";

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
      preserveWindowDom = true;
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
        <p>Dit is een interactief album als desktop.</p>
        <p>Klik een track om muziek te luisteren en direct te zien:<br/>1. code<br/>2. sample herkomst<br/>3. persoonlijke context</p>
        <p>Tip: gebruik <strong>Start -> Programs -> Applications</strong> of klik de desktop-iconen.</p>
        <div class="login-actions">
          <button class="button" data-enter-library="1">Go to songs</button>
          <button class="button" data-open-first-track="1">Open 01_Brinkstraat</button>
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
        <button id="startBtn" class="start-btn">Start · BREINDOOD</button>
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
    const reuse = preserveWindowDom && syncWindowLayerFromState(windowsLayer);
    if (!reuse) {
      windowsLayer.innerHTML = state.windows
        .filter((windowItem) => !windowItem.minimized)
        .map((windowItem) => renderWindowMarkup(windowItem))
        .join("");
    }
  }
  preserveWindowDom = false;

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
    button.onclick = () => {
      const trackId = button.getAttribute("data-track");
      state.desktopStep = "select";
      openTrackWorkspace(trackId);
    };
  });

  document.querySelectorAll("[data-open-folder-track]").forEach((button) => {
    button.onclick = () => {
      const trackId = button.getAttribute("data-open-folder-track");
      const target = findWindowById(`folder-${trackId}`);
      if (target) {
        focusWindow(target.id);
        return;
      }
      openTrackFolderWindow(trackId);
    };
  });

  document.querySelectorAll("[data-start-track]").forEach((button) => {
    button.onclick = () => {
      const trackId = button.getAttribute("data-start-track");
      state.startMenuOpen = false;
      state.desktopStep = "select";
      renderDesktop();
      openTrackWorkspace(trackId);
    };
  });

  document.querySelectorAll("[data-enter-library]").forEach((button) => {
    button.onclick = () => {
      state.desktopStep = "select";
      renderDesktop();
    };
  });

  document.querySelectorAll("[data-open-first-track]").forEach((button) => {
    button.onclick = () => {
      state.desktopStep = "select";
      renderDesktop();
      openTrackWorkspace("t1");
    };
  });

  document.querySelectorAll("[data-toggle-all-tracks]").forEach((button) => {
    button.onclick = () => {
      state.showAllTracks = !state.showAllTracks;
      renderDesktop();
    };
  });

  document.querySelectorAll("[data-set-variant]").forEach((button) => {
    button.onclick = () => {
      const variantId = button.getAttribute("data-set-variant");
      setDesignVariant(variantId);
    };
  });

  document.querySelectorAll("[data-open-app-folder]").forEach((button) => {
    button.onclick = () => {
      state.startMenuPath = "apps";
      renderDesktop();
    };
  });

  document.querySelectorAll("[data-open-app-folder-desktop]").forEach((button) => {
    button.onclick = () => {
      openApplicationsFolderWindow();
    };
  });

  document.querySelectorAll("[data-open-music-folder]").forEach((button) => {
    button.onclick = () => {
      openMusicFolderWindow();
    };
  });

  document.querySelectorAll("[data-open-about-desktop]").forEach((button) => {
    button.onclick = () => {
      openDesktopAboutWindow();
    };
  });

  document.querySelectorAll("[data-run-track-exe]").forEach((button) => {
    button.onclick = () => {
      const trackId = button.getAttribute("data-run-track-exe");
      openTrackWorkspace(trackId);
    };
  });

  document.querySelectorAll("[data-back-root]").forEach((button) => {
    button.onclick = () => {
      state.startMenuPath = "root";
      renderDesktop();
    };
  });

  document.querySelectorAll("[data-sample-detail-track]").forEach((button) => {
    button.onclick = () => {
      const trackId = button.getAttribute("data-sample-detail-track");
      const sampleIndex = button.getAttribute("data-sample-detail-index");
      openSampleDetailWindow(trackId, sampleIndex);
    };
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.onclick = () => closeWindow(button.getAttribute("data-close"));
  });

  document.querySelectorAll("[data-task]").forEach((button) => {
    button.onclick = () => toggleTaskWindow(button.getAttribute("data-task"));
  });

  document.querySelectorAll("[data-minimize]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      minimizeWindow(button.getAttribute("data-minimize"));
    };
  });

  document.querySelectorAll("[data-maximize]").forEach((button) => {
    button.onclick = (event) => {
      event.stopPropagation();
      toggleMaximizeWindow(button.getAttribute("data-maximize"));
    };
  });

  document.querySelectorAll("[data-play]").forEach((button) => {
    button.onclick = () => {
      playTrack(button.getAttribute("data-play")).catch((error) => {
        console.error(error);
      });
    };
  });

  document.querySelectorAll("[data-stop]").forEach((button) => {
    button.onclick = () => stopTrack(button.getAttribute("data-stop"));
  });

  document.querySelectorAll("[data-reset]").forEach((button) => {
    const playerId = button.getAttribute("data-reset");
    const trackId = playerId.replace("player-", "");
    const track = trackMap.get(trackId);
    if (!track) return;
    button.onclick = () => resetTrack(playerId, track.strudel_code);
  });

  document.querySelectorAll("[data-identity-error]").forEach((button) => {
    button.onclick = () => showSystemError();
  });

  document.querySelectorAll("#windows .window[data-id]").forEach((windowEl) => {
    if (windowEl.dataset.focusBound === "1") return;
    windowEl.dataset.focusBound = "1";
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
    mountRepl(windowItem.id, track.strudel_code, track.id);
    mountPlayerHydra(windowItem.id, track.id);
    if (playerState.get(windowItem.id)?.playing) {
      dockStrudelVisualCanvases(windowItem.id, track);
    }
  });

  playbackRuntime.forEach((runtime, windowId) => {
    if (!runtime?.currentScene || !runtime?.trackId) return;
    applyPlaybackScene(windowId, runtime.trackId, runtime.currentScene);
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

if (typeof window !== "undefined") {
  window.__breindoodSelfTest = runPlaybackUiSelfTest;
  window.__breindoodPlaybackPlan = (trackId = "t1") => {
    const track = trackMap.get(trackId);
    return getPlaybackPlan(track);
  };
}

renderApp();
