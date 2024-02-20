import { useState } from "react";

export const useClaimable = (locking:any)=>{
    const [claimableTokenId,setClaimableTokenId] = useState<any>();
    const [claimableAmount,setClaimableAmount] =  useState<any>();
    
    const Claimable = async ()=>{
        const response = await locking.claimable(claimableTokenId);
        setClaimableAmount(response)
    }
    
    return{
        claimableTokenId,
        setClaimableTokenId,
        claimableAmount,
        setClaimableAmount,
        Claimable
    }
}