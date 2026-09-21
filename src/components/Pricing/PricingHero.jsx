import React from 'react'
import BookDemoBtn from '../UI/BookDemoBtn'
export default function PricingHero() {
  return (
    <section className=' mt-36 mb-20 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl'>
            <h1 className='font-bold text-4xl md:text-5xl mb-2'>Flexible plans for coaches.<span className='font-light'>Start today.</span></h1>
            <p className='mt-6 md:text-2xl text-xl text-gray-600'>Everything your coaching business needs. One simple plan.</p>
            <div className="mt-7 w-full sm:flex sm:justify-center">
                            <BookDemoBtn text={"white"} />

            </div>
        </div>
    </section>
  )
}
