/**
 * The type of splitter to allow for visual customization.
 */
export type SplitterType = "default" | "solid" | "striped";

/**
 * The options to create a split.
 */
export type SplitOptions = {
  initialPrimarySize: string;
  minPrimarySize: string;
  minSecondarySize: string;
  splitterSize: string;
  resetOnDoubleClick: boolean;
  splitterType: SplitterType;
};
