import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/smartcoach360.svg";

const DEMO_URL = import.meta.env.VITE_CALENDLY_LINK;

/* ─── Tokens ───────────────────────────────────────────────────────────────── */
/* Black + white throughout. Violet is kept in exactly one place: the Menu button. */

const VIOLET = "#6E0ACE"; // Menu button only
const BLACK = "#0A0A0A";

const HIDE_WORDMARK_AT = 80;

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const icon = (d) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const NAV_LINKS = [
  { label: "Solutions", route: "/solutions", desc: "What smartcoach360 does for coaches" },
  { label: "Integrations", route: "/integrations", desc: "Connect the tools you already use" },
  { label: "Pricing", route: "/pricing", desc: "Plans for every coaching business" },
  { label: "Compare", route: "/comparison", desc: "See how we stack up" },
  { label: "About us", route: "/about-us", desc: "The team behind the platform" },
];

const RESOURCES = [
  { label: "Blogs", route: "/blogs", desc: "Tips, guides and industry insights", icon: icon(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><path d="M9 7h7M9 11h7" /></>) },
  { label: "Success Stories", route: "/success-stories", desc: "Real results from real coaches", icon: icon(<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />) },
  { label: "Security", route: "/security", desc: "Privacy, compliance and data protection", icon: icon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />) },
];

const on = (path, route) => path === route || path.startsWith(route + "/");

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// focus rings: one for the black panel, one for the white CTA card
const focusDark =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]";
const focusLight =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

// Hide secondary copy on very short screens so everything still fits without scrolling.
const SHORT = "[@media(max-height:640px)]:hidden";

