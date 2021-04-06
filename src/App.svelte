<script lang='ts'>
  import LeftRightSplit from './LeftRightSplit.svelte';  
</script>

<style>
  .root {
    min-width: 400px;
    min-height: 400px;
    height: 100%;
    padding: 10px;    
  }
</style>


<div class='root'>
  <LeftRightSplit>
    <div slot='primary'>primary</div>    
    <div slot='secondary'>secondary</div>
  </LeftRightSplit>
</div>


