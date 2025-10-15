import { PublicClient, RpcBlock, toHex } from 'viem';
import { HttpClient, WebsocketClient } from 'src/clients/public.js';
import provider from './_provider.js';
import { BlockReference, TracingOptions, DebugTraceCallOptions } from 'src/clients/public.js';

// Service
// ===========================================================

export class Viem {
    /* HTTP Client */
    public static http: HttpClient = this.setupHttpClient();
    /* WebSocket Client */
    public static socket: WebsocketClient = this.setupWebsocketClient();

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

    private static setupHttpClient(): HttpClient {
        return new HttpClient({ 
            chain: 1, 
            provider: {
                name: provider.name,
                url: provider.endpoints.ethereum.http as `https://${string}`,
                type: provider.endpoints.ethereum.type as 'debug' | 'trace',
            },
            debug: true,
        });
    }

    private static setupWebsocketClient(): WebsocketClient {
        return new WebsocketClient({ 
            chain: 1, 
            provider: {
                name: provider.name,
                url: provider.endpoints.ethereum.wss as `wss://${string}`,
                type: provider.endpoints.ethereum.type as 'debug' | 'trace',
            },
            transportConfig: {
                // Avoid auto-reconnect because we handle it manually
                reconnect: false,
            },
            debug: true,
        });
    }
}
