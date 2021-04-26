<script lang="ts">
  import { createEventDispatcher, onMount, tick } from "svelte";    
  import { Split, DefaultSplitter } from "svelte-splitter";
  import { splitOptions as initialSplitOptions } from "./splitOptionsStore";
  import { splitInfoById, updatePercentFrozen } from "./splitInfoStore";
  import { v4 as uuid } from "uuid";


  import SolidSplitter from "./SolidSplitter.svelte";
  import StripedSplitter from "./StripedSplitter.svelte";

  const dispatch = createEventDispatcher();

  // ----- Props ----- //

  export let id: string;
  export let hasParent: boolean = false;

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

    if (
      id &&
      removeId &&
      (removeId === primaryId || removeId === secondaryId)
    ) {
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

<!--
  @component
  Provides adding and removing a Split component to itself.
-->
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
          hasParent={true}
          bind:this={primaryPane}
          on:removeSplit={onRemovePrimarySplit}
        />
      </svelte:fragment>
      <svelte:fragment slot="splitter">
        {#if splitOptions?.splitterType === "solid"}
          <SolidSplitter />
        {:else if splitOptions?.splitterType === "striped"}
          <StripedSplitter />
        {:else}
          <DefaultSplitter />
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="secondary">
        <svelte:self
          id={splitInfo?.secondaryId}
          hasParent={true}
          bind:this={secondaryPane}
          on:removeSplit={onRemoveSecondarySplit}
        />
      </svelte:fragment>
    </Split>
  {:else}
    <div class="actions-area">
      <div class="action-buttons">
        <button class="action-button" on:click={onSplit}> Split </button>
        {#if hasParent}
          <button
            class="action-button"
            title="Remove split"
            on:click={onRequestRemoveSplit}
          >
            X
          </button>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  /* The 1fr by 1fr grid centers the content */
  .dynamic-pane {
    width: 100%;
    height: 100%;
    outline: none;
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;    
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
