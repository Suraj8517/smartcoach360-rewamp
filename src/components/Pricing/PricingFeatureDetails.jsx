import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import engage from '../../assets/pricing/engage.png';
import client from '../../assets/pricing/health.png';
import nutrients from '../../assets/pricing/nutrients.png';
import fitness from '../../assets/pricing/fitness.png';
import workout from '../../assets/pricing/workout.png';
import payments from '../../assets/pricing/payment.png';
import security from '../../assets/pricing/security.png';

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    author: "Lead Management CRM",
    quote: [
      "Lead capture via forms, campaigns & manual",
      "Source tracking: Ads, Instagram, WhatsApp",
      "Pipeline: New → Contacted → Converted",
      "Auto-assignment & follow-up reminders",
      "Health reports & interaction history",
    ],
    image: engage,
    authorColor: "text-violet-300",
    dotColor: "bg-violet-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-violet-500/20",
    link: "/lead-management",
  },
  {
    author: "Client Management",
    quote: [
      "Daily task & client overview dashboard",
      "Smart notifications & reminders",
      "Multi-coach collaboration support",
      "Client segmentation & auto-assignment",
      "Time zone-based program tracking",
    ],
    image: client,
    authorColor: "text-pink-300",
    dotColor: "bg-pink-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-pink-500/20",
    link: "/client-management",
  },
  {
    author: "Nutrition & Diet Planning",
    quote: [
      "AI-powered diet plan generator",
      "Custom plan builder & templates",
      "Macro & micro nutrient calculations",
      "Condition-based diets (IBS, weight loss)",
      "Meal planning & portion control",
    ],
    image: fitness,
    authorColor: "text-indigo-300",
    dotColor: "bg-indigo-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-indigo-500/20",
    link: "/nutrition-planning",
  },
  {
    author: "Recipe Builder",
    quote: [
      "Custom recipe creation",
      "Ingredient-level nutrition breakdown",
      "Cooking method adjustments",
      "Yield & portion calculations",
      "Allergen tagging & reusable recipes",
    ],
    image: nutrients,
    authorColor: "text-purple-300",
    dotColor: "bg-purple-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-purple-500/20",
    link: "/recipe-builder",
  },
  {
    author: "Workout & Fitness",
    quote: [
      "Workout plan builder",
      "Video-based exercise library",
      "Sets, reps & difficulty levels",
      "Daily/weekly workout calendar",
      "Warm-up & cool-down plans",
    ],
    image: workout,
    authorColor: "text-cyan-300",
    dotColor: "bg-cyan-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-cyan-500/20",
    link: "/workout-fitness",
  },
  {
    author: "Payments & Monetization",
    quote: [
      "Razorpay & Stripe integration",
      "UPI payments & payment links",
      "Installments & discount support",
      "Auto upgrade to premium",
      "Cart & token feature",
    ],
    image: payments,
    authorColor: "text-orange-300",
    dotColor: "bg-orange-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-orange-500/20",
    link: "/payments",
  },
  {
    author: "Communication & Engagement",
    quote: [
      "In-app chat & push notifications",
      "Broadcast messages",
      "Reminder automation",
      "WhatsApp integration (addon)",
    ],
    image: engage,
    authorColor: "text-emerald-300",
    dotColor: "bg-emerald-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-emerald-500/20",
    link: "/communication",
  },
  {
    author: "Reports & Analytics",
    quote: [
      "Client progress reports",
      "Transformation tracking",
      "Coach performance dashboard",
      "Revenue insights",
      "Program effectiveness reports",
    ],
    image: client,
    authorColor: "text-blue-300",
    dotColor: "bg-blue-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-blue-500/20",
    link: "/reports-analytics",
  },
  {
    author: "Admin & Security",
    quote: [
      "Role-based access (Admin, Coach, Sales)",
      "Multi-coach / multi-branch support",
      "Secure cloud hosting (AWS / GCP)",
      "Data encryption & backup",
      "Data ownership & privacy controls",
    ],
    image: security,
    authorColor: "text-rose-300",
    dotColor: "bg-rose-400",
    quoteColor: "text-gray-200",
    accentBorder: "border-rose-500/20",
    link: "/admin-security",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({ card }) {
  return (
    <div
      style={{ backgroundImage: `url(${card.image})` }}
      className={`bg-cover bg-position-[70%] md:bg-right bg-no-repeat border ${card.accentBorder} rounded-3xl flex md:flex-row flex-col overflow-hidden w-full select-none relative h-[400px] 2xl:h-[500px]`}
    >
      <div className="absolute inset-0 bg-black/90 md:bg-black/80 z-0" />
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }}
      />

      <div className="font-[poppins] flex flex-col justify-between p-7 flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-3">
          <h2
            className={`font-semibold ${card.authorColor} leading-none tracking-tight text-[clamp(1.3rem,2.4vw,1.4rem)]`}
          >
            {card.author}
          </h2>
        </div>

        <div className="flex flex-col gap-3 mt-4 flex-1 justify-center">
          {card.quote.map((item, i) => (
            <div
              key={i}
              className={`${card.quoteColor} text-[14px] xl:text-[19px] leading-relaxed flex items-start gap-3`}
            >
              <div className={`w-2 h-2 rounded-full mt-3 shrink-0 ${card.dotColor}`} />
              <span>{item}</span>
            </div>
          ))}
        </div>
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

  // ✅ FIX: Callback refs re-wire navigation after buttons mount
  // (buttons render after Swiper in the DOM, so refs are null during onBeforeInit
  // unless buttons are moved above — this callback handles the late-mount case)
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
    <section className="pb-8 pt-18 font-sans">
      <style>{`
        .customers-swiper {
          cursor: grab;
          overflow: visible !important;
          will-change: transform;
          --swiper-transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .customers-swiper .swiper-wrapper {
          overflow: visible;
        }
        .customers-swiper.swiper-pointer-events {
          cursor: grabbing;
        }

        .cs-clip {
          overflow: hidden;
          margin-left: -9999px;
          padding-left: 9999px;
          touch-action: pan-y;
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
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #c4b5fd;
          opacity: 0.5;
          margin: 0 !important;
          transition:
            width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
            background 0.25s cubic-bezier(0.4, 0, 0.2, 1),
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
            Complete
            <br />
            feature set
          </h2>
        </div>
        <div className="flex sm:items-center sm:pt-6">
          <Link
            to="/contact-us"
            className="border-2 border-gray-800 text-gray-800 rounded-full px-3 py-2 text-base font-semibold group hover:bg-gray-900 hover:text-white transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            Contact sales{" "}
            <span className="text-lg leading-none transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden lg:block">
        <div className="cs-clip">
          <div className="pl-36">
            <Swiper
              modules={[Navigation, FreeMode, Mousewheel]}
              className="customers-swiper"
              freeMode={{
                enabled: true,
                momentum: false,
                sticky: false,
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                thresholdDelta: 10,
              }}
              slidesPerView="auto"
              slidesOffsetAfter={80}
              spaceBetween={20}
              grabCursor={true}
              simulateTouch={true}
              touchRatio={1}
              speed={520}
              touchStartPreventDefault={false}
              // ✅ FIX: Start with null — onBeforeInit assigns real DOM nodes
              navigation={{
                prevEl: null,
                nextEl: null,
              }}
              // ✅ FIX: onBeforeInit fires before Navigation module reads prevEl/nextEl,
              // so the real DOM nodes are in place for the very first interaction.
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                // Re-assign in case buttons mounted after onBeforeInit
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
                <SwiperSlide key={i} style={{ width: 980 }}>
                  <TestimonialCard card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Nav buttons */}
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
            momentum: false,
            sticky: false,
          }}
          slidesPerView={1}
          spaceBetween={16}
          grabCursor={true}
          simulateTouch={true}
          touchRatio={1}
          speed={520}
          touchStartPreventDefault={false}
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