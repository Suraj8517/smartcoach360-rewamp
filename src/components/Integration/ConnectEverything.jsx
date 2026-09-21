import { useEffect, useState } from "react";
import integration from "../../assets/integrations/integration.png"

const ICONS_IMG = integration
export default function ConnectEverything() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-white overflow-hidden pt-22 pb-36 px-8 md:px-20 flex justify-center">
        <div className="max-w-6xl ">
      <div className="relative inline-block ">

       <h1
  className="text-[clamp(4rem,12vw,11rem)] leading-none text-black select-none font-light"
  style={{
    letterSpacing: "-0.03em",
    lineHeight: 1,
  }}
>
          <span
            className="block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            Connect
          </span>
          <span
            className="block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
            }}
          >
            everything
          </span>
        </h1>

        {/* Floating icons — overlapping top-right of text, same as screenshot */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%",
            right: "-15%",
            width: "clamp(100px, 18vw, 260px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-16px)",
            transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
          }}
        >
          <img
            src={ICONS_IMG}
            alt="integrations"
            className="w-full h-auto object-contain"
          />
        </div>
</div>
      </div>
    </section>
  );
}