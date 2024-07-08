"use client"
import { ShoeInput } from "@/__generated__/graphql";
import Card from "@/components/Card";
import { PreviewCard } from "@/components/PreviewCard";
import contracts from "@/contracts";
import { setShoe, setShoeTokenPair } from "@/functions/graphql";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";

export default function Page() {
    const { address } = useAccount();
    const { data: balance } = useBalance({ address: address });
    const { writeContract } = useWriteContract()
    const [transactionState, setTransationState] = useState<"idle" | "loading" | "success" | "failure">("idle");
    
    const [id, setId] = useState(-1);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [colorway, setColorway] = useState("");
    const [style, setStyle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [msrp, setMSRP] = useState(300);
    const [images, setImages] = useState<string[]>([]);
    
    async function mintShoe() {
        const shoe: ShoeInput = {
            id:id,
            name: name,
            description: description,
            colorway: colorway,
            images: images,
            msrp:msrp,
            releaseDate:releaseDate,
            style:style
        }
        console.log("Minting token with id : ", id)
        writeContract(
            {
                abi: contracts.ShoeToken.abi,
                address: contracts.ShoeToken.address as `0x${string}`,
                functionName: "createCoupon",
                args: [id,1]
            },
            {
                onSettled(data, error, variables, context) {
                    console.log("Settled", data, error);
                    if (!error) {
                        setShoe(shoe);
                        setShoeTokenPair(id,id);
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
    }, [transactionState]);
    
    return (
        <div className="flex flex-col p-2 justify-center items-center">
            <Card className="flex flex-col p-2 w-full">
                <div className="flex justify-between items-center">
                    <div className="text-3xl">Minting new shoe</div>
                    <w3m-network-button/>
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
            <div className="flex w-full p-2 min-h-[300px] items-center justify-center">
                <Card className="flex flex-col p-2 w-full h-full gap-2">
                    <TextInput value={id + ''} onChange={v => setId(+v)} validator={(str => /^(\d{0,})$/.test(str))} placeholder="id" />
                    <TextInput value="" onChange={v => setName(v)} placeholder="name" />
                    <TextInput value="" onChange={v => setDescription(v)} placeholder="description" />
                    <TextInput value="" onChange={v => setStyle(v)} placeholder="style" />
                    <TextInput value="" onChange={setColorway} placeholder="colorway" />
                    {/* should akshually check for ranges \/ */}
                    <TextInput value="" onChange={setReleaseDate} validator={str=>/^\d{4}-\d{2}-\d{2}$/.test(str)} placeholder="release-date" />
                    <TextInput value="" onChange={v => setMSRP(+v)} validator={(str => /\d{0,}/.test(str))} placeholder="200" />
                    <div className="flex flex-col">
                        <div>Image gallery: {images.length} total links</div>
                        <ListInput value={images} onChange={setImages} />
                    </div>
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
                <PreviewCard className="md:w-1/3" shoe={{id,colorway,description,images,msrp,name,releaseDate,style}}/>
            </div>
        </div>
    )
}

//refactor to new file, add on /admin/edit_shoe/[id]
function TextInput({value,onChange:handleChange,validator,className,placeholder}:{value:string, onChange:(newValue:string)=>any,validator?:(text:string)=>boolean,className?:string,placeholder?:string}){ 
    const [_v,_setV] = useState(value);
    if(!validator) validator = ()=>true;
    return (
        <input
        className={`invalid:outline outline-red-600 ${className}`}
        value={_v}
        onChange={(e)=>{
            const v = e.currentTarget.value;
            const valid = validator(v);
            console.log("validator:",valid);
            e.currentTarget.setCustomValidity(valid ? "":"Invalid value")
            console.log("valid:",e.currentTarget.checkValidity());
            _setV(_=>v);
            if (valid) {
                handleChange(v);
            }
        }}
        placeholder={placeholder}
        />
    )
}

//refactor to new file, add on /admin/edit_shoe/[id]
function ListInput({value,onChange:handleChange,validator,className,placeholder}:{value:string[], onChange:(newValue:string[])=>any,validator?:(text:string)=>boolean,className?:string,placeholder?:string}){
    const [list,setList] = useState<string[]>(value);
    useEffect(()=>{
        handleChange(list);
    },[list])
    return (
        <div>
            {
                list.map((item,i)=>{
                    return (
                        <div className="flex gap-2 w-full">
                            <button className="material-symbols-outlined hover:text-red-500" onClick={()=>{
                                const _l = [...list];
                                _l.splice(i);
                                setList(_l);
                            }}>remove</button>
                            <TextInput className="w-full" value={list[i]} onChange={v=>{
                                setList(_=>_.with(i,v));
                            }}
                            placeholder={placeholder}
                            validator={validator}
                            />
                        </div>
                    )
                })
            }
            <button className="flex items-center gap-2" onClick={()=>{
                setList(_=>_.concat(""));
            }}>
                <span className="material-symbols-outlined">add</span>
                <span>New item</span>
            </button>
        </div>
    )
}