import * as chainList from 'viem/chains';
import type { Chain } from 'viem/chains';

// Constants
// ===========================================================

export const chains: Record<number, Chain> = (Object.values(chainList) as any[])
  .filter((chain) => typeof chain === 'object' && chain !== null && 'id' in chain)
  .reduce((acc, chain) => {
    acc[chain.id] = chain;
    return acc;
  }, {} as Record<number, Chain>);

export type { Chain };