import { fromHex, type PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_blockNumber";
    Parameters: [];
    ReturnType: `0x${string}`;
};

// Types (external)
// ===========================================================

export namespace EthBlockNumber {
    export type Params = [];
    export type Result = {
        hexBlockNumber: `0x${string}`;
        bigBlockNumber: bigint;
        blockNumber: `${bigint}`;
    };
};

// Types (local)
// ===========================================================

type Params = EthBlockNumber.Params;
type Result = EthBlockNumber.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_blockNumber';

    return async function(params: Params): Promise<Result> {
        const response = await client.request<Schema>({
            method: method,
            params: params,
        });
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }
        return {
            hexBlockNumber: response, 
            bigBlockNumber: fromHex(response, 'bigint'),
            blockNumber: fromHex(response, 'bigint').toString() as `${bigint}`,
        };
    }
}
