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
import vid1 from "../assets/textSection/vid1.mp4";
import vid2 from "../assets/textSection/vid2.mp4";

import CtaSectionNew from '../components/Home/upgrade/ctaSection'
import CoachesHero from '../components/Home/upgrade/ScreenText'
import TitleEffect from '../components/Home/upgrade/titleEffect'

export default function Home() {
  return (
    <>
    <ScrollHero/>
     <TrustedByNew/>
     <CoachesHero videoA={vid1} videoB={vid2}/>
     <FeatureList/>
     <CoachScrollReveal/>
<ProblemSection/>
<ForWhomNew/>
<ExpertiseStack/>
<SupportSection/>
<CtaSectionNew/>
    </>
  )
}
