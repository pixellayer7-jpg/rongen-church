/**
 * 把預覽網站匯出成純靜態檔案，方便寄給牧師或同工預覽。
 *
 * 輸出的資料夾同時支援兩種看法：
 *   1. 直接雙擊 index.html（file:// 開啟，不需要伺服器）
 *   2. 上傳到任何靜態空間（Netlify / GitHub Pages / 虛擬主機）
 *
 * 為此所有根目錄絕對路徑（/worship/、/assets/...）都會改寫成相對路徑，
 * 並補上 index.html，因為 file:// 不會自動尋找目錄索引檔。
 *
 * 用法：npm run export
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildZip, walk } from './lib/zip.mjs';
import { sermons, bulletins, events, news } from './preview/content.mjs';
import {
	renderHome,
	renderWorship,
	renderBeliefs,
	renderAbout,
	renderContact,
	renderGiving,
	renderCelc,
	renderNewsArchive,
	renderSermonArchive,
	renderSermon,
	renderBulletinArchive,
	renderBulletin,
	renderEventArchive,
	renderEvent,
	renderPost,
	render404,
} from './preview/render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const THEME_ASSETS = path.join(ROOT, 'wp-content/themes/rongen/assets');
const OUT_DIR = path.join(ROOT, 'dist/preview-site');
const OUT_ZIP = path.join(ROOT, 'dist/榮恩堂網站預覽.zip');

/** 所有頁面：route 為原本的網址路徑，html 為產生的內容。 */
function collectPages() {
	const pages = [
		['/', renderHome],
		['/about/', renderAbout],
		['/worship/', renderWorship],
		['/beliefs/', renderBeliefs],
		['/news/', renderNewsArchive],
		['/giving/', renderGiving],
		['/celc/', renderCelc],
		['/contact/', renderContact],
		['/sermons/', renderSermonArchive],
		['/bulletins/', renderBulletinArchive],
		['/events/', renderEventArchive],
	].map(([route, render]) => ({ route, html: render() }));

	const collections = [
		{ prefix: '/sermons/', items: sermons, render: renderSermon },
		{ prefix: '/bulletins/', items: bulletins, render: renderBulletin },
		{ prefix: '/events/', items: events, render: renderEvent },
		{ prefix: '/news/', items: news, render: renderPost },
	];

	for (const { prefix, items, render } of collections) {
		for (const item of items) {
			pages.push({ route: `${prefix}${item.slug}/`, html: render(item) });
		}
	}

	return pages;
}

/**
 * 將 HTML 中的根目錄絕對路徑改寫成相對於該頁面的路徑。
 * depth 為該頁面 index.html 距離站台根目錄的層數。
 */
function toRelative(html, depth) {
	const prefix = depth === 0 ? '' : '../'.repeat(depth);

	return html.replace(/(href|src)="\/([^"]*)"/g, (_match, attr, target) => {
		let resolved;
		if (target.startsWith('assets/')) {
			resolved = `${prefix}${target}`;
		} else if (target === '') {
			resolved = `${prefix}index.html`;
		} else if (target.endsWith('/')) {
			resolved = `${prefix}${target}index.html`;
		} else {
			resolved = `${prefix}${target}`;
		}
		return `${attr}="${resolved || './'}"`;
	});
}

function copyDir(from, to) {
	fs.mkdirSync(to, { recursive: true });
	for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
		const src = path.join(from, entry.name);
		const dest = path.join(to, entry.name);
		if (entry.isDirectory()) {
			copyDir(src, dest);
		} else {
			fs.copyFileSync(src, dest);
		}
	}
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const pages = collectPages();

for (const { route, html } of pages) {
	const relDir = route.replace(/^\//, '').replace(/\/$/, '');
	const depth = relDir === '' ? 0 : relDir.split('/').length;
	const outFile = path.join(OUT_DIR, relDir, 'index.html');

	fs.mkdirSync(path.dirname(outFile), { recursive: true });
	fs.writeFileSync(outFile, toRelative(html, depth), 'utf8');
}

// 404 頁放在根目錄，靜態空間可設為錯誤頁。
fs.writeFileSync(path.join(OUT_DIR, '404.html'), toRelative(render404(), 0), 'utf8');

copyDir(THEME_ASSETS, path.join(OUT_DIR, 'assets'));

// 收件者多半不熟悉技術，附一份最簡單的開啟說明。
const readme = `榮恩堂網站設計稿預覽
=====================

如何觀看
--------
請直接雙擊本資料夾中的「index.html」，網站就會在瀏覽器中開啟。
之後點選上方選單即可瀏覽各個頁面，操作方式與一般網站相同。

觀看時請注意
------------
1. 建議連著網路開啟，字體與地圖需要連線才會完整顯示；
   若沒有網路，版面仍可瀏覽，只是字體會替換成系統預設。
2. 以下資料已與總會官網及本堂 Facebook 專頁核對過，應為正確：
   教會地址、電話、電子郵件、主日崇拜時間、
   主責牧師與駐堂教師、總會各堂會名單，
   以及「關於榮恩堂」頁中的教會歷史。
3. 以下內容目前仍是示範文字，用來呈現版面效果，尚待教會提供：
   講道稿、教會消息、活動，以及三篇週報中較舊的兩篇。
4. 這是設計稿預覽，尚未上線，網路上還搜尋不到。

想回饋意見
----------
任何想調整的地方都可以提出，例如：
  ・文字內容與用詞
  ・顏色與字體大小
  ・頁面的順序與選單名稱
  ・希望增加或刪除的頁面
`;
fs.writeFileSync(path.join(OUT_DIR, '請先讀我.txt'), `\uFEFF${readme}`, 'utf8');

// 一併打包成可直接寄出的 zip（解壓後 index.html 即在最上層）。
fs.writeFileSync(OUT_ZIP, buildZip(walk(OUT_DIR)));

const zipKb = (fs.statSync(OUT_ZIP).size / 1024).toFixed(1);
console.log(`\n靜態網站已匯出：${path.relative(ROOT, OUT_DIR)}`);
console.log(`  頁面數：${pages.length + 1}（含 404）`);
console.log(`可寄出的壓縮檔：${path.relative(ROOT, OUT_ZIP)}（${zipKb} KB）`);
console.log('\n給牧師預覽的兩種方式：');
console.log('  1. 把 zip 寄出，對方解壓後雙擊 index.html 即可瀏覽，不需網路伺服器');
console.log('  2. 把 dist/preview-site 資料夾拖到 https://app.netlify.com/drop 取得公開網址\n');
