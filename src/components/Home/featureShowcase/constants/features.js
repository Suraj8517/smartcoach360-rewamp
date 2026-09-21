import {
  LayoutGrid,
  Megaphone,
  BarChart2,
  CreditCard,
  Heart,
  Users2,
  Smartphone,
  Shield,
  Zap,
  Target,
  Flame,
  Activity,
  TrendingUp,
  UserCheck,
  Briefcase,
  Dumbbell,
  Lock,
  Clock
} from "lucide-react";

import exercise from "../../../../assets/crm/exercise-library.png";
import nutrition from "../../../../assets/crm/nutrition.png";
import dashboard from "../../../../assets/crm/dashboard.webp";
import payments from "../../../../assets/crm/payments.png";
import chat from "../../../../assets/crm/chat.png";
import team from "../../../../assets/crm/team.png";
import app from "../../../../assets/crm/app.png"
import security from "../../../../assets/crm/security.png"
import workflow from "../../../../assets/crm/workflow.png"

import programavatar from "../../../../assets/crm/avatar/avatar1.png";
import nutritionavatar from "../../../../assets/crm/avatar/avatar6.png";
import dashboardavatar from "../../../../assets/crm/avatar/avatar5.png";
import payavatar from "../../../../assets/crm/avatar/avatar2.png";
import clientavatar from "../../../../assets/crm/avatar/avatar3.png";
import teamavatar from "../../../../assets/crm/avatar/avatar9.png";
import appavatar from "../../../../assets/crm/avatar/avatar7.png";
import securityavatar from "../../../../assets/crm/avatar/avatar8.png";
import workflowavatar from "../../../../assets/crm/avatar/avatar4.png";


export const FEATURES = [
  {
    id: 0,
    key: "Program Management",
    label: "Program Management",
    Icon: LayoutGrid,
    agentName: "Coach",
    agentImage: programavatar,
    agentStat: "New Program Created",
    AgentStatIcon: Target,
    agentColor: "from-violet-400 to-indigo-500",
    agentEmoji: programavatar,
    screenshotImage: exercise,
    screenshotImageMobile: exercise,
    floatingLabels: ["Auto-schedule tasks", "Sprint velocity +32%"],
  },
  {
    id: 1,
    key: "Nutrition & Activity",
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
    id: 2,
    key: "Dashboards & Reports",
    label: "Dashboards & Reports",
    Icon: BarChart2,
    agentName: "Sales Agent",
    agentImage: dashboardavatar,
    agentStat: "50 new leads this week",
    AgentStatIcon: Activity,
    agentColor: "from-blue-400 to-cyan-400",
    agentEmoji: "📊",
    screenshotImage: dashboard,
    screenshotImageMobile: dashboard,
    floatingLabels: ["Real-time analytics", "Export to PDF/CSV"],
  },
  {
    id: 3,
    key: "payment",
    label: "Payments & Revenue",
    Icon: CreditCard,
    agentName: "SmartCoach360 Payments",
     agentImage: payavatar,
    agentStat: "Payment Received",
    AgentStatIcon: TrendingUp,
    agentColor: "from-purple-400 to-purple-100",
    agentEmoji: "💳",
    screenshotImage: payments,
    screenshotImageMobile: payments,
    floatingLabels: ["Auto-reconcile invoices", "0.1% failure rate"],
  },
  {
    id: 4,
    key: "Client Engagement",
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
    id: 5,
    key: "team_management",
    label: "Team & Organisation Management",
    Icon: Users2,
    agentName: "SmartCoach360",
    agentImage: teamavatar,
    agentStat: "Hot leads ready to convert",
    AgentStatIcon: Briefcase,
    agentColor: "from-blue-400 to-purple-400",
    agentEmoji: "🏢",
    screenshotImage: team,
    screenshotImageMobile: team,
    floatingLabels: ["Role-based permissions", "1-click org restructure"],
  },
  {
    id: 6,
    key: "app",
    label: "Mobile App iOS & Android",
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
    id: 7,
    key: "security",
    label: "Security & Compliance",
    Icon: Shield,
    agentName: "SecureWatch AI",
    agentImage: securityavatar,
    agentStat: "0 breaches · 100% audit ready",
    AgentStatIcon: Lock,
    agentColor: "from-purple-400 to-blue-500",
    agentEmoji: "🔐",
    screenshotImage: security,
    screenshotImageMobile: security,
    floatingLabels: ["GDPR · HIPAA compliant", "Threat scan: all clear"],
  },
  {
    id: 8,
    key: "workflows",
    label: "Business Automation",
    Icon: Zap,
    agentName: "SmartCoach360",
    agentImage:workflowavatar,
    agentStat: "Lead Allocation Automated",
    AgentStatIcon: Clock,
    agentColor: "from-cyan-400 to-blue-500",
    agentEmoji: "⚡",
    screenshotImage: workflow,
    screenshotImageMobile: workflow,
    floatingLabels: ["Zero-code automation", "Trigger → Action → Done"],
  },
];