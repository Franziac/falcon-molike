import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionWrapper from './components/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Molike',
  description: 'Personalized movie recommendations based on movies you like',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionWrapper>
    <html lang="en" className=''>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={""+inter.className}>{children}</body>
    </html>
    </SessionWrapper>
  )
}