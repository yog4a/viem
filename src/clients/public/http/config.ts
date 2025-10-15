import { type HttpTransportConfig } from 'viem';

// Default Transport Config
// ===========================================================

export const defaultConfig = {
    // Enable or configure JSON-RPC batching
    batch: false,
    // Max number of retry attempts on failure
    retryCount: 3,
    // Base delay (ms) between retries (uses exponential backoff)
    retryDelay: 150,
    // Max timeout for any request in milliseconds
    timeout: 10_000,
} satisfies HttpTransportConfig;
