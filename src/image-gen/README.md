# Diagram generation

Create editable Excalidraw diagrams with JavaScript, then export PNG assets using
Excalidraw's own renderer in headless Chrome. This tool has its own dependencies.

## Setup

From the repository root:

```sh
npm ci --prefix src/image-gen
```

The renderer uses an installed Google Chrome, or a Playwright Chromium installation.
To download Chromium:

```sh
cd src/image-gen
npx playwright-core install chromium
```

You can also set `CHROME_PATH` to a particular Chrome or Chromium executable.

## Render the value funnel

From the repository root:

```sh
npm run render --prefix src/image-gen
```

This regenerates `src/assets/corporate_value_funnel.png` at 3520 × 2800 and
`src/assets/corporate_value_funnel.excalidraw`. Drag the latter into
[Excalidraw](https://excalidraw.com) to edit the shapes and text.
Rendering replaces both destination files.

## Create another diagram

Copy `corporate-value-funnel.js` within this folder and change the labels,
coordinates, colors, and connections. Its `add`, `polygon`, `line`, `arrow`, `text`,
and `box` helpers create Excalidraw element skeletons. Set fixed `seed` values for
repeatable sketch strokes. Closed line paths provide filled pyramid bands.

Render your module to a new destination:

```sh
node src/image-gen/render.mjs \
  --input src/image-gen/my-diagram.js \
  --output src/assets/my_diagram.png \
  --scale 2
```

Explicit input and output paths are relative to the current working directory.
The default paths work from any directory.

Each diagram module defines `window.renderDiagram({ scale })`, an async function
returning `{ scene, png, width, height }`. The example loads the bundled Virgil font,
converts skeletons with `convertToExcalidrawElements`, centers text using measured
widths, and exports with `exportToCanvas`. Scale **both canvas dimensions** and
the drawing scale; scaling only the drawing crops the PNG.

Use a background rectangle to fix the export bounds. Inspect the exported PNG for
clipping, overlapping labels, and arrow direction before using it in a post.
Keep the `.excalidraw` source beside the PNG so the result remains editable.

Bundles are created in a temporary directory, served with the package's local
fonts on a temporary loopback port, and removed after export. The output uses
local JavaScript and bundled fonts; no image generation API or API key is needed.

## References

- [Create Excalidraw elements programmatically](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/excalidraw-element-skeleton)
- [Excalidraw export utilities](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/utils/export)
