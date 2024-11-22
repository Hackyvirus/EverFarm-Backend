import React from 'react'

const FooterList = (props) => {
  return (
    <div className='h-[90%] flex flex-col justify-center gap-8'>
      <h2 className='font-medium text-white text-[22px] leading-4'>{props.title}</h2>
      <ul className='flex flex-col justify-start gap-3 h-4/5'>
        {props.linkItems.map((i, index) => (
          <li className='font-normal text-white' key={index}>{i}</li>
        ))}
      </ul>
    </div>
  )
}

export default FooterList