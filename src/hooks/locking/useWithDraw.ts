import { useState } from "react";

export const useWithDraw = (locking: any) => {
  const [withDrawTokenId, setWithDrawTokenId] = useState<any>();
  const [withDrawHash, setWithDrawHash] = useState<any>();

  const WithDraw = async () => {
    console.log("WITHDRWA",withDrawTokenId)
    const response = await locking.withdraw(withDrawTokenId);
    console.log("WITHDRWA11111",response)
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
