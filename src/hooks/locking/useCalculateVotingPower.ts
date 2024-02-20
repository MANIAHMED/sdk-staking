import { useState } from "react";

export const useCalculateVotingPower = (locking:any)=>{
const [votingTokenId,setVotingTokenId] = useState<any>();
const [votingPower,setVotingPower] =  useState<any>();

const CalculateVotingPower = async ()=>{
    const response = await locking.calculateVotingPower(votingTokenId);
    setVotingPower(response)


}

return{
    votingTokenId,
    setVotingTokenId,
    votingPower,
    setVotingPower,
    CalculateVotingPower


}
}