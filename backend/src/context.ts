// src/context.ts
import { EthereumAPI } from "./data_sources/ethereum-api";
import { RedisAPI } from "./data_sources/redis-api";
export type DataSourceContext = { dataSources: {
		redisAPI: RedisAPI,
		ethAPI:EthereumAPI
	};
};