import React from 'react'
import PricingTable from '../components/Pricing/PricingTable'
import PricingHero from '../components/Pricing/PricingHero'
import StackingSections from '../components/Pricing/MobileAppDetails'
import PricingDetailsSwiper from '../components/Pricing/PricingFeatureDetails'
import AddonFeature from '../components/Pricing/AddonFeature'
import CTASection from '../components/Home/CTASection'
export default function PricingPage() {
  return (
    <section>
        <PricingHero/>
        <PricingTable/>
        <PricingDetailsSwiper/>
        <StackingSections/>
        <AddonFeature/>
        <CTASection/>
    </section>
  )
}
