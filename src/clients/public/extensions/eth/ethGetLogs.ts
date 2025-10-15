import type { PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getLogs";
    Parameters: [{
        address: `0x${string}`,
        fromBlock: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe',
        toBlock: `0x${string}` | 'latest' | 'earliest' | 'pending' | 'finalized' | 'safe',
        topics?: `0x${string}`[],
    }];
    ReturnType: Array<{
        address: `0x${string}`;
        topics: `0x${string}`[];
        data: `0x${string}`;
        blockNumber: `0x${string}`;
        transactionHash: `0x${string}`;
        transactionIndex: `0x${string}`;
        blockHash: `0x${string}`;
        logIndex: `0x${string}`;
        removed: boolean;
    }>;
};

// Types (external)
// ===========================================================

export namespace EthGetLogs {
    export const method = "eth_getLogs";
    export type Params = Schema['Parameters'][0];
    export type Result = Schema['ReturnType'];
};

// Types (local)
// ===========================================================

type Params = EthGetLogs.Params;
type Result = EthGetLogs.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getLogs';

    return async function(params: Params): Promise<Result> {
        const { address, fromBlock, toBlock, topics } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [
                {
                    address,
                    fromBlock,
                    toBlock,
                    topics,
                },
            ],
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        // Return the processed data
        return response;
    }
}
