# Yog4a | viem

A personal encapsulation module for [Viem](https://viem.sh), providing enhanced functionality.

- Re-exports of core `viem` and `viem/chains`
- Ready-to-use public clients (HTTP & WebSocket)
- Extra typed JSON-RPC helpers for `eth_*`, `debug_*`, and `trace_*` methods

## Installation

```bash
npm install git+https://github.com/yog4a/viem.git
pnpm add git+https://github.com/yog4a/viem.git
```

## Exports

This package exposes 4 entry points:

- `@yog4a/viem` -> re-exports `viem`
- `@yog4a/viem/chains` -> re-exports `viem/chains`
- `@yog4a/viem/clients` -> custom client classes (public, wallet, test)
- `@yog4a/viem/extensions` -> custom RPC setup + extension types

---

## 1) Core viem re-export

```ts
import { createPublicClient, http } from '@yog4a/viem';
```

Use it exactly like `viem`, but through your package.

---

## 2) Chains re-export

```ts
import { mainnet, sepolia } from '@yog4a/viem/chains';
```

---

## 3) Clients

### `PublicHttpClient`

Creates a typed Viem public client with HTTP transport.

```ts
import { PublicHttpClient } from '@yog4a/viem/clients';

const httpClient = new PublicHttpClient({
  chain: 1, // number or native viem `Chain` object
  provider: {
    name: 'alchemy',
    url: 'https://eth-mainnet.g.alchemy.com/v2/KEY',
  },
  // optional
  transportConfig: {},
  clientConfig: {},
  debug: true,
});

const client = httpClient.client; // viem PublicClient
```

### `PublicWebsocketClient`

Creates a typed Viem public client with WebSocket transport.

```ts
import { PublicWebsocketClient } from '@yog4a/viem/clients';

const wsClient = new PublicWebsocketClient({
  chain: 1, // number or native viem `Chain` object
  provider: {
    name: 'alchemy',
    url: 'wss://eth-mainnet.g.alchemy.com/v2/KEY',
  },
  // optional
  transportConfig: {},
  clientConfig: {},
  debug: true,
});

const client = wsClient.client; // viem PublicClient
```

### Client behavior

- Accepts `chain` as:
  - chain id (`number`)
  - full Viem `Chain` object
- If `chain` is a number, it resolves it from `viem/chains`
- Throws if chain id is unknown
- Validates provider URL format:
  - HTTP client: `http://` or `https://`
  - WebSocket client: `ws://` or `wss://`

---

## 4) Extensions (custom RPC calls)

Use `setupCustomRpcCalls(client)` to attach all helper RPC methods to an existing Viem `PublicClient`.

```ts
import { setupCustomRpcCalls } from '@yog4a/viem/extensions';
import { PublicHttpClient } from '@yog4a/viem/clients';

const httpClient = new PublicHttpClient({
  chain: 1,
  provider: {
    name: 'provider',
    url: 'https://your-rpc-url',
  },
});

const rpc = setupCustomRpcCalls(httpClient.client);

// Example calls:
const bn = await rpc.ethBlockNumber([]);
const tx = await rpc.ethGetTransactionByHash({
  transactionHash: '0x...',
});
```

---

## Available extension methods

### ETH helpers

- `ethBlockNumber([])`
- `ethGetCode({ address, blockNumber? })`
- `ethGetLogs({ address, fromBlock, toBlock, topics? })`
- `ethGetBalance({ address, blockNumber })`
- `ethGetStorageAt({ address, position, blockNumber })`
- `ethGetBlockByNumber(blockNumber, includeTransactions)`
- `ethGetBlockReceipts(blockNumberOrTag)`
- `ethGetTransactionByHash({ transactionHash })`
- `ethGetTransactionReceipt({ transactionHash })`

### DEBUG helpers

- `debugTraceBlockByHash(blockHash, config?)`
- `debugTraceBlockByNumber(blockNumberOrTag, config?)`
- `debugTraceTransaction(txHash, config?)`

### TRACE helpers

- `traceBlock(blockNumberOrTag)`
- `traceFilter(filterObject)`
- `traceTransaction(txHash)`

> These methods call `client.request(...)` internally and return typed responses.

---

## Type exports

From `@yog4a/viem/extensions` you also get exported types for:

- ETH extension params/results
- DEBUG trace config + response structures
- TRACE action/result structures

So you can type your app code without deep-importing internals.

---

## Full example

```ts
import { PublicHttpClient } from '@yog4a/viem/clients';
import { setupCustomRpcCalls } from '@yog4a/viem/extensions';

async function main() {
  const httpClient = new PublicHttpClient({
    chain: 1,
    provider: {
      name: 'mainnet',
      url: 'https://your-rpc-url',
    },
  });

  const rpc = setupCustomRpcCalls(httpClient.client);

  const { blockNumber } = await rpc.ethBlockNumber([]);
  console.log('Latest block:', blockNumber);

  const receipts = await rpc.ethGetBlockReceipts('latest');
  console.log('Receipts count:', Object.keys(receipts.receipts).length);
}

main().catch(console.error);
```

---

## Notes

- Runtime target: Node.js + TypeScript
- Module type: ESM package with CJS/ESM build outputs
- Custom RPC methods require upstream node support (some `debug_*` / `trace_*` methods may not be enabled on all providers)

## License

Creative Commons Attribution–NonCommercial 4.0 International (CC BY-NC 4.0)
