<script lang="ts">
  import { getContext } from "svelte";
  import { splitterContextKey } from "svelte-splitter";
  import type { SplitterContextStore } from "svelte-splitter";
  import Stripes from "./Stripes.svelte";
  import { tweenedColor } from "./tweenedColor";

  // ----- Props -----
  export let color1: string = "#00ccff";
  export let color2: string = "#53ddff";
  export let hoverColor1: string = "#05cc0f";
  export let hoverColor2: string = "#5cfc57";
  export let dragColor1: string = "#cc0505";
  export let dragColor2: string = "#fc5757";

  let splitterContext = getContext<SplitterContextStore>(splitterContextKey);

  $: dragging = $splitterContext.dragging;
  $: horizontal = $splitterContext.horizontal;

  // ----- Mouse Hover tracking -----
  let hover = false;

  const onMouseEnter = () => {
    hover = true;
  };

  const onMouseLeave = () => {
    hover = false;
  };

  // ----- Color changes -----
  const tweenedColor1 = tweenedColor(color1);
  const tweenedColor2 = tweenedColor(color2);

  $: dynamicColor1 = dragging ? dragColor1 : hover ? hoverColor1 : color1;
  $: dynamicColor2 = dragging ? dragColor2 : hover ? hoverColor2 : color2;

  $: tweenedColor1.set(dynamicColor1);
  $: tweenedColor2.set(dynamicColor2);

  $: splitterStyles = {
    "--background-color": dynamicColor2,
    "--focus-color": dynamicColor1,
    "--border-horizontal": horizontal ? '1.25px solid' : '0',
    "--border-vertical": horizontal ? '0' : '1.25px solid',
  };

  $: splitterStyle = Object.entries(splitterStyles)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  $: splitterClass = horizontal ? "splitter horizontal" : "splitter vertical";
</script>

<!--
  @component
  A custom splitter control for use with Split.
  Displays an animated stripe with dynamic color changes when hoving, focused, and dragging.
-->
<div
  class={splitterClass}
  style={splitterStyle}
  tabindex="0"
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
>
  <Stripes
    color1={`${$tweenedColor1}`}
    color2={`${$tweenedColor2}`}
    {horizontal}
  />
</div>

<style>
  .splitter {
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    height: 100%;
    width: 100%;
    user-select: none;
    background: var(--background-color);
    border-top: var(--border-horizontal);
    border-right: var(--border-vertical);
    border-bottom: var(--border-horizontal);
    border-left: var(--border-vertical);
    border-color: transparent;
    transition: border-color 300ms;
  }

  .splitter.vertical {
    cursor: col-resize;
  }

  .splitter.horizontal {
    cursor: row-resize;
  }

  .splitter:focus {        
    border-color: var(--focus-color);
  }
</style>
