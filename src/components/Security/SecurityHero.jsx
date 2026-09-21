import React from 'react'
import securityHero from '../../assets/security/security.png'

export default function SecurityHero() {
  return (
    <section
      style={{ backgroundImage: `url(${securityHero})` }}
      className="w-full min-h-[60vh] xl:min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 md:py-16  pt-24"
    >
      <div className="text-center max-w-2xl">
        <p className="text-sm font-semibold text-gray-400 mb-4 tracking-wide">
          Security
        </p>
        <h1 className="text-4xl sm:text-5xl xl:text-5xl font-normal text-gray-900 leading-tight tracking-tight mb-6">
          Your Business Data is<br />Safe With SmartCoach360
        </h1>
        <p className="text-base sm:text-large text-gray-500 font-light leading-relaxed max-w-md mx-auto mb-10">
          Running a coaching business means handling sensitive data every day—client health information, payment details, and private communications. SmartCoach360 is built on enterprise-grade security so you and your clients can operate with confidence.
        </p>
      
      </div>
    </section>
  )
}