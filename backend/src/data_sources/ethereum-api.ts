import { createPublicClient, http } from 'viem'
import { hardhat } from 'viem/chains'
import contracts from './ethereum-api-contracts';
 
const client = createPublicClient({
  chain: hardhat,
  transport: http(),
})

const abi = contracts.ShoeToken.abi;
const address = contracts.ShoeToken.address as `0x${string}`;

function readContract<T>(functionName:string,args?:any[]){
  return client.readContract ({ abi, address, functionName:functionName, args:args }) as Promise<T>;
}

export class EthereumAPI {
    async blockNumber() {
        const blockNumber = await client.getBlockNumber();
        return blockNumber;
  }
  async getTokenURI(id:bigint) {
    const uri = await client.readContract ({ abi, address, functionName:"uri", args:[1] });
    console.log(uri);
    return uri as unknown as string;
  }
  async getTokenBalance(owner:`0x${string}`,id:bigint) {
    const balance = readContract<bigint>("balanceOf",[owner,id]);
    return balance;
  }
}