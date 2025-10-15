import type { RpcTransactionReceipt, PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getBlockReceipts";
    Parameters: [
        blockNumber: `0x${string}`,
    ];
    ReturnType: RpcTransactionReceipt[];
};

// Types (external)
// ===========================================================

export namespace EthBlockReceipts {
    export type Params = {
        blockNumber: `0x${string}`;
    }
    export type Result = {
        receipts: Record<`0x${string}`, RpcTransactionReceipt>;
    };
}

// Types (local)
// ===========================================================

type Params = EthBlockReceipts.Params;
type Result = EthBlockReceipts.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getBlockReceipts';

    return async function(params: Params): Promise<Result> {
        const { blockNumber } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [
                blockNumber,
            ],
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        const receiptsObject: Record<`0x${string}`, RpcTransactionReceipt> = {};

        // Build receipts object mapped by transaction hash
        for (const receipt of response) {
            const transactionHash = receipt.transactionHash.toLowerCase() as `0x${string}`;
            receiptsObject[transactionHash] = receipt;
        }

        return { 
            receipts: receiptsObject 
        };
    }
}
