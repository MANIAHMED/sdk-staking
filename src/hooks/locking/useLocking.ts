import { useEffect, useState } from "react";
import { Locking, StakerWallet } from "@eltk/staking-sdk";
import { VOTING_ESCROW } from "~/components/constants";

export const useLocking = () => {
  const [locking, setLocking] = useState<any>();
  const [amount, setAmount] = useState<string>("");
  const [period, setPeriod] = useState<number>(604800);
  const [lockingHash, setLockingHash] = useState<any>();

  useEffect(() => {
    (async () => {
      console.log("321221");
      const wallet = await StakerWallet.getSignerFromMetaMask();
      console.log("321221", typeof wallet);

      const lockingInstance = await Locking.getInstance(wallet);
      setLocking(lockingInstance);
    })();
  }, []);

  const handleLock = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      console.error("Please enter a valid amount of tokens.");
      return;
    }
    const amountAsString = amount.toString();

    const response = await locking.createLock(amountAsString, period);
    setLockingHash(response?.hash);
  };

  return {
    locking,
    amount,
    setAmount,
    period,
    setPeriod,
    lockingHash,
    handleLock,
  };
};
