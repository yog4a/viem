import { webSocket, type WebSocketTransportConfig, type Chain } from 'viem';
import { Client } from '../Client.class.js';
import { deepMerge } from '../utils.js';
import { defaultConfig } from './config.js';

//  Class
// ===========================================================

export class WebsocketClient extends Client<'websocket'> {
    constructor(params: WebsocketClient.Parameters) {       
        const { chain, provider, transportConfig, debug } = params;

        // Check provider
        if (!provider.url || !provider.url.startsWith('ws')) {
            throw new Error('Please provide a valid url (ws:// or wss://)');
        }

        // Setup transport
        const config = deepMerge(defaultConfig, transportConfig);
        const transport = webSocket(provider.url, config);

        // Initialize client
        super({ chain, provider, transport, debug });

        // Log
        if (debug) {
            console.info(
                `Client initialized: ${provider.url.slice(0, 30)}... (${provider.name})`
            );
        }
    }
}

//  Types
// ===========================================================

export namespace WebsocketClient { 
    export interface Provider {
        name: string,
        url: `ws://${string}` | `wss://${string}`,
    };
    export interface Parameters {
        chain: number | Chain,
        provider: Provider,
        transportConfig?: WebSocketTransportConfig,
        debug?: boolean,
    };
};
