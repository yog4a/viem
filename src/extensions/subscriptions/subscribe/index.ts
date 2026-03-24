import type { PublicClient } from 'viem';
import type { Subscribe, EventData } from './types.js';
import { getTransport } from './utils.js';

// Overloads
// ===========================================================

export function createSubscribe(eventName: 'newHeads', client: PublicClient): Subscribe.Result<'newHeads'>;
export function createSubscribe(eventName: 'logs', client: PublicClient): Subscribe.Result<'logs'>;

// Function
// ===========================================================

export function createSubscribe(eventName: keyof Subscribe.Event, wsClient: PublicClient): Subscribe.Result<typeof eventName> {
    // States
    let isActive = false;
    let options: Subscribe.Options<typeof eventName> | undefined;
    
    const subscription = {
        id: undefined,
        unsubscribe: undefined,
    } as {
        id: string | undefined;
        unsubscribe: (() => void) | undefined;
    };

    // Handles reconnection logic
    const _handleReconnect = async (reconnectAttempt: number = 1): Promise<void> => {
        if (!isActive) return;
        try {
            const transport = getTransport(wsClient);
            const socketRpcClient = await (transport as any).getRpcClient();

            // Close the socket (force viem to create a new socket internally)
            socketRpcClient.close(); 

            // Return status message
            options?.onEvent?.(eventName, 
                `Reconnecting to ${eventName} on: ${wsClient.chain?.name}`,
            );

            // Verify if the subscription is already started
            if (subscription.id && socketRpcClient.subscriptions.has(subscription.id)) {
                options?.onError(
                    new Error(`
                        Subscription (${subscription.id}) to ${eventName} already exists,
                        reconnecting (attempt ${reconnectAttempt})...
                    `)
                );
                subscription.unsubscribe?.();
                setTimeout(() => {
                    _handleReconnect(reconnectAttempt + 1);
                }, 5_000);

            } else {
                setTimeout(() => {
                    _handleSubscribe();
                }, 5_000);
            }

        } catch (error) {
            options?.onError(
                new Error(
                    `Error reconnecting to ${eventName} (attempt ${reconnectAttempt}):
                    ${(error as Error).message}
                `)
            );
            setTimeout(() => {
                _handleReconnect(reconnectAttempt + 1);
            }, 1_000);
        }
    };

    // Subscribes to the event using the transport
    const _handleSubscribe = async (): Promise<void> => {
        if (!isActive) return;
        try {
            // Get transport
            const transport = getTransport(wsClient);

            // Subscribe to the event
            const { subscriptionId, unsubscribe } = await (transport as any).subscribe({
                params: [eventName],
                onData: (data: any) => {
                    if (isActive) {
                        options?.onData?.(
                            data.result as EventData[typeof eventName]
                        );
                    }
                },
                onError: (error: Error) => {
                    options?.onError?.(error);
                    _handleReconnect();
                },
            }); 

            // Set subscription id and unsubscribe function
            subscription.id = subscriptionId;
            subscription.unsubscribe = unsubscribe;

            // Return status message
            options?.onEvent?.(eventName, 
                `Subscription to ${eventName} started on: ${wsClient.chain?.name}`,
            );

        } catch (error) {
            options?.onError?.(error as Error);
            _handleReconnect();
        }
    };

    // Starts the subscription process
    const start = async (opts: Subscribe.Options<typeof eventName>): Promise<void> => {
        if (isActive) {
            throw new Error(`Subscription to ${eventName} already active!`);
        }

        // Set options
        isActive = true;
        options = opts;

        // Connect
        await _handleSubscribe();
    };

    // Stops the subscription and resets state
    const stop = (): void => {
        if (!isActive) {
            throw new Error(`Subscription to ${eventName} not active!`);
        }

        // Set inactive
        isActive = false;

        // Unsubscribe from the event
        if (subscription.unsubscribe) {
            subscription.unsubscribe();
        }

        // Reset options
        options = undefined;
        subscription.id = undefined;
        subscription.unsubscribe = undefined;
    };

    return { start, stop };
}
