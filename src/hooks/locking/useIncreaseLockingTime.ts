import { useState } from "react";

export const useIncreaseLockingTime = (locking:any)=>{

    const [increasedTimeTokenId, setIncreasedTimeTokenId] = useState<any>();
    const [increasedTimeValue, setIncreasedTimeValue] = useState<any>();
    
    const [increaseTimeHash, setIncreaseTimeHash] = useState<any>();
  
    const IncreaseTime = async () => {
      const response = await locking.increaseAmount(increasedTimeTokenId,increasedTimeValue);
      setIncreaseTimeHash(response?.hash);
    };
  
    return {
        increasedTimeTokenId,
        setIncreasedTimeTokenId,
        increasedTimeValue,
        setIncreasedTimeValue,
        increaseTimeHash,
        IncreaseTime

    };

}