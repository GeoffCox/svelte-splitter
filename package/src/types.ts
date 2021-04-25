import type { Writable } from "svelte/store";

/**
 * Information for splitter components to use to render based on the Split state.
 */
export type SplitterContextInfo = { dragging: boolean; horizontal: boolean };

/**
 * The store for splitter context.
 */
export type SplitterContextStore = Writable<SplitterContextInfo>;
