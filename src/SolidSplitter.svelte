<script lang="ts">
    export let horizontal: boolean = false;
    export let dragging: boolean = false;
  
    export let color: string = "silver";
    export let hoverColor: string = "gray";
    export let dragColor: string = "black";  
  
    $: splitterStyles = {     
      "--splitter-color": dragging ? dragColor : color,
      "--splitter-hover-color": dragging ? dragColor : hoverColor,
    };
  
    $: splitterStyle = Object.entries(splitterStyles)
      .map(([key, value]) => `${key}:${value}`)
      .join(";");
  
    $: splitterClass = horizontal ? "splitter horizontal" : "splitter vertical";  
  </script>
  
  <div class={splitterClass} style={splitterStyle} tabindex="0" />
  
  <style>
    .splitter {
      box-sizing: border-box;  
      outline: none;
      overflow: hidden;
      height: 100%;
      width: 100%;
      user-select: none;
      background: var(--splitter-color);    
    }
  
    .splitter.vertical {
      cursor: col-resize;
    }
  
    .splitter.horizontal {
      cursor: row-resize;
    }
  
    .splitter:hover {
      background: var(--splitter-hover-color);
    }
  
    .splitter:focus {
      background: var(--splitter-hover-color);
    }
  </style>
  