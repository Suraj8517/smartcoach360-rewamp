import { useState, useEffect, useRef } from "react";
import app from "../../assets/aboutus/milestone/mockup.avif"
import enterprise from "../../assets/aboutus/milestone/enterprise.avif"
import world from "../../assets/aboutus/milestone/worldwide.avif"

// ─── Replace image URLs with your own ───────────────────────────────────────
const images = {
  platformLaunch:
    world,
  clientsWorldwide:
    enterprise,
  // Replace with your mobile app mockup image
  mobileAppMockup:
    app,
};

// ─── Count-up hook ───────────────────────────────────────────────────────────
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseInt(String(target).replace(/[^0-9]/g, ""), 10);
    if (isNaN(numeric)) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Scroll-reveal wrapper ───────────────────────────────────────────────────
function AnimatedCard({ children, delay = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Animated stat number ────────────────────────────────────────────────────
function AnimatedStat({ value, suffix = "" }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const numeric = parseInt(String(value).replace(/[^0-9]/g, ""), 10);
  const counted = useCountUp(numeric, 2000, started);
  const display = isNaN(numeric) ? value : counted.toLocaleString();
  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Tag pill ────────────────────────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-violet-500/50 text-white bg-violet-950/60">
      {label}
    </span>
  );
}


// ────────────────────────────────────────────────────────────────────────────
export default function MilestoneSection() {
  return (
    <section
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-16 font-sans"
    >
<div className="max-w-6xl lg:max-w-6xl relative z-50 w-full mx-auto flex flex-col items-center md:px-8 px-2 md:pt-10 pb-6 md:pb-28 lg:flex-row lg:items-start lg:justify-between ">
          <h2
            className="text-center md:text-left text-black font-normal leading-[0.95] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
            }}
          >
           Milestones <br />
            <span>that shaped us.</span>
          </h2>
         
        </div>
      {/* ══════════════════════════════════════════════
          MOBILE  (<640px) — single column
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col gap-4 sm:hidden">

        {/* Platform Launch */}
        <AnimatedCard delay={0} className="rounded-[28px] overflow-hidden relative h-72">
          <img src={images.platformLaunch} alt="Platform launch" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0520]/95 via-violet-950/50 to-transparent" />
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-violet-700 text-violet-100 px-4 py-1.5 rounded-full">
               Platform Launch
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white font-black text-2xl leading-snug">SmartCoach360 goes live worldwide</p>
            <p className="text-violet-300 text-sm mt-2 leading-relaxed">The first platform built for how coaching businesses actually work.</p>
          </div>
        </AnimatedCard>

        {/* Coaches + Clients */}
        <div className="grid grid-cols-2 gap-4">
          <AnimatedCard delay={60} className="rounded-[28px] p-6 flex flex-col justify-between min-h-[170px]" style={{ background: "#160a2e", border: "1px solid rgba(139,92,246,0.2)" }}>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Community</p>
            <div>
              <p className="text-3xl font-black text-white leading-none"><AnimatedStat value={10000} suffix="+" /></p>
              <p className="text-sm text-violet-400 font-medium mt-2 leading-snug">coaches on the platform daily</p>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={100} className="rounded-[28px] p-6 flex flex-col justify-between min-h-[170px]" style={{ background: "#1e1040", border: "1px solid rgba(139,92,246,0.2)" }}>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Success stories</p>
            <div>
              <p className="text-3xl font-black text-white leading-none"><AnimatedStat value={500} suffix="k" /></p>
              <p className="text-sm text-violet-400 font-medium mt-2 leading-snug">client transformations</p>
            </div>
          </AnimatedCard>
        </div>

        {/* Mobile Apps */}
        <AnimatedCard delay={140} className="rounded-[28px] p-6 flex flex-col gap-4 overflow-hidden" style={{ background: "#160a2e", border: "1px solid rgba(139,92,246,0.2)" }}>
          <div className="flex items-center gap-3">
            
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Mobile apps</span>
          </div>
          <p className="text-xl font-extrabold text-white leading-snug">Full iOS and Android apps released</p>
          <p className="text-sm text-violet-400 leading-relaxed">Complete platform access in your pocket—coaches and clients connected anywhere.</p>
          {/* Your mockup image goes here */}
          <div className="rounded-2xl overflow-hidden h-44 mt-1">
            <img src={images.mobileAppMockup} alt="Mobile app mockup" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex gap-2">
            <Tag label="iOS" /><Tag label="Android" />
          </div>
        </AnimatedCard>

        {/* 40+ Features */}
        <AnimatedCard delay={180} className="rounded-[28px] p-6 flex flex-col gap-3" style={{ background: "#1e1040", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Built by the community</p>
          <p className="text-6xl font-black text-white leading-none"><AnimatedStat value={40} suffix="+" /></p>
          <p className="text-base font-bold text-violet-100">features shaped by real coaches</p>
          <p className="text-sm text-violet-400 leading-relaxed">No speculation, no assumptions—every feature built on real workflows.</p>
        </AnimatedCard>

        {/* Enterprise */}
        <AnimatedCard delay={220} className="rounded-[28px] p-6 flex flex-col gap-4" style={{ background: "#0e0520", border: "1px solid rgba(139,92,246,0.25)" }}>
          <span className="self-start text-[11px] font-bold uppercase tracking-widest bg-violet-900 text-violet-300 px-4 py-1.5 rounded-full border border-violet-700/40">Enterprise tier</span>
          <p className="text-xl font-black text-white leading-snug">Multi-branch, SSO &amp; dedicated support</p>
          <p className="text-sm text-violet-400 leading-relaxed">Available to large fitness organisations—with the infrastructure and security to match.</p>
          <div className="flex flex-wrap gap-2">
            <Tag label="SSO" /><Tag label="Multi-branch" /><Tag label="Priority support" />
          </div>
          <div className="rounded-2xl overflow-hidden h-36 mt-1">
            <img src={images.clientsWorldwide} alt="Enterprise clients" className="w-full h-full object-cover" />
          </div>
        </AnimatedCard>

      </div>

      {/* ══════════════════════════════════════════════
          TABLET  (640–1023px) — 2 column
      ══════════════════════════════════════════════ */}
      <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">

        {/* Platform Launch — full width */}
        <AnimatedCard delay={0} className="col-span-2 rounded-[28px] overflow-hidden relative h-80">
          <img src={images.platformLaunch} alt="Platform launch" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0520]/95 via-violet-950/60 to-transparent" />
          <div className="absolute top-6 left-7">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-violet-700 text-violet-100 px-4 py-1.5 rounded-full">
               Platform Launch
            </span>
          </div>
          <div className="absolute bottom-8 left-8 max-w-md">
            <p className="text-white font-black text-3xl leading-snug">SmartCoach360 goes live worldwide</p>
            <p className="text-violet-300 text-sm mt-2 leading-relaxed">The first platform built for how coaching businesses actually work.</p>
          </div>
        </AnimatedCard>

        {/* Coaches */}
        <AnimatedCard delay={60} className="rounded-[28px] p-8 flex flex-col justify-between min-h-[210px]" style={{ background: "#160a2e", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Community</p>
          <div>
            <p className="text-6xl font-black text-white leading-none"><AnimatedStat value={10000} suffix="+" /></p>
            <p className="text-base font-medium text-violet-400 mt-3">coaches using the platform daily</p>
          </div>
        </AnimatedCard>

        {/* Clients */}
        <AnimatedCard delay={100} className="rounded-[28px] p-8 flex flex-col justify-between min-h-[210px]" style={{ background: "#1e1040", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Success stories</p>
          <div>
            <p className="text-6xl font-black text-white leading-none"><AnimatedStat value={500} suffix="k" /></p>
            <p className="text-base font-medium text-violet-400 mt-3">client transformations enabled</p>
          </div>
        </AnimatedCard>

        {/* Mobile Apps */}
        <AnimatedCard delay={140} className="rounded-[28px] p-7 flex flex-col gap-4 overflow-hidden" style={{ background: "#160a2e", border: "1px solid rgba(139,92,246,0.2)" }}>
          <div className="flex items-center gap-3">
          
            <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Mobile apps</span>
          </div>
          <p className="text-xl font-extrabold text-white leading-snug">Full iOS and Android apps released</p>
          <p className="text-sm text-violet-400 leading-relaxed">Complete platform access in your pocket—anywhere, on any device.</p>
          <div className="rounded-2xl overflow-hidden h-40">
            <img src={images.mobileAppMockup} alt="Mobile app mockup" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex gap-2 mt-auto">
            <Tag label="iOS" /><Tag label="Android" />
          </div>
        </AnimatedCard>

        {/* 40+ Features */}
        <AnimatedCard delay={180} className="rounded-[28px] p-7 flex flex-col justify-between" style={{ background: "#1e1040", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Built by the community</p>
          <div>
            <p className="text-6xl font-black text-white leading-none"><AnimatedStat value={40} suffix="+" /></p>
            <p className="text-base font-bold text-violet-100 mt-2">features shaped by real coaches</p>
            <p className="text-sm text-violet-400 leading-relaxed mt-1">No speculation, no assumptions.</p>
          </div>
        </AnimatedCard>

        {/* Enterprise — full width */}
        <AnimatedCard delay={220} className="col-span-2 rounded-[28px] p-7 flex gap-8 items-center overflow-hidden" style={{ background: "#0e0520", border: "1px solid rgba(139,92,246,0.25)" }}>
          <div className="flex-1">
            <span className="text-[11px] font-bold uppercase tracking-widest bg-violet-900 text-violet-300 px-4 py-1.5 rounded-full border border-violet-700/40">Enterprise tier</span>
            <p className="text-2xl font-black text-white leading-snug mt-4">Multi-branch, SSO &amp; dedicated support</p>
            <p className="text-sm text-violet-400 leading-relaxed mt-2">Available to large fitness organisations—with infrastructure and security to match.</p>
            <div className="flex gap-2 flex-wrap mt-4">
              <Tag label="SSO" /><Tag label="Multi-branch" /><Tag label="Priority support" />
            </div>
          </div>
          <div className="w-48 rounded-2xl overflow-hidden h-36 flex-shrink-0">
            <img src={images.clientsWorldwide} alt="Enterprise clients" className="w-full h-full object-cover" />
          </div>
        </AnimatedCard>

      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP  (≥1024px) — 3-column bento grid
      ══════════════════════════════════════════════ */}
      <div className="hidden md:grid grid-cols-3 gap-4" style={{ gridTemplateRows: "1fr 1fr auto" }}>
        
        {/* [R1–R2 C1] Platform Launch */}
        <AnimatedCard delay={0} className="row-span-2 rounded-[28px] overflow-hidden relative" style={{ minHeight: 440 }}>
          <img src={images.platformLaunch} alt="Platform launch" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0520]/95 via-violet-950/50 to-transparent" />
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-black text-violet-100 px-4 py-1.5 rounded-full">
               Platform Launch
            </span>
          </div>
          <div className="absolute bottom-8 left-7 right-7">
            <p className="text-white font-medium text-2xl leading-snug">SmartCoach360 goes live worldwide</p>
            <p className="text-white text-sm mt-3 leading-relaxed">
              Fitness professionals everywhere gain access to the first platform built specifically for how coaching businesses actually work.
            </p>
          </div>
        </AnimatedCard>

        {/* [R1 C2] Coaches */}
        <AnimatedCard delay={80} className="rounded-[28px] p-8 flex flex-col justify-between" style={{ minHeight: 210, background: "#160a2e", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Community</p>
          <div>
            <p className="text-6xl font-black text-white leading-none"><AnimatedStat value={10000} suffix="+" /></p>
            <p className="text-base font-medium text-white mt-3">coaches using the platform daily</p>
          </div>
        </AnimatedCard>

        {/* [R1–R2 C3] Enterprise */}
        <AnimatedCard delay={60} className="row-span-2 rounded-[28px] p-8 flex flex-col justify-between overflow-hidden" style={{ minHeight: 440, background: "#0e0520", border: "1px solid rgba(139,92,246,0.25)" }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest bg-violet-900 text-violet-100 px-4 py-1.5 rounded-full border border-violet-700/40">Enterprise tier</span>
            <p className="text-3xl font-black text-white leading-snug mt-5">
              Multi-branch, SSO &amp; dedicated support
            </p>
            <p className="text-sm text-white leading-relaxed mt-4">
              The full platform available to large fitness organisations with the infrastructure and security to match.
            </p>
            <div className="flex gap-2 flex-wrap mt-5">
              <Tag label="SSO" /><Tag label="Multi-branch" /><Tag label="Priority support" />
            </div>
          </div>
          <div className="mt-6 rounded-2xl overflow-hidden h-40">
            <img src={images.clientsWorldwide} alt="Enterprise" className="w-full h-full object-cover" />
          </div>
        </AnimatedCard>

        {/* [R2 C2] Clients */}
        <AnimatedCard delay={120} className="rounded-[28px] p-8 flex flex-col justify-between" style={{ minHeight: 210, background: "#1e1040", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Success stories</p>
          <div>
            <p className="text-6xl font-black text-white leading-none"><AnimatedStat value={500} suffix="k" /></p>
            <p className="text-base font-medium text-white mt-3">client transformations enabled</p>
          </div>
        </AnimatedCard>

        {/* [R3 C1–C2] Mobile Apps — spans 2 columns */}
        <AnimatedCard delay={160} className="col-span-2 rounded-[28px] p-8 overflow-hidden" style={{ background: "#160a2e", border: "1px solid rgba(139,92,246,0.2)" }}>
          <div className="flex items-start gap-8">
            {/* Left: text */}
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Mobile app</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white leading-snug">
                  Full iOS and Android apps released
                </p>
                <p className="text-sm text-white leading-relaxed mt-3 max-w-sm">
                  Complete platform access in your pocket coaches and clients connected anywhere, on any device.
                </p>
              </div>
              <div className="flex gap-3">
                <Tag label="iOS" />
                <Tag label="Android" />
              </div>
            </div>
            {/* Right: your mockup image — replace src with your own */}
            <div
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ width: 260, height: 220 }}
            >
              <img
                src={images.mobileAppMockup}
                alt="Mobile app mockup — replace with your own"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </AnimatedCard>

        {/* [R3 C3] 40+ Features */}
        <AnimatedCard delay={200} className="rounded-[28px] p-8 flex flex-col justify-between" style={{ background: "#1e1040", border: "1px solid rgba(139,92,246,0.2)" }}>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Built by the community</p>
          <div>
            <p className="text-6xl font-black text-white leading-none"><AnimatedStat value={40} suffix="+" /></p>
            <p className="text-base font-bold text-violet-100 mt-3">features shaped by real coaches</p>
            <p className="text-sm text-white leading-relaxed mt-2">
              Every single feature built on real coaching workflows no speculation, no assumptions.
            </p>
          </div>
        </AnimatedCard>

      </div>
    </section>
  );
}