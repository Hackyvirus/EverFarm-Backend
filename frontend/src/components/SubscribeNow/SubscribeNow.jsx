import Image from 'next/image'
import React from 'react'
import arrow from '../../../public/Images/arrow.png'

const SubscribeNow = () => {
  return (
    <div className='md:w-[340px] py-10 w-full  h-[220px] md:h-max lg:w-full flex flex-col justify-start gap-4 bg-[#FFFFFF] bg-opacity-20 box-border rounded-lg '>
      <h2 className='text-white font-medium opacity-100 text-center text-xl'>SubscribeNow</h2>
      <div className='h-10 w-full flex justify-center'>
        <input placeholder='Email Address' className='h-9 w-9/12 focus:outline-none px-2 rounded-l-md' type="text" />
        <div className='w-2/12 rounded-r-md cursor-pointer bg-sky-600 h-9 flex justify-center items-center'><Image src={arrow} alt='arow' /></div>
      </div>
      <p className='text-[#fff] m-auto text-center w-[80%] font-light text-[13px] leading-5 justify-center'>Hello, we are Everfarm. Our goal is to translate the positive effects from revolutionizing.</p>
    </div>
  )
}

export default SubscribeNow