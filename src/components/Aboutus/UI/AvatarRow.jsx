import { useState, useEffect, useRef } from "react";
import avatar1 from "../../../assets/crm/avatar/avatar1.png"
import avatar2 from "../../../assets/crm/avatar/avatar2.png"
import avatar3 from "../../../assets/crm/avatar/avatar3.png"
import avatar4 from "../../../assets/crm/avatar/avatar4.png"
import avatar5 from "../../../assets/crm/avatar/avatar5.png"
import avatar6 from "../../../assets/crm/avatar/avatar6.png"
import avatar7 from "../../../assets/crm/avatar/avatar7.png"



const members = [
  { id: 1, src: {},       color: "#FDBA74" }, // light orange
  { id: 2, src: {},       color: "#A5B4FC" }, // light indigo
  { id: 3, src: avatar6,  color: "#F9A8D4" }, // light pink
  { id: 4, src: avatar4,  color: "#D4D4D8" }, // light purple
  { id: 5, src: avatar2,  color: "#6EE7B7" }, // light emerald
  { id: 6, src: avatar3,  color: "#67E8F9" }, // light cyan
  { id: 7, src: avatar1,  color: "#86EFAC" }, // light green
  { id: 8, src: avatar5,  color: "#CBD5E1" }, // light slate
  { id: 9, src: avatar7,  color: "#D8B4FE" }, // light zinc
  { id: 10, src: {},      color: "#C4B5FD" }, // light violet
  { id: 11, src: {},      color: "#FCD34D" }, // light amber
];

const desktopSizes   = [52,  70,  90,  110, 160, 182, 160, 110, 90,  70,  52];
const desktopMargins = [0,  -17, -14, -36, -36, -36, -36, -36, -14, -14, -14];

const mobileSizes    = [28,  36,  44,  54,  76,  88,  76,  54,  44,  36,  28];
const mobileMargins  = [-10,   -10,  -20, -28, -28, -28, -28, -28,  -20,  -10,  -10];

const blurs    = [true, true, false, false, false, false, false, false, false, true, true];
const zIndexes = [1, 2, 3, 4, 6, 7, 6, 4, 3, 2, 1];
const shadows  = [
  "0 2px 8px rgba(0,0,0,0.10)",
  "0 2px 10px rgba(0,0,0,0.12)",
  "0 4px 16px rgba(0,0,0,0.13)",
  "0 4px 20px rgba(0,0,0,0.14)",
  "0 8px 28px rgba(0,0,0,0.15)",
  "0 10px 32px rgba(0,0,0,0.16)",
  "0 8px 28px rgba(0,0,0,0.15)",
  "0 4px 20px rgba(0,0,0,0.14)",
  "0 4px 16px rgba(0,0,0,0.13)",
  "0 2px 10px rgba(0,0,0,0.12)",
  "0 2px 8px rgba(0,0,0,0.10)",
];

export default function AvatarRow() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sizes   = isMobile ? mobileSizes   : desktopSizes;
  const margins = isMobile ? mobileMargins : desktopMargins;
  const border  = isMobile ? 2 : 5;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "20px 0" : "32px 0",
        background: "white",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {members.map((member, i) => (
        <div
          key={member.id}
          style={{
            width: sizes[i],
            height: sizes[i],
            borderRadius: "50%",
            overflow: "hidden",
            border: `${border}px solid white`,
            marginLeft: margins[i],
            zIndex: zIndexes[i],
            boxShadow: shadows[i],
            flexShrink: 0,
            filter: blurs[i] ? "blur(1.5px) brightness(0.88)" : "none",
            transition: "transform 0.25s ease, opacity 0.5s ease",
            opacity: visible ? 1 : 0,
            transitionDelay: `${i * 50}ms`,
          }}
          
        >
          <img
            src={member.src}
            alt={`Member ${member.id}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              backgroundColor: member.color
            }}
            onError={e => {
              e.target.style.display = "none";
              e.target.parentElement.style.background = member.color || "#e5e7eb";
            }}
          />
        </div>
      ))}
    </div>
  );
}