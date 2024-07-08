// src/index.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { DataSourceContext } from './context';
import { RedisAPI } from './data_sources/redis-api';
import { EthereumAPI } from './data_sources/ethereum-api';

async function main(){
	const server = new ApolloServer<DataSourceContext>({resolvers,typeDefs});
    const {url} = await startStandaloneServer(server,{
        context:async()=>{
            return {
                dataSources:{
                    redisAPI:new RedisAPI(),
                    ethAPI:new EthereumAPI()
                }
            }
        }
    });
	console.log(`Server ready at: ${url}`);
}

main();