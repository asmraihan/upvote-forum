'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Footer = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className='fixed bottom-0 z-10 w-full rounded-t-3xl bg-black/10 p-4 backdrop-blur-lg xs:px-7 md:hidden'>
      <div className='flex items-center justify-between gap-3 xs:gap-5'>
        {
        sidebarLinks.map((link) => {



          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route

          return (
            <Link className={cn('relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5',
              isActive ? 'bg-zinc-900 text-white' : 'text-gray-300 hover:bg-zinc-900 hover:text-white'
            )} key={link.route} href={link.route}>
              <Image src={link.imgURL} width={24} height={24} alt={link.label} />
              <p className='text-gray-300 max-sm:hidden'>{link.label}</p>
            </Link>
          )
        }
          )
        }
      </div>
    </section>
  )
}

export default Footer