import { convertToExcalidrawElements, exportToCanvas } from '@excalidraw/excalidraw';

const C = {
  ink: '#273343', paper: '#fffdf8', outline: '#9a9c99',
  green: '#27816d', blue: '#376dbe', purple: '#8056ad',
};
const elements = [];
let count = 0;
function add(type, x, y, props = {}) {
  elements.push({
    id: `information-discovery-c-${++count}`, type, x, y,
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
  width: 2040, height: 1460, strokeColor: C.paper,
  backgroundColor: C.paper, strokeWidth: 0, roughness: 0, locked: true,
});
centered('Start with the overview. Go deeper as needed.', 1020, 50, 42);

add('ellipse', 998, 155, { width: 44, height: 44, roughness: 0.6 });
line([[1020, 199], [1020, 246]]);
line([[987, 222], [1020, 209], [1053, 222]]);
line([[1020, 246], [995, 271]]);
line([[1020, 246], [1045, 271]]);
text('User', 1073, 196, 30);

// One continuous surface, with four irregular downward mountain peaks.
const range = [
  [300, 350], [1790, 350],
  [1590, 1230], [1410, 770], [1250, 1090],
  [1080, 720], [860, 1280], [650, 790],
  [480, 1100], [300, 350],
];
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
for (const [top, bottom, fill] of [
  [350, 530, '#e4f3e9'], [530, 735, '#e7eefb'],
  [735, 930, '#eee6f7'], [930, 1280, '#f8e9d9'],
]) {
  const points = clipAt(clipAt(range, top, true), bottom, false);
  line([...points, points[0]], { backgroundColor: fill, strokeColor: 'transparent' });
}
line(range, { strokeColor: '#858e91', strokeWidth: 2.4, roughness: 0.9 });
// Draw each contour only inside the silhouette, including the separate peaks.
for (const y of [530, 735, 930]) {
  const crossings = [];
  for (let i = 1; i < range.length; i++) {
    const [a, b] = [range[i - 1], range[i]];
    if ((a[1] < y && b[1] >= y) || (b[1] < y && a[1] >= y)) {
      crossings.push(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]));
    }
  }
  crossings.sort((a, b) => a - b);
  for (let i = 0; i < crossings.length; i += 2) {
    line([[crossings[i], y], [crossings[i + 1], y]], {
      strokeColor: '#afb5b4', strokeWidth: 1.3, roughness: 0.65,
    });
  }
}

text('Overview', 55, 415, 29, C.green);
text('API docs', 55, 605, 29, C.blue);
text('Issues & PRs', 55, 795, 27, C.purple);
text('Reproductions', 55, 837, 25, C.purple);
text('Source code', 55, 975, 27, '#956c42');
centered('High-level overview', 1020, 399, 32);
centered('Concepts, tutorials, getting started', 1020, 444, 23, '#56655b');
centered('API documentation', 1030, 594, 30);

// The four tips are different concrete sources, rather than one shared apex.
centered('Source\ncode', 495, 940, 20, '#835f3b');
centered('Source\ncode', 890, 1013, 25, '#835f3b');
centered('Source\ncode', 1250, 955, 23, '#835f3b');
centered('Source\ncode', 1555, 977, 25, '#835f3b');

// A short trip stays near the surface.
arrow([[1055, 288], [1300, 315], [1470, 470], [1875, 470]], C.green);
stop(1875, 470, C.green);
centered('Overview is enough', 1795, 390, 24, C.green);
text('Done.', 1900, 454, 24, C.green);

// A second visit stops after the API layer.
arrow([[1035, 288], [1230, 327], [1370, 506], [1420, 657], [1875, 657]], C.blue);
stop(1875, 657, C.blue);
centered('A little more detail', 1800, 582, 24, C.blue);
text('Done.', 1900, 641, 24, C.blue);

// Two independent deep visits descend into different parts of the range.
arrow([[985, 288], [730, 323], [695, 485]], C.purple);
arrow([[695, 502], [730, 630], [775, 706]], C.purple);
arrow([[783, 725], [810, 825], [801, 916]], C.purple);
arrow([[801, 941], [806, 1040], [833, 1150], [860, 1210]], C.purple);
stop(860, 1210, C.purple);

const orange = '#c0782b';
arrow([[1065, 288], [1430, 305], [1610, 485]], orange);
arrow([[1617, 505], [1650, 630], [1655, 705]], orange);
arrow([[1654, 728], [1642, 800], [1635, 855]], orange);
stop(1635, 855, orange);

centered('Drill into the details only as far as the question needs.', 1020, 1375, 30);

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
