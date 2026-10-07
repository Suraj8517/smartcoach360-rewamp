import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Salad,
  Bolt,
  MessageSquare,
  CreditCard,
  BarChart,
  Users,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

import coaching from "../../../assets/crm/exercise-library.png";
import nutri from "../../../assets/crm/nutrition.png";
import workflow from "../../../assets/crm/workflow.png";
import engage from "../../../assets/crm/chat.png";
import payments from "../../../assets/crm/payments.png";
import dashboards from "../../../assets/crm/dashboard.webp";
import teamcrm from "../../../assets/crm/team.png";
import crmapp from "../../../assets/crm/app.png";
import crmsecurity from "../../../assets/crm/security.png";

/* ------------------------------------------------------------------ */
/* Tunables                                                           */
/* ------------------------------------------------------------------ */
const BG = "#0d0d0d";
const FOLLOW_SPEED = 0.16; // 0–1: higher = image sticks tighter to the cursor
const EASE = "cubic-bezier(0.22,1,0.36,1)";
const CONTENT_MS = 700; // content slide duration
const LINE_MS = 900; // line draw duration
const LINE_DELAY_IN = 450; // scroll down: line starts after content
const CONTENT_DELAY_OUT = 350; // scroll up: content leaves after line

const features = [
  {
    num: "001", icon: <ClipboardList size={16} />, img: coaching,
    title: "Program", subtitle: "Program Management",
    desc: "Build your master library once. Assign fully customised plans to individual clients in seconds. Clients get workouts on the app — no PDFs, no confusion.",
    tags: ["Master Programs", "Video Library", "Auto Notifications", "Custom Exercises"],
  },
  {
    num: "002", icon: <Salad size={16} />, img: nutri,
    title: "Nutrition", subtitle: "Nutrition & Activity",
    desc: "Create personalised meal plans, set macro targets, track daily compliance. Includes a dedicated female health and hormonal cycle tracker.",
    tags: ["Meal Tracking", "Macro Goals", "Compliance Monitor", "Female Health"],left:false,
  },
  {
    num: "003", icon: <Bolt size={16} />, img: workflow,
    title: "Workflow", subtitle: "Business Automation",
    desc: "Lead allocation, client onboarding, payment flows, and communication sequences — completely automated and running in the background.",
    tags: ["Lead Allocation", "Auto Onboarding", "Payment Flows", "Message Sequences"],left:false,
  },
  {
    num: "004", icon: <MessageSquare size={16} />, img: engage,
    title: "Outreach", subtitle: "Client Engagement",
    desc: "Automated check-ins, in-app messaging, video calls, group challenges, and digital high-fives. Keep every client engaged between sessions.",
    tags: ["In-App Messaging", "Video Calls", "Group Challenges", "Auto Check-ins"],left:false,
  },
  {
    num: "005", icon: <CreditCard size={16} />, img: payments,
    title: "Payments", subtitle: "Payments & Revenue",
    desc: "No more chasing. Accept online payments, set up recurring session packs, configure discounts, and handle partial payments — all built in.",
    tags: ["Online Payments", "Session Packs", "Discount Codes", "Instalments"],left:false,
  },
  {
    num: "006", icon: <BarChart size={16} />, img: dashboards,
    title: "Dashboards", subtitle: "Dashboards & Reports",
    desc: "Real-time view of client compliance, progress, and business health. Custom surveys, pre-assessment forms, performance dashboards.",
    tags: ["Live Reports", "Business Insights", "Custom Surveys", "Health Intake"],left:false,
  },
  {
    num: "007", icon: <Users size={16} />, img: teamcrm,
    title: "Team", subtitle: "Team & Organisation Management",
    desc: "Whether you are a solo coach or managing a multi-branch fitness organisation, scale effortlessly. Control teams, assign roles, and oversee operations from one central dashboard.",
    tags: ["Team & Branch Management", "Role-Based Access", "Coach Allocation Limits", "Bulk Upload Tools"],left:false,
  },
  {
    num: "008", icon: <Smartphone size={16} />, img: crmapp,
    title: "App", subtitle: "Mobile App iOS & Android",
    desc: "Run your entire coaching business from your pocket. Coaches and clients get a seamless mobile experience with real-time updates and integrated health tracking.",
    tags: ["iOS & Android Apps", "Client Self-Service", "Push Notifications", "Health Data Sync"],left:true,
  },
  {
    num: "009", icon: <ShieldCheck size={16} />, img: crmsecurity,
    title: "Security", subtitle: "Security & Compliance",
    desc: "Enterprise-grade security built into every plan. Protect sensitive client data with advanced authentication, secure payments, and compliance tools.",
    tags: ["SSO Support", "Access Control", "PCI-DSS Payments", "GDPR Tools"],left:false,
  },
];

