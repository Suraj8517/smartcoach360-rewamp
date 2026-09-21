import React from 'react'
import SuccessStoriesScroll from '../components/SuccessStories/SuccessStoriesSrcoll'
import SuccessStoriesHero from '../components/SuccessStories/SuccessStoriesHero'

export default function SuccessStories() {
  return (
    <section>
      <SuccessStoriesHero/>
        <SuccessStoriesScroll/>
        </section>
  )
}
