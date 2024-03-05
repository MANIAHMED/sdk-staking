import { useEffect, useState } from "react";
import { Staking, StakerWallet } from "@eltk/staking-sdk";

export const useStaking = () => {
  const [staking, setStaking] = useState<any>();

  useEffect(() => {
    (async () => {
      const wallet = await StakerWallet.getSignerFromMetaMask();

      const stakingInstance = await Staking.getInstance(wallet);
      setStaking(stakingInstance);
    })();
  }, []);

  return {
    staking,
  };
};
