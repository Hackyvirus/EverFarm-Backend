import React from 'react'
import Testomonialcard from '../Testomonial-card/Testomonialcard'
import cart1 from "../../../public/Images/profile1.jpg"
import cart2 from "../../../public/Images/dev.jpg"
import cart3 from "../../../public/Images/aman.png"
import stars from "../../../public/Images/star.png"


const Testimonial = () => {
    return (
        <section className='h-max md:h-[550px] w-11/12 mx-auto justify-evenly flex flex-col items-center'>
            <h2 className='text-[#001122] text-4xl'>Testimonial</h2>
            <div className='flex w-full justify-between md:flex-row items-center  h-max flex-col '>
                <Testomonialcard start={stars} src={cart1} name="Sanket" message="EverFarm simplifies my tasks and helps me make smarter decisions with ease." />
                <Testomonialcard start={stars} src={cart2} name="kaushik" message="EverFarm’s disease identification has saved my crops multiple times. It's like having an expert on hand!" />
                <Testomonialcard start={stars} src={cart3} name="Om" message="This app makes farm management easier and boosts my yield with helpful insights." />
            </div>
        </section>
    )
}

export default Testimonial