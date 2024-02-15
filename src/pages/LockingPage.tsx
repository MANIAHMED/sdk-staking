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

export const LockingPage = () => {
  const { wallet } = useMetaMask();
  const [locking, setLocking] = useState<any>();
  const [amount, setAmount] = useState<string>("");
  const [period, setPeriod] = useState<number>(604800);
  const [balance, setBalance] = useState<any>(0);
  const [tokenIds, setTokenIds] = useState<any[]>([]); // Initialize with an empty array
  const [balanceOfNft, setBalanceOfNft] = useState<any>();
  const [nftTokenId, setNftTokenId] = useState<string>("");
  const handleNftTokenIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftTokenId(e.target.value);
  };
  //voting escrow
  //0xB4D2c9384af8AEFfC9810feec3914E59E24070eB

  //   useEffect(() => {

  //   });

  useEffect(() => {
    (async () => {
      const wallet = await Wallet.getSignerFromMetaMask();
      console.log("wallet", wallet);
      const locking = new Locking(
        wallet,
        "0xB4D2c9384af8AEFfC9810feec3914E59E24070eB"
      );
      setLocking(locking);
      //   const _votingEscrow = new ethers.Contract(
      //     "0xB4D2c9384af8AEFfC9810feec3914E59E24070eB",
      //     _votingEscrow?.abi,
      //     wallet
      //   );
      //   try {
      //     const response = await testAbi.callStatic.locked(1);
      //   } catch (error) {
      //     console.log("errrr", error);
      //   }
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
    console.log("response", response);
  };

  const BalanceCheck = async () => {
    console.log("balancing", wallet.accounts);
    console.log("LOCKING", locking);
    try {
      const response = await locking.balanceOf(wallet.accounts[0]);
      console.log("balance", response);

      setBalance(formatChainAsNum(response._hex));
      //   setBalance(response);
    } catch (error) {
      console.error("Error checking balance:", error);
    }
  };

  const GetTokenIds = async (balance: any) => {
    const tokenIdArray = [];

    for (let i = 0; i < balance; i++) {
      try {
        const response = await locking.getTokenId(wallet.accounts[0], i); // You can adjust the second parameter as needed
        const formattedResponse = formatChainAsNum(response._hex);
        tokenIdArray.push(formattedResponse);
        console.log(`TokenId for iteration ${i}:`, formattedResponse);
      } catch (error) {
        console.error(`Error getting tokenId for iteration ${i}:`, error);
        // Handle errors as needed
        tokenIdArray.push(null); // Push a placeholder value if an error occurs
      }
    }

    console.log("TokenIds:", tokenIdArray);
    setTokenIds(tokenIdArray);
  };

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
      <div style={{fontSize:18, fontWeight:'bold'}}>Locking Hooks</div>
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
      <button onClick={BalanceCheck}>CheckBalance</button>
      <div>{balance}</div>
      </div>
      <div>
      <button onClick={() => GetTokenIds(balance)}>get Tokens Id</button>
      <div>
        {tokenIds.map((tokenId: any, index: any) => (
          <div key={index}>{`Token ID for iteration ${index}: ${tokenId}`}</div>
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
