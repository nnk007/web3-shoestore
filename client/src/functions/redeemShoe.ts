import { config } from "@/config";
import contracts from "@/contracts";
import * as token from "./token";

export async function redeemShoe(id: string) {
    const shoeURI = await tokenURI(id);
    if(shoeURI.length==0) throw "Token URI not set";
    let txHash = '0x0';
    try {
        const writeRequest = await token.simulate.burn(id);
        txHash = await token.burn(writeRequest);
    } catch (error) {
        throw "Transation Failed"
    }
    try {
        createOrder(txHash,shoeURI);
    } catch(err){
        throw "Order creation failed";
    }
}



interface Order {
    state:"new"|"payment received" | "processing"|"dispatched"
}

async function createOrder(txHash:string,shoeURL:string){

}

async function tokenURI(tokenID:string){
    const uri = await readContract(config,{
        abi: contracts.ShoeToken.abi,
        address: contracts.ShoeToken.address as `0x${string}`,
        functionName: 'tokenURI',
        args: [tokenID]
    }) as string;
    return uri;
}

// simulate
// create new order
// burn
// confirm the order
// return order id

