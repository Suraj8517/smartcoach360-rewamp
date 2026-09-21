export const Shimmer = ({ w, h, rounded = "rounded-md", className = "" }) => (
  <div
    className={`${rounded} ${className} shrink-0 overflow-x-hidden relative`}
    style={{ width: w, height: h, background: "#f0f0f8" }}
  >
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmerSlide 1.5s infinite",
      }}
    />
  </div>
);
export const GradientShimmer = ({
  w,
  h,
  rounded = "rounded-md",
  className = "",
}) => (
  <div
    className={`${rounded} ${className} shrink-0 overflow-hidden relative`}
    style={{
      width: w,
      height: h,
      background:
        "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 30%, #ddd6fe 65%, #c4b5fd 100%)",
    }}
  >
    {/* Animated Purple Shine */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.45) 80%, transparent 100%)",
        backgroundSize: "220% 100%",
        animation: "shimmerSlide 1.5s ease-in-out infinite",
      }}
    />

    {/* Purple Glow Overlay */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.10), rgba(139,92,246,0.08), rgba(167,139,250,0.10))",
      }}
    />
  </div>
);

export const CustomShimmer = ({
  w,
  h,
  rounded = "rounded-md",
  className = "",
  color = "#7c3aed", // main color
  lightColor = "#ede9fe", // base bg
}) => (
  <div
    className={`${rounded} ${className} shrink-0 overflow-hidden relative`}
    style={{
      width: w,
      height: h,
      background: `linear-gradient(135deg, ${lightColor} 0%, ${color}22 50%, ${lightColor} 100%)`,
    }}
  >
    {/* Animated Shine */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.45) 80%, transparent 100%)",
        backgroundSize: "220% 100%",
        animation: "shimmerSlide 1.5s ease-in-out infinite",
      }}
    />

    {/* Color Glow */}
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${color}18, transparent, ${color}12)`,
      }}
    />
  </div>
);