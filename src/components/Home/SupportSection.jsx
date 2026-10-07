import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import {
  BookOpen,
  PlayCircle,
  Mail,
  MessageCircle,
  Phone,
  Video,
  Zap,
  UserCheck,
  Briefcase,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/*
  Cards are grouped into three tiers so the row reads as a progression:
  self  -> help you find yourself (neutral)
  live  -> help from a real person (soft tint)
  plus  -> premium / enterprise (dark, stands out)
*/
const cards = [
  { tier: "self", badge: "24/7", icon: BookOpen, title: "Help Centre", description: "Search step-by-step guides and FAQs whenever you need them." },
  { tier: "self", badge: "Anytime", icon: PlayCircle, title: "On-demand Webinars", description: "Watch training videos and feature walkthroughs at your own pace." },
  { tier: "live", badge: "Within 24h", icon: Mail, title: "Email Support", description: "Send us a question and get a detailed reply within 24 hours." },
  { tier: "live", badge: "Business hours", icon: MessageCircle, title: "Live Chat", description: "Chat with a real person inside the platform and get answers fast." },
  { tier: "live", badge: "Business hours", icon: Phone, title: "Phone Support", description: "Talk to a specialist when you need immediate, personal help." },
  { tier: "live", badge: "Weekly", icon: Video, title: "Live Masterclass Calls", description: "Join our team live for deep dives into features and growth strategies." },
  { tier: "plus", badge: "Premium", icon: Zap, title: "Priority Support", description: "Guaranteed fast response times on every channel." },
  { tier: "plus", badge: "Premium", icon: UserCheck, title: "Personalised Onboarding", description: "A dedicated specialist configures your setup with you, one-on-one." },
  { tier: "plus", badge: "Enterprise", icon: Briefcase, title: "Dedicated CSM", description: "A customer success manager focused on your growth, retention and results." },
];

const tierStyles = {
  self: {
    card: "bg-white border-gray-200 text-gray-900",
    tile: "bg-gray-100 text-gray-700",
    badge: "bg-gray-100 text-gray-600",
    desc: "text-gray-600",
  },
  live: {
    card: "bg-sky-50 border-sky-100 text-gray-900",
    tile: "bg-white text-sky-700",
    badge: "bg-white text-sky-800",
    desc: "text-gray-600",
  },
  plus: {
    card: "bg-slate-900 border-slate-900 text-white",
    tile: "bg-white/10 text-white",
    badge: "bg-white/15 text-white",
    desc: "text-slate-300",
  },
};

const PAD_X = "px-5 sm:px-8 lg:px-12 xl:px-24";

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function NavButton({ dir, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir < 0 ? "Previous" : "Next"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-800 transition-colors
        hover:border-gray-900 hover:bg-gray-900 hover:text-white
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900
        disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-white disabled:text-gray-300"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={dir < 0 ? "M10 12L6 8l4-4" : "M6 4l4 4-4 4"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function SupportSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [bar, setBar] = useState({ left: 0, width: 100 }); // percentages

  /* ───────────────────────── slider behaviour ───────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setIsBeginning(track.scrollLeft <= 2);
      setIsEnd(max <= 0 || track.scrollLeft >= max - 2);
      const width = Math.min(100, (track.clientWidth / track.scrollWidth) * 100);
      const left = max > 0 ? (track.scrollLeft / max) * (100 - width) : 0;
      setBar({ left, width });
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);

    // mouse drag-to-scroll with inertia (touch and trackpad use native scrolling)
    const reduced = prefersReduced();
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;

    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      gsap.killTweensOf(track);
      dragging = true;
      startX = lastX = e.clientX;
      startLeft = track.scrollLeft;
      lastT = performance.now();
      velocity = 0;
      track.setPointerCapture(e.pointerId);
      track.classList.add("cursor-grabbing", "select-none");
    };

    const onMove = (e) => {
      if (!dragging) return;
      track.scrollLeft = startLeft - (e.clientX - startX);
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) velocity = 0.8 * velocity + 0.2 * ((lastX - e.clientX) / dt);
      lastX = e.clientX;
      lastT = now;
    };

    const onUp = (e) => {
      if (!dragging) return;
      dragging = false;
      if (track.hasPointerCapture?.(e.pointerId)) track.releasePointerCapture(e.pointerId);
      track.classList.remove("cursor-grabbing", "select-none");
      if (!reduced && Math.abs(velocity) > 0.05) {
        gsap.to(track, {
          scrollTo: { x: track.scrollLeft + velocity * 450, autoKill: true },
          duration: 1.1,
          ease: "power3.out",
        });
      }
    };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);

    return () => {
      track.removeEventListener("scroll", update);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      ro.disconnect();
      gsap.killTweensOf(track);
    };
  }, []);

  // arrow buttons: glide to the previous / next card
  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const els = Array.from(track.querySelectorAll("[data-card]"));
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const cur = track.scrollLeft;
    let target;

    if (dir > 0) {
      const next = els.find((c) => c.offsetLeft - pad > cur + 4);
      target = next ? next.offsetLeft - pad : track.scrollWidth;
    } else {
      const prev = [...els].reverse().find((c) => c.offsetLeft - pad < cur - 4);
      target = prev ? prev.offsetLeft - pad : 0;
    }

    gsap.to(track, {
      scrollTo: { x: target, autoKill: true },
      duration: prefersReduced() ? 0 : 0.9,
      ease: "power3.inOut",
    });
  };

  /* ───────────────────────── entrance animation (one reveal) ───────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-head], [data-card]", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-white py-16 lg:py-28">
      {/* Heading + desktop nav */}
      <div className={`${PAD_X} mb-8 flex items-end justify-between gap-6 lg:mb-14`}>
        <div data-head>
          <h2 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            We're with you
            <br />
            every step of the way
          </h2>
          <p className="mt-4 max-w-md text-base text-gray-600">
            Start with self-serve help, talk to our team when you need to, and get hands-on support as you grow.
          </p>
        </div>

        <div data-head className="hidden shrink-0 items-center gap-2.5 sm:flex">
          <NavButton dir={-1} disabled={isBeginning} onClick={() => slide(-1)} />
          <NavButton dir={1} disabled={isEnd} onClick={() => slide(1)} />
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Support options"
        tabIndex={0}
        className={`flex cursor-grab gap-4 overflow-x-auto overflow-y-hidden py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-slate-900 ${PAD_X}`}
      >
        {cards.map(({ tier, badge, icon: Icon, title, description }) => {
          const s = tierStyles[tier];
          return (
            <div
              key={title}
              data-card
              className="w-[85%] flex-none min-[480px]:w-[calc((100%-1rem)/1.15)] sm:w-[calc((100%-1rem)/2.15)] lg:w-[calc((100%-2rem)/3.15)] min-[1440px]:w-[calc((100%-3rem)/4.15)]"
            >
              <article
                className={`flex h-full min-h-72 flex-col justify-between rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1 ${s.card}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.tile}`}>
                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${s.badge}`}>
                    {badge}
                  </span>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-medium tracking-tight sm:text-2xl">{title}</h3>
                  <p className={`text-[0.95rem] leading-relaxed ${s.desc}`}>{description}</p>
                </div>
              </article>
            </div>
          );
        })}
        {/* end spacer so the last card can fully clear the right padding */}
        <div aria-hidden="true" className="w-1 flex-none" />
      </div>

      {/* Progress bar + mobile nav */}
      <div className={`${PAD_X} mt-8 flex items-center gap-6`}>
        <div
          className="sm:hidden relative h-1 flex-1 overflow-hidden rounded-full bg-gray-200"
          aria-hidden="true"
        >
          <div
            className=" absolute top-0 h-full rounded-full bg-slate-900"
            style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
          />
        </div>
        <div className="flex items-center gap-2.5 sm:hidden">
          <NavButton dir={-1} disabled={isBeginning} onClick={() => slide(-1)} />
          <NavButton dir={1} disabled={isEnd} onClick={() => slide(1)} />
        </div>
      </div>
    </section>
  );
}