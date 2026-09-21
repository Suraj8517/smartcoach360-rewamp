// Gemini-style multicolor sparkle icon
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="chip-spark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stopColor="#4f8ef7" />
        <stop offset="40%"  stopColor="#a259f7" />
        <stop offset="70%"  stopColor="#f7594f" />
        <stop offset="100%" stopColor="#f7a825" />
      </linearGradient>
    </defs>
    <path
      d="M12 2 L13.8 9.2 L21 12 L13.8 14.8 L12 22 L10.2 14.8 L3 12 L10.2 9.2 Z"
      fill="url(#chip-spark)"
    />
  </svg>
);

/**
 * FloatingChip
 *
 * @param {string}  label       - text label (ignored when blurred=true)
 * @param {boolean} blurred     - show shimmer bars instead of label
 * @param {string}  animDelay   - CSS animation-delay e.g. "0.1s"
 */
export const FloatingChip = ({ label, blurred = false, animDelay = "0s" }) => (
  <div
    className="floating-tag inline-flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100 whitespace-nowrap"
    style={{
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      animationDelay: animDelay,
    }}
  >
    <SparkleIcon />

    {blurred ? (
      <span className="flex flex-col gap-1">
        <span className="block w-[90px] h-[7px] rounded-full bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 animate-pulse" />
        <span className="block w-[60px] h-[5px] rounded-full bg-gradient-to-r from-blue-100 to-purple-100 animate-pulse opacity-70" />
      </span>
    ) : (
      <span className="text-[11px] font-semibold text-gray-800">{label}</span>
    )}

    {/* coloured tick marks — decoration */}
    <div className="flex gap-1 ml-1">
      <span className="h-1 w-7 rounded-full bg-red-400 opacity-60" />
      <span className="h-1 w-4 rounded-full bg-amber-400 opacity-60" />
    </div>
  </div>
);