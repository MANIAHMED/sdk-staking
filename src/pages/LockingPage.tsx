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
  const { locking, amount, setAmount, period, setPeriod, handleLock } =
    useLocking();
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


  const {    increasedTimeTokenId,
    setIncreasedTimeTokenId,
    increasedTimeValue,
    setIncreasedTimeValue,
    increaseTimeHash,
    IncreaseTime} = useIncreaseLockingTime(locking);
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
          {tokenIds &&
            tokenIds.map((tokenId: any, index: any) => (
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
        <button onClick={balanceOfNFT}>Balance of Nft</button>
      </div>
      {balanceOfNft ? <div>{formatChainAsNum(balanceOfNft?._hex)}</div> : <></>}{" "}
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
      {balanceOfNFTAt && balanceOfNFTAt}
      <div>Check Voting Power</div>
      <input
        type="number"
        placeholder="Enter amount"
        value={votingTokenId}
        onChange={(e) => setVotingTokenId(e.target.value)}
      />{" "}
      <>
        {" "}
        <button onClick={CalculateVotingPower}>Calculate</button>
        <>{votingPower}</>
      </>
      <>
        <div>Check Token Locked Statistics</div>
        <input
          type="number"
          placeholder="Enter amount"
          value={statisticsTokenId}
          onChange={(e) => setStatisticsTokenId(e.target.value)}
        />{" "}
        <>
          {" "}
          <button onClick={CalculateStatistics}>Calculate</button>
          <>{tokenStatistics}</>
        </>
      </>
      <>
        <>Check Claimables</>
        <input
          type="number"
          placeholder="Enter amount"
          value={claimableTokenId}
          onChange={(e) => setClaimableTokenId(e.target.value)}
        />{" "}
        <>
          {" "}
          <button onClick={Claimable}>Calculate</button>
          <>{claimableAmount}</>
        </>
      </>
      <>
        <>Claim Rewards and Amount </>
        <input
          type="number"
          placeholder="Enter amount"
          value={claimTokenId}
          onChange={(e) => setClaimTokenId(e.target.value)}
        />{" "}
        <>
          {" "}
          <button onClick={Claim}>Calculate</button>
          <>{claimHash}</>
        </>
      </>
      <>
        <>WithDraw Tokens </>
        <input
          type="number"
          placeholder="Enter amount"
          value={withDrawTokenId}
          onChange={(e) => setWithDrawTokenId(e.target.value)}
        />{" "}
        <>
          {" "}
          <button onClick={WithDraw}>Calculate</button>
          <>{withDrawHash}</>
        </>
      </>
      <>
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
          <>{increaseAmountHash}</>
        </>
      </>



      <>
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
        />{" "}
        <>
          {" "}
          <button onClick={IncreaseTime}>Calculate</button>
          <>{increaseTimeHash}</>
        </>
      </>
    </div>
  );
};
