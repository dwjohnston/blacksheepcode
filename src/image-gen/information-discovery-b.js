import { convertToExcalidrawElements, exportToCanvas } from '@excalidraw/excalidraw';

const C = {
  ink: '#273343', paper: '#fffdf8', outline: '#9a9c99',
  green: '#27816d', blue: '#376dbe', purple: '#8056ad',
};
const elements = [];
let count = 0;
function add(type, x, y, props = {}) {
  elements.push({
    id: `information-discovery-b-${++count}`, type, x, y,
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

function box(x, y, width, height, fill, color = '#9ba5b0') {
  add('rectangle', x, y, {
    width, height, strokeColor: color, backgroundColor: fill,
    roundness: { type: 3 }, strokeWidth: 1.6,
  });
}
function connection(points) {
  arrow(points, '#b6bac2', { strokeWidth: 1.7, roughness: 0.5 });
}
function node(label, x, y, width, fill, color = C.ink, size = 26) {
  box(x - width / 2, y, width, 88, fill);
  centered(label, x, y + (label.includes('\n') ? 11 : 26), size, color);
}

add('rectangle', 0, 0, {
  width: 1920, height: 1530, strokeColor: C.paper,
  backgroundColor: C.paper, strokeWidth: 0, roughness: 0, locked: true,
});
centered('Follow the question. Stop when you have enough.', 960, 45, 40);

add('ellipse', 938, 145, { width: 44, height: 44, roughness: 0.6 });
line([[960, 189], [960, 236]]);
line([[927, 212], [960, 199], [993, 212]]);
line([[960, 236], [935, 261]]);
line([[960, 236], [985, 261]]);
text('User', 1013, 186, 30);

// Equal-width layers keep discovery open to several sources at every depth.
for (const [y, fill] of [
  [315, '#f0f8f1'], [510, '#f0f4fc'], [705, '#f5f0fa'],
  [900, '#fbf3e9'], [1095, '#f8eee5'],
]) {
  add('rectangle', 345, y, {
    width: 1490, height: 175, strokeColor: 'transparent',
    backgroundColor: fill, roughness: 0,
  });
}
text('Overview', 65, 357, 30, C.green);
text('API docs', 65, 552, 30, C.blue);
text('Evidence', 65, 747, 30, C.purple);
text('Source code', 65, 942, 30, '#956c42');
text('Deeper source', 65, 1137, 30, '#956c42');
text('More detail', 66, 1301, 22, '#7c858c');
arrow([[310, 413], [310, 1230]], '#a3a8ae', { strokeWidth: 1.7 });

// The underlying links are available routes; colored lines show example visits.
connection([[870, 438], [680, 550]]);
connection([[1060, 438], [1290, 550]]);
connection([[680, 638], [550, 745]]);
connection([[680, 638], [990, 745]]);
connection([[1290, 638], [1450, 745]]);
connection([[550, 833], [550, 940]]);
connection([[620, 833], [990, 940]]);
connection([[990, 833], [990, 940]]);
connection([[1450, 833], [1450, 940]]);
connection([[550, 1028], [550, 1135]]);
connection([[990, 1028], [990, 1135]]);
connection([[1450, 1028], [1450, 1135]]);

node('High-level overview', 960, 350, 620, '#e0f0e4', C.ink, 31);
node('API documentation', 680, 550, 360, '#e2ebfb');
node('API documentation', 1290, 550, 360, '#e2ebfb');
node('Issues & PRs', 550, 745, 300, '#eae0f5');
node('Code reproduction', 990, 745, 320, '#eae0f5');
node('Issues & PRs', 1450, 745, 300, '#eae0f5');
node('Source code\nframework', 550, 940, 300, '#f7e6d2');
node('Source code\nlibrary', 990, 940, 300, '#f7e6d2');
node('Source code\nanother library', 1450, 940, 300, '#f7e6d2');
node('Source code\ninternal module', 550, 1135, 300, '#f2ddc9');
node('Source code\ndependency', 990, 1135, 300, '#f2ddc9');
node('Source code\ndependency', 1450, 1135, 300, '#f2ddc9');

// A quick visit reaches only the overview.
arrow([[990, 276], [1205, 302], [1310, 390], [1660, 390]], C.green);
stop(1660, 390, C.green);
text('Overview is enough.', 1390, 327, 25, C.green);
text('Done.', 1685, 375, 25, C.green);

// Another question follows the overview to one API and stops there.
arrow([[960, 276], [1130, 303], [1225, 341]], C.blue);
arrow([[1205, 446], [1290, 490], [1290, 541]], C.blue);
arrow([[1478, 594], [1660, 594]], C.blue);
stop(1660, 594, C.blue);
text('The API docs answer it.', 1490, 526, 23, C.blue);
text('Done.', 1685, 579, 25, C.blue);

// A detailed investigation branches into several sources instead of one apex.
arrow([[930, 276], [740, 303], [695, 341]], C.purple);
arrow([[720, 447], [680, 492], [680, 541]], C.purple);
arrow([[680, 647], [550, 736]], C.purple);
arrow([[550, 842], [550, 931]], C.purple);
arrow([[620, 842], [795, 895], [990, 931]], C.purple);
arrow([[550, 1037], [550, 1126]], C.purple);
arrow([[990, 1037], [990, 1126]], C.purple);
arrow([[550, 1232], [550, 1306]], C.purple);
arrow([[990, 1232], [990, 1306]], C.purple);
stop(550, 1306, C.purple);
stop(990, 1306, C.purple);
centered('Enough detail.', 550, 1330, 23, C.purple);
centered('Enough detail.', 990, 1330, 23, C.purple);

centered('One question may lead to several sources, and then deeper still.', 960, 1420, 29);

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
