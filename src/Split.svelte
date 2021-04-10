<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import DefaultSplitter from "./DefaultSplitter.svelte";

  type MousePointerEvent = PointerEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  };

  export let horizontal: boolean = false;
  export let initialPrimarySize: string = "50%";
  export let minPrimarySize: string = "0";
  export let minSecondarySize: string = "0";
  export let splitterSize: string = "7px";
  export let resetOnDoubleClick: boolean = true;

  // ----- Size tracking ----- //
  let clientWidth: number;
  let clientHeight: number;
  let primaryClientWidth: number;
  let primaryClientHeight: number;
  let splitterClientWidth: number;
  let splitterClientHeight: number;
  let secondaryClientWidth: number;
  let secondaryClientHeight: number;

  $: clientSize = horizontal ? clientHeight : clientWidth;
  $: primaryClientSize = horizontal ? primaryClientHeight : primaryClientWidth;
  $: splitterClientSize = horizontal
    ? splitterClientHeight
    : splitterClientWidth;
  $: secondaryClientSize = horizontal
    ? secondaryClientHeight
    : secondaryClientWidth;

  const constrainPercent = (value: number) => {
    return Math.max(0, value, Math.min(value, 100));
  };

  $: measuredPercent = constrainPercent(
    Math.ceil(
      ((primaryClientSize - splitterClientSize / 2) /
        (clientSize - splitterClientSize)) *
        100
    )
  );

  let percent: number | undefined = undefined;

  // ----- Drag tracking ----- //
  let startPosition: number;
  let startPrimarySize: number;
  let dragging: boolean;

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  $: dispatch("changed", {
    primarySize: primaryClientSize,
    splitterSize: splitterClientSize,
    secondarySize: secondaryClientSize,
    percent: measuredPercent,
  });

  // ----- Dynamic styles ----- //

  $: primarySize = percent !== undefined ? `${percent}%` : initialPrimarySize;

  $: splitCssVars = {
    "--primary-size": `${primarySize}`,
    "--min-primary-size": `${minPrimarySize}`,
    "--min-secondary-size": `${minSecondarySize}`,
    "--splitter-size": `${splitterSize}`,
  };

  $: splitStyle = Object.entries(splitCssVars)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  $: splitClass = horizontal ? "split horizontal" : "split vertical";

  // ----- Event handlers ----- //

  const onPointerDown = (event: MousePointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    startPosition = horizontal ? event.clientY : event.clientX;
    startPrimarySize = primaryClientSize;
    dragging = true;
  };

  const onPointerMove = (event: MousePointerEvent) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      const position = horizontal ? event.clientY : event.clientX;
      let newPrimarySize = startPrimarySize + (position - startPosition);
      newPrimarySize = Math.max(0, Math.min(newPrimarySize, clientSize));
      const newPercent = (newPrimarySize / clientSize) * 100;
      percent = newPercent;
    }
  };

  const onPointerUp = (event: MousePointerEvent) => {
    //console.log(`onPointerUp`);
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragging = false;
  };

  const onDoubleClick = () => {
    resetOnDoubleClick && (percent = undefined);
  };
</script>

<!--
  @component
  Provides a a draggable splitter between two controls.
  
  - The split can be a vertical left/right or horizontal top/bottom.
  - The left/right and top/bottom are referred to as primary/secondary.
  - Options include initial primary size, minimum primary/secondary sizes, and splitter size.
  - Subscribe to the changed event to monitor the sizes and the split percent.
-->
<div class={splitClass} bind:clientWidth bind:clientHeight style={splitStyle}>
  <div
    class="primary"
    bind:clientWidth={primaryClientWidth}
    bind:clientHeight={primaryClientHeight}
  >
    <slot name="primary" />
  </div>
  <div
    class="splitter"
    bind:clientWidth={splitterClientWidth}
    bind:clientHeight={splitterClientHeight}
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
    on:dblclick={onDoubleClick}
  >
    <slot name="splitter">
      <DefaultSplitter {horizontal} />
    </slot>
  </div>
  <div
    class="secondary"
    bind:clientWidth={secondaryClientWidth}
    bind:clientHeight={secondaryClientHeight}
  >
    <slot name="secondary" />
  </div>
</div>

<style>
  .split {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    display: grid;
  }

  .split.vertical {
    grid-template-columns:
      minmax(var(--min-primary-size), var(--primary-size)) var(--splitter-size)
      minmax(var(--min-secondary-size), 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: "primary splitter secondary";
  }

  .split.horizontal {
    grid-template-columns: 1fr;
    grid-template-rows:
      minmax(var(--min-primary-size), var(--primary-size)) var(--splitter-size)
      minmax(var(--min-secondary-size), 1fr);
    grid-template-areas: "primary" "splitter" "secondary";
  }

  .split > div {
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    height: 100%;
  }

  .primary {
    grid-area: primary;
    height: 100%;
    width: 100%;
    background: rgb(136, 223, 252);
  }

  .splitter {
    grid-area: splitter;
    height: 100%;
    width: 100%;
  }

  .secondary {
    grid-area: secondary;
    height: 100%;
    width: 100%;
    background: rgb(136, 223, 252);
  }
</style>
