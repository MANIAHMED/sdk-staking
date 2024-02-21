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

import { useTokenIds } from "~/hooks/locking/usetokenIds";
import { useNFTBalance } from "~/hooks/locking/useNftBalance";
import { useLocking } from "~/hooks/locking/useLocking";
import { useBalanceCheck } from "~/hooks/locking/useBalanceCheck";
import { useNFTBalanceAT } from "~/hooks/locking/useNftBalanceAt";
import { useCalculateVotingPower } from "~/hooks/locking/useCalculateVotingPower";
import { useLockedTokenStatistics } from "~/hooks/locking/useLockedTokenStatistics";
import { useClaimable } from "~/hooks/locking/useClaimable";
import { useClaim } from "~/hooks/locking/useClaim";
import { useWithDraw } from "~/hooks/locking/useWithDraw";
import { useIncreaseLockingAmount } from "~/hooks/locking/useIncreaseLockingAmount";
import { useIncreaseLockingTime } from "~/hooks/locking/useIncreaseLockingTime";
//voting escrow
//0xB4D2c9384af8AEFfC9810feec3914E59E24070eB

export const LockingPage = () => {
  const { wallet } = useMetaMask();
  const {
    locking,
    amount,
    setAmount,
    period,
    setPeriod,
    lockingHash,
    handleLock,
  } = useLocking();
  console.log("LLL", locking)

  const { balance, checkBalance } = useBalanceCheck(
    locking,
    wallet.accounts[0]
  );

  const { tokenIds, getTokenIds } = useTokenIds(
    locking,
    wallet.accounts[0],
    balance
  );
  const { balanceOfNft, nftTokenId, handleNftTokenIdChange, balanceOfNFT } =
    useNFTBalance(locking);

  const {
    balanceOfNFTAt,
    setTokenId,
    tokenId,
    timePeriod,
    setTimePeriod,
    BalanceOfNftAt,
  } = useNFTBalanceAT(locking);

  const {
    votingTokenId,
    setVotingTokenId,
    setVotingPower,
    votingPower,
    CalculateVotingPower,
  } = useCalculateVotingPower(locking);

  const {
    statisticsTokenId,
    setStatisticsTokenId,
    CalculateStatistics,
    tokenStatistics,
    setTokenStatistics,
  } = useLockedTokenStatistics(locking);
  const {
    claimableTokenId,
    setClaimableTokenId,
    Claimable,
    claimableAmount,
    setClaimableAmount,
  } = useClaimable(locking);
  const { claimTokenId, setClaimTokenId, claimHash, setClaimHash, Claim } =
    useClaim(locking);
  const {
    withDrawTokenId,
    setWithDrawTokenId,
    withDrawHash,
    setWithDrawHash,
    WithDraw,
  } = useWithDraw(locking);

  const {
    increasedAmountTokenId,
    setIncreasedAmountTokenId,
    increasedAmountValue,
    setIncreasedAmountValue,
    increaseAmountHash,
    IncreaseAmount,
  } = useIncreaseLockingAmount(locking);

  const {
    increasedTimeTokenId,
    setIncreasedTimeTokenId,
    increasedTimeValue,
    setIncreasedTimeValue,
    increaseTimeHash,
    IncreaseTime,
  } = useIncreaseLockingTime(locking);

  return (
    <div>
      <div
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }}
      >
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
          </select>
        </label>
        <button onClick={handleLock}>Lock</button>
        <div>Tx Hash :{lockingHash}</div>
      </div>
      <div
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }}
      >
        <button onClick={checkBalance}>CheckBalance</button>
        <div>Balance: {balance}</div>
      </div>
      <div
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }}
      >
        <button onClick={() => getTokenIds()}>Get Token IDs</button>
        <div>
          {" "}
          TokenIds:
          {tokenIds &&
            tokenIds.map((tokenId: any, index: any) => (
              <div
                key={index}
              >{`Token ID for iteration ${index}: ${tokenId}`}</div>
            ))}
        </div>
      </div>
      <div
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }}
      >
        Balance of Nft
        <input
          type="text"
          placeholder="Enter NFT Token ID"
          value={nftTokenId}
          onChange={handleNftTokenIdChange}
        />
        <button onClick={balanceOfNFT}>Balance of Nft</button>
        <div> Balance:{formatChainAsNum(balanceOfNft?._hex)}</div>
      </div>

      <div
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }}
      >
        <div>Balance of NFT at</div>
        <label>
          TOKEN ID
          <input
            type="number"
            placeholder="Enter amount"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </label>
        <label>
          Timestamp Unix:
          <input
            type="number"
            placeholder="Enter amount"
            value={timePeriod}
            onChange={(e) => setTimePeriod(Number(e.target.value))}
          />
        </label>
        <button onClick={BalanceOfNftAt}>Submit</button>
        <div>Balance At: {formatChainAsNum(balanceOfNFTAt?._hex)}</div>
      </div>

      <div
        style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }}
      >
        <div>Check Voting Power</div>
        <input
          type="number"
          placeholder="Enter amount"
          value={votingTokenId}
          onChange={(e) => setVotingTokenId(e.target.value)}
        />
        <>
          <button onClick={CalculateVotingPower}>Calculate</button>
          <>Voting Power Percentage:{votingPower}</>
        </>
      </div>

      <div style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }} >
        <div>Check Token Locked Statistics</div>
        <input
          type="number"
          placeholder="Enter Id"
          value={statisticsTokenId}
          onChange={(e) => setStatisticsTokenId(e.target.value)}
        />{" "}
        <>
          {" "}
          <button onClick={CalculateStatistics}>Calculate</button>
          <>Token Statsitics:{ formatChainAsNum(tokenStatistics)}</>
        </>
      </div>



      <div style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }} >
        <>Check Claimables</>
        <input
          type="number"
          placeholder="Enter Id"
          value={claimableTokenId}
          onChange={(e) => setClaimableTokenId(e.target.value)}
        />
        <>
          <button onClick={Claimable}>Calculate</button>
          <>ClaimableAmount: {formatChainAsNum(claimableAmount)}</>
        </>
      </div>






      <div style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }} >
        <>WithDraw Tokens </>
        <input
          type="number"
          placeholder="Enter amount"
          value={withDrawTokenId}
          onChange={(e) => setWithDrawTokenId(e.target.value)}
        />
        <>
          <button onClick={WithDraw}>Calculate</button>
          <>{withDrawHash}</>
        </>
      </div>

      <div style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }} >
        <>Increase Locking Amount </>
        <input
          type="number"
          placeholder="Id"
          value={increasedAmountTokenId}
          onChange={(e) => setIncreasedAmountTokenId(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Enter Value"
          value={increasedAmountValue}
          onChange={(e) => setIncreasedAmountValue(e.target.value)}
        />{" "}
        <>
          {" "}
          <button onClick={IncreaseAmount}>Calculate</button>
          <>Increased Amount Hash: {increaseAmountHash}</>
        </>
      </div>


      <div style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }} >
        <>Claim Rewards and Amount </>
        <input
          type="number"
          placeholder="Enter Id"
          value={claimTokenId}
          onChange={(e) => setClaimTokenId(e.target.value)}
        />
        <>
          <button onClick={Claim}>Calculate</button>
          <>Claim Hash:{claimHash}</>
        </>
      </div>   
      
      <div style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#efefef" }} >
        <>Increase Locking Time </>
        <input
          type="number"
          placeholder="Id"
          value={increasedTimeTokenId}
          onChange={(e) => setIncreasedTimeTokenId(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Enter Value"
          value={increasedTimeValue}
          onChange={(e) => setIncreasedTimeValue(e.target.value)}
        />
        <>
          <button onClick={IncreaseTime}>Calculate</button>
          <>Increased Lock TIme Hash: {increaseTimeHash}</>
        </>
      </div>
    </div>
  );
};
