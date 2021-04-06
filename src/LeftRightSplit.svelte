<script lang='ts'>
import { tick } from 'svelte';

  import DefaultSplitter from './DefaultSplitter.svelte';

  type MousePointerEvent = PointerEvent & {
    currentTarget: EventTarget & HTMLDivElement;
  };

  export let initialPrimarySize: string = '50%';
  export let minPrimarySize: string = '0';
  export let minSecondarySize: string = '0';
  export let splitterSize: string = '7px';
  export let resetOnDoubleClick: boolean = false;

  let contentSize: number;
  let primarySize: number;
  let startDragX: number;
  let startPrimarySize: number;
  let dragging: boolean;

  //$: console.log(`contentWidth: ${contentSize}`);
  //$: console.log(`primaryWidth: ${primarySize}`);

  let percent = 50;

  $: splitCssVars = {
    '--primary-size': `${percent}%`,
    '--min-primary-size': `0`,
    '--min-secondary-size': '0',
    '--splitter-size': `${splitterSize}`,
  };

  $: splitStyle = Object.entries(splitCssVars)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');

  const onPointerDown = (event: MousePointerEvent) => {
    //console.log(`onPointerDown: X:${event.clientX} size:${primarySize}`);
    event.currentTarget.setPointerCapture(event.pointerId);
    startDragX = event.clientX;
    startPrimarySize = primarySize;
    dragging = true;    
  };

  const onPointerMove = (event: MousePointerEvent) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {      
      //console.log(`onPointerMove: X:${event.clientX} start:${startPrimarySize} size:${primarySize}`);      
      const position = event.clientX;
      let newPrimarySize = startPrimarySize + (position - startDragX);
      newPrimarySize = Math.max(0, Math.min(newPrimarySize, contentSize));
      const newPercent = (newPrimarySize / contentSize) * 100;
      //console.log(`onPointerMove: newSize:${newPrimarySize} newPercent:${newPercent}`);
      percent = newPercent;
    }    
  };

  const onPointerUp = (event: MousePointerEvent) => {
    //console.log(`onPointerUp`);
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragging = false;
  };
</script>

<div class='split' bind:clientWidth={contentSize} style={splitStyle}>
  <div class='primary' bind:clientWidth={primarySize}>
    <slot name='primary' />
  </div>
  <div
    class='splitter'
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}
  >
    <slot name='splitter'>
      <DefaultSplitter />
    </slot>
  </div>
  <div class='secondary'>
    <slot name='secondary' />
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
    grid-template-columns:
      minmax(var(--min-primary-size), var(--primary-size)) var(--splitter-size)
      minmax(var(--min-secondary-size), 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: 'primary splitter secondary';
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
    width: auto;
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
    width: auto;
    background: rgb(136, 223, 252);
  }
</style>
