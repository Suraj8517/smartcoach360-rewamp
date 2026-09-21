import { useState, useEffect } from "react";
import AvatarRow from "./UI/AvatarRow";
import Results from "./UI/Results";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_CALENDLY_LINK;


export default function AboutUsHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden  px-4 mt-60 pb-26"
    >
      {/* Subtle background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <div
        className={`transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "0ms" }}
      >
      
      </div>

      {/* Headline */}
      <div
        className={`text-center mb-5 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "120ms" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight text-gray-900 tracking-tight">
          <span
            style={{
              background: "linear-gradient(90deg, #4C1D95 0%, #6D28D9 50%, #A855F7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
           Built by Health & Wellness Coaches, 
          </span>
          <br className="hidden sm:block" /> for Fitness Professionals 
        </h1>
      </div>

      {/* Subtext */}
      <div
        className={`text-center mb-10 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "220ms" }}
      >
        <p className="text-gray-500 text-base sm:text-lg max-w-lg
         mx-auto leading-relaxed">
         An enterprise-quality platform purpose-built for the way fitness professionals actually work without the compromises of generic software.
        </p>
      </div>

      {/* CTAs */}
      <div
        className={`flex flex-col sm:flex-row items-center gap-4 mb-16 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "320ms" }}
      >
        <button
        onClick={()=>window.open(url,"_blank")}
          className="flex items-center gap-2 px-7 py-3 rounded-full text-white text-sm group font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #6C47FF 0%, #8B5CF6 100%)",
          }}
        >
          Book A Demo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <Link to="/contact-us" className="flex items-center gap-2 text-gray-700 text-sm font-semibold hover:text-gray-900 transition-colors duration-150 group">
          Contact Us
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Avatar */}
      <AvatarRow/>

     <Results/> 
    </section>
  );
}