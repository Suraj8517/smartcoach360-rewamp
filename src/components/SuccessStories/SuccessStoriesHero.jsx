import React from 'react'
import { Link } from 'react-router-dom';
const url = import.meta.env.VITE_CALENDLY_LINK;
export default function SuccessStoriesHero() {
  return (
    <section className="bg-white">

      {/* ── Hero Header ── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-36 lg:pt-[100] pb-6 sm:pb-20 lg:pb-16 text-center">
        <span className="inline-block text-[13px] font-medium tracking-[0.1em] uppercase text-[#9747FF] mb-6">
         Success Stories
        </span>
        <h1 className="text-[clamp(36px,6vw,80px)] font-medium tracking-[-0.04em] leading-[1.05] text-[#0A0A0A] mb-6 sm:mb-7">
         Real Coaches.
          <br />
        Real Results.
        </h1>
        <p className="text-base sm:text-lg leading-[1.7] text-[#6B7280] max-w-[540px] mx-auto mb-10 sm:mb-12">
          Here's how fitness coaches, personal trainers, and gym owners are using SmartCoach360 to build better businesses and deliver better results.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
           <button onClick={() => window.open(url, "_blank")}
    className="w-full sm:w-auto bg-[#0A0A0A] text-white border-none rounded-full px-8 py-4 text-[15px] font-semibold cursor-pointer tracking-[-0.01em] group"
    style={{
      letterSpacing: "0.01em",
      minHeight: "44px",
    }}
  >
    Book a Demo  <span className="translate-y-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg></span>
  </button>
          <Link to="/pricing" className="w-full sm:w-auto bg-transparent text-[#0A0A0A] border-[1.5px] border-[#E5E7EB] rounded-full px-8 py-4 text-[15px] font-semibold cursor-pointer tracking-[-0.01em]">
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
