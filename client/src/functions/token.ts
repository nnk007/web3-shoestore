import { Address, Hash, createPublicClient, createWalletClient, http, nonceManager } from 'viem'
import { hardhat } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { type WriteContractParameters } from '@wagmi/core'
import { simulateContract, writeContract } from 'wagmi/actions';
import contracts from '@/contracts';
import { config } from "@/config";


export type uint256 = bigint;
export type ERC1155MetadataURL = `${string}{id}.json`;
//hardhat acc #0
const defaultAccount0PK = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const account = privateKeyToAccount(defaultAccount0PK, { nonceManager });
const clientConfig = {
    chain: hardhat,
    transport: http(),
    account: account,
}
const publicClient = createPublicClient({
    ...clientConfig
})
const walletClient = createWalletClient({
    ...clientConfig,
});


const defaultContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

/**
 * 
 * @param id Token ID
 * @param amnt Token amount
 * @returns TX hash
 */
export async function createCoupon(id:uint256,amnt:uint256):Promise<Hash>{
    return walletClient.writeContract({
        address: defaultContractAddress,
        abi: contracts.ShoeToken.abi,
        functionName: "createCoupon",
        args: [id,amnt]
    });
}
/**
 * 
 * @param id Token ID
 * @param amnt Token amount
 * @returns TX hash
 */
export async function mintCoupon(id: uint256,amnt:uint256):Promise<Hash> {
    return walletClient.writeContract({
        address: defaultContractAddress,
        abi: contracts.ShoeToken.abi,
        functionName: "mintCoupon",
        args: [id,amnt]
    })
}

/**
 * 
 * @param owner Owner address
 * @param tokenId Token id
 * @returns Amount of tokens owned
 */
export async function balanceOf(owner: Address, tokenId: uint256): Promise<bigint> {
    const balance = await publicClient.readContract({
        abi: contracts.ShoeToken.abi,
        address: contracts.ShoeToken.address as `0x${string}`,
        functionName: "balanceOf",
        args: [owner, tokenId]
    });
    console.log(owner,"balance of",tokenId,":",balance);
    return BigInt(balance as bigint);
}

export namespace simulate {
    export async function burn(tokenID: uint256) {
        const { request, result } = await simulateContract(config, {
            abi: contracts.ShoeToken.abi,
            address: contracts.ShoeToken.address as `0x${string}`,
            functionName: 'burn',
            args: [tokenID]
        });
        return request as WriteContractParameters;
    }
}
/**
 * 
 * @param request Obtain from by simulating `burn`
 */
export async function burn(request: WriteContractParameters): Promise<Hash>;
/**
 * 
 * @param tokenID 
 */
export async function burn(tokenID: uint256): Promise<Hash>;
export async function burn(arg0: any) {
    let txHash = `0x0`;
    if (typeof (arg0) == 'string') {
        const tokenID = arg0 as string;
        txHash = await writeContract(config, {
            abi: contracts.ShoeToken.abi,
            address: contracts.ShoeToken.address as `0x${string}`,
            functionName: 'burn',
            args: [tokenID]
        });
    } else {
        const request = arg0 as WriteContractParameters;
        txHash = await writeContract(config, request);
    }
    return txHash;
}


export async function uri(tokenID:uint256):Promise<string>{
    const uri = await publicClient.readContract({
        abi: contracts.ShoeToken.abi,
        address: contracts.ShoeToken.address as `0x${string}`,
        functionName: "uri",
        args: [tokenID]
    });
    const url = (uri as ERC1155MetadataURL).replace('{id}', tokenID.toString(16).padStart(64, '0'));
    return url;
}