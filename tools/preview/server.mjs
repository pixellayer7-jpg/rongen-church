/**
 * 榮恩堂主題的本機預覽伺服器。
 *
 * 本機沒有 PHP／WordPress 環境時，用這支伺服器檢視主題的實際版面。
 * 靜態資源直接由 wp-content/themes/rongen/assets 提供，
 * 因此看到的樣式與 WordPress 上線後完全相同。
 *
 * 用法：npm run preview
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { sermons, bulletins, events, news } from './content.mjs';
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
} from './render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEME_DIR = path.resolve(__dirname, '../../wp-content/themes/rongen');
const PORT = Number(process.env.PORT) || 4321;

const MIME = {
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.woff2': 'font/woff2',
	'.ico': 'image/x-icon',
};

const staticRoutes = {
	'/': renderHome,
	'/about/': renderAbout,
	'/worship/': renderWorship,
	'/beliefs/': renderBeliefs,
	'/news/': renderNewsArchive,
	'/giving/': renderGiving,
	'/celc/': renderCelc,
	'/contact/': renderContact,
	'/sermons/': renderSermonArchive,
	'/bulletins/': renderBulletinArchive,
	'/events/': renderEventArchive,
};

const collections = [
	{ prefix: '/sermons/', items: sermons, render: renderSermon },
	{ prefix: '/bulletins/', items: bulletins, render: renderBulletin },
	{ prefix: '/events/', items: events, render: renderEvent },
	{ prefix: '/news/', items: news, render: renderPost },
];

function serveAsset(res, urlPath) {
	// /assets/... 直接對應主題目錄下的 assets/...
	const relative = decodeURIComponent(urlPath.replace(/^\/assets\//, ''));
	const filePath = path.join(THEME_DIR, 'assets', relative);

	// 防止路徑跳脫主題目錄。
	if (!filePath.startsWith(path.join(THEME_DIR, 'assets'))) {
		res.writeHead(403).end('Forbidden');
		return;
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404).end('Not found');
			return;
		}
		res.writeHead(200, {
			'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
			'Cache-Control': 'no-cache',
		});
		res.end(data);
	});
}

function html(res, body, status = 200) {
	res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
	res.end(body);
}

const server = http.createServer((req, res) => {
	let urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname;

	if (urlPath.startsWith('/assets/')) {
		serveAsset(res, urlPath);
		return;
	}

	// 統一補上結尾斜線，讓 /worship 與 /worship/ 都能運作。
	if (!urlPath.endsWith('/')) {
		res.writeHead(301, { Location: `${urlPath}/` }).end();
		return;
	}

	if (staticRoutes[urlPath]) {
		html(res, staticRoutes[urlPath]());
		return;
	}

	for (const { prefix, items, render } of collections) {
		if (urlPath.startsWith(prefix)) {
			const slug = urlPath.slice(prefix.length).replace(/\/$/, '');
			const item = items.find((entry) => entry.slug === slug);
			if (item) {
				html(res, render(item));
				return;
			}
		}
	}

	html(res, render404(), 404);
});

server.listen(PORT, () => {
	const pages = ['/', ...Object.keys(staticRoutes).filter((p) => p !== '/')];
	console.log(`\n榮恩堂主題預覽已啟動： http://localhost:${PORT}\n`);
	console.log('可瀏覽的頁面：');
	pages.forEach((p) => console.log(`  http://localhost:${PORT}${p}`));
	console.log('\n按 Ctrl+C 結束。\n');
});
