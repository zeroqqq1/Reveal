'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Shield, Users, Coins, MapPin, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import WalletButton from './WalletButton'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('header.cases'), href: '#cases', icon: Shield },
    { name: t('header.features'), href: '#features', icon: Users },
    { name: t('header.tokenomics'), href: '#tokenomics', icon: Coins },
    { name: t('header.roadmap'), href: '#roadmap', icon: MapPin },
    { name: t('header.community'), href: '#community', icon: MessageCircle },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-bg/90 backdrop-blur-md border-b border-cyber-blue/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-cyber-gradient rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-cyber font-bold gradient-text">
              REVEAL
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-cyber"
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* 右侧按钮区域 */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 语言切换器 */}
            <LanguageSwitcher />
            
            {/* 钱包连接按钮 */}
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-cyber-blue"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          className="md:hidden overflow-hidden bg-dark-secondary/95 backdrop-blur-md rounded-lg mt-2"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-cyber-blue transition-colors"
              >
                <item.icon size={18} />
                <span className="font-cyber">{item.name}</span>
              </a>
            ))}
            <div className="px-4 pt-2 space-y-3">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <div className="flex justify-center">
                <WalletButton />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header 