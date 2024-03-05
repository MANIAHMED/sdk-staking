import { useEffect, useState } from "react";
import _nonFungibleTokenManager from "../abi/nonFungiblePositionManager.json";

import { ethers } from "ethers";
import { Wallet } from "@eltk/staking-sdk";
import { useMetaMask } from "~/hooks/useMetaMask";
import { STAKER_CONTRACT, formatChainAsNum } from "~/utils";
import { useTokenIds } from "~/hooks/staking/useTokenIds";
import { useStaking } from "~/hooks/staking/useStaking";

export const StakingPage = () => {
  const { wallet: connectedWallet } = useMetaMask();
  const [wallet, setWallet] = useState<any>();
  // const [tokenIds, setTokenIds] = useState<any[]>([]);

  const { staking } = useStaking();

  useEffect(() => {
    (async () => {
      const wallet = await Wallet.getSignerFromMetaMask();
      setWallet(wallet);
    })();
  }, []);

  const positionManager = new ethers.Contract(
    "0x5cc8dcb7a2391d07043E5746b55CB1637a67ddf1",
    _nonFungibleTokenManager?.abi,
    wallet
  );

  const Transfer = async () => {
    try {
      const response = await positionManager.safeTransferFrom(
        connectedWallet.accounts[0],
        "0x8bb58B4cD1000D15AFe7A21e7B35a899b3AB0FF3",
        2
      );
    } catch (error) {
      console.log("errrr", error);
    }
  };
  const { tokenIds, GetTokenIds } = useTokenIds(
    positionManager,
    connectedWallet
  );

  // const GetTokenIds = async () => {
  //   const balance = await positionManager.balanceOf(
  //     connectedWallet.accounts[0]
  //   );
  //   const tokenIdArray = [];

  //   for (let i = 0; i < balance; i++) {
  //     try {
  //       const response = await positionManager.tokenOfOwnerByIndex(
  //         connectedWallet.accounts[0],
  //         i
  //       );
  //       const formattedResponse = formatChainAsNum(response._hex);
  //       tokenIdArray.push(formattedResponse);
  //     } catch (error) {
  //       console.error(`Error getting tokenId for iteration ${i}:`, error);
  //       tokenIdArray.push(null);
  //     }
  //   }

  //   setTokenIds(tokenIdArray);
  // };
  const [stakingTokenId, setStakingTokenId] = useState<any>("");
  const handleStake = async () => {
    const response = await staking.stakePosition(
      connectedWallet,
      STAKER_CONTRACT,
      stakingTokenId
    );
    console.log("RESPONSE", response);
  };


  const [unstakingTokenId, setUnstakingTokenId] = useState<any>("");
  const handleUnStake = async () => {
    const response = await staking.unStakePosition(
      stakingTokenId,
      STAKER_CONTRACT,
    );
    console.log("RESPONSE", response);
  };



  const [harvestingTokenId, setharvestingTokenId] = useState<any>("");
  const handleharvest =async ()=>{
    const response = await staking.harvestRewards(
      harvestingTokenId,
      STAKER_CONTRACT,
    );
    console.log("RESPONSE", response);
  }

  return (
    <>
      ----------------------------------------------------------------------------------------------------------------------------
      {/* <div style={{fontSize:18, fontWeight:'bold'}}>Staking Hooks</div>
      <button onClick={GetTokenIds}>GetIds Of Address</button>
      <div>
        {tokenIds.map((tokenId: any, index: any) => (
          <div key={index}>{`Token ID for iteration ${index}: ${tokenId}`}</div>
        ))}
      </div> */}
      {/* <input />

      <button onClick={Transfer}>Stake</button> */}
      {/* <div>
        <button>withdraw</button>
      </div> */}
      <div>
        <div>
        <input
            type="number"
            placeholder="Enter Token Id"
            value={harvestingTokenId}
            onChange={(e) => setharvestingTokenId(e.target.value)}
          />
        <button  onClick={()=> handleHarvest()}>claim</button>
        </div>

        <div>
          <input
            type="number"
            placeholder="Enter Token Id"
            value={stakingTokenId}
            onChange={(e) => setStakingTokenId(e.target.value)}
          />
          <button onClick={() => handleStake()}>Stake</button>
        </div>


        <div>
        <input
            type="number"
            placeholder="Enter Token Id"
            value={unstakingTokenId}
            onChange={(e) => setUnstakingTokenId(e.target.value)}
          />

        <button onClick={() => handleUnStake()}>Unstake</button>

        </div>

      </div>
    </>
  );
};
