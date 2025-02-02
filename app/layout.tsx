"use client"
import { Inter } from 'next/font/google'
import './globals.css'

import GlobalProvider, { useGobalDispatch } from './storage/GlobalProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className="max-h-screen">
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  )
}
