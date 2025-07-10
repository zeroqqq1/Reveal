'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Users, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* 背景动效 */}
      <div className="absolute inset-0 bg-matrix-bg"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-6xl md:text-8xl font-cyber font-bold mb-6"
            data-text={t('hero.title')}
          >
            <span className="glitch-text gradient-text">
              {t('hero.title')}
            </span>
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 font-mono"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* 特性卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: Shield,
                title: t('hero.anonymousProtection'),
                desc: t('hero.anonymousDesc')
              },
              {
                icon: Users,
                title: t('hero.communityVerification'),
                desc: t('hero.communityDesc')
              },
              {
                icon: Zap,
                title: t('hero.instantRewards'),
                desc: t('hero.rewardsDesc')
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="cyber-card group cursor-pointer"
              >
                <feature.icon className="w-12 h-12 text-cyber-blue mx-auto mb-4 group-hover:animate-pulse" />
                <h3 className="text-xl font-cyber font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* 行动按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button text-lg px-8 py-4 flex items-center space-x-2"
            >
              <span>{t('hero.startReporting')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyber-pink text-cyber-pink font-cyber font-semibold hover:bg-cyber-pink hover:text-black transition-all duration-300"
            >
              {t('hero.learnMore')}
            </motion.button>
          </motion.div>

          {/* 统计数据 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '100B', label: t('hero.totalSupply') },
              { number: '20%', label: t('hero.communityAirdrop') },
              { number: '30%', label: t('hero.governancePool') },
              { number: '100%', label: t('hero.transparency') }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-cyber font-bold neon-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 浮动元素 */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-2 h-2 bg-cyber-blue rounded-full opacity-60"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-20 w-3 h-3 bg-cyber-pink rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-20 w-2 h-2 bg-cyber-green rounded-full opacity-50"
      />
    </section>
  )
}

export default Hero 