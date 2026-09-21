import React from 'react'
import ContactUsForm from '../components/Contactus/ContactUsForm'
import avatar1 from '../assets/crm/avatar/avatar3.png'
import vmax from "../assets/crm/logos/vmax.png";
import fmc from "../assets/crm/logos/fitmomclub.jpg";
import LK from "../assets/crm/logos/lk.jpg";
import mindfully from "../assets/crm/logos/yours-mindfully.png";
import fkc from "../assets/crm/logos/fitkid.png";
import fdc from "../assets/crm/logos/fitdad.png";
import miracle from "../assets/crm/logos/miracle.png";


const logos = [
  { alt: "VMax Healthtech", className: "h-15", src: vmax },
  { alt: "FitMom Club", className: "h-12", src: fmc },
  { alt: "LK", className: "h-[70px]", src: LK },
  { alt: "FitDad Club", className: "h-13", src: fdc },
  { alt: "Yours Mindfully", className: "h-15", src: mindfully },
  { alt: "FitKid Club", className: "h-15", src: fkc },
];
export default function ContactUsPage() {
  return (
    <section className='md:pt-36 pt-24 px-4 sm:px-6 lg:px-8'>
    <div className='grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-3 mb-12 max-w-7xl mx-auto'>
      <div className=' flex flex-col justify-start md:mr-10'>
        <h1 className='md:text-5xl text-4xl font-medium md:mb-6 mb-6 md:leading-12 leading-8 text-center md:text-left'>Talk with our team to see how SC360 can fit your needs</h1>
        <p className='text-gray-600 md:mb-6 mb-8 text-center md:text-left'>Have questions or want to learn more about SmartCoach360? We're here to help! Fill out the form below and our team will get back to you as soon as possible.</p>
        <div className=' flex-col bg-gray-100 w-full h-50 rounded-2xl flex justify-center p-6 md:p-10 mb-8 mt-8'>
          <p className='text-thin text-gray-500'>“SmartCoach360 helped us streamline client management, save hours of manual follow-ups, and grow revenue with less operational effort.”
</p>
<div className='mt-4 flex gap-3'>
  <img src={avatar1} alt="testimonial" className='w-10 h-10 rounded-full object-cover bg-white'/>
  <div>
    <p className='text-sm text-black font-semibold'>John</p>
    <p className='text-sm text-gray-500'>Fitness Coach | FitMom Club</p>
  </div>
</div>
        </div>
        <div className='mx-auto hidden md:flex items-center justify-center gap-6'>
          {
            logos.map(({ alt, className, src }, i) => (
              <img key={`${alt}-${i}`} src={src} alt={alt} className={`${className} object-contain opacity-[0.98] inline-block mx-2 my-2`} />
            ))
          }
        </div>
      </div>
       <ContactUsForm/>
      </div>
    </section>
  )
}