/* True on desktop-size screens with a real mouse. Everything else
   (phones, tablets, touch laptops) uses tap + an inline image. */
function useFloatingMode() {
  const [floating, setFloating] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 1024px)");
    const update = () => setFloating(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return floating;
}

/* Scroll-direction aware reveal.
   - Scrolling down: row enters from the bottom -> visible = true.
   - Scrolling up:   row leaves through the bottom -> visible = false.
   - Row leaving through the top (scrolling down) stays visible. */
function useReveal(ref) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          // left through the bottom edge => user scrolled up
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return visible;
}

/* Smoothly animates height 0 <-> auto using the grid-rows trick. */
function Collapse({ open, children }) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

/* A line that draws from right -> left (origin-right). */
function Line({ visible, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 h-px w-full origin-right bg-white/30 motion-reduce:transition-none ${className}`}
      style={{
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transition: `transform ${LINE_MS}ms ${EASE}`,
        // down: after content | up: immediately
        transitionDelay: visible ? `${LINE_DELAY_IN}ms` : "0ms",
      }}
    />
  );
}

function Row({ item, active, anyActive, floating, isLast, onActivate, onToggle }) {
  const panelId = `feature-panel-${item.num}`;
  const rowRef = useRef(null);
  const visible = useReveal(rowRef);

  // Nothing hovered = soft grey; hovered row = bright; the others = dim.
  const titleColor = active ? "text-white" : anyActive ? "text-white/30" : "text-white/55";
  const descColor = active ? "text-white/85" : anyActive ? "text-white/20" : "text-white/40";
  const numColor = active ? "text-white" : anyActive ? "text-white/30" : "text-white/50";

  return (
    <li
      ref={rowRef}
      // clip so the slide-in from the right never creates horizontal scroll
      className="relative overflow-x-clip"
      onMouseEnter={floating ? onActivate : undefined}
    >
      {/* top line */}
      <Line visible={visible} className="top-0" />

      {/* content: slides in from right first, line follows */}
      <div
        className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 gap-y-2 py-6 motion-reduce:transition-none sm:grid-cols-[3rem_minmax(0,1fr)] sm:py-8 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,22rem)] md:gap-x-6 md:py-9 lg:grid-cols-[6rem_minmax(0,1fr)_minmax(0,24rem)] lg:py-12 xl:grid-cols-[6.9rem_minmax(0,1fr)_minmax(0,26rem)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(48px)",
          transition: `opacity ${CONTENT_MS}ms ${EASE}, transform ${CONTENT_MS}ms ${EASE}`,
          // down: immediately | up: after line has gone
          transitionDelay: visible ? "0ms" : `${CONTENT_DELAY_OUT}ms`,
        }}
      >
        {/* number */}
        <span className={`pt-1 text-xs transition-colors duration-300 sm:pt-2 sm:text-sm ${numColor}`}>
          {item.num.slice(1)}
        </span>

        {/* title */}
        <button
          type="button"
          onClick={floating ? undefined : onToggle}
          onFocus={floating ? onActivate : undefined}
          aria-expanded={active}
          aria-controls={panelId}
          className={`min-w-0 text-left font-medium leading-[1.15] tracking-[-0.02em] transition-colors duration-300 text-[clamp(1.15rem,2.6vw,2.1rem)] ${titleColor}`}
        >
          {item.subtitle}
        </button>

        {/* description: right column on md+, under the title on mobile */}
        <p
          className={`col-start-2 row-start-2 text-[13px] leading-relaxed transition-colors duration-300 sm:text-sm md:col-start-3 md:row-start-1 md:pt-1 md:text-[14px] ${descColor}`}
        >
          {item.desc}
        </p>
      </div>

      {/* Touch / tablet / mobile: tags + image open inline under the row */}
      {!floating && (
        <Collapse open={active}>
          <div
            id={panelId}
            className="pb-6 pl-[2.75rem] pr-1 sm:pb-8 sm:pl-[3.75rem] md:pl-[4.75rem]"
          >
            <p className="mb-3 text-[11px] tracking-wide text-white/55 sm:text-xs">
              {item.tags.join(" · ")}
            </p>
            <div
              className={`aspect-[16/10] w-full max-w-md origin-top-left overflow-hidden bg-white/5 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
                active ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
            >
              <img
                src={item.img}
                alt={`${item.subtitle} preview`}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </Collapse>
      )}

      {/* bottom line on the last row */}
      {isLast && <Line visible={visible} className="bottom-0" />}
    </li>
  );
}

