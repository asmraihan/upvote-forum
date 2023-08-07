import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <Link href="/" className='flex items-center gap-2'>
        <Image src='/logo.svg' width={28} height={28} alt='logo' />
        <p className='text-3xl font-bold'>Upvote</p>
      </Link>
      {/* <div className='flex items-center gap-1'> */}
        <div className='block md:hidden'>
        <div className=''>
          <SignedIn>
            <SignOutButton >
              <div className='flex cursor-pointer '>
                <Image src='/next.svg' width={80} height={80} alt='logout' />
              </div>
            </SignOutButton>
          </SignedIn>
      {/* org */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar