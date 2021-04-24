/**
 * The type of splitter to allow for visual customization.
 */
export type SplitterType = "default" | "solid" | "striped";

/**
 * The options to create a split.
 */
export type SplitOptions = {
  horizontal: boolean;
  initialPrimarySize: string;
  minPrimarySize: string;
  minSecondarySize: string;
  splitterSize: string;
  resetOnDoubleClick: boolean;
  splitterType: SplitterType;
};

/**
 * The split info for a dynamic pane.
 */
export type SplitInfo = {  
  options?: SplitOptions;  
  primaryId?: string;
  secondaryId?: string;
  percent?: number;
};
