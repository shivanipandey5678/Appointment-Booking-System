import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div >
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='flex flex-col items-center justify-center md:flex-row gap-10 mt-10'>
        <img src={assets.contact_image} alt="contact_image" className='max-w-[30vw]' />
        <div className='flex flex-col gap-4 items-start justify-end'>
          <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
          <p className='text-sm text-gray-500'>54709 Willms Station <br /> Suite 350, Washington, USA</p>
          <p className='text-sm text-gray-500'>Tel: (415) 555‑0132 <br />Email: greatstackdev@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at PRESCRIPTO</p>
          <p className='text-sm text-gray-500'>Learn more about our teams and job openings.</p>
          <button className=' border border-black px-8 py-4 hover:bg-black hover:text-white text-sm'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact