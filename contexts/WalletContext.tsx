'use client'

import React, { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

// 导入钱包样式
require('@solana/wallet-adapter-react-ui/styles.css')

interface WalletContextProviderProps {
  children: React.ReactNode
}

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  // 从环境变量获取网络配置，默认使用devnet
  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Devnet
  
  // 使用自定义RPC端点或默认端点
  const endpoint = useMemo(() => {
    const customRpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL
    if (customRpcUrl) {
      return customRpcUrl
    }
    return clusterApiUrl(network)
  }, [network])

  // 配置支持的钱包适配器
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
    ],
    []
  )

  // 钱包连接错误处理
  const onError = (error: any) => {
    console.error('钱包连接错误:', error)
    // 这里可以添加更多的错误处理逻辑，比如显示通知
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
} 