import type { PublicHttpClientProvider } from './client.http.js';
import type { PublicWebsocketClientProvider } from './client.websocket.js';

import { createPublicClient, type PublicClient, type PublicClientConfig, type HttpTransport, type WebSocketTransport } from 'viem';
import { chains, type Chain } from '../../constants/chains.js';

// ===========================================================
// Base Client Types
// ===========================================================

/** The public client type */
type PublicBaseClientPublic<T extends keyof PublicBaseClientTransport> =
    PublicClient<PublicBaseClientTransport[T], Chain>;

/** The provider type */
interface PublicBaseClientProvider {
    http: PublicHttpClientProvider;
    websocket: PublicWebsocketClientProvider;
}

/** The transport type */
interface PublicBaseClientTransport {
    http: HttpTransport;
    websocket: WebSocketTransport;
}

/** The parameters type */
interface PublicBaseClientParameters<T extends keyof PublicBaseClientTransport> {
    chain: number | Chain;
    provider: PublicBaseClientProvider[T];
    transport: PublicBaseClientTransport[T];
    clientConfig?: Omit<
        PublicClientConfig<PublicBaseClientTransport[T], Chain>,
        'chain' | 'transport'
    >;
}

// ===========================================================
// Base Client Class
// ===========================================================

export class PublicBaseClient<T extends keyof PublicBaseClientTransport> {
    /** Chain */
    public readonly chain: Chain;
    /** Client */
    public readonly client: PublicBaseClientPublic<T>;
    /** Provider */
    public readonly provider: PublicBaseClientProvider[T];
    /** Transport */
    public readonly transport: PublicBaseClientTransport[T];

    // ===========================================================
    // Constructor
    // ===========================================================

    /**
     * Constructor
     * @param params The parameters for the client
     * @param params.chain The chain to use
     * @param params.provider The provider to use
     * @param params.transport The transport to use
     * @param params.clientConfig The client config to use
     */
    constructor(params: PublicBaseClientParameters<T>) {
        const { chain, provider, transport, clientConfig } = params;

        this.chain = this.setupChain(chain);
        this.provider = provider;
        this.transport = transport;

        this.client = createPublicClient({
            chain: this.chain,
            transport: this.transport,
            ...(clientConfig ?? {}),
        }) as PublicBaseClientPublic<T>;
    }

    // ===========================================================
    // Private Methods
    // ===========================================================

    /**
     * Setup the chain
     * @param chain The chain to use (number or Chain object)
     * @returns The chain object
     */
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
