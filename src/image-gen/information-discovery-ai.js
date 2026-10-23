import { convertToExcalidrawElements, exportToCanvas } from '@excalidraw/excalidraw';

const C = {
  ink: '#273343', paper: '#fffdf8', outline: '#9a9c99',
  green: '#27816d', blue: '#376dbe', purple: '#8056ad',
};
const elements = [];
let count = 0;
function add(type, x, y, props = {}) {
  elements.push({
    id: `information-discovery-ai-${++count}`, type, x, y,
    strokeColor: C.ink, backgroundColor: 'transparent',
    strokeWidth: 2, roughness: 0.8, fillStyle: 'solid',
    seed: 1837 + count * 137, ...props,
  });
}
function line(points, props = {}) {
  const [x, y] = points[0];
  add('line', x, y, {
    points: points.map(([px, py]) => [px - x, py - y]),
    roundness: null, ...props,
  });
}
function arrow(points, color, props = {}) {
  const [x, y] = points[0];
  add('arrow', x, y, {
    points: points.map(([px, py]) => [px - x, py - y]),
    strokeColor: color, strokeWidth: 3.5, roughness: 0.65,
    startArrowhead: null, endArrowhead: 'arrow', roundness: { type: 2 },
    ...props,
  });
}
function text(content, x, y, size = 28, color = C.ink, props = {}) {
  add('text', x, y, {
    text: content, fontSize: size, fontFamily: 1,
    strokeColor: color, textAlign: 'left', ...props,
  });
}
const centers = new Map();
function centered(content, x, y, size = 28, color = C.ink) {
  const id = `centered-${centers.size}`;
  centers.set(id, x);
  text(content, x, y, size, color, { id, textAlign: 'center' });
}
function stop(x, y, color) {
  add('ellipse', x - 7, y - 7, {
    width: 14, height: 14, strokeColor: color,
    backgroundColor: color, roughness: 0.4,
  });
}

add('rectangle', 0, 0, {
  width: 2760, height: 1660, strokeColor: C.paper,
  backgroundColor: C.paper, strokeWidth: 0, roughness: 0, locked: true,
});
centered('Ask the AI. It goes deep, then brings back the overview.', 1380, 55, 42);
const red = '#ad5559';
const gray = '#8f7375';
const evidence = { issues: [1460, 1010], primary: [1390, 1300] };

// Preserve the same four-peak silhouette, with a physical break after layer 2.
const range = [
  [300, 350], [1790, 350], [1590, 1230], [1410, 770],
  [1250, 1090], [1080, 720], [860, 1280], [650, 790],
  [480, 1100], [300, 350],
];
const mapX = x => 300 + (x - 300) * 0.85;
function mountain(points, offset, props) {
  const mapped = points.map(([x, y]) => [mapX(x), y + offset]);
  line([...mapped, mapped[0]], props);
}
function clipAt(points, y, keepBelow) {
  const result = [];
  let previous = points.at(-1);
  let previousInside = keepBelow ? previous[1] >= y : previous[1] <= y;
  for (const current of points) {
    const currentInside = keepBelow ? current[1] >= y : current[1] <= y;
    if (currentInside !== previousInside) {
      const fraction = (y - previous[1]) / (current[1] - previous[1]);
      result.push([previous[0] + fraction * (current[0] - previous[0]), y]);
    }
    if (currentInside) result.push(current);
    previous = current;
    previousInside = currentInside;
  }
  return result;
}

