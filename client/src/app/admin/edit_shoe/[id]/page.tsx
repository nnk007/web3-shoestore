"use client"
import Card from "@/components/Card";
import { PreviewCard } from "@/components/PreviewCard";
import { SET_SHOE } from "@/functions/queries";
import useShoe from "@/hooks/useShoe"
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params: { id: shoeId } }: { params: { id: string } }) {
    const { shoe, loading, error } = useShoe(+shoeId);
    const [setShoe,{loading:mutationLoading,error:mutationError}] = useMutation(SET_SHOE);
    const [name, setName] = useState(shoe ? shoe.name : "");
    const [description, setDescription] = useState(shoe ? shoe.description : "");
    const [colorway, setColorway] = useState(shoe ? shoe.colorway : "");
    const [style, setStyle] = useState(shoe ? shoe.style : "");
    const [releaseDate, setReleaseDate] = useState(shoe ? shoe.releaseDate : "");
    const [msrp, setMSRP] = useState(shoe ? shoe.msrp : 300);
    const [images, setImages] = useState(shoe ? shoe.images : []);
    useEffect(() => {
        if(!shoe) return;
        setName(shoe.name);
        setDescription(shoe.description);
        setColorway(shoe.colorway);
        setStyle(shoe.style);
        setReleaseDate(shoe.releaseDate);
        setMSRP(shoe.msrp);
        setImages(shoe.images);
    }, [shoe])
    function saveEdits(){
        if(!/\d{4}-\d{2}-\d{2}/.test(releaseDate)) throw "Wrong date format";
        setShoe({variables:{shoe:{
            id:+shoeId,
            name,
            description,
            colorway,
            style,
            msrp,
            images,
            releaseDate
        }}})
    }
    const [saveButtonState,setSBS] = useState<"idle"|"loading"|"error"|"ok">("idle");
    useEffect(()=>{
        console.log(mutationError,mutationLoading);
        if(mutationError){
            setSBS("error");
            return;
        }
        if(mutationLoading){
            setSBS("loading");
            return;
        }
        if(saveButtonState!="idle") {
            setSBS("ok")
        }
    },[mutationError,mutationLoading])
    useEffect(()=>{
        if(saveButtonState!="idle" && saveButtonState!="loading") {
            const tm = setTimeout(()=>{setSBS("idle")},2000);
            return ()=>{
                clearTimeout(tm);
            }
        }
    },[saveButtonState])
    if (!shoe) return <div className="flex flex-col w-full h-full items-center justify-center">
        <div>Tried to edit shoe #{shoeId}, but the shoe doesn't exist !</div>
        <div className="flex justify-evenly">
            <Link href={"/admin"}>Go back</Link>
            {/* <Link href={"/admin/create_shoe"}>Create</Link> */}
            <button disabled>Create</button>
        </div>
    </div>;
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-2 gap-2 md:min-h-screen">
            <Card className="flex flex-col p-2 gap-2 w-full md:w-1/2 md:h-1/2 justify-between">
                <div className="p-2 border-b">
                    <div>Edit shoe #{shoeId}</div>
                </div>
                <div className="flex flex-col p-2 gap-2 font-mono">
                    <Input value={name} onChange={(v) => setName(v)} />
                    <Input value={description} onChange={(v) => setDescription(v)} />
                    <Input value={colorway} onChange={(v) => setColorway(v)} />
                    <Input value={style} onChange={(v) => setStyle(v)} />
                    <Input value={releaseDate} onChange={(v) => setReleaseDate(v)} />
                    <ListInput value={images} onChange={(v)=>setImages(v)}/>
                    <NumberInput value={msrp} onChange={(v)=>setMSRP(v)}/>
                </div>
                <div className="w-full flex justify-between items-center gap-2 p-2 border-t">
                    <Link href={".."} className="text-slate-500 hover:text-red-500">Cancel</Link>
                    <button className="px-4 py-2 rounded-md border-blue-500 disabled:border-slate-500 text-blue-500 disabled:text-slate-500 hover:text-white disabled:hover:text-white hover:bg-blue-500 disabled:hover:bg-slate-500 transition-all flex gap-2" disabled={saveButtonState!="idle"} onClick={()=>{
                        saveEdits();
                    }}>
                        {
                            saveButtonState=="idle" ? <span>Save</span>
                            : saveButtonState == "ok" ? <><span className="material-symbols-outlined">check</span><span>OK</span></>
                            : saveButtonState == "error" ? <><span className="material-symbols-outlined">report</span><span>Error</span></>
                            : saveButtonState == "loading" ? <><span className="material-symbols-outlined animate-spin">progress_activity</span><span></span></>
                            : <span>Borked UI</span>
                            }
                    </button>
                </div>
            </Card>
            <PreviewCard className="md:w-1/3" shoe={{id:+shoeId,colorway,description,images,msrp,name,releaseDate,style}}/>
        </div>
    )
}

function DivideY() {
    return (<div className="h-0 w-full flex items-center justify-center">
        <div className="border-t w-full mx-2"></div>
    </div>)
}

function ListInput({ value,onChange:handleChange }: { value: string[],onChange:(newList:string[])=>any}) {
    return (
        <div>
            <div>Images:</div>
            <ul className="flex flex-col w-full gap-1 ">
                {value.map((image, i) => {
                    return <ImagesInputLi key={i} imageURL={image}
                    onChange={(newV)=>{
                        handleChange(value.with(i,newV));
                    }}
                    onRemove={()=>{
                        let _values = [...value];
                        _values.splice(i,1);
                        handleChange(_values);
                    }}/>;
                })}
                <li className="flex items-center group">
                    <button className="hover:text-green-500 flex items-center" onClick={()=>{handleChange(value.concat(""))}}>
                        <span className="material-symbols-outlined ">add</span>
                        <span className="leading-none relative top-[1px]">Add shoe</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

function ImagesInputLi({ imageURL,onChange:handleChange,onRemove:handleRemove }: { imageURL: string,onRemove:()=>any,onChange:(newV:string)=>any }) {
    console.log("li called");
    return (
        <li className="flex">
            <button className="material-symbols-outlined hover:text-red-700 cursor-pointer" onClick={()=>handleRemove()}>
                remove
            </button>
            <Input value={imageURL} onChange={handleChange}/>
        </li>

    )
}

function Input({ value, onChange: handleChange }: { value: string, onChange: (text: string) => any }) {
    const [enabled, setEnabled] = useState(false);
    return (
        <div className="flex w-full items-center justify-center">
            <input type="text" disabled={!enabled} value={value} onChange={(e) => handleChange(e.currentTarget.value)} className="w-full overflow-hidden text-ellipsis leading-none" />
            <button className={`flex`} onClick={() => setEnabled(_ => !_)}>
                <span className={`material-symbols-outlined scale-75 mb-1`}>
                    {enabled ? "edit_off" : "edit"}
                </span>
            </button>
        </div>
    )
}
function NumberInput({ value, onChange: handleChange }: { value: number, onChange: (text: number) => any }) {
    const [enabled, setEnabled] = useState(false);
    return (
        <div className="flex w-full items-center justify-center">
            <button className={`flex`} onClick={() => setEnabled(_ => !_)}>
                <span className={`material-symbols-outlined scale-75 mb-1`}>
                    {enabled ? "edit_off" : "edit"}
                </span>
            </button>
            <input type="number" disabled={!enabled} value={value} min={0} onChange={(e) => handleChange(+e.currentTarget.value)} className="w-full overflow-hidden text-ellipsis leading-none" />
        </div>
    )
}