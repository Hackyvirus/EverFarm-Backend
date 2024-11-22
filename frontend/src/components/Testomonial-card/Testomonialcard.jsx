import Image from 'next/image'

import React from 'react'

const Testomonialcard = (props) => {
  return (
    <div className='md:w-[400px] md:h-auto w-fit  h-[250px]  flex-col flex items-center justify-center gap-6 md:gap-10'>
      <div className='flex justify-center items-center flex-col'>
        <Image src={props.src} width={60} height={60} className='rounded-full' alt='Profile Photo' />
        <h2>{props.name}</h2>
        <Image src={props.start} width={100} className='rounded-full' alt='Profile Photo' />

      </div>
      <div className='flex justify-center flex-col items-center text-center'>
        <p className='text-[#5E697F] w-10/12 md:w-11/12'>{props.message}</p>
      </div>
    </div>
  )
}

export default Testomonialcard