import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * SMARTCOACH360 loader, rebuilt from the reference recording.
 *
 * Timeline observed in the video (frame by frame):
 *  1. Letters rise from below a clipping line, one after another, left to right.
 *  2. The finished word holds still as one solid word.
 *  3. The word splits: the left half moves left, the right half moves right,
 *     leaving an empty gap (the gap is the width of the first image).
 *  4. A slot fades in inside the gap, then the first image shows.
 *  5. Images hard-cut every 0.5s inside a slot of one fixed size
 *     (images are cropped to fill it, so the words never shift).
 *
 * All sizes are in em, and the font size is fluid, so it scales on every screen.
 */

const EXPO_OUT = [0.16, 1, 0.3, 1];
const IN_OUT = [0.76, 0, 0.24, 1];

const SLOT_H = 1.6; // slot height in em (about 2.2x the cap height, as in the video)
const GAP = 0.12; // space between the words and the slot, in em
const SLOT_W = 1.3; // slot width in em: fixed, so every image is the same size

// Demo placeholders (different shapes) used only if you pass no images.
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

// Each letter sits in a clipping mask and slides up from below it.
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
  images = [],
  left = "SMART",
  right = "COACH360",
  splitAtMs = 1000, // when the word splits open, counted from mount
  switchMs = 200, // image switch speed
  cycles = 3, // how many times to loop the images before finishing
  // "360" takes the colour at the same index as the current image. Pick colours
  // that match your images (one per image; it repeats if there are fewer).
 accentColors = ["#C4A7E7","#9B6FD3","#7B52B5","#5B3FD1","#3A236B",],
  accentText = "360",
  onFinish,
}) {
  const reduce = useReducedMotion();
  const slides = images.length ? images : FALLBACK;

  const [expanded, setExpanded] = useState(false);
  const [opened, setOpened] = useState(false); // opening animation finished
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const accentColor = opened || expanded ? accentColors[index % accentColors.length] : undefined;
  const ticks = useRef(0);

  // Preload every image so the hard cuts never flash an empty frame.
  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [slides]);

  // Step 2 -> 3: hold the finished word, then split it.
  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), reduce ? 0 : splitAtMs);
    return () => clearTimeout(t);
  }, [splitAtMs, reduce]);

  // After the gap has opened and the slot has faded in, start switching images.
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
            className="flex items-center justify-center whitespace-nowrap font-medium tracking-[0.01em] text-[#0a0a0a]"
            style={{
              fontSize: "clamp(1.6rem, 7.2vw, 7.5rem)",
              fontFamily:
                "'Helvetica Neue', Helvetica, 'Inter', Arial, sans-serif",
            }}
          >
            <Letters text={left} reduce={reduce} />

            {/* Empty gap that opens first, then the slot fades in inside it.
                */}
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
              <motion.div
                className="absolute inset-0 overflow-hidden bg-black"
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