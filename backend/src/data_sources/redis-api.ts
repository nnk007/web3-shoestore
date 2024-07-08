import { RedisClientType, createClient } from "redis";
import { Shoe, ShoeInput, ShoeTokenMetadata, ShoeTokenMetadataInput, TokenMetadata } from "../types";
import { ShoeTokenMetadataModel } from "../models";

export class RedisAPI {
    client: RedisClientType;
    constructor() {
        this.client = createClient();
        this.client.on('error', err => console.log('Redis Client Error', err));
        this.client.connect();
    }
    private async throwDisconnected() {
        if (!this.client.isOpen) throw "Redis Client not connected";
    }
    async getShoe(id: number|string): Promise<Shoe|null> {
        if(typeof id == "number") id = `${id}`;
        this.throwDisconnected();
        const shoe = await this.client.hGetAll(`shoe:${id}`) as unknown as Shoe; // | {}
        console.log(shoe);
        const images = shoe.images ? JSON.parse(shoe.images as unknown as string) : [];
        if(Object.keys(shoe).length==0 || !shoe) return null;
        return {...shoe,releaseDate:new Date(+shoe.releaseDate),images} as Shoe;
    }
    async setShoe(shoe: ShoeInput) {
        this.throwDisconnected();
        const {id,colorway,description,images,msrp,name,releaseDate,style} = shoe;
        const _shoe = {id,style,name,description,colorway,releaseDate:+(releaseDate as Date),msrp,images:JSON.stringify(images)};
        await this.client.hSet(`shoe:${id}`,{..._shoe});
    }
    async setTokenMetadata(id: string, metadata: ShoeTokenMetadataInput) {
        this.throwDisconnected();
        await this.client.hSet(`token:${id}`, metadata);
        return metadata;
    }
    async getTokenMetadata(id: string): Promise<ShoeTokenMetadataInput|null> {
        this.throwDisconnected();
        const metadata = await this.client.hGetAll(`token:${id}`);
        if(Object.getPrototypeOf(metadata)==null || !metadata) return null;
        return metadata as unknown as ShoeTokenMetadataInput;
    }

    async setShoeTokenPair(arg0:{shoeID:string,tokenID:string}){
        this.throwDisconnected();
        const {shoeID,tokenID} = arg0;
        await this.client.hSet("shoeTokenPair",`${shoeID}:${tokenID}`,1);
    }
    async getShoeTokenPairs(){
        const _pairs = await this.client.hGetAll("shoeTokenPair") as unknown as Record<`${number}:${number}`,1>;
        const pairs = [...Object.keys(_pairs)].map(key=>{
            const [s,t] = key.split(":") as [`${number}`,`${number}`];
            return {shoeID:Number.parseInt(s),tokenID:Number.parseInt(t)}
        });
        console.log(_pairs, pairs);
        return pairs;
    }
    async getShoeTokenPair(arg:({shoeID:string,tokenID?:undefined}|{shoeID?:undefined,tokenID:string})){
        const pairs = await this.getShoeTokenPairs();
        const filtered = pairs.filter(v=>{
            if(arg.shoeID)
                return v.shoeID == +arg.shoeID
            else if(arg.tokenID)
                return v.tokenID == +arg.tokenID
            else
                return false;
        });
        return filtered;
    }
}