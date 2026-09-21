import { useState, useEffect } from "react";

export default function SmartCoach360Loader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Only show once per session
    const alreadyLoaded = sessionStorage.getItem("sc360_loaded");
    if (alreadyLoaded) {
      setHidden(true);
      return;
    }

    const fadeTimer = setTimeout(() => setFading(true), 3000);
    const hideTimer = setTimeout(() => {
      setHidden(true);
      sessionStorage.setItem("sc360_loaded", "true");
    }, 3700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { transform: scale(0.5); opacity: 0.2; }
          50%       { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "#0d0a1e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.7s ease",
          pointerEvents: fading ? "none" : "all",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            lineHeight: 1,
            margin: 0,
          }}
        >
          <span style={{ color: "#fff" }}>Smart</span>
          <span
            style={{
              background: "linear-gradient(90deg, #c4b5fd, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Coach
          </span>
          <span style={{ color: "#fff" }}>360</span>
        </h1>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {[
            { color: "#c4b5fd", delay: "0s" },
            { color: "#a78bfa", delay: "0.28s" },
            { color: "#7c3aed", delay: "0.56s" },
          ].map((d, i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: d.color,
                display: "inline-block",
                animation: "dotPulse 1.4s ease-in-out infinite",
                animationDelay: d.delay,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}