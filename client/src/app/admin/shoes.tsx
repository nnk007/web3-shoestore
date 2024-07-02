"use client"
import Card from "@/components/Card";
import contracts from "@/contracts";
import { Shoe } from "@/functions/shoeDB";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi"
const { AF1 } = contracts;
export default function Shoes() {
    const acc = useAccount();
    const urls = useOwnedShoes(acc.address ?? '0x0');
    return (
        <div className="w-full grid grid-cols-6 auto-rows-[300px] gap-2">
            {
                urls.map(url => <ShoeCard key={url} url={url} />)
            }
            <MintShoeCard />
        </div>
    )
}

function useOwnedShoes(address:string){
    console.log("useOwnedShoes");
    const {data} = useReadContract({abi:AF1.abi,address:AF1.address as `0x${string}`,functionName:"tokensOf",args:[address]}) as {data:string[]};
    console.log(data);
    return data ?? [];
}



function ShoeCard({ url }: { url: string }) {
    const [shoe, setShoe] = useState<Shoe | null>();
    useEffect(() => {
        (async () => {
            const req = await fetch(url);
            const shoe = await req.json() as Shoe;
            setShoe(shoe);
        })()
    }, [])
    if (!shoe) return null;
    return (
        <Card className="flex flex-col justify-between items-center p-2 hover:shadow-lg transition-all">
            <div className="h-[150px] w-full items-center justify-center flex relative overflow-hidden rounded-md">
                <img src={shoe.image} className="object-contain h-full"/>
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div>{shoe.name}</div>
                {/* <div className="font-mono overflow-hidden text-ellipsis">{shoe.description}</div> */}
                <div>Price: {shoe.price}</div>
                <button className="px-4 py-2 border rounded-md border-green-400 w-full hover:bg-green-400 transition-colors">List</button>
            </div>
        </Card>
    )
}

function MintShoeCard() {
    return (
        <Card className="hover:shadow-lg transition-all">
            <Link href={"/admin/mint_shoe"} className="group p-2 flex h-full flex-col items-center justify-center">
                <div className="flex items-center justify-center p-2 rounded-full border h-10 w-10 group-hover:bg-green-400 transition-colors group-hover:border-white">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">
                        add
                    </span>
                </div>
                <div>Mint shoe</div>
            </Link>
        </Card>
    )
}