import React from 'react'
import ComparisonTable from '../components/Comparison/ComparisonTable'
import ComparisonHero from '../components/Comparison/ComparisonHero'
import ComparisonReason from '../components/Comparison/ComparisonReason'
export default function ComparisonPage() {
  return (
    <div>
        <ComparisonHero/>
        <ComparisonTable/>
        <ComparisonReason/>
        </div>
  )
}
