import { ISODateScalar } from "./custom/ISODateScalar";
import { ShoeTokenModel } from "./models";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    FullDate: ISODateScalar,
    Query: {
        shoe: async (_,{id},{dataSources:{redisAPI}}) => {
            return (await redisAPI.getShoe(id))
        },
        token: async (_, {id}, {dataSources:{ethAPI,redisAPI}}) => {
            // console.log(await ethAPI.blockNumber());
            try {
                const uri = await ethAPI.getTokenURI(BigInt(id));
                return { id: `${id}`, uri } as ShoeTokenModel;
            } catch (err) {
                console.error((err as Error).message)
                return null;
            }
        },
        pairs:(_,__,{dataSources:{redisAPI}})=>{
            const pairs =redisAPI.getShoeTokenPairs();
            return pairs;
        },
        tokensByShoe:async (_,{id},{dataSources:{redisAPI}})=>{
            const filtered = await redisAPI.getShoeTokenPair({shoeID:''+id});
            return filtered.map(v=>v.tokenID);
        },
        shoesByToken:async (_,{id},{dataSources:{redisAPI}})=>{
            const filtered = await redisAPI.getShoeTokenPair({tokenID:''+id});
            return filtered.map(v=>v.shoeID);
        },
    },
    ShoeToken: {
        metadata: async (token, args, ctx) => {
            const md = await ctx.dataSources.redisAPI.getTokenMetadata(token.id);
            if (!md) throw "Token w/o metadata";
            const properties = (await ctx.dataSources.redisAPI.getShoe(token.id))!;
            return { ...md, properties }
        }
    },
    Shoe: {
    },
    ShoeTokenPair:{
        shoeID:async (pair,_,{dataSources:{redisAPI}})=>{
            return (await redisAPI.getShoe(pair.shoeID))!;
        },
        tokenID: async (pair,_,{dataSources:{ethAPI}})=>{
            const uri = await ethAPI.getTokenURI(BigInt(pair.tokenID));
            return {
                id:''+pair.tokenID,
                uri
            }
        }
    },
    Mutation: {
        setShoe: (_, {shoe}, {dataSources}) => {
            const { redisAPI } = dataSources;
            redisAPI.setShoe(shoe)
            return shoe;
        },
        setShoeTokenMetadata: async (_, args, ctx) => {
            const { id, metadata } = args;
            const md = await ctx.dataSources.redisAPI.setTokenMetadata(id.toString(), metadata);
            return { ...args.metadata, properties: (await ctx.dataSources.redisAPI.getShoe('' + id))! }
        },
        saveShoeTokenPair: async (_, {shoeID,tokenID}, {dataSources:{redisAPI}}) => {
            redisAPI.setShoeTokenPair({ shoeID: '' + shoeID, tokenID: '' + tokenID });
            return {
                shoeID:shoeID,
                tokenID:tokenID
            }
        }
    }
}