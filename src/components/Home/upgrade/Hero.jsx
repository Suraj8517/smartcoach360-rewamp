import { Fragment, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from "../../../assets/smartcoach360.svg"
import bgVideo from "../../../assets/upgrade/hero/bgvideo.mp4"
import Title1Lines from './utils/title1Lines';
import Words from './utils/words';
gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------------- */
/* Collage tiles — seeded picsum.photos placeholders. `ar` is each tile's  */
/* aspect ratio (width / height). The tile's height is derived from it, so */
/* a tile never gets stretched or awkwardly cropped, and the placeholder   */
/* image is requested at exactly that ratio. Swap each image for a real    */
/* photo/<Image> (keep the same ratio, or object-cover will crop it).      */
/* Keep this list the same length as the icon entries in the layouts below */
/* (9), otherwise two tiles end up stacked on the same spot.               */
/* ---------------------------------------------------------------------- */

const CARD_DATA = [
  { seed: 'be-tile-1', ar: 4 / 3 },
  { seed: 'be-tile-2', ar: 3 / 4 }, // portrait
  { seed: 'be-tile-3', ar: 4 / 3 },
  { seed: 'be-tile-4', ar: 1 }, // square
  { seed: 'be-tile-5', ar: 4 / 3 },
  { seed: 'be-tile-6', ar: 3 / 4 }, // portrait
  { seed: 'be-tile-7', ar: 4 / 3 },
  { seed: 'be-tile-8', ar: 4 / 3 },
  { seed: 'be-tile-9', ar: 1 }, // square
];

/* ---------------------------------------------------------------------- */
/* Tunables                                                               */
/* ---------------------------------------------------------------------- */

const TAU = Math.PI * 2;

// Palette
const PURPLE = '#DCC6EA'; // the hero's final background + the box's bar
const INK = '#150a24';
const PAPER = '#FFFFFF'; // the light page revealed under the purple
const CREAM = '#f3ede1'; // the hero's starting background
// Highlight for the last word ("Growth") inside the photo (Stage 8).
// Uses the brand purple; swap for a deeper/lighter shade if it needs more
// contrast on your photos (e.g. '#d9bcff' lighter, '#b07df0' deeper).
const HIGHLIGHT = PURPLE;

// Whole turns the collage makes around the centre while the logo grows in.
// Keep this a WHOLE number: the orbit then lands exactly back on the scatter
// layout, so the next stage starts from rest with no jump and no spin.
const ORBIT_TURNS = .5;

// Stage 5: how far the tiles settle relative to their scatter layout
// (1 = same place, >1 = slightly further out toward the sides, <1 = toward the
// centre). A little over 1 keeps the tiles clear of the centred headline.
const STAGE5_PULL = 1.05;

// Stage 2a: how small the full-bleed video shrinks while the headline stays put
// (fractions of viewport width / height). The headline is wider than the shrunk
// video, so its ends poke out over the page and turn black.
const VIDEO_SHRINK_W = 0.77;
const VIDEO_SHRINK_H = 0.86;

// Opportunity box (Stage 7)
// Section label shown to the left of the box.
const OPP_LABEL = 'Why coaches choose us';
// Height of the purple bar as a % of the box (the "before" level). It then
// grows to 100% (the "with us" level).
const BAR_PCT = 53;
// The two annotations next to the box: top of the box, and top of the first bar.
const NOTE_TOP = { value: 'One platform', sub: 'growth scales' };
const NOTE_NOW = { value: 'Juggling apps', sub: 'growth stalls' };
const OPP_HEADLINE = 'Trusted by 10,000+ coaches worldwide';
// Second text: replaces the headline in the same spot once the bar has grown
// up to the top. Change the copy here.
const OPP_NEW_TEXT = 'Scale faster with less effort';

// Stage 8 — the big two-tone words, each with its OWN photo.
//   OPP_WORDS[0..2] stack as three lines on the left,
//   OPP_WORDS[3]    sits on the right edge of the box.
// They appear one at a time, and each word brings in the photo at the same
// index in OPP_IMAGES. Keep both lists 4 long. Swap the picsum URLs for real
// imports (e.g. import img1 from '.../clients.jpg') — portrait ~900x1000.
const OPP_WORDS = ['Effortless', 'Scalable', 'Smart', 'Growth'];
const OPP_IMAGES = [
  'https://picsum.photos/seed/coach-effortless/900/1000', // Effortless
  'https://picsum.photos/seed/coach-scalable/900/1000', // Scalable
  'https://picsum.photos/seed/coach-smart/900/1000', // Smart
  'https://picsum.photos/seed/coach-growth/900/1000', // Growth
];

// Title 1 is drawn twice (white over the video, black under it), so its markup
// and classes live here. Colour and stacking are added at the call site.
const TITLE1_CLASS =
  'absolute left-[4%] right-[4%] top-1/2 font-[Inter Tight,sans-serif] text-[clamp(2rem,8vw,8rem)] font-medium leading-[1.3] tracking-tight sm:left-[2.5%] sm:right-[2.5%] sm:leading-[0.94]';



/* ---------------------------------------------------------------------- */
/* Word-by-word text                                                      */
/* ---------------------------------------------------------------------- */

// Word animation timings (timeline units — 1 unit ≈ 45–60vh of scroll).
// Each headline's word stagger is chosen so that
//   (words - 1) * stagger + duration
// fits inside the stage that plays it.
const WORD_FADE = 0.6; // each word's own fade duration
const T1_OUT_STAGGER = 0.06; // title 1: 8 words  -> 0.42 + 0.5 ≈ 0.92 (stage window 1.1)
const T2_IN_STAGGER = 0.07; // title 2: 17 words -> 1.12 + 0.6 ≈ 1.7
const T2_OUT_STAGGER = 0.025; // title 2 fading out, 17 words -> ≈ 0.9
const T3_IN_STAGGER = 0.15; // title 3: 3 words  -> 0.3 + 0.7 = 1.0

// Reusable word-splitting markup. Every word becomes an inline-block span
// marked `data-word` (so GSAP can transform it — inline elements can't be
// translated). Real spaces are kept BETWEEN the spans, so wrapping, screen
// readers and copy/paste all behave like normal text.
//
// Usage: <h2 ref={ref}><Words text="Some headline" /></h2>
// Then:  gsap.utils.toArray('[data-word]', ref.current)


const getWords = (el) => gsap.utils.toArray('[data-word]', el);

/* One annotation next to the box: a tick line pointing at the edge + label. */
function Annotation({ top, value, sub }) {
  return (
    <div className="absolute left-full flex -translate-y-1/2 items-center" style={{ top }}>
      <span data-note-line className="relative block h-px w-6 origin-left sm:w-14" style={{ background: INK }}>
        <span className="absolute -left-px top-1/2 h-2 w-px -translate-y-1/2" style={{ background: INK }} />
        <span className="absolute -right-px top-1/2 h-2 w-px -translate-y-1/2" style={{ background: INK }} />
      </span>
      <span
        data-note-text
        className="ml-2 text-[11px] leading-tight sm:ml-3 sm:text-base"
        style={{ color: INK }}
      >
        <b className="block font-semibold">{value}</b>
        <span className="block">{sub}</span>
      </span>
    </div>
  );
}

/* Stage 8 headline. It is rendered TWICE inside the box:
     - dark copy  -> sits under the photo, so only the part poking out of the
                     box is visible (black)
     - light copy -> sits on top of the photo inside an overflow-hidden layer,
                     so only the part inside the box is visible (white / purple)
   Both copies use the same box-relative coordinates, so the letters split
   exactly at the box edge ("Effo|rtless", "Gr|owth") at any size.
   Font size is in cqw (container-query units) so it scales with the box.
   Each word carries data-grp="w0".."w3" so the timeline can reveal them one
   at a time (in both copies at once). */
function OppTitle({ light }) {
  const base =
    'font-[Inter_Tight,sans-serif] [font-size:15.5cqw] font-medium leading-[1.04] tracking-[-0.04em] whitespace-nowrap';
  const main = light ? 'text-white' : 'text-[#150a24]';
  return (
    <>
      <div data-lines className={`absolute left-[-23%] top-[12%] ${base} ${main}`}>
        {OPP_WORDS.slice(0, 3).map((word, i) => (
          <div key={word} data-grp={`w${i}`}>
            <Words text={word} cls="" />
          </div>
        ))}
      </div>
      <div
        data-grp="w3"
        className={`absolute left-[82%] top-1/2 -translate-y-1/2 ${base} ${light ? '' : 'text-[#150a24]'}`}
        style={light ? { color: HIGHLIGHT } : undefined}
      >
        <Words text={OPP_WORDS[3]} cls="" />
      </div>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* Layouts                                                                */
/* ---------------------------------------------------------------------- */

// Every entry is { w, x, y }:
//   w  tile width as a fraction of the sizing unit (see getScatterPositions).
//      Height comes from the tile's aspect ratio, so shapes stay consistent on
//      any screen.
//   x  offset of the tile's centre from the screen centre, as a fraction of the
//      viewport WIDTH  (negative = left).
//   y  same, as a fraction of the viewport HEIGHT (negative = up).
// The first entry is the video; the rest map 1:1 to CARD_DATA. Tiles are spread
// around all four sides so the middle stays free for the headline, sizes step
// down from the video (biggest) through medium tiles to small accents, and
// every tile sits fully on screen with a little breathing room.
//
// These positions were tuned so that, on common screens, tiles don't collide at
// rest, don't touch the headline once they settle, and overlap as little as
// possible while the collage orbits. If you change a size, re-check those.

// Landscape screens. The video's slot is 16:9 to match the footage.
const DESKTOP_LAYOUT = {
  videoAr: 16 / 9,
  tiles: [
    { w: 0.25, x: -0.336, y: -0.301 }, // video — large, top-left
    { w: 0.15, x: -0.408, y: 0.186 }, // 1 — medium, left
    { w: 0.11, x: 0.398, y: -0.267 }, // 2 — portrait, top-right
    { w: 0.13, x: 0.409, y: 0.178 }, // 3 — medium, right
    { w: 0.08, x: -0.348, y: 0.397 }, // 4 — small square, bottom-left
    { w: 0.1, x: -0.156, y: 0.401 }, // 5 — bottom, left of centre
    { w: 0.085, x: 0.037, y: 0.365 }, // 6 — small portrait, bottom-centre
    { w: 0.11, x: 0.36, y: 0.394 }, // 7 — bottom-right
    { w: 0.095, x: -0.021, y: -0.402 }, // 8 — top-centre
    { w: 0.09, x: 0.184, y: -0.385 }, // 9 — small square, top, right of centre
  ],
};

// Portrait screens (phones, tablets held upright): tiles are relatively bigger
// and packed into a band at the top and a band at the bottom, leaving the
// middle free for the headline. The video's slot is 4:3.
const MOBILE_LAYOUT = {
  videoAr: 4 / 3,
  tiles: [
    { w: 0.46, x: -0.14, y: -0.357 }, // video — top
    { w: 0.28, x: 0.266, y: -0.401 }, // 1 — top-right
    { w: 0.22, x: 0.36, y: -0.151 }, // 2 — portrait, right
    { w: 0.27, x: -0.34, y: -0.135 }, // 3 — left
    { w: 0.2, x: -0.257, y: 0.401 }, // 4 — small square, bottom-left
    { w: 0.29, x: -0.024, y: 0.145 }, // 5 — below the headline
    { w: 0.21, x: 0.244, y: 0.372 }, // 6 — portrait, bottom-right
    { w: 0.25, x: -0.335, y: 0.145 }, // 7 — lower-left
    { w: 0.24, x: 0.35, y: 0.13 }, // 8 — lower-right
    { w: 0.2, x: -0.003, y: 0.409 }, // 9 — small square, bottom-centre
  ],
};

// Returns { video, icons: [...] } — each with { x, y, w, h, edge } in px.
// `edge` is the screen edge that tile slides in from (whichever axis it sits
// furthest along wins, the sign picks the side).
//
// Sizing unit: normally the viewport width, but capped by the height on very
// wide (ultrawide) screens so tiles don't balloon.
function getScatterPositions() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const layout = vw < 640 || vh > vw ? MOBILE_LAYOUT : DESKTOP_LAYOUT;
  const unit = Math.min(vw, vh * 1.78);

  const toPx = (t, ar) => {
    const w = t.w * unit;
    const edge =
      Math.abs(t.y) >= Math.abs(t.x) ? (t.y < 0 ? 'top' : 'bottom') : t.x < 0 ? 'left' : 'right';
    return { x: t.x * vw, y: t.y * vh, w, h: w / ar, edge };
  };

  const [videoTile, ...iconTiles] = layout.tiles;
  return {
    video: toPx(videoTile, layout.videoAr),
    icons: iconTiles.map((t, i) => toPx(t, CARD_DATA[i % CARD_DATA.length].ar)),
  };
}

// Defensive fallback: if the icons array is ever a different length than
// CARD_DATA (e.g. one is edited independently), wrap the index instead of
// reading past the end of the array.
function scatterFor(icons, i) {
  return icons[i % icons.length];
}

// Off-screen starting x/y for an icon's entrance, given its final scattered
// position — comfortably past whichever edge it slides in from, so the
// slide-in motion is always visibly coming from off-screen.
function entryStart(target) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  switch (target.edge) {
    case 'top':
      return { x: target.x, y: -(h / 2 + target.h) };
    case 'bottom':
      return { x: target.x, y: h / 2 + target.h };
    case 'left':
      return { x: -(w / 2 + target.w), y: target.y };
    default:
      return { x: w / 2 + target.w, y: target.y };
  }
}

/* ---------------------------------------------------------------------- */
/* Main component                                                         */
/* ---------------------------------------------------------------------- */

export default function ScrollHero() {
  const rootRef = useRef(null);
  const stageRef = useRef(null); // the WHOLE purple hero (moves up in Stage 7, revealing the light page)
  const oppBoxRef = useRef(null); // the box itself (scales + rises from the bottom of the screen)
  const oppNewRef = useRef(null); // the new text inside the box's upper purple area
  const oppHeadRef = useRef(null); // the box's headline
  const oppBlackRef = useRef(null); // Stage 8: dark copy of the headline (under the photo)
  const oppWhiteRef = useRef(null); // Stage 8: white/purple copy of the headline (over the photo)
  const title1Ref = useRef(null); // WHITE copy (above the video, clipped to the video's rectangle)
  const title1BlackRef = useRef(null); // BLACK copy (under the video, so only the part outside it shows)
  const whiteClipRef = useRef(null); // full-screen wrapper whose clip-path follows the video
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);
  const logoWrapRef = useRef(null);
  const bgColorRef = useRef(null);
  const scrollHintRef = useRef(null);
  const overlayRef = useRef(null); // dark overlay between the video and the headline
  const oppImgOverlayRef = useRef(null); // dark overlay over the box's Stage 8 photos
  const introPlayedRef = useRef(false); // title 1's load-in only plays once (not on resize rebuilds)

  // Both arrays are filled by index (0 = video, 1+ = icons, same order as
  // the layouts), so they stay correct even if React re-runs the ref callbacks.
  //  - tileRefs:  the tile itself (size, clipping, shadow). Position/scale/
  //               opacity are written every frame by applyLayout() below.
  //  - driftRefs: an outer wrapper around each tile that only does the tiny,
  //               continuous "floating" circle. Because it's a separate
  //               ancestor, it moves the whole tile (box, shadow, rounded
  //               corners and content together).
  const tileRefs = useRef([]);
  const driftRefs = useRef([]);

  useLayoutEffect(() => {
    let ctx;
    let stopDrift = () => {};
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const build = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 640;
      // How far (px) a tile's edge must stay from the screen edge while orbiting.
      // Slightly bigger than the drift radius so the float never pokes out either.
      const edgeMargin = mobile ? 24 : 32;
      const scatter = getScatterPositions();

      const els = tileRefs.current.filter(Boolean); // [video, ...icons]

      // One plain-object "state" per tile. The timeline tweens THESE numbers
      // (base position, size, opacity, scale...) instead of the DOM elements,
      // and applyLayout() turns them into transforms once per frame. That way
      // the orbit, the clamping and the scroll choreography are all resolved in
      // one place — nothing fights over the element's transform.
      const tiles = els.map((el, i) => {
        if (i === 0) {
          // The video starts as a true full-bleed layer.
          return { el, w: vw, h: vh, x: 0, y: 0, scale: 1, opacity: 1, radius: 0, arrived: 1 };
        }
        const target = scatterFor(scatter.icons, i - 1);
        const start = entryStart(target);
        return {
          el,
          w: target.w,
          h: target.h,
          x: start.x,
          y: start.y,
          scale: 0.85,
          opacity: 0,
          radius: 0,
          arrived: 0, // 0 = still sliding in from off-screen, 1 = in its slot
        };
      });
      const video = tiles[0];
      const icons = tiles.slice(1);

      // angle:      how far the collage has swung around the centre (radians).
      // keepInside: 1 while orbiting (tiles are squeezed to stay on screen),
      //             eased to 0 at the end so tiles return to their exact
      //             scatter positions.
      const orbit = { angle: 0, keepInside: 1 };

      // Target position for a tile in Stage 5 — the scattered layout, nudged
      // by STAGE5_PULL. Shared by Stage 5 and Stage 6.
      const stage5Target = (i) => {
        const t = i === 0 ? scatter.video : scatterFor(scatter.icons, i - 1);
        return { x: t.x * STAGE5_PULL, y: t.y * STAGE5_PULL };
      };

      // Runs on every timeline update. For each tile:
      //  1. rotate its base position around the screen centre. The rotation is
      //     done in viewport-normalised space, so the path is an ellipse that
      //     matches the screen's aspect ratio instead of a circle that would
      //     swing corner tiles far past the top/bottom edges.
      //  2. if the rotated position would put the tile outside the screen,
      //     shrink its distance from the centre until it fits. A 4-norm
      //     ("squircle") distance is used so the tile glides along the screen
      //     edge smoothly instead of sliding along a hard rectangle, and a soft
      //     max avoids a sudden kink at the moment it touches the limit.
      //  Tiles are never rotated themselves, so their content always stays upright.
      const halfW = vw / 2;
      const halfH = vh / 2;
      const applyLayout = () => {
        const cos = Math.cos(orbit.angle);
        const sin = Math.sin(orbit.angle);
        let vx = 0;
        let vy = 0;

        for (let i = 0; i < tiles.length; i++) {
          const t = tiles[i];

          const nx = t.x / halfW;
          const ny = t.y / halfH;
          const rx = (nx * cos - ny * sin) * halfW;
          const ry = (nx * sin + ny * cos) * halfH;

          const limX = Math.max(halfW - t.w / 2 - edgeMargin, 1);
          const limY = Math.max(halfH - t.h / 2 - edgeMargin, 1);
          const g = Math.pow((rx / limX) ** 4 + (ry / limY) ** 4, 0.25); // >1 = outside
          const over = 0.5 * (g - 1 + Math.sqrt((g - 1) ** 2 + 0.01)); // smooth max(g - 1, 0)
          const k = 1 + over * t.arrived * orbit.keepInside;

          const vars = {
            x: rx / k,
            y: ry / k,
            scale: t.scale,
            opacity: t.opacity,
            force3D: true,
          };
          if (i === 0) {
            vars.width = t.w;
            vars.height = t.h;
            vars.borderRadius = t.radius;
            vx = vars.x;
            vy = vars.y;
          }
          gsap.set(t.el, vars);
        }

        // Clip the white headline to the video's current rectangle. Inside the
        // video the white copy shows; outside it is cut away, revealing the
        // black copy underneath.
        const clip = whiteClipRef.current;
        if (clip) {
          const v = tiles[0];
          const left = Math.max(halfW + vx - v.w / 2, 0);
          const right = Math.max(vw - (halfW + vx + v.w / 2), 0);
          const top = Math.max(halfH + vy - v.h / 2, 0);
          const bottom = Math.max(vh - (halfH + vy + v.h / 2), 0);
          clip.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${v.radius}px)`;
        }
      };

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(rootRef);

        // Every tile — video included — is centre-anchored (xPercent/yPercent -50)
        // inside the orbit group, then positioned with an x/y px offset on top.
        gsap.set(els, { position: 'absolute', top: 0, left: 0, xPercent: -50, yPercent: -50 });
        gsap.set(els.slice(1), {
          width: (i) => tiles[i + 1].w,
          height: (i) => tiles[i + 1].h,
        });

        // Headline words. The title containers now stay fully visible for the
        // whole sequence; only their individual words fade, so each word can
        // stagger in/out on its own.
        const words1White = getWords(title1Ref.current);
        const words1Black = getWords(title1BlackRef.current);
        const words1Layers = [words1White, words1Black];
        const words2 = getWords(title2Ref.current);
        const words3 = getWords(title3Ref.current);

        // Opportunity box pieces
        const stage = stageRef.current;
        const oppBox = oppBoxRef.current;
        const oppNewWords = getWords(oppNewRef.current);
        const oppWords = getWords(oppHeadRef.current);
        const oppFill = q('[data-fill]');
        const oppBar = q('[data-bar]');
        const oppLabel = q('[data-label]');
        const oppMarks = q('[data-mark]');
        const noteLines = q('[data-note-line]');
        const noteTexts = q('[data-note-text]');

        // Stage 8 pieces. Each word is [darkLayerWords, lightLayerWords] so a
        // single tween drives both copies of the text in sync.
        // wordSets[i] -> the i-th word of OPP_WORDS.
        const s8Layers = [oppBlackRef.current, oppWhiteRef.current];
        const s8Group = (g) =>
          s8Layers.map((el) => gsap.utils.toArray(`[data-grp="${g}"] [data-word]`, el));
        const wordSets = OPP_WORDS.map((_, i) => s8Group(`w${i}`));
        const lineBlocks = q('[data-lines]'); // both copies of the 3-line block
        const imgs = q('[data-img]'); // one photo per word, in OPP_IMAGES order

        // Text/logo are centred with gsap's own xPercent/yPercent (instead of
        // Tailwind translate classes) so gsap and CSS never disagree about the
        // element's transform.
        gsap.set([title1Ref.current, title1BlackRef.current], { yPercent: -50, y: 0, opacity: 1 });
        gsap.set(title2Ref.current, { xPercent: -50, yPercent: -50, y: 0, opacity: 1 });
        gsap.set(title3Ref.current, { xPercent: -50, yPercent: -50, y: 0, opacity: 1 });
        gsap.set(words2, { opacity: 0, y: 14 });
        gsap.set(words3, { opacity: 0, y: 14 });
        // Title 1 starts hidden only if its load-in is about to play.
        const playIntro = !introPlayedRef.current && !reduceMotion;
        words1Layers.forEach((w) => gsap.set(w, { opacity: playIntro ? 0 : 1, y: playIntro ? 18 : 0 }));

        gsap.set(logoWrapRef.current, { xPercent: -50, yPercent: -50, y: 0, scale: 0.2, opacity: 0 });
        gsap.set(scrollHintRef.current, { opacity: playIntro ? 0 : 1 });
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(bgColorRef.current, { backgroundColor: CREAM });

        // Opportunity box: start state. The box is small (scaled from its bottom
        // centre) and parked just below the screen. Stage 7 rises it to the
        // centre while scaling it up to full size. The purple bar starts at
        // height 0 and grows in two steps: to the first line, then to the top.
        gsap.set(stage, { yPercent: 0 });
        const boxH = oppBox.offsetHeight;
        gsap.set(oppBox, {
          transformOrigin: '50% 100%',
          scale: 0.3,
          y: vh / 2 - boxH / 2 + 24, // bottom edge just under the screen's bottom
          force3D: true,
        });
        gsap.set(oppFill, { opacity: 1 });
        gsap.set(oppLabel, { opacity: 0 });
        gsap.set(oppMarks, { opacity: 0 });
        gsap.set(oppBar, { height: '0%', opacity: 1 });
        gsap.set(oppWords, { opacity: 0, y: 14 });
        gsap.set(oppNewWords, { opacity: 0, y: 14 });
        gsap.set(noteLines, { scaleX: 0 });
        gsap.set(noteTexts, { opacity: 0, x: -6 });

        // Stage 8 start state: photo 1 is fully hidden (it will rise from the
        // bottom of the box), photos 2+ are transparent (they cross-fade in
        // one by one), all headline words are hidden, and the 3-line block
        // sits one line low so that the first word alone is vertically
        // centred. It then slides up as the 2nd and 3rd words arrive.
        gsap.set(imgs[0], { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(imgs.slice(1), { opacity: 0 });
        // Dark overlay over the box photos — hidden until the first photo
        // rises in, then stays on for the rest of Stage 8 so the white/purple
        // words stay readable against every photo that cross-fades in.
        gsap.set(oppImgOverlayRef.current, { opacity: 0 });
        gsap.set(wordSets.flat(2), { opacity: 0, y: 20 });
        gsap.set(lineBlocks, { yPercent: 100 / 3 });

        applyLayout();

        // Intro (time-based, not scroll-based): title 1's words fade up one by
        // one on page load. Plays once; the scroll timeline below uses
        // immediateRender:false on the same words so the two never fight.
        if (playIntro) {
          introPlayedRef.current = true;
          const intro = gsap.timeline({ delay: 0.25 });
          words1Layers.forEach((w) =>
            intro.to(w, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08 }, 0)
          );
          intro.to(scrollHintRef.current, { opacity: 1, duration: 0.6 }, 0.6);
        }

        const tl = gsap.timeline({
          defaults: { ease: 'sine.inOut' },
          onUpdate: applyLayout,
        });

        // Stage 1 (0–0.5): short hold on the full-bleed video + title 1 — this is the start state.

        // Stage 2a (0.5–1.7): ONLY the video scales down. The headline does not move
        // or fade. Because the white copy is clipped to the video's rectangle (see
        // applyLayout), the letters still over the video stay white while the
        // parts poking out over the page show the black copy underneath.
        tl.to(
          video,
          { w: vw * VIDEO_SHRINK_W, h: vh * VIDEO_SHRINK_H, radius: 14, duration: 1.2 },
          0.5
        ).to(scrollHintRef.current, { opacity: 0, duration: 0.6 }, 0.5);

        // Hold (1.7–2.3): the two-tone headline sits still so it can be read.

        // Everything below used to start at 1.2; it now starts `shift` later,
        // after the shrink and the (shortened) hold.
        const tOut = 2.3; // headline begins to fade out, collage begins to arrive
        const shift = tOut - 1.2;

        // Stage 2b: the headline's words fade out one after another
        // (8 words: 7 * 0.06 + 0.5 ≈ 0.92) in both layers, together with the dark
        // overlay, so the small video card isn't left dimmed. The collage tiles
        // start sliding in from the screen edges.
        words1Layers.forEach((w) =>
          tl.fromTo(
            w,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -30,
              duration: 0.5,
              stagger: T1_OUT_STAGGER,
              ease: 'power1.in',
              immediateRender: false,
            },
            tOut
          )
        );
        tl.to(overlayRef.current, { opacity: 0, duration: 0.8 }, tOut).to(
          icons,
          {
            x: (i) => scatterFor(scatter.icons, i).x,
            y: (i) => scatterFor(scatter.icons, i).y,
            opacity: 1,
            scale: 1,
            arrived: 1,
            duration: 1.6,
            stagger: 0.07,
            ease: 'power2.out',
          },
          1.3 + shift
        );

        // Stage 2c: the video keeps receding, continuing smoothly into its
        // collage slot (top-left) so it blends into the scatter.
        tl.to(
          video,
          {
            w: scatter.video.w,
            h: scatter.video.h,
            x: scatter.video.x,
            y: scatter.video.y,
            radius: 20,
            duration: 1.6,
          },
          2.3 + shift
        );

        // Orbit: the whole collage orbits the screen centre. The angle
        // eases in and out, so the swing starts gently and coasts to a complete
        // stop exactly on the scatter layout (whole turns => same spot).
        // `keepInside` is released in the last 0.8s so tiles glide back to their
        // exact layout positions instead of snapping.
        tl.to(orbit, { angle: TAU * ORBIT_TURNS, duration: 6.5, ease: 'sine.inOut' }, 1.2 + shift).to(
          orbit,
          { keepInside: 0, duration: 0.8 },
          6.9 + shift
        );

        // Stage 3: the logo sits behind the video, so it grows in as the video
        // moves out of the centre toward its slot.
        tl.to(logoWrapRef.current, { opacity: 1, scale: 1, duration: 1.6 }, 2.3 + shift);

        // Stage 4: the background eases into purple, and the logo fades out.
        tl.to(bgColorRef.current, { backgroundColor: PURPLE, duration: 1.8 }, 6.1 + shift).to(
          logoWrapRef.current,
          { opacity: 0, scale: 0.85, duration: 1.1 },
          6.1 + shift
        );

        // Stage 5: the orbit has come to rest, so tiles settle to their
        // sides while the second headline reveals itself word by word
        // (17 words: 16 * 0.07 + 0.6 ≈ 1.7).
        tl.to(
          tiles,
          {
            x: (i) => stage5Target(i).x,
            y: (i) => stage5Target(i).y,
            scale: 0.9,
            duration: 1.6,
            stagger: 0.04,
          },
          7.7 + shift
        ).to(
          words2,
          {
            opacity: 1,
            y: 0,
            duration: WORD_FADE,
            stagger: T2_IN_STAGGER,
            ease: 'power2.out',
          },
          8.1 + shift
        );

        // Hold: the complete second headline sits still (shortened).

        // Stage 6: tiles slide out to the left/right edges and fade,
        // the second headline's words fade in reading order, then the closing
        // line fades in word by word.
        tl.to(
          tiles,
          {
            x: (i) => (stage5Target(i).x >= 0 ? 1 : -1) * (vw / 2 + tiles[i].w),
            opacity: 0,
            duration: 1.3,
            stagger: 0.02,
            ease: 'power2.in',
          },
          10.6 + shift
        )
          .to(
            words2,
            {
              opacity: 0,
              y: -20,
              duration: 0.5,
              stagger: T2_OUT_STAGGER,
              ease: 'power1.in',
            },
            10.6 + shift
          )
          .to(
            words3,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: T3_IN_STAGGER,
              ease: 'power2.out',
            },
            11.1 + shift
          );

        /* ------------------------------------------------------------------ */
        /* Stage 7 — the purple hero slides up while the box grows from below  */
        /* ------------------------------------------------------------------ */
        // The whole purple stage moves up, revealing the light page. At the same
        // time the WHOLE box rises from the bottom of the screen to the centre
        // and scales up from small to full size. Then the purple bar grows to
        // the first line, and on further scroll all the way up to the top.
        //
        // exitAt: a short beat after "#1 Platform for Coaches" has fully appeared.
        const exitAt = 12.4 + shift;

        tl.to(words3, { opacity: 0, y: -20, duration: 0.5, stagger: 0.05, ease: 'power1.in' }, exitAt)
          .to(stage, { yPercent: -100, duration: 2.6, ease: 'none' }, exitAt)
          // box: bottom -> centre while scaling up
          .to(oppBox, { y: 0, scale: 1, duration: 2.6, ease: 'power2.out' }, exitAt)
          .to(oppMarks, { opacity: 1, duration: 0.5, ease: 'none' }, exitAt + 2.0)
          .to(oppLabel, { opacity: 1, duration: 0.5, ease: 'power1.out' }, exitAt + 2.0);

        // Step 1: purple bar rises to the first line + annotations + headline.
        tl.to(oppBar, { height: `${BAR_PCT}%`, duration: 0.8, ease: 'power2.out' }, exitAt + 2.6)
          .to(noteLines, { scaleX: 1, duration: 0.5, stagger: 0.25, ease: 'power2.out' }, exitAt + 2.7)
          .to(noteTexts, { opacity: 1, x: 0, duration: 0.5, stagger: 0.25, ease: 'power2.out' }, exitAt + 3.1)
          .to(oppWords, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, exitAt + 3.0);

        // Step 2 (further scroll): the purple grows on up to the top,
        // then the headline fades out and the new text replaces it in place.
        tl.to(oppBar, { height: '100%', duration: 1.3, ease: 'power2.inOut' }, exitAt + 4.4)
          // the headline's words fade out...
          .to(oppWords, { opacity: 0, y: -14, duration: 0.4, stagger: 0.04, ease: 'power1.in' }, exitAt + 5.0)
          // ...and the new text is written over the same spot
          .to(oppNewWords, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, exitAt + 5.6);

        /* ------------------------------------------------------------------ */
        /* Stage 8 — one photo per word, two-tone text shows                   */
        /* ------------------------------------------------------------------ */
        // 1. photo 1 rises from the bottom of the box and covers the bar,
        //    headline and new text; the annotations fade out (label + "+"
        //    marks stay). The first word appears on it.
        // 2. every next word arrives together with its OWN photo, which
        //    cross-fades over the previous one:
        //      word 2 -> photo 2, word 3 -> photo 3, word 4 -> photo 4.
        //    Each word is a dark copy under the photo + a white/purple copy over
        //    it, so the letters change colour exactly at the box edge.
        // 3. the 3-line text block slides up one half-line per new word so the
        //    visible lines stay vertically centred.
        const s8 = exitAt + 6.6;
        const STEP = 1.0; // scroll distance between one word/photo and the next
        const first = s8 + 1.3; // when the first word appears
        const reveal = (layers, at) =>
          layers.forEach((w) =>
            tl.to(w, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, at)
          );

        tl.to(imgs[0], { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power2.inOut' }, s8)
          .to(oppImgOverlayRef.current, { opacity: 1, duration: 1.4, ease: 'power2.inOut' }, s8)
          .to(noteTexts, { opacity: 0, duration: 0.4 }, s8)
          .to(noteLines, { scaleX: 0, duration: 0.4 }, s8)
          .to(oppBar, { opacity: 0, duration: 0.3 }, s8 + 1.4); // clean-up under the photo

        reveal(wordSets[0], first);

        // Words 2..4, each with its own photo.
        wordSets.slice(1).forEach((layers, k) => {
          const at = first + STEP * (k + 1);
          tl.to(imgs[k + 1], { opacity: 1, duration: 1.0 }, at - 0.2);
          reveal(layers, at);
        });

        // Keep the stacked lines centred: 1 line -> 2 lines -> 3 lines.
        tl.to(lineBlocks, { yPercent: 100 / 6, duration: 0.8, ease: 'power2.out' }, first + STEP - 0.2).to(
          lineBlocks,
          { yPercent: 0, duration: 0.8, ease: 'power2.out' },
          first + STEP * 2 - 0.2
        );

        // End hold: the finished box stays on screen briefly before the page scrolls on.
        tl.to({}, { duration: 0.4 }, first + STEP * 3 + 0.6);

        ScrollTrigger.create({
          animation: tl,
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6, // snappier response (was 1.2)
        });

        // Slow float: each tile's outer wrapper traces a small circle, independent
        // of scroll. One shared, time-based ticker callback (instead of one tween
        // per tile) — cheap, and it never drifts out of sync.
        if (!reduceMotion) {
          const drift = driftRefs.current.filter(Boolean).map((el, i) => ({
            el,
            radius: gsap.utils.random(10, 20),
            speed: (TAU / gsap.utils.random(6, 10)) * (i % 2 === 0 ? 1 : -1),
            phase: gsap.utils.random(0, TAU),
          }));
          const tick = (time) => {
            for (let i = 0; i < drift.length; i++) {
              const d = drift[i];
              const a = d.phase + d.speed * time;
              gsap.set(d.el, { x: Math.cos(a) * d.radius, y: Math.sin(a) * d.radius, force3D: true });
            }
          };
          gsap.ticker.add(tick);
          stopDrift = () => gsap.ticker.remove(tick);
        }
      }, rootRef);
    };

    const destroy = () => {
      stopDrift();
      stopDrift = () => {};
      ctx && ctx.revert();
    };

    build();

    // Everything above is computed from the viewport size, so on a real resize
    // (not just a mobile URL-bar collapse) tear down and rebuild.
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w === lastW && Math.abs(h - lastH) < 150) return;
        lastW = w;
        lastH = h;
        destroy();
        build();
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      destroy();
    };
  }, []);

  return (
    <>
      {/* Scroll-distance wrapper — height controls how long the sequence takes
          to play out. The timeline is now ≈ 24 units long, so the wrapper is
          shorter than before (was 1450vh / 1880vh). If it feels rushed, raise
          these values (e.g. sm:h-[1300vh]) before touching the timeline.
          Shorter on mobile so the same beats land in less scroll distance on a
          small screen. */}
      <div ref={rootRef} className="relative h-[850vh] sm:h-[1100vh]">
        <section className="sticky top-0 h-screen w-full overflow-hidden">
          {/* LAYER 0 — the light page. It sits under everything and is revealed
              when the purple stage slides up. */}
          <div className="absolute inset-0 z-0" style={{ background: PAPER }} />

          {/* LAYER 1 — the whole hero ("stage"). In Stage 7 this entire block
              slides up and out of the screen. */}
          <div ref={stageRef} className="absolute inset-0 z-[1] will-change-transform">
            {/* Background color layer — cream/white throughout the intro (never
                black), easing to purple later. */}
            <div ref={bgColorRef} className="absolute inset-0 z-0" style={{ background: CREAM }} />

            {/* Orbit group — video tile + icon tiles all live in here, all sharing
                the same centre-anchored transform system. */}
            <div className="absolute left-1/2 top-1/2 z-[4] h-0 w-0">
              {/* Video tile. Outer div is the float wrapper; inner div is the actual
                  tile. To make the video float like the other tiles, add
                  ref={(el) => (driftRefs.current[0] = el)} to the outer div. */}
              <div className="absolute left-0 top-0">
                <div
                  ref={(el) => (tileRefs.current[0] = el)}
                  className="overflow-hidden will-change-transform shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
                >
                  <video
                    src={bgVideo}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  {/* Dark overlay — sits between the video and the headline.
                      Change bg-black/40 to make it lighter (/30) or darker (/60). */}
                  <div ref={overlayRef} className="pointer-events-none absolute inset-0 bg-black/60" />
                </div>
              </div>

              {/* Collage tiles — placeholder photos requested at each tile's own
                  aspect ratio, scattered per the layouts above. Same outer-wrapper /
                  inner-tile split as the video, for the same reason. */}
              {CARD_DATA.map((card, i) => (
                <div className="absolute left-0 top-0" key={card.seed} ref={(el) => (driftRefs.current[i + 1] = el)}>
                  <div
                    ref={(el) => (tileRefs.current[i + 1] = el)}
                    className="overflow-hidden will-change-transform shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                  >
                    <img
                      src={`https://picsum.photos/seed/${card.seed}/640/${Math.round(640 / card.ar)}`}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Logo — sits BEHIND the video/collage (lower z-index than the orbit
                group), so it's revealed as the video moves out of the centre and
                never draws on top of it. Centred / scaled / faded by gsap. */}
            <div
              ref={logoWrapRef}
              className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[180px] w-[180px] will-change-transform sm:h-[200px] sm:w-[200px]"
            >
              <img src={logo} alt="logo" className="h-full w-full object-contain" draggable={false} />
            </div>

            {/* Title 1, BLACK copy — sits UNDER the video (z-3 vs the orbit group's
                z-4), so it's hidden wherever the video covers it and visible only
                where the shrinking video has left the page background showing. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3]">
              <div ref={title1BlackRef} className={`${TITLE1_CLASS} text-[#150a24]`}>
                <Title1Lines />
              </div>
            </div>

            {/* Title 1, WHITE copy — sits ABOVE the video, inside a full-screen
                wrapper whose clip-path is set every frame to the video's rectangle
                (see applyLayout). So it's white over the video and cut away outside
                it, where the black copy shows through. */}
            <div ref={whiteClipRef} className="pointer-events-none absolute inset-0 z-[5]">
              <h1 ref={title1Ref} className={`${TITLE1_CLASS} text-white`}>
                <Title1Lines />
              </h1>
            </div>

            {/* Title 2 — headline over the purple field. Words reveal one by one
                in Stage 5, hold, then fade out in reading order in Stage 6. */}
            <h2
              ref={title2Ref}
              className="absolute left-1/2 top-1/2 z-[5] w-[min(920px,88vw)] text-center font-[Inter_Tight,sans-serif] text-[clamp(1.4rem,5.2vw,3.4rem)] font-semibold leading-[1.2] text-[#150a24] sm:w-[min(920px,82vw)] sm:text-[clamp(1.7rem,4.2vw,3.4rem)] sm:leading-[1.15]"
            >
              <Words text="Stop juggling apps. Manage clients, programs, payments, and messages in one platform built to scale." />
            </h2>

            {/* Title 3 — closing line. Words fade in one by one and then hold. */}
            <h2
              ref={title3Ref}
              className="absolute left-1/2 top-1/2 z-[5] whitespace-nowrap font-[Space_Grotesk,sans-serif] text-[clamp(1.3rem,4.5vw,2.4rem)] font-medium text-[#150a24]"
            >
              <Words text="#1 Platform for Coaches" />
            </h2>

            {/* Scroll hint */}
            <div
              ref={scrollHintRef}
              className="absolute bottom-[6%] left-[5%] z-[5] flex items-center gap-2 text-xs text-white/75 sm:text-sm"
            >
              ↓ Scroll for more
            </div>
          </div>

          {/* LAYER 0.5 — the opportunity box. It sits BEHIND the purple stage
              (stage is z-[1]), so nothing of it shows while the purple covers
              the screen. As the purple slides up, the box is uncovered from the
              bottom. The box itself (see oppBoxRef) is scaled and moved by the
              timeline: it starts small below the screen and rises to the centre
              while growing. */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            {/* Section label — left on desktop, top-left on mobile */}
            <p
              data-label
              className="absolute left-[4%] top-[9%] font-serif text-[11px] uppercase tracking-[0.08em] sm:top-1/2 sm:-translate-y-1/2 sm:text-sm"
              style={{ color: INK }}
            >
              {OPP_LABEL}
            </p>

            {/* The box. Width/height are relative, so it scales on every screen.
                [container-type:inline-size] makes it a size container so the
                Stage 8 headline can size itself in cqw (relative to the box). */}
            <div
              ref={oppBoxRef}
              className="relative h-[min(34rem,64vh)] w-[44vw] max-w-[22rem] will-change-transform sm:w-[min(22rem,28vw)] [container-type:inline-size]"
            >
              {/* solid light card */}
              <div data-fill className="absolute inset-0 rounded-[4px]" style={{ background: PAPER }} />

              {/* purple bar: grows to the first line, then on to the full height */}
              <div
                data-bar
                className="absolute bottom-0 left-0 w-full rounded-[4px]"
                style={{ background: PURPLE }}
              />

              {/* headline + new text share the SAME spot (one grid cell). The new
                  text overwrites the headline once the bar reaches the top. */}
              <div
                className="absolute bottom-0 left-0 grid w-full items-center px-[7%]"
                style={{ height: `${BAR_PCT}%` }}
              >
                <h3
                  ref={oppHeadRef}
                  className="col-start-1 row-start-1 font-[Inter_Tight,sans-serif] text-[clamp(0.95rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-tight"
                  style={{ color: INK }}
                >
                  <Words text={OPP_HEADLINE} cls="" />
                </h3>
                <p
                  ref={oppNewRef}
                  className="col-start-1 row-start-1 font-[Inter_Tight,sans-serif] text-[clamp(0.95rem,2vw,1.6rem)] font-medium leading-[1.2] tracking-tight"
                  style={{ color: INK }}
                >
                  <Words text={OPP_NEW_TEXT} cls="" />
                </p>
              </div>

              {/* The four outline edges — static now; the clip-path reveals them */}
              <span data-edge="top" className="absolute left-0 top-0 h-[2px] w-full bg-[#9d9aa5]" />
              <span data-edge="right" className="absolute right-0 top-0 h-full w-[2px] bg-[#9d9aa5]" />
              <span data-edge="bottom" className="absolute bottom-0 right-0 h-[2px] w-full bg-[#9d9aa5]" />
              <span data-edge="left" className="absolute bottom-0 left-0 h-full w-[2px] bg-[#9d9aa5]" />

              {/* Stage 8 — DARK copy of the headline. Sits under the photo, so
                  only the part poking out of the box is visible (black). */}
              <div ref={oppBlackRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
                <OppTitle />
              </div>

              {/* Stage 8 — photo layer, clipped to the box. One photo per word
                  (OPP_IMAGES): photo 1 rises from the bottom (clip-path), the
                  others cross-fade over it in DOM order. The WHITE/purple copy
                  of the headline sits on top of the photos. */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[4px]">
                {OPP_IMAGES.map((src, i) => (
                  <img
                    key={src}
                    data-img
                    src={src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                ))}
                {/* Dark overlay over the photos, so the white/purple headline
                    stays legible against every photo that cross-fades in.
                    Fades in with the first photo (see the timeline) and then
                    stays on for the rest of Stage 8 — it never touches the
                    video's own overlay (overlayRef), which is a separate ref. */}
                <div ref={oppImgOverlayRef} className="absolute inset-0 bg-black/40" />
                <div ref={oppWhiteRef} className="absolute inset-0">
                  <OppTitle light />
                </div>
              </div>

              {/* corner "+" marks */}
              <span data-mark className="absolute -left-4 -top-4 text-sm leading-none" style={{ color: INK }}>
                +
              </span>
              <span data-mark className="absolute -bottom-4 -right-4 text-sm leading-none" style={{ color: INK }}>
                +
              </span>

              {/* annotations: top of box = "with us", top of purple bar = "today" */}
              <Annotation top="0%" value={NOTE_TOP.value} sub={NOTE_TOP.sub} />
              <Annotation top={`${100 - BAR_PCT}%`} value={NOTE_NOW.value} sub={NOTE_NOW.sub} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}