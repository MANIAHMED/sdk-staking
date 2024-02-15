
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Locking, Wallet } from "elektrik-staking-sdk";
export default function Home() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const [locking, setLocking] = useState<any>();
  const [wallet, setWallet] = useState<any>(undefined);
  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };
  useEffect(() => {
    (async () => {
      const wallet = await Wallet.getSignerFromMetaMask();
      console.log({ wallet });
      setWallet(wallet);
      const locking = new Locking(
        wallet,
        "0xB4D2c9384af8AEFfC9810feec3914E59E24070eB"
      );
      setLocking(locking);
    })();
  }, []);
  
  const onClick = async () => {
    const response = await locking.createLock("50000000000000000", 604800);
  };
  return (
    <>
       
      <header>
        <div
          className={styles.backdrop}
          style={{
            opacity: isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
          }}
        />
        <div className={styles.header}>
          <div className={styles.logo}>
          
          </div>
          <div className={styles.buttons}>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isNetworkSwitchHighlighted ? styles.highlightSelected : ``
              }`}
            >
            </div>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isConnectHighlighted ? styles.highlightSelected : ``
              }`}
            >
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <h1>Next.js Starter Template</h1>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isNetworkSwitchHighlighted ? styles.highlightSelected : ``
              }`}
            >
              <button
                style={{
                  height: "20px",
                  width: "100px",
                  borderRadius: "2px",
                }}
                onClick={onClick}
              >
                Create Lock
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}













