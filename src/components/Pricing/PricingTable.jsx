import { useState } from "react";
import { Link } from "react-router-dom";
import CheckIcon from "../UI/CheckIcon";

const featureItems = [
  "Manage leads & prospects",
  "Track client progress",
  "Create nutrition plans",
  "Build workout programs",
  "Accept payments online",
  "Engage via chats & reminders",
  "View reports & insights",
  "Control access & security",
];

const YEARLY_DISCOUNT = 0.2;

const plans = [
  { name: "Starter", monthlyPrice: 4999, seatsNote: "Upto 25 clients", ctaLabel: "Get Started", ctaFilled: true, popular: false },
  { name: "Starter Plus", monthlyPrice: 8999, seatsNote: "Upto 50 clients", ctaLabel: "Get Started", ctaFilled: true, popular: false },
  { name: "Growth", monthlyPrice: 15999, seatsNote: "Upto 100 clients", ctaLabel: "Get Started", ctaFilled: true, popular: false },
  { name: "Growth Plus", monthlyPrice: 25999, seatsNote: "Upto 200 clients", ctaLabel: "Get Started", ctaFilled: true, popular: true },
  { name: "Pro", monthlyPrice: 49000, seatsNote: "Upto 500 Clients", ctaLabel: "Get Started", ctaFilled: true, popular: false },
];

function formatPrice(price) {
  return Math.round(price).toLocaleString("en-IN");
}

function BillingToggle({ isYearly, onChange }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-gray-900" : "text-gray-400"}`}>
        Monthly
      </span>
      <button
        onClick={() => onChange(!isYearly)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
          isYearly ? "bg-violet-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
            isYearly ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${isYearly ? "text-gray-900" : "text-gray-400"}`}>
        Yearly
      </span>
      <span
        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 transition-opacity duration-300 ${
          isYearly ? "opacity-100" : "opacity-40"
        }`}
      >
        Save 20%
      </span>
    </div>
  );
}

