<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";
  import Split from "./Split.svelte";
  import { splitOptions as initialSplitOptions } from "./splitOptionsStore";
  import { splitInfoById, updatePercentFrozen } from "./splitInfoStore";
  import { v4 as uuid } from "uuid";

  const dispatch = createEventDispatcher();

  // ----- Props ----- //

  export let id: string;

  // ----- Initialization ----- //

  // Record our ID into the split info store
  splitInfoById.update((n) => {
    n[id] = {
      primaryId: uuid(),
      secondaryId: uuid(),
    };

    return {
      ...n,
    };
  });

  // ----- Component instances ----- //
  let splitControl;
  let primaryPane;
  let secondaryPane;

  // ----- Local reactions ----- //

  $: splitInfo = $splitInfoById[id];
  $: splitOptions = splitInfo?.options;
  $: isSplit = splitOptions !== undefined;

  export const restoreSplitPercents = async () => {
    if (splitInfo) {
      splitInfo.percent && splitControl?.setPercent(splitInfo.percent);
      await tick();
      await primaryPane?.refreshPercentSplits();
      await secondaryPane?.refreshPercentSplits();
    }
  };

  const removeSplit = async (removeId: string) => {
    const primaryId = splitInfo?.primaryId;
    const secondaryId = splitInfo?.secondaryId;

    if (id && removeId && (removeId === primaryId || removeId === secondaryId)) {
      updatePercentFrozen.set(true);
      await tick();
      const oldId = id;
      id = removeId === primaryId ? secondaryId : primaryId;
      splitInfoById.update((n) => {
        delete n[oldId];
        delete n[removeId];
        return {
          ...n,
        };
      });
      await tick();
      await restoreSplitPercents();
      updatePercentFrozen.set(false);
    }
  };

  // ----- Event handlers ----- //

  
  const onSplit = () => {
    splitInfoById.update((n) => {
      n[id] = {
        ...splitInfo,
        // use a copy of the current split options
        options: { ...$initialSplitOptions },
      };

      return {
        ...n,
      };
    });
  };

  const onRequestRemoveSplit = () => {
    dispatch("removeSplit");
  };

  const onRemovePrimarySplit = async () => {
    await removeSplit(splitInfo?.primaryId);    
  };

  const onRemoveSecondarySplit = async () => {
    await removeSplit(splitInfo?.secondaryId);
  };

  const onChanged = (event) => {
    if (!$updatePercentFrozen && event?.detail) {
      splitInfoById.update((n) => {
        n[id] = {
          ...splitInfo,
          percent: event.detail.percent,
        };

        return {
          ...n,
        };
      });
    }
  };
</script>

<div class="dynamic-pane">
  {#if isSplit}
    <Split
      horizontal={splitOptions?.horizontal}
      initialPrimarySize={splitOptions?.initialPrimarySize}
      minPrimarySize={splitOptions?.minPrimarySize}
      minSecondarySize={splitOptions?.minSecondarySize}
      splitterSize={splitOptions?.splitterSize}
      resetOnDoubleClick={splitOptions?.resetOnDoubleClick}
      bind:this={splitControl}
      on:changed={onChanged}
    >
      <svelte:fragment slot="primary">
        <svelte:self
          id={splitInfo?.primaryId}
          bind:this={primaryPane}
          on:removeSplit={onRemovePrimarySplit}
        />
      </svelte:fragment>
      <svelte:fragment slot="secondary">
        <svelte:self
          id={splitInfo?.secondaryId}
          bind:this={secondaryPane}
          on:removeSplit={onRemoveSecondarySplit}
        />
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
