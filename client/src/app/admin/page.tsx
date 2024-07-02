"use client"
import Card from "@/components/Card";
import React, { ReactElement, RefObject, createRef, useEffect, useRef, useState } from "react";
import Shoes from "./shoes";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

enum Category {
    SHOES=0,
    LISTINGS=1
}

export default function Page() {
    const [activeCategory,setAC] = useState<Category>(0);
    const {status} = useAccount();
    console.log(status);
    const {open} = useWeb3Modal()
    if(status=="disconnected"){
        open()
        return null;
    }
    return (
        <div className="flex flex-col items-center justify-center p-2 gap-2">
            <div className="flex gap-2 justify-between w-full">
                <Card className="">
                    <Link href="/" className="flex items-center justify-center px-4 py-2 gap-2 uppercase ">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    <span>Go back</span>
                    </Link>
                </Card>
                <Card className="w-min font-mono px-4 py-2">
                    <Selector className="flex gap-4 items-center justify-evenly">
                        <div className="cursor-pointer" onClick={()=>setAC(Category.SHOES)}>Shoes</div>
                        <div className="cursor-pointer" onClick={()=>setAC(Category.LISTINGS)}>Listings</div>
                    </Selector>
                </Card>
                <div></div>
            </div>
            {activeCategory==Category.SHOES ? <Shoes/> : <div></div>}
        </div>
    )
}

function Selector({ children, className }: { children: ReactElement[], className?: string }) {
    const [underline,setUnderline] = useState({w:0,top:-1000,left:0});
    const [activeChildI,setACI] = useState(0);
    const [c,setC] = useState<ReactElement[]>([]);
    const [cRefs,setCRefs] = useState<RefObject<HTMLDivElement>[]>([]);
    useEffect(() => {
        const cRefs:RefObject<HTMLDivElement>[] = [];
        const c = React.Children.map(children, (child,i) => {
            const ref = createRef<HTMLDivElement>();
            cRefs.push(ref);
            return React.cloneElement(child, { ref: ref,onClick:()=>{child.props.onClick();setACI(i)}})
        });
        setCRefs(cRefs);
        setC(c);
    }, [children]);

    useEffect(()=>{
        if(cRefs.length==0) return;
        const el = cRefs.at(activeChildI)!.current;
        if(!el) return;
        const cRect = el.getBoundingClientRect()!;
        setUnderline({w:cRect.width,left:cRect.left,top:cRect.bottom})
    },[c,activeChildI])

    return (
        <div className={`flex `+className ?? ""}>
            {c}
            {underline.top<0 ? null : <div className="absolute transition-all bg-blue-500 h-1 rounded-2xl" style={{width:underline.w,top:underline.top,left:underline.left}}></div>}
        </div>
    )
}