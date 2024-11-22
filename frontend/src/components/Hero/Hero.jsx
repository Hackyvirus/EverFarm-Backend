import Image from 'next/image'
import Link from 'next/link'
import HeroImage from "../../../public/Images/HomeImage.png"

import React from 'react'

const Hero = () => {
    return (
        <main className='w-11/12 m-auto md:h-[550px]  md:items-center py-10 h-max md:flex-row  flex-col flex box-border'>
            <div className="left-hero gap-8 md:w-1/2 w-full flex flex-col justify-around">
                <h2 className='text-[#333333] text-center md:text-left md:leading-[45px] tracking-tight text-4xl leading-10 sm:text-4xl md:text-4xl xl:text-6xl xl:leading-[60px] '>Track Your Farming Expenses with Eversity</h2>
                <div className='flex justify-start flex-col gap-10 '>
                    <p className='text-[#888888] text-justify md:text-left'>FarmExpense Tracker is a web-based platform designed to simplify
                        financial management for farmers. With its intuitive interface and
                        powerful features, you can easily track your farming expenses and
                        incomes, making informed decisions to optimize your farm's profitability.</p>
                    <div className='flex  justify-center md:justify-start gap-4 items-center'>
                        <button className='w-[110px] h-[40px] bg-[#2A7F62] rounded-lg'><Link href="#">Get Started</Link> </button>
                        <button className='w-[110px] h-[40px] bg-[#EBEBEB] rounded-lg'><Link href="#">Get Started</Link> </button>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 w-full md:h-full content-center h-auto right-hero">
                <Image src={HeroImage} className='md:h-fit  h-full m-auto size-fit' alt='Farmer Photo' />
            </div>
        </main>
    )
}

export default Hero