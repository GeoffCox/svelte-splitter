import { writable } from 'svelte/store';
import type { SplitInfo } from './types';

/**
 * Provides a lookup of dynamic pane IDs to split information. 
 */
export const splitInfoById = writable<Record<string, SplitInfo>>({});

/**
 * The ID of the top dynamic pane.
 */
export const rootDynamicPaneId = writable<string>('');

/**
 * Centralizing updating percents in splitInfo's across all dynamic panes.
 */
export const updatePercentFrozen = writable(false);