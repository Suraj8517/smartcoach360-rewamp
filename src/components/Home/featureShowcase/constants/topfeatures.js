import {
  Megaphone,
  BarChart2,
  Heart,
  Users2,
  Smartphone,
  Zap,
  Target,
  Flame,
  Activity,
  TrendingUp,
  UserCheck,
  Briefcase,
  Dumbbell,
  Clock,
  Settings2,
  Video,
  UserCircle2,
  HardHat,
} from "lucide-react";

import nutrition from "../../../../assets/crm/nutrition.png";
import chat from "../../../../assets/crm/chat.png";
import Clientprofile from "../../../../assets/crm/client profile.png";
import Coachprofile from "../../../../assets/crm/coaches profile.png";

import live from "../../../../assets/crm/live.png";
import team from "../../../../assets/crm/lib.png";
import app from "../../../../assets/crm/app.png";
import workflow from "../../../../assets/crm/workflow.png";
import config from "../../../../assets/crm/config.png";
import nutritionavatar from "../../../../assets/crm/avatar/avatar6.png";
import dashboardavatar from "../../../../assets/crm/avatar/avatar5.png";
import payavatar from "../../../../assets/crm/avatar/avatar2.png";
import clientavatar from "../../../../assets/crm/avatar/avatar3.png";
import teamavatar from "../../../../assets/crm/avatar/avatar9.png";
import appavatar from "../../../../assets/crm/avatar/avatar7.png";
import workflowavatar from "../../../../assets/crm/avatar/avatar4.png";

// ── Add avatars for new items ─────────────────────────────────────────────────
// import configavatar   from "../../../../assets/crm/avatar/avatar_config.png";
// import sessionavatar  from "../../../../assets/crm/avatar/avatar_session.png";
// import clientpavatar  from "../../../../assets/crm/avatar/avatar_clientp.png";
// import coachpavatar   from "../../../../assets/crm/avatar/avatar_coachp.png";

export const NAV_FEATURES = [
  {
    id: 0,
    key: "nutrition_activity",
    label: "Nutrition & Activity",
    Icon: Megaphone,
    agentName: "Dietician",
    agentImage: nutritionavatar,
    agentStat: "1,240 meal plans generated",
    AgentStatIcon: Flame,
    agentColor: "from-purple-400 to-violet-400",
    agentEmoji: "🥗",
    screenshotImage: nutrition,
    screenshotImageMobile: nutrition,
    floatingLabels: ["Daily macro tracker", "86% goal completion"],
  },
  {
    id: 1,
    key: "client_engagement",
    label: "Client Engagement",
    Icon: Heart,
    agentName: "SmartCoach360",
    agentImage: clientavatar,
    agentStat: "2,340 active clients managed",
    AgentStatIcon: UserCheck,
    agentColor: "from-purple-400 to-blue-500",
    agentEmoji: "🤝",
    screenshotImage: chat,
    screenshotImageMobile: chat,
    floatingLabels: ["Smart follow-up nudges", "NPS score: 94"],
  },
  {
  id: 2,
  key: "exercise_library",
  label: "Exercise Library",
  Icon: Dumbbell,
  agentName: "SmartCoach360",
  agentImage: teamavatar,
  agentStat: "500+ exercises ready to use",
  AgentStatIcon: Dumbbell,
  agentColor: "from-blue-400 to-purple-400",
  agentEmoji: "💪",
  screenshotImage: team,
  screenshotImageMobile: team,
  floatingLabels: [
    "Video exercise demos",
    "Custom exercise creation"
  ],
},
  {
    id: 3,
    key: "mobile_app",
    label: "Mobile App",
    Icon: Smartphone,
    agentName: "SmartCoach360 App",
    agentImage: appavatar,
    agentStat: "Weekly goal 82% complete",
    AgentStatIcon: Dumbbell,
    agentColor: "from-indigo-400 to-purple-500",
    agentEmoji: "📱",
    screenshotImage: app,
    screenshotImageMobile: app,
    floatingLabels: ["Push notifications live", "Offline mode enabled"],
  },
  {
    id: 4,
    key: "business_automation",
    label: "Workflow",
    Icon: Zap,
    agentName: "SmartCoach360",
    agentImage: workflowavatar,
    agentStat: "Lead Allocation Automated",
    AgentStatIcon: Clock,
    agentColor: "from-cyan-400 to-blue-500",
    agentEmoji: "⚡",
    screenshotImage: workflow,
    screenshotImageMobile: workflow,
    floatingLabels: ["Zero-code automation", "Trigger → Action → Done"],
  },

  // ── New items ───────────────────────────────────────────────────────────────
  {
    id: 5,
    key: "configuration",
    label: "Configuration",
    Icon: Settings2,
    agentName: "SmartCoach360",
    agentImage: workflowavatar,       
    agentStat: "Platform fully configured",
    AgentStatIcon: Target,
    agentColor: "from-slate-400 to-blue-500",
    agentEmoji: "⚙️",
    screenshotImage: config,         
    screenshotImageMobile: config,
    floatingLabels: ["Branded white-label", "Custom workflows & rules"],
  },
  {
    id: 6,
    key: "live_sessions",
    label: "Live Sessions",
    Icon: Video,
    agentName: "SmartCoach360 Live",
    agentImage: clientavatar,          
    agentStat: "12 sessions live now",
    AgentStatIcon: Activity,
    agentColor: "from-rose-400 to-orange-400",
    agentEmoji: "🎥",
    screenshotImage: live,             
    screenshotImageMobile: live,
    floatingLabels: ["HD video & screen share", "Session recordings saved"],
  },
  {
    id: 7,
    key: "client_profile",
    label: "Client Profile",
    Icon: UserCircle2,
    agentName: "SmartCoach360",
    agentImage: clientavatar,          
    agentStat: "360° client view",
    AgentStatIcon: UserCheck,
    agentColor: "from-teal-400 to-cyan-500",
    agentEmoji: "👤",
    screenshotImage: Clientprofile,            
    screenshotImageMobile: Clientprofile,
    floatingLabels: ["Full history & notes", "Goal & progress timeline"],
  },
  {
    id: 8,
    key: "coach_profile",
    label: "Coaches Profile",
    Icon: Users2,
    agentName: "SmartCoach360",
    agentImage: teamavatar,            // ← swap to coachpavatar once asset ready
    agentStat: "Coach performance live",
    AgentStatIcon: TrendingUp,
    agentColor: "from-amber-400 to-orange-500",
    agentEmoji: "🧑‍💼",
    screenshotImage: Coachprofile,             // ← swap to coachprofile asset
    screenshotImageMobile: Coachprofile,
    floatingLabels: ["Certifications & bio", "Client load & ratings"],
  },
];