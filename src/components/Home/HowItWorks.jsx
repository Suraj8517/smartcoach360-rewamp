import { useEffect, useRef, useState } from "react";
import demobook from '../../assets/howitworks/demobook.avif'
import setup from '../../assets/howitworks/setup.avif'
import onboard from '../../assets/howitworks/onboarding.avif'
import growth from '../../assets/howitworks/growth.avif'


const url=import.meta.env.VITE_CALENDLY_LINK;
const steps = [
  {
    number: "01",
    title: "Book a Demo",
    description:
      "A free 20-minute walkthrough tailored to your business. See exactly how the platform fits your coaching model before committing to anything.",
    image: demobook,
    accent: "#A78BFA",
    tag: "Discovery",
  },
  {
    number: "02",
    title: "Set Up Your Platform",
    description:
      "Hands-on onboarding — branding, programs, and payments configured. We make sure everything is live and looking like you before your first client arrives.",
    image: setup,
    accent: "#A78BFA",
    tag: "Onboarding",
  },
  {
    number: "03",
    title: "Onboard Your Clients",
    description:
      "Invite clients, assign programmes, and start delivering from day one. A seamless experience that makes you look professional from the very first login.",
    image: onboard,
    accent: "#A78BFA",
    tag: "Launch",
  },
  {
    number: "04",
    title: "Grow Your Business",
    description:
      "Automations handle the ops while you stay focused on what you do best — coaching. Scale without the chaos of manual work holding you back.",
    image: growth,
    accent: "#A78BFA",
    tag: "Scale",
  },
];

