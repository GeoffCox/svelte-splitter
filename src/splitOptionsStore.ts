import { derived, writable } from 'svelte/store';
import type { SplitOptions } from './types';

export const initialPrimarySize = writable('50%');
export const minPrimarySize = writable('0');
export const minSecondarySize = writable('0');
export const resetOnDoubleClick = writable(true);
export const splitterSize = writable('7px');
export const splitterType = writable('default');

export const splitOptions = derived(
  [
    initialPrimarySize,
    minPrimarySize,
    minSecondarySize,
    resetOnDoubleClick,
    splitterSize,
    splitterType,
  ],
  ([
    $initialPrimarySize,
    $minPrimarySize,
    $minSecondarySize,
    $resetOnDoubleClick,
    $splitterSize,
    $splitterType,
  ]) => {
      return {
        initialPrimarySize: initialPrimarySize,
        minPrimarySize: minPrimarySize,
        minSecondarySize: minSecondarySize,
        resetOnDoubleClick: resetOnDoubleClick,
        splitterSize: splitterSize,
        splitterType: splitterType,
      };
  }
);
