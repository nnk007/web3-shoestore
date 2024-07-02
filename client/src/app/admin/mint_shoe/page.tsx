"use client"
import Card from "@/components/Card";
import contracts from "@/contracts";
import { randID } from "@/functions/randid";
import { createShoe, Shoe } from "@/functions/shoeDB";
import { useEffect, useRef, useState } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";

export default function Page() {
    const { address } = useAccount();
    const { data: balance } = useBalance({ address: address });
    const nameRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLInputElement | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const { writeContract } = useWriteContract()
    const [transactionState, setTransationState] = useState<"idle" | "loading" | "success" | "failure">("idle");
    async function mintShoe() {
        console.log("dog")
        const refs = [nameRef,descRef,imageRef,priceRef];
        if(refs.filter(ref=>ref.current==null).length!=0) return;
        const shoe: Shoe = {
            name: nameRef.current!.value,
            description: descRef.current!.value,
            image: imageRef.current!.value,
            price: Number.parseInt(priceRef.current!.value),
        }
        const id = await randID();
        console.log("Mintign shoe with uri id : ", id)
        writeContract(
            {
                abi: contracts.AF1.abi,
                address: contracts.AF1.address as `0x${string}`,
                functionName: "mint",
                args: [`http://localhost:3000/api/shoe/${id}`]
            },
            {
                onSettled(data, error, variables, context) {
                    console.log("Settled", data, error);
                    if (!error) {
                        createShoe(id, shoe);
                        setTransationState("success");
                    } else {
                        setTransationState("failure");
                    }
                },
            });
        setTransationState("loading");
    }
    useEffect(() => {
        if (transactionState == "idle" || transactionState == "loading") return;
        const timeout = setTimeout(() => {
            setTransationState("idle");
        }, 2000);
        return () => {
            clearTimeout(timeout);
        }
    }, [transactionState])
    return (
        <div className="flex flex-col p-2 justify-center items-center">
            <Card className="flex flex-col p-2 w-full">
                <div className="flex justify-between items-center">
                    <div className="text-3xl">Minting new shoe</div>
                    <div className="font-mono flex gap-2">
                        <span className="">
                            {balance ? formatEther(balance.value) : 0}
                        </span>
                        <span className="">
                            {`ETH`}
                        </span>
                    </div>
                </div>
            </Card>
            <div className="flex w-1/2 min-h-[300px] items-center justify-center">
                <Card className="flex flex-col p-2 w-full h-full gap-2">
                    <input ref={nameRef} placeholder="name" />
                    <input ref={descRef} placeholder="description" />
                    <input ref={imageRef} placeholder="image url" />
                    <input ref={priceRef} type="number" placeholder="200" />
                    {
                        transactionState == "idle"
                            ? <button className="px-4 py-2 border border-green-400 hover:bg-green-400 hover:text-white transition-colors" onClick={() => mintShoe()}>Mint</button>
                            : transactionState == "loading"
                                ? <button className="px-4 py-2 border border-blue-400 bg-blue-400 text-white">Pending...</button>
                                : transactionState == "success"
                                    ? <button className="px-4 py-2 border border-green-400 bg-green-400 text-white">Minted !</button>
                                    : transactionState == "failure"
                                        ? <button className="px-4 py-2 border border-red-600 bg-red-600 text-white">Failed to mint</button>
                                        : null
                    }
                </Card>
            </div>
        </div>
    )
}