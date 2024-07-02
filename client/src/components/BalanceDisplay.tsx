'use client'
import { useAccount, useBalance, useReadContract } from "wagmi";
export default function Balance(){
    const {address} = useAccount();
    const {data} = useReadContract({
        address:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
        functionName:"balancOf",
        args:[address]
    })
    console.log(data);
    if(!data) return null;
    return (
        <div>
            {}
        </div>
    )

}