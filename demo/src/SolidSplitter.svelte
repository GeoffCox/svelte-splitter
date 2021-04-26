<script lang="ts">
  import { getContext, hasContext, onMount } from "svelte";
  import { splitterContextKey } from "svelte-splitter";
  import type { SplitterContextStore } from "svelte-splitter";
  
  export let color: string = "silver";
  export let hoverColor: string = "gray";
  export let dragColor: string = "black";

  console.log(`has context: ${hasContext(splitterContextKey)}`);
  let splitterContext: SplitterContextStore = getContext<SplitterContextStore>(splitterContextKey);

  $: dragging = $splitterContext?.dragging;
  $: horizontal = $splitterContext?.horizontal;

  $: console.log(`$splitterContext ${$splitterContext}`);
  $: console.log(`dragging ${dragging}`);
  $: console.log(`horizontal ${horizontal}`);

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
    transition: background-color 300ms;
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
