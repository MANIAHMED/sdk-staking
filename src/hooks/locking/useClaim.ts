import { useState } from "react";

export const useClaim = (locking: any) => {
  const [claimTokenId, setClaimTokenId] = useState<any>();
  const [claimHash, setClaimHash] = useState<any>();

  const Claim = async () => {
    const response = await locking.claim(claimTokenId);
    setClaimHash(response);
  };

  return {
    claimTokenId,
    setClaimTokenId,
    claimHash,
    setClaimHash,
    Claim,
  };
};
