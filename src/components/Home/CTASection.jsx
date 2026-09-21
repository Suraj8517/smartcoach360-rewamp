import img from "../../assets/ctasection/cta.png"
const url = import.meta.env.VITE_CALENDLY_LINK;
export default function CTASection() {
  return (
    <section className="xl:min-h-[70vhD] flex flex-col items-center justify-center text-center bg-white px-6 md:py-20 py-14">
      <p className="text-sm text-gray-400 tracking-widest uppercase mb-4">
       Get Started Today
      </p>

      <h1 className="text-[38px] md:text-[56px] 2xl:text-[86px] font-medium leading-none tracking-tight text-gray-950 mb-6">
       Ready to Transform<br/>
Your Coaching Business?
      </h1>

      <p className="text-[24px] md:text-[38px] text-gray-800 leading-tight max-w-3xl mb-10  tracking-tight">
        Helping coaches {" "}
        <span className="inline-flex items-center align-middle mx-1 ">
          <img
            className="h-[1em] w-auto object-contain"
            src={img}
            alt=""
          />
        </span>
        {" "}streamline client management and grow their business.
      </p>

      <button onClick={() => window.open(url, "_blank")} className="inline-flex items-center gap-2 bg-black text-white text-[15px] font-medium px-7 py-3.5 rounded-full hover:bg-purple-950 transition-colors group">
        Book a Demo<span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        </span>
      </button>
    </section>
  );
}