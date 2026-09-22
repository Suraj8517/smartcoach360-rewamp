import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/smartcoach360.svg";

const url = import.meta.env.VITE_CALENDLY_LINK;

/* ---------------------------------------------------------------------- */
/* Palette — a light, saturated purple stands in for the reference site's */
/* yellow-green panel, paired with the same near-black ink it used on top */
/* of it, so the panel keeps that light-field / dark-text contrast.       */
/* ---------------------------------------------------------------------- */
const PANEL_BG = "#C9A6FF";
const PANEL_BG_SOFT = "#D8BCFF"; // the panel's own faint top→bottom gradient
const INK = "#1B0533";

// Scroll distance (px) after which the wordmark next to the logo hides,
// leaving just the mark — "after a few scrolls", not immediately.
const HIDE_WORDMARK_AT = 80;
const SHADOW_AT = 24;

/* ---------------------------------------------------------------------- */
/* Menu content — pulled straight from the site's existing routes. The    */
/* first six are the main wayfinding links; Resources expands in place    */
/* to reveal its three sub-pages, same as the old mobile accordion.       */
/* ---------------------------------------------------------------------- */
const MAIN_LINKS = [
  { label: "About Us", route: "/about-us" },
  { label: "Solutions", route: "/solutions" },
  { label: "Integrations", route: "/integrations" },
  { label: "Resources", route: null, hasSubmenu: true },
  { label: "Pricing", route: "/pricing" },
  { label: "Compare", route: "/comparison" },
];

const RESOURCES_SUBMENU = [
  {
    label: "Blogs",
    route: "/blogs",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="12" y2="15" />
      </svg>
    ),
    description: "Tips, guides & industry insights",
  },
  {
    label: "Success Stories",
    route: "/success-stories",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    description: "Real results from real coaches",
  },
  {
    label: "Security",
    route: "/security",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    description: "Privacy, compliance & data protection",
  },
];

const isResourcesRoute = (path) =>
  path === "/resources" || path === "/blogs" || path === "/success-stories" || path === "/security";

