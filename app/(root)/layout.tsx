import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Upvote',
  description: 'Forum app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-slate-50`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className='flex'>
            <LeftSidebar />
              <section className='flex min-h-screen flex-1 flex-col items-center bg-black/95 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10'>
                  <div className='w-full max-w-4xl'>
                     {children}
                  </div>
              </section>
            <RightSidebar />
          </main>
          <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
