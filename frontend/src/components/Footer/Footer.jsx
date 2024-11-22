import React from 'react'
import FooterList from '../Footer-List/FooterList'
import SubscribeNow from '../SubscribeNow/SubscribeNow'
import { Information, Products, Company } from '@/contstants'



const Footer = () => {
    return (
        <footer className='bg-[#2A7F62]  h-auto py-10 flex md:h-max m-auto'>
            {/* <div className='w-11/12 m-auto flex-col flex gap-10  sm:justify-between  items-start h-3/4'> */}
            <div className='w-11/12 m-auto flex flex-col gap-10 lg:grid-cols-4 sm:grid grid-cols-2 sm:justify-center  h-3/4'>
                <FooterList title="Products" linkItems={Products} />
                <FooterList title="Company" linkItems={Company} />
                <FooterList title="Information" linkItems={Information} />
                <SubscribeNow />
            </div>
        </footer>
    )
}

export default Footer