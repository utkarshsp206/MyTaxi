"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function Header() {
    const router = useRouter();
    const headerMenu = [
        { id: 1, name: 'Ride', icon: '/taxi.svg', route: '/' },
        { id: 2, name: 'Package', icon: '/box.svg', route: '/package' },
        { id: 3, name: 'About', icon: '/about.svg', route: '/about' },
        { id: 4, name: 'Contact', icon: '/contact.svg', route: '/contact' },
    ]

    return (
        <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between bg-black'>
            <div className='flex items-center'>
                <Image 
                    src='/logo.png'
                    width={70} 
                    height={70}
                    alt='Logo' 
                    className='cursor-pointer'
                    onClick={() => router.push('/home')} 
                />
            </div>
            <div className='flex space-x-8'>
                {headerMenu.map((item) => (
                    <div 
                        key={item.id} 
                        className='flex items-center space-x-2 cursor-pointer text-yellow-500 hover:text-yellow-300'
                        onClick={() => router.push(item.route)}
                    >
                        <Image 
                            src={item.icon} 
                            width={24} 
                            height={24} 
                            alt={item.name} 
                            className='text-yellow-500'
                        />
                        <span className='text-lg font-medium'>{item.name}</span>
                    </div>
                ))}
            </div>
            <div className='flex items-center'>
                <UserButton />
            </div>
        </div>
    )
}

export default Header
