import engage from '../../assets/pricing/mockup.png'

const features = [
  "Your Brand & Logo",
  "Android & iOS",
  "Client Dashboard",
  "Coach-Client Chat",
  "Real-time Updates",
];

const trackers = [
  {  label: "Nutrition Tracker" },
  {  label: "Water Intake Tracker" },
  { label: "Weight & Body Measurements" },
  {  label: "Sleep Tracker" },
  {  label: "Group Live Session Support" },
];

export default function AppSection() {
  return (
    <section className="bg-white px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

        {/* Left: Text Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center lg:pr-12">

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6">
            Launch your own<br />branded{" "}
            <span className="text-violet-600">Android<br />& iOS</span> app
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
            Put your logo and brand name front and centre.{" "}
            <span className="text-gray-800 font-semibold">Clients see your brand</span>, not ours.
          </p>

          {/* Pricing */}
          <div className="flex items-end gap-2 mb-8">
            <span className="text-5xl font-extrabold text-gray-900 tracking-tight">₹25,000</span>
            <span className="text-gray-400 text-base mb-2 font-medium">flat setup cost</span>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {features.map((f) => (
              <span
                key={f}
                className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full border border-gray-200"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Trackers */}
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Built-in client trackers
            </p>
            <ul className="space-y-2.5">
              {trackers.map((t) => (
                <li key={t.label} className="flex items-center gap-3">
                 
                  <span className="text-gray-700 text-sm font-medium">{t.label}</span>
                  <span className="ml-auto w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          
        </div>

        {/* Right: Image with circle bg */}
        <div className="w-full lg:w-[55%] relative flex items-center justify-center min-h-[420px] sm:min-h-[520px]">
          
          {/* Mockup image — crops up from bottom like the reference */}
          <img
            src={engage}
            alt="Branded App Preview"
            className="relative z-10 w-full max-w-[520px] object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}