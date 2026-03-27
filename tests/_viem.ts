import { PublicClient, RpcBlock, toHex } from 'viem';
import { PublicHttpClient, PublicWebsocketClient } from '../src/clients/public.js';
import { BlockReference, DebugTraceCall } from '../src/extensions/types.js';
import provider from './_provider.js';

// Service
// ===========================================================

export class Viem {
    /* HTTP Client */
    public static http: PublicHttpClient = this.setupHttpClient();
    /* WebSocket Client */
    public static socket: PublicWebsocketClient = this.setupWebsocketClient();

    // Public

    public static async getBlockByNumber(client: HttpClient | WebsocketClient, blockNumber: `0x${string}` | bigint, includeTransactions: boolean = false) {
        const hexBlockNumber = (typeof blockNumber === 'bigint') ? toHex(blockNumber) : blockNumber;

        const result = await client.calls.ethGetBlockByNumber({
            blockNumber: hexBlockNumber,
            includeTransactions: includeTransactions,
        });

        if (!result) {
            throw new Error('Block not found');
        }
        
        return result;
    }

    public static async debugTraceCall(client: HttpClient | WebsocketClient, call: DebugTraceCallOptions, blockReference: BlockReference, tracerObject: TracingOptions) {
        const blockNumber = await client.client.getBlockNumber();
        const blockNumberHex = toHex(blockNumber);

        const result = await client.client.request<any>({
            method: 'trace_filter',
            params: [{
                fromBlock: '0x0',
                toBlock: blockNumberHex,
                toAddress: ["0x017E95AF1A42BA6E5385D6E05D5FD46AEB67C45D"],
                after: 0,
                count: 10
            }],
        });

        if (!result) {
            throw new Error('Block not found');
        }
        
        return result;
    }

    // Private

    private static setupHttpClient(): PublicHttpClient {
        return new PublicHttpClient({ 
            chain: 1, 
            provider: {
                name: provider.name,
                url: provider.endpoints.ethereum.http as `https://${string}`,
            },
            clientConfig: {
                batch: undefined,
            },
            transportConfig: {
                batch: false,
                retryCount: 2,
                retryDelay: 150,
                timeout: 10_000,
            },
            debug: true,
        });
    }

    private static setupWebsocketClient(): PublicWebsocketClient {
        return new PublicWebsocketClient({ 
            chain: 1, 
            provider: {
                name: provider.name,
                url: provider.endpoints.ethereum.wss as `wss://${string}`,
            },
            clientConfig: {
                batch: undefined,
            },
            transportConfig: {
                // Avoid auto-reconnect because we handle it manually
                reconnect: false,
            },
            debug: true,
        });
    }
}
