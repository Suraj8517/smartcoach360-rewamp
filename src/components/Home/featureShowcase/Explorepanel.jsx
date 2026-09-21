import { Check } from "lucide-react";
import { NAV_FEATURES } from "./constants/topfeatures";

export const ExplorePanel = ({ active, onSelect }) => {
  const ButtonPill = (f) => {
    const isActive = active === f.id;
    return (
      <button
        key={f.id}
        onClick={() => onSelect(f.id)}
        className="flex items-center gap-1.5 rounded-full px-4 py-2 whitespace-nowrap transition-all duration-150 text-[12px] 2xl:text-[13.5px]"
        style={{
          background: "#fff",
          color: isActive ? "#1a1a1a" : "#4b5563",
          border: `1.5px solid ${isActive ? "#d1d5db" : "#e5e7eb"}`,
          boxShadow: isActive ? "0 1px 6px rgba(0,0,0,0.10)" : "0 1px 3px rgba(0,0,0,0.05)",
          fontWeight: isActive ? 600 : 400,
        }}
      >
        {isActive && (
          <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#6E0ACE" }}>
            <Check size={9} strokeWidth={3} color="#fff" />
          </span>
        )}
        {f.label}
      </button>
    );
  };

  return (
    <div className="w-full flex justify-center">

      {/* 2xl: single row */}
      <div className="hidden 2xl:flex gap-2 justify-center flex-wrap ">
        {NAV_FEATURES.map((f) => <ButtonPill key={f.id} {...f} />)}
      </div>

      {/* lg: two rows of 5 + 4 */}
      <div className="flex 2xl:hidden flex-col items-center gap-2 w-full">
        <div className="flex gap-2 justify-center">
          {NAV_FEATURES.slice(0, 5).map((f) => <ButtonPill key={f.id} {...f} />)}
        </div>
        <div className="flex gap-2 justify-center">
          {NAV_FEATURES.slice(5).map((f) => <ButtonPill key={f.id} {...f} />)}
        </div>
      </div>

    </div>
  );
};