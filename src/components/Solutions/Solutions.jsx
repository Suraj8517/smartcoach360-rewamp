import { useState } from "react";
import { Link } from "react-router-dom";
  const url =import.meta.env.VITE_CALENDLY_LINK;
   
const steps = [
  {
    number: "01",
    tag: "Personal Trainers",
    title: "Spend less time on admin.\nMore time coaching.",
    body: "Your time is a high-value asset. When it's absorbed by manual tasks and disconnected tools, delivery and growth both suffer. SmartCoach360 standardises your operations so you can focus on coaching outcomes—and increase capacity without compromising quality.",
    color: "#9747FF",
    challenges: [
      "Tracking client progress across spreadsheets and handwritten notes",
      "Chasing payments and manually tracking session packs",
      "Sending plans through WhatsApp or email every week",
      "Clients drifting away from inconsistent follow-ups",
      "Hitting a client ceiling because operations can't scale",
    ],
    features: [
      { label: "Custom Programs", desc: "Build your workout library once, assign personalised programs instantly via the app." },
      { label: "Nutrition & Macro Tracking", desc: "Set personalised targets, track adherence, and monitor activity from one dashboard." },
      { label: "Client Messaging", desc: "Automated check-ins, in-app messaging, and video calls keep clients engaged." },
      { label: "Payment Management", desc: "Session packs, online payments, discounts—configured once, running automatically." },
      { label: "Progress Dashboard", desc: "See compliance, progress, and assessments without digging through messages." },
      { label: "Mobile App", desc: "Full platform access on iOS and Android. Manage everything from your phone." },
    ],
  },
  {
    number: "02",
    tag: "Gym Owners & Studios",
    title: "Run your entire gym\nfrom one platform.",
    body: "Running a gym requires visibility across coaches, clients, classes, memberships, and revenue. SmartCoach360 provides a single operational view—so you can standardise delivery, reduce overhead, and make decisions with real-time insight.",
    color: "#9747FF",
    challenges: [
      "Coordinating multiple coaches and client assignments manually",
      "Inconsistent client experiences across different coaches",
      "Class scheduling scattered across different systems",
      "Slow, error-prone billing and membership management",
      "No easy way to track revenue and performance across your business",
    ],
    features: [
      { label: "Multi-Coach Management", desc: "Assign coaches, set capacity thresholds, track performance across every location." },
      { label: "Consistent Delivery", desc: "Master programmes every coach follows—same high-quality experience every time." },
      { label: "Classes & Appointments", desc: "Schedule sessions, sync calendars, avoid double-bookings with ease." },
      { label: "Business Dashboards", desc: "Revenue, client retention, compliance rates, and coach performance in real time." },
      { label: "Automated Billing", desc: "Recurring memberships, discounts, and pauses—managed automatically." },
      { label: "Role & Access Control", desc: "Give each team member exactly the access they need—and nothing more." },
    ],
  },
  {
    number: "03",
    tag: "Nutrition Coaches",
    title: "Deliver personalised\nnutrition at scale.",
    body: "Nutrition coaching is deeply personal work. Getting it right requires consistent monitoring, personalised planning, and ongoing client accountability. SmartCoach360 gives you the tools to do that for more clients than you ever thought possible.",
    color: "#9747FF",
    challenges: [
      "Manually creating individual meal plans one by one",
      "No reliable way to know if clients follow their plan",
      "Tracking health data across multiple apps and spreadsheets",
      "Clients going quiet between check-in calls",
      "Struggling to grow without compromising coaching quality",
    ],
    features: [
      { label: "Personalised Meal Plans", desc: "Create a library of plans, then assign customised programmes quickly and easily." },
      { label: "Macro Goal Tracking", desc: "Set specific targets and track daily intake in real time—no waiting for weekly check-ins." },
      { label: "Compliance Monitoring", desc: "See which clients are hitting targets and which need a nudge, across your whole roster." },
      { label: "Female Health Tracker", desc: "Track hormonal cycles alongside nutrition data for holistic, personalised coaching." },
      { label: "Health Integration", desc: "Sync from Apple Health, Google Fit, and Health Connect automatically." },
      { label: "Automated Check-ins", desc: "Daily or weekly accountability messages keep clients supported between sessions." },
    ],
  },
  {
    number: "04",
    tag: "Large Organisations",
    title: "Enterprise tools built\nfor fitness at scale.",
    body: "When you're running multiple locations, managing large coaching teams, and serving thousands of clients, disconnected systems get expensive fast. SmartCoach360 provides enterprise-grade infrastructure built for the fitness industry.",
    color: "#9747FF",
    challenges: [
      "No single system connecting all branches, teams, and coaching data",
      "Service quality varies depending on location or coach",
      "Manual lead allocation creating slow response times",
      "Difficulty controlling data access across a large team",
      "No bird's-eye view of organisational performance",
    ],
    features: [
      { label: "Multi-Branch Management", desc: "Manage every branch from one central dashboard with consistent workflows." },
      { label: "Auto Lead Allocation", desc: "New enquiries assigned to the right coach automatically—no bottlenecks." },
      { label: "Granular Permissions", desc: "Define precise roles for every team member with granular access controls." },
      { label: "Org-wide Dashboards", desc: "Real-time view of client stats, coach performance, and revenue across branches." },
      { label: "SSO & Security", desc: "Single Sign-On keeps team access secure and centralised across your organisation." },
      { label: "Bulk Onboarding", desc: "Onboard hundreds of clients and coaches at once without manual data entry." },
    ],
  },
];

