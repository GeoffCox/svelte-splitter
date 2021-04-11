<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import DefaultSplitter from "./DefaultSplitter.svelte";

  type SplitterPointerEvent = PointerEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  };

  type SplitterKeyboardEvent = KeyboardEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  };

  // ----- Props ----- //

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
    return Math.max(0.0, Math.min(value, 100.0));
  };

  $: measuredPercent = constrainPercent(
    Math.ceil(
      ((primaryClientSize - splitterClientSize) /
        (clientSize - splitterClientSize)) *
        100
    )
  );

  let percent: number | undefined = undefined;

  // ----- Drag tracking ----- //
  
  let startPosition: number;
  let startPrimarySize: number;
  let dragging: boolean;

  // ----- Interface Functions -----//

  /**
   * Sets the percent of the splitter.
   * @param value The percentage. This will be constrained to (0..100)
   */
  export const setPercent = (value: number) => {
    percent = constrainPercent(value);
  }

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  $: dispatch("changed", {
    percent: measuredPercent,
    primarySize: primaryClientSize,
    splitterSize: splitterClientSize,
    secondarySize: secondaryClientSize,    
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

  const onPointerDown = (event: SplitterPointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    startPosition = horizontal ? event.clientY : event.clientX;
    startPrimarySize = primaryClientSize;
    dragging = true;
  };

  const onPointerMove = (event: SplitterPointerEvent) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      const position = horizontal ? event.clientY : event.clientX;
      let newPrimarySize = startPrimarySize + (position - startPosition);
      newPrimarySize = Math.max(0, Math.min(newPrimarySize, clientSize));
      const newPercent = (newPrimarySize / clientSize) * 100;
      percent = newPercent;
    }
  };

  const onPointerUp = (event: SplitterPointerEvent) => {
    //console.log(`onPointerUp`);
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragging = false;
  };

  const onDoubleClick = () => {
    resetOnDoubleClick && (percent = undefined);
  };

  const onKeyDown = (event: SplitterKeyboardEvent) => {
    const origPercent = percent || measuredPercent;

    // only move for vanilla arrow keys
    if (horizontal && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      switch (event.key) {
        case "ArrowUp":
          percent = constrainPercent(origPercent - 1);
          break;
        case "ArrowDown":
          percent = constrainPercent(origPercent + 1);
          break;
      }
    } else {
      switch (event.key) {
        case "ArrowLeft":
          percent = constrainPercent(origPercent - 1);
          break;
        case "ArrowRight":
          percent = constrainPercent(origPercent + 1);
          break;
      }
      
    }
  };
</script>

<!--
  @component
  Provides a a draggable splitter between two controls.
  
  - The split can be a vertical left/right or horizontal top/bottom.
  - The left/right and top/bottom are referred to as primary/secondary.
  - Options include initial primary size, minimum primary/secondary sizes, and splitter size.
  - Subscribe to the changed event to monitor split percent and sizes of primary, splitter, and secondary.
  - Call the setPercent method to directly control the splitter position.
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
    on:keydown={onKeyDown}    
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
  }
</style>
