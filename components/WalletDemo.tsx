'use client'

import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { 
  Wallet, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useState } from 'react'

const WalletDemo = () => {
  const { connected, publicKey, connecting } = useWallet()
  const { connection } = useConnection()
  const { balance, loading, formattedBalance } = useWalletBalance()
  const { t } = useLanguage()
  const [refreshing, setRefreshing] = useState(false)

  // 手动刷新余额
  const refreshBalance = async () => {
    if (!publicKey) return
    setRefreshing(true)
    try {
      await connection.getBalance(publicKey)
    } catch (error) {
      console.error('刷新余额失败:', error)
    } finally {
      setRefreshing(false)
    }
  }

  // 获取网络信息
  const getNetworkInfo = () => {
    const rpcUrl = connection.rpcEndpoint
    if (rpcUrl.includes('devnet')) return { name: 'Devnet', color: 'text-orange-400' }
    if (rpcUrl.includes('testnet')) return { name: 'Testnet', color: 'text-purple-400' }
    if (rpcUrl.includes('mainnet')) return { name: 'Mainnet', color: 'text-green-400' }
    return { name: 'Custom', color: 'text-blue-400' }
  }

  const networkInfo = getNetworkInfo()

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-secondary/50 backdrop-blur-md rounded-lg border border-cyber-blue/30 p-6"
      >
        <div className="text-center">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-cyber font-bold text-white mb-2">
            钱包未连接
          </h3>
          <p className="text-gray-400 mb-4">
            连接您的Solana钱包以体验完整功能
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Shield className="w-4 h-4" />
              <span>查看余额</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Zap className="w-4 h-4" />
              <span>执行交易</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Users className="w-4 h-4" />
              <span>参与治理</span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-secondary/50 backdrop-blur-md rounded-lg border border-cyber-blue/30 p-6"
    >
      {/* 连接状态 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-cyber font-bold">钱包已连接</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${networkInfo.color.replace('text-', 'bg-')}`}></div>
          <span className={`text-sm ${networkInfo.color}`}>{networkInfo.name}</span>
        </div>
      </div>

      {/* 钱包信息卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 地址信息 */}
        <div className="bg-dark-tertiary/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-400 text-sm">钱包地址</h4>
            <Wallet className="w-4 h-4 text-cyber-blue" />
          </div>
          <div className="font-mono text-white text-sm break-all">
            {publicKey?.toString()}
          </div>
        </div>

        {/* 余额信息 */}
        <div className="bg-dark-tertiary/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-gray-400 text-sm">SOL余额</h4>
            <button
              onClick={refreshBalance}
              disabled={refreshing || loading}
              className="text-cyber-blue hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            {loading || refreshing ? (
              <div className="text-gray-400 text-sm">加载中...</div>
            ) : (
              <>
                <span className="font-mono text-2xl font-bold text-white">
                  {formattedBalance}
                </span>
                <span className="text-cyber-blue font-cyber">SOL</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 功能状态 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <div>
            <div className="text-green-400 text-sm font-cyber">余额查询</div>
            <div className="text-gray-400 text-xs">可用</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <div>
            <div className="text-green-400 text-sm font-cyber">交易签名</div>
            <div className="text-gray-400 text-xs">就绪</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          <div>
            <div className="text-orange-400 text-sm font-cyber">治理权限</div>
            <div className="text-gray-400 text-xs">需要RCT代币</div>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="border-t border-dark-tertiary pt-4">
        <h4 className="text-white font-cyber font-bold mb-3">快速操作</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button 
            className="flex items-center justify-center space-x-2 bg-cyber-blue/20 hover:bg-cyber-blue/30 text-cyber-blue py-2 px-4 rounded transition-colors"
            onClick={() => window.open(`https://solscan.io/account/${publicKey}`, '_blank')}
          >
            <TrendingUp className="w-4 h-4" />
            <span>查看交易历史</span>
          </button>

          <button 
            disabled
            className="flex items-center justify-center space-x-2 bg-gray-500/20 text-gray-400 py-2 px-4 rounded cursor-not-allowed"
          >
            <Zap className="w-4 h-4" />
            <span>获取测试代币</span>
          </button>
        </div>
      </div>

      {/* 安全提示 */}
      <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
        <div className="flex items-start space-x-2">
          <Shield className="w-4 h-4 text-amber-400 mt-0.5" />
          <div className="text-xs text-amber-200">
            <div className="font-bold mb-1">安全提示</div>
            <div>请确保您正在使用官方网站，永远不要分享您的私钥或助记词。</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WalletDemo 