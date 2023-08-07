'use client'
import { Home, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import { cn } from '@/lib/utils'
const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className='sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-black bg-zinc-950 pb-5 pt-28 max-md:hidden'>
      <div className='flex w-full h-full flex-1 flex-col gap-6 px-6'>
        {
          sidebarLinks.map((link) => {



            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route

            return (
              <Link className={cn('relative flex justify-start gap-4 rounded-lg p-4',
                isActive ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-900 hover:text-white'
              )} key={link.route} href={link.route}>
                <Image src={link.imgURL} width={24} height={24} alt={link.label} />
                <p className='text-gray-300 max-lg:hidden'>{link.label}</p>
              </Link>
            )
          })}
      </div>

      <div className='mt-10 px-6'>
      <SignedIn>
            <SignOutButton signOutCallback={()=> router.push('/sign-in')}>
              <div className='flex cursor-pointer gap-4 p-4'>
                <Image src='/assets/logout.svg' width={24} height={24} alt='logout' />
                <p className='text-gray-300 max-lg:hidden'>Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar