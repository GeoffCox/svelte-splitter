<script lang="ts">
  import { getContext } from "svelte";
  import { splitterContextKey } from "./constants";
  import type { SplitterContextStore } from "./types";

  export let color: string = "silver";
  export let hoverColor: string = "gray";
  export let dragColor: string = "black";

  let splitterContext = getContext<SplitterContextStore>(splitterContextKey);

  $: dragging = $splitterContext.dragging;
  $: horizontal = $splitterContext.horizontal;

  $: splitterStyles = {
    "--splitter-color": dragging ? dragColor : color,
    "--splitter-hover-color": dragging ? dragColor : hoverColor,
  };

  $: splitterStyle = Object.entries(splitterStyles)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  $: splitterClass = horizontal ? "splitter horizontal" : "splitter vertical";
</script>

<div class={splitterClass} style={splitterStyle} tabindex="0" />

<style>
  .splitter {
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    height: 100%;
    width: 100%;
    user-select: none;
    background: var(--splitter-color);
  }

  .splitter.vertical {
    cursor: col-resize;
  }

  .splitter.horizontal {
    cursor: row-resize;
  }

  .splitter:hover {
    background: var(--splitter-hover-color);
  }

  .splitter:focus {
    background: var(--splitter-hover-color);
  }
</style>
