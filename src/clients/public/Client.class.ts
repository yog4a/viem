import type { HttpClient } from './http/HttpClient.class.js';
import type { WebsocketClient } from './websocket/WebsocketClient.class.js';
import { createPublicClient, type PublicClient, type HttpTransport, type WebSocketTransport } from 'viem';
import { chains, type Chain } from 'src/constants/chains.js';
import { setupCustomCalls } from './extensions/index.js';

//  Class
// ===========================================================

export class Client<TransportType extends keyof Client.Transport> {
    /** Chain */
    public readonly chain: Chain;
    /** Client */
    public readonly client: PublicClient;
    /** Provider */
    public readonly provider: Client.Provider[TransportType];
    /** Transport */
    public readonly transport: Client.Transport[TransportType];
    /** Custom calls */
    public readonly calls: ReturnType<typeof setupCustomCalls>;

    // Constructor

    constructor(params: Client.Parameters<TransportType>) {   
        const { chain, provider, transport } = params;

        // Setup chain
        this.chain = this.setupChain(chain);

        // Setup provider
        this.provider = provider;

        // Setup transport
        this.transport = transport;

        // Setup client
        this.client = createPublicClient({
            chain: this.chain,                  // The Chain of the Public Client.
            transport: this.transport,          // The Transport of the Public Client.
        });

        // Setup custom calls
        this.calls = setupCustomCalls(this.client);
    }

    // Private

    private setupChain(chain: number | Chain): Chain {
        if (typeof chain === 'number') {
            if (!(chain in chains)) {
                throw new Error(`Please provide a valid chain (unknown chain: ${chain})`);
            }
            return chains[chain]!;
        }
        return chain;
    }
}

//  Types
// ===========================================================

export namespace Client { 
    export interface Transport {
        http: HttpTransport,
        websocket: WebSocketTransport,
    };
    export interface Provider {
        http: HttpClient.Provider,
        websocket: WebsocketClient.Provider,
    };
    export interface Parameters<T extends keyof Transport> {
        chain: number | Chain,
        provider: Provider[T],
        transport: Transport[T],
        debug?: boolean,
    };
};