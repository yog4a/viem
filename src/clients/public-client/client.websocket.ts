import { webSocket, type PublicClientConfig, type WebSocketTransport, type WebSocketTransportConfig, type Chain } from 'viem';
import { PublicBaseClient } from './client.base.js';

// ===========================================================
// Websocket Client Types
// ===========================================================

/* The provider config */
export interface PublicWebsocketClientProvider {
    /* The name of the provider */
    name: string;
    /* The url of the provider */
    url: `ws://${string}` | `wss://${string}`;
}

/* The parameters for the client */
export interface PublicWebsocketClientParameters {
    /* Chain id or chain object (allow to use new chains) */
    chain: number | Chain;
    /* The provider config */
    provider: PublicWebsocketClientProvider;
    /* The transport config */
    transportConfig?: WebSocketTransportConfig;
    /* The client config */
    clientConfig?: Omit<PublicClientConfig<WebSocketTransport, Chain>, 'chain' | 'transport'>;
    /* Whether to enable debug mode */
    debug?: boolean;
}

// ===========================================================
// Websocket Client Class
// ===========================================================

export class PublicWebsocketClient extends PublicBaseClient<'websocket'> {
    constructor(params: PublicWebsocketClientParameters) {
        const { chain, provider, transportConfig, clientConfig, debug } = params;

        if (
            !provider.url ||
            (!provider.url.startsWith('ws://') && !provider.url.startsWith('wss://'))
        ) {
            throw new Error('Please provide a valid provider url (ws:// or wss://)');
        }

        super({
            chain,
            provider,
            transport: webSocket(provider.url, transportConfig),
            clientConfig,
        });

        if (debug) {
            console.info(`[Viem] Public WebSocket client initialized (${provider.name})`);
        }
    }
}