for (const [top, bottom, fill, offset] of [
  [350, 530, '#f5e6e4', 50], [530, 735, '#eee1e1', 50],
  [735, 930, '#eee6f7', 170], [930, 1280, '#f8e9d9', 170],
]) {
  const points = clipAt(clipAt(range, top, true), bottom, false);
  mountain(points, offset, { backgroundColor: fill, strokeColor: 'transparent' });
}
mountain(clipAt(range, 735, false), 50, { strokeColor: '#b69798', strokeWidth: 2.2 });
mountain(clipAt(range, 735, true), 170, { strokeColor: '#858e91', strokeWidth: 2.3 });
for (const [y, offset, color] of [[530, 50, '#c6abad'], [930, 170, '#afb5b4']]) {
  const crossings = [];
  for (let i = 1; i < range.length; i++) {
    const [a, b] = [range[i - 1], range[i]];
    if ((a[1] < y && b[1] >= y) || (b[1] < y && a[1] >= y)) {
      crossings.push(mapX(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1])));
    }
  }
  crossings.sort((a, b) => a - b);
  for (let i = 0; i < crossings.length; i += 2) {
    line([[crossings[i], y + offset], [crossings[i + 1], y + offset]], {
      strokeColor: color, strokeWidth: 1.3,
    });
  }
}

centered('Surface content: mixed quality', 935, 310, 32, red);
text('1  Overview', 55, 465, 27, red);
text('2  API docs', 55, 650, 27, red);
centered('Overviews & tutorials', 750, 442, 31, red);
centered('Useful guidance mixed with slop', 750, 496, 24, gray);
centered('API docs & explanations', 750, 628, 30, red);
centered('Hard to know what was actually read', 750, 683, 23, gray);

// Useful upper-level material can guide discovery and inform the final answer.
for (const [x, y, width, title, subtitle] of [
  [1135, 429, 345, 'Useful overview', 'Concepts & source links'],
  [1110, 614, 345, 'Useful API docs', 'Details & source links'],
]) {
  add('rectangle', x, y, {
    width, height: 120, strokeColor: '#6c9f88', backgroundColor: '#e4f3e9',
    roundness: { type: 3 }, strokeWidth: 1.8,
  });
  centered(title, x + width / 2, y + 20, 25, C.green);
  centered(subtitle, x + width / 2, y + 68, 22, '#56655b');
}
centered('Treat surface content as leads; check the underlying evidence.', 935, 831, 24, gray);

text('3  Issues & PRs', 55, 970, 25, C.purple);
text('   Reproductions', 55, 1010, 23, C.purple);
text('4  Primary sources', 55, 1160, 24, '#956c42');
centered('Issues & PRs', 780, 966, 27, C.purple);
centered('Reproductions', 780, 1012, 24, '#705c81');
centered('Source\ncode', mapX(495), 1104, 19, '#835f3b');
centered('Academic\npapers', mapX(890), 1175, 23, '#835f3b');
centered('Technical\nspecs', mapX(1250), 1115, 19, '#835f3b');
centered('Source\ncode', mapX(1555), 1145, 23, '#835f3b');

// The right-hand layers are new explanations built from the lower-left sources.
add('rectangle', 1940, 400, {
  width: 660, height: 180, backgroundColor: '#e4f3e9',
  strokeColor: '#8eada0', strokeWidth: 2, roundness: null,
});
add('rectangle', 1940, 580, {
  width: 660, height: 205, backgroundColor: '#e7eefb',
  strokeColor: '#8e9db5', strokeWidth: 2, roundness: null,
});
centered('1  AI overview', 2270, 445, 33, C.green);
centered('The high-level picture', 2270, 505, 26, '#56655b');
centered('2  AI explanation', 2270, 635, 33, C.blue);
centered('Details & context', 2270, 695, 25, '#56667f');

// The flow starts with the user delegating the research to the AI.
add('ellipse', 2248, 143, { width: 44, height: 44, roughness: 0.6 });
line([[2270, 187], [2270, 234]]);
line([[2237, 210], [2270, 197], [2303, 210]]);
line([[2270, 234], [2245, 259]]);
line([[2270, 234], [2295, 259]]);
text('User', 2323, 184, 30);
arrow([[2215, 220], [2090, 250], [1935, 250]], C.blue);
centered('1  Ask AI to investigate', 2070, 163, 25, C.blue);

