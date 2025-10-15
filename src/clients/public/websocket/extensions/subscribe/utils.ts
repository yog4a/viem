import type { Transport, WebSocketTransport, PublicClient } from 'viem';

// Function
// ===========================================================

export const getTransport = (client: PublicClient): WebSocketTransport => {
    if (client.transport.type === 'fallback') {
        const transport = client.transport['transports'].find(
            (t: ReturnType<Transport>) => t.config.type === 'webSocket'
        );
        if (transport) {
            return transport.value;
        }
    }
    return client.transport as unknown as WebSocketTransport;
};

export async function setupSocketListeners(transport: WebSocketTransport, onClose?: () => void, onError?: (error: Event) => void): Promise<void> {
    const rpcClientSocket = await (transport as any).getRpcClient();

    const _onOpen = (_: Event) => {
        // drop
    };

    const _onMessage = (_: any) => {
        // drop
    };

    const _onError = (ev: Event) => {
        onError?.(ev);
    };

    const _onClose = () => {
        onClose?.();
        removeEventListeners();
        // NOTE: IMPORTANT: invalidate viem's socketClientCache! When close
        // happens on socket level, the same socketClient with the closed websocket will be
        // re-used from cache leading to 'Socket is closed.' error.
        rpcClientSocket.close();
        setTimeout(async () => {
            setupEventListeners();
        }, 1_000);
    };

    const setupEventListeners = () => {
        rpcClientSocket.socket.addEventListener("open", _onOpen);
        rpcClientSocket.socket.addEventListener("message", _onMessage);
        rpcClientSocket.socket.addEventListener("error", _onError);
        rpcClientSocket.socket.addEventListener("close", _onClose);
    };

    const removeEventListeners = () => {
        rpcClientSocket.socket.removeEventListener("open", _onOpen);
        rpcClientSocket.socket.removeEventListener("message", _onMessage);
        rpcClientSocket.socket.removeEventListener("error", _onError);
        rpcClientSocket.socket.removeEventListener("close", _onClose);
    };

    setupEventListeners();

    return rpcClientSocket;
}