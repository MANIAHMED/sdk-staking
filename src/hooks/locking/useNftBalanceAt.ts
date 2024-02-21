import { useState } from "react";

export const useNFTBalanceAT = (locking: any) => {
  const [tokenId, setTokenId] = useState<any>();
  const [timePeriod, setTimePeriod] = useState<number>(604800);
  const [balanceOfNFTAt, setBalanceOfNFTAt] = useState<any>();

  const BalanceOfNftAt = async () => {
    console.log("BABBABA", tokenId,timePeriod)
    const balance = await locking.balanceOfNFTAt(tokenId, timePeriod);
    console.log("BABBABA111111", balance)

    setBalanceOfNFTAt(balance);
  };

  return {
    locking,
    tokenId,
    timePeriod,
    setTokenId,
    setTimePeriod,
    BalanceOfNftAt,
    balanceOfNFTAt,
  };
};
