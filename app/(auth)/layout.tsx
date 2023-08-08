import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import '../globals.css'
export const metadata = {
    title: 'Register',
    description: 'Register page for UpVote',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
            <ClerkProvider>
                <html lang="en">
                    <body className={`${inter.className} bg-zinc-950` }>
                    {children}
                    </body>
                </html>
            </ClerkProvider>
    )
}