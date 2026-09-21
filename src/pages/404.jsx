import React from "react";

/* Poppins is loaded via index.html or your global CSS:
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
   Then add to tailwind.config.js:
   theme: { extend: { fontFamily: { poppins: ['Poppins', 'sans-serif'] } } }
*/

const orbs = [
  { size: "w-3 h-3",   pos: "top-[18%] left-[7%]",   delay: "delay-0",    dur: "animate-[floatOrb_5s_ease-in-out_infinite]" },
  { size: "w-2 h-2",   pos: "top-[70%] left-[12%]",  delay: "delay-300",  dur: "animate-[floatOrb_7s_ease-in-out_infinite]" },
  { size: "w-4 h-4",   pos: "top-[25%] right-[8%]",  delay: "delay-500",  dur: "animate-[floatOrb_6s_ease-in-out_infinite]" },
  { size: "w-2.5 h-2.5",pos:"top-[65%] right-[10%]", delay: "delay-700",  dur: "animate-[floatOrb_8s_ease-in-out_infinite]" },
  { size: "w-1.5 h-1.5",pos:"top-[45%] left-[3%]",   delay: "delay-1000", dur: "animate-[floatOrb_4.5s_ease-in-out_infinite]" },
  { size: "w-3 h-3",   pos: "top-[10%] left-[52%]",  delay: "delay-200",  dur: "animate-[floatOrb_9s_ease-in-out_infinite]" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden px-6 2xl:py-12 md:py-28 font-poppins">

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">


        {/* 404 */}
        <div className="relative select-none animate-[fadeUp_0.7s_0.1s_ease_both]">
          <h2
            className="font-extrabold text-black leading-none tracking-tighter"
            style={{ fontSize: "clamp(120px, 22vw, 260px)", lineHeight: 0.88 }}
          >
            4
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "3px #7c3aed" }}
            >
              0
            </span>
            4
          </h2>
          {/* Rotating badge */}
          <span className="absolute top-[12%] -right-2 sm:right-0 bg-violet-600 text-white text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full -rotate-12 animate-[pop_0.5s_0.8s_cubic-bezier(0.34,1.56,0.64,1)_both] whitespace-nowrap ">
            Page not found
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-bold text-black leading-tight tracking-tight mb-4 animate-[fadeUp_0.7s_0.25s_ease_both]"
          style={{ fontSize: "clamp(22px, 4vw, 40px)" }}
        >
          You've wandered off{" "}
          <span className="text-violet-600">the plan.</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 font-light leading-relaxed max-w-md mb-12 animate-[fadeUp_0.7s_0.32s_ease_both] text-sm sm:text-base">
          This page doesn't exist — but your coaching journey does.
          Let's get you back on track and moving toward your goals.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center animate-[fadeUp_0.7s_0.4s_ease_both]">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-violet-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </a>
          
        </div>

        {/* Footer hint */}
        <p className="mt-14 text-[11px] tracking-widest text-black/25 uppercase font-normal animate-[fadeUp_0.7s_0.5s_ease_both]">
          Error 404 · SmartCoach360 · Page Unavailable
        </p>
      </div>

      
    </div>
  );
}