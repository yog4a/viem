import type { PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getStorageAt";
    Parameters: [
        address: `0x${string}`,
        position: `0x${string}`,
        blockNumber: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe',
    ];
    ReturnType: `0x${string}`;
};

// Types (external)
// ===========================================================

export namespace EthGetStorageAt {
    export type Params = {
        address: `0x${string}`;
        position: `0x${string}`;
        blockNumber: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe';
    };
    export type Result = {
        storage: `0x${string}`;
    };
};

// Types (local)
// ===========================================================

type Params = EthGetStorageAt.Params;
type Result = EthGetStorageAt.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getStorageAt';

    return async function(params: Params): Promise<Result> {
        const { address, position, blockNumber } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [address, position, blockNumber],
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        // Return the processed data
        return {
            storage: response,
        };
    }
}
