import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* ----------left side---------- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-tight'>Book Appointment <br /> with Trusted Doctors</p>
            <div className='flex flex-col md:flex-row itens-center gap-3 text-white text-sm font-light'>
                <img src={assets.group_profiles} alt="roup_profiles" className='w-28'/>
                <p>Simply browse our extensive list of trusted doctors,<br /> schedule your appointment hassle-free</p>
            </div>
            <a href="#speciality" className='bg-white rounded-full flex items-center gap-2 px-8 py-3 text-grey-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
              Book appointment
              <img src={assets.arrow_icon} alt=""  className='w-3'/>
            </a>
            

        </div>

        {/* --------------right side ------------- */}
        <div className='md:w-1/2 relative'>
            <img src={assets.header_img} alt="header_img" className='absolute w-full bottom-0  h-auto rounded-lg'/>
        </div>

    </div>
  )
}

export default Header