const comparisonFeatures = [
  { label: "Custom Programs",           pt: true,  gym: true,  nc: true,  ent: true  },
  { label: "Nutrition Tracking",        pt: true,  gym: true,  nc: true,  ent: true  },
  { label: "Client Messaging",          pt: true,  gym: true,  nc: true,  ent: true  },
  { label: "Payment Processing",        pt: true,  gym: true,  nc: true,  ent: true  },
  { label: "Team Management",           pt: false, gym: true,  nc: false, ent: true  },
  { label: "Multi-branch Support",      pt: false, gym: true,  nc: false, ent: true  },
  { label: "Auto Lead Allocation",      pt: false, gym: true,  nc: false, ent: true  },
  { label: "Role & Access Control",     pt: false, gym: true,  nc: false, ent: true  },
  { label: "SSO & Enterprise Security", pt: false, gym: false, nc: false, ent: true  },
  { label: "Bulk Upload",               pt: false, gym: true,  nc: false, ent: true  },
  { label: "Dedicated Success Manager", pt: false, gym: true,  nc: false, ent: true  },
];

const plans = [
  { key: "pt",  label: "Personal Trainer", shortLabel: "PT" },
  { key: "gym", label: "Gym / Studio",     shortLabel: "Gym" },
  { key: "nc",  label: "Nutrition Coach",  shortLabel: "Nutrition" },
  { key: "ent", label: "Large Org",        shortLabel: "Org" },
];

const PURPLE = "#9747FF";

