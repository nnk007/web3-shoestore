"use client"
import Card from "@/components/Card";
import Link from "next/link";
import { ShoeCard } from "./Admin_ShoeCard";
import { mintExamples } from "@/functions/mintExamples";
import { useEffect, useState } from "react";
import useOwnableShoeIds from "@/hooks/useOwnableShoeIds";
export default function Shoes() {
    const { ids, loading } = useOwnableShoeIds();
    return (
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 auto-rows-[300px] gap-2">
            {
                loading ?
                    <LoadingCard /> :
                    ids.map(pair => <ShoeCard key={pair.shoeId} shoeId={pair.shoeId} tokenId={pair.tokenId} />)
            }
            <MintShoeCard />
            <MintExamplesCard />
        </div>
    )
}
function MintShoeCard() {
    return (
        <Card className="shadow-none hover:shadow-md  transition-all">
            <Link href={"/admin/mint_shoe"} className="group p-2 flex h-full flex-col items-center justify-center gap-2">
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
//used mostly to sync db and chain
function MintExamplesCard() {
    const { ids, loading } = useOwnableShoeIds()
    // if (loading || ids && ids.length > 1) return null;
    return (
        <Card className={`shadow-none hover:shadow-md transition-all ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className="group p-2 flex h-full flex-col items-center justify-center gap-2" onClick={() => {
                if (loading) return;
                mintExamples()
            }}>
                <div className="flex items-center justify-center p-2 rounded-full border h-10 w-10 group-hover:bg-green-400 transition-colors group-hover:border-white">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">
                        add
                    </span>
                </div>
                <div>Mint examples (one-off)</div>
            </div>
        </Card>
    )
}

function LoadingCard() {
    const [n, setN] = useState(0);
    useEffect(() => {
        const i = setInterval(() => {
            setN(_n => {
                return _n > 2 ? 0 : _n + 1;
            })
        }, 1000);
        return () => {
            clearInterval(i);
        }
    }, [])
    return (
        <Card className="hover:shadow-lg transition-all cursor-wait">
            <div className="group p-2 flex h-full flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-center p-2 rounded-full border h-10 w-10 group-hover:bg-blue-400 transition-colors group-hover:border-white">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors animate-spin">
                        sync
                    </span>
                </div>
                <div className="font-mono">Loading shoes.{'.'.repeat(n)}</div>
            </div>
        </Card>
    )
}