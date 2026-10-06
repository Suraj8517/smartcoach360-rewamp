import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Tunables                                                           */
/* ------------------------------------------------------------------ */

// The 4 purple shades the highlighted words switch between.
const PURPLES = ["#5b21b6", "#7c3aed", "#a855f7", "#c084fc"];
const PURPLE_CYCLE_SECONDS = 2.4; // one full loop through all 4 shades
const LINE_STAGGER = 0.12; // seconds between each line's entrance
const REVEAL_DURATION = 0.9; // seconds for each line to rise in

const css = `
.ch-line { display: block; overflow: hidden; padding-bottom: 0.06em; }
.ch-line-inner {
  display: flex; align-items: center; justify-content: center;
  transform: translateY(110%); opacity: 0;
}
.ch-visible .ch-line-inner {
  animation: ch-rise ${REVEAL_DURATION}s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i) * ${LINE_STAGGER}s);
}
@keyframes ch-rise {
  from { transform: translateY(110%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

/* Purple words: hard-switch between 4 shades (steps, no blending). */
.ch-purple { color: ${PURPLES[0]}; }
.ch-visible .ch-purple {
  animation: ch-purple ${PURPLE_CYCLE_SECONDS}s steps(1, end) infinite;
  animation-delay: ${REVEAL_DURATION}s;
}
@keyframes ch-purple {
  0%   { color: ${PURPLES[0]}; }
  25%  { color: ${PURPLES[1]}; }
  50%  { color: ${PURPLES[2]}; }
  75%  { color: ${PURPLES[3]}; }
  100% { color: ${PURPLES[0]}; }
}

/* Video pills pop in with their line */
.ch-pill { transform: scale(0.85); }
.ch-visible .ch-pill {
  animation: ch-pill 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--i) * ${LINE_STAGGER}s + 0.25s);
}
@keyframes ch-pill { to { transform: scale(1); } }

@media (prefers-reduced-motion: reduce) {
  .ch-line-inner { transform: none; opacity: 1; animation: none !important; }
  .ch-pill { transform: none; animation: none !important; }
  .ch-purple { animation: none !important; }
}
`;

/**
 * Skewed video "pill" that sits inline with the headline.
 * Sized in `em` so it scales with the headline's fluid font-size.
 * Pass `src` (mp4/webm) for a real video; without it a gradient placeholder shows.
 */
function SlantedVideo({ src, poster, fallback, i = 0 }) {
  return (
    <span
      aria-hidden="true"
      className="ch-pill relative inline-block h-[0.9em] w-[1.35em] shrink-0 overflow-hidden"
      style={{ clipPath: "polygon(20% 0, 100% 0, 80% 100%, 0 100%)", "--i": i }}
    >
      {src ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span className={`absolute inset-0 ${fallback}`} />
      )}
    </span>
  );
}

export default function CoachesHero({
  videoA, // e.g. "/videos/coach-1.mp4"
  videoB, // e.g. "/videos/coach-2.mp4"
  posterA,
  posterB,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Start the animation only once the section actually reaches the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect(); // play once
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`flex min-h-[500px] md:min-h-screen w-full items-center justify-center overflow-hidden px-3 py-10 sm:px-6 ${
        visible ? "ch-visible" : ""
      }`}
    >
      <style>{css}</style>

      {/*
        Font size is tuned for the longest line ("All-in-one CRM for", 18 chars)
        so it fits the same width the 12-character line did before.
      */}
      <h1
        className="font-display flex w-full max-w-[1500px] flex-col items-center text-center uppercase text-[#0a0a0a]"
        style={{
          fontSize: "clamp(2rem, 9.2vw, 11.5rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.005em",
        }}
      >
        {/* Line 1 */}
        <span className="ch-line" style={{ "--i": 0 }}>
          <span className="ch-line-inner whitespace-nowrap" style={{ "--i": 0 }}>
            All-in-one CRM
          </span>
        </span>

        {/* Line 2: video + text */}
        <span className="ch-line mt-[0.05em]" style={{ "--i": 1 }}>
          <span className="ch-line-inner gap-[0.12em]" style={{ "--i": 1 }}>
            <SlantedVideo
              src={videoA}
              poster={posterA}
              i={1}
              fallback="bg-gradient-to-b from-sky-400 via-sky-200 to-white"
            />
            <span>
              for <span className="ch-purple">coaches</span>
            </span>
          </span>
        </span>

        {/* Line 3: italic + video */}
        <span className="ch-line mt-[0.05em]" style={{ "--i": 2 }}>
          <span className="ch-line-inner gap-[0.06em] whitespace-nowrap" style={{ "--i": 2 }}>
            <span className="italic">work smarter</span>
            <SlantedVideo
              src={videoB}
              poster={posterB}
              i={2}
              fallback="bg-gradient-to-br from-teal-700 via-stone-800 to-amber-900"
            />
          </span>
        </span>

        {/* Line 4 */}
        <span className="ch-line mt-[0.05em]" style={{ "--i": 3 }}>
          <span className="ch-line-inner whitespace-nowrap" style={{ "--i": 3 }}>
            <span>
              <span className="ch-purple">grow</span> faster
            </span>
          </span>
        </span>
      </h1>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Usage
 *   <CoachesHero videoA="/videos/coach-1.mp4" videoB="/videos/coach-2.mp4" />
 *
 * Tweak the 4 purple shades, speed and stagger in the "Tunables" block.
 * Videos autoplay muted + looped (required for autoplay on mobile browsers).
 * ------------------------------------------------------------------ */