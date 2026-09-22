import React from 'react'
import Hero from '../components/Home/Hero'
import FeatureShowcase from '../components/Home/FeatureShowcase'
import { TrustedBy } from '../components/Home/ClientSection'
import CoachScrollReveal from '../components/Home/CoachScrollReveal'
import ProblemSection from '../components/Home/ProblemSection'
import ForWhomCarousel from '../components/Home/ForWhom'
import HowItWorksSection from '../components/Home/HowItWorks'
import CTASection from '../components/Home/CTASection'
import SupportSection from '../components/Home/SupportSection'
import ScrollHero from '../components/Home/upgrade/Hero'
import HeroSecondSection from '../components/Home/upgrade/HeroSecondSection'
export default function Home() {
  return (
    <>
    <ScrollHero/>
     <TrustedBy/>
     <CoachScrollReveal/>
<ProblemSection/>
<ForWhomCarousel/>
<HowItWorksSection/>
<SupportSection/>
<CTASection/>
    </>
  )
}
