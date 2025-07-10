'use client'

import { motion } from 'framer-motion'
import { Twitter, Send, MessageCircle, Globe, Mail, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const footerLinks = {
    platform: [
      { name: t('footer.aboutUs'), href: '#' },
      { name: t('footer.howToReport'), href: '#' },
      { name: t('footer.verificationProcess'), href: '#' },
      { name: t('footer.governanceMechanism'), href: '#' }
    ],
    community: [
      { name: 'Twitter', href: '#' },
      { name: 'Telegram', href: '#' },
      { name: 'Discord', href: '#' },
      { name: t('footer.forum'), href: '#' }
    ],
    resources: [
      { name: t('footer.whitepaper'), href: '#' },
      { name: t('footer.technicalDocs'), href: '#' },
      { name: t('footer.securityGuide'), href: '#' },
      { name: 'FAQ', href: '#' }
    ],
    legal: [
      { name: t('footer.termsOfService'), href: '#' },
      { name: t('footer.privacyPolicy'), href: '#' },
      { name: t('footer.disclaimer'), href: '#' },
      { name: t('footer.contactUs'), href: '#' }
    ]
  }

  const socialIcons = [
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Send, href: '#', color: 'hover:text-cyan-400' },
    { icon: MessageCircle, href: '#', color: 'hover:text-purple-400' },
    { icon: Globe, href: '#', color: 'hover:text-green-400' }
  ]

  return (
    <footer className="bg-dark-secondary border-t border-cyber-blue/20 py-16">
      <div className="container mx-auto px-4">
        {/* 主要内容 */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Logo和描述 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-cyber-gradient rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">R</span>
              </div>
              <span className="text-3xl font-cyber font-bold gradient-text">REVEAL</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            
            {/* 社交媒体 */}
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-3 rounded-lg bg-dark-tertiary ${social.color} transition-colors`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 链接部分 */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-cyber font-bold text-white mb-4 capitalize">
                {t(`footer.${category}`)}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-cyber-blue transition-colors font-mono text-sm"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 底部信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-dark-tertiary pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>© {currentYear} Reveal Platform. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Powered by Solana</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>{t('footer.builtWithLove')}</span>
            </div>
          </div>
        </motion.div>

        {/* 安全提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 p-4 rounded-lg bg-cyber-orange/10 border border-cyber-orange/20"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-cyber-orange mt-0.5" />
            <div>
              <h4 className="font-cyber font-bold text-cyber-orange mb-2">{t('footer.securityWarning')}</h4>
              <p className="text-gray-300 text-sm">
                {t('footer.securityDesc')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 