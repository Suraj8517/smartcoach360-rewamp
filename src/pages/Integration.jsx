import React from 'react'
import IntegrationsLogoSection from '../components/Integration/LogoSection'
import ConnectEverything from '../components/Integration/ConnectEverything'
import IntegrationHero from '../components/Integration/IntegrationHero'
import IntegrationsSection from '../components/Integration/IntegrationDetails'

export default function Integration() {
  return (
    <div className='bg-black'>
      
    <IntegrationHero/>
    <IntegrationsSection/>
    <IntegrationsLogoSection/>
    <ConnectEverything/>
    </div>
  )
}
