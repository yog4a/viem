import type { PublicClient } from 'viem';

// RPC Calls (ETH)
import ethGetCode from './eth/ethGetCode.js';
import ethGetLogs from './eth/ethGetLogs.js';
import ethGetStorageAt from './eth/ethGetStorageAt.js';
import ethGetBalance from './eth/ethGetBalance.js';
import ethGetBlockByNumber from './eth/ethGetBlockByNumber.js';
import ethGetBlockReceipts from './eth/ethGetBlockReceipts.js';
import ethGetTransactionByHash from './eth/ethGetTransactionByHash.js';
import ethGetTransactionReceipt from './eth/ethGetTransactionReceipt.js';
import ethBlockNumber from './eth/ethBlockNumber.js';

// RPC Calls (Debug)
import debugTraceTransaction from './debug/debugTraceTransaction.js';
import debugTraceBlockByHash from './debug/debugTraceBlockByHash.js';
import debugTraceBlockByNumber from './debug/debugTraceBlockByNumber.js';

// RPC Calls (Trace)
import traceFilter from './trace/traceFilter.js';

// Function
// ===========================================================

export function setupCustomCalls(client: PublicClient) {
    return {
        // Eth
        ethBlockNumber: ethBlockNumber(client),
        ethGetCode: ethGetCode(client),
        ethGetLogs: ethGetLogs(client),
        ethGetBalance: ethGetBalance(client),
        ethGetStorageAt: ethGetStorageAt(client),
        ethGetBlockByNumber: ethGetBlockByNumber(client),
        ethGetBlockReceipts: ethGetBlockReceipts(client),
        ethGetTransactionByHash: ethGetTransactionByHash(client),
        ethGetTransactionReceipt: ethGetTransactionReceipt(client),
        // Debug
        debugTraceBlockByNumber: debugTraceBlockByNumber(client),
        debugTraceBlockByHash: debugTraceBlockByHash(client),
        debugTraceTransaction: debugTraceTransaction(client),
        // Trace
        traceFilter: traceFilter(client),
    };
}
