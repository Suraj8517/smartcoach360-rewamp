import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";

import {
  ClipboardList,
  Salad,
  Bolt,
  MessageSquare,
  CreditCard,
  BarChart,
  Users,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

import avatar1 from "../../assets/crm/avatar/avatar1.png";
import avatar2 from "../../assets/crm/avatar/avatar2.png";
import avatar3 from "../../assets/crm/avatar/avatar3.png";
import avatar4 from "../../assets/crm/avatar/avatar4.png";
import avatar5 from "../../assets/crm/avatar/avatar5.png";
import avatar6 from "../../assets/crm/avatar/avatar6.png";

import coaching   from "../../assets/crm/exercise-library.png";
import nutri      from "../../assets/crm/nutrition.png";
import workflow   from "../../assets/crm/workflow.png";
import engage     from "../../assets/crm/chat.png";
import payments   from "../../assets/crm/payments.png";
import dashboards from "../../assets/crm/dashboard.webp";
import teamcrm    from "../../assets/crm/team.png";
import crmapp     from "../../assets/crm/app.png";
import crmsecurity from "../../assets/crm/security.png";

// ─────────────────────────────────────────────────────────────────────────────
const features = [
  {
    num: "001", icon: <ClipboardList size={16} />, img: coaching,
    title: "Program", subtitle: "Program Management",
    desc: "Build your master library once. Assign fully customised plans to individual clients in seconds. Clients get workouts on the app — no PDFs, no confusion.",
    tags: ["Master Programs", "Video Library", "Auto Notifications", "Custom Exercises"],
  },
  {
    num: "002", icon: <Salad size={16} />, img: nutri,
    title: "Nutrition", subtitle: "Nutrition & Activity",
    desc: "Create personalised meal plans, set macro targets, track daily compliance. Includes a dedicated female health and hormonal cycle tracker.",
    tags: ["Meal Tracking", "Macro Goals", "Compliance Monitor", "Female Health"],
  },
  {
    num: "003", icon: <Bolt size={16} />, img: workflow,
    title: "Workflow", subtitle: "Business Automation",
    desc: "Lead allocation, client onboarding, payment flows, and communication sequences — completely automated and running in the background.",
    tags: ["Lead Allocation", "Auto Onboarding", "Payment Flows", "Message Sequences"],
  },
  {
    num: "004", icon: <MessageSquare size={16} />, img: engage,
    title: "Outreach", subtitle: "Client Engagement",
    desc: "Automated check-ins, in-app messaging, video calls, group challenges, and digital high-fives. Keep every client engaged between sessions.",
    tags: ["In-App Messaging", "Video Calls", "Group Challenges", "Auto Check-ins"],
  },
  {
    num: "005", icon: <CreditCard size={16} />, img: payments,
    title: "Payments", subtitle: "Payments & Revenue",
    desc: "No more chasing. Accept online payments, set up recurring session packs, configure discounts, and handle partial payments — all built in.",
    tags: ["Online Payments", "Session Packs", "Discount Codes", "Instalments"],
  },
  {
    num: "006", icon: <BarChart size={16} />, img: dashboards,
    title: "Dashboards", subtitle: "Dashboards & Reports",
    desc: "Real-time view of client compliance, progress, and business health. Custom surveys, pre-assessment forms, performance dashboards.",
    tags: ["Live Reports", "Business Insights", "Custom Surveys", "Health Intake"],
  },
  {
    num: "007", icon: <Users size={16} />, img: teamcrm,
    title: "Team", subtitle: "Team & Organisation Management",
    desc: "Whether you are a solo coach or managing a multi-branch fitness organisation, scale effortlessly. Control teams, assign roles, and oversee operations from one central dashboard.",
    tags: ["Team & Branch Management", "Role-Based Access", "Coach Allocation Limits", "Bulk Upload Tools"],
  },
  {
    num: "008", icon: <Smartphone size={16} />, img: crmapp,
    title: "App", subtitle: "Mobile App iOS & Android",
    desc: "Run your entire coaching business from your pocket. Coaches and clients get a seamless mobile experience with real-time updates and integrated health tracking.",
    tags: ["iOS & Android Apps", "Client Self-Service", "Push Notifications", "Health Data Sync"],
  },
  {
    num: "009", icon: <ShieldCheck size={16} />, img: crmsecurity,
    title: "Security", subtitle: "Security & Compliance",
    desc: "Enterprise-grade security built into every plan. Protect sensitive client data with advanced authentication, secure payments, and compliance tools.",
    tags: ["SSO Support", "Access Control", "PCI-DSS Payments", "GDPR Tools"],
  },
];

const bannerAvatars = [
  { id: 1, url: avatar1, bg: "#b6e3f4" },
  { id: 2, url: avatar2, bg: "#c0aede" },
  { id: 3, url: avatar3, bg: "#ffdfbf" },
  { id: 4, url: avatar4, bg: "#d1d4f9" },
  { id: 5, url: avatar5, bg: "#ffd5dc" },
  { id: 6, url: avatar6, bg: "#c0e8c0" },
];
const url =import.meta.env.VITE_CALENDLY_LINK;

// ─────────────────────────────────────────────────────────────────────────────
function BannerAvatar({ av, size }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-2xl overflow-hidden flex-shrink-0 border border-white/10"
      style={{ width: size, height: size, minWidth: size, background: av.bg }}
    >
      <img src={av.url} alt="" draggable={false} className="w-full h-full object-cover" />
    </span>
  );
}