function PlanCard({ plan, isYearly }) {
  const price = isYearly
    ? plan.monthlyPrice * 12 * (1 - YEARLY_DISCOUNT)
    : plan.monthlyPrice;

  const originalYearlyPrice = plan.monthlyPrice * 12;

  return (
    <div
      className={`relative flex flex-col bg-white rounded-xl border overflow-hidden h-full ${
        plan.popular ? "border-[#1a1a2e]" : "border-gray-200"
      }`}
    >
      <div className="p-5 flex flex-col gap-3">
        <div className="flex">
          <h2 className="text-xl font-bold text-gray-900 pb-2">{plan.name}</h2>
          {plan.popular && (
            <div className="ml-8 text-purple-500 text-xs font-semibold text-end tracking-widest animate-pulse">
              Most Popular
            </div>
          )}
        </div>

        <div className="flex items-start gap-1">
          <span className="text-3xl font-thin text-gray-900 leading-none mt-1">₹</span>
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">
              {formatPrice(price)}
            </span>
            {isYearly && (
              <span className="text-xs text-gray-400 line-through leading-tight mt-0.5">
                ₹{formatPrice(originalYearlyPrice)}
              </span>
            )}
          </div>
          <div className="flex flex-col ml-1 mt-3">
            <span className="text-sm text-gray-500 leading-tight">
              /{isYearly ? "year" : "month"}
            </span>
          </div>
        </div>

        {isYearly && (
          <p className="text-[11px] text-green-600 font-medium -mt-1">
            ₹{formatPrice(plan.monthlyPrice * (1 - YEARLY_DISCOUNT))}/mo — billed yearly
          </p>
        )}

        {plan.seatsNote && (
          <p className="font-bold text-sm text-gray-900 mt-2">{plan.seatsNote}</p>
        )}

        <Link
          to="/contact-us"
          className={`mt-2 block text-center w-full rounded-full py-2.5 text-sm font-semibold transition-all ${
            plan.ctaFilled
              ? "bg-gradient-to-r from-purple-600 via-violet-600 to-violet-600 text-white shadow-lg shadow-purple-200 hover:-translate-y-px hover:shadow-purple-300"
              : "border border-purple-600 bg-white text-purple-600 hover:bg-purple-50"
          }`}
        >
          {plan.ctaLabel}
        </Link>
      </div>

      <div className="border-t border-gray-200 mx-5" />

      <div className="p-5 flex flex-col gap-2">
        <p className="text-sm font-bold text-gray-900 mb-1">Features includes:</p>
        <ul className="flex flex-col gap-6">
          {featureItems.map((item) => (
            <li key={item} className="flex items-center justify-between text-sm text-gray-700">
              <span>{item}</span>
              <CheckIcon />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HorizontalCard({ title, badge, seatsNote, ctaLabel, ctaFilled = false, plan, isYearly }) {
  const price = plan
    ? isYearly
      ? plan.monthlyPrice * 12 * (1 - YEARLY_DISCOUNT)
      : plan.monthlyPrice
    : null;

  const originalYearlyPrice = plan ? plan.monthlyPrice * 12 : null;

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#141428] via-[#1c1c3a] to-[#25254d] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#7c7cff] shadow-[0_0_12px_rgba(124,124,255,0.8)]" />
          <span className="text-sm font-semibold tracking-wide text-white">{title}</span>
        </div>
        {badge && (
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="relative flex w-full shrink-0 flex-col justify-between border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white p-7 lg:w-[320px] lg:border-b-0 lg:border-r">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>

            {price !== null ? (
              <div className="mt-5">
                <div className="flex items-start gap-1">
                  <span className="text-2xl font-thin text-gray-900 leading-none mt-1">₹</span>
                  <div className="flex flex-col">
                    <span className="text-4xl font-extrabold text-gray-900 leading-none">
                      {formatPrice(price)}
                    </span>
                    {isYearly && (
                      <span className="text-xs text-gray-400 line-through leading-tight mt-0.5">
                        ₹{formatPrice(originalYearlyPrice)}
                      </span>
                    )}
                  </div>
                  <span className="ml-1 mt-3 text-sm text-gray-500 leading-tight">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                {isYearly && (
                  <p className="text-[11px] text-green-600 font-medium mt-1">
                    ₹{formatPrice(plan.monthlyPrice * (1 - YEARLY_DISCOUNT))}/mo — billed yearly
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-5">
                <span className="bg-gradient-to-r from-[#5b5bd6] to-[#7c7cff] bg-clip-text text-4xl font-extrabold text-transparent">
                  Custom
                </span>
                <p className="mt-1 text-sm text-gray-500">Tailored pricing for your business</p>
              </div>
            )}

            {seatsNote && (
              <div className="mt-5 inline-flex rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">
                {seatsNote}
              </div>
            )}
          </div>

          <Link
            to="/contact-us"
            className={`mt-8 block text-center w-full rounded-2xl py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
              ctaFilled
                ? "bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white shadow-lg shadow-purple-200 hover:-translate-y-px hover:shadow-purple-300"
                : "border border-purple-600 bg-white text-purple-600 hover:bg-purple-50"
            }`}
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="flex-1 p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Everything Included</h3>
              <p className="mt-1 text-sm text-gray-500">Premium features designed for scaling teams</p>
            </div>
            <div className="hidden rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 sm:flex">
              Full Access
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {featureItems.map((item) => (
              <li
                key={item}
                className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50/40 hover:shadow-sm"
              >
                <span className="text-sm font-medium text-gray-700">{item}</span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                  <CheckIcon />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const gridPlans = plans.filter((p) => p.name !== "Pro");
const ProPlan = plans.find((p) => p.name === "Pro");

export default function PricingTable() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-white min-h-screen px-4 pb-16">
      <div className="2xl:max-w-[1600px] max-w-[1200px] mx-auto">

        <BillingToggle isYearly={isYearly} onChange={setIsYearly} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {gridPlans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} isYearly={isYearly} />
          ))}
          <div className="lg:hidden 2xl:block">
            <PlanCard plan={ProPlan} isYearly={isYearly} />
          </div>
        </div>

        {/* Pro as horizontal card — lg and xl only */}
        <div className="hidden lg:block 2xl:hidden">
          <HorizontalCard
            title="Pro"
            seatsNote={ProPlan.seatsNote}
            ctaLabel={ProPlan.ctaLabel}
            ctaFilled={ProPlan.ctaFilled}
            plan={ProPlan}
            isYearly={isYearly}
          />
        </div>

        <HorizontalCard
          title="Enterprise"
          badge="Special Pricing"
          seatsNote="More than 500 clients"
          ctaLabel="Get a quote"
          ctaFilled={false}
        />

      </div>
    </div>
  );
}