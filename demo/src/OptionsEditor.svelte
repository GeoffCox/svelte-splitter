<script lang="ts">
  import SplitIcon from "./SplitIcon.svelte";
  import {
    horizontal,
    initialPrimarySize,
    minPrimarySize,
    minSecondarySize,
    resetOnDoubleClick,
    splitterSize,
    splitterType,
  } from "./splitOptionsStore";
</script>

<div class="options-editor">
  <div class="property-grid">
    <div class="property-label">Split Direction</div>
    <div class="radio-options">
      <div class="radio-option">
        <input
          type="radio"
          id="VerticalDirection"
          bind:group={$horizontal}
          value={false}
        />
        <label for="VerticalDirection">
          <div class="split-icon"><SplitIcon /></div>
        </label>
      </div>
      <div class="radio-option">
        <input
          type="radio"
          id="HorizontalDirection"
          bind:group={$horizontal}
          value={true}
        />
        <label for="HorizontalDirection">
          <div class="split-icon"><SplitIcon horizontal/></div>
        </label>
      </div>
    </div>
    <div class="property-label">Initial primary size</div>
    <input class="property-input" bind:value={$initialPrimarySize} />
    <div class="property-label">Minimum primary size</div>
    <input class="property-input" bind:value={$minPrimarySize} />
    <div class="property-label">Minimum secondary size</div>
    <input class="property-input" bind:value={$minSecondarySize} />    
    <div class="property-label">Splitter size</div>
    <input class="property-input" bind:value={$splitterSize} />
    <div class="property-label">Splitter type</div>
    <div>
      <div class="radio-options">
        <div class="radio-option">
          <input
            id="DefaultType"
            type="radio"
            bind:group={$splitterType}
            value="default"
            label="Default"
          />
          <label for="DefaultType"> Default </label>
        </div>
        <div class="radio-option">
          <input
            type="radio"
            bind:group={$splitterType}
            id="SolidType"
            value="solid"
          />
          <label for="SolidType"> Solid </label>
        </div>
        <div class="radio-option">
          <input
            type="radio"
            bind:group={$splitterType}
            id="StripedType"
            value="striped"
          />
          <label for="StripedType"> Striped </label>
        </div>
      </div>
    </div>
    <div class="property-label">Reset on double click</div>
    <input
      class="property-checkbox"
      type="checkbox"
      bind:checked={$resetOnDoubleClick}
    />
  </div>
</div>

<style>
  .options-editor {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "header" "options" "content";
  }

  .property-grid {
    display: grid;
    grid-template-columns: minmax(175px, auto) auto;
    grid-auto-flow: row;
    align-content: start;
    justify-content: start;
    margin: 20px;
    gap: 15px 10px;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
  }

  .property-label {
    margin: 3px 0 0 0;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
  }

  .radio-options {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
  }

  .radio-option {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 15px 0 0;
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
  }

  .radio-option input {
    margin: 0 0.4em 0 0;
    padding: 0;
  }

  .property-input {
    width: 150px;
  }

  .property-checkbox {
    margin: 7px 0 0 2px;
    vertical-align: middle;
  }

  .split-icon {
    display: inline-block;
    width: 75px;
    height: 50px;
  }
</style>
