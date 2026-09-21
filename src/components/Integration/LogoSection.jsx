import whatsapp from "../../assets/integrations/integration-logos/whatsapp.png"
import zoom from "../../assets/integrations/integration-logos/zoom.png"
import teams from "../../assets/integrations/integration-logos/teams.png"
import call from "../../assets/integrations/integration-logos/call.png"
import sheets from "../../assets/integrations/integration-logos/sheets.png"
import gform from "../../assets/integrations/integration-logos/google-forms.png"
import apple from "../../assets/integrations/integration-logos/apple.png"
import gfit from "../../assets/integrations/integration-logos/gfit.png"
import lab from "../../assets/integrations/integration-logos/lab.png"
import web from "../../assets/integrations/integration-logos/web.png"
import zform from "../../assets/integrations/integration-logos/zoho.png"
import razorpay from "../../assets/integrations/integration-logos/download.png"
import zticket from "../../assets/integrations/integration-logos/zticket.png"
import zsurvey from "../../assets/integrations/integration-logos/survey.png"
import rocket from "../../assets/integrations/integration-logos/rocket.jpeg"
import unlimit from "../../assets/integrations/integration-logos/unlimit.jpeg"
import fb from "../../assets/integrations/integration-logos/fb.png"
import stripe from "../../assets/integrations/integration-logos/Stripe.png"

const integrations = [
  { name: "WhatsApp", logo: whatsapp },
  { name: "Zoom", logo: zoom },
  { name: "Teams", logo: teams },
  { name: "Facebook", logo: fb },
  { name: "Telephony", logo: call },
  { name: "Google Sheets", logo: sheets },
  { name: "Google Forms", logo: gform },
  { name: "Google Fit", logo: gfit },
  { name: "Zoho Forms", logo: zform },
  { name: "Zoho Survey", logo: zsurvey },
  { name: "Zoho Ticket", logo: zticket },
  { name: "Apple Health", logo: apple },
  { name: "RazorPay", logo: razorpay },
  { name: "Unlimit", logo: unlimit },
  { name: "Stripe", logo: stripe },
  { name: "RocketChat", logo: rocket },
  { name: "Lab Integrations", logo: lab },
  { name: "Web Content", logo: web },
];

const COLS_BY_BP = { mobile: 2, sm: 3, lg: 4 };

function IntegrationCell({ name, logo }) {
  return (
    <div className="flex items-center justify-center gap-3 px-4 py-5 sm:px-5 sm:py-6 bg-white md:my-6 border-r border-gray-200 min-w-0 transition-colors duration-150 cursor-default">
      
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-7 h-7 sm:w-8 sm:h-8 object-contain flex-shrink-0"
      />
      <span className="text-xs md:text-[16px] font-normal text-gray-800 truncate">
        {name}
      </span>
    </div>
  );
}

export default function IntegrationsLogoSection() {
  return (
    <section className="bg-white">
    <div className="2xl:max-w-7xl max-w-6xl py-16 px-4 sm:px-6 text-center pt-24 sm:pt-32 mx-auto ">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug mb-3">
        Connects to your stack. Acts where
        <br className="hidden sm:block" /> your work happens.
      </h2>
      <p className="text-sm sm:text-base text-gray-500 mb-10">
        Sync work across your tech stack so everything stays aligned in one place.
      </p>

     
      <div className=" border-gray-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
        {integrations.map((item) => (
            <div className="border-b border-gray-200">
                          <IntegrationCell key={item.name} name={item.name} logo={item.logo} />

                </div>
        ))}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex items-center justify-center gap-3 px-4 py-5 sm:px-6 sm:py-6  bg-white border-r border-b border-gray-200">
          <span className="text-3xl sm:text-4xl font-medium text-gray-900 leading-none">
            15+
          </span>
          <span className="text-xs sm:text-sm text-gray-500 text-left leading-snug">
            Integrations &amp; native connectors
          </span>
        </div>
      </div>
    </div>
    </section>
  );
}