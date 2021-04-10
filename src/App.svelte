<script lang="ts">  
  import DynamicPane from "./DynamicPane.svelte";
import OptionsEditor from "./OptionsEditor.svelte";
</script>

<div class="root">
  <div class="app">
    <div class="header">
      Splitter
    </div>
    <div class="content">
      <DynamicPane />
    </div>
    <div class="footer">
      <OptionsEditor />
    </div>
  </div>
</div>

<style>
  .root {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  .app {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas: "header" "content" "footer";
  }

  .header {
    box-sizing: border-box;
    font-size: 14pt;
    width: 100%;
    outline: none;
    overflow: hidden;
    grid-area: header;
    padding: 10px;
    background: #222;
    color: #ddd;
  }

  .content {
    box-sizing: border-box;
    width: 100%;
    outline: none;
    overflow: hidden;
    grid-area: content;
    padding: 20px;
  }

  .footer {
    box-sizing: border-box;
    width: 100%;
    outline: none;
    overflow: hidden;
    grid-area: footer;
    background: #222;
    color: #ddd;
  }
</style>
