import React from 'react'
const url=import.meta.env.VITE_CALENDLY_LINK;
export default function BookDemoBtn({weight,text}) {
  return (
    <div>
        <button onClick={()=>window.open(url, "_blank")}
    className={`integration-hero-cta text-${text} font-${weight} rounded-full group transition-all duration-300`}
    style={{
      fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
      padding: "clamp(0.55rem, 1.2vw, 0.75rem) clamp(1.4rem, 3vw, 2rem)",
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
    </div>
  )
}
