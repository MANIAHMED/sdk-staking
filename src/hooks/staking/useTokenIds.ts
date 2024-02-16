import { useEffect, useState } from "react";
import { formatChainAsNum } from "~/utils";

export const useTokenIds = (positionManager: any, connectedWallet: any) => {
  const [tokenIds, setTokenIds] = useState<any[]>([]);
  const [balance, setBalance] = useState<any>();

  // useEffect(() => {
  //     const getTokenIds = async () => {
  //       try {
  //         const balance = await positionManager.balanceOf(
  //           connectedWallet.accounts[0]
  //         );
  //         const tokenIdArray = [];

  //         for (let i = 0; i < balance; i++) {
  //           try {
  //             const response = await positionManager.tokenOfOwnerByIndex(
  //               connectedWallet.accounts[0],
  //               i
  //             );
  //             const formattedResponse = formatChainAsNum(response._hex);
  //             tokenIdArray.push(formattedResponse);
  //           } catch (error) {
  //             console.error(`Error getting tokenId for iteration ${i}:`, error);
  //             tokenIdArray.push(null);
  //           }
  //         }

  //         setTokenIds(tokenIdArray);
  //       } catch (error) {
  //         console.error('Error getting tokenIds:', error);
  //       }
  //     };

  //     getTokenIds();
  //   }, [positionManager, connectedWallet]);

  useEffect(() => {
    (async () => {
      const balance = await positionManager.balanceOf(
        connectedWallet.accounts[0]
      );
      setBalance(balance);
    })();
  }, [positionManager, connectedWallet]);

  const GetTokenIds = async () => {
    const tokenIdArray = [];
    for (let i = 0; i < balance; i++) {
      try {
        const response = await positionManager.tokenOfOwnerByIndex(
          connectedWallet.accounts[0],
          i
        );
        const formattedResponse = formatChainAsNum(response._hex);
        tokenIdArray.push(formattedResponse);
      } catch (error) {
        console.error(`Error getting tokenId for iteration ${i}:`, error);
        tokenIdArray.push(null);
      }
    }

    setTokenIds(tokenIdArray);
  };

  return { tokenIds, GetTokenIds };
};
