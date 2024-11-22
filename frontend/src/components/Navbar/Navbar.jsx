'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Menubar from '../../../public/Images/menu-bar.png'
import Image from 'next/image'



const Navbar = () => {
    const signUp = true
    const [openNav, openNavbar] = useState(false)
    function OpenNavb() {
        openNavbar(!openNav)
    }
    return (
        <>
            <header className='bg-[#2A7F62] shadow-md  text-white  w-full h-16 flex items-center justify-center'>
                <nav className='w-11/12 h-10 flex justify-between items-center'>
                    <div>
                        {/* <img src="" alt="" /> */}
                        <h1 className='font-bold text-2xl'>EverFarm</h1>
                    </div>
                    <div className='w-1/2 hidden md:flex justify-between'>
                        <ul className='flex w-2/3 font-medium text-base justify-between'>
                            <li> <Link href="#">Home</Link> </li>
                            <li> <Link href="#">About</Link> </li>
                            <li> <Link href="#">Contact</Link> </li>
                            <li> <Link href="#">Services</Link> </li>
                        </ul>
                        <button className='font-medium py-[2px] text-md px-2 rounded-md  bg-white text-black'>{signUp ? 'sign up' : 'Login'}</button>
                    </div>
                    <Image src={Menubar} onClick={OpenNavb} className='md:hidden cursor-pointer' alt='Menu Bar' width={40} height={40} />
                </nav>
            </header>
            {openNav && <div className=' bg-[#2A7F62] items-center border-t-[1px] border-[#ebebeb] py-8 w-full px-6 flex md:hidden text-white gap-8  flex-col justify-between'>
                <ul className='flex w-full font-medium md:hidden flex-col items-center gap-2 text-base justify-between'>
                    <li> <Link className='items-start' href="#">Home</Link> </li>
                    <li> <Link className='items-start' href="#">About</Link> </li>
                    <li> <Link className='items-start' href="#">Contact</Link> </li>
                    <li> <Link className='items-start' href="#">Services</Link> </li>
                </ul>
                <button className='font-medium py-[2px] text-md px-2 rounded-md  bg-white text-black'>{signUp ? 'sign up' : 'Login'}</button>
            </div>}
        </>
    )
}

export default Navbar