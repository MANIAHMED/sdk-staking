  import { useMetaMask } from "~/hooks/useMetaMask";
  import { useEffect, useState } from "react";
  import { Locking, Wallet } from "@eltk/staking-sdk";
  import { formatChainAsNum } from "~/utils";
  import _votingEscrow from "../abi/votingEscrow.json";
  import {
    BaseContract,
    Contract,
    ContractFactory,
  } from "@ethersproject/contracts";
  import { ethers } from "ethers";
  import { useLocking } from "~/hooks/useLocking";
import { useBalanceCheck } from "~/hooks/useBalanceCheck";
import { useTokenIds } from "~/hooks/usetokenIds";
 //voting escrow
    //0xB4D2c9384af8AEFfC9810feec3914E59E24070eB

  export const LockingPage = () => {
    const { wallet } = useMetaMask();
    const { locking, amount, setAmount, period, setPeriod, handleLock } = useLocking();
    const { balance, checkBalance } = useBalanceCheck(locking, wallet.accounts[0]);
    const { tokenIds, getTokenIds } = useTokenIds(locking, wallet.accounts[0], balance);


    const [balanceOfNft, setBalanceOfNft] = useState<any>();
    const [nftTokenId, setNftTokenId] = useState<string>("");

    const handleNftTokenIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNftTokenId(e.target.value);
    };
   


    useEffect(() => {
      (async () => {
        const wallet = await Wallet.getSignerFromMetaMask();
        console.log("wallet", wallet);
        const locking = new Locking(
          wallet,
          "0xB4D2c9384af8AEFfC9810feec3914E59E24070eB"
        );
      
      })();
    }, []);

 



    const BalanceOfNft = async () => {
      try {
        if (!nftTokenId || isNaN(parseInt(nftTokenId))) {
          console.error("Please enter a valid NFT Token ID.");
          return;
        }
        const response = await locking.balanceOfNFT(parseInt(nftTokenId));
        setBalanceOfNft(response);
        console.log("Balance of NFT:", response);
        // Handle the response as needed
      } catch (error) {
        console.error("Error checking balance of NFT:", error);
      }
    };

    return (
      <div>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>Locking Hooks</div>
        <label>
          Amount of Tokens
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Locking Period:
          <select
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
          >
            <option value={604800}>1 week</option>
            <option value={1209600}>2 weeks</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <button onClick={handleLock}>Lock</button>
        <div>
          <button onClick={checkBalance}>CheckBalance</button>
          <div>{balance}</div>
        </div>
        <div>
        <button onClick={() => getTokenIds()}>Get Token IDs</button>
          <div>
            {tokenIds.map((tokenId: any, index: any) => (
              <div
                key={index}
              >{`Token ID for iteration ${index}: ${tokenId}`}</div>
            ))}
          </div>
        </div>

        <div>
          Balance of Nft
          <input
            type="text"
            placeholder="Enter NFT Token ID"
            value={nftTokenId}
            onChange={handleNftTokenIdChange}
          />
          <button onClick={BalanceOfNft}>Balance of Nft</button>
        </div>

        <div>{balanceOfNft?._hex}</div>
      </div>
    );
  };
