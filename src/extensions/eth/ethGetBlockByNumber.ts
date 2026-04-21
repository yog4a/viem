import type { PublicClient } from 'viem';
import type { EthGetBlockByNumberParameters, EthGetBlockByNumberResponse } from './ethGetBlockByNumber.types.js';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "eth_getBlockByNumber";
    Parameters: EthGetBlockByNumberParameters;
    ReturnType: EthGetBlockByNumberResponse;
};

// ===========================================================
// Function
// ===========================================================

export default function (client: PublicClient) {
    const method = "eth_getBlockByNumber";

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
