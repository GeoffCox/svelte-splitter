import { derived, writable } from 'svelte/store';
import type { SplitOptions } from './types';

export const horizontal = writable(false);
export const initialPrimarySize = writable('50%');
export const minPrimarySize = writable('0');
export const minSecondarySize = writable('0');
export const resetOnDoubleClick = writable(true);
export const splitterSize = writable('7px');
export const splitterType = writable('default');

export const splitOptions = derived(
  [
    horizontal,
    initialPrimarySize,
    minPrimarySize,
    minSecondarySize,
    resetOnDoubleClick,
    splitterSize,
    splitterType,
  ],
  ([
    $horizontal,
    $initialPrimarySize,
    $minPrimarySize,
    $minSecondarySize,
    $resetOnDoubleClick,
    $splitterSize,
    $splitterType,
  ]) => {
      return {
        horizontal: $horizontal,
        initialPrimarySize: $initialPrimarySize,
        minPrimarySize: $minPrimarySize,
        minSecondarySize: $minSecondarySize,
        resetOnDoubleClick: $resetOnDoubleClick,
        splitterSize: $splitterSize,
        splitterType: $splitterType,
      };
  }
);
