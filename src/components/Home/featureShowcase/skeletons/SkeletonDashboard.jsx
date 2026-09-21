import {
  Dumbbell,
  Flame,
  Filter,
  BookOpen,
  Clock,
  Zap,
} from "lucide-react";
import { Shimmer, GradientShimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar6.png";
import avatar2 from "../../../../assets/crm/avatar/avatar3.png";
import avatar3 from "../../../../assets/crm/avatar/avatar4.png";

const exerciseFeatures = [
  {
    avatar: avatar1,
    top: 250,
    left: -200,
    barColor: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
    barBg: "#f3e8ff",
    barWidth: "72%",
    accentColor: "#7c3aed",
    accentLight: "#f3e8ff",
    blur: true,
  },
  {
    avatar: avatar2,
    right: "-450%",
    bottom: 150,
    barColor: "linear-gradient(90deg, #8b5cf6 0%, #c084fc 100%)",
    barBg: "#f5f3ff",
    barWidth: "58%",
    accentColor: "#8b5cf6",
    accentLight: "#f5f3ff",
    blur: false,
  },
  {
    avatar: avatar3,
    bottom: "-100%",
    left: 800,
    barColor: "linear-gradient(90deg, #9333ea 0%, #d8b4fe 100%)",
    barBg: "#faf5ff",
    barWidth: "85%",
    accentColor: "#9333ea",
    accentLight: "#faf5ff",
    blur: true,
  },
];

export const SkeletonExerciseLibrary = () => (
  <>
    {/* ── Exercise Stats card — top left ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-violet-100 p-4"
      style={{
        top: 60,
        left: -160,
        width: 240,
        boxShadow: "0 10px 40px rgba(124,58,237,0.13)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.05s both",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-md bg-violet-100 flex items-center justify-center">
          <Dumbbell size={11} className="text-violet-500" />
        </div>
        <span className="text-[11px] font-bold text-gray-700">Exercise Library</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          ["Exercises", "1,340", "+18%", "#f3f0ff", "#5b21b6"],
          ["Muscles",   "12",    "+2",   "#ecfdf5", "#065f46"],
          ["Programs",  "64",    "+7%",  "#fdf4ff", "#7e22ce"],
          ["Avg Sets",  "4.2",   "+0.3", "#fefce8", "#92400e"],
        ].map(([l, v, d, bg, c], i) => (
          <div key={i} className="rounded-xl p-2.5" style={{ background: bg }}>
            <div className="text-[8px] text-gray-400 mb-0.5">
              <CustomShimmer w={50} h={10} />
            </div>
            <div className="text-[15px] font-black" style={{ color: c }}>
              <CustomShimmer w={50} h={5} color={c} lightColor={bg} />
            </div>
            <div
              className="text-[8px] font-semibold"
              style={{ color: d.startsWith("-") ? "#dc2626" : "#059669" }}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ── Exercise Categories card — bottom right ── */}
    <div
      className="absolute z-10 bg-white rounded-xl border border-violet-100 p-3"
      style={{
        bottom: -10,
        right: -120,
        width: 162,
        boxShadow: "0 4px 20px rgba(124,58,237,0.10)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.25s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-2.5">
        <Filter size={11} className="text-violet-400" />
        <span className="text-[10px] font-bold text-gray-700">Categories</span>
      </div>

      {[
        ["Strength", "86"],
        ["Cardio",   "52"],
        ["Mobility", "38"],
      ].map(([name, count], i) => (
        <div key={i} className="flex items-center gap-1.5 mb-1.5">
          <div
            className="w-[7px] h-[7px] rounded-full shrink-0"
            style={{
              background: ["#7c3aed", "#a855f7", "#c084fc"][i],
            }}
          />
          <span className="text-[9px] text-gray-600 flex-1">
            <GradientShimmer w={72} h={8} rounded="rounded-full" />
          </span>
          <span className="text-[8px] bg-violet-50 text-violet-600 font-bold rounded px-1.5">
            {count}
          </span>
        </div>
      ))}
    </div>

    {/* ── Workout Intensity badge ── */}
    <div
      className="absolute z-10 bg-white rounded-xl border border-violet-100 px-3 py-2.5"
      style={{
        top: 195,
        right: -240,
        width: 162,
        boxShadow: "0 4px 16px rgba(124,58,237,0.09)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.32s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Flame size={11} className="text-violet-400" />
        <span className="text-[10px] font-bold text-gray-700">Avg Intensity</span>
      </div>
      <div className="flex items-end gap-2">
        <div className="text-[26px] font-black text-violet-700 leading-none">74%</div>
        <div className="text-[9px] text-emerald-500 font-semibold mb-0.5">
          ↑ vs last week
        </div>
      </div>
    </div>

    {/* ── Floating exercise avatar cards ── */}
    <div className="relative" style={{ width: 240, height: 320 }}>
      {exerciseFeatures.map((item, i) => (
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
            {/* Exercise thumbnail */}
            <div
              className="w-[42px] h-[42px] rounded-xl overflow-hidden border-.5"
              style={{
                borderColor: item.accentColor,
                background: item.accentLight,
              }}
            >
              <img
                src={item.avatar}
                alt="exercise"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Shimmer bars */}
            <div className="flex flex-col gap-2 flex-1">
              <CustomShimmer
                w={70}
                h={6}
                color={item.accentColor}
                lightColor={item.accentLight}
              />
              {/* Difficulty bar */}
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