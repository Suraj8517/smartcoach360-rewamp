export default function Hero() {
  const url =import.meta.env.VITE_CALENDLY_LINK;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        .hero-root * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }
        .hero-root { font-family: 'Poppins', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .anim-2 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.22s both; }
        .anim-3 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.38s both; }
        .anim-4 { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.52s both; }

        .hero-gradient-text {
background: linear-gradient(90deg, #a855f7 0%, #9333ea 25%, #7c3aed 50%, #6d28d9 75%, #5b21b6 100%);          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .hero-cta {
          background: linear-gradient(90deg, #7c3aed 0%, #8b5cf6 35%, #6d28d9 80%, #5b21b6 100%); transition: box-shadow 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 20px rgba(123,92,255,0.28);
        }
        .hero-cta:hover {
          box-shadow: 0 8px 32px rgba(123,92,255,0.42);
          
        }

        .hero-bg-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1000px, 140vw);
          height: min(700px, 90vw);
          background: radial-gradient(ellipse at 50% 10%, rgba(224,210,255,0.28) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <section
        className="hero-root relative w-full overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          background: "#FFFFFF",
          minHeight: "calc(60vh - 64px)",
          paddingTop: "clamp(4rem, 9vw, 8rem)",
          paddingBottom: "clamp(4rem, 6vw, 3rem)",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
      

        <div className="relative z-10 w-full max-w-[900px] xl:max-w-[1000px] 2xl:max-w-[1100px] mx-auto mt-20 md:mt-5">

          {/* ── Headline ── */}
          <h1
            className="anim-1 font-normal "
            style={{
              fontSize: "clamp(2rem, 5.3vw, 64px)",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              color: "#1c1c1c",
            }}
          >
            Outpace everyone with
            <br />
            <span className="inline">the </span>
            <span className="hero-gradient-text">best platform for coaches</span>
          </h1>

          {/* ── Sub-headline ── */}
          <p
            className="anim-2 mx-auto"
            style={{
              marginTop: "clamp(1.25rem, 3vw, 2rem)",
              fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
              fontWeight: 400,
              color: "#676879",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            Stop juggling apps. Manage clients, programs, payments,
            <br className="hidden sm:block" />
           and messages in one platform built to scale.
          </p>

        {/* ── CTA Button ── */}
<div className="anim-3 mt-8 sm:mt-10">
  <button onClick={() => window.open(url, "_blank")}
    className="hero-cta text-white font-semibold rounded-full group transition-all duration-300 "
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

          {/* ── Trust line ── */}
         <p
  className="hidden md:flex anim-4 mt-6 text-gray-500"
  style={{
    marginTop: "0.8rem",
    fontSize: "clamp(0.8rem, 1.2vw, 0.7rem)",
    color: "#9699a6",
    fontWeight: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
  }}
>
  Trusted by 10,000+ coaches worldwide
  <span style={{ color: "#c5c7d4", fontSize: "1rem" }}>✦</span>
  Scale faster with less effort
</p>

        </div>
      </section>
    </>
  );
}