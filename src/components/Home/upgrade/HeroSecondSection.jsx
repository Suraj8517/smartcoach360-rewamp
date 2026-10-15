import { Fragment, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------------------- */
/* Tunables                                                               */
/* ---------------------------------------------------------------------- */
const PURPLE = '#c9a5f2'; // same purple the hero fades to
const PURPLE_LIGHT = '#dcc3f7';
const PURPLE_EDGE = '#a97fe0';
const INK = '#150a24';
const PAPER = '#fafaf9';

const TOTAL_TWH = 51; // 2050  -> full height of the box
const NOW_TWH = 27; // 2024  -> height of the purple bar
const BAR_PCT = (NOW_TWH / TOTAL_TWH) * 100; // ≈ 52.9%

// 1 = box starts drawing the instant the purple begins to move up.
// Lower it (0.5 = screen centre) to start later.
const START_AT = 1;

const HEADLINE = 'The world’s demand for electricity will double by 2050.';

/* Each word sits in a clipping mask so it slides up out of nothing. */
function Words({ text }) {
  const words = text.split(' ');
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
        <span data-word className="inline-block will-change-transform">
          {w}
        </span>
      </span>
      {i < words.length - 1 ? ' ' : null}
    </Fragment>
  ));
}

/* One annotation: a tick line pointing at the box edge + a two-line label.
   The number is a real counter (data-count) that the timeline tweens. */
function Annotation({ id, top, value, sub }) {
  return (
    <div
      data-note={id}
      className="absolute left-full flex -translate-y-1/2 items-center"
      style={{ top }}
    >
      <span
        data-note-line
        className="relative block h-px w-6 origin-left bg-[#150a24] sm:w-14"
      >
        <span className="absolute -left-px top-1/2 h-2 w-px -translate-y-1/2 bg-[#150a24]" />
        <span className="absolute -right-px top-1/2 h-2 w-px -translate-y-1/2 bg-[#150a24]" />
      </span>
      <span data-note-text className="ml-2 text-[11px] leading-tight text-[#150a24] sm:ml-3 sm:text-base">
        <b className="block font-semibold tabular-nums">
          <span data-count={value}>{value}</span>k TWh
        </b>
        <span className="block">{sub}</span>
      </span>
    </div>
  );
}

