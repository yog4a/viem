# @yog4a/viem

A personal encapsulation module for [Viem](https://viem.sh), providing enhanced functionality.

## License

This project is licensed under the **Creative Commons Attribution–NonCommercial 4.0 International License (CC BY-NC 4.0)**.  
You’re free to use and modify it for personal or open-source projects, **but commercial use is not allowed**.

## Installation

```bash
npm install github:yog4a/viem
pnpm add github:yog4a/viem
```

## Usage

```typescript
// Re-exported Viem library
import { viem } from '@yog4a/viem'; 
// Encapsulated Viem library
import { HttpClient, WebsocketClient } from '@yog4a/viem/public';

const httpClient = new HttpClient({ 
    chain: 1,   // Chain ID OR Chain (from viem)
    provider: {
        name: provider.name, // Provider name
        url: provider.endpoints.ethereum.http as `https://${string}`, // Provider URL
        type: provider.endpoints.ethereum.type as 'debug' | 'trace',  // Provider type
    },
    debug: true, // Debug mode (show messages)
});

const websocketClient = new WebsocketClient({ 
    chain: 1,  // Chain ID OR Chain (from viem)
    provider: {
        name: provider.name, // Provider name
        url: provider.endpoints.ethereum.wss as `wss://${string}`, // Provider URL
        type: provider.endpoints.ethereum.type as 'debug' | 'trace', // Provider type
    },
    transportConfig: {
        // Override transport config
    },
    debug: true, // Debug mode (show messages)
});
```