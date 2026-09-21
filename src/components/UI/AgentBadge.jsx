export const AgentBadge = ({ feature, animKey }) => {
  const { AgentStatIcon } = feature;
  return (
    <div
      key={`badge-${animKey}`}
      className="inline-flex items-center gap-2.5 bg-white rounded-2xl border border-gray-100 p-2 pr-3.5"
      style={{
        boxShadow: "0 4px 24px rgba(124,58,237,0.13), 0 1px 4px rgba(0,0,0,0.06)",
        animation: "slideUp 0.38s cubic-bezier(.22,1,.36,1) 0.1s both",
      }}
    >
      {/* Avatar — square rounded, matches image */}
      <div
        className={`w-[48px] h-[48px] rounded-xl shrink-0 bg-gradient-to-br ${feature.agentColor} overflow-hidden`}
      >
        <img
          src={feature.agentImage}
          alt={feature.agentName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5">
        <p className="text-[12px] font-bold text-gray-900 leading-tight">
          {feature.agentName}
        </p>
        <div className="flex items-center gap-1">
          {/* Purple calendar icon pill */}
          <div
            className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
            style={{ background: "#ede9fe" }}
          >
            <AgentStatIcon size={10} style={{ color: "#7c3aed" }} />
          </div>
          <span className="text-[11px] text-gray-500 leading-tight">
            {feature.agentStat}
          </span>
        </div>
      </div>
    </div>
  );
};