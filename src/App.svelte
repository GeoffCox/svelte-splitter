<script lang='ts'>
  import LeftRightSplit from './LeftRightSplit.svelte';  
import OptionsEditor from './OptionsEditor.svelte';
</script>

<style>
  .root {    
    height: 400px;
    width: 100%;
    padding: 10px;    
  }
</style>


<div class='root'>
  <LeftRightSplit>
    <div slot='primary'>primary</div>    
    <div slot='secondary'>secondary</div>
  </LeftRightSplit>
  <OptionsEditor />
</div>


