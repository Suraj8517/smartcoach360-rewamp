import React from 'react'
import AboutUsHero from '../components/Aboutus/AboutUsHero'
import WhereItStarted from '../components/Aboutus/WhereItStarted'
import Values from '../components/Aboutus/Values'
import MilestoneSection from '../components/Aboutus/Milestones'
import Mission from '../components/Aboutus/Mission'
import MarqueeCoaches from '../components/Aboutus/UI/MarqueeText'
export default function Aboutus() {
  return (
    <>
    <AboutUsHero/>
    <WhereItStarted/>
    <Mission/>
    <Values/>
    <MilestoneSection/>
    <MarqueeCoaches/>
    </>
  )
}
