import { Shimmer, CustomShimmer } from "../../../UI/Shimmer";

export const SkeletonTeamManagement = () => (
  <>
    {/* ── Role Permissions Card ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-4"
      style={{
        top: 120, right: -225, width: 240,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.05s both",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span className="text-[11px] font-semibold text-gray-700">Role Permissions</span>
        <span className="ml-auto text-[10px] font-semibold text-violet-700 bg-violet-50 rounded-full px-2 py-0.5">3 Roles</span>
      </div>

      {[
        { role: "Admin",   perms: ["Manage", "Edit", "View"], color: "text-violet-600", bg: "bg-violet-50" },
        { role: "Coach",   perms: ["Edit", "View"],           color: "text-indigo-600", bg: "bg-indigo-50" },
        { role: "Viewer",  perms: ["View"],                   color: "text-gray-500",   bg: "bg-gray-100"  },
      ].map(({ role, perms, color, bg }) => (
        <div key={role} className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-semibold ${color}`}>{role}</span>
          <div className="flex gap-1">
            {perms.map((p) => (
              <span key={p} className={`text-[8px] font-semibold ${bg} ${color} rounded-full px-1.5 py-0.5`}>{p}</span>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* ── Config Settings Card ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        bottom: 100, left: -180, width: 205,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          </svg>
        </div>
        <span className="text-[11px] font-semibold text-gray-700">System Config</span>
      </div>

      <div className="h-px bg-gray-100 mb-2.5" />

      {/* Toggle rows */}
      {[
        { label: "Email Notifications", on: true  },
        { label: "Auto Billing",        on: true  },
        { label: "2FA Required",        on: false },
        { label: "Client Self-signup",  on: true  },
      ].map(({ label, on }) => (
        <div key={label} className="flex items-center justify-between mb-2">
          <span className="text-[9.5px] text-gray-500">{label}</span>
          <div
            className="w-7 h-4 rounded-full flex items-center px-0.5 flex-shrink-0 transition-all"
            style={{ background: on ? "#7c3aed" : "#e5e7eb" }}
          >
            <div
              className="w-3 h-3 rounded-full bg-white shadow-sm transition-all"
              style={{ marginLeft: on ? "12px" : "0px" }}
            />
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-purple-50 bg-purple-50 -mx-3 -mb-3 px-3 pb-3 rounded-b-2xl">
        <span className="text-[9px] text-purple-400">Last updated 2h ago</span>
        <span className="text-[9px] font-bold bg-purple-500 text-white rounded-full px-2 py-0.5">Saved</span>
      </div>
    </div>

    {/* ── Integration Status Panel ── */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        bottom: -55, right: -115, width: 155,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.25s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
        <span className="text-[11px] font-semibold text-gray-700">Integrations</span>
      </div>

      {[
        { label: "Stripe",    status: "Active",  color: "#16a34a", bg: "#dcfce7" },
        { label: "Zoom",      status: "Active",  color: "#16a34a", bg: "#dcfce7" },
        { label: "WhatsApp",  status: "Pending", color: "#d97706", bg: "#fef3c7" },
        { label: "Zapier",    status: "Off",     color: "#9ca3af", bg: "#f3f4f6" },
      ].map(({ label, status, color, bg }) => (
        <div key={label} className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-600">{label}</span>
          <span
            className="text-[8px] font-semibold rounded-full px-1.5 py-0.5"
            style={{ color, background: bg }}
          >
            {status}
          </span>
        </div>
      ))}
    </div>

  </>
);