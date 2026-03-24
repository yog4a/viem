import type { PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getCode";
    Parameters: [
        address: `0x${string}`,
        blockNumber?: `0x${string}`,
        blockTag?: 'latest' | 'earliest' | 'pending',
    ];
    ReturnType: `0x${string}`;
};

// Types (external)
// ===========================================================

export namespace EthCode {
    export type Params = {
        address: `0x${string}`;
        blockNumber?: `0x${string}`;
        blockTag?: 'latest' | 'earliest' | 'pending';
    };
    export type Result = {
        bytecode: `0x${string}`;
    };
};

// Types (local)
// ===========================================================

type Params = EthCode.Params;
type Result = EthCode.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getCode';

    return async function(params: Params): Promise<Result> {
        const { address, blockNumber } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [
                address,
                blockNumber,
            ],
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        // Return the processed data
        return {
            bytecode: response,
        };
    }
}
