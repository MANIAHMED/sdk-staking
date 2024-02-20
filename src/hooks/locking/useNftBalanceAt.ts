import { useState } from "react";

export const useNFTBalanceAT = (locking: any) => {
  const [tokenId, setTokenId] = useState<any>();
  const [timePeriod, setTimePeriod] = useState<number>(604800);
  const [balanceOfNFTAt, setBalanceOfNFTAt] = useState<any>();

  const BalanceOfNftAt = async () => {
    const balance = await locking.balanceOfNFTAt(tokenId, timePeriod);

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
