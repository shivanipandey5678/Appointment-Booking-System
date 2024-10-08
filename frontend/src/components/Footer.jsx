import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div  className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ---------left section--------- */}
            <div>
                 <img src={assets.logo} alt="logo" className='w-40 mb-5'/>
                  <p className='w-full md:w-2/3 text-gray-600 leading-6'> © 2025 Prescripto. Your trusted healthcare companion for easy and secure doctor appointments. We connect patients with top medical professionals to ensure better, faster, and more reliable healthcare access.</p>
            </div>
            {/* ----------center section--------- */}
            <div >
                 <p className='text-xl font-medium mb-5'>COMPANY</p>
                 <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                 </ul>
            </div>
            {/* -----------right section-------- */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>shivanipandey0107@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            {/* ------------copyright text--------------- */}
            <hr />
            <p className='text-center text-sm py-5'>Copyright © 2024 GreatStack - All Right Reserved.</p>
        </div>
        
    </div>
  )
}

export default Footer