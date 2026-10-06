import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import trainer from "../../../assets/for whom/trainer.avif";
import gym from "../../../assets/for whom/gym.avif";
import wellness from "../../../assets/for whom/wellness.avif";
import owner from "../../../assets/for whom/owner.avif";

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    author: "Personal Trainers",
    quote:
      "Stop juggling apps and admin. SmartCoach360 keeps clients, programmes, nutrition, and payments in one place, so you can scale stress-free.",
    highlight: ["SmartCoach360", "so you can scale stress-free"],
    image: trainer,
    imagePosition: "object-top",
    link: "personal-trainer",
  },
  {
    author: "Gym Owners & Studios",
    quote:
      "One platform to manage your team, your classes, your client allocations, and your revenue—whether you’re running one location or five.",
    highlight: ["platform", "you’re running one location or five."],
    image: owner,
    imagePosition: "object-center",
    link: "gym-owner",
  },
  {
    author: "Nutrition & Wellness Coaches",
    quote:
      "Deliver truly personalised nutrition plans at scale, track macro compliance in real time, and keep your clients accountable without spending your whole day manually following up.",
    highlight: [
      "personalised nutrition plans",
      "without spending your whole day manually following up.",
    ],
    image: wellness,
    imagePosition: "object-center",
    link: "nutrition-coach",
  },
  {
    author: "Large Fitness Organisations",
    quote:
      "Enterprise tools for multi-branch management, SSO, bulk data uploads, and a dedicated Customer Success Manager to help you get the most out of the platform.",
    highlight: [
      "multi-branch management, SSO, bulk data uploads",
      "Customer Success Manager",
    ],
    image: gym,
    imagePosition: "object-center",
    link: "large-organisation",
  },
];

// ─── Tunables ─────────────────────────────────────────────────────────────────

const BG = "#f0eeeb";
const INK = "#0d0d0d";
const MUTED = "#6E6D6C"; // collapsed row title / button
const ACCENT = "#7c3aed"; // active row title + highlighted words (reference uses red)
const LINE = "rgba(0,0,0,0.18)";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function highlightText(text, highlights) {
  let parts = [{ text, highlighted: false }];
  for (const h of highlights) {
    parts = parts.flatMap((part) => {
      if (part.highlighted) return [part];
      const idx = part.text.indexOf(h);
      if (idx === -1) return [part];
      return [
        { text: part.text.slice(0, idx), highlighted: false },
        { text: h, highlighted: true },
        { text: part.text.slice(idx + h.length), highlighted: false },
      ];
    });
  }
  return parts;
}

const Arrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Row ──────────────────────────────────────────────────────────────────────

function Row({ card, index, active, onActivate }) {
  return (
    <li
      className="border-t"
      style={{ borderColor: LINE }}
      onMouseEnter={() => onActivate(index)}
    >
      {/* lg: [ content | button ... | 330px image slot ]  (slot is always reserved
          so the button never shifts between rows) */}
      <div className="flex flex-col py-4 sm:py-5 lg:flex-row lg:gap-10 lg:py-10">
        {/* ── Left column: title + button on top, description pinned to bottom ── */}
        <div
          className={`flex min-w-0 flex-1 flex-col transition-[min-height] duration-500 ease-out ${
            active ? "lg:min-h-[220px]" : "lg:min-h-[48px]"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <h3 className="min-w-0 flex-1 font-display text-[clamp(1.6rem,4.4vw,3.5rem)] leading-[1.1] tracking-tight text-black">
              <button
                type="button"
                aria-expanded={active}
                aria-controls={`row-panel-${index}`}
                onClick={() => onActivate(index)}
                onFocus={() => onActivate(index)}
                className="w-full cursor-pointer text-left font-medium leading-[1.1] tracking-tight transition-colors duration-300 text-[clamp(1.6rem,4.4vw,3.5rem)]"
                style={{ color: active ? ACCENT : MUTED }}
              >
                {card.author}
              </button>
            </h3>

            <HashLink
              smooth
              to={`/success-stories#${card.link}`}
              className="group inline-flex h-10 shrink-0 items-center gap-2 border px-3 text-xs font-medium transition-colors duration-300 sm:h-11 sm:px-4 sm:text-sm"
              style={{
                color: active ? INK : MUTED,
                borderColor: active ? INK : "rgba(0,0,0,0.15)",
              }}
            >
              <span className="hidden sm:inline">View more details</span>
              <span className="sm:hidden">Details</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <Arrow />
              </span>
            </HashLink>
          </div>

          {/* Expandable panel — grid-rows trick animates height smoothly */}
          <div
            id={`row-panel-${index}`}
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:mt-auto ${
              active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pt-4 lg:pt-6">
                <p
                  className="mb-1.5 text-[11px] uppercase tracking-[0.06em]"
                  style={{ color: "#6b6967" }}
                >
                  Why it fits
                </p>
                <p
                  className="max-w-[40rem] text-[15px] leading-snug"
                  style={{ color: INK }}
                >
                  {highlightText(card.quote, card.highlight).map((part, i) =>
                    part.highlighted ? (
                      <span key={i} className="font-semibold" style={{ color: ACCENT }}>
                        {part.text}
                      </span>
                    ) : (
                      <span key={i}>{part.text}</span>
                    )
                  )}
                </p>

                {/* Image — mobile / tablet only (sits below the text) */}
                <div className="mt-4 overflow-hidden lg:hidden">
                  <img
                    src={card.image}
                    alt={card.author}
                    draggable={false}
                    className={`h-[200px] w-full object-cover sm:h-[280px] ${card.imagePosition}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right column (desktop): 330px slot, image grows in on hover ── */}
        <div className="hidden w-[330px] shrink-0 lg:block">
          <div
            className={`overflow-hidden transition-[height,opacity] duration-500 ease-out ${
              active ? "h-[220px] opacity-100" : "h-0 opacity-0"
            }`}
          >
            <img
              src={card.image}
              alt={card.author}
              draggable={false}
              className={`h-[220px] w-[330px] object-cover ${card.imagePosition}`}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function CustomersSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full ">
      <div className="mx-auto max-w-[1312px] px-5 py-12 sm:px-8 sm:py-14 lg:px-0 lg:py-16">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="font-medium leading-[1] tracking-tighter text-[clamp(2rem,5.2vw,4rem)]"
            style={{ color: INK }}
          >
            Built for Every Type
            <br />
            of Fitness Professional
          </h2>

          <Link
            to="/contact-us"
            className="group flex w-fit items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 py-2 text-base font-semibold transition-all duration-200 hover:bg-gray-900 hover:text-white"
            style={{ borderColor: "#1f2937", color: "#1f2937" }}
          >
            Contact sales
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Arrow />
            </span>
          </Link>
        </div>

        {/* List */}
        <ul className="border-b" style={{ borderColor: LINE }}>
          {cards.map((card, i) => (
            <Row
              key={card.author}
              card={card}
              index={i}
              active={active === i}
              onActivate={setActive}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}