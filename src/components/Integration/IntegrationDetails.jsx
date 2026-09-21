import { useState } from "react";

import whatsapp from "../../assets/integrations/integration-logos/whatsapp.png";
import zoom from "../../assets/integrations/integration-logos/zoom.png";
import teams from "../../assets/integrations/integration-logos/teams.png";
import call from "../../assets/integrations/integration-logos/call.png";
import sheets from "../../assets/integrations/integration-logos/sheets.png";
import gform from "../../assets/integrations/integration-logos/google-forms.png";
import apple from "../../assets/integrations/integration-logos/apple.png";
import gfit from "../../assets/integrations/integration-logos/gfit.png";
import lab from "../../assets/integrations/integration-logos/lab.png";
import web from "../../assets/integrations/integration-logos/web.png";
import zform from "../../assets/integrations/integration-logos/zoho.png";
import razorpay from "../../assets/integrations/integration-logos/download.png";
import zticket from "../../assets/integrations/integration-logos/zticket.png";
import zsurvey from "../../assets/integrations/integration-logos/survey.png";
import rocket from "../../assets/integrations/integration-logos/rocket.jpeg";
import unlimit from "../../assets/integrations/integration-logos/unlimit.jpeg";
import fb from "../../assets/integrations/integration-logos/fb.png";
import stripe from "../../assets/integrations/integration-logos/Stripe.png";

const integrations = [
  { name: "WhatsApp", logo: whatsapp, description: "Automated reminders, two-way messaging, and broadcast campaigns from within the platform."},
  { name: "Zoom", logo: zoom, description: "Schedule and launch sessions without copying meeting links. Everything managed in one place."},
  { name: "Teams", logo: teams, description: "Enterprise-grade coaching communications and team collaboration without switching platforms."},
  { name: "Facebook",iswhite:true, logo: fb, description: "Engage patients and capture leads through Facebook integrations." },
  { name: "Telephony", logo: call, description: "Click-to-call directly from client profiles. Every call logged and linked automatically.", learnMore: null },
  { name: "Google Sheets", logo: sheets, description: "Live access to your SmartCoach360 data in Google Sheets for custom reporting and team collaboration."},
  { name: "Google Forms", logo: gform, description: "Leads and client intake from Google Forms flow straight into SmartCoach360 no copy-pasting.", learnMore: null },
  { name: "Google Fit", logo: gfit, description: "Pull health and fitness data from Google Fit into patient profiles.", learnMore: "#" },
  { name: "Zoho Forms", logo: zform, description: "Your forms, surveys, and assessments connect directly, keeping all client data centralised.", learnMore: null },
  { name: "Zoho Survey",iswhite:true, logo: zsurvey, description: "Run surveys and collect feedback at every stage of the patient journey.", learnMore: "#" },
  { name: "Zoho Ticket",iswhite:true, logo: zticket, description: "Track and resolve support tickets without leaving your platform.", learnMore: null },
  { name: "Apple Health", logo: apple, description: "Import health metrics directly from Apple Health for richer patient insights.", learnMore: "#" },
  { name: "RazorPay",iswhite:true, logo: razorpay, description: "Accept payments and manage billing securely through RazorPay.", learnMore: "#" },
  { name: "Unlimit", logo: unlimit, description: "Enable flexible payment options and global transactions with Unlimit.", learnMore: null },
  { name: "Stripe",iswhite:true, logo: stripe, description: "Power subscriptions and one-time payments with Stripe's payment infrastructure.", learnMore: "#" },
  { name: "RocketChat",iswhite:true, logo: rocket, description: "Communicate with patients and teams through secure RocketChat channels.", learnMore: null },
  { name: "Lab Integrations",iswhite:true, logo: lab, description: "Receive lab results directly and attach them to patient records automatically.", learnMore: "#" },
  { name: "Web Content",iswhite:true, logo: web, description: "Embed and sync web content within your platform for a seamless experience.", learnMore: null },
];

const HEX_PATH =
  "M16.7,24.61 L50.0,7.89 A10,10 0 0,1 60.0,7.89 L93.3,24.61 A10,10 0 0,1 98.3,33.27 L98.3,76.73 A10,10 0 0,1 93.3,85.39 L60.0,102.11 A10,10 0 0,1 50.0,102.11 L16.7,85.39 A10,10 0 0,1 11.7,76.73 L11.7,33.27 A10,10 0 0,1 16.7,24.61 Z";

function HexIcon({ logo, name ,iswhite}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative mx-auto md:w-35 md:h-35 h-25 w-25" >
      <svg
        viewBox="0 0 110 110"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={HEX_PATH}
          stroke="#ffffff"
          strokeWidth="2"
          fill={iswhite ? "#ffffff" : "#111111"}
        />
      </svg>

      {/* Logo centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!imgError ? (
          <img
            src={logo}
            alt={`${name} logo`}
            onError={() => setImgError(true)}
            className="object-contain rounded w-10 h-10 md:w-13 md:h-13"
            
          />
        ) : (
          <span className="text-purple-300 text-xs font-semibold tracking-widest">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}

function IntegrationCard({ name, logo, description, iswhite }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 group px-2">
      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-2">
        <HexIcon logo={logo} name={name} iswhite={iswhite}/>
      </div>

      <p className="text-white font-semibold text-[20px] leading-snug mt-1">
        {name}
      </p>

      <p className="text-white text-[14px]  md:text-[18px] leading-[1.65] flex-1 max-w-[210px]">
        {description}
      </p>

    </div>
  );
}

export default function IntegrationsSection() {
  return (
    <section className="bg-black py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20">

      <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16 md:mb-20">
        <h2 className="text-white font-light tracking-tight text-3xl sm:text-4xl md:text-[2.75rem] leading-tight">
          Our most popular integrations
        </h2>
        <p className="text-[#666666] mt-5 text-sm sm:text-[15px] max-w-xl mx-auto leading-relaxed">
          Connect your healthcare workflow with communication, payments,
          forms, labs, and patient engagement tools — all in one place.
        </p>
      </div>

      <div className="mx-auto grid gap-y-24 gap-x-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 max-w-85 sm:max-w-2xl md:max-w-4xl lg:max-w-7xl">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.name} {...integration} />
        ))}
      </div>
    </section>
  );
}