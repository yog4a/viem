import type { RpcTransactionReceipt, PublicClient, Hex, BlockTag } from 'viem';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "eth_getBlockReceipts";
    Parameters: [
        blockNumber: Hex | BlockTag,
    ];
    ReturnType: RpcTransactionReceipt[];
};

// Types (external)
// ===========================================================

export type EthGetBlockReceipts = {
    receipts: Record<`0x${string}`, RpcTransactionReceipt>;
};

// Function
// ===========================================================

export default function(client: PublicClient) {
    const method = 'eth_getBlockReceipts';

    return async function(...params: Schema['Parameters']): Promise<EthGetBlockReceipts> {
        const [blockNumber] = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: params,
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        // Result
        let result: EthGetBlockReceipts['receipts'] = {};

        // Build receipts object mapped by transaction hash
        for (const receipt of response) {
            const transactionHash = receipt.transactionHash.toLowerCase() as `0x${string}`;
            result[transactionHash] = receipt;
        }

        return { 
            receipts: result, 
        };
    }
}
