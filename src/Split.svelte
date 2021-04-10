<script lang="ts">
  import { onMount, tick } from "svelte";

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

  let percent: (number | undefined) = undefined;

  // ----- Size tracking ----- //
  let clientWidth: number;
  let clientHeight: number;
  let primaryClientWidth: number;
  let primaryClientHeight: number;

  $: clientSize = horizontal ? clientHeight : clientWidth;
  $: primaryClientSize = horizontal ? primaryClientHeight : primaryClientWidth;

  // ----- Drag tracking ----- //
  let startPosition: number;
  let startPrimarySize: number;
  let dragging: boolean;

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

<div
  class={splitClass}
  bind:clientWidth={clientWidth}
  bind:clientHeight={clientHeight}
  style={splitStyle}
>
  <div
    class="primary"
    bind:clientWidth={primaryClientWidth}
    bind:clientHeight={primaryClientHeight}
  >
    <slot name="primary" />
  </div>
  <div
    class="splitter"
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
    on:dblclick={onDoubleClick}
  >
    <slot name="splitter">
      <DefaultSplitter {horizontal} />
    </slot>
  </div>
  <div class="secondary">
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
