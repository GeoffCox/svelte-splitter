import { writable } from 'svelte/store';
import type { SplitInfo } from './types';

/**
 * Provides a lookup of dynamic pane IDs to split information. 
 */
export const splitInfoById = writable<Record<string, SplitInfo>>({});

/**
 * Centralizing updating percents in splitInfo's across all dynamic panes.
 */
export const updatePercentFrozen = writable(false);