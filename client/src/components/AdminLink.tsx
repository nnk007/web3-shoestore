'use client'
import Link from "next/link"
import { useAccount, useReadContract } from "wagmi";
//hardcode 
const ownerAddr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const contractAddr = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function AdminLink(){
    const {address,status} = useAccount();
    //usereadcontract(f:owner() ) ??
    if(status=="connected" && address == ownerAddr )
    return (
        <Link className="flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all rounded-3xl" href={"/admin"}>
            <span className="material-symbols-outlined">construction</span>
            <span>Manage</span></Link>
    )
    return null
}