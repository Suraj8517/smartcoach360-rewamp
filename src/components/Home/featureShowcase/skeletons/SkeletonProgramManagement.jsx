import { LayoutGrid, TrendingUp, Zap } from "lucide-react";
import { Shimmer, GradientShimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar7.png";
import avatar2 from "../../../../assets/crm/avatar/avatar2.png";
import avatar3 from "../../../../assets/crm/avatar/avatar3.png";

const programFeatures = [
  {
    avatar: avatar1,
    top: -30,
    left: -210,
    barColor: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)",
    barBg: "#ede9fe",
    barWidth: "72%",
    accentColor: "#7c3aed",
    accentLight: "#f5f3ff",
    blur: false,
  },
  {
    avatar: avatar2,
    left: "485%",
    bottom: -60,
    barColor: "linear-gradient(90deg, #f97316 0%, #fdba74 100%)",
    barBg: "#fff7ed",
    barWidth: "58%",
    accentColor: "#f97316",
    accentLight: "#fff7ed",
    blur: true,
  },
  {
    avatar: avatar3,
    bottom: "-85%",
    left: 400,
    barColor: "linear-gradient(90deg, #059669 0%, #34d399 100%)",
    barBg: "#ecfdf5",
    barWidth: "85%",
    accentColor: "#059669",
    accentLight: "#ecfdf5",
    blur: false,
  },
];

const statRows = [
  { color: "#7c3aed", bg: "#f5f3ff", w: "60%", icon: "💪" },
  { color: "#f97316", bg: "#fff7ed", w: "35%", icon: "🏃" },
  { color: "#059669", bg: "#ecfdf5", w: "90%", icon: "🧘" },
];

export const SkeletonProgramManagement = () => (
  <>
    {/* ── Left breakdown card ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-4"
      style={{
        top: 90,
        left: -200,
        width: 220,
        boxShadow:
          "0 0 0 1px rgba(124,58,237,0.06), 0 8px 32px rgba(124,58,237,0.10)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
        >
          <LayoutGrid size={11} color="#fff" />
        </div>
        <GradientShimmer w={72} h={7} rounded="rounded-full" />
        <span
          className="ml-auto text-[9px] font-semibold rounded-full px-2 py-0.5"
          style={{ color: "#7c3aed", background: "#f5f3ff" }}
        >
          Workouts
        </span>
      </div>

      {/* Stat rows */}
      {statRows.map(({ color, bg, w, icon }, i) => (
        <div key={i} className="flex items-center gap-2 mb-3">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0"
            style={{ background: bg }}
          >
            {icon}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <Shimmer w={48} h={6} rounded="rounded-full" />
              <span className="text-[9px] font-bold" style={{ color }}>
                {w}
              </span>
            </div>
            <div
              className="h-[5px] rounded-full overflow-hidden"
              style={{ background: bg }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: w, background: color }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div
        className="mt-3 pt-3 flex items-center gap-2"
        style={{ borderTop: "1px solid #f3f4f6" }}
      >
        <TrendingUp size={10} color="#7c3aed" />
        <Shimmer w={90} h={6} rounded="rounded-full" />
      </div>
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
          }}
        >
          <div
            className="relative inline-flex items-center gap-3 p-2.5 pr-4"
            style={{ minWidth: 180 }}
          >
            <div
              className="w-[42px] h-[42px] rounded-xl overflow-hidden border-0.5"
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