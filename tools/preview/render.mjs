/**
 * 預覽用的 HTML 產生器。
 *
 * 這裡的標記結構刻意與 wp-content/themes/rongen 下的 PHP 樣板一致，
 * 並直接載入主題本身的 assets/css/theme.css 與 assets/js/main.js，
 * 因此看到的版面、間距與互動即為 WordPress 上線後的樣子。
 */

import {
	church,
	nav,
	footerNav,
	schedule,
	pillars,
	liturgy,
	faq,
	churches,
	sermons,
	bulletins,
	events,
	news,
} from './content.mjs';
import { OG_IMAGE, OG_IMAGE_ALT } from './og-meta.mjs';

const WEEKDAYS = ['主日', '週一', '週二', '週三', '週四', '週五', '週六'];

export function esc(value = '') {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function formatDate(iso, withWeekday = true) {
	if (!iso) return '';
	const d = new Date(`${iso}T00:00:00`);
	if (Number.isNaN(d.getTime())) return iso;
	const text = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
	return withWeekday ? `${text}（${WEEKDAYS[d.getDay()]}）` : text;
}

function enTwin(zhUrl) {
	if (!zhUrl || zhUrl === '/') return '/en/';
	return `/en${zhUrl.startsWith('/') ? zhUrl : `/${zhUrl}`}`;
}

function langSwitcher(currentUrl) {
	const en = enTwin(currentUrl);
	return `<p class="lang-switch" role="navigation" aria-label="語言 / Language">
		<span class="lang-switch__current">中文</span>
		<span aria-hidden="true">·</span>
		<a href="${esc(en)}">EN</a>
	</p>`;
}

const CROSS = '<svg class="cross-mark" viewBox="0 0 24 36" aria-hidden="true" focusable="false"><path d="M10.6 0h2.8v9.4H24v2.8H13.4V36h-2.8V12.2H0V9.4h10.6z"/></svg>';

const tel = (value) => value.replace(/[^0-9+]/g, '');

const mapFallback = `<div class="map-fallback">
	<p class="map-fallback__label">聚會地點</p>
	<p class="map-fallback__address">${esc(church.address)}</p>
	<a class="map-fallback__link" href="${esc(church.mapUrl)}" target="_blank" rel="noopener">在 Google 地圖開啟 →</a>
</div>`;

/* -------------------------------------------------------------------------
   版面框架
   ------------------------------------------------------------------------- */

function header(currentUrl) {
	const items = nav
		.map((item) => {
			const active = item.url === currentUrl ? ' class="current-menu-item"' : '';
			return `<li${active}><a href="${item.url}">${esc(item.label)}</a></li>`;
		})
		.join('');

	return `<a class="skip-link" href="#content">跳至主要內容</a>
<header class="site-header" id="site-header">
	<div class="header-top">
		<div class="wrap header-top__inner">
			<p class="header-top__meta">
				<span>${esc(church.serviceTime)}</span>
				<span>${esc(church.address)}</span>
			</p>
			<p class="header-top__meta">
				<a href="tel:${esc(tel(church.phone))}">${esc(church.phone)}</a>
				<a href="${esc(church.facebook)}" target="_blank" rel="noopener">Facebook</a>
				<a href="${esc(church.celcUrl)}" target="_blank" rel="noopener">總會</a>
				${langSwitcher(currentUrl)}
			</p>
		</div>
	</div>
	<div class="wrap header-main">
		<a class="brand" href="/" rel="home">
			<span class="brand__mark">${CROSS}</span>
			<span class="brand__text">
				<span class="brand__name">${esc(church.name)}</span>
				<span class="brand__sub">${esc(church.latin)}</span>
			</span>
		</a>
		<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-primary">
			<span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
			<span>選單</span>
		</button>
		<nav class="nav-primary" id="nav-primary" aria-label="主選單"><ul>${items}</ul></nav>
	</div>
</header>
<main id="content" class="site-content">`;
}

function footer() {
	const links = footerNav.map((item) => `<li><a href="${item.url}">${esc(item.label)}</a></li>`).join('');

	return `</main>
<footer class="site-footer">
	<div class="footer-visit">
		<div class="footer-visit__body">
			<p class="kicker">歡迎前來</p>
			<h2>主日，我們在白河仙草等你</h2>
			<p>榮恩堂位於台南白河仙草，鄰近關子嶺山區。初次來訪不需要任何準備，也不必擔心不熟悉禮儀程序——會堂入口備有崇拜手冊，同工會協助你找到座位。</p>
			<dl class="info-list">
				<div class="info-list__row"><dt>主日崇拜</dt><dd>${esc(church.serviceTime)}</dd></div>
				<div class="info-list__row"><dt>地址</dt><dd>${esc(church.address)}</dd></div>
				<div class="info-list__row"><dt>聯絡</dt><dd>${esc(church.teacher)}　${esc(church.mobile)}</dd></div>
			</dl>
			<div class="btn-row">
				<a class="btn btn--light" href="${esc(church.mapUrl)}" target="_blank" rel="noopener">開啟 Google 地圖</a>
			</div>
		</div>
		<div class="footer-visit__map">
			${mapFallback}
			<iframe src="${esc(church.mapEmbed)}" title="${esc(church.name)}位置地圖" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
		</div>
	</div>
	<div class="wrap footer-main">
		<div class="footer-col footer-brand">
			<span class="brand__mark">${CROSS}</span>
			<h3>${esc(church.name)}</h3>
			<p>${esc(church.address)}</p>
			<p>${esc(church.phone)}</p>
			<p><a href="mailto:${esc(church.email)}">${esc(church.email)}</a></p>
		</div>
		<div class="footer-col">
			<h3>牧養同工</h3>
			<p>聖禮牧師　${esc(church.pastor)}</p>
			<p>駐堂教師　${esc(church.teacher)}</p>
			<p>${esc(church.mobile)}</p>
		</div>
		<div class="footer-col">
			<h3>網站導覽</h3>
			<ul>${links}</ul>
		</div>
		<div class="footer-col">
			<h3>相關連結</h3>
			<ul>
				<li><a href="${esc(church.celcUrl)}" target="_blank" rel="noopener">中華福音道路德會（總會）</a></li>
				<li><a href="https://celc.org.tw/lutheran-church/" target="_blank" rel="noopener">各堂會與佈道所</a></li>
				<li><a href="${esc(church.facebook)}" target="_blank" rel="noopener">榮恩堂 Facebook 專頁</a></li>
			</ul>
		</div>
	</div>
	<div class="wrap footer-bottom">
		<p>&copy; ${new Date().getFullYear()} ${esc(church.name)}　版權所有</p>
		<p>隸屬於財團法人中華福音道路德會</p>
	</div>
</footer>
<script src="/assets/js/main.js"></script>
</body>
</html>`;
}

export function layout({ title, body, url = '/' }) {
	const pageTitle = `${title} — ${church.name}`
	const description =
		'榮恩堂自訂 WordPress 主題作品集預覽（繁中）。禮儀教會風格、本機預覽工具與 GitHub Pages 雙語演示。正式堂會站內容以繁中為準。'
	const canonical = `https://pixellayer7-jpg.github.io/rongen-church${url === '/' ? '/' : url}`
	return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<!-- 這是尚未上線的設計稿預覽，不應被搜尋引擎收錄。正式主題不含此標記。 -->
<meta name="robots" content="noindex, nofollow">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:locale" content="zh_TW">
<meta property="og:image" content="${esc(OG_IMAGE)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(pageTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(OG_IMAGE)}">
<meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap">
<link rel="stylesheet" href="/assets/css/theme.css">
<style>
.lang-switch{display:inline-flex;gap:.35rem;align-items:center;margin:0;font-size:.85rem}
.lang-switch a{color:inherit;text-decoration:underline;text-underline-offset:2px}
.lang-switch__current{opacity:.85;font-weight:600}
.print-hint{margin:0;padding:.55rem 1rem;background:#f2ece1;border-bottom:1px solid rgba(18,22,29,.12);font-size:.88rem;text-align:center;color:#59616b}
</style>
</head>
<body class="${url === '/' ? 'is-front ' : ''}no-sidebar">
${header(url)}
<p class="print-hint no-print">列印審閱：按 <kbd>Ctrl</kbd>+<kbd>P</kbd>（Mac：⌘P）。選單、地圖與影片不會出現在列印稿；聯絡資訊會保留。</p>
${body}
${footer()}`;
}

/* -------------------------------------------------------------------------
   共用區塊
   ------------------------------------------------------------------------- */

function sectionHead(kicker, title, align = 'center') {
	return `<header class="section-head section-head--${align}">${
		kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''
	}<h2 class="section-head__title">${title}</h2><span class="rule" aria-hidden="true"></span></header>`;
}

function pageHero({ title, kicker = '', text = '', breadcrumb = true }) {
	return `<section class="page-hero">
	<div class="wrap page-hero__inner">
		${breadcrumb ? `<p class="breadcrumb"><a href="/">${esc(church.short)}</a> <span aria-hidden="true">／</span> <span>${esc(title)}</span></p>` : ''}
		${kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''}
		<h1 class="page-hero__title">${esc(title)}</h1>
		<span class="rule" aria-hidden="true"></span>
		${text ? `<p class="page-hero__text">${esc(text)}</p>` : ''}
	</div>
</section>`;
}

function card(item, { base, label }) {
	return `<article class="card">
	<a class="card__media" href="${base}${item.slug}/" tabindex="-1" aria-hidden="true"><span class="card__placeholder">${CROSS}</span></a>
	<div class="card__body">
		<p class="card__meta"><span class="tag">${esc(label)}</span><time>${esc(formatDate(item.date))}</time></p>
		<h3 class="card__title"><a href="${base}${item.slug}/">${esc(item.title)}</a></h3>
		${item.scripture ? `<p class="card__scripture">${esc(item.scripture)}</p>` : ''}
		<p class="card__excerpt">${esc(item.excerpt || '')}</p>
	</div>
</article>`;
}

function scheduleTable(rows) {
	return `<div class="schedule">${rows
		.map(
			(row) => `<div class="schedule__row">
		<div class="schedule__name">${esc(row.name)}</div>
		<div class="schedule__when">${esc(row.when)}</div>
		<div class="schedule__note">${esc(row.note)}</div>
	</div>`
		)
		.join('')}</div>`;
}

function pillarsGrid() {
	return `<div class="pillars">${pillars
		.map(
			(p) => `<div class="pillar">
		<p class="pillar__latin">${esc(p.latin)}</p>
		<h3 class="pillar__title">${esc(p.title)}</h3>
		<p class="pillar__text">${esc(p.text)}</p>
	</div>`
		)
		.join('')}</div>`;
}

function contactList() {
	const rows = [
		['地址', church.address],
		['電話', church.phone],
		['駐堂教師', `${church.teacher}　${church.mobile}`],
		['聖禮牧師', `${church.pastor}　${church.pastorPhone}`],
		['電子郵件', church.email],
		['主日崇拜', church.serviceTime],
	];
	return `<dl class="info-list">${rows
		.map(([k, v]) => `<div class="info-list__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
		.join('')}</dl>`;
}

/* -------------------------------------------------------------------------
   頁面
   ------------------------------------------------------------------------- */

export function renderHome() {
	const entries = [
		['我們如何崇拜', '禮儀崇拜不是表演，而是上帝親自在聖道與聖禮中服事我們。認識主日崇拜的次序與意義。', '/worship/', '崇拜與聚會'],
		['我們所信的', '本堂完全認同《協同書》的信仰立場，以聖經為惟一準則，傳講律法與福音。', '/beliefs/', '信仰告白'],
		['如何找到我們', '教會位於台南白河仙草里，交通方式、停車資訊與聯絡電話都在這裡。', '/contact/', '聯絡與交通'],
	];

	const body = `<section class="hero">
	<div class="wrap hero__inner">
		<p class="kicker">${esc(church.heroKicker)}</p>
		<h1 class="hero__title">${church.heroTitle}</h1>
		<p class="hero__text">${esc(church.heroText)}</p>
		<dl class="hero__times">
			<div><dt>主日崇拜</dt><dd>${esc(church.serviceTime)}</dd></div>
			<div><dt>聚會地點</dt><dd>${esc(church.tagline)}</dd></div>
			<div><dt>駐堂教師</dt><dd>${esc(church.teacher)}</dd></div>
		</dl>
		<div class="btn-row">
			<a class="btn" href="/worship/">崇拜與聚會</a>
			<a class="btn btn--light" href="/contact/">初次來訪</a>
		</div>
	</div>
</section>

<section class="section section--tight">
	<div class="wrap">
		<div class="entry-grid">${entries
			.map(
				([title, text, url, more]) => `<a class="entry-item" href="${url}">
			<span class="entry-item__icon">${CROSS}</span>
			<h2 class="entry-item__title">${esc(title)}</h2>
			<p class="entry-item__text">${esc(text)}</p>
			<span class="entry-item__more">${esc(more)} →</span>
		</a>`
			)
			.join('')}</div>
	</div>
</section>

<section class="verse">
	<div class="wrap wrap--narrow verse__inner">
		<p class="verse__text">「${esc(church.verseText)}」</p>
		<p class="verse__ref">${esc(church.verseRef)}</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__media">${CROSS}</div>
			<div class="split__body">
				<p class="kicker">禮儀・莊重・以聖道為中心</p>
				<h2>崇拜是這間教會最核心的事</h2>
				<p>我們的崇拜是刻意安排的，不是即興的。從認罪與赦罪開始，經過入壇詞、求主憐憫文、榮歸主頌，到三段讀經、證道與祝福，整個次序都在傳達同一件事：上帝在此，祂要親自把祂的恩賜交在你手中。</p>
				<p>這樣的次序不是新的發明。它承接了歷代教會近兩千年的傳統，也承接了 1517 年馬丁路德改革之後、路德宗教會一貫的實踐。</p>
				<ul class="split__list">
					<li>講道按著律法與福音傳講，指出人的罪，也宣告基督的赦免。</li>
					<li>聖禮（洗禮與聖餐）被視為上帝真實施恩的憑據，不只是象徵。</li>
					<li>會眾同聲頌唱聖詩與信仰告白，一同回應上帝的話。</li>
					<li>穿著不拘，無論正式或輕便都歡迎；莊重的是崇拜本身。</li>
				</ul>
				<div class="btn-row"><a class="btn btn--ghost" href="/worship/">了解主日崇拜次序</a></div>
			</div>
		</div>
	</div>
</section>

<section class="section section--ink section--watermark">
	<span class="watermark" aria-hidden="true">sola gratia</span>
	<div class="wrap">
		${sectionHead('路德宗的信仰', '我們所信、所教、所告白的')}
		${pillarsGrid()}
		<div class="btn-row" style="justify-content:center"><a class="btn btn--light" href="/beliefs/">完整信仰告白</a></div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('每週聚會', '一週的節奏')}
		${scheduleTable(schedule)}
		<div class="notice" style="margin-top:2.5rem"><p>聚會時間偶有調整，最新公告請見教會消息或榮恩堂 Facebook 專頁；若不確定，也歡迎直接電話詢問。</p></div>
	</div>
</section>

<section class="section">
	<div class="wrap">
		${sectionHead('教會消息', '最新公告與活動')}
		<div class="card-grid">
			${news.map((n) => card(n, { base: '/news/', label: '教會消息' })).join('')}
			${card(events[0], { base: '/events/', label: '教會活動' })}
		</div>
		<div class="btn-row" style="justify-content:center">
			<a class="btn btn--ghost" href="/news/">所有消息</a>
			<a class="btn btn--ghost" href="${esc(church.facebook)}" target="_blank" rel="noopener">Facebook 專頁</a>
		</div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('聖道', '近期講道')}
		<div class="card-grid">${sermons.map((s) => card(s, { base: '/sermons/', label: '講道' })).join('')}</div>
		<div class="btn-row" style="justify-content:center">
			<a class="btn btn--ghost" href="/sermons/">講道存檔</a>
			<a class="btn btn--ghost" href="/bulletins/">主日週報下載</a>
		</div>
	</div>
</section>`;

	return layout({ title: '首頁', body, url: '/' });
}

export function renderWorship() {
	const body = `${pageHero({
		title: '崇拜與聚會',
		kicker: '禮儀・莊重・以聖道為中心',
		text: '崇拜是榮恩堂最核心的事。上帝的愛最清楚地顯明在祂於崇拜中，藉聖道與聖禮把恩賜交給祂百姓的那一刻。',
	})}

<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__body">
				<p class="kicker">主日崇拜</p>
				<h2>${esc(church.serviceTime)}</h2>
				<p>我們的崇拜是「禮儀崇拜」。這代表崇拜的每一部分都經過安排，不是即興發揮；語氣是莊重的，而不是閒談式的，因為所談論的是關乎永恆的事。</p>
				<p>你不需要事先準備什麼。入口備有崇拜手冊，程序與所唱的詩歌都印在其中；若一時跟不上，坐著觀看也完全沒有關係。</p>
				<div class="btn-row">
					<a class="btn" href="/contact/">交通與位置</a>
					<a class="btn btn--ghost" href="/bulletins/">本週週報</a>
				</div>
			</div>
			<div class="split__media">${CROSS}</div>
		</div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('崇拜次序', '主日崇拜的流程與意義', 'left')}
		<div class="schedule">${liturgy
			.map(
				([name, note], i) => `<div class="schedule__row">
			<div class="schedule__name">${esc(name)}</div>
			<div class="schedule__when">第 ${i + 1} 段</div>
			<div class="schedule__note">${esc(note)}</div>
		</div>`
			)
			.join('')}</div>
	</div>
</section>

<section class="section">
	<div class="wrap">
		${sectionHead('每週聚會', '除了主日，我們也這樣聚集')}
		${scheduleTable(schedule)}
	</div>
</section>

<section class="section section--ink section--watermark">
	<span class="watermark" aria-hidden="true">gottesdienst</span>
	<div class="wrap wrap--narrow">
		${sectionHead('常見問題', '初次來訪，你可能想問', 'left')}
		<div class="schedule">${faq
			.map(
				([q, a]) => `<div class="schedule__row" style="grid-template-columns:minmax(12rem,1fr) minmax(0,2fr)">
			<div class="schedule__name" style="color:#fff">${esc(q)}</div>
			<div class="schedule__note" style="color:rgba(255,255,255,.72)">${esc(a)}</div>
		</div>`
			)
			.join('')}</div>
	</div>
</section>`;

	return layout({ title: '崇拜與聚會', body, url: '/worship/' });
}

export function renderBeliefs() {
	const body = `${pageHero({
		title: '信仰告白',
		kicker: '所信・所教・所告白',
		text: '榮恩堂隸屬中華福音道路德會，本於聖道與聖禮，完全認同《協同書》所載的信仰立場。',
	})}

<section class="section">
	<div class="wrap">
		${sectionHead('宗教改革的四個「惟獨」', '我們信仰的根基')}
		${pillarsGrid()}
	</div>
</section>

<section class="section section--paper">
	<div class="wrap wrap--narrow prose">
		<h2>何謂路德宗</h2>
		<p>「路德宗」指的是 1517 年馬丁路德開啟教會改革運動之後，至 1580 年《協同書》正式發行，凡以路德會為名並完全認同《協同書》信仰立場的教會。</p>
		<p>我們不是因為保守才拒絕改變，也不是為了「一向都這麼做」而守舊。我們持守歷史的禮儀，是因為我們委身於聖經、委身於《協同書》，並以感恩的心領受路德宗的傳統，包括其中的禮儀與儀節。</p>
		<h2>聖經</h2>
		<p>新舊約聖經是聖靈所默示的，是無誤、無謬的上帝之言，也是信仰與生活惟一的準則與規範。教會的一切教導都必須受聖經檢驗。</p>
		<h2>信條</h2>
		<p>1580 年出版的《協同書》收錄了完整的路德宗信條文獻，其中包括《未經修改的奧斯堡信條》、《小要理問答》與《大要理問答》。我們相信這些信條正確地闡述了聖經的教導。</p>
		<h2>聖禮</h2>
		<p>洗禮與聖餐不只是象徵或紀念。在洗禮中，上帝的名被加在人身上，罪得赦免；在聖餐中，基督真實地將祂的身體與血，同著餅與酒賜給領受的人。這是上帝主動施恩的方式。</p>
		<h2>律法與福音</h2>
		<p>正確地分辨律法與福音，是路德宗講道的核心。律法指出人的罪與無力，福音則宣告基督已經為我們成就一切。每一篇講道都應當同時包含這兩者。</p>
	</div>
</section>

<section class="section">
	<div class="wrap wrap--narrow">
		<div class="notice"><p>想更深入了解路德宗的信仰背景，可參閱總會網站關於《協同書》的信仰告白與路德會禮儀崇拜的說明。</p></div>
		<div class="btn-row">
			<a class="btn" href="${esc(church.celcUrl)}" target="_blank" rel="noopener">前往總會網站</a>
			<a class="btn btn--ghost" href="/sermons/">聽聽我們的講道</a>
		</div>
	</div>
</section>`;

	return layout({ title: '信仰告白', body, url: '/beliefs/' });
}

export function renderAbout() {
	const body = `${pageHero({
		title: '關於榮恩堂',
		kicker: '台南白河・仙草',
		text: '榮恩堂是中華福音道路德會在台南白河的教會，也是本會的經濟自立教會之一。',
	})}

<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__media">${CROSS}</div>
			<div class="split__body">
				<p class="kicker">關於我們</p>
				<h2>在鄉間，安靜地傳講不變的道</h2>
				<p>榮恩堂坐落於台南白河區仙草里，鄰近關子嶺山區。這是一間規模不大的鄉村教會，目前約有五十多位會友，聚會人口多以家庭為單位，其中兒少約二十位。</p>
				<p>我們不追求熱鬧的形式，也不以人數衡量教會。我們每個主日所做的，就是聚集在一起，領受上帝在聖道與聖禮中所賜的恩典，然後回到各自的家庭與工作中。</p>
				<p>若你住在白河、東山、後壁、關子嶺一帶，或是路過此地，都歡迎在主日早晨走進來坐坐。</p>
			</div>
		</div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap wrap--narrow prose">
		<h2>教會的來歷</h2>
		<p>1981 年 12 月 20 日，時年二十五歲的萬德樹牧師受總會差派，來到台南白河仙草里的榮恩堂牧會。當時教會約有八成五的信徒是榮民——教會前方的榮民之家住著約兩千六百位老兵，鄰近民宅也還有數百人。</p>
		<p>隨著歲月流逝，這群會友逐漸凋零，教會於是轉型。萬牧師從仙草國小開始兒童事工，又為社區的孩子開辦課輔班，與家長約定以品格教育為核心、主日也要來主日學。最早一批主日學的孩子，多半來自非信徒的家庭。</p>
		<p>後來教會發現，孩子長大離鄉之後常常就不再進教會。於是牧養的重點轉向一件更根本的事：讓每個人能自己讀聖經。教會推動「靈修本」，在崇拜之外設有靈修分享班，讓識字不多的弟兄姊妹也能一同聽、一同分享。如今五十多位會友中，有四十多人穩定寫靈修本。</p>
		<p>今日榮恩堂的福音策略仍以「家庭」為單位——從媽媽讀書會、查經班，到父母與孩子一同參與的聚會，都是為了讓一家人能一起留在教會裡。榮恩堂也是中華福音道路德會的經濟自立教會之一。</p>
		<p class="footnote">教會歷史部分整理自 2023 年 11 月《基督教今日報》對萬德樹牧師的專訪報導；細節與現況請由教會確認後調整。</p>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('牧養同工', '服事這間教會的人')}
		<div class="give-grid">
			<div class="give-card">
				<p class="kicker">主責牧師</p>
				<h3>${esc(church.overseer)}</h3>
				<p>總會宣教部主任，同時牧養本會轄下的多間教會與佈道所。</p>
			</div>
			<div class="give-card">
				<p class="kicker">聖禮牧師</p>
				<h3>${esc(church.pastor)}</h3>
				<p>負責本堂聖禮的施行與講道。</p>
				<p>${esc(church.pastorPhone)}</p>
			</div>
			<div class="give-card">
				<p class="kicker">駐堂教師</p>
				<h3>${esc(church.teacher)}</h3>
				<p>駐堂服事，負責日常的教導、講道、關懷探訪與各項聚會安排。</p>
				<p>${esc(church.mobile)}　LINE：${esc(church.teacherLine)}</p>
			</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="wrap wrap--narrow prose">
		<h2>我們與中華福音道路德會</h2>
		<p>1949 年國共戰爭後，第一個從中國大陸撤退、轉至台灣的信義／路德宗教會，在台灣落地生根。1952 年，美國密蘇里路德會海外宣教部差派施樂福宣教士來台創立基督教路德會。民國 54 年於嘉義縣成立財團法人，名稱為「財團法人台灣省嘉義縣基督教中華福音道路德會」，後於民國 75 年更名為「財團法人中華福音道路德會」。</p>
		<p>本會本於聖道與聖禮，致力於發展合乎聖經的教會拓殖與宣教事工，並積極從事文字宣教事工與神學教育。榮恩堂為本會的經濟自立教會之一。</p>
	</div>
</section>

<section class="section section--ink">
	<div class="wrap wrap--narrow" style="text-align:center">
		<p class="kicker">歡迎前來</p>
		<h2>主日早晨，我們在這裡</h2>
		<p>${esc(church.serviceTime)}　／　${esc(church.address)}</p>
		<div class="btn-row" style="justify-content:center"><a class="btn btn--light" href="/contact/">交通方式</a></div>
	</div>
</section>`;

	return layout({ title: '關於榮恩堂', body, url: '/about/' });
}

export function renderContact() {
	const body = `${pageHero({
		title: '聯絡與交通',
		kicker: '初次來訪',
		text: '不需要事先報名或通知，主日早晨直接前來即可。若想先聯繫，以下是我們的聯絡方式。',
	})}

<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__body">
				<p class="kicker">聯絡資訊</p>
				<h2>${esc(church.name)}</h2>
				${contactList()}
				<div class="btn-row">
					<a class="btn" href="${esc(church.mapUrl)}" target="_blank" rel="noopener">在 Google 地圖開啟</a>
					<a class="btn btn--ghost" href="${esc(church.facebook)}" target="_blank" rel="noopener">Facebook 私訊</a>
				</div>
			</div>
			<div>
				<div class="map-frame" style="--map-h:520px">
					${mapFallback}
					<iframe src="${esc(church.mapEmbed)}" title="${esc(church.name)}位置地圖" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('交通方式', '如何抵達白河仙草')}
		<div class="give-grid">
			<div class="give-card">
				<h3>自行開車</h3>
				<p>國道 1 號新營交流道下，接台 1 線轉 172 縣道往白河、關子嶺方向，於仙草里附近依指標抵達。國道 3 號則由白河交流道下，轉 172 縣道往東行。</p>
				<p>教會周邊可路邊停車。</p>
			</div>
			<div class="give-card">
				<h3>大眾運輸</h3>
				<p>搭乘台鐵至新營站，轉乘黃幹線公車至白河站，再轉乘往關子嶺方向的公車於仙草一帶下車。班次較少，建議事先查詢時刻。</p>
				<p>若交通不便，歡迎事先來電，我們可協助安排接送。</p>
			</div>
			<div class="give-card">
				<h3>初次來訪</h3>
				<p>建議在崇拜開始前 10 分鐘抵達。入口有同工接待，會協助你找到座位並取得崇拜手冊。</p>
				<p>穿著不拘，帶孩子同來也完全歡迎。</p>
			</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="wrap wrap--narrow">
		${sectionHead('想與我們聯繫', '寫封信或撥通電話', 'left')}
		<p>若你有信仰上的問題、需要代禱，或想安排洗禮、婚禮、告別禮拜等事宜，歡迎直接聯繫駐堂教師。</p>
		<div class="notice" style="margin-top:2rem"><p>若要在此加入聯絡表單，可安裝 Contact Form 7 或 WPForms 外掛，建立表單後把簡碼貼進本頁編輯器即可，表單會自動套用本主題樣式。</p></div>
		<div class="btn-row">
			<a class="btn" href="tel:${esc(tel(church.mobile))}">${esc(church.teacher)}　${esc(church.mobile)}</a>
			<a class="btn btn--ghost" href="mailto:${esc(church.email)}">${esc(church.email)}</a>
		</div>
	</div>
</section>`;

	return layout({ title: '聯絡與交通', body, url: '/contact/' });
}

export function renderGiving() {
	const body = `${pageHero({
		title: '奉獻',
		kicker: '出於感恩的回應',
		text: '奉獻不是換取上帝恩典的代價。我們奉獻，是因為已經白白領受了基督為我們成就的一切。',
	})}

<section class="section">
	<div class="wrap wrap--narrow prose">
		<h2>為什麼奉獻</h2>
		<p>我們得救不是靠自己的努力或功德，全然出於上帝白白的恩典。因此奉獻從來不是為了「賺取」什麼，而是感恩的自然回應——把上帝所賜的一部分，交回給祂的教會使用。</p>
		<p>奉獻用於教會日常運作、牧養與教導事工、社區關懷與探訪，以及本會的宣教與神學教育。初次來訪的朋友完全沒有任何奉獻的壓力，請安心參與崇拜。</p>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('奉獻方式', '你可以這樣奉獻')}
		<div class="give-grid">
			<div class="give-card">
				<h3>主日奉獻</h3>
				<p>主日崇拜中設有奉獻程序，可直接將奉獻投入奉獻袋或奉獻箱。若需要奉獻收據，請於信封上註明姓名與聯絡方式。</p>
			</div>
			<div class="give-card">
				<h3>銀行轉帳</h3>
				<p>請洽教會辦公室索取帳戶資料，或直接聯繫駐堂教師。</p>
				<p>${esc(church.teacher)}　${esc(church.mobile)}</p>
			</div>
			<div class="give-card">
				<h3>指定用途奉獻</h3>
				<p>如宣教、建堂、關懷事工等特定用途，請於奉獻時註明，教會會依指定用途專款專用。</p>
			</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="wrap wrap--narrow">
		<div class="notice"><p><strong>請教會同工注意：</strong>本頁尚未填入實際的帳戶資料。請於後台編輯本頁，在編輯器中補上銀行名稱、分行、戶名、帳號與奉獻收據開立方式，本區塊即會改為顯示你所填寫的內容。</p></div>
		<div class="notice" style="margin-top:1.5rem"><p>財團法人中華福音道路德會為立案之宗教財團法人，奉獻收據可依法作為綜合所得稅列舉扣除之憑證。相關細節請洽教會辦公室。</p></div>
	</div>
</section>`;

	return layout({ title: '奉獻', body, url: '/giving/' });
}

export function renderCelc() {
	const body = `${pageHero({
		title: '總會與各堂會',
		kicker: '中華福音道路德會',
		text: '榮恩堂是財團法人中華福音道路德會所屬的教會之一。以下為本會在台灣的各教會、佈道所與伙伴教會。',
	})}

<section class="section">
	<div class="wrap wrap--narrow prose">
		<h2>關於總會</h2>
		<p>中華福音道路德會本於聖道與聖禮，致力於發展合乎聖經的教會拓殖與宣教事工，並積極從事文字宣教事工與神學教育領域。所屬的協同出版社以文字事工回應上帝的聖道。</p>
		<p>總會行政部辦公室設於台北市中山區松江路 38 巷 15-5 號，辦公時間為週一至週五 9:00－18:00。</p>
		<p><a href="${esc(church.celcUrl)}" target="_blank" rel="noopener">${esc(church.celcUrl)}</a></p>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('教會一覽', '本會在台灣的教會與佈道所')}
		<div class="church-grid">${churches
			.map(
				(c) => `<div class="church-card${c.note.includes('本堂') ? ' church-card--home' : ''}">
			<p class="church-card__city">${esc(c.city)}</p>
			<h3 class="church-card__name">${esc(c.name)}</h3>
			<p class="church-card__note">${esc(c.note)}</p>
			<p class="church-card__address">${esc(c.address)}</p>
			<p class="church-card__phone">${esc(c.phone)}</p>
		</div>`
			)
			.join('')}</div>
		<div class="notice" style="margin-top:2.5rem"><p>各堂會的聚會時間與聯絡方式可能調整，最新資訊請以總會網站公告為準。</p></div>
		<div class="btn-row" style="justify-content:center"><a class="btn" href="https://celc.org.tw/lutheran-church/" target="_blank" rel="noopener">總會教會一覽頁</a></div>
	</div>
</section>`;

	return layout({ title: '總會與各堂會', body, url: '/celc/' });
}

export function renderNewsArchive() {
	const body = `${pageHero({
		title: '教會消息',
		kicker: '公告・活動・紀錄',
		text: '本堂的最新消息、聚會調整與活動紀錄。更即時的動態也會同步發佈於 Facebook 專頁。',
	})}
<div class="section">
	<div class="wrap">
		<div class="card-grid">${news.map((n) => card(n, { base: '/news/', label: '教會消息' })).join('')}</div>
	</div>
</div>`;

	return layout({ title: '教會消息', body, url: '/news/' });
}

export function renderSermonArchive() {
	const seasons = [...new Set(sermons.map((s) => s.season))];
	const body = `${pageHero({
		title: '講道存檔',
		kicker: '聖道',
		text: '歷次主日崇拜與節期崇拜的講道。講道按著律法與福音傳講：先指出人的罪，再宣告基督為我們成就的赦免。',
	})}
<div class="section">
	<div class="wrap">
		<p style="margin-bottom:2.5rem;display:flex;flex-wrap:wrap;gap:.6rem">${seasons
			.map((s) => `<a class="tag" href="/sermons/" style="text-decoration:none">${esc(s)}</a>`)
			.join('')}</p>
		<div class="card-grid">${sermons.map((s) => card(s, { base: '/sermons/', label: '講道' })).join('')}</div>
	</div>
</div>`;

	return layout({ title: '講道存檔', body, url: '/sermons/' });
}

export function renderSermon(item) {
	const body = `${pageHero({ title: item.title, kicker: '講道', text: item.scripture })}
<article class="section">
	<div class="wrap wrap--narrow">
		<dl class="sermon-meta">
			<div><dt>日期</dt><dd>${esc(formatDate(item.date))}</dd></div>
			<div><dt>講員</dt><dd>${esc(item.preacher)}</dd></div>
			<div><dt>經文</dt><dd>${esc(item.scripture)}</dd></div>
			<div><dt>節期</dt><dd>${esc(item.season)}</dd></div>
		</dl>
		<div class="prose">${item.content}</div>
		<nav class="btn-row" style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--line)">
			<a class="btn btn--ghost" href="/sermons/">回到講道存檔</a>
		</nav>
	</div>
</article>`;

	return layout({ title: item.title, body, url: '/sermons/' });
}

export function renderBulletinArchive() {
	const body = `${pageHero({
		title: '主日週報',
		kicker: '每週發佈',
		text: '每主日的崇拜程序、經課、消息與奉獻報告。本堂週報同步發佈於 Facebook 專頁。',
	})}
<div class="section">
	<div class="wrap wrap--narrow">
		<ul class="file-list">${bulletins
			.map((b) => {
				const side = b.fbUrl
					? `<a class="file-list__link" href="${esc(b.fbUrl)}" target="_blank" rel="noopener">Facebook</a>`
					: `<a class="file-list__link" href="/bulletins/${b.slug}/">閱讀</a>`;
				return `<li class="file-list__item">
			<div>
				<h2 class="file-list__title"><a href="/bulletins/${b.slug}/" style="text-decoration:none">${esc(b.title)}</a></h2>
				<p class="file-list__date" style="margin:.3rem 0 0">${esc(formatDate(b.date))}</p>
			</div>
			${side}
		</li>`;
			})
			.join('')}</ul>
		<div class="notice" style="margin-top:3rem"><p>同工發佈方式：週報可用兩種形式上傳——若有 PDF 檔，於「媒體 → 新增媒體檔案」上傳後複製檔案網址；若如目前作法是掃描成圖片發佈於 Facebook，則直接貼上該篇貼文的連結。兩者都填在「主日週報 → 新增週報」的欄位中。</p></div>
	</div>
</div>`;

	return layout({ title: '主日週報', body, url: '/bulletins/' });
}

export function renderBulletin(item) {
	// 只有「該週貼文」的 permalink 才顯示主按鈕；專頁首頁不能冒充週報連結。
	const action = item.fbUrl
		? `<a class="btn" href="${esc(item.fbUrl)}" target="_blank" rel="noopener">在 Facebook 查看本週週報</a>`
		: '';

	const body = `${pageHero({ title: item.title, kicker: '主日週報', text: formatDate(item.date) })}
<article class="section">
	<div class="wrap wrap--narrow">
		${action ? `<div class="btn-row" style="margin-top:0;margin-bottom:2.5rem">${action}</div>` : ''}
		<div class="prose">${item.content}</div>
		<nav class="btn-row" style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--line)">
			<a class="btn btn--ghost" href="/bulletins/">回到週報列表</a>
		</nav>
	</div>
</article>`;

	return layout({ title: item.title, body, url: '/bulletins/' });
}

export function renderEventArchive() {
	const body = `${pageHero({
		title: '教會活動',
		kicker: '一同參與',
		text: '節期崇拜、查經、社區關懷與各樣聚會。歡迎邀請家人朋友一同前來。',
	})}
<div class="section">
	<div class="wrap">
		<div class="card-grid">${events.map((e) => card(e, { base: '/events/', label: '教會活動' })).join('')}</div>
	</div>
</div>`;

	return layout({ title: '教會活動', body, url: '/events/' });
}

export function renderEvent(item) {
	const body = `${pageHero({ title: item.title, kicker: '教會活動' })}
<article class="section">
	<div class="wrap wrap--narrow">
		<dl class="sermon-meta">
			<div><dt>日期</dt><dd>${esc(formatDate(item.date))}</dd></div>
			<div><dt>時間</dt><dd>${esc(item.time)}</dd></div>
			<div><dt>地點</dt><dd>${esc(item.location)}</dd></div>
		</dl>
		<div class="prose">${item.content}</div>
		<div class="notice" style="margin-top:2.5rem"><p>想進一步了解或報名，歡迎聯繫 ${esc(church.teacher)}　${esc(church.mobile)}</p></div>
		<nav class="btn-row"><a class="btn btn--ghost" href="/events/">回到活動列表</a></nav>
	</div>
</article>`;

	return layout({ title: item.title, body, url: '/events/' });
}

export function renderPost(item) {
	const body = `${pageHero({ title: item.title, kicker: formatDate(item.date) })}
<div class="section">
	<div class="wrap wrap--narrow">
		<div class="prose">${item.content}</div>
		<nav class="btn-row" style="margin-top:3rem;padding-top:2rem;border-top:1px solid var(--line)">
			<a class="btn btn--ghost" href="/news/">回到教會消息</a>
		</nav>
	</div>
</div>`;

	return layout({ title: item.title, body, url: '/news/' });
}

export function render404() {
	const body = `${pageHero({ title: '找不到這個頁面', kicker: '404', text: '此頁面可能已移除或網址有誤。以下連結或許能帶你到想去的地方。', breadcrumb: false })}
<div class="section">
	<div class="wrap wrap--narrow" style="text-align:center">
		<div class="btn-row" style="justify-content:center">
			<a class="btn" href="/">回到首頁</a>
			<a class="btn btn--ghost" href="/sermons/">講道存檔</a>
			<a class="btn btn--ghost" href="/contact/">聯絡我們</a>
		</div>
	</div>
</div>`;

	return layout({ title: '找不到這個頁面', body, url: '/' });
}
