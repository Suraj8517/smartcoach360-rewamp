import {
  ShieldCheck,
  KeyRound,
  UserLock,
  Bell,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Shimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar3.png";
import avatar2 from "../../../../assets/crm/avatar/avatar5.png";
import avatar3 from "../../../../assets/crm/avatar/avatar9.png";
const programFeatures = [
  {
    avatar: avatar1,
    top: 300,
    left: -220,
    barColor: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
    barBg: "#f3e8ff",
    barWidth: "72%",
    accentColor: "#7c3aed",
    accentLight: "#f3e8ff",
    blur: false,
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
    blur: true,
  },
  {
    avatar: avatar3,
    bottom: "-100%",
    right: -600,
    barColor: "linear-gradient(90deg, #9333ea 0%, #d8b4fe 100%)",
    barBg: "#faf5ff",
    barWidth: "85%",
    accentColor: "#9333ea",
    accentLight: "#faf5ff",
    blur: false,
  },
];
export const SkeletonSecurity = () => (
  <>
    {/* Login Activity Card */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-4"
      style={{
        top: 80,
        left: -155,
        width: 220,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.05s both",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <UserLock size={12} className="text-violet-500" />
        <span className="text-[11px] font-semibold text-gray-700">
          Login activity
        </span>
        <span className="ml-auto text-[9px] font-semibold text-violet-600 bg-violet-50 rounded-full px-2 py-0.5">
          Live
        </span>
      </div>

      {[
        {
          device: "MacBook Pro",
          location: "Mumbai, IN",
          time: "2m ago",
          current: true,
        },
        {
          device: "iPhone 15",
          location: "Mumbai, IN",
          time: "1h ago",
          current: false,
        },
        {
          device: "Chrome · Win",
          location: "Pune, IN",
          time: "3h ago",
          current: false,
        },
      ].map(({ device, location, time, current }) => (
        <div
          key={device}
          className="flex items-center gap-2.5 mb-2.5 last:mb-0"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: current ? "#ede9fe" : "#f3f4f6" }}
          >
            <KeyRound
              size={12}
              strokeWidth={2}
              style={{ color: current ? "#7c3aed" : "#9ca3af" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-semibold text-gray-700 truncate">
              {device}
            </div>
            <div className="text-[9px] text-gray-400">{location}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[9px] text-gray-400">{time}</div>
            {current && (
              <div className="text-[8px] font-semibold text-violet-500">
                Current
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Security Score Card */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        bottom: -100,
        left: "40%",
        transform: "translateX(-40%)",
        width: 215,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <ShieldCheck size={12} className="text-violet-500" />
        <span className="text-[11px] font-semibold text-gray-700">
          Security score
        </span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#ede9fe"
              strokeWidth="3.5"
            />
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="3.5"
              strokeDasharray="87.96"
              strokeDashoffset="10.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[12px] font-bold text-violet-700">88</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-semibold text-gray-700 mb-2">
            Checklist
          </div>
          {[
            { label: "Strong password", done: true },
            { label: "2FA enabled", done: true },
            { label: "Backup email", done: false },
          ].map(({ label, done }) => (
            <div key={label} className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle2
                size={10}
                strokeWidth={2.5}
                style={{ color: done ? "#7c3aed" : "#d1d5db", flexShrink: 0 }}
              />
              <span
                className={`text-[9px] ${done ? "text-gray-600" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-2" />
      <div className="flex justify-between">
        {[
          ["3", "Active sessions"],
          ["12", "Trusted devices"],
          ["0", "Alerts"],
        ].map(([val, lbl]) => (
          <div key={lbl} className="text-center">
            <div className="text-[12px] font-semibold text-gray-800">{val}</div>
            <div className="text-[8px] text-gray-400">{lbl}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Alerts Card */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        bottom: 10,
        right: -165,
        width: 160,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.25s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Bell size={12} className="text-violet-500" />
        <span className="text-[11px] font-semibold text-gray-700">
          Recent alerts
        </span>
      </div>

      {[
        {
          label: "New login detected",
          time: "2m ago",
          color: "#7c3aed",
          bg: "#ede9fe",
        },
        {
          label: "Password changed",
          time: "2d ago",
          color: "#0d9488",
          bg: "#ccfbf1",
        },
        {
          label: "New device added",
          time: "5d ago",
          color: "#d97706",
          bg: "#fef3c7",
        },
      ].map(({ label, time, color, bg }) => (
        <div key={label} className="flex items-start gap-2 mb-2.5 last:mb-0">
          <div
            className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
            style={{ background: color }}
          />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-semibold text-gray-700 leading-tight">
              {label}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={8} style={{ color: "#9ca3af" }} />
              <span className="text-[8px] text-gray-400">{time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
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
            className="inline-flex items-center gap-3  p-2.5 pr-4"
            style={{
              minWidth: 180,
            }}
          >
            {/* Avatar with colored ring */}
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

            {/* Shimmer bars */}
            <div className="flex flex-col gap-2 flex-1">
              <CustomShimmer
                w={70}
                h={6}
                color={item.accentColor}
                lightColor={item.accentLight}
              />

              {/* Progress bar */}
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
