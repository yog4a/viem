import { type WebSocketTransportConfig } from 'viem';

// Default Transport Config
// ===========================================================

export const defaultConfig = {
    // Whether or not to send keep-alive ping messages
    keepAlive: { 
        interval: 5*60*1000 // 5 minutes
    }, 
    // Whether or not to attempt to reconnect on socket failure
    reconnect: { 
        attempts: 10, // The max number of times to attempt to reconnect
        delay: 2_000 // Retry delay (in ms) between reconnect attempts
    },
    // The max number of times to retry when a request fails
    retryCount: 1,
    // The base delay (in ms) between retries
    retryDelay: 150,
    // The timeout for async WebSocket requests
    timeout: 15_000, // 15 seconds
} satisfies WebSocketTransportConfig;