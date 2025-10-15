import * as chainList from 'viem/chains';
import type { Chain } from 'viem/chains';

// Constants
// ===========================================================

export const chains: Record<number, Chain> = {
  1: chainList.mainnet,
  56: chainList.bsc,
  137: chainList.polygon,
  8453: chainList.base,
  9745: chainList.plasma,
  42161: chainList.arbitrum,
  43114: chainList.avalanche,
};

export type { Chain };