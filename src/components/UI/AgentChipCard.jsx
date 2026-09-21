const ShimmerBar = ({ width }) => (
  <div
    style={{
      width,
      height: 7,
      borderRadius: 99,
      background: "#f0eeff",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
        animation: "shimmerSlide 1.6s infinite ease-in-out",
      }}
    />
  </div>
);

/**
 * AgentChipCard
 *
 * @param {string} avatarSrc  - image URL for the illustrated avatar
 * @param {string} avatarBg   - CSS gradient / colour for avatar bg
 * @param {string} title      - agent display name
 * @param {string} animDelay  - CSS animation-delay e.g. "0.2s"
 */
export const AgentChipCard = ({
  avatarSrc,
  avatarBg = "linear-gradient(135deg, #ffd6e0 0%, #c8b6ff 100%)",
  title,
  animDelay = "0s",
}) => (
  <div
    className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-3 py-2.5"
    style={{
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      animation: `floatIn 0.45s cubic-bezier(.22,1,.36,1) ${animDelay} both`,
      minWidth: 220,
      maxWidth: 260,
    }}
  >
    {/* Avatar bubble */}
    <div
      className="flex-shrink-0 rounded-xl overflow-hidden"
      style={{ width: 48, height: 48, background: avatarBg }}
    >
      {avatarSrc && (
        <img
          src={avatarSrc}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}
    </div>

    {/* Text */}
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#1a1a2e",
          fontFamily: "'Poppins', sans-serif",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
      <div className="flex flex-col gap-1.5">
        <ShimmerBar width="85%" />
        <ShimmerBar width="60%" />
      </div>
    </div>
  </div>
);