import Link from "next/link"
export default function RedeemLink(){
    return (
        <Link className="flex items-center justify-center gap-2 px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-white transition-all rounded-3xl" href={"/redeem"}>
            <span className="material-symbols-outlined">redeem</span>
            <span>Redeem</span></Link>
    )
}