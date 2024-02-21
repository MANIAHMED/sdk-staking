import { useState } from "react";

export const useIncreaseLockingAmount = (locking:any)=>{

    const [increasedAmountTokenId, setIncreasedAmountTokenId] = useState<any>();
    const [increasedAmountValue, setIncreasedAmountValue] = useState<any>();
    
    const [increaseAmountHash, setIncreaseAmountHash] = useState<any>();
  
    const IncreaseAmount = async () => {
      console.log("AMOUNT", )
      const response = await locking.increaseAmount(increasedAmountTokenId,increasedAmountValue);
      console.log("AMOUNT",response )

      setIncreaseAmountHash(response?.hash);
    };
  
    return {
        increasedAmountTokenId,
        setIncreasedAmountTokenId,
        increasedAmountValue,
        setIncreasedAmountValue,
        increaseAmountHash,
        IncreaseAmount

    };

}