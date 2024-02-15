import { useMetaMask } from "~/hooks/useMetaMask";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    disconnectMetaMask,
  } = useMetaMask();


  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>Staking Sdk Mocks</div>
        <div className={styles.rightNav}>
          {!hasProvider && (
            <a href="https://metamask.io" target="_blank" rel="noreferrer">
              Install MetaMask
            </a>
          )}
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
            <button disabled={isConnecting} onClick={connectMetaMask}>
              Connect MetaMask
            </button>
          )}
          {hasProvider && wallet.accounts.length > 0 && (
            <button disabled={isConnecting} onClick={disconnectMetaMask}>
              Disconnect MetaMask
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
