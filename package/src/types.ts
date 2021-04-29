import type { Writable } from "svelte/store";

/**
 * Information for splitter components to use to render based on the Split state.
 */
export type SplitterContextInfo = { 
    /**
     * If the user is dragging the splitter, true; false otherwise.
     */    
    dragging: boolean; 
    /**
     * If the splitter is horizontal, true; false otherwise;
     */
    horizontal: boolean };

/**
 * The store for splitter context.
 */
export type SplitterContextStore = Writable<SplitterContextInfo>;
