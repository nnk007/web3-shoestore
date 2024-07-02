"use server"
import {createClient} from "redis";
export interface Shoe {
    name:string,
    description:string,
    image:string,
    price:number
};

export async function createShoe(id:string,shoe:Shoe){
    const client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    await client.hSet(`shoe:${id}`,{
        ...shoe
    });
} 