function Segment({ avs }) {
  return (
    <span className="inline-flex items-center flex-shrink-0" style={{ paddingRight: 54 }}>
      <span className="inline-flex items-end gap-2 flex-shrink-0 px-8">
        <BannerAvatar av={avs[0]} size={54} />
        <BannerAvatar av={avs[1]} size={72} />
        <BannerAvatar av={avs[2]} size={58} />
      </span>
      <span
        className="text-white whitespace-nowrap flex-shrink-0 select-none"
        style={{
          fontSize: "clamp(50px, 7vw, 134px)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          fontFamily: "'Poppins', 'Arial Black', Arial, sans-serif",
        }}
      >
        <span className="text-purple-500 font-bold">#1</span> Platform for Coaches
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function DetailedFeatures() {
  const [activeIdx, setActiveIdx] = useState(0);
  const swiperRef  = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
   const [isBegin, setIsBegin] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  // Banner scroll
  const wrapperRef = useRef(null);
  const trackRef   = useRef(null);
  const curX       = useRef(0);
  const tgtX       = useRef(0);
  const rafRef     = useRef(null);
  const [bannerX, setBannerX] = useState(0);

  useEffect(() => {
    const tick = () => {
      curX.current += (tgtX.current - curX.current) * 0.09;
      setBannerX(curX.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current || !trackRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const vh   = window.innerHeight;
      const totalTravel = vh + wrapperRef.current.offsetHeight;
      const progress    = Math.max(0, Math.min(1, (vh - rect.top) / totalTravel));
      const loopW       = trackRef.current.scrollWidth / 3;
      tgtX.current      = progress * loopW;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const loopW = trackRef.current ? trackRef.current.scrollWidth / 3 : 1;
  const safeX = ((bannerX +700 % loopW) + loopW) % loopW;
  const seg2  = [...bannerAvatars].reverse();
  const feature = features[activeIdx];

  const goTo = (idx) => {
    const safe = ((idx % features.length) + features.length) % features.length;
    swiperRef.current?.slideTo(safe);
  };

  return (
    <div className="bg-black w-full min-h-screen">

      {/* ══ BANNER ══ */}
      <div ref={wrapperRef} className="relative" style={{ height: 480 }}>
        <div className="bg-black overflow-hidden" style={{ height: 180 }}>
          <div className="absolute inset-y-0 left-0 z-20 pointer-events-none"
            style={{ width: 120, background: "linear-gradient(to right, #000 35%, transparent)" }} />
          <div className="absolute inset-y-0 right-0 z-20 pointer-events-none"
            style={{ width: 120, background: "linear-gradient(to left, #000 35%, transparent)" }} />
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center"
              style={{ transform: `translateX(${-safeX}px)`, willChange: "transform", whiteSpace: "nowrap" }}
            >
              <Segment avs={bannerAvatars} />
              <Segment avs={seg2} />
              <Segment avs={bannerAvatars} />
            </div>
          </div>
        </div>
      </div>

      {/* ══ FEATURES ══ */}
      <div className="flex flex-col items-center px-0 pb-24">

        <p className="text-white/40 text-[13px] font-medium mb-5" style={{ letterSpacing: "0.12em" }}>
          Platform Features
        </p>

        <h2
          className="text-white font-medium leading-[1.15] mb-10 text-center"
          style={{ fontSize: "clamp(26px, 3.8vw, 60px)", letterSpacing: "-0.02em" }}
        >
          Everything You Need to Coach, <br />
          Grow &amp; Automate
        </h2>

        {/* Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 px-6">
          {features.map((f, i) => (
            <button
              key={f.num}
              onClick={() => goTo(i)}
              className={[
                "rounded-full px-4 py-[7px] text-[14px] font-medium transition-all duration-200 border outline-none cursor-pointer",
                i === activeIdx
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "bg-[#1a1a1a] border-white/20 text-white/60 hover:border-white/40 hover:text-white/90",
              ].join(" ")}
            >
              {f.title}
            </button>
          ))}
        </div>

        {/* ══ SWIPER ══ */}
        <div className="w-full relative">
          
          <Swiper
  modules={[Navigation, Keyboard]}
  onSwiper={(sw) => {
    swiperRef.current = sw;
    setIsBegin(sw.isBeginning);
    setIsEnd(sw.isEnd);
  }}
  onSlideChange={(sw) => {
    setActiveIdx(sw.realIndex);
    setIsBegin(sw.isBeginning);
    setIsEnd(sw.isEnd);
  }}
  keyboard={{ enabled: true }}
  centeredSlides
  initialSlide={4}
  slidesPerView="auto"
  spaceBetween={20}
  speed={500}
  grabCursor
  navigation={{
    prevEl: prevBtnRef.current,
    nextEl: nextBtnRef.current,
  }}
  onBeforeInit={(sw) => {
    sw.params.navigation.prevEl = prevBtnRef.current;
    sw.params.navigation.nextEl = nextBtnRef.current;
  }}
>
            {features.map((f, i) => {
              const isActive = i === activeIdx;
              return (
                <SwiperSlide
                  key={f.num}
                  style={{ width: 840, height: 520 }}
                >
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden flex flex-col"
                    style={{
                      background: "#111111",
                      border: "1px solid rgba(255,255,255,0.07)",
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "scale(1)" : "scale(0.94)",
                      transition: "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease",
                      boxShadow: isActive
                        ? "0 0 0 1px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.7)"
                        : "none",
                    }}
                  >
                    {/* Card header */}
                    <div
                      className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                      style={{ background: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}
                        >
                          {f.icon}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {f.subtitle}
                          </p>
                          <p className="text-white/30 text-[10px]">{f.num}</p>
                        </div>
                      </div>
                      {isActive && (
                        <button onClick={() => window.open(url, "_blank")} className="group flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-all flex-shrink-0">
                          Book a Demo
                          <span className="group-hover:translate-x-1 transition-transform duration-300"><svg  width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg></span>
                        </button>
                      )}
                    </div>

                    {/* Image */}
                    <div className="flex-1 overflow-hidden" style={{ padding: isActive ? 8 : 0 }}>
                      <img
                        src={f.img}
                        alt={f.title}
                        className="w-full h-full object-cover rounded-xl"
                        style={{ objectPosition: "top left" }}
                        draggable={false}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* ══ INFO ROW ══ */}
        <div className="w-full max-w-4xl flex items-start justify-between gap-6 mt-8 px-6">
          <div className="flex-1">
            <p className="text-white font-semibold text-lg mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {feature.subtitle}
            </p>
            <p className="text-white/55 text-[18px] leading-relaxed mb-4">
              {feature.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {feature.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[14px] font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.22)",
                    color: "#a78bfa",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 flex-shrink-0 pt-1">
            <button
              ref={prevBtnRef}
              
className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all text-base
${
  isBegin
    ? "border-white/10 text-white/20 cursor-not-allowed"
    : "border-white/20 text-white/50 hover:border-white/50 hover:text-white"
}`}            >
              <svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M13 8H3M7 4L3 8l4 4"
    stroke="#ffffff"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
            </button>
            <button
              ref={nextBtnRef}
              
className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all text-base
${
  isBegin
    ? "border-white/10 text-white/20 cursor-not-allowed"
    : "border-white/20 text-white/50 hover:border-white/50 hover:text-white"
}`}            >
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}