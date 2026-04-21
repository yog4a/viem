import type { RpcBlock } from 'viem';

// ============================================================================
// Types
// ============================================================================

export type EthGetBlockByNumberParameters = [
    blockNumber: `0x${string}`,
    includeTransactions: boolean,
];

export type EthGetBlockByNumberResponse = RpcBlock;
