import React from "react";
import demo from "../../assets/aboutus/img1.avif";
import demo2 from "../../assets/aboutus/img2.avif";
import demo3 from "../../assets/aboutus/img3.avif";

export default function WhereItStarted() {
  return (
    <>
      <section className="w-full px-2 md:px-12 lg:px-20 pb-32">
        {/* ── Hero text ── */}
        <div className="max-w-6xl lg:max-w-6xl relative z-50 w-full mx-auto flex flex-col items-center md:px-8 px-2 md:pt-10 pb-6 md:pb-28 lg:flex-row lg:items-start lg:justify-between ">
          <h2
            className="text-center md:text-left text-black font-normal leading-[0.95] tracking-[-0.04em] pb-4 md:pb-1"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
            }}
          >
            We built the platform <br />
            <span>we wished existed.</span>
          </h2>
          <div className="md:flex hidden flex-col items-center mt-6 lg:items-start lg:mt-0 lg:max-w-[36%] lg:pt-4 xl:pt-14 2xl:pl-16">
<p className="text-black font-normal leading-[1.6] tracking-[.04rem] mb-3 text-[13px] text-center md:text-left lg:text-[14px] xl:text-[1rem]">              Stop juggling apps. Manage clients, programmes, nutrition,
              payments, and messages, all in one place built for coaches who
              want to scale.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 md:pt-20 ">
          {/* ── Row 1: Text left, two stacked images right ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-12 md:mb-24">
            {/* Left — text */}
            <div className="flex flex-col gap-4">
              <p
                className="text-black leading-loose text-justify md:text-left"
                style={{
                  fontSize: "clamp(0.875rem, 1.5vw, 1.2rem)",
                }}
              >
                Most business tools weren’t built for fitness coaching. Coaches
                were juggling spreadsheets, messaging apps, payments, and
                programming tools spending more time on admin than coaching
                clients.
              </p>
            </div>

            {/* Right — two images side by side */}
            <div className="hidden md:flex gap-3 items-start">
              <div className="w-1/2 rounded-2xl overflow-hidden">
                <img
                  src={demo2}
                  alt="Platform demo"
                  className="w-full h-[320px] object-cover"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
              <div className="w-3/4 rounded-2xl overflow-hidden">
                <img
                  src={demo}
                  alt="Platform demo 2"
                  className="w-full h-[320px] object-cover"
                  style={{ aspectRatio: "3/4" }}
                />
              </div>
            </div>
          </div>

          {/* ── Row 2: Large image left, text right ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-2 md:pt-16">
            {/* Left — large image */}
            <div className="rounded-2xl overflow-hidden">
              <img
                src={demo3}
                alt="Team collaborating"
                className="w-full h-[320px] object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </div>

            {/* Right — text */}
            <div className="flex flex-col gap-6">
              <p
                className="text-black leading-loose text-justify md:text-left"
                style={{
                  fontSize: "clamp(0.875rem, 1.5vw, 1.2rem)",
                }}
              >
              We spoke with hundreds of coaches and gym owners and heard the same thing every time: too many tools, too much admin, and not enough time to coach clients.
              </p>
              <p
                className="text-black leading-loose text-justify md:text-left"
                style={{
                  fontSize: "clamp(0.875rem, 1.5vw, 1.2rem)",
                }}
              >
                That’s why we built <strong>SmartCoach360</strong>, an all-in-one platform for coaching businesses. Manage clients, communication, payments, scheduling, and programs in one seamless system built to help coaches grow and scale efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
