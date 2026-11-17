import { convertToExcalidrawElements, exportToCanvas } from '@excalidraw/excalidraw';

const C = {
  ink: '#263238', paper: '#fffdf8', outline: '#93958d',
  flow: '#ba6a11', gold: '#fff0b8', goldInk: '#825513',
  violet: '#e0d6f4', violetInk: '#605080',
  teal: '#d4eee6', tealInk: '#276b5a',
};
let count = 0;
const elements = [];
function add(type, x, y, props = {}) {
  const id = `corporate-value-${++count}`;
  elements.push({
    id, type, x, y, strokeColor: C.ink, backgroundColor: 'transparent',
    strokeWidth: 2, roughness: 0.8, fillStyle: 'solid',
    seed: 1009 + count * 137, ...props,
  });
  return id;
}
function polygon(points, fill, stroke = 'transparent', width = 1) {
  const [x, y] = points[0];
  return add('line', x, y, {
    points: points.map(([px, py]) => [px - x, py - y]),
    backgroundColor: fill, strokeColor: stroke, strokeWidth: width,
    roundness: null,
  });
}
function line(points, props = {}) {
  const [x, y] = points[0];
  return add('line', x, y, {
    points: points.map(([px, py]) => [px - x, py - y]),
    roundness: null, ...props,
  });
}
function arrow(points, props = {}) {
  const [x, y] = points[0];
  return add('arrow', x, y, {
    points: points.map(([px, py]) => [px - x, py - y]),
    strokeColor: C.flow, strokeWidth: 3, roughness: 0.7,
    startArrowhead: null, endArrowhead: 'arrow', roundness: null,
    ...props,
  });
}
function text(content, x, y, size = 28, color = C.ink, props = {}) {
  return add('text', x, y, {
    text: content, fontSize: size, fontFamily: 1,
    strokeColor: color, textAlign: 'left', ...props,
  });
}
function box(x, y, width, height, color, fill, label, fontSize = 28) {
  return add('rectangle', x, y, {
    width, height, strokeColor: color, backgroundColor: fill,
    roundness: { type: 3 },
    ...(label ? { label: { text: label, fontSize, fontFamily: 1, strokeColor: color } } : {}),
  });
}

// Paper fixes the export size and provides generous whitespace.
add('rectangle', 0, 0, {
  width: 1760, height: 1400, strokeColor: C.paper,
  backgroundColor: C.paper, strokeWidth: 0, roughness: 0,
  locked: true,
});
text('the corporation as a value extraction funnel', 0, 48, 42, C.ink, {
  id: 'title', textAlign: 'center',
});

// Pyramid bands: CEO, two levels of bureaucracy, and the workers.
const leftAt = y => 880 - (y - 330) * 480 / 770;
const rightAt = y => 1760 - leftAt(y);
function band(top, bottom, fill) {
  polygon([
    [leftAt(top), top], [rightAt(top), top],
    [rightAt(bottom), bottom], [leftAt(bottom), bottom],
    [leftAt(top), top],
  ], fill);
}
band(330, 505, '#fff7dc');
band(505, 695, '#f3eefb');
band(695, 900, '#ede6f7');
band(900, 1100, '#e7f5ee');
polygon([[880, 330], [1360, 1100], [400, 1100], [880, 330]], 'transparent', C.outline, 2.3);
for (const y of [505, 695, 900]) {
  line([[leftAt(y), y], [rightAt(y), y]], {
    strokeColor: '#b7b7ac', strokeWidth: 1.3, roughness: 0.6,
  });
}

// All internal arrows point upward, carrying value toward the CEO.
const workers = [535, 650, 765, 880, 995, 1110, 1225];
const workerParents = [660, 660, 880, 880, 880, 1100, 1100];
workers.forEach((x, i) => arrow([[x, 955], [workerParents[i], 852]], { strokeWidth: 2.5 }));
arrow([[660, 784], [780, 654]], { strokeWidth: 2.8 });
arrow([[880, 784], [780, 654]], { strokeWidth: 2.8 });
arrow([[1100, 784], [980, 654]], { strokeWidth: 2.8 });
arrow([[780, 587], [845, 490]], { strokeWidth: 3.2 });
arrow([[980, 587], [915, 490]], { strokeWidth: 3.2 });

// The single apex node.
box(825, 420, 110, 60, C.goldInk, C.gold, 'CEO', 30);

// Two expanding rows of bureaucracy.
for (const x of [725, 925]) box(x, 592, 110, 54, C.violetInk, C.violet);
for (const x of [605, 825, 1045]) box(x, 790, 110, 54, C.violetInk, C.violet);

// People icons inside the frontline nodes.
workers.forEach(x => {
  add('ellipse', x - 30, 960, {
    width: 60, height: 60, strokeColor: C.tealInk,
    backgroundColor: C.teal, strokeWidth: 2,
  });
  add('ellipse', x - 7, 970, {
    width: 14, height: 14, strokeColor: C.tealInk,
    strokeWidth: 1.6, roughness: 0.55,
  });
  line([[x - 15, 1007], [x - 15, 997], [x - 9, 990], [x + 9, 990], [x + 15, 997], [x + 15, 1007]], {
    strokeColor: C.tealInk, strokeWidth: 1.8, roughness: 0.5,
    roundness: { type: 2 },
  });
});
text('Front line workers', 0, 1048, 32, C.tealInk, {
  id: 'workers-label', textAlign: 'center',
});

// A bracket labels both middle layers without crowding the hierarchy.
line([[1270, 550], [1300, 550], [1300, 865], [1270, 865]], {
  strokeColor: C.violetInk, strokeWidth: 2,
});
text('Bureaucracy layer', 1330, 678, 32, C.violetInk);
text('needed to enact the\nwill of the CEO', 1333, 720, 23, '#807194');

// Customers and suppliers feed value upward into the base from below.
box(510, 1230, 300, 86, '#805d48', '#f9eee6', 'customers', 32);
box(950, 1230, 300, 86, '#805d48', '#f9eee6', 'suppliers', 32);
arrow([[660, 1215], [660, 1090]], { strokeWidth: 4 });
arrow([[1100, 1215], [1100, 1090]], { strokeWidth: 4 });
text('value', 690, 1148, 24, C.flow);
text('value', 1130, 1148, 24, C.flow);

// Ownership is outside the corporation; profits pass up through the apex.
box(710, 158, 340, 88, C.goldInk, C.gold, 'Shareholders', 34);
arrow([[880, 407], [880, 258]], { strokeWidth: 5 });
text('profits', 918, 276, 28, C.flow);

window.renderDiagram = async ({ scale = 2 } = {}) => {
  const face = new FontFace('Virgil', 'url(/fonts/Virgil/Virgil-Regular.woff2)');
  await face.load();
  document.fonts.add(face);
  const converted = convertToExcalidrawElements(elements, { regenerateIds: false });
  // Center standalone labels using the actual font metrics.
  for (const id of ['title', 'workers-label']) {
    const el = converted.find(e => e.id === id);
    el.x = 880 - el.width / 2;
  }
  const appState = {
    viewBackgroundColor: C.paper, exportBackground: true,
    exportWithDarkMode: false,
    currentItemFontFamily: 1, gridSize: null,
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
