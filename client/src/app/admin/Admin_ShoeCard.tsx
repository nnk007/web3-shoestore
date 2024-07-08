"use client";
import Card from "@/components/Card";
import useBalance from "@/hooks/useBalance";
import useShoe from "@/hooks/useShoe";
import { Redacted } from "next/font/google";
import Link from "next/link";
const redacted = Redacted({weight:"400",subsets:["latin"]});

export function ShoeCard({ shoeId,tokenId }: { shoeId: number,tokenId:number }) {
    const {shoe,loading,error} = useShoe(shoeId);
    const {balance} = useBalance(tokenId);
    if (loading && !shoe ) return (<LoadingSkeleton/>);
    if(!shoe) return null;
    return (
        <Card className="flex flex-col justify-between items-center p-2 shadow-none hover:shadow-md transition-all relative group">
            <div className="absolute top-0 left-0 w-full flex justify-between p-2 opacity-0 group-hover:opacity-100 transition-all z-50">
                <div title="ShoeID">#{shoeId}</div>
                <div title="TokenID">#{tokenId}</div>
            </div>
            <div className="h-[150px] w-full items-center justify-center flex relative overflow-hidden rounded-md">
                <img src={shoe.images[0]} className="object-contain h-full" />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div>{shoe.name}</div>
                {/* <div className="font-mono overflow-hidden text-ellipsis">{shoe.description}</div> */}
                <div className="flex justify-between font-mono">
                <div>MSRP: {shoe.msrp}</div>
                <div>Stock: {balance!=undefined ? balance.toString() : "-1"}</div>
                </div>
                <div className="w-full flex gap-2">
                <Link href={`/admin/edit_shoe/${shoeId}`} className="px-4 py-2 border rounded-md border-blue-400 w-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">Edit</Link>
                <button className="px-4 py-2 border rounded-md border-green-400 w-full hover:bg-green-400 hover:text-white transition-colors">List</button>
                </div>
            </div>
        </Card>
    );
}


function LoadingSkeleton() {
    return (<Card className="flex flex-col justify-between items-center p-2 hover:shadow-lg transition-all">
        <div className="h-[150px] w-full items-center justify-center flex relative overflow-hidden rounded-md bg-black/10 animate-pulse">
        </div>
        <div className={`flex flex-col gap-1 w-full text-slate-500`}>
            <div className={redacted.className}>####################</div>
            <div>MSRP: <span className={redacted.className}>#####</span></div>
            <button className={`px-4 py-2 border rounded-md border-slate-400 w-full hover:bg-slate-400 transition-colors ${redacted.className} animate-pulse`}>######</button>
        </div>
    </Card>)
}