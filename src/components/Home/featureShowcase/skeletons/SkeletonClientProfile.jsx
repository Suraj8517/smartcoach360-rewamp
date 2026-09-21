import { Star, Shield, Award, Users, Calendar, TrendingUp, Activity, MapPin, Clock, Zap, Heart, MessageCircle } from "lucide-react";

// ── Shimmer utilities ────────────────────────────────────────────────────────
export const Shimmer = ({ w, h, rounded = "rounded" }) => (
  <div
    className={`${rounded} overflow-hidden shrink-0`}
    style={{
      width: w,
      height: h,
      background: "linear-gradient(90deg, #f3f4f6 25%, #e9ebee 50%, #f3f4f6 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmerSlide 1.6s ease-in-out infinite",
    }}
  />
);

export const GradientShimmer = ({ w, h, rounded = "rounded" }) => (
  <div
    className={`${rounded} overflow-hidden shrink-0`}
    style={{
      width: w,
      height: h,
      background: "linear-gradient(90deg, #ede9fe 25%, #ddd6fe 50%, #ede9fe 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmerSlide 1.6s ease-in-out infinite",
    }}
  />
);

export const CustomShimmer = ({ w, h, color, lightColor, rounded = "rounded" }) => (
  <div
    className={`${rounded} overflow-hidden shrink-0`}
    style={{
      width: w,
      height: h,
      background: `linear-gradient(90deg, ${lightColor} 25%, ${color}33 50%, ${lightColor} 75%)`,
      backgroundSize: "200% 100%",
      animation: "shimmerSlide 1.6s ease-in-out infinite",
    }}
  />
);

// ── Client Profile Skeleton ───────────────────────────────────────────────────
export const SkeletonClientProfile = () => (
  <>
    <style>{`
      @keyframes shimmerSlide {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes floatIn {
        from { opacity: 0; transform: translateY(12px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>

    {/* ── Main Client Card ── */}
    <div
      className="absolute bg-white rounded-2xl border border-gray-100 p-4"
      style={{
        top: 100,
        left: -210,
        width: 220,
        boxShadow: "0 0 0 1px rgba(139,92,246,0.07), 0 10px 36px rgba(139,92,246,0.13)",
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
            <Heart size={10} color="#fff" />
          </div>
          <span className="text-[11px] font-bold text-gray-700">Client Profile</span>
        </div>
        <span
          className="text-[8px] font-semibold rounded-full px-2 py-0.5"
          style={{ background: "#f3e8ff", color: "#8b5cf6" }}
        >
          Active
        </span>
      </div>

      {/* Avatar + Name block */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative shrink-0">
          <div
            className="w-11 h-11 rounded-xl"
            style={{ background: "linear-gradient(135deg,#ede9fe,#ddd6fe)" }}
          />
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: "#8b5cf6", animation: "pulse 2s ease-in-out infinite" }}
          />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Shimmer w={90} h={7} rounded="rounded-full" />
          <GradientShimmer w={60} h={5} rounded="rounded-full" />
        </div>
      </div>

      

      {/* Goal bar */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-[8px] font-semibold text-gray-500">Weekly Goal</span>
          <span className="text-[8px] font-bold" style={{ color: "#8b5cf6" }}>73%</span>
        </div>
        <div className="h-[5px] rounded-full overflow-hidden" style={{ background: "#ede9fe" }}>
          <div
            className="h-full rounded-full"
            style={{ width: "73%", background: "linear-gradient(90deg,#8b5cf6,#c084fc)" }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-1.5 flex-wrap">
        {["#ede9fe", "#f3e8ff", "#ddd6fe"].map((bg, i) => (
          <Shimmer key={i} w={[42, 54, 36][i]} h={16} rounded="rounded-full" />
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-3 pt-2.5 flex items-center gap-1.5"
        style={{ borderTop: "1px solid #f3f4f6" }}
      >
        <Clock size={9} color="#8b5cf6" />
        <Shimmer w={95} h={6} rounded="rounded-full" />
        <span className="ml-auto text-[8px] font-semibold" style={{ color: "#8b5cf6" }}>
          2d ago
        </span>
      </div>
    </div>

    {/* ── Progress Snapshot card ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        top: 210,
        right: -200,
        width: 195,
        boxShadow: "0 0 0 1px rgba(139,92,246,0.07), 0 8px 28px rgba(139,92,246,0.10)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px]">📈</span>
          <span className="text-[11px] font-bold text-gray-700">Progress</span>
        </div>
        <span
          className="text-[8px] font-semibold rounded-full px-2 py-0.5"
          style={{ background: "#f3e8ff", color: "#8b5cf6" }}
        >
          Week 8
        </span>
      </div>

      {/* Mini bar chart */}
      <div className="flex items-end gap-1.5 h-12 mb-2">
        {[55, 70, 45, 85, 60, 90, 75].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i === 5
                ? "linear-gradient(180deg,#8b5cf6,#c084fc)"
                : "#ede9fe",
            }}
          />
        ))}
      </div>

      <div className="flex justify-between">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="text-[7px] text-gray-400 flex-1 text-center">{d}</span>
        ))}
      </div>

      <div
        className="mt-2 pt-2 flex items-center gap-1.5"
        style={{ borderTop: "1px solid #f3f4f6" }}
      >
        <TrendingUp size={9} color="#8b5cf6" />
        <Shimmer w={80} h={5} rounded="rounded-full" />
        <span className="ml-auto text-[8px] font-semibold" style={{ color: "#8b5cf6" }}>+8%</span>
      </div>
    </div>

    {/* ── Floating check-in pill ── */}
    <div
      className="absolute z-20 bg-white rounded-full border border-gray-100 px-3 py-2 flex items-center gap-2"
      style={{
        bottom: -55,
        right: 250,
        boxShadow: "0 4px 20px rgba(139,92,246,0.18)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.28s both",
      }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg,#8b5cf6,#c084fc)" }}
      >
        <Calendar size={10} color="#fff" />
      </div>
      <div className="flex flex-col gap-1">
        <Shimmer w={70} h={6} rounded="rounded-full" />
        <Shimmer w={48} h={4} rounded="rounded-full" />
      </div>
    </div>
  </>
);