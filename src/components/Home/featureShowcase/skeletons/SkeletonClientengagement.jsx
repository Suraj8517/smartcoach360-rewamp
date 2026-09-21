import {
  MessageCircle,
  CheckCircle2,
  Mail,
  Star,
  Bell,
  Video,
  Users,
  Phone,
  Calendar,
  Zap,
  TrendingUp,
} from "lucide-react";
 
import { Shimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar1.png";
import avatar2 from "../../../../assets/crm/avatar/avatar2.png";
import avatar3 from "../../../../assets/crm/avatar/avatar5.png";
const programFeatures = [
  {
    avatar: avatar1,
    top: 400,
    left: -220,
    barColor: "linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)",
    barBg: "#f3e8ff",
    barWidth: "72%",
    accentColor: "#7c3aed",
    accentLight: "#f3e8ff",
    blur: true,
  },
  {
    avatar: avatar2,
    right: "-400%",
    bottom: -280,
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
    left: 350,
    barColor: "linear-gradient(90deg, #9333ea 0%, #d8b4fe 100%)",
    barBg: "#faf5ff",
    barWidth: "85%",
    accentColor: "#9333ea",
    accentLight: "#faf5ff",
    blur: true,
  },
];
export const SkeletonClientEngagement = () => (
  <>

    {/* Recent Activity card — bottom left */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        top: 60, left: -200, width: 220,
        boxShadow: "0 8px 32px rgba(0,0,0,0.09)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-2.5">
        <Bell size={11} className="text-purple-400" />
        <span className="text-[11px] font-bold text-gray-700">Recent Activity</span>
        <span className="ml-auto text-[8px] font-semibold text-purple-400 bg-purple-50 rounded-full px-2 py-0.5">
          Live
        </span>
      </div>

      {[
        { icon: MessageCircle, color: "#25D366", bg: "#dcfce7",    time: "2m ago"  },
        { icon: CheckCircle2,  color: "#16a34a", bg: "#dcfce7",    time: "1h ago"  },
        { icon: Video,         color: "#6264A7", bg: "#ede9fe",   time: "2h ago"  },
        { icon: Calendar,      color: "#f97316", bg: "#fff7ed",    time: "Tomorrow"},
        { icon: Mail,          color: "#3b82f6", bg: "#dbeafe",    time: "3h ago"  },
      ].map(({ icon: Icon, color, bg, text, time }, i) => (
        <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            style={{ background: bg }}
          >
            <Icon size={10} style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-gray-700 font-medium truncate"><Shimmer w={100} h={6} rounded="rounded-full" />
</div>
          </div>
          <span className="text-[8px] text-gray-400 shrink-0">{time}</span>
        </div>
      ))}
    </div>

    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        bottom: 100, right: -205, width: 165,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.25s both",
      }}
    >

      {/* Live sessions */}
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-4 h-4 rounded-md bg-violet-50 flex items-center justify-center">
          <Video size={9} color="#7c3aed" />
        </div>
        <span className="text-[10px] font-bold text-gray-700">Live Sessions</span>
      </div>

      {[
        { label: "Teams",  count: "3 active", color: "#6264A7", bg: "#ede9fe" },
        { label: "Zoom",   count: "1 active", color: "#2563eb", bg: "#dbeafe" },
      ].map(({ label, count, color, bg }, i) => (
        <div key={i} className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: color }}
            />
            <span className="text-[9px] text-gray-500">{label}</span>
          </div>
          <span
            className="text-[8px] font-bold rounded-full px-1.5 py-0.5"
            style={{ background: bg, color }}
          >
            {count}
          </span>
        </div>
      ))}

      {/* Engagement spark */}
      <div
        className="mt-2 rounded-lg p-1.5 flex items-center gap-1.5 bg-purple-100/60"
        
      >
        <TrendingUp size={9} className="text-purple-900" />
        <span className="text-[8px] font-semibold text-purple-900">
          Engagement up 12% this week
        </span>
      </div>
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