<script lang="ts">
  import { getContext } from "svelte";
  import { splitterContextKey } from "./constants";
  import type { SplitterContextStore } from "./types";

  // ----- Props -----
  export let color: string = "silver";
  export let hoverColor: string = "gray";
  export let dragColor: string = "black";

  let splitterContext = getContext<SplitterContextStore>(splitterContextKey);

  $: dragging = $splitterContext.dragging;
  $: horizontal = $splitterContext.horizontal;

  let clientWidth;
  let clientHeight;

  $: clientSize = horizontal ? clientHeight : clientWidth;

  $: lineStyles = {
    "--splitter-line-margin": `${Math.max(
      0,
      Math.floor(clientSize / 2) - 1
    )}px`,
    "--splitter-line-size": `${clientSize % 2 === 0 ? 2 : 3}px`,
    "--splitter-line-color": dragging ? dragColor : color,
    "--splitter-line-hover-color": dragging ? dragColor : hoverColor,
  };

  $: lineStyle = Object.entries(lineStyles)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  $: splitterClass = horizontal ? "splitter horizontal" : "splitter vertical";
</script>

<!--
  @component
  The default splitter provides a thin visual line within a larger mouse hit area.
-->
<div class={splitterClass} bind:clientWidth bind:clientHeight tabindex="0">
  <div class="line" style={lineStyle} />
</div>

<style>
  .splitter {
    box-sizing: border-box;

    outline: none;
    overflow: hidden;
    height: 100%;
    width: 100%;
    user-select: none;
  }

  .splitter.vertical {
    cursor: col-resize;
  }

  .splitter.horizontal {
    cursor: row-resize;
  }

  .line {
    background: var(--splitter-line-color);
    transition: background-color 300ms;
  }

  .splitter.vertical > .line {
    height: 100%;
    margin-left: var(--splitter-line-margin);
    margin-top: 0;
    width: var(--splitter-line-size);
  }

  .splitter.horizontal > .line {
    height: var(--splitter-line-size);
    margin-left: 0;
    margin-top: var(--splitter-line-margin);
    width: 100%;
  }

  .splitter:hover > .line {
    background: var(--splitter-line-hover-color);    
  }

  .splitter:focus > .line {
    background: var(--splitter-line-hover-color);
  }
</style>
