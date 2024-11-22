import Image from 'next/image'
import React from 'react'


const Card = (props) => {
    return (
        <div className='flex w-11/12 box-border gap-8 flex-col md:h-[350px] lg:h-[450px] items-center justify-between text-center '>
            <Image src={props.ImageSRC} alt='Cart Photo' className='w-full rounded-2xl cursor-pointer md:border md:h-2/3' />
            <div className='h-1/3 w-full  '>
                <h2 className='text-2xl leading-10 font-bold sm:text-3xl md:text-xl text-[#333333]'>{props.heading}</h2>
                <p className='text-[#888888] md:text-base sm:text-lg  sm:m-auto'>{props.disc}</p>
            </div>
        </div>
    )
}

export default Card