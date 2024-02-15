import { useEffect, useState } from "react";
import { Locking, Wallet } from "@eltk/staking-sdk";
import { VOTING_ESCROW } from "~/components/constants";

export const useLocking = () => {
  const [locking, setLocking] = useState<any>();
  const [amount, setAmount] = useState<string>("");
  const [period, setPeriod] = useState<number>(604800);

  useEffect(() => {
    (async () => {
      const wallet = await Wallet.getSignerFromMetaMask();
      const lockingInstance = new Locking(
        wallet,
        VOTING_ESCROW
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
