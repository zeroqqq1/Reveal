'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 修复类型定义 - 只允许字符串
type TranslationKeys = {
  [key: string]: string
}

// 完整的翻译字典
const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    'header.cases': 'Cases',
    'header.features': 'Features',
    'header.tokenomics': 'Tokenomics',
    'header.roadmap': 'Roadmap',
    'header.community': 'Community',
    'header.connectWallet': 'Connect Wallet',
    
    // Hero
    'hero.title': 'REVEAL PLATFORM',
    'hero.subtitle': 'Decentralized Web3 Whistleblowing Platform',
    'hero.description': 'Exposing misconduct by cryptocurrency exchanges, institutions and KOLs through anonymous reporting, community verification and governance token mechanisms, promoting transparency and fairness in the Web3 ecosystem. Becoming the most trusted decentralized whistleblowing platform.',
    'hero.anonymousProtection': 'Anonymous Protection',
    'hero.anonymousDesc': 'Zero-knowledge proof technology protects whistleblower identity',
    'hero.communityVerification': 'Community Verification',
    'hero.communityDesc': 'Decentralized verification mechanism ensures information authenticity',
    'hero.instantRewards': 'Instant Rewards',
    'hero.rewardsDesc': 'RCT token incentive mechanism rewards contributors',
    'hero.startReporting': 'Start Reporting',
    'hero.learnMore': 'Learn More',
    'hero.totalSupply': 'RCT Total Supply',
    'hero.communityAirdrop': 'Community Airdrop',
    'hero.governancePool': 'Governance Incentive Pool',
    'hero.transparency': 'Transparency Pursuit',
    
    // Cases
    'cases.title': 'Whistleblowing Cases',
    'cases.subtitle': 'Exposing misconduct in the Web3 ecosystem, promoting industry transparency and fairness',
    'cases.exchangeCategory': 'Exchange Sector',
    'cases.institutionCategory': 'Institution Sector',
    'cases.kolCategory': 'KOL Sector',
    'cases.mexcTitle': 'MEXC: Tony (Wang Yiyu) from Taoyuan Sankeng Relapses Again',
    'cases.mexcDesc': 'Recently, Tony (Wang Yiyu), the boss of MEXC platform from Taoyuan Sankeng, has relapsed again, starting to freeze Chinese users\' accounts on a large scale. Some users have had their account funds frozen ranging from 150K USDT to 500K USDT. Most of these users made profits through contracts, but after their accounts were frozen, they sought unfreezing channels everywhere, yet received no response through either official or private channels. This reminds people of Tony\'s previous behavior of opening Phoenix Entertainment Casino and freezing user funds, which are strikingly similar. PS: MEXC\'s actual controller Tony\'s real name is Wang Yiyu. Criminal case filed in Chongqing, main culprit has been a fugitive for 15 years.',
    'cases.okxTitle': 'OKX: Why Doesn\'t Xu Mingxing Turn the Compliance Knife on Himself First?',
    'cases.okxDesc': 'To ensure the platform meets regulatory requirements, Xu Mingxing set strict compliance terms requiring users to provide up to 15 years of asset flow proof. If users cannot provide such proof, the platform will freeze their assets. While this helps meet compliance requirements, this policy has caused widespread user dissatisfaction, believing such regulations are too harsh and unreasonably affect their rights.',
    'cases.gateTitle': 'Gate: Why Should Project Parties Bear the Pressure of Han Lin\'s Harem?',
    'cases.gateDesc': 'Gate.io\'s current predicament is not only reflected in the company\'s internal financial and management issues, but also involves improper trading behaviors between it and project parties. Han Lin and Jiu Er respectively control the company\'s key private keys and accounts, while the company\'s financial problems have led to generally low employee salaries.',
    'cases.institutionTitle': 'A Well-known Investment Institution Token Price Manipulation Case',
    'cases.institutionDesc': 'Using insider information and market manipulation methods to influence token price trends',
    'cases.kolTitle': 'Famous KOL Charges for Market Calls Without Disclosing Interest Relationships',
    'cases.kolDesc': 'Analyzing how some KOLs mislead retail investors by concealing interest relationships',
    'cases.complianceIssue': 'Compliance Issue',
    'cases.conflictOfInterest': 'Conflict of Interest',
    'cases.regulatoryEvasion': 'Regulatory Evasion',
    'cases.managementIssue': 'Management Issue',
    'cases.businessEthics': 'Business Ethics',
    'cases.projectImpact': 'Project Impact',
    'cases.marketManipulation': 'Market Manipulation',
    'cases.insiderTrading': 'Insider Trading',
    'cases.priceManipulation': 'Price Manipulation',
    'cases.disclosure': 'Interest Disclosure',
    'cases.misleadingInvestment': 'Misleading Investment',
    'cases.moralHazard': 'Moral Hazard',
    'cases.verified': 'Verified',
    'cases.verifying': 'Verifying',
    'cases.investigating': 'Investigating',
    'cases.high': 'High Risk',
    'cases.medium': 'Medium Risk',
    'cases.low': 'Low Risk',
    'cases.viewDetails': 'View Details',
    'cases.reportMore': 'Report More',
    'cases.viewMore': 'View More Cases',
    'cases.reportMisconduct': 'Found Misconduct? Report Now',
    'cases.reportDescription': 'Your report will be protected by anonymity, and you can earn RCT token rewards after community verification. Let\'s maintain the justice and transparency of the Web3 ecosystem together.',
    'cases.submitReport': 'Submit Anonymous Report',
    
    // Footer
    'footer.about': 'About Platform',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.support': 'Support Center',
    'footer.documentation': 'Documentation',
    'footer.github': 'GitHub',
    'footer.twitter': 'Twitter',
    'footer.discord': 'Discord',
    'footer.telegram': 'Telegram',
    'footer.medium': 'Medium',
    'footer.website': 'Official Website',
    'footer.visiting': 'Visiting',
    
    // Metadata - 修复为字符串格式
    'meta.title': 'Reveal Platform - Decentralized Web3 Whistleblowing Platform',
    'meta.description': 'Exposing misconduct by cryptocurrency exchanges, institutions and KOLs, promoting Web3 ecosystem transparency',
    'meta.keywords': 'Web3, Whistleblowing, Decentralized, Blockchain, DeFi, Cryptocurrency',
    
    // Wallet - 扁平化为字符串键值对
    'wallet.loading': 'Loading...',
    'wallet.addressCopied': 'Address copied!',
    'wallet.connected': 'Connected',
    'wallet.address': 'Wallet Address',
    'wallet.balance': 'SOL Balance',
    'wallet.fetchingBalance': 'Fetching balance...',
    'wallet.network': 'Network',
    'wallet.viewOnSolscan': 'View on Solscan',
    'wallet.disconnect': 'Disconnect'
  },
  zh: {
    // Header
    'header.cases': '爆料案例',
    'header.features': '平台功能',
    'header.tokenomics': '代币经济',
    'header.roadmap': '发展路线',
    'header.community': '社区',
    'header.connectWallet': '连接钱包',
    
    // Hero
    'hero.title': 'REVEAL PLATFORM',
    'hero.subtitle': '去中心化Web3爆料平台',
    'hero.description': '曝光加密货币交易所、机构和KOL的不当行为，通过匿名投料、社区验证和治理代币机制，推动Web3生态的透明度和公正性。成为最可信赖的去中心化爆料平台。',
    'hero.anonymousProtection': '匿名保护',
    'hero.anonymousDesc': '零知识证明技术保护爆料者身份',
    'hero.communityVerification': '社区验证',
    'hero.communityDesc': '去中心化验证机制确保信息真实性',
    'hero.instantRewards': '即时奖励',
    'hero.rewardsDesc': 'RCT代币激励机制奖励贡献者',
    'hero.startReporting': '开始爆料',
    'hero.learnMore': '了解更多',
    'hero.totalSupply': 'RCT总供应量',
    'hero.communityAirdrop': '社区空投',
    'hero.governancePool': '治理激励池',
    'hero.transparency': '透明度追求',
    
    // Cases
    'cases.title': '爆料案例',
    'cases.subtitle': '揭露Web3生态中的不当行为，推动行业透明度和公正性',
    'cases.exchangeCategory': '交易所板块',
    'cases.institutionCategory': '机构板块',
    'cases.kolCategory': 'KOL板块',
    'cases.mexcTitle': '抹茶：桃园三坑的抹茶平台老板Tony（王奕宇）再次旧病复发',
    'cases.mexcDesc': '最近，桃园三坑的抹茶平台老板Tony（王奕宇）再次旧病复发，开始大规模冻结中国用户的账户。部分用户的账户资金被冻结金额从15W USDT到50W USDT不等。这些用户大多数都是通过合约盈利，但在账户被冻结后，他们四处寻求解冻途径，然而无论是通过官方渠道还是私人申请，都未得到任何回应。令人不禁联想到Tony曾开设凤凰娱乐赌场并冻结用户资金的行为，二者如出一辙。PS:MEXC 实控人 Tony 真名 王奕宇    重庆刑事立案，主犯潜逃 15 年',
    'cases.okxTitle': 'OKX：徐明星合规之路为何第一选择不向自己挥刀？',
    'cases.okxDesc': '为了确保平台符合监管要求，徐明星设置了严格的合规条款，要求用户提供高达15年的资产流水证明。如果用户未能提供该证明，平台将冻结其资产。尽管此举有助于满足合规要求，但这一政策引发了大量用户的不满，认为这种规定过于苛刻，且不合理地影响了他们的权益。',
    'cases.gateTitle': 'Gate：Gate韩林圈养后宫的压力为何要项目方承担？',
    'cases.gateDesc': 'Gate.io当前的困境不仅体现在公司内部的财务和管理问题上，还涉及到其与项目方之间的不正当交易行为。韩林和酒儿分别掌控着公司的关键私钥和账号，而公司的财务问题则让员工的薪资普遍较低，GateLabs部门尤为严重。',
    'cases.institutionTitle': '某知名投资机构操纵代币价格案例',
    'cases.institutionDesc': '通过内幕信息和市场操控手段影响代币价格走势',
    'cases.kolTitle': '知名KOL收费喊单却不披露利益关系',
    'cases.kolDesc': '分析某些KOL如何通过隐瞒利益关系误导散户投资者',
    'cases.complianceIssue': '合规问题',
    'cases.conflictOfInterest': '利益冲突',
    'cases.regulatoryEvasion': '监管逃避',
    'cases.managementIssue': '管理问题',
    'cases.businessEthics': '商业道德',
    'cases.projectImpact': '项目影响',
    'cases.marketManipulation': '市场操控',
    'cases.insiderTrading': '内幕交易',
    'cases.priceManipulation': '价格操纵',
    'cases.disclosure': '利益披露',
    'cases.misleadingInvestment': '误导投资',
    'cases.moralHazard': '道德风险',
    'cases.verified': '已验证',
    'cases.verifying': '验证中',
    'cases.investigating': '调查中',
    'cases.high': '高危',
    'cases.medium': '中危',
    'cases.low': '低危',
    'cases.viewDetails': '查看详情',
    'cases.reportMore': '举报补充',
    'cases.viewMore': '查看更多案例',
    'cases.reportMisconduct': '发现不当行为？立即举报',
    'cases.reportDescription': '您的举报将受到匿名保护，经社区验证后可获得RCT代币奖励。让我们一起维护Web3生态的公正与透明。',
    'cases.submitReport': '匿名提交爆料',
    
    // Footer
    'footer.about': '关于平台',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
    'footer.contact': '联系我们',
    'footer.support': '支持中心',
    'footer.documentation': '使用文档',
    'footer.github': 'GitHub',
    'footer.twitter': 'Twitter',
    'footer.discord': 'Discord',
    'footer.telegram': 'Telegram',
    'footer.medium': 'Medium',
    'footer.website': '官方网站',
    'footer.visiting': '访问中',
    
    // Metadata
    'meta.title': 'Reveal Platform - 去中心化Web3爆料平台',
    'meta.description': '曝光加密货币交易所、机构和KOL的不当行为，推动Web3生态透明度',
    'meta.keywords': 'Web3, 爆料, 去中心化, 区块链, DeFi, 加密货币',
    
    // Wallet
    'wallet.loading': '加载中...',
    'wallet.addressCopied': '地址已复制！',
    'wallet.connected': '已连接',
    'wallet.address': '钱包地址',
    'wallet.balance': 'SOL余额',
    'wallet.fetchingBalance': '获取余额中...',
    'wallet.network': '网络',
    'wallet.viewOnSolscan': '在Solscan上查看',
    'wallet.disconnect': '断开连接'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 