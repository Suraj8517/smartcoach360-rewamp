import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter+Tight:wght@400;500&family=Great+Vibes&display=swap');`;

const SANS = { fontFamily: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif" };
/* Anton is the display face from your theme (--font-display). It only ships
   in weight 400, so don't set 900 or the browser will fake a bold. */
const DISPLAY = {
  fontFamily: "'Anton', 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
  fontWeight: 400,
};
const SCRIPT = { fontFamily: "'Great Vibes', 'Snell Roundhand', cursive", fontWeight: 400 };

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/smartcoach360/" },
  { label: "Instagram", href: "https://instagram.com/smartcoach360" },
];

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

const EMAIL = "sales@smartcoach360.ai";

/* Scales its text so the word spans exactly the full width of its box
   (no glyph stretching), and re-fits on resize / when fonts finish loading. */
function FitText({ text, style }) {
  const boxRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const el = textRef.current;
    if (!box || !el) return;

    const fit = () => {
      const bw = box.clientWidth;
      if (!bw) return; // hidden breakpoint
      el.style.fontSize = "100px";
      const w = el.getBoundingClientRect().width;
      if (w) el.style.fontSize = `${(bw / w) * 100}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener?.("loadingdone", fit);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener?.("loadingdone", fit);
    };
  }, [text]);

  return (
    <div ref={boxRef} className="flex w-full">
      <span ref={textRef} className="inline-block shrink-0 whitespace-nowrap" style={style}>
        {text}
      </span>
    </div>
  );
}

const wordStyle = {
  ...DISPLAY,
  color: "#404040",
  lineHeight: 1,
  letterSpacing: "0",
  textTransform: "uppercase",
};

const scriptStyle = {
  ...SCRIPT,
  lineHeight: 1,
  paddingRight: "0.05em",
  background: "linear-gradient(90deg, #ededed 0%, #d0d0d0 40%, #a3a3a3 75%, #8f8f8f 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

const headingCls =
  "m-0 text-[18px] font-normal leading-none tracking-[-0.02em] text-black md:text-[clamp(18px,1.25vw,26px)]";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-bg text-[#404040]" style={SANS}>
      <style>{FONTS}</style>

      {/* ── Wordmark + flag line ── */}
      <div className="relative pb-10 md:pb-[5vw]">
        <div className="relative z-10">
         

          {/* India flag line */}
          <div className="flex h-[5px] w-full md:h-[6px]" aria-hidden="true">
            <span className="flex-1 bg-[#ff9933]" />
            <span className="flex-1 bg-white" />
            <span className="flex-1 bg-[#138808]" />
          </div>
        </div>
      </div>

      {/* ── Info columns ── */}
      <div className="relative z-10 px-5 pb-8 md:px-[4.6%]">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[29%_1fr_auto] md:gap-8">
          {/* Follow us (the "Menu" column) */}
          <div>
            <h3 className={headingCls}>Follow us</h3>
            <ul className="m-0 mt-8 list-none p-0 md:mt-[clamp(48px,4.2vw,88px)]">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[36px] leading-[1.1] tracking-[-0.04em] text-[#404040] no-underline transition-colors duration-200 hover:text-[#7c5cfc] md:text-[clamp(32px,1.9vw,44px)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <h3 className={headingCls}>Contact</h3>
            <div className="mt-8 text-[16px] leading-[1.5] tracking-[-0.01em] md:mt-[clamp(48px,4.2vw,88px)] md:text-[clamp(15px,1.05vw,21px)]">
              <p className="m-0 text-[#404040]">Built with ❤️</p>
              <p className="m-0 text-[#6b6b6b]">in Coimbatore, India</p>
            </div>
            <div className="mt-12 text-[16px] leading-[1.5] tracking-[-0.01em] md:mt-[clamp(48px,5vw,110px)] md:text-[clamp(15px,1.05vw,21px)]">
              <p className="m-0 text-[#404040]">Email</p>
              <a
                href={`mailto:${EMAIL}`}
                className="break-words text-[#6b6b6b] no-underline transition-colors duration-200 hover:text-[#7c5cfc]"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Back to top + legal */}
          <div className="flex flex-col gap-10 md:items-end md:justify-between md:gap-8">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="order-2 cursor-pointer self-start border-0 bg-transparent p-0 text-[18px] leading-none tracking-[-0.02em] text-black transition-colors duration-200 hover:text-[#7c5cfc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#404040] md:order-1 md:self-end md:text-[clamp(18px,1.25vw,26px)]"
              style={SANS}
            >
              Back to top
            </button>

            <div className="order-1 flex flex-col gap-3 text-[14px] tracking-[-0.01em] text-[#6b6b6b] md:order-2 md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-x-10 md:gap-y-2 md:text-[clamp(14px,1.05vw,21px)]">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[#6b6b6b] no-underline transition-colors duration-200 hover:text-[#7c5cfc]"
                >
                  {link.label}
                </Link>
              ))}
              <span>© 2025–26 SmartCoach360. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}