/* ---------------------------------------------------------------------- */
/* Menu panel — slides in from the right, fills the screen height exactly */
/* and never scrolls: every row is a flexed slice of that fixed height,   */
/* so all seven links plus the footer are always on screen at once.       */
/* Resources borrows extra flex-grow from its siblings when expanded      */
/* (they simply compress a little) instead of pushing content off-screen. */
/* ---------------------------------------------------------------------- */
function MenuPanel({ open, onClose, navigate, currentPath }) {
  const [resourcesExpanded, setResourcesExpanded] = useState(false);

  useEffect(() => {
    if (!open) setResourcesExpanded(false);
  }, [open]);

  const go = (route) => {
    if (!route) return;
    navigate(route);
    onClose();
  };

  return (
    <>
      {/* Backdrop — tints the rest of the page in the same purple while the
          panel is open, echoing the reference's colour wash over the hero. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[290] transition-opacity duration-500 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: `${PANEL_BG}33`, backdropFilter: "blur(1.5px)" }}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Site menu"
        className={`fixed inset-y-0 right-0 z-[295] flex h-[100dvh] w-full flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] sm:w-[440px] lg:w-[38vw] lg:max-w-[560px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: `linear-gradient(175deg, ${PANEL_BG_SOFT} 0%, ${PANEL_BG} 55%)` }}
      >
      

        {/* Main links — this column claims all the leftover height, and its
            children are flex items (not a scroll list), so nothing overflows. */}
        <nav className="flex min-h-0 flex-1 flex-col px-6 sm:px-10">
          {MAIN_LINKS.map(({ label, route, hasSubmenu }) => {
            const active = hasSubmenu ? isResourcesRoute(currentPath) : currentPath === route;
            const grown = hasSubmenu && resourcesExpanded;
            return (
              <div
                key={label}
                className="flex min-h-0 flex-col justify-center border-t transition-[flex-grow] duration-300 ease-out"
                style={{ borderColor: `${INK}1A`, flexGrow: grown ? 3.2 : 1, flexBasis: 0 }}
              >
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => setResourcesExpanded((v) => !v)}
                      aria-expanded={resourcesExpanded}
                      className="group flex w-full flex-shrink-0 items-center justify-between text-left"
                    >
                      <span
                        className="font-[Poppins] font-semibold leading-none tracking-tight transition-opacity group-hover:opacity-70"
                        style={{ color: INK, opacity: active ? 1 : 0.92, fontSize: "clamp(1rem, 3.4dvh, 2.3rem)" }}
                      >
                        {label}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={INK}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`flex-shrink-0 transition-transform duration-300 ${resourcesExpanded ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    <div
                      className={`flex min-h-0 flex-col justify-center gap-1 overflow-hidden transition-[flex-grow,opacity] duration-300 ease-out ${
                        resourcesExpanded ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ flexGrow: resourcesExpanded ? 1 : 0 }}
                    >
                      {RESOURCES_SUBMENU.map((item) => {
                        const subActive = currentPath === item.route;
                        return (
                          <button
                            key={item.label}
                            onClick={() => go(item.route)}
                            className="flex w-full flex-1 items-center gap-3 rounded-lg px-2 text-left transition-colors hover:bg-black/[0.06]"
                          >
                            <span
                              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                              style={{ color: INK, background: `${INK}12` }}
                            >
                              {item.icon}
                            </span>
                            <span className="flex flex-col justify-center gap-0.5 leading-tight">
                              <span
                                className="font-[Poppins] font-medium"
                                style={{ color: INK, opacity: subActive ? 1 : 0.9, fontSize: "clamp(0.75rem, 1.9dvh, 0.95rem)" }}
                              >
                                {item.label}
                              </span>
                              <span
                                className="font-[Poppins] font-normal"
                                style={{ color: `${INK}88`, fontSize: "clamp(0.62rem, 1.5dvh, 0.75rem)" }}
                              >
                                {item.description}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <button onClick={() => go(route)} className="group flex w-full items-center text-left">
                    <span
                      className="font-[Poppins] font-semibold leading-none tracking-tight transition-opacity group-hover:opacity-70"
                      style={{ color: INK, opacity: active ? 1 : 0.92, fontSize: "clamp(1rem, 3.4dvh, 2.3rem)" }}
                    >
                      {label}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer row — fixed-height, big CTA on the left, small utility link
            on the right, same beat as the reference's "Home" / "Privacy Policy". */}
        <div
          className="flex flex-shrink-0 flex-col justify-center gap-4 border-t px-6 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-7"
          style={{ borderColor: `${INK}1A` }}
        >
          <button
            onClick={() => {
              window.open(url, "_blank");
              onClose();
            }}
            className="group flex items-center gap-3 text-left transition-opacity hover:opacity-80"
          >
            <span
              className="font-[Poppins] font-bold leading-none tracking-tight"
              style={{ color: INK, fontSize: "clamp(1.15rem, 4dvh, 2.6rem)" }}
            >
              Book a Demo
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => go("/contact-us")}
            className="font-[Poppins] text-sm font-medium underline-offset-4 transition-opacity hover:underline hover:opacity-80 sm:text-right"
            style={{ color: INK }}
          >
            Contact Us
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* Top bar — transparent chrome: logo + wordmark on the left (wordmark     */
/* hides once you've scrolled a little), a small centered mark, and the   */
/* hamburger on the right. All wayfinding lives in the panel, not the bar. */
/* ---------------------------------------------------------------------- */
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc closes the menu.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrolled = scrollY > SHADOW_AT;
  const wordmarkHidden = scrollY > HIDE_WORDMARK_AT;

  // ---------------------------------------------------------------------
  // Background-aware colour via mix-blend-mode: everything in the bar is
  // rendered pure white with mixBlendMode: 'difference'. The browser
  // recomputes, per pixel, every frame: |white - whatever's behind it| —
  // so over a black background you get white, over white you get black,
  // and over a mid-tone or a scrolling gradient/video you get whatever
  // keeps it readable, continuously, with no scroll listener or section
  // tagging needed. This only works because the bar has no background of
  // its own and nothing between it and the page (transform/opacity/filter
  // on an ancestor would start a new stacking context and break it).
  // ---------------------------------------------------------------------
  const BLEND = { mixBlendMode: "difference" };

  // The hamburger's own plate uses the same trick but with a mid-grey fill:
  // |white-ish grey (128) - background| lands close to mid-grey whether the
  // background is black or white, so the plate itself stays visibly present
  // (not just its bars) on any page behind the nav, instead of disappearing
  // into a light section the way a plain transparent hit-area would.

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[300] flex h-16 items-center justify-between px-5 transition-shadow duration-300 sm:h-20 sm:px-8 `}
      >
        <button onClick={() => navigate("/")} className="flex flex-shrink-0 items-center gap-2 border-none bg-transparent" aria-label="Home">
          {/* Blend-mode applies straight to the image too. Because the logo
              itself is multi-coloured rather than a flat shape, the result
              is an auto-inverted version of those colours, not a clean
              white mark — usually fine at this size, but for a crisper look
              swap in a solid-white logo file and skip the blend on it. */}
          <img src={logo} alt="Logo" className="h-6 w-6 object-contain sm:h-7 sm:w-7" style={BLEND} />
          <span
            className={`flex items-baseline overflow-hidden whitespace-nowrap font-[Poppins] transition-all duration-500 ease-out ${
              wordmarkHidden ? "ml-0 max-w-0 opacity-0" : "ml-2 max-w-[220px] opacity-100"
            }`}
          >
            <span className="text-[17px] font-extrabold leading-none tracking-[-0.5px] text-white/60 sm:text-[19px]" style={BLEND}>
              smartcoach360
            </span>
            <span className="ml-[2px] text-[12px] font-normal leading-none text-white/60 sm:text-[13px]" style={BLEND}>
              .ai
            </span>
          </span>
        </button>

        {/* Hamburger — sits on a mid-grey plate (see PLATE_BLEND above) so
            the tap target reads clearly as a button on any background,
            light or dark, not just as three loose bars. */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-transform active:scale-95 sm:h-12 sm:w-12"
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-[30%] opacity-90 bg-purple-200/20" />
          <div className="relative flex w-[20px] flex-col gap-[5px]">
            <span
              className={`block h-[2px] origin-center rounded-full bg-black transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
              style={BLEND}
            />
            <span
              className={`block h-[2px] rounded-full bg-black transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`}
              style={BLEND}
            />
            <span
              className={`block h-[2px] origin-center rounded-full bg-black transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
              style={BLEND}
            />
          </div>
        </button>
      </nav>

      <MenuPanel open={open} onClose={() => setOpen(false)} navigate={navigate} currentPath={currentPath} />
    </>
  );
}