'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Shield, 
  Users, 
  Vote, 
  BookOpen, 
  Eye, 
  Lock, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Features = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const { t } = useLanguage()

  const mainFeatures = [
    {
      icon: Shield,
      title: t('features.anonymousSubmission'),
      description: t('features.anonymousDesc'),
      benefits: [
        t('features.completeProtection'),
        t('features.privacyEncryption'),
        t('features.ipfsStorage'),
        t('features.censorshipResistant')
      ],
      color: 'cyber-blue'
    },
    {
      icon: Users,
      title: t('features.communityVerification'),
      description: t('features.verificationDesc'),
      benefits: [
        t('features.decentralizedVerification'),
        t('features.stakingMechanism'),
        t('features.rewardIncentive'),
        t('features.reputationSystem')
      ],
      color: 'cyber-pink'
    },
    {
      icon: Vote,
      title: t('features.decentralizedGovernance'),
      description: t('features.governanceDesc'),
      benefits: [
        t('features.daoOrganization'),
        t('features.democraticVoting'),
        t('features.transparentFunding'),
        t('features.communityDriven')
      ],
      color: 'cyber-green'
    },
    {
      icon: BookOpen,
      title: t('features.educationCenter'),
      description: t('features.educationDesc'),
      benefits: [
        t('features.safetyGuide'),
        t('features.web3Tools'),
        t('features.legalWarning'),
        t('features.knowledgeSharing')
      ],
      color: 'cyber-orange'
    }
  ]

  const additionalFeatures = [
    {
      icon: Eye,
      title: t('features.realTimeMonitoring'),
      description: t('features.monitoringDesc')
    },
    {
      icon: Lock,
      title: t('features.dataSecurity'),
      description: t('features.securityDesc')
    },
    {
      icon: Zap,
      title: t('features.rapidResponse'),
      description: t('features.responseDesc')
    },
    {
      icon: Globe,
      title: t('features.globalCoverage'),
      description: t('features.coverageDesc')
    }
  ]

  return (
    <section id="features" ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* 标题部分 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-cyber font-bold gradient-text mb-6">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* 主要功能 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="cyber-card group cursor-pointer"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-lg bg-${feature.color}/20 group-hover:bg-${feature.color}/30 transition-all duration-300`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-cyber font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* 功能优势 */}
              <div className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: (index * 0.2) + (benefitIndex * 0.1) }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className={`w-5 h-5 text-${feature.color}`} />
                    <span className="text-gray-300 font-mono text-sm">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* 了解更多按钮 */}
              <motion.button
                whileHover={{ x: 10 }}
                className={`flex items-center space-x-2 mt-6 text-${feature.color} hover:text-white transition-colors group`}
              >
                <span className="font-cyber text-sm">{t('features.learnMore')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* 附加功能 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="cyber-card text-center group"
            >
              <feature.icon className="w-12 h-12 text-cyber-blue mx-auto mb-4 group-hover:animate-pulse" />
              <h4 className="text-lg font-cyber font-bold text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 技术架构展示 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 cyber-card bg-gradient-to-r from-cyber-blue/5 to-cyber-pink/5"
        >
          <h3 className="text-3xl font-cyber font-bold gradient-text text-center mb-8">
            {t('features.techArchitecture')}
          </h3>
          <p className="text-center text-gray-400 mb-12">
            {t('features.techDesc')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-cyber font-bold text-cyber-blue mb-4">
                {t('features.blockchainFoundation')}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>{t('features.solanaNetwork')}</div>
                <div>{t('features.smartContracts')}</div>
                <div>{t('features.ipfsDecentralized')}</div>
                <div>{t('features.arweave')}</div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-cyber font-bold text-cyber-pink mb-4">
                {t('features.privacyProtection')}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>{t('features.zkProof')}</div>
                <div>{t('features.ringSignature')}</div>
                <div>{t('features.e2eEncryption')}</div>
                <div>{t('features.metadataProtection')}</div>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-cyber font-bold text-cyber-green mb-4">
                {t('features.governanceMechanism')}
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>{t('features.proposalVoting')}</div>
                <div>{t('features.stakingRewards')}</div>
                <div>{t('features.reputationAlgorithm')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features 