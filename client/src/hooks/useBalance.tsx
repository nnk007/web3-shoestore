import contracts from "@/contracts";
import { useAccount, useReadContract } from "wagmi";

export default function useBalance(tokenId:number){
    const {address} = useAccount();
    const {data,error,fetchStatus} = useReadContract({
        abi:contracts.ShoeToken.abi,
        address:contracts.ShoeToken.address as `0x${string}`,
        functionName:"balanceOf",
        args:[address,tokenId]
    });
    console.log(data,fetchStatus,error);
    return {balance:data as bigint|undefined,loading:fetchStatus!=="idle",error:error}
}