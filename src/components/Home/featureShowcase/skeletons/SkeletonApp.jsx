import {
  Check,
  Activity,
  Dumbbell,
  Target,
Smartphone
} from "lucide-react";

import { Shimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar5.png";
import avatar2 from "../../../../assets/crm/avatar/avatar3.png";
import avatar3 from "../../../../assets/crm/avatar/avatar8.png";
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
    right: "-440%",
    bottom: 200,
    barColor: "linear-gradient(90deg, #8b5cf6 0%, #c084fc 100%)",
    barBg: "#f5f3ff",
    barWidth: "58%",
    accentColor: "#8b5cf6",
    accentLight: "#f5f3ff",
    blur: true,
  },
  {
    avatar: avatar3,
    bottom: "-85%",
    right: -530,
    barColor: "linear-gradient(90deg, #9333ea 0%, #d8b4fe 100%)",
    barBg: "#faf5ff",
    barWidth: "85%",
    accentColor: "#9333ea",
    accentLight: "#faf5ff",
    blur: false,
  },
];

export const SkeletonMobileApp = () => (
  <>
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        top: 55, left: -165, width: 200,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.18s both",
      }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-7 h-7 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
          <Smartphone size={13} strokeWidth={2} className="text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold text-gray-800">SmartCoach 360</div>
          <div className="text-[9px] text-gray-400">Just now</div>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
      </div>

      <div className="bg-violet-50 rounded-xl p-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <Target size={11} strokeWidth={2} className="text-violet-600" />
          <span className="text-[10px] font-semibold text-violet-800">Goal reached!</span>
        </div>
        <div className="text-[9px] text-black leading-snug">
          You hit 10,000 steps today. Keep it up!
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-gray-100">
        <Activity size={10} strokeWidth={2} className="text-violet-400" />
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-violet-500" style={{ width: "78%" }} />
        </div>
        <span className="text-[9px] font-semibold text-violet-600">78%</span>
      </div>
    </div>

    {/* Workout Tracker Card */}
    <div
      className="absolute z-10 bg-white rounded-2xl border border-gray-100 p-3"
      style={{
        bottom: -15, right: -155, width: 165,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.25s both",
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Dumbbell size={12} strokeWidth={2} className="text-violet-500" />
        <span className="text-[11px] font-semibold text-gray-700">Today's workout</span>
      </div>

      {[
        { label: "Chest press",  sets: "4×12", done: true  },
        { label: "Squats",       sets: "3×15", done: true  },
        { label: "Plank",        sets: "3×60s",done: false },
        { label: "Deadlift",     sets: "3×10", done: false },
      ].map(({ label, sets, done }) => (
        <div key={label} className="flex items-center gap-2 mb-2">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: done ? "#7c3aed" : "#ede9fe" }}
          >
            {done
              ? <Check size={8} strokeWidth={3} className="text-white" />
              : <div className="w-1.5 h-1.5 rounded-full bg-violet-300" />
            }
          </div>
          <span className={`text-[10px] flex-1 ${done ? "text-gray-400 line-through" : "text-gray-700"}`}>
            {label}
          </span>
          <span className="text-[9px] font-semibold text-violet-500">{sets}</span>
        </div>
      ))}

      <div className="mt-2.5 pt-2.5 border-t border-gray-100">
        <div className="flex justify-between mb-1">
          <span className="text-[9px] text-gray-400">Progress</span>
          <span className="text-[9px] font-semibold text-violet-600">2 / 4</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-violet-500" style={{ width: "50%" }} />
        </div>
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