add('rectangle', 1510, 190, {
  width: 410, height: 130, strokeColor: C.blue,
  backgroundColor: '#e7eefb', roundness: { type: 3 }, strokeWidth: 2.3,
});
centered('AI researches', 1715, 211, 31, C.blue);
centered('on the user\'s behalf', 1715, 262, 25, C.blue);

// Optional routes use selected overviews and docs as pointers to deeper sources.
centered('2  Optional pointers', 1340, 362, 24, C.green);
arrow([[1540, 326], [1490, 365], [1380, 417]], C.green, { strokeStyle: 'dashed', strokeWidth: 2.6 });
arrow([[1590, 326], [1595, 530], [1470, 670]], C.green, { strokeStyle: 'dashed', strokeWidth: 2.6 });
arrow([[1290, 746], [1320, 850], [1410, 970]], C.green, { strokeStyle: 'dashed', strokeWidth: 2.6 });

// The AI can also go straight to the deeper evidence for the user's question.
arrow([[1715, 334], [1715, 850], [1630, 950], [1490, 988]], C.purple);
arrow([[1455, 1035], [1430, 1140], [1398, 1273]], C.purple, { strokeWidth: 2.8 });
text('3  Read & verify\nthe deep sources', 1490, 807, 24, C.purple);

// A compact fan indicates backlinks without crossing the research flow.
for (const end of [[1770, 470], [1750, 580], [1770, 690]]) {
  arrow([[1932, 580], end], C.blue, {
    strokeWidth: 2.5, roughness: 0.5, roundness: null,
  });
}
centered('Links back to\nAPI docs and\nprimary sources', 1830, 725, 23, C.blue);

// The completed answer returns to the same user who made the request.
arrow([[2270, 389], [2270, 277]], C.green);

// Evidence flows into the AI; the resulting understanding is surfaced above.
add('rectangle', 2050, 1040, {
  width: 440, height: 170, strokeColor: C.purple,
  backgroundColor: '#eee6f7', roundness: { type: 3 }, strokeWidth: 2.5,
});
centered('4  AI synthesizes', 2270, 1060, 31, C.purple);
centered('Evidence + useful guidance', 2270, 1123, 24, C.purple);
centered('Build a coherent picture', 2270, 1160, 23, '#705c81');
arrow([evidence.issues, [1740, 1010], [1900, 1090], [2035, 1090]], C.purple);
stop(...evidence.issues, C.purple);
arrow([evidence.primary, [1740, 1300], [1900, 1160], [2035, 1160]], '#b47739');
stop(...evidence.primary, '#b47739');
centered('Evidence from layers 3 & 4', 1640, 1350, 23, C.purple);
arrow([[2270, 1026], [2270, 801]], C.green, { strokeWidth: 4 });
text('5  Return a grounded answer\n     as new layers 1 & 2', 2320, 869, 24, C.green);

centered('The user asks. AI investigates, then brings back a grounded answer.', 1380, 1560, 32);

window.renderDiagram = async ({ scale = 2 } = {}) => {
  const face = new FontFace('Virgil', 'url(/fonts/Virgil/Virgil-Regular.woff2)');
  await face.load();
  document.fonts.add(face);
  const converted = convertToExcalidrawElements(elements, { regenerateIds: false });
  for (const [id, x] of centers) {
    const element = converted.find(element => element.id === id);
    element.x = x - element.width / 2;
  }
  const appState = {
    viewBackgroundColor: C.paper, exportBackground: true,
    exportWithDarkMode: false, currentItemFontFamily: 1, gridSize: null,
  };
  const scene = {
    type: 'excalidraw', version: 2, source: 'https://excalidraw.com',
    elements: converted, appState, files: {},
  };
  const canvas = await exportToCanvas({
    elements: converted, appState, files: {}, exportPadding: 0,
    getDimensions: (width, height) => ({ width: width * scale, height: height * scale, scale }),
  });
  document.body.appendChild(canvas);
  return { scene, png: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height };
};
