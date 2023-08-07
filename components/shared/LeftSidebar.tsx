'use client'
import { Home, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
const LeftSidebar = () => {
  const pathaame = usePathname()
  const router = useRouter()
  return (
    <section>
      <div className='flex w-full h-full flex-1 flex-col gap-6 px-6 bg-gray-400'>
        {
          sidebarLinks.map((link) => (
            <Link className='flex justify-start items-center gap-2' key={link.name} href={link.href}>
              <Home className={`w-6 h-6 cursor-pointer ${pathaame === link.href ? 'text-blue-500' : 'text-gray-500'}`} />
              <p> {link.name}</p>
            </Link>
          ))

        }

      </div>
      <div className='mt-10 px-6'>
      <SignedIn>
            <SignOutButton signOutCallback={()=> router.push('/')}>
              <div className='flex cursor-pointer gap-2 justify-start items-center'>
                <LogOut className='w-6 h-6 cursor-pointer' />
                <p>Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar