"use server"
import { ApolloClient, InMemoryCache} from "@apollo/client";
// import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { GET_SHOE, GET_TOKEN, SAVE_PAIR, SET_SHOE, SET_TOKEN_METADATA } from "./queries";
import { Shoe, ShoeInput, ShoeTokenMetadataInput, Token } from "@/__generated__/graphql";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

export async function getShoe(id:string) {
    const {data,error} = await client.query({
        query: GET_SHOE,
        variables: {
            id
        }
    })
    if(error) throw error;
    return data as Shoe;
};
export async function getToken(id:string) {
    const {data,error} = await client.query({
        query: GET_TOKEN,
        variables: {
            id:+id
        }
    })
    if(error) throw error;
    return data as Token;
};
export async function setShoe(shoe:ShoeInput){
    const {data,errors} = await client.mutate({
        mutation: SET_SHOE,
        variables: {
            shoe:shoe
        }
    });
    if(errors) throw errors;
    return;
}

export async function setTokenMetadata(id:number,metadata:ShoeTokenMetadataInput){
    const {data,errors} = await client.mutate({
        mutation: SET_TOKEN_METADATA,
        variables: {
            id,
            metadata
        }
    });
    if(errors) throw errors;
    return;
}

export async function setShoeTokenPair(shoeId:number,tokenId:number){
    const {data,errors} = await client.mutate({
        mutation: SAVE_PAIR,
        variables: {
            shoeId,
            tokenId
        }
    });
    if(errors) throw errors;
    return;
}