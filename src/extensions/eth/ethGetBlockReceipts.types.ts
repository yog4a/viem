import type { RpcTransactionReceipt, Hex, BlockTag } from 'viem';

// ============================================================================
// Types
// ============================================================================

export type EthGetBlockReceiptsParameters = [
    blockNumber: Hex | BlockTag,
];

export type EthGetBlockReceiptsResponse = RpcTransactionReceipt[];
