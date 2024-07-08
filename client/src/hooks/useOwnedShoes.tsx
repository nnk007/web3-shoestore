import { balanceOf } from "@/functions/token";
import useOwnableShoeIds from "./useOwnableShoeIds";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";


export default function useOwnedShoes(){
    const {address} = useAccount();
    const {ids,loading} = useOwnableShoeIds();
    const [ownedShoes,setOwnedShoes] = useState<{shoeId:number,tokenId:number}[]>([]);
    useEffect(() => {
        console.log("ids changed");
        async function calc() {
            const balances = await Promise.all(ids.map(pair => {
                return balanceOf(address!, BigInt(pair.tokenId));
            }));
            const owned = ids.filter((id, i) => {
                return balances[i] > 0
            });
            setOwnedShoes(_=>owned);
        }
        calc()
    }, [ids])
    return { data: ownedShoes, loading: loading };
}