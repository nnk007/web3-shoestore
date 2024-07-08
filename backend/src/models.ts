export type ShoeTokenModel = {
    id:string,
    uri:string,
}

export type ShoeTokenMetadataModel = {
    name:string,
    description:string,
    image:string,
};

export type ShoeTokenPairModel = {
    shoeID:number,
    tokenID:number
}