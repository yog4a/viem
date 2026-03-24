import { t as __name } from "./chunk-UvegZiLi.mjs";
import { Chain, HttpTransport, HttpTransportConfig, PublicClient, PublicClientConfig, WebSocketTransport, WebSocketTransportConfig } from "viem";
import { Chain as Chain$1 } from "viem/chains";

//#region src/clients/public-client/client.websocket.d.ts
declare class PublicWebsocketClient extends PublicBaseClient<'websocket'> {
  constructor(params: PublicWebsocketClientParameters);
}
interface PublicWebsocketClientProvider {
  name: string;
  url: `ws://${string}` | `wss://${string}`;
}
interface PublicWebsocketClientParameters {
  chain: number | Chain;
  provider: PublicWebsocketClientProvider;
  transportConfig?: WebSocketTransportConfig;
  clientConfig?: Omit<PublicClientConfig<WebSocketTransport, Chain>, 'chain' | 'transport'>;
  debug?: boolean;
}
//#endregion
//#region src/clients/public-client/client.base.d.ts
declare class PublicBaseClient<T extends keyof PublicBaseClientTransport> {
  /** Chain */
  readonly chain: Chain$1;
  /** Client */
  readonly client: PublicBaseClientPublic<T>;
  /** Provider */
  readonly provider: PublicBaseClientProvider[T];
  /** Transport */
  readonly transport: PublicBaseClientTransport[T];
  /**
   * Constructor
   * @param params The parameters for the client
   * @param params.chain The chain to use
   * @param params.provider The provider to use
   * @param params.transport The transport to use
   * @param params.clientConfig The client config to use
   */
  constructor(params: PublicBaseClientParameters<T>);
  /**
   * Setup the chain
   * @param chain The chain to use (number or Chain object)
   * @returns The chain object
   */
  private setupChain;
}
/** The public client type */
type PublicBaseClientPublic<T extends keyof PublicBaseClientTransport> = PublicClient<PublicBaseClientTransport[T], Chain$1>;
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
  chain: number | Chain$1;
  provider: PublicBaseClientProvider[T];
  transport: PublicBaseClientTransport[T];
  clientConfig?: Omit<PublicClientConfig<PublicBaseClientTransport[T], Chain$1>, 'chain' | 'transport'>;
}
//#endregion
//#region src/clients/public-client/client.http.d.ts
declare class PublicHttpClient extends PublicBaseClient<'http'> {
  constructor(params: PublicHttpClientParameters);
}
interface PublicHttpClientProvider {
  name: string;
  url: `http://${string}` | `https://${string}`;
}
interface PublicHttpClientParameters {
  chain: number | Chain;
  provider: PublicHttpClientProvider;
  transportConfig?: HttpTransportConfig;
  clientConfig?: Omit<PublicClientConfig<HttpTransport, Chain>, 'chain' | 'transport'>;
  debug?: boolean;
}
//#endregion
export { PublicHttpClient, type PublicHttpClientParameters, type PublicHttpClientProvider, PublicWebsocketClient, type PublicWebsocketClientParameters, type PublicWebsocketClientProvider };
//# sourceMappingURL=clients.d.mts.map