function MenuPanel({ open, onClose, path, firstLinkRef }) {
  // staggered entrance, replays every time the panel opens.
  // `backwards` (not `both`) so hover opacity changes still work afterwards.
  const enter = (i) =>
    open ? { animation: `menuIn 650ms cubic-bezier(0.2, 0.7, 0.2, 1) ${260 + i * 60}ms backwards` } : undefined;

  const tab = open ? 0 : -1;

  return (
    <>
      <style>{`
        @keyframes menuIn { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
        .menu-row { transition: opacity 300ms ease; }
        .menu-list:hover .menu-row:not(:hover):not(:focus-visible) { opacity: 0.4; }

        /* Link size: compact on phones/tablets, large editorial type on desktop. */
        .menu-link-text { font-size: clamp(1.2rem, 3.9dvh, 1.9rem); }
        @media (min-width: 1024px) {
          .menu-link-text { font-size: clamp(2rem, 6.4dvh, 4.25rem); }
        }

        /* Mobile: no visible scrollbar (content is sized to fit; scroll is only a safety net). */
        @media (max-width: 1023px) {
          .menu-scroll { scrollbar-width: none; }
          .menu-scroll::-webkit-scrollbar { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .menu-panel { transition: none !important; }
          .menu-anim { animation: none !important; }
        }
      `}</style>

      {/* Backdrop: the thin margin around the panel closes it */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[290] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`menu-panel fixed inset-2 z-[295] overflow-hidden rounded-[24px] text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:inset-3 sm:rounded-[32px] ${open ? "visible" : "invisible"}`}
        style={{
          background: `linear-gradient(155deg, #1C1C1C 0%, ${BLACK} 55%, #000000 100%)`,
          clipPath: open ? "inset(0% 0% 0% 0% round 28px)" : "inset(0% 0% 100% 0% round 28px)",
          transition: "clip-path 650ms cubic-bezier(0.76, 0, 0.24, 1), visibility 650ms",
        }}
      >
        {/* soft white light behind the content */}
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-white/[0.07] blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-[22rem] w-[22rem] rounded-full bg-white/[0.04] blur-3xl" />

        <div className="menu-scroll relative h-full overflow-y-auto overscroll-contain px-4 pb-4 pt-[4.5rem] sm:px-8 sm:pb-6 sm:pt-24 lg:px-12 lg:pb-10 lg:pt-28">
          <div className="mx-auto flex h-full max-w-[1240px] flex-col gap-3 lg:grid lg:h-auto lg:min-h-full lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
            {/* ── Page links ── */}
            <nav aria-label="Site" className="menu-list flex min-h-0 flex-1 flex-col border-b border-white/12">
              {NAV_LINKS.map((l, i) => {
                const active = on(path, l.route);
                return (
                  <Link
                    key={l.route}
                    ref={i === 0 ? firstLinkRef : undefined}
                    to={l.route}
                    onClick={onClose}
                    tabIndex={tab}
                    aria-current={active ? "page" : undefined}
                    className={`menu-row menu-anim group flex min-h-0 flex-1 items-center justify-between gap-4 border-t border-white/12 py-1 lg:min-h-[72px] lg:gap-6 lg:py-3 ${focusDark}`}
                    style={enter(i)}
                  >
                    <span className="menu-link-text flex items-center gap-2.5 font-[Poppins] font-semibold leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 lg:gap-3">
                      {active && <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 rounded-full bg-white lg:h-3 lg:w-3" />}
                      <span>{l.label}</span>
                    </span>

                    <span className="flex items-center gap-5">
                      <span className="hidden max-w-[15rem] text-right font-[Poppins] text-sm leading-snug text-white/45 xl:block">{l.desc}</span>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-black lg:h-11 lg:w-11">
                        <Arrow size={13} />
                      </span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Resources + demo card ── */}
            <div className="flex flex-shrink-0 flex-col gap-2.5 lg:flex-shrink lg:gap-4">
              <section
                aria-labelledby="menu-resources"
                className="menu-anim rounded-[18px] bg-white/[0.06] p-1.5 ring-1 ring-white/10 sm:p-2.5 lg:rounded-[26px] lg:p-3"
                style={enter(NAV_LINKS.length)}
              >
                <h2 id="menu-resources" className="px-2.5 pb-1 pt-1.5 font-[Poppins] text-[11px] font-medium text-white/55 lg:px-3.5 lg:pb-2 lg:pt-3 lg:text-sm">
                  Resources
                </h2>
                <ul className="flex flex-col">
                  {RESOURCES.map((r) => {
                    const active = on(path, r.route);
                    return (
                      <li key={r.route}>
                        <Link
                          to={r.route}
                          onClick={onClose}
                          tabIndex={tab}
                          aria-current={active ? "page" : undefined}
                          className={`group flex items-center gap-3 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-white/10 lg:gap-4 lg:rounded-2xl lg:px-3.5 lg:py-3 ${active ? "bg-white/10" : ""} ${focusDark}`}
                        >
                          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-black lg:h-10 lg:w-10">{r.icon}</span>
                          <span className="flex min-w-0 flex-1 flex-col leading-tight">
                            <span className="font-[Poppins] text-[13px] font-medium lg:text-base">{r.label}</span>
                            <span className={`mt-0.5 font-[Poppins] text-[11px] text-white/55 lg:text-[13px] ${SHORT} lg:!block`}>{r.desc}</span>
                          </span>
                          <span className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                            <Arrow size={13} />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <div
                className="menu-anim relative overflow-hidden rounded-[18px] bg-white p-4 text-black sm:p-5 lg:mt-auto lg:rounded-[26px] lg:p-7"
                style={enter(NAV_LINKS.length + 1)}
              >
                <p className="relative max-w-[18rem] font-[Poppins] text-[15px] font-semibold leading-tight tracking-tight lg:text-2xl">
                  See it with your own coaching business
                </p>
                <p className={`relative mt-1.5 max-w-[20rem] font-[Poppins] text-[11.5px] text-black/65 lg:mt-2 lg:text-sm ${SHORT} lg:!block`}>
                  Book a demo and we'll show you how it fits the way you coach.
                </p>
                <div className="relative mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mt-6 lg:gap-x-5 lg:gap-y-3">
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    tabIndex={tab}
                    className={`group inline-flex items-center gap-2.5 rounded-full bg-black py-1 pl-5 pr-1 font-[Poppins] text-[13px] font-semibold text-white transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] lg:gap-3 lg:py-1.5 lg:pl-6 lg:pr-1.5 lg:text-[15px] ${focusLight}`}
                  >
                    Book a demo
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45 lg:h-9 lg:w-9">
                      <Arrow size={14} />
                    </span>
                  </a>
                  <Link
                    to="/contact-us"
                    onClick={onClose}
                    tabIndex={tab}
                    className={`rounded-full px-1 py-1 font-[Poppins] text-[12.5px] font-medium underline underline-offset-4 lg:text-sm ${focusLight}`}
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const menuBtn = useRef(null);
  const firstLink = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setCompact(window.scrollY > HIDE_WORDMARK_AT);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // focus moves into the panel on open and back to the trigger on close
  useEffect(() => {
    let t;
    if (open) t = setTimeout(() => firstLink.current?.focus(), 120);
    else if (wasOpen.current) menuBtn.current?.focus();
    wasOpen.current = open;
    return () => clearTimeout(t);
  }, [open]);

  const pill = `rounded-full bg-[#0A0A0A] text-white ring-1 ring-white/15 transition-shadow duration-300 ${
    scrolled && !open ? "shadow-[0_10px_30px_rgba(0,0,0,0.35)]" : "shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
  }`;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[300] flex items-center justify-between px-2 pt-2 sm:px-6 sm:pt-5">
        {/* Logo pill */}
        <Link
          to="/"
          aria-label="smartcoach360.ai home"
          className={`pointer-events-auto flex items-center gap-2 p-1 sm:p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${pill}`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white sm:h-9 sm:w-9">
            <img src={logo} alt="" className="h-[18px] w-[18px] object-contain sm:h-5 sm:w-5" />
          </span>
          <span
            className={`flex items-baseline overflow-hidden whitespace-nowrap font-[Poppins] transition-all duration-500 ease-out motion-reduce:transition-none ${
              compact ? "max-w-0 opacity-0" : "max-w-[220px] pl-0.5 pr-2.5 opacity-100 sm:pl-1 sm:pr-3"
            }`}
          >
            <span className="text-[14px] font-bold leading-none tracking-[-0.4px] sm:text-[17px]">smartcoach360</span>
            <span className="ml-0.5 text-[10.5px] leading-none text-white/60 sm:text-[12px]">.ai</span>
          </span>
        </Link>

        {/* Actions pill */}
        <div className={`pointer-events-auto flex items-center gap-1 p-1 sm:p-1.5 ${pill}`}>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-4 py-2 font-[Poppins] text-[14.5px] font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:block"
          >
            Book a demo
          </a>
          {/* One button: opens the menu, and turns into Close while it is open */}
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            className="group flex items-center gap-2 rounded-full py-1.5 pl-3.5 pr-1.5 font-[Poppins] text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:gap-2.5 sm:py-2 sm:pl-4 sm:pr-2 sm:text-[14.5px]"
            style={{ background: VIOLET }}
          >
            {open ? "Close" : "Menu"}
            <span className="flex h-6 w-6 flex-col items-center justify-center gap-[4px] rounded-full bg-white/20 transition-colors group-hover:bg-white/30 sm:h-7 sm:w-7">
              <span
                className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${
                  open ? "w-3.5 translate-y-[3px] rotate-45" : "w-3 group-hover:w-3.5"
                }`}
              />
              <span
                className={`block h-[2px] rounded-full bg-white transition-all duration-300 ${
                  open ? "w-3.5 -translate-y-[3px] -rotate-45" : "w-3 group-hover:w-2"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <MenuPanel open={open} onClose={() => setOpen(false)} path={pathname} firstLinkRef={firstLink} />
    </>
  );
}