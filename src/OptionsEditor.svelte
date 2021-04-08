<script>
  import {
    initialPrimarySize,
    minPrimarySize,
    minSecondarySize,
    resetOnDoubleClick,
    splitterSize,
    splitterType,
  } from "./splitOptionsStore";

  let splitterTypes = ["default", "solid", "striped"];
</script>

<div class="options-editor">
  <div class="property-grid">
    <div class="property-label">Initial primary size</div>
    <input class="property-input" bind:value={$initialPrimarySize} />
    <div class="property-label">Minimum primary size</div>
    <input class="property-input" bind:value={$minPrimarySize} />
    <div class="property-label">Minimum secondary size</div>
    <input class="property-input" bind:value={$minSecondarySize} />
    <div class="property-label">Reset on double click</div>
    <input
      class="property-checkbox"
      type="checkbox"
      bind:checked={$resetOnDoubleClick}
    />
    <div class="property-label">Splitter size</div>
    <input class="property-input" bind:value={$splitterSize} />
    <div class="property-label">Splitter type</div>
    <div>
      <label>
        <input type="radio" bind:group={$splitterType} value="default" label="Default" />
        Default
      </label>
      <label>
        <input type="radio" bind:group={$splitterType} value="solid" />
        Solid
      </label>
      <label>
        <input type="radio" bind:group={$splitterType} value="striped" />
        Striped
      </label>
    </div>
  </div>
</div>

<style>
  .options-editor {
    width: 100%;
    height: 100%;
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
  }

  .property-label {
    margin: 3px 0 0 0;
  }

  .radio-options {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .radio-option {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 15px 0 0;
  }

  .property-input {
    width: 150px;
  }

  .property-checkbox {
    margin: 7px 0 0 2px;
    vertical-align: middle;
  }

  .split-direction-radio {
    margin: 0 5px 0 0;
  }

  .split-direction-icon {
    width: 85px;
    height: 50px;
  }
</style>