export default function FeatureList() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [hovering, setHovering] = useState(false);
  const floating = useFloatingMode();

  const listRef = useRef(null);
  const floatRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  // keep the last hovered index so the image doesn't vanish while shrinking out
  const lastIdx = useRef(0);
  if (activeIdx !== null) lastIdx.current = activeIdx;
  const shownIdx = lastIdx.current;
  const showPreview = hovering && activeIdx !== null;

  // Smoothly chase the cursor while the pointer is over the list.
  const tick = () => {
    const p = pos.current;
    p.x += (p.tx - p.x) * FOLLOW_SPEED;
    p.y += (p.ty - p.y) * FOLLOW_SPEED;
    if (floatRef.current) {
      floatRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
    }
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const handleEnter = (e) => {
    if (!floating) return;
    const r = listRef.current.getBoundingClientRect();
    const p = pos.current;
    p.tx = e.clientX - r.left;
    p.ty = e.clientY - r.top;
    p.x = p.tx; // start right under the cursor, no fly-in
    p.y = p.ty;
    setHovering(true);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };

  const handleMove = (e) => {
    if (!floating) return;
    const r = listRef.current.getBoundingClientRect();
    pos.current.tx = e.clientX - r.left;
    pos.current.ty = e.clientY - r.top;
  };

  const handleLeave = () => {
    if (!floating) return;
    setHovering(false);
    setActiveIdx(null);
    cancelAnimationFrame(raf.current);
  };

  return (
    <section
      className="w-full px-4 py-10 sm:px-8 sm:py-14 lg:py-20 bg-black"
      
    >
      <div className="mx-auto w-full max-w-[1312px]">

        <h2 className="text-white text-[80px] font-bold mb-8">Features</h2>

        {/* borders are animated <Line/>s, so no border classes here */}
        <ul
          ref={listRef}
          className="relative"
          onMouseEnter={handleEnter}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {features.map((item, i) => (
            <Row
              key={item.num}
              item={item}
              active={i === activeIdx}
              anyActive={activeIdx !== null}
              floating={floating}
              isLast={i === features.length - 1}
              onActivate={() => setActiveIdx(i)}
              onToggle={() => setActiveIdx((cur) => (cur === i ? null : i))}
            />
          ))}

          {/* Cursor-following preview (desktop + mouse only) */}
          {floating && (
            <div
              ref={floatRef}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-20"
              style={{ willChange: "transform" }}
            >
              {/* whole container scales in/out when the list is entered/left */}
              <div
                style={{
                  transform: showPreview ? "scale(1)" : "scale(0.3)",
                  opacity: showPreview ? 1 : 0,
                  transition: showPreview
                    ? "transform 500ms cubic-bezier(0.34,1.56,0.64,1), opacity 250ms ease-out"
                    : "transform 300ms cubic-bezier(0.4,0,1,1), opacity 200ms ease-in",
                }}
              >
                {/* key = row index, so this container re-mounts and replays
                    the grow animation on EVERY row switch */}
                <div
                  key={shownIdx}
                  className="feature-pop relative h-[200px] w-[290px] overflow-hidden bg-neutral-900 shadow-2xl xl:h-[330px] xl:w-[430px]"
                >
                  <img
                    src={features[shownIdx].img}
                    alt=""
                    draggable={false}
                    className={`h-full w-full object-cover ${features[shownIdx].left ? " object-top" : "object-top-left"}`}
                  />
                </div>
              </div>

              <style>{`
                @keyframes featurePop {
                  0%   { transform: scale(0.45); opacity: 0.4; }
                  100% { transform: scale(1);    opacity: 1; }
                }
                .feature-pop {
                  animation: featurePop 550ms cubic-bezier(0.34,1.56,0.64,1) both;
                }
                @media (prefers-reduced-motion: reduce) {
                  .feature-pop { animation: none; }
                }
              `}</style>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
}