'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, CheckCircle, Clock, Rocket } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Roadmap = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const { t } = useLanguage()

  const roadmapData = [
    {
      quarter: t('roadmap.q1Title'),
      status: 'active',
      icon: Rocket,
      color: 'cyber-blue',
      items: t('roadmap.q1Items').split('\n')
    },
    {
      quarter: t('roadmap.q2Title'),
      status: 'upcoming',
      icon: Clock,
      color: 'cyber-pink',
      items: t('roadmap.q2Items').split('\n')
    },
    {
      quarter: t('roadmap.q3Title'),
      status: 'upcoming',
      icon: CheckCircle,
      color: 'cyber-green',
      items: t('roadmap.q3Items').split('\n')
    },
    {
      quarter: t('roadmap.q4Title'),
      status: 'upcoming',
      icon: Calendar,
      color: 'cyber-orange',
      items: t('roadmap.q4Items').split('\n')
    }
  ]

  return (
    <section id="roadmap" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-cyber font-bold gradient-text mb-6">
            {t('roadmap.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('roadmap.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyber-blue via-cyber-pink to-cyber-green"></div>

          <div className="space-y-16">
            {roadmapData.map((phase, index) => (
              <motion.div
                key={phase.quarter}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* 时间节点 */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-${phase.color}/20 border-4 border-${phase.color} flex items-center justify-center z-10`}
                >
                  <phase.icon className={`w-8 h-8 text-${phase.color}`} />
                </motion.div>

                {/* 内容卡片 */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="cyber-card"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className={`text-2xl font-cyber font-bold text-${phase.color}`}>
                        {phase.quarter}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                        phase.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {phase.status === 'active' ? t('roadmap.active') : t('roadmap.upcoming')}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-${phase.color} mt-2 flex-shrink-0`}></div>
                          <span className="text-gray-300 font-mono text-sm">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 未来展望 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 cyber-card bg-gradient-to-r from-cyber-blue/10 to-cyber-pink/10 text-center"
        >
          <h3 className="text-3xl font-cyber font-bold gradient-text mb-6">
            {t('roadmap.futureTitle')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t('roadmap.continuousIteration'), desc: t('roadmap.iterationDesc') },
              { title: t('roadmap.ecosystemExpansion'), desc: t('roadmap.expansionDesc') },
              { title: t('roadmap.globalImpact'), desc: t('roadmap.impactDesc') }
            ].map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="space-y-3"
              >
                <h4 className="text-xl font-cyber font-bold text-white">{goal.title}</h4>
                <p className="text-gray-400">{goal.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Roadmap 