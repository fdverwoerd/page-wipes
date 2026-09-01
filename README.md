# page-wipes

Star Wars-style page wipes for same-origin navigations, using the [CSS View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) mask techniques from [Coder's Block](https://codersblock.com/blog/star-wars-scene-transition-effects-in-css/).

No dependencies. Copy this folder, or install it as a package.

**Needs Chromium or recent Safari.** Firefox just navigates. `prefers-reduced-motion` turns the wipes off.

## Drop-in

Put these two lines in `<head>` on every page (the script must run before first paint):

```html
<link rel="stylesheet" href="./page-wipes.css">
<script type="module" src="./page-wipes.js"></script>
```

That cycles through:

1. `wipe-horizontal`
2. `wipe-vertical`
3. `wipe-diagonal`
4. `wipe-iris`
5. `wipe-clock`
6. `wipe-shape`

The active name is on `<html data-page-transition="wipe-clock">`.

## Options

Set `window.pageWipes` **before** the module loads:

```html
<script>
  window.pageWipes = {
    mode: "random", // "cycle" (default) or "random"
    storageKey: "page-wipes-index",
    // types: ["wipe-horizontal", "wipe-iris"],
  };
</script>
<link rel="stylesheet" href="./page-wipes.css">
<script type="module" src="./page-wipes.js"></script>
```

Or import and init yourself (skips the automatic start):

```js
import { initPageWipes } from "page-wipes";

initPageWipes({ mode: "random" });
```

```js
import "page-wipes/css";
```

## Shape mask

The shape wipe ships an inlined plus/crosshair. Override it:

```css
:root {
  --page-wipe-mask: url("/images/logo.svg");
}
```

`wipe-mask.svg` is in this folder if you want a file instead of the data URI.

## Timings

```css
:root {
  --page-wipe-duration: 0.85s;
  --page-wipe-shape-duration: 1.2s;
}
```

## Rebuild CSS

```bash
npx sass page-wipes.scss page-wipes.css --no-source-map
```
