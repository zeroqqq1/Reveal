import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'

export const useWalletBalance = () => {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!connected || !publicKey) {
      setBalance(0)
      return
    }

    const getBalance = async () => {
      try {
        setLoading(true)
        const lamports = await connection.getBalance(publicKey)
        const sol = lamports / LAMPORTS_PER_SOL
        setBalance(sol)
      } catch (error) {
        console.error('Error fetching balance:', error)
        setBalance(0)
      } finally {
        setLoading(false)
      }
    }

    getBalance()

    // 订阅余额变化
    const subscriptionId = connection.onAccountChange(
      publicKey,
      (accountInfo) => {
        const sol = accountInfo.lamports / LAMPORTS_PER_SOL
        setBalance(sol)
      }
    )

    return () => {
      connection.removeAccountChangeListener(subscriptionId)
    }
  }, [connection, publicKey, connected])

  return {
    balance,
    loading,
    formattedBalance: balance.toFixed(4)
  }
} 