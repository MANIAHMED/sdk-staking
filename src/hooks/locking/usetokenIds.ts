import { useState } from "react";
import { formatChainAsNum } from "~/utils";

export const useTokenIds = (locking:any, account:any, balance:any) => {
  const [tokenIds, setTokenIds] = useState<any[]>([]);

  const getTokenIds = async () => {
    const tokenIdArray = [];

    for (let i = 0; i < balance; i++) {
      try {
        const response = await locking.getTokenId(account, i);
        const formattedResponse = formatChainAsNum(response._hex);
        tokenIdArray.push(formattedResponse);
      } catch (error) {
        console.error(`Error getting tokenId for iteration ${i}:`, error);
        tokenIdArray.push(null);
      }
    }

    setTokenIds(tokenIdArray);
  };

  return { tokenIds, getTokenIds };
};
