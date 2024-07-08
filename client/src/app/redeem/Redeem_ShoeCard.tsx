"use client";
import Card from "@/components/Card";
import useShoe from "@/hooks/useShoe";

export function ShoeCard({ shoeId,tokenId,className,onRedeem:handleRedeem }: { shoeId: number,tokenId: number,className:string,onRedeem:()=>any }) {
    const {shoe,loading,error}= useShoe(shoeId);
    if (loading && !shoe ) return (<LoadingSkeleton/>);
    if(!shoe) return null;
    return (
        <Card className={`flex flex-col justify-end items-center p-2 hover:shadow-lg transition-all ${className}`}>
            <div className="min-h-[150px] h-[150px] w-full items-center justify-center flex relative overflow-hidden rounded-md">
                <img src={shoe.images[0]} className="object-contain h-full" />
            </div>
            <div className="h-full flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-1 w-full">
                    <div>{shoe.name}</div>
                    <div className="font-mono overflow-hidden text-ellipsis">{shoe.description}</div>
                </div>
                <div className="flex w-full justify-end items-center">
                    <button className="flex items-end justify-center gap-2 px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-white transition-all rounded-3xl" onClick={() => handleRedeem()}>
                        <span className="material-symbols-outlined">
                            redeem
                        </span>
                        <span>Redeem</span>
                    </button>
                </div>
            </div>
        </Card>
    );
}

function LoadingSkeleton({className}:{className?:string}={className:""}){
    return (
        <Card className={`flex flex-col justify-end items-center p-2 hover:shadow-lg transition-all ${className}`}>
        <div className="min-h-[150px] h-[150px] w-[200px] items-center justify-center flex relative overflow-hidden rounded-md bg-black/10 animate-pulse">
        </div>
        <div className="h-full flex flex-col justify-between gap-2">
            <div className="flex flex-col gap-1 w-full">
                <div className="w-[10ch] animate-pulse bg-black/10"></div>
                <div className="font-mono overflow-hidden text-ellipsis w-full h-[4ch] bg-black/10 animate-pulse"></div>
            </div>
            <div className="flex w-full justify-end items-center">
                <button className="flex items-end justify-center gap-2 px-4 py-2 w-[4ch] h-[2ch] border border-slate-500 bg-slate-500 animate-pulse rounded-3xl"></button>
            </div>
        </div>
    </Card>
    )
}