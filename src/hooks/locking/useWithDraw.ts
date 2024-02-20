import { useState } from "react";

export const useWithDraw = (locking: any) => {
  const [withDrawTokenId, setWithDrawTokenId] = useState<any>();
  const [withDrawHash, setWithDrawHash] = useState<any>();

  const WithDraw = async () => {
    const response = await locking.withdraw(withDrawTokenId);
    setWithDrawHash(response);
  };

  return {
    withDrawTokenId,
    setWithDrawTokenId,
    withDrawHash,
    setWithDrawHash,
    WithDraw,
  };
};
