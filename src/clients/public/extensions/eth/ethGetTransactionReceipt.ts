import type { RpcTransactionReceipt, PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getTransactionReceipt";
    Parameters: [
        transactionHash: `0x${string}`,
    ];
    ReturnType: RpcTransactionReceipt;
};

// Types (external)
// ===========================================================

export namespace EthTransactionReceipt {
    export type Params = {
        transactionHash: `0x${string}`;
    };
    export type Result = {
        hash: `0x${string}`;
        transaction: RpcTransactionReceipt;
    };
};

// Types (local)
// ===========================================================

type Params = EthTransactionReceipt.Params;
type Result = EthTransactionReceipt.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getTransactionReceipt';

    return async function(params: Params): Promise<Result> {
        const { transactionHash } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [
                transactionHash,
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
            hash: response.transactionHash,
            transaction: response,
        };
    }
}