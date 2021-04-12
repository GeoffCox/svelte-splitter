<script lang="ts">
  import { getContext } from "svelte";
  import { splitterContextKey } from "./constants";
  import type { SplitterContextStore } from "./types";

  export let color1: string = "#00ccff";
  export let color2: string = "#53ddff";
  export let hoverColor1: string = "#05cc0f";
  export let hoverColor2: string = "#5cfc57";
  export let dragColor1: string = "#cc0505";
  export let dragColor2: string = "#fc5757";

  let splitterContext = getContext<SplitterContextStore>(splitterContextKey);

  $: dragging = $splitterContext.dragging;
  $: horizontal = $splitterContext.horizontal;

  $: splitterStyles = {
    "--color1": dragging ? dragColor1 : color1,
    "--color2": dragging ? dragColor2 : color2,
    "--hover-color1": dragging ? dragColor1 : hoverColor1,
    "--hover-color2": dragging ? dragColor2 : hoverColor2,
  };

  $: splitterStyle = Object.entries(splitterStyles)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

  $: splitterClass = horizontal ? "splitter horizontal" : "splitter vertical";
</script>

<div class={splitterClass} style={splitterStyle} tabindex="0">
  <div class="stripes-container">
    <div class="stripes" />
  </div>
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

  .splitter:focus {
    border: 1px solid;
    border-color: var(--color1);
  }
  
  .splitter:focus.splitter:hover {
    border: 1px solid;
    border-color: var(--hover-color1);
  }

  .stripes-container {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .stripes {    
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    user-select: none;
    background: var(--splitter-color);
    --stripe-size: 50px;
    --duration: 2s;
  }

  @keyframes verticalStripeAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(var(--stripe-size) * -1));
    }
  }

  .splitter.vertical .stripes:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + var(--stripe-size));
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      var(--color2) 25%,
      var(--color2) 50%,
      var(--color1) 50%,
      var(--color1) 75%
    );
    background-size: var(--stripe-size) var(--stripe-size);
    animation: verticalStripeAnimation var(--duration) linear infinite;
  }

  .splitter.vertical:hover .stripes:before {
    background: repeating-linear-gradient(
      45deg,
      var(--hover-color2) 25%,
      var(--hover-color2) 50%,
      var(--hover-color1) 50%,
      var(--hover-color1) 75%
    );
    background-size: var(--stripe-size) var(--stripe-size);
  }

  .splitter.vertical .stripes:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(#1b2735, 0) 0%,
      #090e0f 100%
    );
  }

  @keyframes horizontalStripeAnimation {
    0% {
      transform: translateX(calc(var(--stripe-size) * -1));
    }
    100% {
      transform: translateX(0);
    }
  }

  .splitter.horizontal .stripes:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + var(--stripe-size));
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      var(--color2) 25%,
      var(--color2) 50%,
      var(--color1) 50%,
      var(--color1) 75%
    );
    background-size: var(--stripe-size) var(--stripe-size);
    animation: horizontalStripeAnimation var(--duration) linear infinite;
  }

  .splitter.horizontal:hover .stripes:before {
    background: repeating-linear-gradient(
      45deg,
      var(--hover-color2) 25%,
      var(--hover-color2) 50%,
      var(--hover-color1) 50%,
      var(--hover-color1) 75%
    );
    background-size: var(--stripe-size) var(--stripe-size);
  }

  .splitter.horizontal .stripes:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(#1b2735, 0) 0%,
      #090a0f 100%
    );
  }  
</style>
