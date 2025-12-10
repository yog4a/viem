"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/clients/public.ts
var public_exports = {};
__export(public_exports, {
  DebugCallType: () => DebugCallType,
  HttpClient: () => HttpClient,
  TraceCallType: () => TraceCallType,
  TraceType: () => TraceType,
  WebsocketClient: () => WebsocketClient
});
module.exports = __toCommonJS(public_exports);

// src/clients/public/http/HttpClient.class.ts
var import_viem4 = require("viem");

// src/clients/public/Client.class.ts
var import_viem3 = require("viem");

// src/constants/chains.ts
var chainList = __toESM(require("viem/chains"), 1);
var chains = Object.values(chainList).filter((chain) => typeof chain === "object" && chain !== null && "id" in chain).reduce((acc, chain) => {
  acc[chain.id] = chain;
  return acc;
}, {});

// src/clients/public/extensions/eth/ethGetCode.ts
function ethGetCode_default(client) {
  const method = "eth_getCode";
  return async function(params) {
    const { address, blockNumber } = params;
    const response = await client.request({
      method,
      params: [
        address,
        blockNumber
      ]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return {
      bytecode: response
    };
  };
}
__name(ethGetCode_default, "default");

// src/clients/public/extensions/eth/ethGetLogs.ts
var EthGetLogs;
((EthGetLogs2) => {
  EthGetLogs2.method = "eth_getLogs";
})(EthGetLogs || (EthGetLogs = {}));
function ethGetLogs_default(client) {
  const method = "eth_getLogs";
  return async function(params) {
    const { address, fromBlock, toBlock, topics } = params;
    const response = await client.request({
      method,
      params: [
        {
          address,
          fromBlock,
          toBlock,
          topics
        }
      ]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return response;
  };
}
__name(ethGetLogs_default, "default");

// src/clients/public/extensions/eth/ethGetStorageAt.ts
function ethGetStorageAt_default(client) {
  const method = "eth_getStorageAt";
  return async function(params) {
    const { address, position, blockNumber } = params;
    const response = await client.request({
      method,
      params: [address, position, blockNumber]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return {
      storage: response
    };
  };
}
__name(ethGetStorageAt_default, "default");

// src/clients/public/extensions/eth/ethGetBalance.ts
var import_viem = require("viem");
function ethGetBalance_default(client) {
  const method = "eth_getBalance";
  return async function(params) {
    const { address, blockNumber } = params;
    const response = await client.request({
      method,
      params: [
        address,
        blockNumber
      ]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    const decimals = client.chain.nativeCurrency.decimals;
    const wei = (0, import_viem.hexToBigInt)(response);
    const native = (0, import_viem.formatUnits)(wei, decimals);
    return {
      hexValue: response,
      weiValue: wei.toString(),
      value: native,
      currency: client.chain.nativeCurrency
    };
  };
}
__name(ethGetBalance_default, "default");

// src/clients/public/extensions/eth/ethGetBlockByNumber.ts
function ethGetBlockByNumber_default(client) {
  const method = "eth_getBlockByNumber";
  return async function(params) {
    const { blockNumber, includeTransactions = false } = params;
    const response = await client.request({
      method,
      params: [
        blockNumber,
        includeTransactions
      ]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    if (includeTransactions && response.transactions) {
      const transactionsObject = {};
      const { transactions, ...block } = response;
      for (const tx of transactions) {
        const transactionHash = tx.hash.toLowerCase();
        transactionsObject[transactionHash] = tx;
      }
      return {
        block,
        transactions: transactionsObject
      };
    }
    return {
      block: response
    };
  };
}
__name(ethGetBlockByNumber_default, "default");

// src/clients/public/extensions/eth/ethGetBlockReceipts.ts
function ethGetBlockReceipts_default(client) {
  const method = "eth_getBlockReceipts";
  return async function(params) {
    const { blockNumber } = params;
    const response = await client.request({
      method,
      params: [
        blockNumber
      ]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    const receiptsObject = {};
    for (const receipt of response) {
      const transactionHash = receipt.transactionHash.toLowerCase();
      receiptsObject[transactionHash] = receipt;
    }
    return {
      receipts: receiptsObject
    };
  };
}
__name(ethGetBlockReceipts_default, "default");

// src/clients/public/extensions/eth/ethGetTransactionByHash.ts
function ethGetTransactionByHash_default(client) {
  const method = "eth_getTransactionByHash";
  return async function(params) {
    const { transactionHash } = params;
    const response = await client.request({
      method,
      params: [
        transactionHash
      ]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return {
      hash: response.hash,
      transaction: response
    };
  };
}
__name(ethGetTransactionByHash_default, "default");

// src/clients/public/extensions/eth/ethGetTransactionReceipt.ts
function ethGetTransactionReceipt_default(client) {
  const method = "eth_getTransactionReceipt";
  return async function(params) {
    const { transactionHash } = params;
    const response = await client.request({
      method,
      params: [
        transactionHash
      ]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return {
      hash: response.transactionHash,
      transaction: response
    };
  };
}
__name(ethGetTransactionReceipt_default, "default");

// src/clients/public/extensions/eth/ethBlockNumber.ts
var import_viem2 = require("viem");
function ethBlockNumber_default(client) {
  const method = "eth_blockNumber";
  return async function(params) {
    const response = await client.request({
      method,
      params
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return {
      hexBlockNumber: response,
      bigBlockNumber: (0, import_viem2.fromHex)(response, "bigint"),
      blockNumber: (0, import_viem2.fromHex)(response, "bigint").toString()
    };
  };
}
__name(ethBlockNumber_default, "default");

// src/clients/public/extensions/debug/debugTraceTransaction.ts
function debugTraceTransaction_default(client) {
  const method = "debug_traceTransaction";
  return async function(params) {
    const { transactionHash, tracerOptions } = params;
    const response = await client.request({
      method,
      params: [transactionHash, tracerOptions]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return {
      type: "debug",
      result: response
    };
  };
}
__name(debugTraceTransaction_default, "default");

// src/clients/public/extensions/debug/debugTraceBlockByHash.ts
function debugTraceBlockByHash_default(client) {
  const method = "debug_traceBlockByHash";
  return async function(params) {
    const { blockHash, tracerOptions } = params;
    const response = await client.request({
      method,
      params: [blockHash, tracerOptions]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    const results = {};
    for (const current of response) {
      const transactionHash = current.txHash.toLowerCase();
      results[transactionHash] = current.result;
    }
    return {
      type: "debug",
      results
    };
  };
}
__name(debugTraceBlockByHash_default, "default");

// src/clients/public/extensions/debug/debugTraceBlockByNumber.ts
function debugTraceBlockByNumber_default(client) {
  const method = "debug_traceBlockByNumber";
  return async function(params) {
    const { blockNumber, tracerOptions } = params;
    const response = await client.request({
      method,
      params: [blockNumber, tracerOptions]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    const results = {};
    for (const current of response) {
      const transactionHash = current.txHash.toLowerCase();
      results[transactionHash] = current.result;
    }
    return {
      type: "debug",
      results
    };
  };
}
__name(debugTraceBlockByNumber_default, "default");

// src/clients/public/extensions/trace/traceFilter.ts
function traceFilter_default(client) {
  const method = "trace_filter";
  return async function(params) {
    const response = await client.request({
      method,
      params: [params]
    });
    if (!response) {
      throw new Error(
        `No response from ${method} for ${JSON.stringify(params)}`
      );
    }
    return response;
  };
}
__name(traceFilter_default, "default");

// src/clients/public/extensions/index.ts
function setupCustomCalls(client) {
  return {
    // Eth
    ethBlockNumber: ethBlockNumber_default(client),
    ethGetCode: ethGetCode_default(client),
    ethGetLogs: ethGetLogs_default(client),
    ethGetBalance: ethGetBalance_default(client),
    ethGetStorageAt: ethGetStorageAt_default(client),
    ethGetBlockByNumber: ethGetBlockByNumber_default(client),
    ethGetBlockReceipts: ethGetBlockReceipts_default(client),
    ethGetTransactionByHash: ethGetTransactionByHash_default(client),
    ethGetTransactionReceipt: ethGetTransactionReceipt_default(client),
    // Debug
    debugTraceBlockByNumber: debugTraceBlockByNumber_default(client),
    debugTraceBlockByHash: debugTraceBlockByHash_default(client),
    debugTraceTransaction: debugTraceTransaction_default(client),
    // Trace
    traceFilter: traceFilter_default(client)
  };
}
__name(setupCustomCalls, "setupCustomCalls");

// src/clients/public/Client.class.ts
var Client = class {
  static {
    __name(this, "Client");
  }
  /** Chain */
  chain;
  /** Client */
  client;
  /** Provider */
  provider;
  /** Transport */
  transport;
  /** Custom calls */
  calls;
  // Constructor
  constructor(params) {
    const { chain, provider, transport } = params;
    this.chain = this.setupChain(chain);
    this.provider = provider;
    this.transport = transport;
    this.client = (0, import_viem3.createPublicClient)({
      chain: this.chain,
      // The Chain of the Public Client.
      transport: this.transport
      // The Transport of the Public Client.
    });
    this.calls = setupCustomCalls(this.client);
  }
  // Private
  setupChain(chain) {
    if (typeof chain === "number") {
      if (!(chain in chains)) {
        throw new Error(`Please provide a valid chain (unknown chain: ${chain})`);
      }
      return chains[chain];
    }
    return chain;
  }
};
((Client2) => {
  ;
  ;
  ;
})(Client || (Client = {}));

// src/clients/public/utils.ts
function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
__name(isObject, "isObject");
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }
  }
  return result;
}
__name(deepMerge, "deepMerge");

// src/clients/public/http/config.ts
var defaultConfig = {
  // Enable or configure JSON-RPC batching
  batch: false,
  // Max number of retry attempts on failure
  retryCount: 3,
  // Base delay (ms) between retries (uses exponential backoff)
  retryDelay: 150,
  // Max timeout for any request in milliseconds
  timeout: 1e4
};

// src/clients/public/http/HttpClient.class.ts
var HttpClient = class extends Client {
  static {
    __name(this, "HttpClient");
  }
  constructor(params) {
    const { chain, provider, transportConfig, debug } = params;
    if (!provider.url || !provider.url.startsWith("http")) {
      throw new Error("Please provide a valid url (http:// or https://)");
    }
    const config = deepMerge(defaultConfig, transportConfig);
    const transport = (0, import_viem4.http)(provider.url, config);
    super({ chain, provider, transport, debug });
    if (debug) {
      console.info(
        `[Viem] Http client initialized: ${provider.url.slice(0, 30)}... (${provider.name})`
      );
    }
  }
};
((HttpClient2) => {
  ;
  ;
})(HttpClient || (HttpClient = {}));

// src/clients/public/websocket/WebsocketClient.class.ts
var import_viem5 = require("viem");

// src/clients/public/websocket/config.ts
var defaultConfig2 = {
  // Whether or not to send keep-alive ping messages
  keepAlive: {
    interval: 5 * 60 * 1e3
    // 5 minutes
  },
  // Whether or not to attempt to reconnect on socket failure
  reconnect: {
    attempts: 10,
    // The max number of times to attempt to reconnect
    delay: 2e3
    // Retry delay (in ms) between reconnect attempts
  },
  // The max number of times to retry when a request fails
  retryCount: 1,
  // The base delay (in ms) between retries
  retryDelay: 150,
  // The timeout for async WebSocket requests
  timeout: 15e3
  // 15 seconds
};

// src/clients/public/websocket/WebsocketClient.class.ts
var WebsocketClient = class extends Client {
  static {
    __name(this, "WebsocketClient");
  }
  constructor(params) {
    const { chain, provider, transportConfig, debug } = params;
    if (!provider.url || !provider.url.startsWith("ws")) {
      throw new Error("Please provide a valid url (ws:// or wss://)");
    }
    const config = deepMerge(defaultConfig2, transportConfig);
    const transport = (0, import_viem5.webSocket)(provider.url, config);
    super({ chain, provider, transport, debug });
    if (debug) {
      console.info(
        `[Viem] Websocket client initialized: ${provider.url.slice(0, 30)}... (${provider.name})`
      );
    }
  }
};
((WebsocketClient2) => {
  ;
  ;
})(WebsocketClient || (WebsocketClient = {}));

// src/clients/public/extensions/debug/types/RpcDebugTrace.ts
var DebugCallType = /* @__PURE__ */ ((DebugCallType2) => {
  DebugCallType2["CALL"] = "CALL";
  DebugCallType2["CALLCODE"] = "CALLCODE";
  DebugCallType2["CREATE"] = "CREATE";
  DebugCallType2["CREATE2"] = "CREATE2";
  DebugCallType2["DELEGATECALL"] = "DELEGATECALL";
  DebugCallType2["STATICCALL"] = "STATICCALL";
  DebugCallType2["SELFDESTRUCT"] = "SELFDESTRUCT";
  DebugCallType2["SUICIDE"] = "SUICIDE";
  return DebugCallType2;
})(DebugCallType || {});

// src/clients/public/extensions/trace/types/enums.ts
var TraceType = /* @__PURE__ */ ((TraceType2) => {
  TraceType2["Call"] = "call";
  TraceType2["Create"] = "create";
  TraceType2["Create2"] = "create2";
  TraceType2["Suicide"] = "suicide";
  TraceType2["Reward"] = "reward";
  return TraceType2;
})(TraceType || {});
var TraceCallType = /* @__PURE__ */ ((TraceCallType2) => {
  TraceCallType2["Call"] = "call";
  TraceCallType2["DelegateCall"] = "delegatecall";
  TraceCallType2["StaticCall"] = "staticcall";
  TraceCallType2["CallCode"] = "callcode";
  return TraceCallType2;
})(TraceCallType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DebugCallType,
  HttpClient,
  TraceCallType,
  TraceType,
  WebsocketClient
});
