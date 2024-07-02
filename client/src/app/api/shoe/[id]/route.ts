import { Shoe } from "@/functions/shoeDB";
import { NextRequest } from "next/server";
import {createClient} from "redis";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    const shoe = await client.hGetAll(`shoe:${params.id}`);
    if(!shoe) return new Response("Not found",{status:404,statusText:"Not found"});
    return Response.json(shoe);
}

export async function POST(req:Request,{params}:{params:{id:string}}){
    const body = await req.json() as Shoe;
    console.log(body);
    const client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    await client.hSet(`shoe:${params.id}`,{
        ...body
    });
    return new Response(undefined,{status:200});
}