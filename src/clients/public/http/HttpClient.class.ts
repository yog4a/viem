import { http, type HttpTransportConfig, type Chain } from 'viem';
import { Client } from '../Client.class.js';
import { deepMerge } from '../utils.js';
import { defaultConfig } from './config.js';

//  Class
// ===========================================================

export class HttpClient extends Client<'http'> {
    constructor(params: HttpClient.Parameters) {
        const { chain, provider, transportConfig, debug } = params;

        // Check provider
        if (!provider.url || !provider.url.startsWith('http')) {
            throw new Error('Please provide a valid url (http:// or https://)');
        }

        // Setup transport
        const config = deepMerge(defaultConfig, transportConfig);
        const transport = http(provider.url, config);

        // Initialize client
        super({ chain, provider, transport, debug });

        // Log
        if (debug) {
            console.info(
                `Client initialized: ${provider.url.slice(0, 30)}... (${provider.type})`
            );
        }
    }
}

//  Types
// ===========================================================

export namespace HttpClient { 
    export interface Provider {
        name: string,
        url: `http://${string}` | `https://${string}`,
        type: 'debug' | 'trace',
    };
    export interface Parameters {
        /* Chain id or chain object (allow to use new chains) */
        chain: number | Chain,
        /* The provider to use */
        provider: Provider,
        /* The transport config */
        transportConfig?: HttpTransportConfig,
        /* Whether to enable debug mode */
        debug?: boolean,
    };
};