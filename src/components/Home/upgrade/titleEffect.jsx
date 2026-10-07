import { useEffect, useLayoutEffect, useRef } from "react";

const TEXT = "SC360";
const X_STEP = 0.096; // horizontal growth per echo layer
const Y_STEP = 0.096; // vertical growth per echo layer
const SIDE_GAP = 0.03; // screen-edge margin (fraction of width)
const ECHOES = [1, 2, 3, 4, 5];

// Purple shades for the echo layers, nearest to farthest
const ECHO_COLORS = ["#5b21b6", "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"];

// Keeps only a thin top band + the left and right edges of each copy
const ECHO_CLIP =
  "polygon(0 .138em,100% .138em,100% 100%,calc(100% - .13em) 100%,calc(100% - .13em) .172em,.1em .172em,.1em 100%,0 100%)";

const clamp = (v) => Math.max(0, Math.min(1, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export default function SmartCoachHero() {
  const trackRef = useRef(null);
  const scalerRef = useRef(null);
  const wrapRef = useRef(null);
  const titleRef = useRef(null);
  const echoRefs = useRef([]);

  // Size the text so the outermost echo layer spans the screen width
  useLayoutEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const title = titleRef.current;
      if (!wrap || !title) return;
      wrap.style.fontSize = "100px";
      const base = title.offsetWidth;
      const outer = base * (1 + X_STEP * ECHOES.length);
      const target = window.innerWidth * (1 - SIDE_GAP * 2);
      wrap.style.fontSize = `${(100 * target) / outer}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const track = trackRef.current;
      if (!track) return;

      // 0 when the section's top edge enters the viewport, 1 when it reaches the top
      const { top } = track.getBoundingClientRect();
      const vh = 300;
      const q = easeOut(clamp((vh - top) / vh));

      // start: main text spans the screen; end: outer echo spans the screen
      const startScale = 1 + X_STEP * ECHOES.length;
      scalerRef.current.style.transform = `scale(${startScale - (startScale - 1) * q})`;
      wrapRef.current.style.transform = `translateY(${q * 0.3}em)`;
      echoRefs.current.forEach((el, i) => {
        const k = i + 1;
        if (el) el.style.transform = `scale(${1 + X_STEP * k * q}, ${1 + Y_STEP * k * q})`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className="relative h-[130vh] text-[#434343] dark:bg-[#161616] dark:text-[#e6e6e6]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={scalerRef} className="origin-center will-change-transform">
            <div
              ref={wrapRef}
              className="relative font-['Inter_Tight',Helvetica,Arial,sans-serif] font-semibold leading-none tracking-[-0.02em]"
            >
              {ECHOES.map((k, i) => (
                <div
                  key={k}
                  ref={(el) => (echoRefs.current[i] = el)}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1] origin-[50%_1.085em] whitespace-nowrap"
                  style={{ clipPath: ECHO_CLIP, color: ECHO_COLORS[i] }}
                >
                  {TEXT}
                </div>
              ))}
              <h2 ref={titleRef} className="relative z-[2] whitespace-nowrap">{TEXT}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}