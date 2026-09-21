import { Fragment, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------------- */
/* Tunables                                                               */
/* ---------------------------------------------------------------------- */
const PURPLE = '#c9a5f2'; // same purple the hero fades to
const INK = '#150a24';
const PAPER = '#fafaf9';

const TOTAL_TWH = 51; // 2050  -> full height of the box
const NOW_TWH = 27; // 2024  -> height of the purple bar
const BAR_PCT = (NOW_TWH / TOTAL_TWH) * 100; // ≈ 52.9%

// Where the purple area's bottom edge is (as a fraction of the screen height,
// measured from the top) at the moment the box starts drawing.
// 1 = the purple's bottom edge is still at the very bottom of the screen, i.e.
//     the box starts the instant the purple begins to move up (both animations
//     run together). Lower it (0.5 = screen centre) to start later.
const START_AT = 1;

const HEADLINE = 'The world’s demand for electricity will double by 2050.';

function Words({ text }) {
  const words = text.split(' ');
  return words.map((w, i) => (
    <Fragment key={i}>
      <span data-word className="inline-block will-change-transform">
        {w}
      </span>
      {i < words.length - 1 ? ' ' : null}
    </Fragment>
  ));
}

/* One annotation: a tick line pointing at the box edge + a two-line label. */
function Annotation({ id, top, value, sub }) {
  return (
    <div
      data-note={id}
      className="absolute left-full flex -translate-y-1/2 items-center"
      style={{ top }}
    >
      {/* the line grows out of the box edge */}
      <span
        data-note-line
        className="relative block h-px w-6 origin-left bg-[#150a24] sm:w-14"
      >
        <span className="absolute -left-px top-1/2 h-2 w-px -translate-y-1/2 bg-[#150a24]" />
        <span className="absolute -right-px top-1/2 h-2 w-px -translate-y-1/2 bg-[#150a24]" />
      </span>
      <span data-note-text className="ml-2 text-[11px] leading-tight text-[#150a24] sm:ml-3 sm:text-base">
        <b className="block font-semibold">{value}</b>
        <span className="block">{sub}</span>
      </span>
    </div>
  );
}

export default function OpportunitySection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);

      const top = q('[data-edge="top"]');
      const right = q('[data-edge="right"]');
      const bottom = q('[data-edge="bottom"]');
      const left = q('[data-edge="left"]');
      const fill = q('[data-fill]');
      const bar = q('[data-bar]');
      const words = q('[data-word]');
      const label = q('[data-label]');
      const marks = q('[data-mark]');
      const noteLines = q('[data-note-line]');
      const noteTexts = q('[data-note-text]');

      // start state (everything hidden / collapsed)
      gsap.set(top, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(right, { scaleY: 0, transformOrigin: '50% 0%' });
      gsap.set(bottom, { scaleX: 0, transformOrigin: '100% 50%' });
      gsap.set(left, { scaleY: 0, transformOrigin: '50% 100%' });
      gsap.set(fill, { opacity: 0 });
      gsap.set(bar, { scaleY: 0, transformOrigin: '50% 100%' });
      gsap.set(words, { opacity: 0, y: 14 });
      gsap.set(label, { opacity: 0 });
      gsap.set(marks, { opacity: 0 });
      gsap.set(noteLines, { scaleX: 0 });
      gsap.set(noteTexts, { opacity: 0, x: -6 });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      // Time 0 = the instant the purple's bottom edge starts moving up (see
      // START_AT / ScrollTrigger below). The box layer is pinned at the screen
      // centre, in front of the hero, so it is visible over the purple straight
      // away: the light card fades in first, then its outline is drawn as ONE
      // continuous line: top edge (left → right), right edge (down), bottom
      // edge (right → left), left edge (up).
      tl.to(fill, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 0)
        .to(label, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 0)
        .to(marks, { opacity: 1, duration: 0.4 }, 0)
        .to(top, { scaleX: 1, duration: 0.8 }, 0.1)
        .to(right, { scaleY: 1, duration: 0.9 }, 0.9)
        .to(bottom, { scaleX: 1, duration: 0.8 }, 1.8)
        .to(left, { scaleY: 1, duration: 0.9 }, 2.6)
        // purple bar rises (27k = 53% of 51k)
        .to(bar, { scaleY: 1, duration: 1.0, ease: 'power2.out' }, 3.7)
        // headline, word by word
        .to(words, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, 4.3)
        // annotations draw out of the box edge
        .to(noteLines, { scaleX: 1, duration: 0.6, stagger: 0.3, ease: 'power2.out' }, 3.9)
        .to(noteTexts, { opacity: 1, x: 0, duration: 0.5, stagger: 0.3, ease: 'power2.out' }, 4.3)
        // hold so the finished box stays on screen before un-pinning
        .to({}, { duration: 1 }, 5.5);

      if (reduceMotion) {
        tl.progress(1).pause();
        return;
      }

      ScrollTrigger.create({
        animation: tl,
        trigger: rootRef.current,
        // The wrapper's top edge is exactly where the hero's bottom edge is when
        // the hero un-pins (both at the viewport top). Scrolling (1 - START_AT)
        // of the viewport further puts the purple's bottom edge START_AT of the
        // way down the screen, which is where the box starts to draw.
        start: `top -${(1 - START_AT) * 100}%`,
        end: 'bottom bottom',
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    /*
      Outer wrapper: pulled up by one screen (-mt-[100vh]) so it sits BEHIND the
      hero's last screen. When the hero un-pins and scrolls up, the light
      background is already there underneath it.
      No z-index / transform here, so the two layers below share the hero's
      stacking context.
    */
    <div ref={rootRef} className="pointer-events-none relative -mt-[100vh] h-[560vh] sm:h-[600vh]">
      {/* Layer 1 (behind the hero): the light page background, pinned. */}
      <div className="sticky top-0 z-0 h-screen w-full" style={{ background: PAPER }} />

      {/* Layer 2 (in front of the hero): the box, so it can straddle the purple
          edge while the hero is leaving. Pulled up over layer 1 and pinned too. */}
      <div className="sticky top-0 z-20 -mt-[100vh] flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Section label — sits left on desktop, top-left on mobile */}
        <p
          data-label
          className="absolute left-[4%] top-[9%] font-serif text-[11px] uppercase tracking-[0.08em] sm:top-1/2 sm:-translate-y-1/2 sm:text-sm"
          style={{ color: INK }}
        >
          The opportunity ahead
        </p>

        {/* The box. Width/height are relative, so it scales on every screen. */}
        <div className="relative h-[min(34rem,64vh)] w-[58vw] max-w-[31rem] sm:w-[min(31rem,42vw)]">
          {/* solid card that fades in once the outline is complete */}
          <div
            data-fill
            className="absolute inset-0 rounded-[4px]"
            style={{ background: PAPER }}
          />

          {/* purple bar = 27k of 51k */}
          <div
            data-bar
            className="absolute bottom-0 left-0 w-full rounded-b-[4px]"
            style={{ height: `${BAR_PCT}%`, background: PURPLE }}
          />

          {/* headline, sits inside the purple bar */}
          <div
            className="absolute bottom-0 left-0 flex w-full items-center px-[7%]"
            style={{ height: `${BAR_PCT}%` }}
          >
            <h3
              className="font-[Inter_Tight,sans-serif] text-[clamp(1.05rem,2.6vw,2.1rem)] font-medium leading-[1.2] tracking-tight"
              style={{ color: INK }}
            >
              <Words text={HEADLINE} />
            </h3>
          </div>

          {/* The four outline edges — drawn one after another by the timeline */}
          <span data-edge="top" className="absolute left-0 top-0 h-[2px] w-full bg-[#9d9aa5]" />
          <span data-edge="right" className="absolute right-0 top-0 h-full w-[2px] bg-[#9d9aa5]" />
          <span data-edge="bottom" className="absolute bottom-0 right-0 h-[2px] w-full bg-[#9d9aa5]" />
          <span data-edge="left" className="absolute bottom-0 left-0 h-full w-[2px] bg-[#9d9aa5]" />

          {/* corner "+" marks */}
          <span data-mark className="absolute -left-4 -top-4 text-sm leading-none" style={{ color: INK }}>+</span>
          <span data-mark className="absolute -bottom-4 -right-4 text-sm leading-none" style={{ color: INK }}>+</span>

          {/* annotations: top of box = 51k, top of purple bar = 27k */}
          <Annotation id="a" top="0%" value={`${TOTAL_TWH}k TWh`} sub="in 2050" />
          <Annotation id="b" top={`${100 - BAR_PCT}%`} value={`${NOW_TWH}k TWh`} sub="in 2024" />
        </div>
      </div>
    </div>
  );
}