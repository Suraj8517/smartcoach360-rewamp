import { useState } from "react";

const cards = [
  {
    id: "privacy",
    label: "Data Privacy & GDPR",
    cardBg: "#DDD6FE",
    badgeBg: "#7C3AED",
    badgeText: "#EDE9FE",
    badge: "All Plans",
    title: "Data Privacy\n& GDPR",
    description: "SmartCoach360 gives you the tools to manage client data responsibly and meet your obligations under GDPR and other global data privacy regulations.",
    bullets: [
      "Tools for managing lawful basis of data processing",
      "Client data access and deletion rights management",
      "Data processing agreements available for enterprise customers",
      "Privacy-by-design principles applied across every feature",
    ],
    accent: "rgba(109,40,217,0.18)",
  },
  {
    id: "ownership",
    label: "Your Data Belongs to You",
    cardBg: "#99F6E4",
    badgeBg: "#0F766E",
    badgeText: "#CCFBF1",
    badge: "All Plans",
    title: "Your Data\nBelongs to You",
    description: "Your data is yours. SmartCoach360 never sells, shares, or uses your business data or your clients' personal information for any purpose other than providing you with our service.",
    bullets: [
      "Full data portability — export everything at any time",
      "Complete data deletion on account closure",
      "No third-party data sharing for advertising or marketing",
      "Transparent data processing policy available on request",
    ],
    accent: "rgba(13,148,136,0.18)",
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Uptime",
    cardBg: "#BBF7D0",
    badgeBg: "#059669",
    badgeText: "#D1FAE5",
    badge: "Pro & Enterprise",
    title: "Infrastructure\n& Uptime",
    description: "SmartCoach360 runs on enterprise-grade cloud infrastructure with built-in redundancy, automated backups, and real-time monitoring.",
    bullets: [
      "99.9% uptime SLA for all paid plans",
      "Automated daily backups with georedundant storage",
      "Real-time monitoring and rapid incident response",
      "Disaster recovery infrastructure built in by default",
    ],
    accent: "rgba(5,150,105,0.18)",
  },
];

const CheckIcon = ({ color }) => (
  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
    <path d="M1.5 4.5l2.5 2.5 3.5-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CardContent = ({ card }) => (
  <div style={{
    display: "flex", flexDirection: "column", justifyContent: "center",
    height: "100%", padding: "36px 32px", boxSizing: "border-box",
  }}>
    <span style={{
      display: "inline-block", alignSelf: "flex-start",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
      padding: "4px 12px", borderRadius: 20, marginBottom: 20,
      backgroundColor: card.badgeBg, color: card.badgeText,
    }}>
      All Plans
    </span>
    <h2 style={{
      fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.08,
      letterSpacing: "-0.03em", color: "rgba(0,0,0,0.88)",
      marginBottom: 12, whiteSpace: "pre-line",
    }}>
      {card.title}
    </h2>
    <p style={{
      fontSize: "0.875rem", color: "rgba(0,0,0,0.58)", lineHeight: 1.6,
      marginBottom: 24, 
    }}>
      {card.description}
    </p>
    <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
      {card.bullets.map((b, i) => (
        <li key={i} style={{
          display: "flex", alignItems: "center", gap: 10,
          fontSize: "0.875rem", fontWeight: 500, color: "rgba(0,0,0,0.78)",
        }}>
          <span style={{
            flexShrink: 0, width: 18, height: 18, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundColor: card.badgeBg,
          }}>
            <CheckIcon color={card.badgeText} />
          </span>
          {b}
        </li>
      ))}
    </ul>
  </div>
);

export default function ProductTabsSection() {
  const [activeId, setActiveId] = useState("privacy");

  return (
    <section
      className="w-full xl:min-h-screen flex items-center justify-center py-16 px-4"
    >
      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:mt-16 lg:mb-20 mb-12">
          <div className="lg:w-1/2 mb-5 lg:mb-0">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-slate-400 mb-4">
              Security & Compliance
            </p>
            <h2
              className="font-bold text-slate-950 leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem,5vw,3.6rem)" }}
            >
              Built to meet your
              <br />compliance obligations
            </h2>
          </div>
          <div className="lg:w-1/2 flex items-end pb-1">
            <p className="text-slate-500 text-base leading-relaxed max-w-md">
              Privacy-by-design isn't just a phrase, it's embedded into every
              layer of how the platform works, from infrastructure to data access controls.
            </p>
          </div>
        </div>

        {/* Desktop accordion cards */}
        <div className="hidden md:flex gap-3 h-[420px]">
          {cards.map((card) => {
            const isActive = card.id === activeId;
            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveId(card.id)}
                style={{
                  backgroundColor: card.cardBg,
                  flex: isActive ? "1 1 0%" : "0 0 192px",
                  transition: "flex 0.55s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: isActive ? "0 8px 40px rgba(0,0,0,0.1)" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="rounded-3xl cursor-pointer"
              >
                {/* Collapsed label */}
                <div style={{
                  opacity: isActive ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  pointerEvents: isActive ? "none" : "auto",
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  justifyContent: "flex-start",
                  padding: "28px 22px",
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: card.badgeBg, display: "block", marginBottom: 16, flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3,
                    color: "rgba(0,0,0,0.8)",
                  }}>
                    {card.label}
                  </span>
                </div>

                {/* Expanded content — full width, no right panel */}
                <div style={{
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.3s ease 0.18s",
                  pointerEvents: isActive ? "auto" : "none",
                  position: "absolute", inset: 0,
                }}>
                  <CardContent card={card} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile accordion */}
        <div className="flex md:hidden flex-col gap-3">
          {cards.map((card) => {
            const isActive = card.id === activeId;
            return (
              <div
                key={card.id}
                onClick={() => setActiveId(isActive ? null : card.id)}
                style={{
                  backgroundColor: card.cardBg,
                  boxShadow: isActive ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
                  transition: "box-shadow 0.3s ease",
                }}
                className="rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Header row */}
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "rgba(0,0,0,0.85)" }}>{card.label}</span>
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: card.accent, color: card.badgeBg,
                    fontSize: "1.2rem", fontWeight: 300,
                    transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                    flexShrink: 0,
                  }}>+</span>
                </div>

                {/* Expandable body */}
                <div style={{
                  maxHeight: isActive ? "600px" : "0px",
                  transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
                  overflow: "hidden",
                }}>
                  <div style={{ padding: "0 24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
                    <span style={{
                      display: "inline-block", alignSelf: "flex-start",
                      fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
                      backgroundColor: card.badgeBg, color: card.badgeText,
                    }}>All Plans</span>
                    <h2 style={{
                      fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.025em",
                      color: "rgba(0,0,0,0.88)", whiteSpace: "pre-line", margin: 0, lineHeight: 1.1,
                    }}>
                      {card.title}
                    </h2>
                    <p style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.58)", lineHeight: 1.6, margin: 0 }}>
                      {card.description}
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
                      {card.bullets.map((b, i) => (
                        <li key={i} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          fontSize: "0.875rem", fontWeight: 500, color: "rgba(0,0,0,0.78)",
                        }}>
                          <span style={{
                            flexShrink: 0, width: 18, height: 18, borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backgroundColor: card.badgeBg,
                          }}>
                            <CheckIcon color={card.badgeText} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}