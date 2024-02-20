import { useState } from "react";

export const useLockedTokenStatistics = (locking:any)=>{
const [statisticsTokenId,setStatisticsTokenId] = useState<any>();
const [tokenStatistics,setTokenStatistics] =  useState<any>();

const CalculateStatistics = async ()=>{
    const response = await locking.locked(statisticsTokenId);
    setTokenStatistics(response)
}

return{
    statisticsTokenId,
    setStatisticsTokenId,
    tokenStatistics,
    setTokenStatistics,
    CalculateStatistics
}
}