// Pulled CARD_TOP in from 60 → 40 to open up more vertical room for the card body.
const CARD_TOP = 80;
const CARD_GAP = 560;
const CARD_CASCADE = 452;

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const totalSegments = steps.length;

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setScrollRatio(Math.min(scrolled / scrollable, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rawSegment = scrollRatio * totalSegments;
  const activeCard = Math.min(Math.floor(rawSegment), steps.length - 1);
  const segProgress = rawSegment - Math.floor(rawSegment);

  const heroOpacity =
    activeCard === 0 ? Math.max(0, 1 - segProgress / 0.4) : 0;
  const heroTranslateY =
    activeCard === 0 ? -(segProgress * 80) : -80;

  return (
    <>
      {/* ══════ DESKTOP ══════ */}
      <section
        ref={sectionRef}
        className="hidden xl:block relative"
        style={{ height: `${(totalSegments + 1.5) * 100}vh`, background: "#0A0A0A" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden py-30" style={{ background: "#0A0A0A" }}>

          {/* HERO */}
          <div
            className="flex items-center px-16 xl:px-24 justify-center"
            style={{
              paddingTop: "80px",
              opacity: heroOpacity,
              transform: `translateY(${heroTranslateY}px)`,
              zIndex: 1,
              pointerEvents: heroOpacity < 0.05 ? "none" : "auto",
            }}
          >
            <div className="flex-none w-[45%] pr-6">
              <h1
                className="font-medium leading-none m-0"
                style={{
                  fontSize: "clamp(72px, 9vw, 140px)",
                  letterSpacing: "-0.04em",
                  color: "#F5F5F5",
                }}
              >
                How it
                <br />
                works.
              </h1>
            </div>

            <div className="flex-1 max-w-sm">
              <p className="text-base font-bold mb-2.5 leading-snug" style={{ color: "#E5E5E5" }}>
                Four steps to a fully running coaching business.
              </p>
              <p className="text-sm leading-relaxed mb-7" style={{ color: "#737373" }}>
                From your first demo to automated operations — here's exactly
                how it happens, with hands-on support the whole way.
              </p>
             <button onClick={() => window.open(url, "_blank")} className="flex items-center gap-2 bg-white text-black font-semibold rounded-full px-5 py-2.5 text-[13px] transition-all duration-200 hover:bg-[#f2f2f2]  active:scale-95 lg:text-[14px] lg:px-6 lg:py-3 group">
            Book a Demo
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#111111"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg></span>
          </button>
            </div>
          </div>

          {/* CARDS STACK */}
          {steps.map((step, i) => {
            let translateY;

            if (rawSegment < i) {
              const stepsAhead = i - rawSegment;
              translateY = CARD_GAP + stepsAhead * CARD_CASCADE;
            } else if (rawSegment >= i + 1) {
              translateY = 0;
            } else {
              const t = rawSegment - i;
              const eased = 1 - Math.pow(1 - t, 3);
              translateY = CARD_GAP * (1 - eased);
            }

            const zIndex = 10 + i;

            return (
              <div
                key={i}
                // left/right reduced → wider card; bottom reduced → taller card
                className="absolute left-6 2xl:left-70 xl:left-40 xl:right-40 right-6 2xl:right-70 xl:bottom-10 2xl:bottom-30 overflow-hidden rounded-2xl"
                style={{
                  top: `${CARD_TOP}px`,
                  transform: `translateY(${translateY}px)`,
                  zIndex,
                  background: "#141414",
                  border: "1px solid #262626",
                  transition: "transform 0ms",
                }}
              >
                {/* Top bar */}
                <div
                  className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
                  style={{ borderBottom: "1px solid #262626", background: "#141414" }}
                >
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide"
                    style={{
                      background: `${step.accent}18`,
                      color: step.accent,
                      border: `1px solid ${step.accent}30`,
                    }}
                  >
                    {step.tag}
                  </span>

                  <span
                    className="text-[11px] font-medium tracking-widest uppercase"
                    style={{ color: "#525252" }}
                  >
                    Step {step.number}
                  </span>

                  {/* Progress pills */}
                  <div className="ml-auto flex items-center gap-1.5">
                    {steps.map((s, j) => (
                      <div
                        key={j}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: j === i ? "20px" : "6px",
                          height: "4px",
                          background: j <= i ? step.accent : "#2A2A2A",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Card body */}
                <div className="flex overflow-hidden" style={{ height: "calc(100% - 48px)" }}>
                  {/* Left: text */}
                  <div className="flex flex-col justify-end px-8 pb-10 pt-8 flex-shrink-0 w-[42%] h-full">
                    {/* Ghost number */}
                    <div
                      className="2xl:text-[100px] text-[64px] font-black leading-none mb-4 select-none"
                      style={{
                        color: "#1E1E1E",
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {step.number}
                    </div>

                    <h2
                      className="font-semibold leading-tight mb-3"
                      style={{
                        fontSize: "clamp(22px, 2.3vw, 34px)",
                        letterSpacing: "-0.03em",
                        color: "#F5F5F5",
                      }}
                    >
                      {step.title}
                    </h2>
                    <p
                      className="text-xs 2xl:text-sm leading-relaxed mb-8 max-w-[260px]"
                      style={{ color: "#737373" }}
                    >
                      {step.description}
                    </p>
                    <button onClick={() => window.open(url, "_blank")}
                className="inline-flex self-start items-center gap-2 px-6 py-3.5 rounded-full text-sm font-normal border-none cursor-pointer  transition-all text-purple-300 group"
              >
                Get Started<span className="group-hover:translate-x-1 inline-block transition-transform text-purple-300 duration-300"> 
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#b291e0"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> </span>
              </button>
                    
                  </div>

                  {/* Right: image */}
                  <div
                    className="flex-1 relative my-4 mr-4 rounded-xl overflow-hidden"
                    style={{ background: "#0A0A0A" }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover object-center block"
                      style={{ opacity: 0.85 }}
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-24"
                      style={{
                        background: "linear-gradient(to top, #141414cc, transparent)",
                      }}
                    />

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════ MOBILE ══════ */}
      <section className="xl:hidden px-5 pt-14 pb-10" style={{ background: "#0A0A0A" }}>
        <div className="text-center mb-10">
          <h1
            className="font-black leading-none mb-4"
            style={{ fontSize: "42px", letterSpacing: "-0.04em", color: "#F5F5F5" }}
          >
            How it works.
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#737373" }}>
            From your first demo to a fully automated coaching business — here's
            exactly how it happens.
          </p>
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border-none cursor-pointer"
            style={{ background: "#F5F5F5", color: "#0A0A0A" }}
          >
            Get started →
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#141414", border: "1px solid #262626" }}
            >
              {/* Top bar */}
              <div
                className="flex items-center gap-2.5 px-4 py-3"
                style={{ borderBottom: "1px solid #262626" }}
              >
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md tracking-wide"
                  style={{
                    background: `${step.accent}18`,
                    color: step.accent,
                    border: `1px solid ${step.accent}30`,
                  }}
                >
                  {step.tag}
                </span>
                <span
                  className="text-[10px] font-medium tracking-widest uppercase"
                  style={{ color: "#525252" }}
                >
                  Step {step.number}
                </span>
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-[90%] h-84 object-cover block items-center mx-auto rounded-b-2xl"
                  style={{ opacity: 0.85 }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-16"
                  style={{ background: "linear-gradient(to top, #141414, transparent)" }}
                />
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{ background: step.accent, boxShadow: `0 0 6px ${step.accent}` }}
                />
              </div>

              {/* Text */}
              <div className="p-5">
                <div
                  className="text-[48px] font-black leading-none mb-3 select-none"
                  style={{ color: "#1E1E1E", letterSpacing: "-0.05em" }}
                >
                  {step.number}
                </div>
                <h3
                  className="font-semibold mb-2 leading-tight"
                  style={{ fontSize: "18px", letterSpacing: "-0.02em", color: "#F5F5F5" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed m-0" style={{ color: "#737373" }}>
                  {step.description}
                </p>
                <div className="h-px w-8 mt-4" style={{ background: step.accent }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}