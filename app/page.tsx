'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import Cases from '@/components/Cases'
import Community from '@/components/Community'
import Footer from '@/components/Footer'
import MatrixRain from '@/components/MatrixRain'
import MetadataUpdater from '@/components/MetadataUpdater'
import WalletDemo from '@/components/WalletDemo'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden">
      <MetadataUpdater />
      <MatrixRain />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <Hero />
        
        {/* 钱包演示区域 */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-cyber font-bold gradient-text mb-4">
                钱包连接演示
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                体验Solana钱包连接功能，查看余额、网络状态和快速操作
              </p>
            </motion.div>
            <WalletDemo />
          </div>
        </section>
        
        <Cases />
        <Features />
        <Tokenomics />
        <Roadmap />
        <Community />
        <Footer />
      </motion.div>
    </main>
  )
} 