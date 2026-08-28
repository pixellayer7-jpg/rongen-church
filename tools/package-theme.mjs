/**
 * 將主題打包成可直接上傳到 WordPress 的 zip。
 *
 * 產出：dist/rongen.zip（解壓後為 rongen/ 目錄，符合 WordPress 主題上傳格式）
 *
 * 用法：npm run build:theme
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildZip, walk } from './lib/zip.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const THEME_DIR = path.join(ROOT, 'wp-content/themes/rongen');
const OUT_DIR = path.join(ROOT, 'dist');
const OUT_FILE = path.join(OUT_DIR, 'rongen.zip');
const THEME_SLUG = 'rongen';

if (!fs.existsSync(THEME_DIR)) {
	console.error(`找不到主題目錄：${THEME_DIR}`);
	process.exit(1);
}

const files = walk(THEME_DIR);
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, buildZip(files, THEME_SLUG));

const sizeKb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
console.log(`已打包 ${files.length} 個檔案`);
console.log(`輸出：${path.relative(ROOT, OUT_FILE)}（${sizeKb} KB）`);
console.log('可直接於 WordPress 後台「外觀 → 佈景主題 → 安裝佈景主題 → 上傳佈景主題」上傳此檔。');
