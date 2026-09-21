import React from "react";

function QuoteIcon({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 48 36"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M0 36V22.154C0 10.346 7.44 3.308 22.32 0l2.88 4.615C16.12 6.308 13.04 9.846 12 15.231h10.8V36H0zm25.2 0V22.154C25.2 10.346 32.64 3.308 47.52 0l2.88 4.615C42.32 6.308 39.04 9.846 38 15.231h10.8V36H25.2z" />
    </svg>
  );
}

export default function Mission() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 sm:px-12 md:py-20 ">

      <div className="flex justify-center mb-10">
        <span
          className="text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
          style={{ background: "#EEEDFE", color: "#3C3489", border: "1px solid #AFA9EC" }}
        >
          Our Mission
        </span>
      </div>

      <div className="relative text-center">

        <QuoteIcon
          className="absolute md:-top-3 md:-left-20 w-10 sm:w-14 "
          style={{ color: "#AFA9EC" }}
        />

        <h2
          className="text-3xl md:text-[3.75rem] font-light tracking-tight leading-tight sm:leading-[1.18]"
          style={{ color: "#26215C", }}
        >
          To help fitness professionals run a more efficient coaching business by{" "}
          <span className="relative inline-block" style={{ color: "#534AB7", fontWeight: 600 }}>
            reducing admin
          </span>
          ,{" "}
          <span className="relative inline-block" style={{ color: "#534AB7", fontWeight: 600 }}>
            standardising delivery
          </span>
          , and giving every client a{" "}
          <span className="relative inline-block" style={{ color: "#534AB7", fontWeight: 600 }}>
            better experience
          </span>
          .
        </h2>

        <QuoteIcon
          className="absolute md:-bottom-3  w-10 sm:w-14 rotate-180 right-0 md:right-28"
          style={{ color: "#AFA9EC" }}
        />

      </div>

    </section>
  );
}