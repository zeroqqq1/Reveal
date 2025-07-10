'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const MetadataUpdater = () => {
  const { language, t } = useLanguage()

  useEffect(() => {
    // 更新页面标题
    document.title = t('meta.title')
    
    // 更新描述元标签
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'))
    }
    
    // 更新关键词元标签
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      // 直接使用t函数获取关键词，让翻译函数处理数组转换
      const keywordsValue = t('meta.keywords')
      metaKeywords.setAttribute('content', keywordsValue)
    }
    
    // 更新HTML lang属性
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    
  }, [language, t])

  return null // 这个组件不渲染任何内容
}

export default MetadataUpdater 