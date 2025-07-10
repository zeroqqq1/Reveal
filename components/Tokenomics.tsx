'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PieChart, Coins, TrendingUp, Lock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Tokenomics = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const { t } = useLanguage()

  const distribution = [
    { name: t('tokenomics.communityAirdrop'), percentage: 20, amount: t('tokenomics.amount20M'), color: 'bg-cyber-blue', desc: t('tokenomics.airdropDesc') },
    { name: t('tokenomics.publicSale'), percentage: 20, amount: t('tokenomics.amount20M'), color: 'bg-cyber-pink', desc: t('tokenomics.publicDesc') },
    { name: t('tokenomics.governancePool'), percentage: 30, amount: t('tokenomics.amount30M'), color: 'bg-cyber-green', desc: t('tokenomics.poolDesc') },
    { name: t('tokenomics.privateSale'), percentage: 10, amount: t('tokenomics.amount10M'), color: 'bg-cyber-orange', desc: t('tokenomics.privateDesc') },
    { name: t('tokenomics.teamAdvisors'), percentage: 10, amount: t('tokenomics.amount10M'), color: 'bg-cyber-purple', desc: t('tokenomics.teamDesc') },
    { name: t('tokenomics.platformReserve'), percentage: 10, amount: t('tokenomics.amount10M'), color: 'bg-yellow-500', desc: t('tokenomics.reserveDesc') }
  ]

  const utilities = [
    { icon: TrendingUp, title: t('tokenomics.governanceRights'), desc: t('tokenomics.governanceDesc') },
    { icon: Coins, title: t('tokenomics.rewardEarning'), desc: t('tokenomics.rewardDesc') },
    { icon: Lock, title: t('tokenomics.premiumFeatures'), desc: t('tokenomics.premiumDesc') },
    { icon: PieChart, title: t('tokenomics.revenueSharing'), desc: t('tokenomics.revenueDesc') }
  ]

  return (
    <section id="tokenomics" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-cyber font-bold gradient-text mb-6">
            {t('tokenomics.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('tokenomics.subtitle')}
          </p>
        </motion.div>

        {/* 分配比例 */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="cyber-card"
          >
            <h3 className="text-2xl font-cyber font-bold mb-6 text-center">{t('tokenomics.distribution')}</h3>
            <div className="space-y-4">
              {distribution.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-dark-tertiary/50"
                >
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-cyber font-bold text-white">{item.name}</span>
                      <span className="text-cyber-blue font-mono">{item.percentage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">{item.desc}</span>
                      <span className="text-gray-300 font-mono text-sm">{item.amount} RCT</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 代币用途 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="cyber-card"
          >
            <h3 className="text-2xl font-cyber font-bold mb-6 text-center">{t('tokenomics.utilities')}</h3>
            <div className="space-y-6">
              {utilities.map((utility, index) => (
                <motion.div
                  key={utility.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 rounded-lg bg-cyber-blue/20">
                    <utility.icon className="w-6 h-6 text-cyber-blue" />
                  </div>
                  <div>
                    <h4 className="font-cyber font-bold text-white mb-2">{utility.title}</h4>
                    <p className="text-gray-400 text-sm">{utility.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 经济机制 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="cyber-card bg-gradient-to-r from-cyber-blue/5 to-cyber-pink/5"
        >
          <h3 className="text-3xl font-cyber font-bold gradient-text text-center mb-8">
            {t('tokenomics.deflationMechanism')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t('tokenomics.revenueBuyback'), desc: t('tokenomics.buybackDesc'), icon: '🔄' },
              { title: t('tokenomics.tokenBurn'), desc: t('tokenomics.burnDesc'), icon: '🔥' },
              { title: t('tokenomics.valueIncrease'), desc: t('tokenomics.valueDesc'), icon: '📈' }
            ].map((mechanism, index) => (
              <motion.div
                key={mechanism.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{mechanism.icon}</div>
                <h4 className="text-xl font-cyber font-bold text-white mb-2">{mechanism.title}</h4>
                <p className="text-gray-400">{mechanism.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Tokenomics 