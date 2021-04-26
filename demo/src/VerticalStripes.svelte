<script lang="ts">
  import { fade } from 'svelte/transition';
  export let color1: string = "silver";
  export let color2: string = "gray";

  $: stripeStyles = {
    "--color1": color1,
    "--color2": color2,
  };

  $: stripeStyle = Object.entries(stripeStyles)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
</script>

<div class="vertical-stripes" style={stripeStyle} transition:fade>
  <div class="stripes" />
</div>

<style>
  .vertical-stripes {
    position: relative;
    height: 100%;
    width: 100%;    
  }

  .stripes {
    box-sizing: border-box;
    outline: none;
    overflow: hidden;
    user-select: none;
    background: var(--color1);
    --stripe-size: 50px;
    --duration: 2s;
  }

  @keyframes stripeAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(var(--stripe-size) * -1));
    }
  }

  .stripes:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + var(--stripe-size));
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      var(--color2) 25%,
      var(--color2) 50%,
      var(--color1) 50%,
      var(--color1) 75%
    );
    background-size: var(--stripe-size) var(--stripe-size);
    animation: stripeAnimation var(--duration) linear infinite;
  }

  .stripes:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(#1b2735, 0) 0%,
      #090e0f 100%
    );
  }  
</style>
