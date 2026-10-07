import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import demobook from "../../../assets/howitworks/demobook.avif";
import setup from "../../../assets/howitworks/setup.avif";
import onboard from "../../../assets/howitworks/onboarding.avif";
import growth from "../../../assets/howitworks/growth.avif";
import JoinNow from "./utils/joinnowbutton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const url = import.meta.env.VITE_CALENDLY_LINK;

const steps = [
  {
    number: "01",
    title: "Book a Demo",
    description:
      "A free 20-minute walkthrough tailored to your business. See exactly how the platform fits your coaching model before committing to anything.",
    image: demobook,
    accent: "#A78BFA",
    tag: "Discovery",
    imageRotate: 4,
    cardBg: "bg-white",
    textColor: "text-text",
    numberColor: "text-black/10",
    badgeBg: "bg-[#A78BFA]/20",
    badgeText: "text-text",
    imageBorder: "border-[6px] border-[#A78BFA] sm:border-[10px]",
    cta: { label: "Book a Demo", bg: "bg-[#A78BFA]", text: "text-white", circleBg: "bg-white", circleIcon: "text-[#A78BFA]",url:"https://calendly.com/sangameswaran-vmaxhealthtech/30min" },
  },
  {
    number: "02",
    title: "Set Up Your Platform",
    description:
      "Hands-on onboarding — branding, programs, and payments configured. We make sure everything is live and looking like you before your first client arrives.",
    image: setup,
    accent: "#A78BFA",
    tag: "Onboarding",
    imageRotate: -4,
    cardBg: "bg-[#E6DEFF]",
    textColor: "text-text",
    numberColor: "text-black/10",
    badgeBg: "bg-white",
    badgeText: "text-text",
    imageBorder: "border-[6px] border-white sm:border-[10px]",
  },
  {
    number: "03",
    title: "Onboard Your Clients",
    description:
      "Invite clients, assign programmes, and start delivering from day one. A seamless experience that makes you look professional from the very first login.",
    image: onboard,
    accent: "#A78BFA",
    tag: "Launch",
    imageRotate: -3,
    cardBg: "bg-[#A78BFA]",
    textColor: "text-text",
    numberColor: "text-black/10",
    badgeBg: "bg-white",
    badgeText: "text-text",
    imageBorder: "border-[6px] border-white sm:border-[10px]",
  },
  {
    number: "04",
    title: "Grow Your Business",
    description:
      "Automations handle the ops while you stay focused on what you do best — coaching. Scale without the chaos of manual work holding you back.",
    image: growth,
    accent: "#A78BFA",
    tag: "Scale",
    imageRotate: 3,
    cardBg: "bg-[#1F1936]",
    textColor: "text-white",
    numberColor: "text-white/10",
    badgeBg: "bg-[#A78BFA]",
    badgeText: "text-[#1F1936]",
    imageBorder: "border-[6px] border-[#A78BFA] sm:border-[10px]",
    cta: { label: "Book a Demo", bg: "bg-white", text: "text-[#1F1936]", circleBg: "bg-[#A78BFA]", circleIcon: "text-white", url: "https://calendly.com/sangameswaran-vmaxhealthtech/30min" },
  },
];

export default function ExpertiseStack() {
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // As the next card scrolls up over the current one, push the current card
      // back: shrink, tilt, lift, then fade once fully covered.
      cardRefs.current.forEach((card, i) => {
        const nextCard = cardRefs.current[i + 1];
        if (!nextCard) return;

        gsap.set(card, { transformOrigin: "center center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(card, { rotate: 4, scale: 0.85, y: -24, ease: "none", duration: 1 }, 0);
        tl.to(card, { opacity: 0, ease: "none", duration: 1 }, 1);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" className="bg-bg font-inter pt-14 sm:pt-20">
      <div className="px-4 text-center">
        <h2 className="font-inter text-4xl font-bold sm:text-5xl">How It Works</h2>
        <p className="mx-auto mt-3 max-w-xl text-base opacity-70 sm:text-lg">
          From first call to a growing coaching business in four steps.
        </p>
      </div>

      <div className="px-3 pb-16 pt-8 sm:px-5 sm:pb-24 sm:pt-10 lg:px-8">
        {steps.map((c, i) => (
          <div
            key={c.title}
            ref={addCardRef}
            // Phones: full-height sticky box with the card centered inside it, so
            // the stack happens in the vertical middle of the screen.
            // sm+: original behavior (stick near the top with a per-card offset).
            className="sticky top-0 flex h-[100svh] items-center sm:top-[var(--stack-top)] sm:block sm:h-auto"
            style={{
              "--stack-top": `${1.5 + i * 1.5}rem`,
              zIndex: i + 1,
            }}
          >
            <div
              // Small downward offset per card on phones so cards behind peek out.
              style={{ "--stack-offset": `${i * 3}rem` }}
              className={`relative mt-[var(--stack-offset)] w-full overflow-hidden rounded-[1.75rem] p-5 shadow-2xl sm:mt-0 sm:min-h-[30rem] sm:rounded-[2.5rem] sm:p-12 lg:min-h-[36rem] lg:p-16 ${c.cardBg} ${c.textColor}`}
            >
              {/* Ghost step number */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-1 right-4 select-none text-[5.5rem] font-black leading-none sm:bottom-auto sm:-top-2 sm:right-10 sm:text-[9rem] lg:right-14 lg:text-[11rem] ${c.numberColor}`}
              >
                {c.number}
              </span>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="min-h-[44vw] max-w-xl pr-[32vw] sm:min-h-0 sm:pr-0">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold sm:px-4 sm:text-sm ${c.badgeBg} ${c.badgeText}`}
                  >
                    {c.tag}
                  </span>
                  <h2 className="mt-4 break-words text-[6.8vw] font-space font-black leading-[1] tracking-tight sm:mt-6 sm:text-6xl sm:leading-[0.95] lg:text-7xl">
                    {c.title}
                  </h2>
                </div>

                <div className="mt-5 max-w-md sm:mt-10 lg:mt-16">
                  <p className="text-[15px] leading-relaxed opacity-90 sm:text-lg sm:leading-normal">
                    {c.description}
                  </p>

                  {c.cta && (
                    <div className="mt-6">
                        <JoinNow
                          text={c.cta.label}
                          bg={c.cta.bg}
                          color={c.cta.text}
                          circleBg={c.cta.circleBg}
                          circleColor={c.cta.circleIcon}
                            url={c.cta.url}
                        />
                      
                    </div>
                  )}
                </div>
              </div>

              {/* Rotated photo, top right */}
              <div
                className="absolute right-4 top-5 z-20 w-[30vw] sm:right-10 sm:top-12 sm:w-48 md:w-56 lg:right-16 lg:top-14 lg:w-72"
                style={{ transform: `rotate(${c.imageRotate}deg)` }}
              >
                <div
                  className={`aspect-[3/4] overflow-hidden rounded-2xl shadow-xl sm:rounded-[1.5rem] ${c.imageBorder}`}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}