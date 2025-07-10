'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageCircle, Users, Twitter, Send, Globe, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Community = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const { t } = useLanguage()

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: '#', followers: '10K+', color: 'hover:text-blue-400' },
    { name: 'Telegram', icon: Send, url: '#', followers: '5K+', color: 'hover:text-cyan-400' },
    { name: 'Discord', icon: MessageCircle, url: '#', followers: '3K+', color: 'hover:text-purple-400' },
    { name: t('footer.website'), icon: Globe, url: '#', followers: t('footer.visiting'), color: 'hover:text-green-400' }
  ]

  return (
    <section id="community" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-cyber font-bold gradient-text mb-6">
            {t('community.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('community.subtitle')}
          </p>
        </motion.div>

        {/* 社交媒体链接 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`cyber-card text-center group cursor-pointer ${social.color}`}
            >
              <social.icon className="w-12 h-12 text-cyber-blue mx-auto mb-4 group-hover:animate-pulse transition-colors" />
              <h3 className="text-lg font-cyber font-bold text-white mb-2">{social.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{social.followers} {t('community.followers')}</p>
              <div className="flex items-center justify-center space-x-2 text-cyber-blue group-hover:text-white transition-colors">
                <span className="text-sm">{t('community.joinNow')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* 社区活动 */}
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="cyber-card"
          >
            <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center space-x-3">
              <Users className="w-8 h-8 text-cyber-pink" />
              <span className="gradient-text">{t('community.activities')}</span>
            </h3>
            <div className="space-y-4">
              {[
                { title: t('community.ama'), desc: t('community.amaDesc'), time: t('community.weekly') },
                { title: t('community.onlineSalon'), desc: t('community.salonDesc'), time: t('community.monthly') },
                { title: t('community.airdropActivity'), desc: t('community.airdropDesc'), time: t('community.ongoing') },
                { title: t('community.governanceVoting'), desc: t('community.votingDesc'), time: t('community.asNeeded') }
              ].map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-dark-tertiary/50 hover:bg-dark-tertiary/70 transition-colors"
                >
                  <div className="w-2 h-2 bg-cyber-pink rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-cyber font-bold text-white">{activity.title}</h4>
                      <span className="text-cyber-blue font-mono text-sm">{activity.time}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{activity.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="cyber-card"
          >
            <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center space-x-3">
              <MessageCircle className="w-8 h-8 text-cyber-green" />
              <span className="gradient-text">{t('community.rewards')}</span>
            </h3>
            <div className="space-y-4">
              {[
                { action: t('community.submitReport'), reward: '100-1000 RCT', desc: t('community.reportDesc') },
                { action: t('community.verifyReport'), reward: '10-100 RCT', desc: t('community.verifyDesc') },
                { action: t('community.participateGovernance'), reward: '5-50 RCT', desc: t('community.governanceDesc') },
                { action: t('community.promoteplatform'), reward: '20-200 RCT', desc: t('community.promoteDesc') }
              ].map((reward, index) => (
                <motion.div
                  key={reward.action}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="p-4 rounded-lg bg-gradient-to-r from-cyber-green/10 to-cyber-blue/10 border border-cyber-green/20"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-cyber font-bold text-white">{reward.action}</h4>
                    <span className="text-cyber-green font-mono font-bold">{reward.reward}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{reward.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 立即参与 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center cyber-card bg-gradient-to-r from-cyber-blue/5 via-cyber-pink/5 to-cyber-green/5"
        >
          <h3 className="text-3xl font-cyber font-bold gradient-text mb-6">
            {t('community.startParticipating')}
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('community.participateDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cyber-button text-lg px-8 py-4">
              {t('community.joinTelegram')}
            </button>
            <button className="px-8 py-4 border-2 border-cyber-pink text-cyber-pink font-cyber font-semibold hover:bg-cyber-pink hover:text-black transition-all duration-300">
              {t('community.followTwitter')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Community 