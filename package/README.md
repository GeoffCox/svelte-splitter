# @geoffcox/svelte-splitter

A resizable splitter for Svelte that leverages CSS display:grid

[Live Demo](https://geoffcox.github.io/demos/svelte-splitter)

## Features
- Vertical (left|right) and Horizontal (top/bottom) splitting
- Provides slots for panes and splitter
- Set initial split size
- Minimum pane sizes
- Sizes can be any CSS unit (e.g. px, %, fr, em, pt, cm, mm)
- Reset to initial split with double-click
- Resize with keyboard arrow keys
- Nested splits with correct resizing
- Customize the DefaultSplitter size & colors, or render your own splitter.

## Technology
- Built with Svelte and Typescript
- Package has no dependencies
- CSS grid combined with a simple percentage split system provides accurate and responsive resizing.

# Installation

```
npm install --save @geoffcox/svelte-splitter
```
# Usage

To create vertical or horizontal splits you only need the `Split` component.

## Vertical Split
The default creates a left(50%) | right(50%) split, no minimum pane sizes, and renders the default splitter.

```svelte
<Split>
  <div slot="primary">This is the left pane.</div>
  <div slot="secondary">This is the right pane.<div>
</Split>
```

## Horizontal Split
Add the `horizontal` attribute to split top/bottom.

```svelte
<Split horizontal>
  <div slot="primary">This is the top pane.</div>
  <div slot="secondary">This is the bottom pane.<div>
</Split>
```

## Set the initial split size
Add the `initialPrimarySize` property to control where the initial split occurs.

```svelte
<Split initialPrimarySize='30%'>
  <div slot="primary">Primary pane</div>
  <div slot="secondary">Secondary pane<div>
</Split>
```

To support double-clicking to reset back to the initial size, add the `resetOnDoubleClick` property.

```svelte
<Split initialPrimarySize='30%' resetOnDoubleClick>
  <div slot="primary">Primary pane</div>
  <div slot="secondary">Secondary pane<div>
</Split>
```

## Nest Splits
Just nest Split componets to create whatever layout you like.
Here is an example of a common layout for a main, detail, and output view.

```svelte
<Split initialPrimarySize='30%'>
  <div slot="primary">This is the left pane.</div>
  <svelte:fragment slot="secondary">
    <Split horizontal initialPrimarySize='60%'>
      <div slot="primary">This is the right-top pane.</div>
      <div slot="secondary">This is the right-bottom pane.</div>
    </Split>
  </svelte:fragment>
</Split>
```
## Constrain minimum pane sizes
Prevent either pane from becoming too small using the `minPrimarySize` and `minSecondarySize` properties.

```svelte
<Split minPrimarySize='250px' minSecondarySize='15%'>
  <div slot="primary">This pane won't get smaller than 250 pixels.</div>
  <div slot="secondary">This pane won't get any smaller than 15% of the overall size of the split control./<div>
</Split>
```

## Customize the splitter size
Set the size of the default splitter's hit area with the `splitterSize` property.
The hit area is where the user can click to start dragging the splitter.

```svelte
<Split splitterSize='10px'>
  <div slot="primary">Primary pane</div>
  <div slot="secondary">Secondary pane<div>
</Split>
```
## Customize the splitter colors
Change the colors of the default splitter by adding the `DefaultSplitter` to the splitter slot.
Pass color properties to the default splitter.

```svelte
<Split defaultSplitterColors={colors}>
  <div slot="primary">Primary pane</div>
  <svelte:fragment slot="splitter">
    <DefaultSplitter color="red" hoverColor="#00FF00" dragColor="blue">
  </svelte:fragment>
  <div slot="secondary">Secondary pane<div>
</Split>
```
## Custom render the splitter
Substitute a custom splitter by replacing the default splitter.

```svelte
<Split defaultSplitterColors={colors}>
  <div slot="primary">Primary pane</div>
  <svelte:fragment slot="splitter">
    <MyAwesomeSplitter />
  </svelte:fragment>
  <div slot="secondary">Secondary pane<div>
</Split>
```

When building a customer splitter, leverage the context information from the parent `Split` component.

```ts
let splitterContext = getContext<SplitterContextStore>(splitterContextKey);

$: dragging = $splitterContext.dragging;
$: horizontal = $splitterContext.horizontal;
};
```

## Events
Subscribe to the changed event to get updates.

```ts
const onChanged = (event) => {
    console.log(`percent: ${event.percent}`);
    console.log(`primarySize: ${event.primarySize}`);
    console.log(`splitterSize: ${event.splitterSize}`);
    console.log(`secondarySize: ${event.secondarySize}`);
    console.log(`dragging: ${event.dragging}`);
};
```ts

```svelte
<Split on:changed={onChanged}>
    ...
</Split>
```
## Imperative Methods
Get or set the percentage by calling `getPercent` and `setPercent` on the `Split` handle.

```ts
let splitControl;

const flipSplitPercent = () => {
    const percent = splitControl.getPercent();
    splitControl.setPercent(100 - percent);
}
```

```svelte
<Split      
      bind:this={splitControl}>
    ...
</Split>
```

# Known limitations

- No typescript definitions for Split or DefaultSplitter

# Change History

## 1.0.0 - First project publication
- Based on the 2.1.0 version of @geoffcox/react-splitter
- Updated to idomatic Svelte