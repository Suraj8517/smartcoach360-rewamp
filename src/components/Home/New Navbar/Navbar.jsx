import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/smartcoach360.svg";

const DEMO_URL = import.meta.env.VITE_CALENDLY_LINK;

/* ─── Tokens ───────────────────────────────────────────────────────────────── */

const VIOLET = "#6E0ACE";
const LILAC = "#C9A6FF";
const LILAC_SOFT = "#E3CFFF";
const INK = "#1B0533";

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

// focus rings: one for the dark panel, one for the lilac CTA card
const focusDark =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A6FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B0533]";
const focusLight =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B0533] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E3CFFF]";

/* ─── Menu panel ───────────────────────────────────────────────────────────── */
/* A near-full-screen dark sheet that unrolls from the top, under the floating
   header pills (the Menu button turns into Close, so the same button opens
   and closes it).
   Desktop: big page links on the left, Resources + a demo card on the right.
   Mobile:  the same content stacked, scrollable.                              */

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
        @media (prefers-reduced-motion: reduce) {
          .menu-panel { transition: none !important; }
          .menu-anim { animation: none !important; }
        }
      `}</style>

      {/* Backdrop: the thin margin around the panel closes it */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[290] bg-[#1B0533]/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`menu-panel fixed inset-3 z-[295] overflow-hidden rounded-[32px] text-white shadow-[0_30px_80px_rgba(27,5,51,0.55)] ring-1 ring-white/10 ${open ? "visible" : "invisible"}`}
        style={{
          background: `linear-gradient(155deg, #2D0C55 0%, ${INK} 55%, #12021F 100%)`,
          clipPath: open ? "inset(0% 0% 0% 0% round 32px)" : "inset(0% 0% 100% 0% round 32px)",
          transition: "clip-path 650ms cubic-bezier(0.76, 0, 0.24, 1), visibility 650ms",
        }}
      >
        {/* soft violet light behind the content */}
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full blur-3xl" style={{ background: `${VIOLET}66` }} />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-[22rem] w-[22rem] rounded-full bg-[#C9A6FF]/10 blur-3xl" />

        <div className="relative h-full overflow-y-auto overscroll-contain px-5 pb-6 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-28">
          <div className="mx-auto grid min-h-full max-w-[1240px] gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
            {/* ── Page links ── */}
            <nav aria-label="Site" className="menu-list flex flex-col border-b border-white/12">
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
                    className={`menu-row menu-anim group flex flex-1 items-center justify-between gap-6 border-t border-white/12 py-3 lg:min-h-[72px] ${focusDark}`}
                    style={enter(i)}
                  >
                    <span
                      className="flex items-center gap-3 font-[Poppins] font-semibold leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2"
                      style={{ fontSize: "clamp(2rem, 6.4dvh, 4.25rem)" }}
                    >
                      {active && <span aria-hidden="true" className="h-3 w-3 flex-shrink-0 rounded-full" style={{ background: LILAC }} />}
                      <span className="transition-colors duration-300 group-hover:text-[#C9A6FF]">{l.label}</span>
                    </span>

                    <span className="flex items-center gap-5">
                      <span className="hidden max-w-[15rem] text-right font-[Poppins] text-sm leading-snug text-white/45 xl:block">{l.desc}</span>
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-[#C9A6FF] group-hover:text-[#1B0533]">
                        <Arrow size={15} />
                      </span>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Resources + demo card ── */}
            <div className="flex flex-col gap-4">
              <section
                aria-labelledby="menu-resources"
                className="menu-anim rounded-[26px] bg-white/[0.06] p-2.5 ring-1 ring-white/10 sm:p-3"
                style={enter(NAV_LINKS.length)}
              >
                <h2 id="menu-resources" className="px-3.5 pb-2 pt-3 font-[Poppins] text-sm font-medium text-white/55">
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
                          className={`group flex items-center gap-4 rounded-2xl px-3.5 py-3 transition-colors hover:bg-white/10 ${active ? "bg-white/10" : ""} ${focusDark}`}
                        >
                          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A6FF] text-[#1B0533]">{r.icon}</span>
                          <span className="flex min-w-0 flex-1 flex-col leading-tight">
                            <span className="font-[Poppins] text-base font-medium">{r.label}</span>
                            <span className="mt-0.5 font-[Poppins] text-[13px] text-white/55">{r.desc}</span>
                          </span>
                          <span className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                            <Arrow size={15} />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <div
                className="menu-anim relative overflow-hidden rounded-[26px] p-6 text-[#1B0533] sm:p-7 lg:mt-auto"
                style={{ background: `linear-gradient(150deg, ${LILAC_SOFT} 0%, ${LILAC} 100%)`, ...enter(NAV_LINKS.length + 1) }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-12 -top-14 h-48 w-48 rounded-full bg-white/45 blur-2xl" />
                <p className="relative max-w-[18rem] font-[Poppins] text-2xl font-semibold leading-tight tracking-tight">
                  See it with your own coaching business
                </p>
                <p className="relative mt-2 max-w-[20rem] font-[Poppins] text-sm text-[#1B0533]/70">
                  Book a demo and we'll show you how it fits the way you coach.
                </p>
                <div className="relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    tabIndex={tab}
                    className={`group inline-flex items-center gap-3 rounded-full bg-[#1B0533] py-1.5 pl-6 pr-1.5 font-[Poppins] text-[15px] font-semibold text-white transition-shadow hover:shadow-[0_10px_30px_rgba(27,5,51,0.4)] ${focusLight}`}
                  >
                    Book a demo
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1B0533] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45">
                      <Arrow />
                    </span>
                  </a>
                  <Link
                    to="/contact-us"
                    onClick={onClose}
                    tabIndex={tab}
                    className={`rounded-full px-1 py-1 font-[Poppins] text-sm font-medium underline underline-offset-4 ${focusLight}`}
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

/* ─── Top bar ──────────────────────────────────────────────────────────────── */
/* Two floating dark pills: logo on the left, actions on the right. They are
   solid, so they stay readable over any section — no blend-mode tricks.      */

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

  const pill = `rounded-full bg-[#1B0533] text-white ring-1 ring-white/15 transition-shadow duration-300 ${
    scrolled && !open ? "shadow-[0_10px_30px_rgba(27,5,51,0.35)]" : "shadow-[0_4px_14px_rgba(27,5,51,0.18)]"
  }`;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[300] flex items-center justify-between px-3 pt-3 sm:px-6 sm:pt-5">
        {/* Logo pill */}
        <Link
          to="/"
          aria-label="smartcoach360.ai home"
          className={`pointer-events-auto flex items-center gap-2 p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89BFF] ${pill}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <img src={logo} alt="" className="h-5 w-5 object-contain" />
          </span>
          <span
            className={`flex items-baseline overflow-hidden whitespace-nowrap font-[Poppins] transition-all duration-500 ease-out motion-reduce:transition-none ${
              compact ? "max-w-0 opacity-0" : "max-w-[220px] pl-1 pr-3 opacity-100"
            }`}
          >
            <span className="text-[17px] font-bold leading-none tracking-[-0.4px]">smartcoach360</span>
            <span className="ml-0.5 text-[12px] leading-none text-[#C89BFF]">.ai</span>
          </span>
        </Link>

        {/* Actions pill */}
        <div className={`pointer-events-auto flex items-center gap-1 p-1.5 ${pill}`}>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full px-4 py-2 font-[Poppins] text-[14.5px] font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89BFF] sm:block"
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
            className="group flex items-center gap-2.5 rounded-full py-2 pl-4 pr-2 font-[Poppins] text-[14.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89BFF]"
            style={{ background: VIOLET }}
          >
            {open ? "Close" : "Menu"}
            <span className="flex h-7 w-7 flex-col items-center justify-center gap-[4px] rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
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