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
import HeroHeadline from '../components/Home/upgrade/ScreenText'
import { TrustedByNew } from '../components/Home/upgrade/TrustedBy'
import FeatureList from '../components/Home/upgrade/featureList'
import ForWhomNew from '../components/Home/upgrade/forWhom'
import ExpertiseStack from '../components/Home/upgrade/howItWorks'
export default function Home() {
  return (
    <>
    <ScrollHero/>
     <TrustedByNew/>
     <HeroHeadline/>
     <FeatureList/>
     <CoachScrollReveal/>
<ProblemSection/>
<ForWhomNew/>
<ExpertiseStack/>
<SupportSection/>
<CTASection/>
    </>
  )
}
