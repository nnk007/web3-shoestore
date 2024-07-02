'use client'
import { useAccount, useBalance } from "wagmi"
import * as mathjs from "mathjs";
export default function PurchaseButton({ basePrice }: { basePrice: number }) {
    const { address } = useAccount();
    const { data } = useBalance({ address })
    let meetBasePrice = false;
    if (data) {
        const balanceETH = mathjs.bignumber(data!.value).div(mathjs.bignumber(10).pow(data!.decimals));
        meetBasePrice = balanceETH.greaterThan(basePrice);
    }
    if (meetBasePrice)
        return (
            <button className="border border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white p-2 transition-colors rounded-md w-full" onClick={()=>{
                // need contract transfer method
            }}>Buy Now</button>
        )
    else
        return (
            <button title="Not enogh funds on current account" className="border border-green-600 bg-white hover:bg-slate-600 hover:border-slate-600 text-slate-600 hover:text-white p-2 transition-colors rounded-md w-full disabled cursor-not-allowed">Buy Now</button>
        )
}