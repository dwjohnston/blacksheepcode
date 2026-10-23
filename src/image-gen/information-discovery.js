import { convertToExcalidrawElements, exportToCanvas } from '@excalidraw/excalidraw';

const C = {
  ink: '#273343', paper: '#fffdf8', outline: '#9a9c99',
  green: '#27816d', blue: '#376dbe', purple: '#8056ad',
};
const elements = [];
let count = 0;
function add(type, x, y, props = {}) {
  elements.push({
    id: `information-discovery-${++count}`, type, x, y,
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
  width: 1760, height: 1370, strokeColor: C.paper,
  backgroundColor: C.paper, strokeWidth: 0, roughness: 0, locked: true,
});
centered('Start with the overview. Go deeper as needed.', 880, 48, 40);

// The reader is above the broad entry to the inverted pyramid.
add('ellipse', 858, 155, { width: 44, height: 44, roughness: 0.6 });
line([[880, 199], [880, 246]]);
line([[847, 222], [880, 209], [913, 222]]);
line([[880, 246], [855, 271]]);
line([[880, 246], [905, 271]]);
text('User', 933, 196, 30);

const leftAt = y => 380 + (y - 340) * 500 / 850;
const rightAt = y => 1760 - leftAt(y);
function band(top, bottom, fill) {
  line([
    [leftAt(top), top], [rightAt(top), top],
    [rightAt(bottom), bottom], [leftAt(bottom), bottom],
    [leftAt(top), top],
  ], { backgroundColor: fill, strokeColor: 'transparent' });
}
band(340, 530, '#e4f3e9');
band(530, 735, '#e7eefb');
band(735, 940, '#eee6f7');
band(940, 1190, '#f8e9d9');
line([[380, 340], [1380, 340], [880, 1190], [380, 340]], {
  strokeColor: C.outline, strokeWidth: 2.3,
});
for (const y of [530, 735, 940]) {
  line([[leftAt(y), y], [rightAt(y), y]], {
    strokeColor: '#b5b7b6', strokeWidth: 1.3,
  });
}

centered('High-level overview', 880, 390, 32);
centered('Search, tutorials, getting started', 880, 438, 22, '#56655b');
centered('API documentation', 880, 576, 30);
centered('Specific details and behaviour', 880, 624, 21, '#56667f');
centered('Issues & PRs', 900, 766, 28);
centered('Code reproductions', 900, 808, 24, '#705c81');
centered('Source\ncode', 915, 962, 25, '#835f3b');

// Three routes begin at the same reader, reach different depths, then end.
arrow([[910, 286], [1190, 318], [1260, 470], [1450, 470]], C.green);
stop(1450, 470, C.green);
text('Overview is enough', 1440, 385, 25, C.green);
text('Done.', 1472, 455, 24, C.green);

arrow([[880, 286], [1105, 321], [1175, 500], [1120, 664], [1400, 664]], C.blue);
stop(1400, 664, C.blue);
text('Need a little more', 1330, 575, 25, C.blue);
text('API docs answer it.', 1425, 632, 23, C.blue);
text('Done.', 1425, 668, 24, C.blue);

arrow([[850, 286], [610, 321], [600, 455]], C.purple);
arrow([[600, 478], [690, 656]], C.purple);
arrow([[705, 680], [778, 857]], C.purple);
arrow([[790, 879], [852, 1038]], C.purple);
arrow([[863, 1065], [905, 1112], [1250, 1112]], C.purple);
stop(1250, 1112, C.purple);
text('Keep digging', 250, 650, 27, C.purple);
text('until the question\nis answered', 250, 696, 23, C.purple);
line([[466, 728], [619, 728], [699, 711]], {
  strokeColor: C.purple, strokeWidth: 1.5, strokeStyle: 'dashed',
});
text('Sometimes you need\nthe source itself.', 1280, 1065, 25, C.purple);
text('Done.', 1280, 1140, 24, C.purple);

centered('Each question takes its own path.', 880, 1250, 30);
centered('Stop at whichever layer gives you enough understanding.', 880, 1296, 25, '#657080');

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
