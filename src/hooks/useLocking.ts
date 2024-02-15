// useLocking.js
import { useEffect, useState } from "react";
import { Locking, Wallet } from "@eltk/staking-sdk";

export const useLocking = () => {
  const [locking, setLocking] = useState<any>();
  const [amount, setAmount] = useState<string>("");
  const [period, setPeriod] = useState<number>(604800);

  useEffect(() => {
    (async () => {
      const wallet = await Wallet.getSignerFromMetaMask();
      const lockingInstance = new Locking(
        wallet,
        "0xB4D2c9384af8AEFfC9810feec3914E59E24070eB"
      );
      setLocking(lockingInstance);
    })();
  }, []);

  const handleLock = async () => {
    // Validate the amount here before calling createLock
    if (!amount || isNaN(parseFloat(amount))) {
      console.error("Please enter a valid amount of tokens.");
      return;
    }
    const amountAsString = amount.toString();

    const response = await locking.createLock(amountAsString, period);
    console.log("response", response);
  };

  return {
    locking,
    amount,
    setAmount,
    period,
    setPeriod,
    handleLock,
  };
};
