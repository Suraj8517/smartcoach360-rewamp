import { useState } from "react";
import {
  KeyRound,
  Users,
  Lock,
  Database,
  CreditCard,
  Globe,
  Upload,
  ClipboardList,
  Zap,
  FileText,
  Headphones,
  ShieldCheck,
} from "lucide-react";

const features = [
  { icon: KeyRound,       name: "SSO (SAML 2.0 / OAuth 2.0)",      tier: "all" },
  { icon: Users,          name: "Role-based Access Control",         tier: "all"        },
  { icon: Lock,           name: "TLS 1.2+ Encryption in Transit",    tier: "all"        },
  { icon: Database,       name: "AES-256 Encryption at Rest",        tier: "all"        },
  { icon: CreditCard,     name: "PCI DSS Payment Processing",        tier: "all"        },
  { icon: Globe,          name: "GDPR Compliance Tools",             tier: "all"        },
  { icon: Upload,         name: "Data Export & Portability",         tier: "all"        },
  { icon: ClipboardList,  name: "Audit Trails & Access Logs",        tier: "pro"        },
  { icon: Zap,            name: "99.9% Uptime SLA",                  tier: "pro"        },
  { icon: FileText,       name: "Data Processing Agreements",        tier: "enterprise" },
  { icon: Headphones,     name: "Priority Security Support",         tier: "enterprise" },
];

const tierConfig = {
  all: {
    label: "All plans",
    badgeClass: "bg-green-100 text-green-800 border border-green-200",
    dotClass: "bg-green-500",
    iconBg: "bg-green-50 border-green-100",
    iconColor: "#16a34a",
  },
  pro: {
    label: "Pro & Enterprise",
    badgeClass: "bg-blue-100 text-blue-800 border border-blue-200",
    dotClass: "bg-blue-500",
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "#2563eb",
  },
  enterprise: {
    label: "Enterprise",
    badgeClass: "bg-violet-100 text-violet-800 border border-violet-200",
    dotClass: "bg-violet-500",
    iconBg: "bg-violet-50 border-violet-100",
    iconColor: "#7c3aed",
  },
};

const filterOptions = [
  { key: "all_tiers", label: "All" },
  { key: "all", label: "All Plans" },
  { key: "pro", label: "Pro & Enterprise" },
  { key: "enterprise", label: "Enterprise" },
];

export default function SecurityTable() {
  const [activeFilter, setActiveFilter] = useState("all_tiers");

  const filtered =
    activeFilter === "all_tiers"
      ? features
      : features.filter((f) => f.tier === activeFilter);

  return (
    <div className="min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={22} className="text-gray-700" aria-hidden="true" />
            <h1 className="text-xl font-semibold text-gray-900">
              Security Summary
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-9">
            Everything at a glance
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setActiveFilter(opt.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${
                activeFilter === opt.key
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Desktop Table */}
          <table className="w-full hidden sm:table">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Security Feature
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((feature, i) => {
                const cfg = tierConfig[feature.tier];
                return (
                  <tr
                    key={feature.name}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors duration-100 ${
                      i === filtered.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg border flex-shrink-0 ${cfg.iconBg}`}
                          aria-hidden="true"
                        >
                          <feature.icon size={16} color={cfg.iconColor} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {feature.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badgeClass}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`}
                          aria-hidden="true"
                        />
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Mobile Card List */}
          <ul className="sm:hidden divide-y divide-gray-50">
            {filtered.map((feature) => {
              const cfg = tierConfig[feature.tier];
              return (
                <li
                  key={feature.name}
                  className="px-4 py-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border flex-shrink-0 mt-0.5 ${cfg.iconBg}`}
                    aria-hidden="true"
                  >
                    <feature.icon size={17} color={cfg.iconColor} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 leading-snug">
                      {feature.name}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full mt-1.5 ${cfg.badgeClass}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`}
                        aria-hidden="true"
                      />
                      {cfg.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">
              No features found.
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 px-1">
          {Object.entries(tierConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${cfg.badgeClass}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`}
                  aria-hidden="true"
                />
                {cfg.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}