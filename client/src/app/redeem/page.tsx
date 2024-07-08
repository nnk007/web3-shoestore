"use client"
import Card from "@/components/Card";
import { ShoeCard } from "./Redeem_ShoeCard";
import HomeLink from "@/components/NavRootLink";
import { redeemShoe } from "@/functions/redeemShoe";
import useOwnedShoes from "@/hooks/useOwnedShoes";

export default function Page() {
    return (
        <div className="flex flex-col p-2 gap-2 min-h-screen w-screen">
            <OwnedShoes />
        </div>
    )
}

function OwnedShoes() {
    const { data:IDs, loading } = useOwnedShoes();
    return (
        <Card className="flex flex-col gap-2 p-2">
            <div className="flex p-2 gap-4 justify-between sticky top-0 left-0 w-full bg-white/50 shadow-md z-50">
                <h2 className="text-2xl">Redeem shoe</h2>
                <HomeLink />
            </div>
            <div>
                {loading ?
                    <div>Loading ownership information...</div> :
                    <ShoeGrid IDs={IDs} />
                }
            </div>
            <div className="flex justify-end">
                {/* is shoe selected */}
                {loading ?? <button className="px-4 py-2 border border-green-400 rounded-md">Redeem</button>}
            </div>
        </Card>
    )
}

function ShoeGrid({ IDs }: { IDs:{shoeId:number,tokenId:number}[] }) {
    if (IDs.length>0) {
        return <div className="grid grid-cols-3 auto-rows-fr auto-cols-fr gap-2">
            {IDs.map(pair => {
                return <ShoeCard key={pair.shoeId} shoeId={pair.shoeId} tokenId={pair.tokenId} className={`h-full`} onRedeem={()=>redeemShoe(pair.tokenId+'')}/>
            })}
        </div>
    } else {
        return <div className="font-mono">No shoes owned...</div>
    }

}