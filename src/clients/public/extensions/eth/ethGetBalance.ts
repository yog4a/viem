import type { PublicClient } from 'viem';
import { formatUnits, hexToBigInt } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getBalance";
    Parameters: [
        address: `0x${string}`,
        blockNumber: `0x${string}`,
    ];
    ReturnType: `0x${string}`;
};

// Types (external)
// ===========================================================

export namespace EthBalance {
    export type Params = {
        address: `0x${string}`;
        blockNumber: `0x${string}`;
    };
    export type Result = {
        hexValue: `0x${string}`;
        weiValue: `${bigint}`;
        value: `${number}`;
        currency: {
            name: string;
            symbol: string;
            decimals: number;
        };
    };
};

// Types (local)
// ===========================================================

type Params = EthBalance.Params;
type Result = EthBalance.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getBalance';

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
        const decimals = client.chain!.nativeCurrency.decimals;
        const wei = hexToBigInt(response);
        const native = formatUnits(wei, decimals);

        return {
            hexValue: response,
            weiValue: wei.toString() as `${bigint}`,
            value: native as `${number}`,
            currency: client.chain!.nativeCurrency,
        };
    }
}
