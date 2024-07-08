"use client";
import { Shoe } from "@/__generated__/graphql";
import Card from "@/components/Card";

export function PreviewCard({ shoe, className }: { shoe: Shoe; className?: string; }) {
    return (
        <Card className={`flex flex-col justify-end items-center p-2 hover:shadow-lg transition-all ${className}`}>
            <div className="border-b w-full p-2">
                <div>Preview</div>
            </div>
            <div className="min-h-[150px] h-[150px] w-full items-center justify-center flex relative overflow-hidden rounded-md">
                <img src={shoe.images[0]} className="object-contain h-full" />
            </div>
            <div className="h-full flex flex-col justify-between gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-2 items-end align-middle">
                        <div className="">{shoe.name}</div>
                    </div>
                    <div className="font-mono overflow-hidden text-ellipsis text-justify">{shoe.description}</div>
                    <div className="flex w-full justify-between items-center font-mono">
                        <div>Style:</div>
                        <div>{shoe.style}</div>
                    </div>
                    <div className="flex w-full justify-between items-center font-mono">
                        <div>Colorway:</div>
                        <div>{shoe.colorway}</div>
                    </div>
                    <div className="flex w-full justify-between items-center font-mono">
                        <div>Released on:</div>
                        <div>{shoe.releaseDate}</div>
                    </div>
                    <div className="flex w-full justify-between items-center font-mono">
                        <div>MSRP:</div>
                        <div>{shoe.msrp}$</div>
                    </div>
                </div>
                <div className="flex w-full justify-end items-center">
                    <button className="flex items-end justify-center gap-2 px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-white transition-all rounded-3xl">
                        <span className="material-symbols-outlined scale-75">
                            open_in_new
                        </span>
                        <span>View</span>
                    </button>
                </div>
            </div>
        </Card>
    );
}
