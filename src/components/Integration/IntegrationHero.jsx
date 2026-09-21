import React from 'react'
import hero from "../../assets/integrations/hero.png"
import BookDemoBtn from '../UI/BookDemoBtn'
export default function IntegrationHero() {
  return (
    <section className='w-full xl:min-h-screen bg-black pt-44 md:pt-26 xl:pt-16 px-8 md:px-16'>
      <div className='2xl:max-w-7xl max-w-6xl mx-auto'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-24">

          {/* Left — text */}
          <div className="flex flex-col gap-4">
            <h2
              className="text-center md:text-left text-white md:font-thin font-bold leading-[1.2] tracking-[-0.04em] pb-2 md:pb-1"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Seamlessly integrate <br />
              <span>all of your favorite tools.</span>
            </h2>
            <p
              className="text-white leading-loose text-justify md:text-left"
              style={{ fontSize: "clamp(0.875rem, 1.3vw, 1.1rem)" }}
            >
              SmartCoach360 is designed to complement your existing workflow, reducing handoffs, eliminating duplication, and creating a more consistent experience from first enquiry to long-term retention.
            </p>
            <div className="anim-3 mt-8 sm:mt-10 mx-auto md:mx-0">
  <BookDemoBtn weight="light" text="white"/>
</div>
          </div>

          {/* Right — image */}
          <div className="flex gap-3 items-start justify-center md:justify-start">
            <div className="w-full max-w-sm md:max-w-none rounded-2xl overflow-hidden">
              <img
                src={hero}
                alt="Platform demo"
                className="w-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}