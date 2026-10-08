import { useEffect, useLayoutEffect, useRef } from "react";

const TEXT = "SC360";
const X_STEP = 0.096; // horizontal growth per echo layer
const Y_STEP = 0.096; // vertical growth per echo layer
const SIDE_GAP = 0.03; // screen-edge margin (fraction of width)
const ECHOES = [1, 2, 3, 4, 5];

// Purple shades for the echo layers, nearest to farthest
const ECHO_COLORS = ["#111111", "#111111", "#111111", "#111111", "#111111"];

// Keeps only a thin top band + the left and right edges of each copy
const ECHO_CLIP =
  "polygon(0 .138em,100% .138em,100% 100%,calc(100% - .13em) 100%,calc(100% - .13em) .172em,.1em .172em,.1em 100%,0 100%)";

const clamp = (v) => Math.max(0, Math.min(1, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

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
    // q: 0 = main text spans the screen, 1 = outer echo spans the screen
    const apply = (q) => {
      if (!scalerRef.current || !wrapRef.current) return;
      const startScale = 1 + X_STEP * ECHOES.length;
      scalerRef.current.style.transform = `scale(${startScale - (startScale - 1) * q})`;
      wrapRef.current.style.transform = `translateY(${q * 0.3}em)`;
      echoRefs.current.forEach((el, i) => {
        const k = i + 1;
        if (el) el.style.transform = `scale(${1 + X_STEP * k * q}, ${1 + Y_STEP * k * q})`;
      });
    };

    /* Desktop (md+): original pinned-scroll behaviour, unchanged. */
    const desktop = () => {
      let ticking = false;
      const update = () => {
        ticking = false;
        const track = trackRef.current;
        if (!track) return;
        const { top } = track.getBoundingClientRect();
        const vh = 300;
        apply(easeOut(clamp((vh - top) / vh)));
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
    };

    /* Mobile: no pinned/screen-height section. Progress comes from how much of
       the section itself is visible, so it never depends on the screen height. */
    const mobile = () => {
      apply(0);
      const io = new IntersectionObserver(
        ([entry]) => {
          const q = entry.boundingClientRect.top <= 0 ? 1 : easeOut(entry.intersectionRatio);
          apply(q);
        },
        { threshold: THRESHOLDS }
      );
      trackRef.current && io.observe(trackRef.current);
      return () => io.disconnect();
    };

    const mq = window.matchMedia("(min-width: 768px)");
    let cleanup;
    const setup = () => {
      cleanup && cleanup();
      cleanup = mq.matches ? desktop() : mobile();
    };
    setup();
    mq.addEventListener("change", setup);
    return () => {
      mq.removeEventListener("change", setup);
      cleanup && cleanup();
    };
  }, []);

  return (
    <section
      ref={trackRef}
      className="relative text-[#434343] dark:bg-[#161616] dark:text-[#e6e6e6] md:h-[130vh]"
    >
      {/* Mobile: normal block sized by its content. Desktop: pinned, full-screen stage. */}
      <div className="relative overflow-hidden md:sticky md:top-0 md:h-screen">
        <div className="flex items-center justify-center py-[16vw] md:absolute md:inset-0 md:py-0">
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