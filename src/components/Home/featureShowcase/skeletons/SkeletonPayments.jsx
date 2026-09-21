import { CreditCard, DollarSign, Award } from "lucide-react";
import { Shimmer, GradientShimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar4.png";
import avatar2 from "../../../../assets/crm/avatar/avatar2.png";
import avatar3 from "../../../../assets/crm/avatar/avatar3.png";

const programFeatures = [
  {
    avatar: avatar1,
    bottom: -120,
    left: -210,
    barColor: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)",
    barBg: "#ede9fe",
    barWidth: "72%",
    accentColor: "#7c3aed",
    accentLight: "#f5f3ff",
    blur: true,
  },
  {
    avatar: avatar2,
    left: "485%",
    bottom: 200,
    barColor: "linear-gradient(90deg, #8b5cf6 0%, #c084fc 100%)",
    barBg: "#f3e8ff",
    barWidth: "58%",
    accentColor: "#8b5cf6",
    accentLight: "#f3e8ff",
    blur: true,
  },
  {
    avatar: avatar3,
    bottom: "-95%",
    left: 700,
    barColor: "linear-gradient(90deg, #9333ea 0%, #d8b4fe 100%)",
    barBg: "#faf5ff",
    barWidth: "85%",
    accentColor: "#9333ea",
    accentLight: "#faf5ff",
    blur: true,
  },
];

export const SkeletonPayments = () => (
  <>
    {/* Transactions */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-violet-100 p-3"
      style={{
        bottom: 250,
        left: -160,
        width: 195,
        boxShadow: "0 8px 32px rgba(124,58,237,0.10)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-2.5">
        <DollarSign size={11} className="text-violet-500" />
        <span className="text-[11px] font-bold text-gray-700">
          Transactions
        </span>
      </div>

      {[
        ["Subscription", "+₹12,400", "✅"],
        ["Refund", "-₹2,100", "🔄"],
        ["New Order", "+₹8,900", "✅"],
        ["Payout", "-₹5,000", "⬆️"],
      ].map(([t, a, icon], i) => (
        <div key={i} className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px]">{icon}</span>
          <span className="text-[9px] text-gray-600 flex-1">{t}</span>
          <span
            className="text-[10px] font-bold"
            style={{
              color: a.startsWith("+") ? "#7c3aed" : "#a855f7",
            }}
          >
            {a}
          </span>
        </div>
      ))}
    </div>

    {/* Success Rate */}
    <div
      className="absolute z-10 bg-white rounded-xl border border-violet-100 p-3"
      style={{
        bottom: -20,
        right: -170,
        width: 160,
        boxShadow: "0 4px 16px rgba(124,58,237,0.08)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.25s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Award size={11} className="text-violet-500" />
        <span className="text-[10px] font-bold text-gray-700">
          Success Rate
        </span>
      </div>

      <div className="text-[28px] font-black text-violet-700 leading-none">
        99.9%
      </div>

      <div className="text-[9px] text-violet-400 mb-2">
        0.1% failure rate
      </div>

      <div className="flex gap-0.5">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-3 rounded-sm"
            style={{
              background:
                i === 18 ? "#e9d5ff" : "#c4b5fd",
            }}
          />
        ))}
      </div>
    </div>

    {/* Floating Cards */}
    <div className="relative" style={{ width: 240, height: 320 }}>
      {programFeatures.map((item, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
        >
          <div
            className="relative inline-flex items-center gap-3 p-2.5 pr-4"
            style={{ minWidth: 180 }}
          >
            <div
              className="w-[42px] h-[42px] rounded-xl overflow-hidden border"
              style={{
                borderColor: item.accentColor,
                background: item.accentLight,
              }}
            >
              <img
                src={item.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <CustomShimmer
                w={70}
                h={6}
                color={item.accentColor}
                lightColor={item.accentLight}
              />

              <div
                className="h-[5px] rounded-full overflow-hidden w-full"
                style={{ background: item.barBg }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: item.barWidth,
                    background: item.barColor,
                  }}
                />
              </div>

              <CustomShimmer
                w={45}
                h={5}
                color={item.accentColor}
                lightColor={item.accentLight}
              />
            </div>

            {item.blur && (
              <div className="absolute inset-0 backdrop-blur-[1px] bg-white/10 z-20 pointer-events-none rounded-xl" />
            )}
          </div>
        </div>
      ))}
    </div>
  </>
);