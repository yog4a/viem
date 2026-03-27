import type { RpcTransaction, RpcBlock, PublicClient, Hex, BlockTag } from 'viem';

// ===========================================================
// Schema
// ===========================================================

type Schema = {
    Method: "eth_getBlockByNumber";
    Parameters: [
        blockNumber: `0x${string}`,
        includeTransactions: boolean,
    ];
    ReturnType: RpcBlock;
};

// Types (external)
// ===========================================================

export type EthGetBlockByNumber = {
    block: Omit<RpcBlock, 'transactions'>;
    transactions?: Record<`0x${string}`, RpcTransaction<false>>;
};

// ===========================================================
// Function
// ===========================================================

export default function(client: PublicClient) {
    const method = 'eth_getBlockByNumber';

    return async function(...params: Schema['Parameters']): Promise<EthGetBlockByNumber> {
        const [blockNumber, includeTransactions] = params;

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
