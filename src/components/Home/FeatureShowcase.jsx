import { useState } from "react";
import {
  Zap,
  ChevronRight,
  Check,
  ChevronLeft,
  TrendingUp,
  Activity,
  Flame,
  Dumbbell,
  GitPullRequest,
  Bug,
  Terminal,
  Shield,
  Wifi,
  Server,
  MessageSquare,
  Star,
  BarChart2,
  Clock,
  Target,
  AlertCircle,
  UserCheck,
  Lock,
  Bell,
  Award,
  Users2,
Smartphone
} from "lucide-react";
import { NAV_FEATURES } from "./featureShowcase/constants/topfeatures";
import { Shimmer } from "../UI/Shimmer";
import { ExplorePanel } from "./featureShowcase/Explorepanel";
import { SkeletonProgramManagement } from "./featureShowcase/skeletons/SkeletonProgramManagement";
import { SkeletonNutrition } from "./featureShowcase/skeletons/SkeletonNutrition";
import { SkeletonPayments } from "./featureShowcase/skeletons/SkeletonPayments";
import { AgentBadge } from "../UI/AgentBadge";
import {SkeletonClientEngagement} from "./featureShowcase/skeletons/SkeletonClientengagement";
import { SkeletonTeamManagement } from "./featureShowcase/skeletons/SkeletonTeamManagement";
import {SkeletonMobileApp} from "./featureShowcase/skeletons/SkeletonApp";
import { SkeletonSecurity } from "./featureShowcase/skeletons/SkeletonSecurity";
import { SkeletonWorkflows } from "./featureShowcase/skeletons/SkeletonWorkflow";
import { SkeletonClientProfile } from "./featureShowcase/skeletons/SkeletonClientProfile";
import  SkeletonCoachProfile  from "./featureShowcase/skeletons/SkeletonCoachProfile";
import {SkeletonExerciseLibrary} from "./featureShowcase/skeletons/SkeletonDashboard";

// ── Skeleton Default ─────────────────────────────────────────
const SkeletonDefault = () => (
  <>
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3.5"
      style={{
        top: 90, left: -150, width: 200,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        filter: "blur(3px)", opacity: 0.9,
      }}
    >
      <Shimmer w={100} h={10} rounded="rounded-full" className="mb-3" />
      {[70,65,70,50].map((w,i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <Shimmer w={40} h={8} rounded="rounded-full" />
          <Shimmer w={`${w}%`} h={6} rounded="rounded-full" />
        </div>
      ))}
    </div>
    <div
      className="absolute z-10 bg-white rounded-xl border border-gray-100 p-3"
      style={{
        top: 40, right: -235, width: 145,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        filter: "blur(3px)", opacity: 0.5,
      }}
    >
      <Shimmer w={80} h={9} rounded="rounded-full" className="mb-2" />
      <Shimmer w={50} h={20} rounded="rounded-xl" className="mb-2" />
      <Shimmer w="100%" h={8} rounded="rounded-full" />
    </div>
  </>
);

const SKELETON_MAP = {
  0: SkeletonNutrition,
  1: SkeletonClientEngagement ,
  2: SkeletonExerciseLibrary,
  3: SkeletonMobileApp,
  4:  SkeletonWorkflows,
  5: SkeletonTeamManagement,
  6:  SkeletonProgramManagement,
  7: SkeletonClientProfile,
  8: SkeletonCoachProfile,
};

