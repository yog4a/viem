import * as chainsByName from 'viem/chains';
import type { Chain } from 'viem/chains';

// Constants
// ===========================================================

const chains: Record<number, Chain> = (Object.values(chainsByName) as any[])
  .filter((chain) => typeof chain === 'object' && chain !== null && 'id' in chain)
  .reduce((acc, chain) => {
    acc[chain.id] = chain;
    return acc;
  }, {} as Record<number, Chain>);


// Exports
// ===========================================================

export {
  chains,
  type Chain,
};