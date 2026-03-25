import { http, type PublicClientConfig, type HttpTransport, type HttpTransportConfig, type Chain } from 'viem';
import { PublicBaseClient } from './client.base.js';

// ===========================================================
// Http Client Types
// ===========================================================

/* The provider config */
export interface PublicHttpClientProvider {
    /* The name of the provider */
    name: string,
    /* The url of the provider */
    url: `http://${string}` | `https://${string}`,
};

/* The parameters for the client */
export interface PublicHttpClientParameters {
    /* Chain id or chain object (allow to use new chains) */
    chain: number | Chain,
    /* The provider config */
    provider: PublicHttpClientProvider,
    /* The transport config */
    transportConfig?: HttpTransportConfig,
    /* The client config */
    clientConfig?: Omit<PublicClientConfig<HttpTransport, Chain>, 'chain' | 'transport'>;
    /* Whether to enable debug mode */
    debug?: boolean,
};

// ===========================================================
// Http Client Class
// ===========================================================

export class PublicHttpClient extends PublicBaseClient<'http'> {
    constructor(params: PublicHttpClientParameters) {
        const { chain, provider, transportConfig, clientConfig, debug } = params;

        if (
            !provider.url ||
            (!provider.url.startsWith('http://') && !provider.url.startsWith('https://'))
        ) {
            throw new Error('Please provide a valid provider url (http:// or https://)');
        }

        super({
            chain,
            provider,
            transport: http(provider.url, transportConfig),
            clientConfig,
        });

        if (debug) {
            console.info(`[Viem] Public Http client initialized (${provider.name})`);
        }
    }
}
