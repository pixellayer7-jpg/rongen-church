/**
 * 檢查匯出的靜態網站：所有本機連結與資源都必須真的存在，
 * 確保對方雙擊 index.html 之後不會出現破圖或死連結。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '../dist/preview-site');

function walk(dir) {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) return walk(full);
		return entry.name.endsWith('.html') ? [full] : [];
	});
}

const pages = walk(SITE);
const problems = [];
let checked = 0;

for (const page of pages) {
	const html = fs.readFileSync(page, 'utf8');
	const dir = path.dirname(page);

	for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
		const target = match[1];

		// 只驗證本機相對路徑，外部網址與錨點跳過。
		if (/^(https?:|mailto:|tel:|#|data:)/.test(target)) continue;

		const resolved = path.resolve(dir, target.split('#')[0]);
		checked += 1;
		if (!fs.existsSync(resolved)) {
			problems.push(`${path.relative(SITE, page)} → ${target}`);
		}
	}
}

console.log(`檢查頁面：${pages.length}`);
console.log(`檢查本機連結：${checked}`);

if (problems.length) {
	console.log(`\n失效連結 ${problems.length} 個：`);
	problems.forEach((p) => console.log(`  ${p}`));
	process.exit(1);
}

console.log('\n全部本機連結與資源都存在。');
