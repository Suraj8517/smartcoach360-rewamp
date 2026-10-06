import vmax from "../../../assets/crm/logos/vmax.png";
import fmc from "../../../assets/crm/logos/fitmomclub.jpg";
import LK from "../../../assets/crm/logos/lk.png";
import mindfully from "../../../assets/crm/logos/yours-mindfully.png";
import fkc from "../../../assets/crm/logos/fitkid.png";
import fdc from "../../../assets/crm/logos/fitdad.png";
import miracle from "../../../assets/crm/logos/miracle.png";
import family from "../../../assets/crm/logos/family.png";

import { motion, useReducedMotion } from "framer-motion";

/* Heights scale with the screen: small on phones, original sizes from lg up.
   (h-18 isn't a default Tailwind class, so LK uses an arbitrary value.) */
const BASE = "h-9 sm:h-12 lg:h-16";
const logos = [
  { alt: "family", className: BASE, src: family },
  { alt: "VMax Healthtech", className: BASE, src: vmax },
  { alt: "FitMom Club", className: BASE, src: fmc },
  { alt: "LK", className: "h-10 sm:h-14 lg:h-[4.5rem]", src: LK },
  { alt: "FitDad Club", className: BASE, src: fdc },
  { alt: "Yours Mindfully", className: BASE, src: mindfully },
  { alt: "FitKid Club", className: BASE, src: fkc },
];

// Seconds for one full loop. Raise for slower, lower for faster.
const LOOP_SECONDS = 28;

const LogoItem = ({ alt, className, src }) => (
  <img
    src={src}
    alt={alt}
    draggable={false}
    className={`${className} w-auto max-w-none object-contain opacity-70 grayscale mix-blend-multiply`}
  />
);

const MASK =
  "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)";

export const TrustedByNew = () => {
  const reduceMotion = useReducedMotion();
  // Four copies; sliding exactly -50% (two copies) loops seamlessly.
  const track = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      className="relative w-full px-4 py-5 sm:px-10 sm:py-6"
      style={{
        backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left lg:gap-10">
        {/* Label: centered above the strip on phones, left of it from sm up */}
        <p className="shrink-0 text-xs leading-snug text-neutral-500 sm:max-w-[170px] sm:text-sm lg:max-w-[190px]">
          Trusted by leading Coaching organizations Worldwide
        </p>

        {/* Logo marquee, faded at both edges */}
        <div
          className="relative w-full min-w-0 flex-1 overflow-hidden"
          style={{ WebkitMaskImage: MASK, maskImage: MASK }}
        >
          <motion.div
            className={`flex w-max items-center ${
              reduceMotion ? "overflow-x-auto" : ""
            }`}
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{
              duration: LOOP_SECONDS,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {track.map(({ alt, className, src }, i) => (
              <div
                key={`${alt}-${i}`}
                className="mx-5 flex shrink-0 items-center sm:mx-9 lg:mx-12"
              >
                <LogoItem alt={alt} className={className} src={src} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByNew;