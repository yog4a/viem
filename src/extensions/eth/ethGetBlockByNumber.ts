import type { RpcTransaction, RpcBlock, PublicClient } from 'viem';

// Schema
// ===========================================================

type Schema = {
    Method: "eth_getBlockByNumber";
    Parameters: [
        blockNumber: `0x${string}`,
        includeTransactions: boolean,
    ];
    ReturnType: RpcBlock<'latest', boolean, RpcTransaction<false>>;
};

// Types (external)
// ===========================================================

export namespace EthGetBlockByNumber {
    export type Params = {
        blockNumber: `0x${string}`;
        includeTransactions?: boolean;
    };
    export type Result = {
        block: Omit<RpcBlock, 'transactions'>;
        transactions?: Record<`0x${string}`, RpcTransaction<false>>;
    };
};

// Types (local)
// ===========================================================

type Params = EthGetBlockByNumber.Params;
type Result = EthGetBlockByNumber.Result;

// Function
// ===========================================================

export default function(client: PublicClient): (params: Params) => Promise<Result> {
    const method = 'eth_getBlockByNumber';

    return async function(params: Params): Promise<Result> {
        const { blockNumber, includeTransactions = false } = params;

        // Fetch the response
        const response = await client.request<Schema>({
            method: method,
            params: [
                blockNumber,
                includeTransactions,
            ],
        });

        // Check if the response is valid
        if (!response) {
            throw new Error(
                `No response from ${method} for ${JSON.stringify(params)}`
            );
        }

        // Split the result into block and transactions
        if (includeTransactions && response.transactions) {
            const transactionsObject: Record<`0x${string}`, RpcTransaction<false>> = {};
            const { transactions, ...block } = response as Omit<RpcBlock, 'transactions'> & { transactions: RpcTransaction<false>[] };

            // Sort all transactions by hash
            for (const tx of transactions) {
                const transactionHash = tx.hash.toLowerCase() as `0x${string}`;
                transactionsObject[transactionHash] = tx;
            }

            // Return the processed data
            return {
                block: block, 
                transactions: transactionsObject,
            };
        }

        // Return the processed data
        return {
            block: response, 
        };
    }
}