// ── Mobile skeleton map ──────────────────────────────────────
const MOBILE_SKELETON_MAP = {
  0: () => (
    <div
      className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 p-2.5"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)", width: 148 }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Target size={10} className="text-violet-400" />
        <span className="text-[9px] font-bold text-gray-700">Sprint Board</span>
      </div>
      {[["In Progress","60%","#7c3aed"],["Review","35%","#f59e0b"],["Done","90%","#22c55e"]].map(([l,w,c],i) => (
        <div key={i} className="flex items-center gap-1.5 mb-1">
          <span className="text-[8px] text-gray-400 w-14 flex-shrink-0">{l}</span>
          <div className="flex-1 h-1.5 rounded-full bg-gray-100">
            <div className="h-full rounded-full" style={{ width: w, background: c, opacity: 0.8 }} />
          </div>
        </div>
      ))}
    </div>
  ),
  1: () => (
    <div
      className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 p-2.5"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)", width: 148 }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Flame size={10} className="text-rose-400" />
        <span className="text-[9px] font-bold text-gray-700">Macros Today</span>
      </div>
      <div className="flex gap-2">
        {[["P","82g","#fb7185"],["C","210g","#f97316"],["F","44g","#a78bfa"]].map(([l,v,c],i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="text-[12px] font-black" style={{ color: c }}>{v}</div>
            <div className="text-[8px] text-gray-400">{l}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  2: () => (
    <div
      className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 p-2.5"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)", width: 148 }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <TrendingUp size={10} className="text-blue-400" />
        <span className="text-[9px] font-bold text-gray-700">Live KPIs</span>
      </div>
      {[["Revenue","₹84.2K","#1d4ed8"],["Retention","91%","#7c3aed"]].map(([l,v,c],i) => (
        <div key={i} className="flex items-center justify-between mb-1">
          <span className="text-[8px] text-gray-400">{l}</span>
          <span className="text-[10px] font-black" style={{ color: c }}>{v}</span>
        </div>
      ))}
    </div>
  ),
  default: () => (
    <div
      className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 p-2.5 w-32"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
    >
      <Shimmer w="80%" h={8} rounded="rounded-full" className="mb-1.5" />
      <Shimmer w="60%" h={8} rounded="rounded-full" className="mb-1.5" />
      <Shimmer w="90%" h={6} rounded="rounded-full" />
    </div>
  ),
};

// ── Skeleton screen placeholder ──────────────────────────────
const SkeletonScreen = () => (
  <div className="w-full h-full flex flex-col" style={{ minHeight: "460px", background: "#f5f5ff" }}>
    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
      <div className="w-24 h-5 rounded-lg bg-indigo-100" />
      <div className="flex gap-1.5">
        {[60,50,70].map((w,i) => (
          <div key={i} className="h-5 rounded-full bg-gray-100" style={{ width: w }} />
        ))}
      </div>
    </div>
    <div className="px-5 py-5 flex flex-col gap-3">
      <div className="w-44 h-7 rounded-xl bg-indigo-100 mb-1" />
      {[75,90,60,82,68,78].map((w,i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-200 flex-shrink-0" />
          <div className="h-3.5 rounded-lg bg-gray-100" style={{ width: `${w}%` }} />
          <div className="w-20 h-5 rounded-full ml-auto flex-shrink-0"
            style={{ background: i%3===0?"#dcfce7":i%3===1?"#fef9c3":"#fee2e2" }} />
        </div>
      ))}
    </div>
  </div>
);

// ── Main Component ───────────────────────────────────────────
export default function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const [mobIndex, setMobIndex] = useState(0);
const url =import.meta.env.VITE_CALENDLY_LINK;

  const displayFeature = active !== null ? NAV_FEATURES[active] : NAV_FEATURES[0];
  const isBlurred = active === null;

  const handleSelect = (id) => {
    if (id === active) {
      setActive(null);
      setAnimKey((k) => k + 1);
      return;
    }
    setActive(id);
    setAnimKey((k) => k + 1);
    setImgFailed(false);
  };

  const mobNext = () => setMobIndex((i) => (i + 1) % NAV_FEATURES.length);
  const mobFeature = NAV_FEATURES[mobIndex];

  const ActiveDesktopSkeleton = active !== null ? SKELETON_MAP[active] : null;
  const MobSkeletonComp = MOBILE_SKELETON_MAP[mobIndex] || MOBILE_SKELETON_MAP.default;

  return (
    <>
      <style>{`
      

        /* ── Shared keyframes ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes imgFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmerSlide {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .img-anim   { animation: imgFade 0.3s ease both; }
        .floating-tag { animation: slideUp 0.4s ease both; }
        .skeleton-card { animation: floatIn 0.4s cubic-bezier(.22,1,.36,1) both; }

        /* ── Desktop animations ── */
        @keyframes deskImgIn {
          from { opacity: 0; transform: translateY(16px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .desk-img {
          animation: deskImgIn 0.5s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes deskCardIn {
          from { opacity: 0; transform: translateY(14px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .desk-card {
          animation: deskCardIn 0.48s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes deskGlowPulse {
          0%   { box-shadow: 0 16px 60px rgba(0,0,0,0.10); }
          40%  { box-shadow: 0 16px 60px rgba(91,94,244,0.22), 0 0 0 3px rgba(91,94,244,0.10); }
          100% { box-shadow: 0 16px 60px rgba(0,0,0,0.10); }
        }
        .desk-img-glow {
          animation: deskGlowPulse 0.7s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes deskBlurFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .desk-blur-in {
          animation: deskBlurFadeIn 0.3s ease both;
        }

        @keyframes deskBadgeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.88); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .desk-badge {
          animation: deskBadgeIn 0.45s cubic-bezier(.22,1,.36,1) 0.2s both;
        }

        @keyframes deskPanelIn {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .desk-panel {
          animation: deskPanelIn 0.45s cubic-bezier(.22,1,.36,1) 0.1s both;
        }

        @keyframes deskRipple {
          0%   { opacity: 0.18; transform: scale(0.85); }
          60%  { opacity: 0.07; transform: scale(1.04); }
          100% { opacity: 0;    transform: scale(1.08); }
        }
        .desk-ripple {
          animation: deskRipple 0.55s cubic-bezier(.22,1,.36,1) both;
        }

        .explore-btn {
          transition: transform 0.18s cubic-bezier(.22,1,.36,1),
                      box-shadow 0.18s ease,
                      background 0.2s ease;
        }
        .explore-btn:hover {
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 6px 20px rgba(91,94,244,0.18);
        }
        .explore-btn:active {
          transform: scale(0.96);
          transition-duration: 0.08s;
        }

        /* ── Mobile animations ── */
        @keyframes mobPillIn {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mob-pill {
          animation: mobPillIn 0.35s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes mobCardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mob-card {
          animation: mobCardIn 0.45s cubic-bezier(.22,1,.36,1) 0.08s both;
        }

        @keyframes mobImgSlide {
          from { opacity: 0; transform: translateX(22px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        .mob-img {
          animation: mobImgSlide 0.38s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes mobOverlayIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mob-overlay-in {
          animation: mobOverlayIn 0.4s cubic-bezier(.22,1,.36,1) 0.15s both;
        }

        @keyframes mobSweep {
          0%   { opacity: 0;    transform: translateX(-100%); }
          30%  { opacity: 0.18; }
          100% { opacity: 0;    transform: translateX(100%); }
        }
        .mob-tap-sweep {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%);
          animation: mobSweep 0.55s cubic-bezier(.22,1,.36,1) both;
          pointer-events: none;
        }

        @keyframes mobHintIn {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .mob-hint {
          animation: mobHintIn 0.4s cubic-bezier(.22,1,.36,1) 0.3s both;
        }

        @keyframes mobInfoIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mob-info-row {
          animation: mobInfoIn 0.38s cubic-bezier(.22,1,.36,1) 0.12s both;
        }

        @keyframes mobCtaIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mob-cta {
          animation: mobCtaIn 0.4s cubic-bezier(.22,1,.36,1) 0.18s both;
        }

        /* ── Scrollbar hide ── */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── BG Grid ── */
        .fs-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px);
          background-size: 150px 80px;
          pointer-events: none; z-index: 0;
        }
        .fs-grid-bg::after {
          content: ''; position: absolute; inset: 0;
          pointer-events: none; z-index: 1;
          background:
            radial-gradient(ellipse 120% 60% at 50% 0%,   rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, transparent 75%),
            radial-gradient(ellipse 120% 60% at 50% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, transparent 75%),
            radial-gradient(ellipse 55% 140% at 0% 50%,   rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, transparent 75%),
            radial-gradient(ellipse 55% 140% at 100% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 35%, transparent 75%);
        }
      `}</style>

      <section className="fs-root w-full bg-white px-4 sm:px-6 lg:px-10 relative overflow-hidden lg:pt-10 md:pb-40">
        <div className="fs-grid-bg" />

        <div className="2xl:max-w-5xl max-w-4xl mx-auto relative z-10">

          {/* ══ DESKTOP ══════════════════════════════════════════════ */}
<div className="hidden lg:block">

  {/* Pills row — above screenshot */}
  <div className="mb-3 2xl:mb-14 desk-panel">
    <ExplorePanel active={active} onSelect={handleSelect} />
  </div>

  <div
    className="relative
      lg:max-w-[85%] lg:mx-auto lg:min-h-125
      xl:max-w-[92%] xl:mx-auto xl:min-h-125
      2xl:max-w-none 2xl:mx-0 2xl:min-h-[600px]"
  >

    {/* Main screenshot */}
    <div
      key={`img-wrap-${animKey}`}
      className={`absolute left-0 bottom-0 rounded-xl overflow-hidden border border-gray-100 ${active !== null ? "desk-img-glow" : ""}`}
      style={{ width: "100%", boxShadow: "0 16px 60px rgba(0,0,0,0.10)" }}
    >
      {active !== null && (
        <div
          key={`ripple-${animKey}`}
          className="desk-ripple absolute inset-0 z-20 pointer-events-none rounded-xl"
          style={{
            background: "radial-gradient(ellipse at center, rgba(91,94,244,0.18) 0%, transparent 70%)",
          }}
        />
      )}

      {!imgFailed ? (
        <img
          key={`img-${animKey}`}
          src={displayFeature.screenshotImage}
          alt={displayFeature.label}
          className="desk-img w-full h-full object-cover
            lg:min-h-[380px]
            xl:min-h-[460px]
            2xl:min-h-[560px]"
          style={{
            objectPosition:
              displayFeature.id === 3 || displayFeature.id === 6 ? "center" : "left top",
          }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <SkeletonScreen />
      )}

      {isBlurred && (
        <div
          key={`blur-${animKey}`}
          className="desk-blur-in absolute inset-0 z-10"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            background: "rgba(245,245,255,0.50)",
          }}
        />
      )}
    </div>

    {/* Skeleton cards */}
    <div
      key={`skeletons-${animKey}`}
      className="absolute inset-0 pointer-events-none desk-card"
      style={{ top: 72, zIndex: 15 }}
    >
      {isBlurred ? <SkeletonDefault /> : (ActiveDesktopSkeleton && <ActiveDesktopSkeleton />)}
    </div>

    {/* Agent badge */}
    <div
      key={`badge-${animKey}`}
      className="absolute z-20 desk-badge"
      style={{
        bottom: "-30px",
        left: "-60px",
        opacity: isBlurred ? 0.35 : 1,
        filter: isBlurred ? "blur(4px)" : "none",
        pointerEvents: isBlurred ? "none" : "auto",
        transition: "opacity 0.3s ease, filter 0.3s ease",
      }}
    >
      <AgentBadge feature={displayFeature} animKey={animKey} />
    </div>

  </div>
</div>

          {/* ══ MOBILE ═══════════════════════════════════════════════ */}
<div className="lg:hidden flex flex-col gap-3">

  {/* ── Image card ── */}
  <div
  className="w-full h-[200px] md:h-[380px] rounded-2xl relative overflow-hidden cursor-pointer select-none mob-card"
    style={{ background: "#f5f5ff", boxShadow: "0 6px 24px rgba(0,0,0,0.09)" }}
    onClick={mobNext}
  >
    {/* Skeleton bg */}
    <div className="absolute inset-0 -z-10">
      <SkeletonScreen />
    </div>

    {/* Tap sweep shimmer */}
    <div key={`sweep-${mobIndex}`} className="mob-tap-sweep absolute inset-0 z-30 pointer-events-none" />

    {/* Screenshot */}
   <img
  key={`mob-${mobIndex}`}
  src={mobFeature.screenshotImageMobile || mobFeature.screenshotImage}
  alt={mobFeature.label}
  className="mob-img w-full object-cover object-top block h-[220px] md:h-[380px]"
  onError={(e) => { e.currentTarget.style.display = "none"; }}
/>

    {/* Skeleton overlay */}
    {typeof MobSkeletonComp === "function" && (
      <div key={`mob-sk-${mobIndex}`} className="mob-overlay-in">
        <MobSkeletonComp feature={mobFeature} />
      </div>
    )}

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />

    {/* Feature name badge — bottom left */}
    <div className="absolute bottom-3 left-3 z-20">
      <span className="text-[11px] font-semibold text-white/90 tracking-wide">
        {mobFeature.label}
      </span>
    </div>

    {/* Dot indicators — bottom right */}
    <div className="absolute bottom-3.5 right-3 flex gap-1 items-center">
      {NAV_FEATURES.map((_, i) => (
        <div
          key={i}
          onClick={(e) => { e.stopPropagation(); setMobIndex(i); }}
          className="rounded-full cursor-pointer"
          style={{
            width: mobIndex === i ? 14 : 4,
            height: 4,
            background: mobIndex === i ? "#fff" : "rgba(255,255,255,0.35)",
            transition: "width 0.3s cubic-bezier(.22,1,.36,1), background 0.25s ease",
          }}
        />
      ))}
    </div>
  </div>

  {/* ── Feature tabs ── */}
  <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide -mx-4 px-4">
    {NAV_FEATURES.map((f, i) => (
      <button
        key={i}
        onClick={() => setMobIndex(i)}
        className="shrink-0 text-[10px] font-semibold rounded-lg px-3 py-1.5 mob-pill whitespace-nowrap"
        style={{
          animationDelay: `${i * 0.04}s`,
          background: mobIndex === i ? "#6E0ACE" : "rgba(110,10,206,0.07)",
          color: mobIndex === i ? "#fff" : "#7c3aed",
          transition: "background 0.2s ease, color 0.2s ease, transform 0.15s ease",
          transform: mobIndex === i ? "scale(1.04)" : "scale(1)",
        }}
      >
        {f.label}
      </button>
    ))}
  </div>

  {/* ── Info row: label + AgentBadge ── */}
  <div
    key={`info-${mobIndex}`}
    className="flex items-center justify-between px-1 mob-info-row"
  >
    <div className="flex flex-col gap-0.5">
      <span className="text-[13px] font-semibold text-gray-800 leading-tight">
        {mobFeature.label}
      </span>
      {mobFeature.description && (
        <span className="text-[11px] text-gray-400 leading-snug max-w-[200px]">
          {mobFeature.description}
        </span>
      )}
    </div>
    <div style={{ transform: "scale(0.7)", transformOrigin: "right center", flexShrink: 0 }}>
      <AgentBadge feature={mobFeature} animKey={mobIndex} />
    </div>
  </div>

  {/* ── CTA ── */}
  <button onClick={() => window.open(url, "_blank")}
    className="w-[50%] mx-auto md:w-[30%] rounded-xl py-3.5 text-[13px] font-semibold text-white flex items-center justify-center gap-2 mob-cta"
    style={{
      background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
      boxShadow: "0 4px 16px rgba(124,58,237,0.28)",
      transition: "transform 0.12s ease, box-shadow 0.12s ease",
    }}
    onPointerDown={e => {
      e.currentTarget.style.transform = "scale(0.97)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(124,58,237,0.2)";
    }}
    onPointerUp={e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.28)";
    }}
    onPointerLeave={e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.28)";
    }}
  >
  Book a Demo <ChevronRight size={15} />
  </button>

</div>

        </div>
      </section>
    </>
  );
}