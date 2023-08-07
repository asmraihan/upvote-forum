import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed top-0 z-30 flex w-full items-center justify-between bg-black/80 px-8 py-3'>
      <Link href="/" className='flex items-center gap-4'>
        <Image src='/logo.svg' width={28} height={28} alt='logo' />
        <p className='text-3xl font-bold text-white'>Upvote</p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton >
              <div className='flex cursor-pointer '>
                <Image src='/assets/logout.svg' width={24} height={24} alt='logout' />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      {/* org */}
      </div>
    </nav>
  )
}

export default Navbar