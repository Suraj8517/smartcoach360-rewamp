import img1 from "../../assets/security/img1.avif";
import img2 from "../../assets/security/img2.avif";
import img3 from "../../assets/security/img5.avif";
import img4 from "../../assets/security/img6.avif";



const cards = [
  {
    id: "sso",
    badge: "Enterprise",
    badgeBg: "#1e1e2e",
    title: "Single Sign-On (SSO)",
    imageBg: "#b8c4f0",
    image: img1,
    imageAlt: "Single Sign-On security",
    desc: "For organisations and larger teams, SmartCoach360 supports Single Sign-On, allowing your team to access the platform securely through your identity provider.",
    features: [
      { title: "SAML 2.0 and OAuth 2.0 support" },
      { title: "Compatible with all major identity providers" },
      { title: "Centralised access management for your whole team" },
      { title: "Instant deprovisioning when team members leave" },
    ],
    learnMore: "#",
  },
  {
    id: "rbac",
    badge: "All Plans",
    badgeBg: "#6b7280",
    title: "Role-based Access Control",
    imageBg: "#d8cffa",
    image: img2,
    imageAlt: "Role-based access control",
    desc: "Not everyone needs access to everything. SmartCoach360 lets you define what each role can see and do—from head coach to receptionist.",
    features: [
      { title: "Custom roles for coaches, managers, admins, and support staff" },
      { title: "Granular permissions per feature and module" },
      { title: "Full audit trail of user actions and data access" },
      { title: "Instant access revocation when team members move on" },
    ],
    learnMore: "#",
  },
  {
    id: "encryption",
    badge: "All Plans",
    badgeBg: "#6b7280",
    title: "Data Encryption",
    imageBg: "#b8e8d4",
    image: img3,
    imageAlt: "Data encryption",
    desc: "All data moving through SmartCoach360—and all data stored on our servers—is encrypted using industry-standard protocols.",
    features: [
      { title: "TLS 1.2+ encryption for all data in transit" },
      { title: "AES-256 encryption for all data at rest" },
      { title: "Encrypted backup storage" },
      { title: "Secure API communications across all integrations" },
    ],
    learnMore: "#",
  },
  {
    id: "payments",
    badge: "All Plans",
    badgeBg: "#6b7280",
    title: "Secure Payment Processing",
    imageBg: "#fde8c8",
    image: img4,
    imageAlt: "Secure payment processing",
    desc: "Every payment transaction uses PCI DSS compliant payment gateways. We never store full card details on our servers.",
    features: [
      { title: "PCI DSS compliant payment processing on all plans" },
      { title: "No full card details stored on our infrastructure" },
      { title: "Encrypted transaction records" },
      { title: "Fraud detection and prevention built in" },
    ],
    learnMore: "#",
  },
];

export default function SecurityFeatures() {
  return (
    <section className="w-full  py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#f0f1f5] rounded-3xl overflow-hidden flex flex-col h-[700px] md:h-[750px]"
            >
              {/* Badge + Title */}
              <div className="px-8 pt-8 pb-4 flex flex-col gap-3">
                <span
                  className="inline-block self-start text-xs font-semibold text-white px-3 py-1 rounded-full"
                  style={{ backgroundColor: card.badgeBg }}
                >
                  {card.badge}
                </span>
                <h2 className="text-[1.55rem] font-normal text-gray-900 leading-snug tracking-tight">
                  {card.title}
                </h2>
              </div>

              {/* Image area */}
              <div
                className="mx-5 rounded-2xl overflow-hidden"
                style={{ backgroundColor: card.imageBg, height: "320px" }}
              >
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="px-8 pt-5 pb-1">
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>

              {/* Bullet features */}
              <div className="px-8 pt-4 pb-2 flex flex-col gap-2 flex-1">
                {card.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-[5px] flex-shrink-0 text-gray-400 text-xs">•</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{f.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}