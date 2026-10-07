import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import run from "../../../assets/ctasection/run.png"
import pullup from "../../../assets/ctasection/pullup.png"

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── your two angel images (transparent PNG / WebP / SVG) ─────────────── */
const DEFAULT_ANGEL_LEFT = run;   // angel with wings spread (top-left)
const DEFAULT_ANGEL_RIGHT = pullup; // angel with trumpet (bottom-right)

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
      className={`pointer-events-none absolute select-none ${className}`}
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

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* parallax: ONLY the angel images drift while the section scrolls.
           Text lines have no data-speed, so they are never selected here. */
        gsap.utils.toArray("img[data-speed]").forEach((el) => {
          const s = parseFloat(el.dataset.speed);
          gsap.fromTo(
            el,
            { y: -s * 45 },
            {
              y: s * 45,
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
        const letters = gsap.utils.toArray("[data-roll]");
        const busy = new Set();
        let visible = false;
        let call;

        const tick = () => {
          if (visible) {
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
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-12 text-[#404040] md:py-2"
    >
      <style>{FONTS}</style>

      <div
        className="relative w-full pb-[24vw] pt-[22vw] text-[13.5vw] md:aspect-[1918/713] md:p-0 md:text-[11.2vw]"
        style={{ ...SANS, fontWeight: 700, lineHeight: 0.82, letterSpacing: "-0.055em" }}
      >
        <h2
          className="contents uppercase"
          aria-label="The idea is not to live forever, it is to create something that will"
        >
          {/* Angels (parallax) */}
          <Angel
            src={angelRight}
            speed="-0.9"
            className="left-[3%] top-[2vw] w-[24%] md:left-[4.95%] md:top-[6.3%] md:w-[12.5%]"
          />
          <Angel
            src={angelLeft}
            speed="1.1"
            className="bottom-[2vw] right-[6%] w-[28%] md:bottom-auto md:left-[76.3%] md:right-auto md:top-[49.8%] md:w-[13.3%]"
          />

          {/* Line 1: THE IDEA + IS NOT + to live forever */}
          <div className="relative ml-[14vw] md:absolute md:left-[17.5%] md:top-[13%] md:ml-0 md:whitespace-nowrap">
            <Roll text="THE GOAL" />
            <span
              className="ml-[0.28em] text-[0.33em] normal-case italic tracking-[-0.075em]"
              style={SERIF}
            >
              IS NOT
            </span>
            <span
              className="ml-[0.03em] text-[0.19em] font-normal normal-case tracking-normal"
              style={SCRIPT}
            >
              to work harder
            </span>
          </div>

          {/* Line 2: it is + TO CREATE */}
          <div className="relative ml-[6vw] md:absolute md:left-[9.5%] md:top-[38.3%] md:ml-0 md:whitespace-nowrap">
            <span
              className="mr-[0.09em] text-[0.24em] font-normal normal-case tracking-[-0.03em]"
              style={SERIF}
            >
              it is
            </span>
            <Roll text="TO BUILD " />
          </div>

          {/* Line 3: SOMETHING + that will */}
          <div className="relative ml-[12vw] md:absolute md:left-[18.7%] md:top-[62.1%] md:ml-0 md:whitespace-nowrap">
            <Roll text="A Business" />
            <span className="mt-[0.15em] block text-[0.23em] normal-case tracking-[-0.05em] md:ml-[0.08em] md:mt-0 md:inline text-purple-">
              that will
            </span>
          </div>
        </h2>
      </div>

      {ctaLabel && (
        <div className="mt-6 flex justify-center px-5 md:mt-10 md:justify-start md:pl-[17.5%]">
          <a
            href={ctaHref}
            className="group inline-flex items-center gap-3 rounded-full bg-[#404040] px-8 py-4 text-base font-semibold text-[#f4f4f4] transition-colors hover:bg-black
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#404040]"
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
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}