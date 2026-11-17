import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { chromium } from 'playwright-core';

const toolDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { values } = parseArgs({
  options: {
    input: { type: 'string', short: 'i' },
    output: { type: 'string', short: 'o' },
    scale: { type: 'string', default: '2' },
    help: { type: 'boolean', short: 'h', default: false },
  },
});
if (values.help) {
  console.log(`Usage: node render.mjs [options]

  -i, --input <file>   Diagram module (default: corporate-value-funnel.js)
  -o, --output <file>  PNG destination (default: ../assets/corporate_value_funnel.png)
      --scale <n>      Export scale (default: 2)
  -h, --help           Show this help

Explicit paths are relative to the current working directory.
An editable .excalidraw scene is saved beside the PNG.
Set CHROME_PATH to use a particular Chrome or Chromium executable.`);
  process.exit(0);
}

const input = values.input
  ? path.resolve(values.input)
  : path.join(toolDir, 'corporate-value-funnel.js');
const output = values.output
  ? path.resolve(values.output)
  : path.resolve(toolDir, '../assets/corporate_value_funnel.png');
const scale = Number(values.scale);
if (!Number.isFinite(scale) || scale <= 0) {
  throw new Error('--scale must be a positive number.');
}
if (path.extname(output).toLowerCase() !== '.png') {
  throw new Error('--output must name a .png file.');
}
await fs.access(input);

// Keep bundles in a temporary directory and serve only bundles and bundled fonts.
const buildDir = await fs.mkdtemp(path.join(os.tmpdir(), 'excalidraw-render-'));
const dist = path.dirname(require.resolve('@excalidraw/excalidraw'));
let browser;
let server;
try {
  await build({
    entryPoints: { diagram: input }, bundle: true,
    outdir: buildDir, format: 'esm', splitting: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    loader: { '.woff2': 'file', '.wasm': 'file' },
    logLevel: 'error',
  });
  server = http.createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<!doctype html><html><head><meta charset="utf-8"></head><body><script>window.EXCALIDRAW_ASSET_PATH="/";</script><script type="module" src="/build/diagram.js"></script></body></html>');
        return;
      }
      let base;
      let relative;
      if (pathname.startsWith('/fonts/')) {
        base = path.join(dist, 'fonts');
        relative = pathname.slice('/fonts/'.length);
      } else if (pathname.startsWith('/build/')) {
        base = buildDir;
        relative = pathname.slice('/build/'.length);
      } else {
        res.writeHead(404).end();
        return;
      }
      const file = path.resolve(base, relative);
      if (!file.startsWith(base + path.sep)) {
        res.writeHead(404).end();
        return;
      }
      const data = await fs.readFile(file);
      const mime = {
        '.js': 'text/javascript', '.woff2': 'font/woff2',
        '.css': 'text/css', '.wasm': 'application/wasm',
      }[path.extname(file)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  if (process.env.CHROME_PATH) {
    browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  } else {
    try {
      browser = await chromium.launch({ channel: 'chrome', headless: true });
    } catch {
      try {
        browser = await chromium.launch({ headless: true });
      } catch (cause) {
        throw new Error('Install Google Chrome, set CHROME_PATH, or run "npx playwright-core install chromium" from src/image-gen.', { cause });
      }
    }
  }
  const page = await browser.newPage({ viewport: { width: 1760, height: 1160 } });
  page.on('pageerror', error => console.error('Diagram error:', error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.waitForFunction(() => typeof window.renderDiagram === 'function');
  const result = await page.evaluate(scale => window.renderDiagram({ scale }), scale);
  const scenePath = output.replace(/\.png$/i, '.excalidraw');
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, Buffer.from(result.png.split(',')[1], 'base64'));
  await fs.writeFile(scenePath, JSON.stringify(result.scene, null, 2) + '\n');
  console.log(`Saved ${output} (${result.width} × ${result.height})`);
  console.log(`Saved ${scenePath}`);
} finally {
  try {
    await browser?.close();
  } finally {
    if (server?.listening) {
      server.closeAllConnections();
      await new Promise(resolve => server.close(resolve));
    }
    await fs.rm(buildDir, { recursive: true, force: true });
  }
}
