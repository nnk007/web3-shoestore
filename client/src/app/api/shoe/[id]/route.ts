import { ShoeInput } from "@/__generated__/graphql";
import { getShoe, setShoe } from "@/functions/graphql";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const shoe = await getShoe(params.id);
    if(!shoe) return new Response("Not found",{status:404,statusText:"Not found"});
    return Response.json(shoe);
}

export async function POST(req:Request,{params}:{params:{id:string}}){
    const body = await req.json() as ShoeInput;
    console.log(body);
    const id = await setShoe(+params.id,{...body})
    return Response.json({id:id},{status:200});
}