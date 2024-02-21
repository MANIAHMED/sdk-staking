import { useState } from "react";

export const useCalculateVotingPower = (locking: any) => {
  const [votingTokenId, setVotingTokenId] = useState<string>("");
  const [votingPower, setVotingPower] = useState<any>();
  console.log("VOTING", votingTokenId)

  const CalculateVotingPower = async () => {
    try {
      if (!votingTokenId || isNaN(parseInt(votingTokenId))) {
        return;
      }
      console.log("666666", parseInt(votingTokenId))
      const response = await locking?.calculateVotingPower(
        parseInt(votingTokenId)
      );
      console.log("RRR", response);
      setVotingPower(response);
    } catch (error) {
      console.error("Error checking Voting Power:", error);
    }
  };

  return {
    votingTokenId,
    setVotingTokenId,
    votingPower,
    setVotingPower,
    CalculateVotingPower,
  };
};
