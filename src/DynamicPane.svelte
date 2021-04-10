<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Split from "./Split.svelte";
  import { splitOptions as initialSplitOptions } from "./splitOptionsStore";

  const dispatch = createEventDispatcher();

  let isSplit = false;
  let splitOptions;

  const onSplit = () => {
    isSplit = true;
    splitOptions = { ...$initialSplitOptions };
  };

  const onRequestRemoveSplit = () => {
    dispatch("removeSplit");
  };

  const onRemoveSplit = () => {
    isSplit = false;
  };

  const onChanged = (event) => {
    console.log(event?.detail);
  };
</script>

<div class="dynamic-pane">
  {#if isSplit}
    <Split
      horizontal={splitOptions?.horizontal}
      initialPrimarySize={splitOptions?.initialPrimarySize}
      on:changed={onChanged}
    >
      <svelte:fragment slot="primary">
        <svelte:self on:removeSplit={onRemoveSplit} />
      </svelte:fragment>
      <svelte:fragment slot="secondary">
        <svelte:self on:removeSplit={onRemoveSplit} />
      </svelte:fragment>
    </Split>
  {:else}
    <div class="actions-area">
      <div class="action-buttons">
        <button class="action-button" on:click={onSplit}> Split </button>
        <button
          class="action-button"
          title="Remove split"
          on:click={onRequestRemoveSplit}
        >
          X
        </button>
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
