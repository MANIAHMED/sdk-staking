import { useState } from "react";

export const useNFTBalance = (locking:any) => {
  const [balanceOfNft, setBalanceOfNft] = useState<any>(0);
  const [nftTokenId, setNftTokenId] = useState<string>("");

  console.log("nftTOken", nftTokenId)

  const handleNftTokenIdChange = (e:any) => {
    setNftTokenId(e.target.value);
  };

  const balanceOfNFT = async () => {
    try {
      if (!nftTokenId || isNaN(parseInt(nftTokenId))) {
        return;
      }
      const response = await locking.balanceOfNFT(parseInt(nftTokenId));
      console.log("RRR",response)
      setBalanceOfNft(response);
    } catch (error) {
      console.error("Error checking balance of NFT:", error);
    }
  };

  return { balanceOfNft, nftTokenId, handleNftTokenIdChange, balanceOfNFT };
};
