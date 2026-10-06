import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/smartcoach360.svg";

const DEMO_URL = import.meta.env.VITE_CALENDLY_LINK;

/* ─── Tokens ───────────────────────────────────────────────────────────────── */

const VIOLET = "#6E0ACE";
const LILAC = "#C9A6FF";
const LILAC_SOFT = "#E3CFFF";

const HIDE_WORDMARK_AT = 80;

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const icon = (d) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const MAIN_LINKS = [
  { label: "Solutions", route: "/solutions" },
  { label: "Integrations", route: "/integrations" },
  { label: "Pricing", route: "/pricing" },
  { label: "Compare", route: "/comparison" },
  { label: "Resources", submenu: true },
  { label: "About us", route: "/about-us" },
];

const RESOURCES = [
  { label: "Blogs", route: "/blogs", desc: "Tips, guides and industry insights", icon: icon(<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><path d="M9 7h7M9 11h7" /></>) },
  { label: "Success Stories", route: "/success-stories", desc: "Real results from real coaches", icon: icon(<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />) },
  { label: "Security", route: "/security", desc: "Privacy, compliance and data protection", icon: icon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />) },
];

const on = (path, route) => path === route || path.startsWith(route + "/");
const resourcesOn = (path) => RESOURCES.some((r) => on(path, r.route));

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1B0533] focus-visible:ring-offset-[#D8BCFF]";

/* ─── Menu panel ───────────────────────────────────────────────────────────── */
/* A floating card inset from the screen edge. Every row is a flexed slice of
   the card's height, so all links and the footer are on screen at once with
   no scrolling. Resources borrows height from its siblings when expanded.    */

function MenuPanel({ open, onClose, path, closeRef }) {
  const [resOpen, setResOpen] = useState(false);

  useEffect(() => { if (!open) setResOpen(false); }, [open]);

  // staggered entrance, replays each time the panel opens
  const enter = (i) =>
    open ? { animation: `menuIn 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${140 + i * 55}ms both` } : undefined;

  return (
    <>
      <style>{`
        @keyframes menuIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .menu-anim { animation: none !important; } }
      `}</style>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[290] bg-[#1B0533]/45 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`fixed bottom-3 right-3 top-3 z-[295] flex w-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-[32px] text-[#1B0533] shadow-[0_30px_80px_rgba(27,5,51,0.45)] transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none sm:w-[440px] lg:w-[38vw] lg:max-w-[540px] ${
          open ? "visible translate-x-0" : "invisible translate-x-[110%]"
        }`}
        style={{ background: `linear-gradient(160deg, ${LILAC_SOFT} 0%, ${LILAC} 60%, #B98BFA 100%)` }}
      >
        {/* soft light in the corner */}
        <span aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/50 blur-3xl" />

        {/* Header: close button */}
        <div className="relative flex h-[76px] flex-shrink-0 items-center justify-end px-5 sm:px-7">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className={`flex h-11 w-11 items-center justify-center rounded-full bg-[#1B0533] text-white transition-transform duration-300 hover:rotate-90 motion-reduce:transition-none ${focus}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {/* Links */}
        <nav aria-label="Site" className="relative flex min-h-0 flex-1 flex-col px-6 sm:px-9">
          {MAIN_LINKS.map((l, i) => {
            const active = l.submenu ? resourcesOn(path) : on(path, l.route);
            const grown = l.submenu && resOpen;
            const size = { fontSize: "clamp(1.25rem, 4.4dvh, 2.9rem)" };

            return (
              <div
                key={l.label}
                className="menu-anim flex min-h-0 flex-col justify-center border-t border-[#1B0533]/15 transition-[flex-grow] duration-300 ease-out"
                style={{ flexGrow: grown ? 3.4 : 1, flexBasis: 0, ...enter(i) }}
              >
                {l.submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setResOpen((v) => !v)}
                      aria-expanded={resOpen}
                      tabIndex={open ? 0 : -1}
                      className={`group flex w-full flex-shrink-0 items-center justify-between rounded-full text-left ${focus}`}
                    >
                      <span className="flex items-center gap-3 font-[Poppins] font-semibold leading-none tracking-tight" style={size}>
                        {active && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: VIOLET }} />}
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">{l.label}</span>
                      </span>
                      <span className={`flex h-9 w-9 mt-2 items-center justify-center rounded-full border border-[#1B0533]/25 transition-all duration-300 group-hover:bg-[#1B0533] group-hover:text-white ${resOpen ? "rotate-45 bg-[#1B0533] text-white" : ""}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </button>

                    <ul
                      className="flex min-h-0 flex-col justify-center gap-1 overflow-hidden transition-[flex-grow,opacity] duration-300 ease-out"
                      style={{ flexGrow: resOpen ? 1 : 0, opacity: resOpen ? 1 : 0 }}
                    >
                      {RESOURCES.map((r) => (
                        <li key={r.route} className="flex min-h-0 flex-1">
                          <Link
                            to={r.route}
                            onClick={onClose}
                            tabIndex={open && resOpen ? 0 : -1}
                            className={`flex w-full items-center gap-3 rounded-2xl px-2 transition-colors hover:bg-white/45 ${on(path, r.route) ? "bg-white/45" : ""} ${focus}`}
                          >
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1B0533] text-white">{r.icon}</span>
                            <span className="flex flex-col leading-tight">
                              <span className="font-[Poppins] font-medium" style={{ fontSize: "clamp(0.8rem, 2dvh, 1rem)" }}>{r.label}</span>
                              <span className="font-[Poppins] text-[#1B0533]/60" style={{ fontSize: "clamp(0.65rem, 1.5dvh, 0.78rem)" }}>{r.desc}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={l.route}
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`group flex w-full items-center justify-between rounded-full ${focus}`}
                  >
                    <span className="flex items-center gap-3 font-[Poppins] font-semibold leading-none tracking-tight" style={size}>
                      {active && <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: VIOLET }} />}
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">{l.label}</span>
                    </span>
                    <span className="flex h-9 w-9 -translate-x-2 items-center justify-center rounded-full bg-[#1B0533] text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                      <Arrow size={14} />
                    </span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="menu-anim relative flex flex-shrink-0 items-center justify-between gap-3 border-t border-[#1B0533]/15 px-6 py-5 sm:px-9 sm:py-6"
          style={enter(MAIN_LINKS.length)}
        >
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className={`group inline-flex items-center gap-3 rounded-full bg-[#1B0533] py-1.5 pl-6 pr-1.5 font-[Poppins] text-[15px] font-semibold text-white transition-shadow hover:shadow-[0_10px_30px_rgba(27,5,51,0.4)] ${focus}`}
          >
            Book a demo
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1B0533] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45">
              <Arrow />
            </span>
          </a>
          <Link
            to="/contact-us"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className={`rounded-full px-2 py-1 font-[Poppins] text-sm font-medium underline-offset-4 hover:underline ${focus}`}
          >
            Contact us
          </Link>
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
  const closeBtn = useRef(null);
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
    if (open) t = setTimeout(() => closeBtn.current?.focus(), 60);
    else if (wasOpen.current) menuBtn.current?.focus();
    wasOpen.current = open;
    return () => clearTimeout(t);
  }, [open]);

  const pill = `rounded-full bg-[#1B0533] text-white ring-1 ring-white/15 transition-shadow duration-300 ${
    scrolled ? "shadow-[0_10px_30px_rgba(27,5,51,0.35)]" : "shadow-[0_4px_14px_rgba(27,5,51,0.18)]"
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
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="group flex items-center gap-2.5 rounded-full py-2 pl-4 pr-2 font-[Poppins] text-[14.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89BFF]"
            style={{ background: VIOLET }}
          >
            Menu
            <span className="flex h-7 w-7 flex-col items-center justify-center gap-[4px] rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
              <span className="block h-[2px] w-3 rounded-full bg-white transition-all duration-300 group-hover:w-3.5" />
              <span className="block h-[2px] w-3 rounded-full bg-white transition-all duration-300 group-hover:w-2" />
            </span>
          </button>
        </div>
      </header>

      <MenuPanel open={open} onClose={() => setOpen(false)} path={pathname} closeRef={closeBtn} />
    </>
  );
}