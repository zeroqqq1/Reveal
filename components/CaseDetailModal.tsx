'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect } from 'react'

interface CaseDetailModalProps {
  isOpen: boolean
  onClose: () => void
  caseId: string
}

const CaseDetailModal = ({ isOpen, onClose, caseId }: CaseDetailModalProps) => {
  const { t } = useLanguage()

  // 防止背景滚动穿透
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  // 阻止事件冒泡
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // 根据案例ID获取详细信息
  const getCaseDetails = (id: string) => {
    const cases = {
      'mexc': {
        title: 'MEXC',
        titleEn: 'MEXC Exchange',
        category: '中心化交易所',
        categoryEn: 'Centralized Exchange',
        severity: '高风险',
        severityEn: 'High Risk',
        description: t('caseDetails.mexc.description') || '案例详情加载中...'
      },
      'okx': {
        title: 'OKX',
        titleEn: 'OKX Exchange',
        category: '中心化交易所',
        categoryEn: 'Centralized Exchange',
        severity: '高风险',
        severityEn: 'High Risk',
        description: t('caseDetails.okx.description') || '案例详情加载中...'
      },
      'gate': {
        title: 'Gate.io',
        titleEn: 'Gate.io Exchange',
        category: '中心化交易所',
        categoryEn: 'Centralized Exchange',
        severity: '中风险',
        severityEn: 'Medium Risk',
        description: t('caseDetails.gate.description') || '案例详情加载中...'
      },
      'institution': {
        title: '投资机构',
        titleEn: 'Investment Institution',
        category: '投资机构',
        categoryEn: 'Investment Institution',
        severity: '高风险',
        severityEn: 'High Risk',
        description: t('caseDetails.default.description') || '案例详情加载中...'
      },
      'kol': {
        title: 'KOL',
        titleEn: 'Key Opinion Leader',
        category: 'KOL',
        categoryEn: 'Key Opinion Leader',
        severity: '中风险',
        severityEn: 'Medium Risk',
        description: t('caseDetails.default.description') || '案例详情加载中...'
      }
    }

    return cases[id as keyof typeof cases] || cases['institution']
  }

  const caseData = getCaseDetails(caseId)

  const getSeverityColor = (severity: string) => {
    if (severity.includes('高') || severity.includes('High')) return 'text-red-400 border-red-400'
    if (severity.includes('中') || severity.includes('Medium')) return 'text-yellow-400 border-yellow-400'
    if (severity.includes('低') || severity.includes('Low')) return 'text-green-400 border-green-400'
    return 'text-gray-400 border-gray-400'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* 弹出框内容 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[80vh] mx-4 bg-dark-secondary border border-cyber-blue/30 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-6 border-b border-cyber-blue/20">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="text-2xl font-cyber font-bold text-white">
                    {caseData.title}
                  </h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="px-3 py-1 bg-cyber-blue/20 text-cyber-blue text-sm font-mono rounded-md">
                      {caseData.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-mono rounded-md border ${getSeverityColor(caseData.severity)}`}>
                      {caseData.severity}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* 内容区域 - 可滚动 */}
            <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <div className="space-y-6">
                {/* 案例描述 */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-cyber-blue rounded-full mr-3"></span>
                    {t('caseDetails.description')}
                  </h3>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {caseData.description}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CaseDetailModal 