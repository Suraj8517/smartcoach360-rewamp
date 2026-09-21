import React from 'react'
import SecurityHero from '../components/Security/SecurityHero'
import SecurityContent from '../components/Security/SecurityContent'
import SecurityFeatures from '../components/Security/SecurityFeatures'
import SecurityTable from '../components/Security/SecurityTable'
export default function Security() {
  return (
    <div>
      <SecurityHero />
      <SecurityFeatures/>
      <SecurityContent/>
      <SecurityTable/>
    </div>
  )
}
