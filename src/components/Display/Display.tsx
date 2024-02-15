import { useMetaMask } from '~/hooks/useMetaMask'
import { formatChainAsNum } from '~/utils'
import styles from './Display.module.css'
import { LockingPage } from '~/pages/LockingPage'
import { StakingPage } from '~/pages/StakingPage'

export const Display = () => {

  const { wallet } = useMetaMask()

  return (
    <div className={styles.display}>
      <div>Wallet Info</div>
      {wallet.accounts.length > 0 &&
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      }
      <LockingPage />
      <StakingPage />
    </div>
  )
}