import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import engage from '../../assets/for whom/trainer.avif'
import client from '../../assets/for whom/owner.avif'
import nutrients from '../../assets/for whom/wellness.avif'
import security from '../../assets/for whom/gym.avif'

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    id: "personal-trainer",
    label: "Case Study 1 — Personal Trainer",
    author: "Independent Personal Trainer — Online & In-person",
    quote: "I Went From 12 Clients to 35 in 6 Months Without Burning Out",
    challenge:
      "Tracking clients through spreadsheets and WhatsApp worked at first, but as the roster grew, things started slipping. Check-ins became inconsistent, payments were delayed, and there was no reliable way to monitor progress.",
    whatChanged:
      "After moving to SmartCoach360, everything consolidated into one platform. Automated check-ins reduced manual follow-ups, clients received weekly programmes in the mobile app, and payments ran automatically through session packs.",
    stats: [
      { label: "Client Growth", value: "12 → 35" },
      { label: "Admin Saved", value: "12 hrs/wk" },
      { label: "Payment Rate", value: "78% → 99%" },
      { label: "Retention", value: "+40%" },
      { label: "Satisfaction", value: "4.9 / 5 ★" },
    ],
    image: engage,
    authorColor: "text-violet-200",
    labelColor: "bg-violet-950/60 text-violet-200 border border-violet-800/50",
    statValueColor: "text-violet-200",
    gradientColor: "from-[#140b25] via-[#0f0a18]/90 to-[#0f0a18]/60",
    accentBorder: "border-violet-900/40",
    dividerColor: "border-violet-900/40",
    imageBorder: "ring-violet-900/50",
  },
  {
    id: "gym-owner",
    label: "Case Study 2 — Gym Owner",
    author: "Fitness Studio Owner — 3 Locations, 8 Coaches",
    quote: "SmartCoach360 Gave Me Real Visibility Across All 3 Gyms for the First Time",
    challenge:
      "Three locations, eight coaches, and no single source of truth. Every studio operated slightly differently, which meant the client experience depended too much on which coach they worked with and which location they visited.",
    whatChanged:
      "SmartCoach360 brought all three locations into one platform. Master programmes helped every coach deliver a consistent experience, and automated client allocation matched new members to the right coach.",
    stats: [
      { label: "Admin Overhead", value: "−35%" },
      { label: "Onboarding Time", value: "2d → 2hrs" },
      { label: "Revenue View", value: "Real-time" },
      { label: "Coach Tracking", value: "Automated" },
      { label: "Satisfaction", value: "+28%" },
    ],
    image: client,
    authorColor: "text-pink-200",
    labelColor: "bg-pink-950/60 text-pink-200 border border-pink-800/50",
    statValueColor: "text-pink-200",
    gradientColor: "from-[#240b17] via-[#140a10]/90 to-[#140a10]/60",
    accentBorder: "border-pink-900/40",
    dividerColor: "border-pink-900/40",
    imageBorder: "ring-pink-900/50",
  },
  {
    id: "nutrition-coach",
    label: "Case Study 3 — Nutrition Coach",
    author: "Online Nutrition & Wellness Coach — 60+ Remote Clients",
    quote: "My Clients Are Hitting Their Macro Goals 3x More Consistently Since I Switched",
    challenge:
      "Manually tracking macro compliance for 60+ clients across WhatsApp and spreadsheets was messy, error-prone, and unsustainable. Between check-in calls, clients had no system keeping them on track — so compliance dropped.",
    whatChanged:
      "With SmartCoach360, nutrition data moved into one central platform. Automated daily check-ins created consistent accountability, and compliance data stayed visible in real time so issues were addressed early.",
    stats: [
      { label: "Macro Compliance", value: "38% → 79%" },
      { label: "Tracking Time", value: "−90%" },
      { label: "Completion Rate", value: "+55%" },
      { label: "Referral Rate", value: "2× in 4mo" },
      { label: "MRR Growth", value: "+45%" },
    ],
    image: nutrients,
    authorColor: "text-indigo-200",
    labelColor: "bg-indigo-950/60 text-indigo-200 border border-indigo-800/50",
    statValueColor: "text-indigo-200",
    gradientColor: "from-[#0d1230] via-[#0a0d18]/90 to-[#0a0d18]/60",
    accentBorder: "border-indigo-900/40",
    dividerColor: "border-indigo-900/40",
    imageBorder: "ring-indigo-900/50",
  },
  {
    id: "large-organisation",
    label: "Case Study 4 — Large Organisation",
    author: "National Fitness Organisation — 20+ Branches, 50+ Coaches",
    quote: "We Finally Have One System That Works Across Our Entire Organisation",
    challenge:
      "With more than 20 branches and 50+ coaches, disconnected tools meant inconsistent client experiences, poor visibility into performance, slow lead response times, and growing compliance concerns around data management.",
    whatChanged:
      "SmartCoach360 became the single operational platform across all branches. Single Sign-On provided secure centralised access, role-based permissions were configured by team level, and automated lead allocation slashed response times.",
    stats: [
      { label: "Lead Response", value: "48h → 4min" },
      { label: "Cost Savings", value: "22% YoY" },
      { label: "Data Accuracy", value: "99.8%" },
      { label: "Consistency", value: "100% std." },
      { label: "Productivity", value: "+31%" },
    ],
    image: security,
    authorColor: "text-cyan-200",
    labelColor: "bg-cyan-950/60 text-cyan-200 border border-cyan-800/50",
    statValueColor: "text-cyan-200",
    gradientColor: "from-[#071f24] via-[#091116]/90 to-[#091116]/60",
    accentBorder: "border-cyan-900/40",
    dividerColor: "border-cyan-900/40",
    imageBorder: "ring-cyan-900/50",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({ card }) {
  return (
    <div
      id={`${card.id}`}
      className={`border ${card.accentBorder} rounded-3xl overflow-hidden w-full select-none relative h-[580px] 2xl:h-[620px] flex flex-row`}
      style={{
        background:
          card.gradientColor.includes("140b25")
            ? "#0d0a18"
            : card.gradientColor.includes("240b17")
            ? "#100810"
            : card.gradientColor.includes("0d1230")
            ? "#090c18"
            : "#060f12",
      }}
    >
      {/* Solid dark bg */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      {/* Faint radial glow top-left */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-[0.07] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
        }}
      />

      {/* ── LEFT: text content ── */}
      <div className="font-[poppins] relative z-10 h-full flex flex-col p-8 w-full md:w-[65%] gap-4">
        {/* Badge + Author */}
        <div className="flex flex-col gap-3">
          <span
            className={`self-start text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${card.labelColor}`}
          >
            {card.label}
          </span>
          <h2
            className={`font-semibold ${card.authorColor} leading-snug tracking-tight text-[clamp(1rem,1.8vw,1.2rem)]`}
          >
            {card.author}
          </h2>
        </div>

        {/* Italic quote */}
        <p className="text-white/80 italic font-light text-[clamp(1.05rem,1.8vw,1.3rem)] leading-relaxed border-l-2 border-white/20 pl-4">
          "{card.quote}"
        </p>

        <div className={`border-t ${card.dividerColor}`} />

        {/* Challenge */}
        <div className="flex flex-col gap-1.5">
          <span className="text-white/35 text-[11px] uppercase tracking-widest font-semibold">
            The Challenge
          </span>
          <p className="text-white/55 text-[clamp(0.82rem,1.2vw,0.97rem)] leading-relaxed">
            {card.challenge}
          </p>
        </div>

        {/* What Changed */}
        <div className="flex flex-col gap-1.5">
          <span className="text-white/35 text-[11px] uppercase tracking-widest font-semibold">
            What Changed
          </span>
          <p className="text-white/55 text-[clamp(0.82rem,1.2vw,0.97rem)] leading-relaxed">
            {card.whatChanged}
          </p>
        </div>

        <div className={`border-t ${card.dividerColor} mt-auto`} />

        {/* Stats row */}
        <div className="md:grid grid-cols-5 gap-2 hidden">
          {card.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 bg-white/[0.04] rounded-xl px-2.5 py-2.5 border border-white/[0.06]"
            >
              <span
                className={`font-bold text-[clamp(0.85rem,1.4vw,1.1rem)] leading-none ${card.statValueColor}`}
              >
                {stat.value}
              </span>
              <span className="text-white/30 text-[10px] uppercase tracking-wide leading-tight mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: framed image — hidden on mobile ── */}
      <div className="hidden md:flex relative z-10 flex-1 items-center justify-center p-6 pr-8">
        {/* Outer glow ring */}
        <div
          className={`absolute inset-6 rounded-2xl ring-1 ${card.imageBorder} blur-sm opacity-60`}
        />

        {/* Image frame */}
        <div
          className={`relative w-full h-full rounded-2xl overflow-hidden ring-1 ${card.imageBorder} shadow-2xl`}
        >
          <img
            src={card.image}
            alt={card.author}
            className="w-full h-full object-cover object-center"
            draggable={false}
          />
          {/* Subtle inner overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/40" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CustomersSection() {
  // ✅ FIX: Use callback refs so Swiper can read the real DOM nodes
  // even if buttons render after the Swiper mounts.
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // ✅ After either button mounts, re-wire navigation on the live Swiper instance.
  const setPrevRef = useCallback((node) => {
    prevRef.current = node;
    if (swiperRef.current && node) {
      swiperRef.current.params.navigation.prevEl = node;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  const setNextRef = useCallback((node) => {
    nextRef.current = node;
    if (swiperRef.current && node) {
      swiperRef.current.params.navigation.nextEl = node;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className="bg-[] py-28">
      <style>{`
        .customers-swiper {
          cursor: grab;
          overflow: visible !important;
          will-change: transform;
          --swiper-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .customers-swiper .swiper-wrapper { overflow: visible; }
        .customers-swiper.swiper-pointer-events { cursor: grabbing; }

        .cs-clip {
          overflow: hidden;
          margin-left: -9999px;
          padding-left: 9999px;
        }

        .customers-swiper-mobile .swiper-pagination {
          position: static;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .customers-swiper-mobile .swiper-pagination-bullet {
          width: 10px; height: 10px;
          border-radius: 9999px;
          background: #c4b5fd;
          opacity: 0.5; margin: 0 !important;
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1),
                      background 0.25s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.25s;
        }
        .customers-swiper-mobile .swiper-pagination-bullet-active {
          width: 24px;
          background: #7c3aed;
          opacity: 1;
        }
      `}</style>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:block">
        <div className="cs-clip">
          <div className="xl:pl-36 pl-14">
            <Swiper
              modules={[Navigation, FreeMode]}
              className="customers-swiper"
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 0.55,
                momentumVelocityRatio: 0.55,
                minimumVelocity: 0.02,
                sticky: false,
              }}
              slidesPerView="auto"
              slidesOffsetAfter={80}
              spaceBetween={20}
              grabCursor={true}
              simulateTouch={true}
              touchRatio={1}
              speed={520}
              // ✅ FIX: Pass null initially — onBeforeInit sets the real nodes
              navigation={{
                prevEl: null,
                nextEl: null,
              }}
              // ✅ FIX: Wire up nav elements BEFORE Swiper initialises its
              // Navigation module so the first click works immediately.
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                // Re-assign in case buttons mounted after onBeforeInit fired
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onReachBeginning={() => {
                setIsBeginning(true);
                setIsEnd(false);
              }}
              onReachEnd={() => setIsEnd(true)}
              onFromEdge={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
            >
              {cards.map((card, i) => (
                <SwiperSlide key={i} style={{ width: 1180 }}>
                  <TestimonialCard card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Nav buttons — rendered AFTER Swiper; callback refs re-wire on mount */}
        <div className="flex justify-end gap-3 mt-6 px-6 xl:px-10 2xl:px-16">
          <button
            ref={setPrevRef}
            disabled={isBeginning}
            className="w-12 h-12 rounded-full border-2 border-violet-300 flex items-center justify-center text-violet-500 text-lg hover:border-violet-600 hover:text-violet-700 disabled:opacity-25 transition-all duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13 8H3M7 4L3 8l4 4"
                stroke="#111111"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={setNextRef}
            disabled={isEnd}
            className="w-12 h-12 rounded-full border-2 border-violet-300 flex items-center justify-center text-violet-500 text-lg hover:border-violet-600 hover:text-violet-700 disabled:opacity-25 transition-all duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#111111"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-4 sm:px-6 overflow-x-hidden">
        <Swiper
          modules={[Pagination, FreeMode]}
          className="customers-swiper customers-swiper-mobile"
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
            minimumVelocity: 0.02,
            sticky: false,
          }}
          slidesPerView={1}
          spaceBetween={16}
          grabCursor={true}
          simulateTouch={true}
          touchRatio={1}
          speed={520}
          pagination={{ clickable: true }}
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i}>
              <TestimonialCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}