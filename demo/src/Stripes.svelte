<script lang="ts">
  import VerticalStripes from "./VerticalStripes.svelte";
  import HorizontalStripes from "./HorizontalStripes.svelte";

  export let color1: string = "silver";
  export let color2: string = "gray";
  export let horizontal: boolean = false;

  $: stripesComponent = horizontal ? VerticalStripes : HorizontalStripes;
</script>

<svelte:component this={stripesComponent} color1={color1} color2={color2} />