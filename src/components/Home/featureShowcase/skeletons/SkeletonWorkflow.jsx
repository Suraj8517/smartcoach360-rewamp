import { Zap, GitBranch, PlayCircle, Clock, CheckCircle2, ArrowDown, BellRing } from "lucide-react";
import workflow from "../../../../assets/crm/workflowimg.png"

import { Shimmer, CustomShimmer } from "../../../UI/Shimmer";
import avatar1 from "../../../../assets/crm/avatar/avatar6.png";
import avatar2 from "../../../../assets/crm/avatar/avatar9.png";
import avatar3 from "../../../../assets/crm/avatar/avatar7.png";
const programFeatures = [
  {
    avatar: avatar1,
    bottom: -170,
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
    right: "-440%",
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
    bottom: "-80%",
    right: -530,
    barColor: "linear-gradient(90deg, #9333ea 0%, #d8b4fe 100%)",
    barBg: "#faf5ff",
    barWidth: "85%",
    accentColor: "#9333ea",
    accentLight: "#faf5ff",
    blur: true,
  },
];

export const SkeletonWorkflows = () => (
  <>
    {/* Top-left decorative image */}
    <div
      className="absolute z-10 p-4"
      style={{
        top: -130,
        left: -550,
        width: "100%",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.05s both",
      }}
    >
      <img
        src={workflow}
        alt=""
        className="w-[70%] pointer-events-none"
        style={{
          opacity: 0.5,
          transform: "scale(0.85)",
          filter: "saturate(0.7)",
        }}
      />
    </div>

    {/* Bottom-right decorative image */}
    <div
      className="absolute z-10 p-4"
      style={{
        bottom: -85,
        right: -450,
        width: "90%",
        animation: "floatIn 0.45s cubic-bezier(.22,1,.36,1) 0.05s both",
      }}
    >
      <img
        src={workflow}
        alt=""
        className="w-[70%] pointer-events-none ml-auto" 
        style={{
          opacity: 0.2,
          transform: "scale(0.85)",
          filter: "saturate(0.7)",
        }}
      />
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