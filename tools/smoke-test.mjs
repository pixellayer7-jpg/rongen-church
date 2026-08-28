/**
 * 冒煙測試：抓取本機 WordPress 的每個頁面，檢查是否出現 PHP 錯誤、
 * 未解析的簡碼，或空白頁。
 *
 * 前置作業：本機需有一個已安裝榮恩堂主題的 WordPress，並以下列位址提供服務。
 * 用法：node tools/smoke-test.mjs [baseUrl]
 */

const BASE = process.argv[2] || 'http://localhost:8080';

const paths = [
	['首頁', '/'],
	['關於榮恩堂', '/關於榮恩堂/'],
	['崇拜與聚會', '/崇拜與聚會/'],
	['信仰告白', '/信仰告白/'],
	['教會消息', '/教會消息/'],
	['奉獻', '/奉獻/'],
	['總會與各堂會', '/總會與各堂會/'],
	['聯絡與交通', '/聯絡與交通/'],
	['講道存檔', '/sermons/'],
	['主日週報', '/bulletins/'],
	['教會活動', '/events/'],
	['單篇講道', '/sermons/不要為自己積財，要在上帝面前富足/'],
	['單篇週報', '/bulletins/聖靈降臨後第九主日週報/'],
	['單篇活動', '/events/社區長者關懷聚餐/'],
	['節期彙整', '/season/聖靈降臨期/'],
	['搜尋結果', '/?s=基督'],
	['404 頁面', '/this-page-does-not-exist/'],
];

const ERROR_PATTERNS = [
	[/Fatal error/i, 'PHP Fatal error'],
	[/Parse error/i, 'PHP Parse error'],
	[/\bWarning<\/b>|<br \/>\s*<b>Warning/i, 'PHP Warning'],
	[/Deprecated:/i, 'PHP Deprecated'],
	[/Notice:/i, 'PHP Notice'],
	[/\[rongen_[a-z_]+\]/, '未解析的簡碼'],
	[/Undefined (variable|index|array key)/i, 'Undefined variable/index'],
];

let failures = 0;

for (const [label, path] of paths) {
	const url = BASE + encodeURI(path);
	let res;
	let body = '';

	try {
		res = await fetch(url, { redirect: 'follow' });
		body = await res.text();
	} catch (error) {
		console.log(`FAIL  ${label.padEnd(12)} 連線失敗：${error.message}`);
		failures++;
		continue;
	}

	const problems = [];
	const expectedStatus = label === '404 頁面' ? 404 : 200;

	if (res.status !== expectedStatus) {
		problems.push(`HTTP ${res.status}（預期 ${expectedStatus}）`);
	}

	for (const [pattern, name] of ERROR_PATTERNS) {
		if (pattern.test(body)) problems.push(name);
	}

	if (!body.includes('</footer>')) problems.push('頁尾未輸出（頁面可能中斷）');
	if (!body.includes('rongen/assets/css/theme.css')) problems.push('主題樣式未載入');

	if (problems.length) {
		failures++;
		console.log(`FAIL  ${label.padEnd(12)} ${problems.join('；')}`);
	} else {
		const kb = (body.length / 1024).toFixed(0);
		console.log(`ok    ${label.padEnd(12)} HTTP ${res.status}  ${kb} KB`);
	}
}

console.log(
	failures ? `\n${failures} 個頁面有問題。` : `\n全部 ${paths.length} 個頁面通過。`
);
process.exit(failures ? 1 : 0);