export default function OpportunitySection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (min-width: 640px)').matches;
    let removePointer = () => {};

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);

      const top = q('[data-edge="top"]');
      const right = q('[data-edge="right"]');
      const bottom = q('[data-edge="bottom"]');
      const left = q('[data-edge="left"]');
      const fill = q('[data-fill]');
      const bar = q('[data-bar]');
      const barEdge = q('[data-bar-edge]');
      const guide = q('[data-guide]');
      const words = q('[data-word]');
      const label = q('[data-label]');
      const labelRule = q('[data-label-rule]');
      const marks = q('[data-mark]');
      const noteLines = q('[data-note-line]');
      const noteTexts = q('[data-note-text]');
      const boxScale = q('[data-box-scale]');
      const grid = q('[data-grid]');
      const counters = q('[data-count]');

      // start state (everything hidden / collapsed)
      gsap.set(top, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(right, { scaleY: 0, transformOrigin: '50% 0%' });
      gsap.set(bottom, { scaleX: 0, transformOrigin: '100% 50%' });
      gsap.set(left, { scaleY: 0, transformOrigin: '50% 100%' });
      gsap.set(fill, { opacity: 0 });
      gsap.set(bar, { scaleY: 0, transformOrigin: '50% 100%' });
      gsap.set(barEdge, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(guide, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(words, { yPercent: 115, opacity: 0 });
      gsap.set(label, { opacity: 0, x: -14 });
      gsap.set(labelRule, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(marks, { opacity: 0, rotate: -90, scale: 0.4 });
      gsap.set(noteLines, { scaleX: 0 });
      gsap.set(noteTexts, { opacity: 0, x: -8 });
      gsap.set(boxScale, { scale: 0.92, transformOrigin: '50% 50%' });

      const tl = gsap.timeline({ defaults: { ease: 'power1.inOut' } });

      // Box eases in as it draws; background dots drift for depth.
      tl.to(boxScale, { scale: 1, duration: 3.4, ease: 'power2.out' }, 0)
        .to(fill, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 0)
        .to(label, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, 0)
        .to(labelRule, { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 0.2)
        .to(marks, { opacity: 1, rotate: 0, scale: 1, duration: 0.7, stagger: 0.3, ease: 'back.out(2)' }, 0)
        // outline drawn as ONE continuous line
        .to(top, { scaleX: 1, duration: 0.8 }, 0.1)
        .to(right, { scaleY: 1, duration: 0.9 }, 0.9)
        .to(bottom, { scaleX: 1, duration: 0.8 }, 1.8)
        .to(left, { scaleY: 1, duration: 0.9 }, 2.6)
        // purple bar rises (27k = 53% of 51k) with its top edge and guide line
        .to(bar, { scaleY: 1, duration: 1.0, ease: 'power3.out' }, 3.7)
        .to(barEdge, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 4.5)
        .to(guide, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 4.5)
        // headline, word by word through a mask
        .to(words, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 4.3)
        // annotations draw out of the box edge
        .to(noteLines, { scaleX: 1, duration: 0.6, stagger: 0.3, ease: 'power2.out' }, 3.9)
        .to(noteTexts, { opacity: 1, x: 0, duration: 0.5, stagger: 0.3, ease: 'power2.out' }, 4.3);

      // Counters tick up in sync with the annotations (51 first, 27 with the bar)
      counters.forEach((el, i) => {
        const end = Number(el.dataset.count);
        const o = { v: 0 };
        el.textContent = '0';
        tl.to(
          o,
          {
            v: end,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(o.v);
            },
          },
          3.9 + i * 0.3
        );
      });

      // Play at a comfortable real-time pace (the timeline is ~7s of choreography)
      tl.timeScale(1.7);

      if (reduceMotion) {
        tl.progress(1).pause();
        return;
      }

      // Plays when the section reaches the viewport, reverses when you scroll
      // back above it (same pattern as the footer).
      ScrollTrigger.create({
        animation: tl,
        trigger: rootRef.current,
        start: `top -${(1 - START_AT) * 100}%`,
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      });

      // Only the background dots stay scroll-linked, for a bit of depth.
      gsap.to(grid, {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Gentle pointer parallax: box, label and background move at different depths
      if (canHover) {
        const box = q('[data-parallax="box"]')[0];
        const lab = q('[data-parallax="label"]')[0];
        const bg = q('[data-parallax="bg"]')[0];
        const set = (el, d) => [
          gsap.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
          gsap.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }),
          d,
        ];
        const layers = [set(box, 14), set(lab, 28), set(bg, -20)];
        const move = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach(([x, y, d]) => {
            x(nx * d);
            y(ny * d);
          });
        };
        window.addEventListener('pointermove', move, { passive: true });
        removePointer = () => window.removeEventListener('pointermove', move);
      }
    }, rootRef);

    return () => {
      removePointer();
      ctx.revert();
    };
  }, []);

  return (
    /*
      Outer wrapper: pulled up by one screen (-mt-[100vh]) so it sits BEHIND the
      hero's last screen. No z-index / transform here, so the two layers below
      share the hero's stacking context.
    */
    <div ref={rootRef} className="pointer-events-none relative -mt-[100vh] h-[560vh] sm:h-[600vh]">
      {/* Layer 1 (behind the hero): light page background with a soft dot grid. */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden" style={{ background: PAPER }}>
        <div data-parallax="bg" className="absolute -inset-[10%]">
          <div
            data-grid
            className="absolute -inset-y-[15%] inset-x-0 opacity-60"
            style={{
              backgroundImage: `radial-gradient(${INK}22 1px, transparent 1.2px)`,
              backgroundSize: '28px 28px',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
              maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
            }}
          />
        </div>
      </div>

      {/* Layer 2 (in front of the hero): the box. */}
      <div className="sticky top-0 z-20 -mt-[100vh] flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Section label */}
        <div
          data-parallax="label"
          className="absolute left-[4%] top-[9%] sm:top-1/2 sm:-translate-y-1/2"
        >
          <p data-label className="font-serif text-[11px] uppercase tracking-[0.08em] sm:text-sm" style={{ color: INK }}>
            The opportunity ahead
          </p>
          <span
            data-label-rule
            className="mt-2 block h-px w-10 sm:w-16"
            style={{ background: INK }}
          />
        </div>

        {/* Pointer-parallax wrapper (separate from the scroll scale) */}
        <div data-parallax="box">
          <div
            data-box-scale
            className="relative h-[min(34rem,64vh)] w-[58vw] max-w-[31rem] sm:w-[min(31rem,42vw)]"
          >
            {/* soft shadow so the card lifts off the page */}
            <div
              data-fill
              className="absolute inset-0 rounded-[4px]"
              style={{ background: PAPER, boxShadow: '0 30px 60px -30px rgba(21,10,36,0.25)' }}
            />

            {/* purple bar = 27k of 51k */}
            <div
              data-bar
              className="absolute bottom-0 left-0 w-full overflow-hidden rounded-b-[4px]"
              style={{
                height: `${BAR_PCT}%`,
                background: `linear-gradient(180deg, ${PURPLE_LIGHT}, ${PURPLE})`,
              }}
            />

            {/* bar top edge + dashed guide that links to the 2024 annotation */}
            <span
              data-bar-edge
              className="absolute left-0 w-full"
              style={{ top: `${100 - BAR_PCT}%`, height: 2, background: PURPLE_EDGE }}
            />
            <span
              data-guide
              className="absolute left-0 w-full border-t border-dashed"
              style={{ top: `${100 - BAR_PCT}%`, borderColor: `${INK}55` }}
            />

            {/* headline, sits inside the purple bar */}
            <div
              className="absolute bottom-0 left-0 flex w-full items-center px-[7%]"
              style={{ height: `${BAR_PCT}%` }}
            >
              <h3
                aria-label={HEADLINE}
                className="font-[Inter_Tight,sans-serif] text-[clamp(1.05rem,2.6vw,2.1rem)] font-medium leading-[1.2] tracking-tight"
                style={{ color: INK }}
              >
                <span aria-hidden="true">
                  <Words text={HEADLINE} />
                </span>
              </h3>
            </div>

            {/* The four outline edges */}
            <span data-edge="top" className="absolute left-0 top-0 h-[2px] w-full bg-[#9d9aa5]" />
            <span data-edge="right" className="absolute right-0 top-0 h-full w-[2px] bg-[#9d9aa5]" />
            <span data-edge="bottom" className="absolute bottom-0 right-0 h-[2px] w-full bg-[#9d9aa5]" />
            <span data-edge="left" className="absolute bottom-0 left-0 h-full w-[2px] bg-[#9d9aa5]" />

            {/* corner "+" marks */}
            <span data-mark className="absolute -left-4 -top-4 text-sm leading-none" style={{ color: INK }}>+</span>
            <span data-mark className="absolute -bottom-4 -right-4 text-sm leading-none" style={{ color: INK }}>+</span>

            {/* annotations: top of box = 51k, top of purple bar = 27k */}
            <Annotation id="a" top="0%" value={TOTAL_TWH} sub="in 2050" />
            <Annotation id="b" top={`${100 - BAR_PCT}%`} value={NOW_TWH} sub="in 2024" />
          </div>
        </div>
      </div>
    </div>
  );
}