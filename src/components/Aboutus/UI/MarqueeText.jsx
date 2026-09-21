import React from "react";


const MarqueeItem = () => (
  <div className="inline-flex items-center whitespace-nowrap px-2">
    <span className="font-medium text-5xl sm:text-7xl lg:text-[15vw] tracking-normal text-purple-600 ">
      #1{" "}
    </span>
    <span className="font-medium text-5xl sm:text-7xl lg:text-[15vw] tracking-normal text-violet-600 ml-4 lg:ml-16">
      platform{" "}
    </span>
    <span className="font-medium text-5xl sm:text-7xl lg:text-[15vw] tracking-normal text-purple-600 ml-4 lg:ml-16">
      for{" "}
    </span>
    <span className="font-medium text-5xl sm:text-7xl lg:text-[15vw] tracking-normal text-purple-600 ml-4 lg:ml-16">
      coaches{" "}
    </span>
   
    <span className="font-medium text-5xl sm:text-7xl lg:text-[15vw] text-purple-900 ml-4 lg:mx-24">
      ✦{" "}
    </span>
  </div>
);

export default function MarqueeCoaches() {
  return (
    <div className="w-full py-14 lg:py-30 bg-white flex items-center justify-content overflow-hidden">
      <style>{`


        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="w-full overflow-hidden relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track marquee-font">
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>
    </div>
  );
}