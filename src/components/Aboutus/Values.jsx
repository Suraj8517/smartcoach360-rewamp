import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../../assets/aboutus/bg/2.png";
import img2 from "../../assets/aboutus/bg/1.png";
import img3 from "../../assets/aboutus/bg/3.png";
import img4 from "../../assets/aboutus/bg/4.png";
import img5 from "../../assets/aboutus/bg/5.png";
import { Link } from "react-router-dom";
// ─── Data ─────────────────────────────────────────────────────────────────────
const cards = [
  {
    author: "Coach-first thinking",
    quote:
      "Every feature starts with one question: does this make life genuinely easier for a coach or their clients? If not, we go back to the drawing board.",
    highlight: [ "does this make life genuinely easier for a coach or their clients?"],
    bgimg: img1,
    bg: "bg-[#F5F3FF]",
    authorColor: "text-violet-700",
    highlightColor: "text-violet-600",
    quoteColor: "text-gray-700",
    accentBorder: "border-violet-200",
  },

  {
    author: "Simplicity at scale",
    quote:
      "Powerful enough for large organisations with hundreds of coaches. Simple enough for a solo trainer to pick up and use on day one.",
    highlight: ["Powerful enough", "large organisations","Simple enough", "solo trainer"],
    bgimg: img2,
    bg: "bg-[#FDF2F8]",
    authorColor: "text-fuchsia-700",
    highlightColor: "text-fuchsia-600",
    quoteColor: "text-gray-700",
    accentBorder: "border-fuchsia-200",
  },

  {
    author: "Continuous improvement",
    quote:
      "We don't ship and move on. We listen, take feedback seriously, and keep improving based on real-world use, not roadmap assumptions.",
    highlight: [
      "listen",
      "feedback",
      "keep improving",
      "real-world use",
    ],
        bgimg: img3,
    bg: "bg-[#EEF2FF]",
    authorColor: "text-indigo-700",
    highlightColor: "text-indigo-600",
    quoteColor: "text-gray-700",
    accentBorder: "border-indigo-200",
  },

  {
    author: "Data security",
    quote:
      "Your clients trust you with their data. You trust us with yours. We protect it with the same care we'd extend to our own.",
    highlight: [
      "protect it with the same care we'd extend to our own",
    ],
    bgimg: img4,
    bg: "bg-[#F3F4F6]",
    authorColor: "text-purple-700",
    highlightColor: "text-purple-600",
    quoteColor: "text-gray-700",
    accentBorder: "border-purple-200",
  },

  {
    author: "Partnership, not software",
    quote:
      "We're invested in the growth of every business on our platform. Our support model reflects that, we're in your corner, not just in your tech stack.",
    highlight: ["every business on our platform.", "not just in your tech stack"],
    bgimg: img5,
    bg: "bg-[#ECFEFF]",
    authorColor: "text-cyan-700",
    highlightColor: "text-cyan-600",
    quoteColor: "text-gray-700",
    accentBorder: "border-cyan-200",
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
    <div
      className={`${card.bg} border ${card.accentBorder} rounded-3xl overflow-hidden w-full select-none relative flex flex-col justify-end`}
      style={{ height: "320px" }}
    >
      {/* BG image — top-right, no mask, clipped naturally by overflow:hidden on card */}
      {card.bgimg && (
        <img
          src={card.bgimg}
          alt=""
          className="absolute top-0 right-0 w-[60%] h-[80%] object-cover object-right-bottom pointer-events-none select-none opacity-8"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Text content — sits at bottom-left */}
      <div className="font-poppins relative z-10 flex flex-col gap-2 p-6">
        <h2
          className={`font-semibold ${card.highlightColor} leading-tight tracking-tight text-[clamp(1rem,1.8vw,1.55rem)]`}
        >
          {card.author}
        </h2>

        <p
          className={`${card.quoteColor} text-[13px] xl:text-[16px] leading-relaxed font-normal`}
        >
          {highlightText(card.quote, card.highlight).map((part, i) =>
            part.highlighted ? (
              <span key={i} className={`${card.highlightColor} font-medium`}>
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Values() {
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
    <section className="py-28 font-sans">
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
            What we stand for
          </h2>
        </div>
        <div className="flex sm:items-center sm:pt-6">
          <Link to="/contact-us" className="border-2 border-gray-800 text-gray-800 rounded-full px-3 py-2 text-base font-semibold group hover:bg-gray-900 hover:text-white transition-all duration-200 flex items-center gap-2 whitespace-nowrap">
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
              slidesOffsetAfter={90}
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
                <SwiperSlide key={i} style={{ width: 460 }}>
                  <TestimonialCard card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 px-6 xl:px-10 2xl:px-16">
          <button
            ref={setPrevRef}
            disabled={isBeginning}
            className="w-12 h-12 rounded-full border-2 border-violet-300 flex items-center justify-center text-violet-500 text-lg hover:border-violet-600 hover:text-violet-700 disabled:opacity-25 transition-all duration-150"
          >
           <svg
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
</svg>
          </button>
          <button
            ref={setNextRef}
            disabled={isEnd}
            className="w-12 h-12 rounded-full border-2 border-violet-300 flex items-center justify-center text-violet-500 text-lg hover:border-violet-600 hover:text-violet-700 disabled:opacity-25 transition-all duration-150"
          >
            <svg
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
