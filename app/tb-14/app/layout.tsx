import type { Metadata, Viewport } from 'next'
import '../styles/fonts.css'
import '../styles/global.css'
import 'react-datepicker/dist/react-datepicker.css'
import { AuthProvider } from '@/lib/auth/context'

export const metadata: Metadata = {
  title: 'TB-14 - Gaming Platform',
  description: 'Professional gaming platform with sports betting, casino, slots, and mini-games',
  keywords: 'sports betting, casino, slots, mini-games, online gaming',
  authors: [{ name: 'TB-14' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
