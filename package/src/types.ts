import type { Writable } from "svelte/store";

export type SplitterContextInfo = { dragging: boolean; horizontal: boolean };

export type SplitterContextStore = Writable<SplitterContextInfo>;
