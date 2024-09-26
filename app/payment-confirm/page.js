"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function PaymentConfirmation() {

    const route=useRouter();
  return (
    <div className='bg-[#f1f1f1] flex
    h-screen
    items-center justify-center flex-col' style={{paddingTop:'150px',backgroundImage: `url('/Confirmation.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'}}>
         {/* <div 
    className="absolute top-0 left-0 w-full h-full"
    style={{
      backgroundImage: `url('/Confirmation.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  /> */}
        <div style={{padding:'100px'}}></div>
        <button className='p-2 bg-black text-white
        px-10 rounded-lg'
        onClick={()=>route.push('/home')}
        >Go Home</button>
    </div>
  )
}

export default PaymentConfirmation