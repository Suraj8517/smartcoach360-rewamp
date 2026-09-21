import vmax from "../../assets/crm/logos/vmax.png";
import fmc from "../../assets/crm/logos/fitmomclub.jpg";
import LK from "../../assets/crm/logos/lk.jpg";
import mindfully from "../../assets/crm/logos/yours-mindfully.png";
import fkc from "../../assets/crm/logos/fitkid.png";
import fdc from "../../assets/crm/logos/fitdad.png";
import miracle from "../../assets/crm/logos/miracle.png";
import { useRef } from "react";
import { motion } from "framer-motion";

const logos = [
  { alt: "VMax Healthtech", className: "h-20", src: vmax },
  { alt: "FitMom Club", className: "h-13", src: fmc },
  { alt: "LK", className: "h-[74px]", src: LK },
  { alt: "FitDad Club", className: "h-13", src: fdc },
  { alt: "Yours Mindfully", className: "h-15", src: mindfully },
  { alt: "FitKid Club", className: "h-15", src: fkc },
  { alt: "Miracle", className: "h-15", src: miracle },
];

const LogoItem = ({ alt, className, src }) => (
  <img
    src={src}
    alt={alt}
    className={`${className} object-contain opacity-[0.98]`}
  />
);

const MobileMarquee = () => {
  const track = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #fff, transparent)" }} />

      <motion.div
        className="flex items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {track.map(({ alt, className, src }, i) => (
          <div key={`${alt}-${i}`} className="mx-7 flex items-center shrink-0 w-10">
            <LogoItem alt={alt} className={className} src={src}  />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const TrustedBy = () => (
  <section className="bg-white px-8 text-center md:mb-20 py-20 ">
    <p className="mb-10 text-xl tracking-wide text-black">
      Trusted by leading Coaching organizations Worldwide
    </p>

    {/* ── Desktop: static grid ── */}
    <div className="hidden sm:flex flex-wrap items-center justify-center gap-20 ">
      {logos.map(({ alt, className, src }) => (
        <LogoItem key={alt} alt={alt} className={className} src={src} />
      ))}
    </div>

    {/* ── Mobile: framer motion marquee ── */}
    <div className="sm:hidden">
      <MobileMarquee />
    </div>
  </section>
);