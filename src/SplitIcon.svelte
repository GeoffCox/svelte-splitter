<script lang="ts">
  export let horizontal = false;

  $: splitClass = horizontal ? "split-icon horizontal" : "split-icon vertical";
</script>

<div class={splitClass}>
  <div class="pane" />
  <div class="splitter" />
  <div class="pane" />
</div>

<style>
  .split-icon {
    border: 2px solid darkgray;
    user-select: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    display: grid;
  }

  .split-icon.vertical {
    grid-template-columns: 50% 2px 1fr;
    grid-template-rows: 1fr;
  }

  .split-icon.horizontal {
    grid-template-columns: 1fr;
    grid-template-rows: 50% 2px 1fr;
  }

  .pane {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    background: lightgray;
  }

  .splitter {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    background: darkgray;
  }
</style>
