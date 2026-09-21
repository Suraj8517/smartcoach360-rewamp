import { Link } from "react-router-dom";

export default function SmartCoachFooter() {
  const contactItems = [
    {
      label: "Email",
      value: "sales@smartcoach360.ai",
      href: "mailto:sales@smartcoach360.ai",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    }
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/smartcoach360/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com/smartcoach360",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
  ];

  const footerLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ];

  return (
    <footer className="w-full border-t border-gray-100 bg-white text-[#1a1a1a]">

      {/* ── Top info grid ── */}
      <div className="px-5 sm:px-10 pt-10 pb-8">

        {/* Mobile: right-aligned column | sm+: unchanged grid */}
        <div className="flex flex-col items-end gap-5 sm:grid sm:grid-cols-2 sm:items-start sm:justify-items-center lg:grid-cols-3 sm:gap-6">

          {/* Email */}
          {contactItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center flex-shrink-0 text-[#7c5cfc]">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[13.5px] text-[#333] leading-snug break-words hover:text-[#7c5cfc] transition-colors duration-200 no-underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[13.5px] text-[#333] leading-snug break-words m-0">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Built with ❤️ */}
          <p className="flex items-center gap-2 text-[13.5px] text-[#333]">
            Built with ❤️ in Coimbatore, India
          </p>

          {/* Follow us */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center flex-shrink-0 text-[#7c5cfc]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">
                Follow us on
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    className="w-10 h-10 rounded-xl bg-[#f3f0ff] flex items-center justify-center text-[#7c5cfc] no-underline transition-all duration-200 hover:bg-[#7c5cfc] hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Brand wordmark ── */}
      <div className="overflow-hidden">
        <p
          className="text-center whitespace-nowrap select-none m-0 uppercase"
          style={{
            fontWeight: 700,
            lineHeight: 0.88,
            fontSize: "clamp(20px, 9vw, 160px)",
            color: "transparent",
            WebkitTextStroke: "1px #e0daf8",
            padding: "12px 0 40px",
            letterSpacing: "0.01em",
          }}
        >
          SmartCoach360
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="px-5 sm:px-10 pb-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-[12px] text-gray-300 m-0">
          © 2025–26 SmartCoach360. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              to={link.href}
              key={link.label}
              className="text-[12px] text-gray-400 no-underline hover:text-[#7c5cfc] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  );
}