const CheckIcon = ({ active }) =>
  active ? (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="block mx-auto">
      <circle cx="10" cy="10" r="10" fill={PURPLE} fillOpacity="0.1" />
      <path d="M6 10l2.5 2.5 5.5-5" stroke={PURPLE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="block mx-auto">
      <circle cx="10" cy="10" r="9.5" stroke="#E5E7EB" strokeWidth="1" />
    </svg>
  );

export default function SolutionSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[activeStep];

  return (
    <section className="bg-[#FAFAFA]">

      {/* ── Hero Header ── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-36 lg:pt-[150px] pb-16 sm:pb-20 lg:pb-24 text-center">
        <span className="inline-block text-[13px] font-medium tracking-[0.1em] uppercase text-[#9747FF] mb-6">
          How it works
        </span>
        <h1 className="text-[clamp(36px,6vw,80px)] font-medium tracking-[-0.04em] leading-[1.05] text-[#0A0A0A] mb-6 sm:mb-7">
          Built for every kind of
          <br />
          fitness professional.
        </h1>
        <p className="text-base sm:text-lg leading-[1.7] text-[#6B7280] max-w-[540px] mx-auto mb-10 sm:mb-12">
          Whether you coach one-on-one, run a busy gym, or manage a national fitness
          organisation SmartCoach360 fits the way you operate.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
         <button onClick={() => window.open(url, "_blank")}
    className="hero-cta text-white font-semibold rounded-full group transition-all duration-300 px-4 py-4 text-[15px]"
    style={{
      letterSpacing: "0.01em",
      minHeight: "44px",
    }}
  >
    Book a Demo  <span className="translate-y-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg></span>
  </button>
          <Link to="/pricing" className=" sm:w-auto bg-transparent text-[#0A0A0A] border-[1.5px] border-[#E5E7EB] rounded-full px-8 py-4 text-[15px] font-semibold cursor-pointer tracking-[-0.01em]">
            See Pricing
          </Link>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div className="border-t border-b border-[#EBEBEB] bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 flex overflow-x-auto scrollbar-hide gap-0">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={[
                "bg-transparent border-none border-b-[2.5px] py-5 sm:py-[22px] px-4 sm:px-6 lg:px-8 cursor-pointer text-sm whitespace-nowrap transition-all duration-150 flex items-center gap-2 sm:gap-2.5 flex-shrink-0",
                activeStep === i
                  ? "border-[#9747FF] font-bold text-[#9747FF]"
                  : "border-transparent font-medium text-[#9CA3AF]",
              ].join(" ")}
            >
              <span
                className={[
                  "w-[22px] h-[22px] rounded-[6px] text-[11px] font-bold inline-flex items-center justify-center flex-shrink-0",
                  activeStep === i
                    ? "bg-[#9747FF] text-white"
                    : "bg-[#F3F4F6] text-[#9CA3AF]",
                ].join(" ")}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline">{s.tag}</span>
              {/* Mobile: short label */}
              <span className="sm:hidden">{s.tag.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Step Detail ── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <span className="text-xs font-bold tracking-[0.1em] uppercase text-[#9747FF] block mb-4">
              {step.tag}
            </span>
            <h2 className="text-[clamp(28px,3.5vw,48px)] font-medium tracking-[-0.04em] leading-[1.12] text-[#0A0A0A] mb-6 whitespace-pre-line">
              {step.title}
            </h2>
            <p className="text-[15px] sm:text-base leading-[1.75] text-[#6B7280] mb-10">
              {step.body}
            </p>

            {/* Challenges */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#D1D5DB] mb-4">
                Pain points we solve
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {step.challenges.map((c, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="flex-shrink-0 mt-[3px]"
                    >
                      <circle cx="8" cy="8" r="7.5" stroke={PURPLE} strokeOpacity="0.3" />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke={PURPLE}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[14px] leading-[1.6] text-[#374151]">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            
          </div>

          {/* Right — features grid */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#D1D5DB] mb-5">
              What you get
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {step.features.map((feat, j) => (
                <div
                  key={j}
                  className="bg-white border border-[#F0F0F0] rounded-2xl p-5 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#9747FF]/[0.08] flex items-center justify-center mb-3.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7l3 3 6-6"
                        stroke={PURPLE}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-[13px] font-bold text-[#0A0A0A] mb-1.5 tracking-[-0.01em]">
                    {feat.label}
                  </p>
                  <p className="text-[12.5px] leading-[1.65] text-[#9CA3AF] m-0">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step dots */}
        <div className="mt-14 sm:mt-16 flex items-center gap-2 justify-center">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={[
                "h-2 rounded-full border-none cursor-pointer transition-all duration-250 p-0",
                activeStep === i ? "w-7 bg-[#9747FF]" : "w-2 bg-[#E5E7EB]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

     

      {/* ── Comparison Table ── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.1em] uppercase text-[#9747FF] block mb-4">
            Compare plans
          </span>
          <h2 className="text-[clamp(30px,4vw,56px)] font-medium tracking-[-0.04em] text-[#0A0A0A] mb-4 leading-[1.1]">
            Which plan is right for you?
          </h2>
          <p className="text-base text-[#9CA3AF] m-0">
            All plans include core features. Larger plans unlock team and scale tools.
          </p>
        </div>

        {/* Table wrapper — horizontal scroll on small screens */}
        <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
          <div className="min-w-[520px] bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden">

            {/* Header */}
            <div className="grid grid-cols-[2fr_repeat(4,1fr)] border-b border-[#F3F4F6] bg-[#FAFAFA]">
              <div className="py-5 sm:py-6 px-4 sm:px-7">
                <span className="text-[13px] font-semibold text-[#9CA3AF]">Feature</span>
              </div>
              {plans.map((p) => (
                <div key={p.key} className="py-5 sm:py-6 px-2 sm:px-4 text-center">
                  <span className="inline-block text-[11px] sm:text-[12px] font-bold py-1.5 px-2 sm:px-3.5 text-black tracking-[-0.01em]">
                    {/* Show short label on mobile, full label on sm+ */}
                    <span className="sm:hidden">{p.shortLabel}</span>
                    <span className="hidden sm:inline">{p.label}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {comparisonFeatures.map((feat, i) => {
              const vals = [feat.pt, feat.gym, feat.nc, feat.ent];
              return (
                <div
                  key={i}
                  className={[
                    "grid grid-cols-[2fr_repeat(4,1fr)] items-center",
                    i < comparisonFeatures.length - 1 ? "border-b border-[#F9FAFB]" : "",
                    i % 2 === 0 ? "bg-white" : "bg-[#FDFDFD]",
                  ].join(" ")}
                >
                  <div className="py-3.5 sm:py-4 px-4 sm:px-7">
                    <span className="text-[13px] sm:text-[14px] text-[#374151] font-medium">{feat.label}</span>
                  </div>
                  {vals.map((val, j) => (
                    <div key={j} className="py-3.5 sm:py-4 px-2 sm:px-4 flex justify-center">
                      <CheckIcon active={val} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA below table */}
        <div className="text-center mt-12">
          <p className="text-[15px] text-[#9CA3AF] mb-6">
            Not sure which plan fits your business?
          </p>
           <Link to="/contact-us" className="group"
          style={{
            padding: "10px 13px",
            borderRadius: 999,
            fontSize: 16,
            fontWeight: 500,
            color: "#ffffff",
            background: "#111111",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
            fontFamily: "'Poppins', sans-serif",
            transition: "background 0.15s",
            marginLeft: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#9747FF"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#111111"; }}
        >
          Contact Us <span className="translate-y-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg></span>
        </Link>
        </div>
      </div>
    </section>
  );
}