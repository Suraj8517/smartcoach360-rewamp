import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import run from "../../../assets/ctasection/run.png";
import pullup from "../../../assets/ctasection/pullup.png";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── your two angel images (transparent PNG / WebP / SVG) ─────────────── */
const DEFAULT_ANGEL_LEFT = run; // angel with wings spread
const DEFAULT_ANGEL_RIGHT = pullup; // angel with trumpet

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700&family=Playfair+Display:ital,wght@0,400;1,400&family=Pinyon+Script&display=swap');`;

const SANS = { fontFamily: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif" };
const SERIF = { fontFamily: "'Playfair Display', 'Bodoni 72', Georgia, serif" };
const SCRIPT = { fontFamily: "'Pinyon Script', 'Snell Roundhand', cursive" };

function Roll({ text }) {
  const words = text.split(" ");
  return words.map((word, wi) => (
    <span key={wi} aria-hidden="true">
      <span className="inline-block whitespace-nowrap">
        {word.split("").map((ch, i) => (
          <span
            key={i}
            className="relative inline-block"
            style={{ clipPath: "inset(0 -0.06em -0.02em -0.06em)" }}
          >
            <span data-roll className="relative block will-change-transform">
              <span className="block">{ch}</span>
              <span className="absolute left-0 top-full block">{ch}</span>
            </span>
          </span>
        ))}
      </span>
      {wi < words.length - 1 && <span className="inline-block w-[0.17em]" />}
    </span>
  ));
}

function Angel({ src, speed, className }) {
  return (
    <img
      src={src}
      alt=""
      data-speed={speed}
      draggable="false"
      onError={(e) => (e.currentTarget.style.display = "none")}
      className={`pointer-events-none absolute z-0 h-auto select-none ${className}`}
    />
  );
}

export default function CtaSectionNew({
  angelLeft = DEFAULT_ANGEL_LEFT,
  angelRight = DEFAULT_ANGEL_RIGHT,
  ctaLabel = "Start Your Journey",
  ctaHref = "https://calendly.com/sangameswaran-vmaxhealthtech/30min",
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          if (!context.conditions.motion) return;

          /* Parallax: smaller drift on phones so the angels stay inside
             the section and never collide with the text. */
          const range = context.conditions.desktop ? 45 : 16;

          gsap.utils.toArray("img[data-speed]", sectionRef.current).forEach((el) => {
            const s = parseFloat(el.dataset.speed);
            gsap.fromTo(
              el,
              { y: -s * range },
              {
                y: s * range,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          });

          /* random letter roll, only while the section is on screen */
          const letters = gsap.utils.toArray("[data-roll]", sectionRef.current);
          const busy = new Set();
          let visible = false;
          let call;

          const tick = () => {
            if (visible && letters.length) {
              const el = gsap.utils.random(letters);
              if (!busy.has(el)) {
                busy.add(el);
                gsap.to(el, {
                  yPercent: -100,
                  duration: 0.65,
                  ease: "power3.inOut",
                  onComplete: () => {
                    gsap.set(el, { yPercent: 0 });
                    busy.delete(el);
                  },
                });
              }
            }
            call = gsap.delayedCall(gsap.utils.random(0.2, 0.6), tick);
          };

          const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom 10%",
            onToggle: (self) => (visible = self.isActive),
          });
          tick();

          return () => {
            call && call.kill();
            st.kill();
          };
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-10 bg-bg text-[#404040] md:pt-2 md:pb-16"
    >
      <style>{FONTS}</style>

      {/* Mobile: stacked, staggered lines with room above/below for the angels.
          Desktop (md+): original absolute-positioned artboard. */}
      <div
        className="relative w-full aspect-[1080/750] text-[13vw] md:aspect-[1918/713] md:text-[11.2vw]"
        style={{ ...SANS, fontWeight: 700, lineHeight: 0.82, letterSpacing: "-0.055em" }}
      >
        <h2
          className="contents uppercase"
          aria-label="The goal is not to work harder, it is to build a business that will"
        >
          {/* Angels (parallax) */}
          <Angel
            src={angelRight}
            speed="-0.9"
            className="left-[-1%] top-[14%] w-[23%] md:left-[4.95%] md:top-[6.3%] md:w-[12.5%]"
          />
          <Angel
            src={angelLeft}
            speed="1.1"
            className="right-[-2%] top-[22%] w-[31%] md:bottom-auto md:left-[76.3%] md:right-auto md:top-[49.8%] md:w-[13.3%]"
          />

          {/* Line 1: THE GOAL + IS NOT + to work harder */}
          <div className="absolute left-[17.6%] top-[19%] z-10 whitespace-nowrap md:left-[17.5%] md:top-[13%]">
            <Roll text="THE GOAL" />
            <span className="absolute left-0 top-full mt-[0.1em] text-[0.45em] leading-none md:static md:mt-0 md:inline md:text-[1em] md:leading-[0.82]">
              <span
                className="text-[1em] normal-case italic tracking-[-0.06em] md:ml-[0.28em] md:text-[0.33em] md:tracking-[-0.075em]"
                style={SERIF}
              >
                IS NOT
              </span>
              <span
                className="ml-[0.45em] text-[0.95em] font-normal normal-case tracking-normal md:ml-[0.03em] md:text-[0.19em]"
                style={SCRIPT}
              >
                to work harder
              </span>
            </span>
          </div>

          {/* Line 2: it is + TO BUILD */}
          <div className="absolute left-20 top-[45%] z-10 whitespace-nowrap md:left-[9.5%] md:top-[38.3%]">
            <span
              className="mr-[0.09em] text-[0.26em] font-normal normal-case tracking-[-0.03em] md:text-[0.24em]"
              style={SERIF}
            >
              it is
            </span>
            <Roll text="TO BUILD " />
          </div>

          {/* Line 3: A Business + that will */}
          <div className="absolute left-[5%] top-[62%] z-10 whitespace-nowrap md:left-[18.7%] md:top-[62.1%]">
            <Roll text="A Business" />
            <span className="ml-[0.08em] text-[0.3em] normal-case tracking-[-0.05em] md:text-[0.23em]">
              that will
            </span>
          </div>
        </h2>
      </div>

      {ctaLabel && (
        <div className="mt-4 flex justify-center px-5 md:mt-10 md:justify-start md:px-0 md:pl-[17.5%]">
          <a
            href={ctaHref}
            className="group inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[#404040] px-8 py-4 text-base font-semibold text-[#f4f4f4] transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#404040] md:w-auto md:max-w-none"
            style={SANS}
          >
            {ctaLabel}
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}