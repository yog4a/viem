import type { PublicClient } from 'viem';
import type { Subscribe } from './subscribe/types.js';
import { createSubscribe } from './subscribe/index.js';

// Functions
// ===========================================================

export const subscriptions = {
    newHeads: (client: PublicClient): Subscribe.Result<'newHeads'> => {
        return createSubscribe("newHeads", client);
    },
    logs: (client: PublicClient): Subscribe.Result<'logs'> => {
        return createSubscribe("logs", client);
    }
};

export type { Subscribe };