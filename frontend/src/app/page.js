import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import SubHero from '@/components/Sub-hero/SubHero'
import Testimonial from '@/components/Testimonials/Testimonials'
import Footer from '@/components/Footer/Footer'



const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <SubHero />
      <Testimonial />
      <Footer/>
    </>
  )
}

export default Home