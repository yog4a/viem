import type { RpcBlock, RpcLog } from 'viem';

//  Types
// ===========================================================

export type EventData = {
    'newHeads': RpcBlock;
    'logs': RpcLog;
};

export namespace Subscribe {
    export type Event = {
        'newHeads': Result<'newHeads'>;
        'logs': Result<'logs'>;
    };
    export type Result<T extends keyof Event> = {
        start: (opts: Options<T>) => void;
        stop: () => void;
    };
    export type Options<T extends keyof Event> = {
        onData: (data: EventData[T]) => void;
        onError: (error: Error) => void;
        onEvent?: (type: string, message: string) => void;
    };
}
