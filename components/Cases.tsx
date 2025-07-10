'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AlertTriangle, Building2, Coins, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Cases = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const { t } = useLanguage()

  const cases = [
    {
      category: t('cases.exchangeCategory'),
      icon: Building2,
      color: 'cyber-blue',
      cases: [
        {
          id: 'mexc',
          title: t('cases.mexcTitle'),
          description: t('cases.mexcDesc'),
          tags: [t('cases.complianceIssue'), t('cases.conflictOfInterest'), t('cases.regulatoryEvasion')],
          severity: 'high',
          status: t('cases.verified')
        },
        {
          id: 'okx',
          title: t('cases.okxTitle'),
          description: t('cases.okxDesc'),
          tags: [t('cases.complianceIssue'), t('cases.conflictOfInterest'), t('cases.regulatoryEvasion')],
          severity: 'high',
          status: t('cases.verified')
        },
        {
          id: 'gate',
          title: t('cases.gateTitle'),
          description: t('cases.gateDesc'),
          tags: [t('cases.managementIssue'), t('cases.businessEthics'), t('cases.projectImpact')],
          severity: 'medium', 
          status: t('cases.verifying')
        }
      ]
    },
    {
      category: t('cases.institutionCategory'),
      icon: Coins,
      color: 'cyber-pink',
      cases: [
        {
          id: 'institution',
          title: t('cases.institutionTitle'),
          description: t('cases.institutionDesc'),
          tags: [t('cases.marketManipulation'), t('cases.insiderTrading'), t('cases.priceManipulation')],
          severity: 'high',
          status: t('cases.investigating')
        }
      ]
    },
    {
      category: t('cases.kolCategory'),
      icon: Users,
      color: 'cyber-green',
      cases: [
        {
          id: 'kol',
          title: t('cases.kolTitle'),
          description: t('cases.kolDesc'),
          tags: [t('cases.disclosure'), t('cases.misleadingInvestment'), t('cases.moralHazard')],
          severity: 'medium',
          status: t('cases.verified')
        }
      ]
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 border-red-400'
      case 'medium': return 'text-yellow-400 border-yellow-400'
      case 'low': return 'text-green-400 border-green-400'
      default: return 'text-gray-400 border-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    const verified = t('cases.verified')
    const verifying = t('cases.verifying')
    const investigating = t('cases.investigating')
    
    switch (status) {
      case verified: return 'bg-green-500/20 text-green-400'
      case verifying: return 'bg-yellow-500/20 text-yellow-400'
      case investigating: return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return t('cases.high')
      case 'medium': return t('cases.medium')
      case 'low': return t('cases.low')
      default: return severity
    }
  }

  return (
    <section id="cases" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-cyber font-bold gradient-text mb-6">
            {t('cases.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-12">
          {cases.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="cyber-card"
            >
              {/* 分类标题 */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-lg bg-${category.color}/20`}>
                  <category.icon className={`w-8 h-8 text-${category.color}`} />
                </div>
                <h3 className="text-2xl font-cyber font-bold text-white">
                  {category.category}
                </h3>
              </div>

              {/* 案例列表 */}
              <div className="space-y-6">
                {category.cases.map((caseItem, caseIndex) => (
                  <motion.div
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (caseIndex * 0.1) }}
                    whileHover={{ scale: 1.02 }}
                    className="border-l-4 border-cyber-blue/50 pl-6 py-4 hover:border-cyber-blue/80 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2">
                          {caseItem.title}
                        </h4>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                          {caseItem.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col space-y-2 lg:ml-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono ${getStatusColor(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono border ${getSeverityColor(caseItem.severity)}`}>
                          {getSeverityText(caseItem.severity)}
                        </span>
                      </div>
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2">
                      {caseItem.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-dark-tertiary text-cyber-blue text-xs font-mono rounded-md border border-cyber-blue/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 查看更多按钮 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 text-center"
              >
                <button className="cyber-button">
                  {t('cases.viewMore')} {category.category}
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 提交爆料号召 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 cyber-card bg-gradient-to-r from-cyber-blue/10 to-cyber-pink/10"
        >
          <AlertTriangle className="w-16 h-16 text-cyber-orange mx-auto mb-6" />
          <h3 className="text-2xl font-cyber font-bold mb-4">
            {t('cases.reportMisconduct')}
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {t('cases.reportDescription')}
          </p>
          <button className="cyber-button text-lg px-8 py-4">
            {t('cases.submitReport')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Cases 