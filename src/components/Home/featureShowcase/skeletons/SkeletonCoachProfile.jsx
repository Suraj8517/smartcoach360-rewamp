import { Star, Shield, Award, Users, MapPin, Clock, Zap, MessageCircle } from "lucide-react";

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

// ── Coach Profile Skeleton ───────────────────────────────────────────────────
const SkeletonCoachProfile = () => (
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
    `}</style>

    {/* ── Main Coach Card ── */}
    <div
      className="absolute bg-white rounded-2xl border border-gray-100 p-4"
      style={{
        top: -20,
        left: -235,
        width: 225,
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
            <Shield size={10} color="#fff" />
          </div>
          <span className="text-[11px] font-bold text-gray-700">Coach Profile</span>
        </div>
        <span
          className="text-[8px] font-semibold rounded-full px-2 py-0.5"
          style={{ background: "#f3e8ff", color: "#8b5cf6" }}
        >
          Pro
        </span>
      </div>

      {/* Avatar + Name block */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#8b5cf6,#c084fc)",
              padding: 2,
            }}
          >
            <div className="w-full h-full rounded-[10px]" style={{ background: "#faf5ff" }} />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
            style={{ background: "#8b5cf6" }}
          >
            <Star size={7} color="#fff" fill="#fff" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <Shimmer w={88} h={7} rounded="rounded-full" />
          <div className="flex items-center gap-1">
            <div className="w-[5px] h-[5px] rounded-full" style={{ background: "#8b5cf6" }} />
            <Shimmer w={55} h={5} rounded="rounded-full" />
          </div>
        </div>
      </div>

      {/* Rating row */}
      <div
        className="flex items-center gap-2 mb-3 rounded-xl p-2"
        style={{ background: "#faf5ff" }}
      >
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={9} color={i < 4 ? "#8b5cf6" : "#d1d5db"} fill={i < 4 ? "#8b5cf6" : "none"} />
          ))}
        </div>
        <span className="text-[9px] font-bold text-gray-700">4.9</span>
        <span className="text-[8px] text-gray-400">(128 reviews)</span>
      </div>

      {/* Specialties */}
      <div className="mb-3">
        <span className="text-[8px] font-semibold text-gray-500 mb-1.5 block">Specialties</span>
        <div className="flex gap-1.5 flex-wrap">
          {[
            ["#f3e8ff", "#8b5cf6", 52],
            ["#ede9fe", "#7c3aed", 44],
            ["#f3e8ff", "#8b5cf6", 60],
          ].map(([bg, color, w], i) => (
            <div
              key={i}
              className="rounded-full px-2 py-0.5 flex items-center gap-1"
              style={{ background: bg }}
            >
              <div className="w-[4px] h-[4px] rounded-full" style={{ background: color }} />
              <Shimmer w={w} h={5} rounded="rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {[
          [Users, "#8b5cf6", "Clients", "24"],
          [Award, "#c084fc", "Certifications", "6"],
        ].map(([Icon, color, label, val], i) => (
          <div
            key={i}
            className="rounded-xl p-2 flex flex-col gap-1"
            style={{ background: "#faf5ff" }}
          >
            <Icon size={10} color={color} />
            <span className="text-[11px] font-extrabold text-gray-700">{val}</span>
            <span className="text-[7px] text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="pt-2.5 flex items-center gap-1.5"
        style={{ borderTop: "1px solid #f3f4f6" }}
      >
        <MapPin size={9} color="#8b5cf6" />
        <Shimmer w={90} h={6} rounded="rounded-full" />
        <span className="ml-auto text-[8px] font-semibold" style={{ color: "#8b5cf6" }}>
          Online
        </span>
      </div>
    </div>

    {/* ── Schedule card ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        top: 120,
        right: -205,
        width: 200,
        boxShadow: "0 0 0 1px rgba(139,92,246,0.07), 0 8px 28px rgba(139,92,246,0.10)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px]">📅</span>
          <span className="text-[11px] font-bold text-gray-700">Schedule</span>
        </div>
        <span
          className="text-[8px] font-semibold rounded-full px-2 py-0.5"
          style={{ background: "#f3e8ff", color: "#8b5cf6" }}
        >
          This Week
        </span>
      </div>

      {[
        ["#f3e8ff", "#8b5cf6", "09:00"],
        ["#ede9fe", "#7c3aed", "11:30"],
        ["#faf5ff", "#8b5cf6", "14:00"],
      ].map(([bg, accent, time], i) => (
        <div
          key={i}
          className="flex items-center gap-2 mb-1.5 rounded-xl p-2"
          style={{ background: bg }}
        >
          <div
            className="w-[5px] h-8 rounded-full shrink-0"
            style={{ background: accent }}
          />
          <div className="flex flex-col flex-1 gap-1">
            <GradientShimmer w={70} h={6} rounded="rounded-full" />
            <div className="flex items-center gap-1" style={{ opacity: 0.7 }}>
              <Clock size={7} color={accent} />
              <span className="text-[8px] font-semibold" style={{ color: accent }}>{time}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#faf5ff" }}
            >
              <MessageCircle size={8} color={accent} />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* ── Floating availability pill ── */}
    <div
      className="absolute z-20 bg-white rounded-full border border-gray-100 px-3 py-2 flex items-center gap-2"
      style={{
        bottom: -55,
        right: 160,
        boxShadow: "0 4px 20px rgba(139,92,246,0.18)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.28s both",
      }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "linear-gradient(135deg,#8b5cf6,#c084fc)" }}
      >
        <Zap size={10} color="#fff" />
      </div>
      <div className="flex flex-col gap-1">
        <Shimmer w={75} h={6} rounded="rounded-full" />
        <Shimmer w={50} h={4} rounded="rounded-full" />
      </div>
    </div>
  </>
);

export default SkeletonCoachProfile;