<script lang="ts">
  import Split from "./Split.svelte";
  import { splitOptions } from "./splitOptionsStore";

  let isSplit = false;
  let horizontal = false;

  const onSplit = () => {
    isSplit = true;
    horizontal = $splitOptions.horizontal;
  };
</script>

<div class="dynamic-pane">
  {#if isSplit}
    <Split horizontal={horizontal}>
      <svelte:self slot="primary" />
      <svelte:self slot="secondary" />
    </Split>
  {:else}
    <div class="actions-area">
      <div class="action-buttons">
        <button class="action-button" on:click={onSplit}> Split </button>
        <button class="action-button" title="Remove split"> X </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .dynamic-pane {
    width: 100%;
    height: 100%;
    outline: none;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "content";
    user-select: none;
  }

  .actions-area {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-content: stretch;
    align-items: stretch;
    outline: none;
    overflow: hidden;
  }

  .action-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    outline: none;
    overflow: hidden;
    margin: auto auto;
  }

  .action-button {
    padding: 5px;
    margin: 0 0 5px 5px;
    user-select: none;
  }
</style>
