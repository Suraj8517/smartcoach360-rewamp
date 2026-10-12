import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import img1 from "../assets/loader/1.webp";
import img2 from "../assets/loader/2.webp";
import img3 from "../assets/loader/3.webp";
import img4 from "../assets/loader/4.webp";
import logoMask from "../assets/loader/logo-mask.svg";

const EXPO_OUT = [0.16, 1, 0.3, 1];
const IN_OUT = [0.76, 0, 0.24, 1];

const SLOT_H = 1.6; // slot height in em
const LOGO_RATIO = 27 / 39; // logo svg width / height, keeps the logo undistorted
const SLOT_W = SLOT_H * LOGO_RATIO; // slot width follows the logo shape
const GAP = 0.12; // space between the words and the logo, in em

// The images only show where the logo mask is solid.
const LOGO_MASK_STYLE = {
  WebkitMaskImage: `url(${logoMask})`,
  maskImage: `url(${logoMask})`,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

const ph = (w, h, c) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${c}"/></svg>`
  )}`;
const FALLBACK = [
  ph(128, 160, "#8b1111"),
  ph(200, 160, "#d9d7d2"),
  ph(110, 160, "#e89a1c"),
  ph(160, 160, "#ee6fb0"),
];

function Letters({ text, startIndex = 0, reduce, accentFrom = -1, accentColor }) {
  return (
    <span className="flex">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top font-jakarta font-bold"
          style={{
            lineHeight: 1.05,
            color: accentFrom >= 0 && i >= accentFrom && accentColor ? accentColor : undefined,
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.1 + (startIndex + i) * 0.05,
              ease: EXPO_OUT,
            }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function SmartCoachLoader({
  images = [img1, img2, img3, img4],
  left = "SMART",
  right = "COACH360",
  splitAtMs = 1000,
  switchMs = 200,
  cycles = 3,
  accentColors = ["#C4A7E7", "#9B6FD3", "#7B52B5", "#5B3FD1", "#3A236B"],
  accentText = "360",
  onFinish,
}) {
  const reduce = useReducedMotion();
  const slides = images.length ? images : FALLBACK;

  const [expanded, setExpanded] = useState(false);
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const accentColor = opened || expanded ? accentColors[index % accentColors.length] : undefined;
  const ticks = useRef(0);

  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    // preload the mask too, so the logo shape is ready when the slot fades in
    const m = new Image();
    m.src = logoMask;
  }, [slides]);

  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), reduce ? 0 : splitAtMs);
    return () => clearTimeout(t);
  }, [splitAtMs, reduce]);

  useEffect(() => {
    if (!expanded) return;
    const openTimer = setTimeout(() => setOpened(true), reduce ? 0 : 700);
    return () => clearTimeout(openTimer);
  }, [expanded, reduce]);

  useEffect(() => {
    if (!opened) return;
    const total = slides.length * cycles;
    const id = setInterval(() => {
      ticks.current += 1;
      if (ticks.current >= total) {
        clearInterval(id);
        setVisible(false);
        return;
      }
      setIndex(ticks.current % slides.length);
    }, switchMs);
    return () => clearInterval(id);
  }, [opened, slides.length, cycles, switchMs]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-label="Loading SmartCoach360"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#EDECE9]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <div
            className="flex items-center font-space justify-center whitespace-nowrap font-medium tracking-[0.01em] text-[#0a0a0a]"
            style={{ fontSize: "clamp(1.6rem, 7.2vw, 7.5rem)" }}
          >
            <Letters text={left} reduce={reduce} />

            {/* Gap opens first, then the logo-shaped window fades in inside it. */}
            <motion.div
              className="relative shrink-0"
              style={{ height: `${SLOT_H}em` }}
              initial={false}
              animate={{
                width: expanded ? `${SLOT_W}em` : "0em",
                marginInline: expanded ? `${GAP}em` : "0em",
              }}
              transition={{
                duration: opened || reduce ? 0 : 0.45,
                ease: IN_OUT,
              }}
            >
              {/* The mask lives on this wrapper, so images are clipped to the logo shape */}
              <motion.div
                className="absolute inset-0 overflow-hidden bg-black"
                style={LOGO_MASK_STYLE}
                initial={{ opacity: 0 }}
                animate={{ opacity: expanded ? 1 : 0 }}
                transition={{
                  duration: reduce ? 0 : 0.25,
                  delay: expanded && !reduce ? 0.4 : 0,
                }}
              >
                {slides.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ opacity: i === index ? 1 : 0 }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <Letters
              text={right}
              startIndex={left.length}
              reduce={reduce}
              accentFrom={right.endsWith(accentText) ? right.length - accentText.length : -1}
              accentColor={accentColor}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}