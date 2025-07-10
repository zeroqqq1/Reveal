'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useLanguage } from '@/contexts/LanguageContext'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { motion } from 'framer-motion'
import { Wallet, Copy, LogOut, ExternalLink, Loader } from 'lucide-react'
import { useState, useEffect } from 'react'

const WalletButton = () => {
  const { connected, publicKey, disconnect, wallet } = useWallet()
  const { balance, loading, formattedBalance } = useWalletBalance()
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  // 复制地址到剪贴板
  const copyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 缩短地址显示
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // 在Solscan中查看地址
  const viewOnSolscan = () => {
    if (publicKey) {
      window.open(`https://solscan.io/account/${publicKey.toString()}`, '_blank')
    }
  }

  // 在组件挂载前显示占位符
  if (!mounted) {
    return (
      <div className="flex items-center space-x-3 bg-dark-secondary border border-cyber-blue/30 rounded-lg px-4 py-3 opacity-50">
        <div className="w-8 h-8 rounded-full bg-cyber-blue/20 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-cyber-blue" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-mono text-sm">加载中...</span>
        </div>
      </div>
    )
  }

  if (!connected) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <WalletMultiButton className="!bg-cyber-gradient !border-none !text-black !font-cyber !font-semibold !px-6 !py-3 !rounded-lg hover:!opacity-80 transition-all duration-300 flex items-center space-x-2">
          <Wallet className="w-5 h-5" />
          <span>{t('header.connectWallet')}</span>
        </WalletMultiButton>
      </motion.div>
    )
  }

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="flex items-center space-x-3 bg-dark-secondary border border-cyber-blue/30 rounded-lg px-4 py-3 hover:border-cyber-blue/60 transition-all duration-300"
      >
        {/* 钱包图标 */}
        <div className="w-8 h-8 rounded-full bg-cyber-blue/20 flex items-center justify-center">
          {wallet?.adapter.icon ? (
            <img 
              src={wallet.adapter.icon} 
              alt={wallet.adapter.name}
              className="w-5 h-5 rounded-full"
            />
          ) : (
            <Wallet className="w-5 h-5 text-cyber-blue" />
          )}
        </div>

        {/* 地址和余额 */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2">
            <span className="text-white font-mono text-sm">
              {publicKey && shortenAddress(publicKey.toString())}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={copyAddress}
              className="text-gray-400 hover:text-cyber-blue transition-colors"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
          </div>
          <span className="text-gray-400 text-xs flex items-center space-x-1">
            {loading ? (
              <>
                <Loader className="w-3 h-3 animate-spin" />
                <span>{t('wallet.loading')}</span>
              </>
            ) : (
              <span>{formattedBalance} SOL</span>
            )}
          </span>
        </div>
      </motion.button>

      {/* 复制成功提示 */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded text-xs whitespace-nowrap z-50"
        >
          {t('wallet.addressCopied')}
        </motion.div>
      )}

      {/* 下拉菜单 */}
      <div className="absolute right-0 top-full mt-2 w-72 bg-dark-secondary border border-cyber-blue/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="p-4">
          {/* 钱包信息 */}
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-dark-tertiary">
            <div className="w-10 h-10 rounded-full bg-cyber-blue/20 flex items-center justify-center">
              {wallet?.adapter.icon ? (
                <img 
                  src={wallet.adapter.icon} 
                  alt={wallet.adapter.name}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <Wallet className="w-6 h-6 text-cyber-blue" />
              )}
            </div>
            <div>
              <div className="text-white font-cyber font-bold">
                {wallet?.adapter.name}
              </div>
              <div className="text-green-400 text-sm flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{t('wallet.connected')}</span>
              </div>
            </div>
          </div>

          {/* 账户详情 */}
          <div className="space-y-4 mb-4">
            <div>
              <div className="text-gray-400 text-xs mb-2">{t('wallet.address')}</div>
              <div className="flex items-center justify-between bg-dark-tertiary/50 rounded-lg px-3 py-2">
                <span className="text-white font-mono text-sm">
                  {publicKey && shortenAddress(publicKey.toString())}
                </span>
                <button
                  onClick={copyAddress}
                  className="text-cyber-blue hover:text-white transition-colors p-1 hover:bg-cyber-blue/20 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs mb-2">{t('wallet.balance')}</div>
              <div className="bg-dark-tertiary/50 rounded-lg px-3 py-2">
                {loading ? (
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{t('wallet.fetchingBalance')}</span>
                  </div>
                ) : (
                  <div className="text-white font-mono text-lg">
                    {formattedBalance} SOL
                  </div>
                )}
              </div>
            </div>

            {/* 网络信息 */}
            <div>
              <div className="text-gray-400 text-xs mb-2">{t('wallet.network')}</div>
              <div className="bg-dark-tertiary/50 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-white text-sm">Devnet</span>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-2">
            <button 
              onClick={viewOnSolscan}
              className="w-full flex items-center justify-center space-x-2 bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue py-2 rounded transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">{t('wallet.viewOnSolscan')}</span>
            </button>
            
            <button
              onClick={disconnect}
              className="w-full flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">{t('wallet.disconnect')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletButton 