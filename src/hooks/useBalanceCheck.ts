import { useState } from "react";
import { formatChainAsNum } from "~/utils";

export const useBalanceCheck = (locking:any, account:any) => {
  const [balance, setBalance] = useState<any>(0);

  const checkBalance = async () => {
    try {
      const response = await locking.balanceOf(account);
      setBalance(formatChainAsNum(response._hex));
    } catch (error) {
      console.error("Error checking balance:", error);
    }
  };

  return { balance, checkBalance };
};
