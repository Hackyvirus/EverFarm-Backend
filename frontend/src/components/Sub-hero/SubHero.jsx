import React from 'react'
import Card from '../Card/Card'
import cart1 from "../../../public/Images/cart1.png"
import cart2 from "../../../public/Images/cart2.png"
import cart3 from "../../../public/Images/cart3.png"

const SubHero = () => {
    return (
        <section className='w-11/12  h-auto m-auto flex gap-14 flex-col '>
            <div className='flex text-center justify-center flex-col items-center gap-8'>
                <h2 className=' text-4xl leading-[45px]  md:text-[40px]'>Track Your Farming Expenses and Incomes with Ease</h2>
                <p className='w-full md:w-2/3 text-[#888888] text-center'>FarmExpense Tracker is a user-friendly web-based platform that simplifies financial management for farmers. It provides an intuitive solution to track and analyze farming expenses and incomes.</p>
            </div>
            <div className='md:flex-row  flex-col flex w-full h-auto  justify-center gap-8 items-center'>
                <Card ImageSRC={cart1} heading="Simplify Management" disc="Easily record and categorize expenses and income for valuable insights" />
                <Card ImageSRC={cart2} heading="Optimize Profitability" disc="Maximize your farm's success by accurately 
tracking finances and enhancing overall profitability" />
                <Card ImageSRC={cart3} heading="Make Informed Decisions" disc="Empower your choices with data-driven insights for smarter decisions" />

            </div>
        </section>
    )
}

export default SubHero