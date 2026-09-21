import { Flame, Activity, TrendingUp, Zap } from "lucide-react";
import { Shimmer, GradientShimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar1.png";
import avatar2 from "../../../../assets/crm/avatar/avatar5.png";
import avatar3 from "../../../../assets/crm/avatar/avatar9.png";

const programFeatures = [
  {
    avatar: avatar1,
    top: 350,
    left: -200,
    barColor: "linear-gradient(90deg, #8b5cf6 0%, #c084fc 100%)",
    barBg: "#f3e8ff",
    barWidth: "72%",
    accentColor: "#8b5cf6",
    accentLight: "#f3e8ff",
    blur: false,
  },
  {
    avatar: avatar2,
    right: "-420%",
    bottom: 200,
    barColor: "linear-gradient(90deg, #ec4899 0%, #f472b6 100%)",
    barBg: "#fdf2f8",
    barWidth: "58%",
    accentColor: "#ec4899",
    accentLight: "#fdf2f8",
    blur: true,
  },
  {
    avatar: avatar3,
    bottom: "-100%",
    left: 800,
    barColor: "linear-gradient(90deg, #06b6d4 0%, #67e8f9 100%)",
    barBg: "#ecfeff",
    barWidth: "85%",
    accentColor: "#06b6d4",
    accentLight: "#ecfeff",
    blur: true,
  },
];

export const SkeletonNutrition = () => (
  <>
    {/* ── Today's Macros card ── */}
    <div
      className="absolute bg-white rounded-2xl border border-gray-100 p-4"
      style={{
        bottom: 100,
        right: -155,
        width: 210,
        boxShadow:
          "0 0 0 1px rgba(139,92,246,0.07), 0 10px 36px rgba(139,92,246,0.13)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.05s both",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#8b5cf6,#c084fc)" }}
          >
            <Flame size={10} color="#fff" />
          </div>
          <span className="text-[11px] font-bold text-gray-700">
            Today's Macros
          </span>
        </div>
        <span
          className="text-[8px] font-semibold rounded-full px-2 py-0.5"
          style={{ background: "#f3e8ff", color: "#8b5cf6" }}
        >
          Daily
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Donut */}
        <svg width="58" height="58" viewBox="0 0 58 58">
          <circle
            cx="29" cy="29" r="22"
            fill="none" stroke="#f3f4f6" strokeWidth="8"
          />
          <circle
            cx="29" cy="29" r="22"
            fill="none" stroke="url(#macroGrad)"
            strokeWidth="8"
            strokeDasharray="90 48"
            strokeLinecap="round"
            strokeDashoffset="28"
            transform="rotate(-90 29 29)"
          />
          <defs>
            <linearGradient id="macroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <text
            x="29" y="33"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#374151"
          >
            64%
          </text>
        </svg>

        {/* Macro rows */}
        <div className="flex flex-col gap-2 flex-1">
          {[
            ["#8b5cf6", "#f3e8ff", "82g"],
            ["#c084fc", "#f3e8ff", "210g"],
            ["#a78bfa", "#ede9fe", "44g"],
          ].map(([c, bg, v], i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="w-[6px] h-[6px] rounded-full shrink-0"
                style={{ background: c }}
              />
              <div
                className="flex-1 h-[4px] rounded-full overflow-hidden"
                style={{ background: bg }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: ["68%", "82%", "44%"][i],
                    background: c,
                  }}
                />
              </div>
              <span className="text-[9px] font-bold text-gray-600 w-6 text-right">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-3 pt-2.5 flex items-center gap-1.5"
        style={{ borderTop: "1px solid #f3f4f6" }}
      >
        <Activity size={9} color="#8b5cf6" />
        <Shimmer w={100} h={6} rounded="rounded-full" />
        <span
          className="ml-auto text-[8px] font-semibold"
          style={{ color: "#8b5cf6" }}
        >
          +12%
        </span>
      </div>
    </div>

    {/* ── Meal Log card ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        bottom: 250,
        left: -190,
        width: 200,
        boxShadow:
          "0 0 0 1px rgba(139,92,246,0.07), 0 8px 28px rgba(139,92,246,0.10)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px]">🍽️</span>
          <span className="text-[11px] font-bold text-gray-700">Meal Log</span>
        </div>
        <span
          className="text-[8px] font-semibold rounded-full px-2 py-0.5"
          style={{ background: "#f3e8ff", color: "#8b5cf6" }}
        >
          Today
        </span>
      </div>

      {[
        ["#f3e8ff", "#8b5cf6", "340 kcal"],
        ["#ede9fe", "#7c3aed", "520 kcal"],
        ["#ddd6fe", "#6d28d9", "180 kcal"],
      ].map(([bg, accent, cal], i) => (
        <div
          key={i}
          className="flex items-center gap-2 mb-1.5 rounded-xl p-2"
          style={{ background: bg }}
        >
          {/* Color dot */}
          <div
            className="w-[5px] h-8 rounded-full shrink-0"
            style={{ background: accent }}
          />

          <div className="flex flex-col flex-1 gap-1">
            <GradientShimmer w={65} h={6} rounded="rounded-full" />
            <GradientShimmer w={45} h={4} rounded="rounded-full" />
          </div>

          <div className="flex flex-col items-end gap-0.5">
            <span
              className="text-[9px] font-bold"
              style={{ color: accent }}
            >
              {cal}
            </span>
            <TrendingUp size={8} color={accent} />
          </div>
        </div>
      ))}
    </div>

    {/* ── Floating avatar cards — UNTOUCHED ── */}
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
            animation: `floatIn 0.45s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.1}s both`,
          }}
        >
          <div
            className="inline-flex items-center gap-3 p-2.5 pr-4"
            style={{ minWidth: 180 }}
          >
            <div
              className="w-[42px] h-[42px] rounded-xl overflow-hidden border-.5"
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
              <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5 z-20 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  </>
);