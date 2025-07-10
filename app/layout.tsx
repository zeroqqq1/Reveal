import './globals.css'
import type { Metadata } from 'next'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { WalletContextProvider } from '@/contexts/WalletContext'

export const metadata: Metadata = {
  title: 'Reveal Platform - Decentralized Web3 Whistleblowing Platform',
  description: 'Exposing misconduct by cryptocurrency exchanges, institutions and KOLs, promoting Web3 ecosystem transparency',
  keywords: ['Web3', 'Whistleblowing', 'Decentralized', 'Blockchain', 'DeFi', 'Cryptocurrency'],
  authors: [{ name: 'Reveal Platform' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Fira+Code:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-dark-bg text-white font-mono antialiased">
        <WalletContextProvider>
          <LanguageProvider>
            <div className="min-h-screen">
              {children}
            </div>
          </LanguageProvider>
        </WalletContextProvider>
      </body>
    </html>
  )
} 