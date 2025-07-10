'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'zh', name: '中', flag: '🇨🇳' }
  ]

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-dark-tertiary/50 border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all duration-300"
      >
        <Globe className="w-4 h-4 text-cyber-blue" />
        <span className="text-cyber-blue font-mono text-sm">
          {languages.find(lang => lang.code === language)?.name}
        </span>
      </motion.button>

      {/* 语言选择下拉菜单 */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute top-full right-0 mt-2 w-24 bg-dark-secondary border border-cyber-blue/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-50"
      >
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
            onClick={() => setLanguage(lang.code as 'en' | 'zh')}
            className={`w-full px-3 py-2 text-left flex items-center space-x-2 hover:bg-cyber-blue/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'bg-cyber-blue/20 text-cyber-blue' : 'text-gray-300'
            }`}
          >
            <span className="text-sm">{lang.flag}</span>
            <span className="font-mono text-xs">{lang.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default LanguageSwitcher 