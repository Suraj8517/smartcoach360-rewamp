import {
  Mail,
  CreditCard,
  LayoutGrid,
  UserMinus,
  BarChart2,
  Activity,
  CheckIcon,
} from "lucide-react";

const problems = [
  {
    icon: <Mail size={18} />,
    title: "Scattered Client Data",
    text: "Client details spread across email, spreadsheets, and WhatsApp, follow-ups constantly missed.",
  },
  {
    icon: <CreditCard size={18} />,
    title: "Invoice Chaos",
    text: "Hours every week chasing invoices and manually tracking session packs instead of coaching.",
  },
  {
    icon: <LayoutGrid size={18} />,
    title: "Tool Overload",
    text: "Scheduling in one app, messaging in another, nutrition in a third, the constant switching drains you.",
  },
  {
    icon: <UserMinus size={18} />,
    title: "Client Drop-off",
    text: "Clients drift and cancel because check-ins and progress tracking aren't consistent.",
  },
  {
    icon: <BarChart2 size={18} />,
    title: "Growth Ceiling",
    text: "Growth stalls — not from lack of demand, but because admin has eaten your capacity.",
  },
  {
    icon: <Activity size={18} />,
    title: "No Single Source",
    text: "Without unified data, it's impossible to see client trends, act proactively, or scale with confidence.",
  },
];

export default function ProblemSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .brand-gradient {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #6d28d9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .prob-card {
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .prob-card:active {
          transform: scale(0.98);
        }
      `}</style>

      <section className="font-poppins bg-white w-full py-32 px-5 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* ── Header ── */}
          <div className="flex flex-col lg:flex-row lg:gap-10 lg:mt-16 lg:mb-20 mb-10">
            <div className="lg:w-3/5 mb-5 lg:mb-0">
              <h2 className="font-medium text-gray-950 leading-none tracking-tighter text-[clamp(2.6rem,8vw,5.5rem)]">
                The Chaos<br />We Simplify
              </h2>
            </div>
            <div className="lg:w-3/5 flex items-center">
              <p className="text-slate-500 text-[15px] font-normal leading-relaxed max-w-lg">
                You entered coaching to drive transformation, not to manage a patchwork of tools. As your client base grows, these challenges compound.
              </p>
            </div>
          </div>

          {/* ── Desktop Grid (unchanged) ── */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
            {problems.map((p, i) => (
              <div className="w-75" key={i}>
                <div className="text-violet-600 mb-3">{p.icon}</div>
                <h3 className="font-semibold text-gray-900 text-[16px] mb-2">{p.title}</h3>
                <p className="text-slate-500 text-[16px] leading-relaxed font-normal">{p.text}</p>
              </div>
            ))}
          </div>

          {/* ── Mobile: stacked number cards ── */}
          <div className="sm:hidden flex flex-col divide-y divide-gray-100">
            {problems.map((p, i) => (
              <div key={i} className="prob-card flex items-start gap-4 py-5">

                {/* Index number */}
                <span
                  className="shrink-0 text-[11px] font-bold text-violet-300 mt-0.5"
                  style={{ minWidth: 20 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-violet-600 shrink-0">{p.icon}</span>
                    <h3 className="font-semibold text-gray-900 text-[14px] leading-snug">{p.title}</h3>
                  </div>
                  <p className="text-slate-400 text-[13px] leading-relaxed font-normal">{p.text}</p>
                </div>

              </div>
            ))}
          </div>

          {/* ── Tagline ── */}
          <div className="mt-12 sm:mt-24 flex flex-wrap items-center gap-2.5">
            <span className="brand-gradient font-extrabold text-xl tracking-tight">
              SmartCoach360
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-200 shrink-0" />
            <span className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-violet-700">
              <span className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                <CheckIcon size={9} strokeWidth={3} className="text-white" />
              </span>
              One platform. Zero chaos.
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-200 shrink-0" />
            <span className="text-slate-400 text-sm font-normal">
              <span className="font-bold text-slate-600">removes </span> all of the above
            </span>
          </div>

        </div>
      </section>
    </>
  );
}