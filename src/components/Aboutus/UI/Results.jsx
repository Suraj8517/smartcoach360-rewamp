import React, { useEffect, useState, useRef } from "react";

const result = [
  { data: "Coaches worldwide", num: 10, suffix: "k+" },
  { data: "Clients managed", num: 500, suffix: "k+" },
  { data: "Platform features", num: 40, suffix: "+" },
  { data: "Integrations", num: 15, suffix: "+" },
];

function Counter({ target, suffix, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    let start = 0;
    const duration = 1800;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, animate]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Results() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-4 py-10">
      <div className=" max-w-6xl mx-auto rounded-[24px] bg-gradient-to-r from-purple-900 to-purple-500 px-5 sm:px-8 md:px-10 py-8 md:py-12">

        {/* Heading */}
        <h2 className="font-poppins text-white font-bold text-center leading-tight mb-8 md:mb-12"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
          SmartCoach360 by the numbers
        </h2>

        {/* Stats grid — 2 cols on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 ">
          {result.map((res, index) => (
            <div
              key={index}
              className={[
                "flex flex-col items-center text-center py-4 px-3 sm:px-6",
                // right border for non-last items on md+
                index !== result.length - 1 ? "md:border-r md:border-white/20" : "",
                // bottom border for top-row items on mobile (index 0 and 1)
                index < 2 ? "border-b border-white/20 md:border-b-0" : "",
                // right border for left-column items on mobile (index 0 and 2)
                index % 2 === 0 ? "border-r border-white/20 md:border-r-0" : "",
                // reset right border for last md item
                index === result.length - 1 ? "md:border-r-0" : "",
              ].join(" ")}
            >
              <h3
                className="text-white font-bold mb-1 sm:mb-2 tabular-nums"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
              >
                <Counter target={res.num} suffix={res.suffix} animate={animate} />
              </h3>
              <p className="text-white/80 font-light leading-snug"
                style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)', maxWidth: '140px' }}>
                {res.data}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}