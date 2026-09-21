import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import trainer from '../../assets/for whom/trainer.avif'
import gym from '../../assets/for whom/gym.avif'
import wellness from '../../assets/for whom/wellness.avif'
import owner from '../../assets/for whom/owner.avif'
import { HashLink } from "react-router-hash-link";
import { color } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    author: "Personal Trainers",
    quote:
      "Stop juggling apps and admin. SmartCoach360 keeps clients, programmes, nutrition, and payments in one place, so you can scale stress-free.",
    highlight: ["SmartCoach360", "so you can scale stress-free"],
    image: trainer,
    bg: "#0d0d14",
    authorColor: "#A78BFA",
    highlightColor: "#A78BFA",
    quoteColor: "#E5E7EB",
    accentBorder: "rgba(139, 92, 246, 0.3)",
    link: "personal-trainer",
  },
  {
    author: "Gym Owners & Studios",
    quote:
      "One platform to manage your team, your classes, your client allocations, and your revenue—whether you’re running one location or five.",
    highlight: ["platform", "you’re running one location or five."],
    image: owner,
    bg: "#F4CDFF",
    authorColor: "#000000",
    highlightColor: "#A21CAF",
    quoteColor: "#000000",
    accentBorder: "rgba(217, 70, 239, 0.3)",
    link: "gym-owner",
  },
  {
    author: "Nutrition & Wellness Coaches",
    quote:
      "Deliver truly personalised nutrition plans at scale, track macro compliance in real time, and keep your clients accountable without spending your whole day manually following up.",
    highlight: [
      "personalised nutrition plans",
      "without spending your whole day manually following up.",
    ],
    image: wellness,
    bg: "#DED4FC",
    authorColor: "#000000",
    highlightColor: "#594889",
    quoteColor: "#000000",
    accentBorder: "rgba(99, 102, 241, 0.3)",
    link: "nutrition-coach",
  },
  {
    author: "Large Fitness Organisations",
    quote:
      "Enterprise tools for multi-branch management, SSO, bulk data uploads, and a dedicated Customer Success Manager to help you get the most out of the platform.",
    highlight: [
      "multi-branch management, SSO, bulk data uploads",
      "Customer Success Manager",
    ],
    image: gym,
    bg: "#0f0a1e",
    authorColor: "#C084FC",
    highlightColor: "#C084FC",
    quoteColor: "#E5E7EB",
    accentBorder: "rgba(168, 85, 247, 0.3)",
    link: "large-organisation",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function highlightText(text, highlights) {
  let parts = [{ text, highlighted: false }];
  for (const h of highlights) {
    parts = parts.flatMap((part) => {
      if (part.highlighted) return [part];
      const idx = part.text.indexOf(h);
      if (idx === -1) return [part];
      return [
        { text: part.text.slice(0, idx), highlighted: false },
        { text: h, highlighted: true },
        { text: part.text.slice(idx + h.length), highlighted: false },
      ];
    });
  }
  return parts;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({ card }) {
  return (
    <div style={{backgroundColor:card.bg, borderColor: card.accentBorder}}
  className={` border rounded-3xl flex md:flex-row flex-col overflow-hidden w-full select-none relative h-[500px] md:h-[400px] `}
>
      {/* Subtle radial glow in top-left */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }}
      />

      {/* Text — top on mobile, left on desktop */}
      <div className="font-[poppins] flex flex-col justify-between p-7 flex-1 min-w-0 relative z-10">
        {/* Author + quote mark */}
        <div className="flex items-center gap-3">
          <h2 style={{ color: card.highlightColor }} className={`font-[poppins] font-semibold leading-none tracking-tight text-[clamp(1.1rem,2.4vw,1.4rem)]`}>
            {card.author}
          </h2>
        </div>

        {/* Quote */}
        <p style={{ color: card.quoteColor }} className={`text-[15px] xl:text-[19px] leading-relaxed font-normal flex-1 flex items-center mt-4`}>
          <span>
            {highlightText(card.quote, card.highlight).map((part, i) =>
              part.highlighted ? (
                <span key={i} style={{color:card.highlightColor}} className={` font-medium`}>{part.text}</span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </span>
        </p>

        <HashLink style={{color:card.authorColor}}
  smooth
  to={`/success-stories#${card.link}`}
  className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity duration-150 self-start group`}
>
          View more details
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-150">  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke={`${card.authorColor}`}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg></span>
        </HashLink>
      </div>

      <div className="shrink-0 relative overflow-hidden rounded-2xl mx-4 mb-4 md:mx-0 md:mb-0 md:my-3 md:mr-3 md:w-[46%] w-auto h-[220px] sm:h-[260px] md:h-[94%]">
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 " />

  <img
  src={card.image}
  alt={card.author}
  className={`w-full h-full object-cover ${
    card.author === "Personal Trainers"
      ? "object-top"
      : "object-center"
  } pointer-events-none`}
  draggable={false}
/>
</div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────


export default function CustomersSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
    <section className="bg-[#f5f6f8] py-28 font-sans">
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

      {/* ── Header ── */}
      <div className="max-w-[90%] px-6 xl:px-10 2xl:px-16 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-20 mx-auto">
        <div>
          <h2 className="font-medium text-gray-950 leading-none tracking-tighter text-[clamp(2.2rem,4.5vw,3.5rem)]">
            Built for Every Type
            <br />
            of Fitness Professional
          </h2>
        </div>
        <div className="flex sm:items-center sm:pt-6">
        <Link to="/contact-us" className="group border-2 border-gray-800 text-gray-800 rounded-full px-3 py-2 text-base font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
  Contact sales

  <svg
    className="group-hover:translate-x-1 transition-transform duration-300"
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Link>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:block">
        <div className="cs-clip">
          <div className="pl-36">
            <Swiper
              modules={[Navigation, FreeMode]}
              className="customers-swiper"
              freeMode={{ enabled: true, momentum: true, momentumRatio: 0.55, momentumVelocityRatio: 0.55, minimumVelocity: 0.02, sticky: false }}
              slidesPerView="auto"
              slidesOffsetAfter={80}
              spaceBetween={20}
              grabCursor={true}
              simulateTouch={true}
              touchRatio={1}
              speed={520}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              onSlideChange={(swiper) => { setIsBeginning(swiper.isBeginning); setIsEnd(swiper.isEnd); }}
              onReachBeginning={() => { setIsBeginning(true); setIsEnd(false); }}
              onReachEnd={() => setIsEnd(true)}
              onFromEdge={(swiper) => { setIsBeginning(swiper.isBeginning); setIsEnd(swiper.isEnd); }}
            >
              {cards.map((card, i) => (
                <SwiperSlide key={i} style={{ width: 780 }}>
                  <TestimonialCard card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 px-6 xl:px-10 2xl:px-16">
          <button ref={setPrevRef} disabled={isBeginning} className="w-12 h-12 rounded-full border-2 border-violet-300 flex items-center justify-center text-violet-500 text-lg hover:border-violet-600 hover:text-violet-700 disabled:opacity-25 transition-all duration-150"><svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M13 8H3M7 4L3 8l4 4"
    stroke="#111111"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg></button>
          <button ref={setNextRef} disabled={isEnd} className="w-12 h-12 rounded-full border-2 border-violet-300 flex items-center justify-center text-violet-500 text-lg hover:border-violet-600 hover:text-violet-700 disabled:opacity-25 transition-all duration-150"><svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M3 8h10M9 4l4 4-4 4"
    stroke="#111111"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg></button>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden px-4 sm:px-6 overflow-x-hidden">
        <Swiper
          modules={[Pagination, FreeMode]}
          className="customers-swiper customers-swiper-mobile"
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.5, minimumVelocity: 0.02, sticky: false }}
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