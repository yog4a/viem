import type { PublicClient } from 'viem';

import ethGetCode from './ethGetCode.js';
import ethGetLogs from './ethGetLogs.js';
import ethGetStorageAt from './ethGetStorageAt.js';
import ethGetBalance from './ethGetBalance.js';
import ethGetBlockByNumber from './ethGetBlockByNumber.js';
import ethGetBlockReceipts from './ethGetBlockReceipts.js';
import ethGetTransactionByHash from './ethGetTransactionByHash.js';
import ethGetTransactionReceipt from './ethGetTransactionReceipt.js';
import ethBlockNumber from './ethBlockNumber.js';

// Function
// ===========================================================

export function setupEthRpcCalls(client: PublicClient) {
    return {
        ethBlockNumber: ethBlockNumber(client),
        ethGetCode: ethGetCode(client),
        ethGetLogs: ethGetLogs(client),
        ethGetBalance: ethGetBalance(client),
        ethGetStorageAt: ethGetStorageAt(client),
        ethGetBlockByNumber: ethGetBlockByNumber(client),
        ethGetBlockReceipts: ethGetBlockReceipts(client),
        ethGetTransactionByHash: ethGetTransactionByHash(client),
        ethGetTransactionReceipt: ethGetTransactionReceipt(client),
    };
}
