import type { PublicClient } from 'viem';
import type { EthGetBlockReceiptsParameters, EthGetBlockReceiptsResponse } from './ethGetBlockReceipts.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "eth_getBlockReceipts";
    Parameters: EthGetBlockReceiptsParameters;
    ReturnType: EthGetBlockReceiptsResponse;
};

// ===========================================================
// Function
// ===========================================================

export default function (client: PublicClient) {
    const method = "eth_getBlockReceipts";

    return async function(...params: Schema['Parameters']): Promise<Schema['ReturnType']> {
        const response = await client.request<Schema>({
            method: method,
            params: params,
        });

        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`,
            );
        }

        return response;
    };
}
