import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import {
  BookOpen,
  MessageCircle,
  HeartPulse,
  FlaskConical,
  Workflow,
  UserCog,
  Sparkles,
  ShieldCheck,
  Dumbbell,
} from "lucide-react";

const cards = [
  {
    badge: "All-in-One",
    icon: BookOpen,
    title: "Workout & Nutrition Hub",
    description:
      "The only platform with workout programming AND nutrition tracking built in together",
  },
  {
    badge: "Native",
    icon: MessageCircle,
    title: "WhatsApp Automation",
    description:
      "The only coaching CRM with native WhatsApp automation",
  },
  {
    badge: "Exclusive",
    icon: HeartPulse,
    title: "Female Health Tracking",
    description:
      "A female health tracker no other coaching platform offers",
  },
  {
    badge: "Clinical",
    icon: FlaskConical,
    title: "Lab Integration",
    description:
      "Lab integration for coaches who work with clinical health data",
  },
  {
    badge: "Automated",
    icon: Workflow,
    title: "Client Allocation",
    description:
      "Fully automated lead and client allocation, so your business keeps moving even when you’re away from your desk",
  },
  {
    badge: "Dedicated",
    icon: UserCog,
    title: "Success Manager",
    description:
      "A dedicated Customer Success Manager, not just a support ticket system",
  },
  {
    badge: "Guided",
    icon: Sparkles,
    title: "Personalised Onboarding",
    description:
      "Personalised onboarding, guided setup with a specialist, not just videos and help articles",
  },
  {
    badge: "Secure",
    icon: ShieldCheck,
    title: "Enterprise Access",
    description:
      "Single Sign-On and role-based access that scales from solo coaches to national organisations",
  },
  {
    badge: "Fitness-First",
    icon: Dumbbell,
    title: "Built for Coaches",
    description:
      "Built for fitness professionals, not a generic CRM adapted for coaching",
  },
];

export default function ComparisonReason() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);

  const handleSwiperUpdate = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="w-full bg-white pt-16 lg:pt-28 mb-14 overflow-hidden">

      {/* Heading */}
      <div className="px-5 sm:px-8 lg:px-12 xl:px-24">
        <h2 className="mb-8 lg:mb-14 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900">
         8 Reasons Coaches <br />Switch to SmartCoach360
        </h2>
      </div>

      {/* Swiper */}
      <div className="px-5 sm:px-8 lg:px-12 xl:px-24 mb-10 [&_.swiper]:overflow-hidden lg:[&_.swiper]:!overflow-visible">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            setSwiperRef(swiper);
            handleSwiperUpdate(swiper);
          }}
          onSlideChange={handleSwiperUpdate}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480:  { slidesPerView: 1.15 },
            640:  { slidesPerView: 2.15 },
            1024: { slidesPerView: 3.15 },
            1280: { slidesPerView: 3.15 },
            1440: { slidesPerView: 4.15}
          }}
        >
          {cards.map(({ badge, icon: Icon, title, description }) => (
            <SwiperSlide key={title}>
              <div className="flex w-full min-h-68  flex-col justify-between rounded-2xl shadow bg-white px-6 m-6 md:px-6 py-6">
                {/* Icon + Badge row */}
                <div className="flex items-start justify-between">
                  <Icon size={42} strokeWidth={1} className="text-gray-400" />
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-gray-500">
                    {badge}
                  </span>
                </div>

                {/* Title + Description */}
                <div>
                  <h3 className="mb-2 text-[1.2rem] sm:text-[1.35rem] font-normal text-gray-600">
                    {title}
                  </h3>
                  <p className="m-0 text-[0.9rem] leading-relaxed text-gray-500">
                    {description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Nav Buttons */}
      <div className="mt-6 flex items-center gap-2.5 px-5 sm:px-8 lg:px-12 xl:px-24">
        <button
          onClick={() => swiperRef?.slidePrev()}
          disabled={isBeginning}
          className="flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-colors
            disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed
            enabled:border-gray-300 enabled:text-gray-700 enabled:cursor-pointer enabled:hover:border-gray-400"
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => swiperRef?.slideNext()}
          disabled={isEnd}
          className="flex h-12 w-12 items-center justify-center rounded-full border bg-white transition-colors
            disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed
            enabled:border-gray-300 enabled:text-gray-700 enabled:cursor-pointer enabled:hover:border-gray-400"
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}