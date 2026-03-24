import type { RpcTransaction, PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getTransactionByHash";
    Parameters: [
        transactionHash: `0x${string}`,
    ];
    ReturnType: RpcTransaction<false>;
};

// Types (external)
// ===========================================================

export namespace EthTransaction {
    export type Params = {
        transactionHash: `0x${string}`;
    };
    export type Result = {
        hash: `0x${string}`;
        transaction: RpcTransaction<false>;
    };
};

// Types (local)
// ===========================================================

type Params = EthTransaction.Params;
type Result = EthTransaction.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getTransactionByHash';

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
            hash: response.hash,
            transaction: response,
        };
    }
}