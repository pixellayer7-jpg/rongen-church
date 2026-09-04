/**
 * English preview renderer (portfolio bilingual demo under /en/).
 * Shares visual system with the Chinese preview via the same theme CSS/JS.
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
	ui,
} from './content-en.mjs';
import { esc } from './render.mjs';
import { OG_IMAGE, OG_IMAGE_ALT } from './og-meta.mjs';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CROSS =
	'<svg class="cross-mark" viewBox="0 0 24 36" aria-hidden="true" focusable="false"><path d="M10.6 0h2.8v9.4H24v2.8H13.4V36h-2.8V12.2H0V9.4h10.6z"/></svg>';
const tel = (value) => value.replace(/[^0-9+]/g, '');

function formatDate(iso, withWeekday = true) {
	if (!iso) return '';
	const d = new Date(`${iso}T00:00:00`);
	if (Number.isNaN(d.getTime())) return iso;
	const text = d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	return withWeekday ? `${text} (${WEEKDAYS[d.getDay()]})` : text;
}

function zhTwin(enUrl) {
	if (enUrl === '/en/' || enUrl === '/en') return '/';
	return enUrl.replace(/^\/en/, '') || '/';
}

function langSwitcher(currentUrl) {
	const zh = zhTwin(currentUrl);
	return `<p class="lang-switch" role="navigation" aria-label="Language">
		<a href="${esc(zh)}">${esc(ui.langZh)}</a>
		<span aria-hidden="true">·</span>
		<span class="lang-switch__current">${esc(ui.langEn)}</span>
	</p>`;
}

const mapFallback = `<div class="map-fallback">
	<p class="map-fallback__label">${esc(ui.mapLabel)}</p>
	<p class="map-fallback__address">${esc(church.address)}</p>
	<a class="map-fallback__link" href="${esc(church.mapUrl)}" target="_blank" rel="noopener">${esc(ui.mapOpen)}</a>
</div>`;

function header(currentUrl) {
	const items = nav
		.map((item) => {
			const active = item.url === currentUrl ? ' class="current-menu-item"' : '';
			return `<li${active}><a href="${item.url}">${esc(item.label)}</a></li>`;
		})
		.join('');

	return `<a class="skip-link" href="#content">${esc(ui.skip)}</a>
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
				<a href="${esc(church.celcUrl)}" target="_blank" rel="noopener">${esc(ui.synod)}</a>
				${langSwitcher(currentUrl)}
			</p>
		</div>
	</div>
	<div class="wrap header-main">
		<a class="brand" href="/en/" rel="home">
			<span class="brand__mark">${CROSS}</span>
			<span class="brand__text">
				<span class="brand__name">${esc(church.name)}</span>
				<span class="brand__sub">${esc(church.latin)}</span>
			</span>
		</a>
		<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-primary-en">
			<span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
			<span>${esc(ui.menu)}</span>
		</button>
		<nav class="nav-primary" id="nav-primary-en" aria-label="${esc(ui.navLabel)}"><ul>${items}</ul></nav>
	</div>
</header>
<main id="content" class="site-content">`;
}

function footer() {
	const links = footerNav
		.map((item) => `<li><a href="${item.url}">${esc(item.label)}</a></li>`)
		.join('');

	return `</main>
<footer class="site-footer">
	<div class="footer-visit">
		<div class="footer-visit__body">
			<p class="kicker">${esc(ui.welcome)}</p>
			<h2>${esc(ui.footerVisitTitle)}</h2>
			<p>${esc(ui.footerVisitText)}</p>
			<dl class="info-list">
				<div class="info-list__row"><dt>${esc(ui.serviceLabel)}</dt><dd>${esc(church.serviceTime)}</dd></div>
				<div class="info-list__row"><dt>${esc(ui.addressLabel)}</dt><dd>${esc(church.address)}</dd></div>
				<div class="info-list__row"><dt>${esc(ui.contactLabel)}</dt><dd>${esc(church.teacher)} · ${esc(church.mobile)}</dd></div>
			</dl>
			<div class="btn-row">
				<a class="btn btn--light" href="${esc(church.mapUrl)}" target="_blank" rel="noopener">${esc(ui.openMap)}</a>
			</div>
		</div>
		<div class="footer-visit__map">
			${mapFallback}
			<iframe src="${esc(church.mapEmbed)}" title="${esc(church.name)} map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
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
			<h3>${esc(ui.staff)}</h3>
			<p>${esc(ui.sacramentalPastor)} · ${esc(church.pastor)}</p>
			<p>${esc(ui.residentTeacher)} · ${esc(church.teacher)}</p>
			<p>${esc(church.mobile)}</p>
		</div>
		<div class="footer-col">
			<h3>${esc(ui.siteNav)}</h3>
			<ul>${links}</ul>
		</div>
		<div class="footer-col">
			<h3>${esc(ui.related)}</h3>
			<ul>
				<li><a href="${esc(church.celcUrl)}" target="_blank" rel="noopener">${esc(ui.synodFull)}</a></li>
				<li><a href="https://celc.org.tw/lutheran-church/" target="_blank" rel="noopener">${esc(ui.allChurches)}</a></li>
				<li><a href="${esc(church.facebook)}" target="_blank" rel="noopener">${esc(ui.fbPage)}</a></li>
			</ul>
		</div>
	</div>
	<div class="wrap footer-bottom">
		<p>&copy; ${new Date().getFullYear()} ${esc(church.name)} · ${esc(ui.copyright)}</p>
		<p>${esc(ui.underSynod)}</p>
		<p class="footer-portfolio-note">${esc(ui.portfolioNote)}</p>
	</div>
</footer>
<script src="/assets/js/main.js"></script>
</body>
</html>`;
}

function layout({ title, body, url = '/en/' }) {
	const pageTitle = `${title} — ${church.name}`
	const description =
		'Portfolio preview of the Rongen Lutheran Church custom WordPress theme — liturgical design, zero-PHP local preview, bilingual GitHub Pages demo (zh/en).'
	const canonical = `https://pixellayer7-jpg.github.io/rongen-church${url}`
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:locale" content="en_US">
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
.footer-portfolio-note{opacity:.7;font-size:.85rem;margin-top:.35rem}
.print-hint{margin:0;padding:.55rem 1rem;background:#f2ece1;border-bottom:1px solid rgba(18,22,29,.12);font-size:.88rem;text-align:center;color:#59616b}
</style>
</head>
<body class="${url === '/en/' ? 'is-front ' : ''}no-sidebar">
${header(url)}
<p class="print-hint no-print">Print for review: press <kbd>Ctrl</kbd>+<kbd>P</kbd> (Mac: ⌘P). Menus, maps, and videos are omitted; contact details remain.</p>
${body}
${footer()}`;
}

function sectionHead(kicker, title, align = 'center') {
	return `<header class="section-head section-head--${align}">${
		kicker ? `<p class="kicker">${esc(kicker)}</p>` : ''
	}<h2 class="section-head__title">${title}</h2><span class="rule" aria-hidden="true"></span></header>`;
}

function pageHero({ title, kicker = '', text = '' }) {
	return `<section class="page-hero">
	<div class="wrap page-hero__inner">
		<p class="breadcrumb"><a href="/en/">${esc(church.short)}</a> <span aria-hidden="true">/</span> <span>${esc(title)}</span></p>
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
		['Address', church.address],
		['Phone', church.phone],
		['Resident teacher', `${church.teacher} · ${church.mobile}`],
		['Sacramental pastor', `${church.pastor} · ${church.pastorPhone}`],
		['Email', church.email],
		['Divine Service', church.serviceTime],
	];
	return `<dl class="info-list">${rows
		.map(([k, v]) => `<div class="info-list__row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
		.join('')}</dl>`;
}

export function renderHomeEn() {
	const entries = [
		[
			'How we worship',
			'Liturgy is not a performance—God serves us through Word and Sacrament. Learn the shape of the Divine Service.',
			'/en/worship/',
			'Worship',
		],
		[
			'What we believe',
			'We confess the Book of Concord. Scripture alone is the rule; we preach Law and Gospel.',
			'/en/beliefs/',
			'Beliefs',
		],
		[
			'Find us',
			'The parish is in Xiancao, Baihe (Tainan). Directions, parking, and contact details are here.',
			'/en/contact/',
			'Visit',
		],
	];

	const body = `<section class="hero">
	<div class="wrap hero__inner">
		<p class="kicker">${esc(church.heroKicker)}</p>
		<h1 class="hero__title">${church.heroTitle}</h1>
		<p class="hero__text">${esc(church.heroText)}</p>
		<dl class="hero__times">
			<div><dt>Divine Service</dt><dd>${esc(church.serviceTime)}</dd></div>
			<div><dt>Location</dt><dd>${esc(church.tagline)}</dd></div>
			<div><dt>Resident teacher</dt><dd>${esc(church.teacher)}</dd></div>
		</dl>
		<div class="btn-row">
			<a class="btn" href="/en/worship/">Worship</a>
			<a class="btn btn--light" href="/en/contact/">First visit</a>
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
		<p class="verse__text">“${esc(church.verseText)}”</p>
		<p class="verse__ref">${esc(church.verseRef)}</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__media">${CROSS}</div>
			<div class="split__body">
				<p class="kicker">Liturgical · reverent · Word-centered</p>
				<h2>Worship is the heart of this parish</h2>
				<p>Our service is ordered, not improvised—from confession and absolution through readings, sermon, and blessing. The pattern says the same thing throughout: God is here, and He places His gifts into your hands.</p>
				<ul class="split__list">
					<li>Preaching holds Law and Gospel together.</li>
					<li>Baptism and the Lord’s Supper are means of grace, not mere symbols.</li>
					<li>The congregation sings hymns and confesses the faith together.</li>
					<li>Dress is informal or formal—both are welcome.</li>
				</ul>
				<div class="btn-row"><a class="btn btn--ghost" href="/en/worship/">See the order of service</a></div>
			</div>
		</div>
	</div>
</section>

<section class="section section--ink section--watermark">
	<span class="watermark" aria-hidden="true">sola gratia</span>
	<div class="wrap">
		${sectionHead('Lutheran confession', 'What we believe, teach, and confess')}
		${pillarsGrid()}
		<div class="btn-row" style="justify-content:center"><a class="btn btn--light" href="/en/beliefs/">Full statement of faith</a></div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('Weekly rhythm', 'Gathering through the week')}
		${scheduleTable(schedule)}
	</div>
</section>

<section class="section">
	<div class="wrap">
		${sectionHead('News', 'Notices & events')}
		<div class="card-grid">
			${news.map((n) => card(n, { base: '/en/news/', label: 'News' })).join('')}
			${card(events[0], { base: '/en/events/', label: 'Event' })}
		</div>
	</div>
</section>

<section class="section section--paper">
	<div class="wrap">
		${sectionHead('The Word', 'Recent sermon')}
		<div class="card-grid">${sermons.map((s) => card(s, { base: '/en/sermons/', label: 'Sermon' })).join('')}</div>
		<div class="btn-row" style="justify-content:center">
			<a class="btn btn--ghost" href="/en/sermons/">Sermon archive</a>
			<a class="btn btn--ghost" href="/en/bulletins/">Bulletins</a>
		</div>
	</div>
</section>`;

	return layout({ title: ui.homeTitle, body, url: '/en/' });
}

export function renderWorshipEn() {
	const body = `${pageHero({
		title: 'Worship & gatherings',
		kicker: 'Liturgical · reverent · Word-centered',
		text: 'Worship is the heart of Rongen. God’s love is clearest when He delivers His gifts through Word and Sacrament.',
	})}
<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__body">
				<p class="kicker">Divine Service</p>
				<h2>${esc(church.serviceTime)}</h2>
				<p>We use a liturgical order—each part is planned. The tone is reverent because the matters are eternal.</p>
				<p>You need not prepare ahead. A worship folder lists the service and hymns. Sitting and watching is always fine.</p>
				<div class="btn-row">
					<a class="btn" href="/en/contact/">Directions</a>
					<a class="btn btn--ghost" href="/en/bulletins/">This week’s bulletin</a>
				</div>
			</div>
			<div class="split__media">${CROSS}</div>
		</div>
	</div>
</section>
<section class="section section--paper">
	<div class="wrap">
		${sectionHead('Order of service', 'Flow and meaning', 'left')}
		<div class="schedule">${liturgy
			.map(
				([name, note], i) => `<div class="schedule__row">
			<div class="schedule__name">${esc(name)}</div>
			<div class="schedule__when">Part ${i + 1}</div>
			<div class="schedule__note">${esc(note)}</div>
		</div>`
			)
			.join('')}</div>
	</div>
</section>
<section class="section">
	<div class="wrap">${sectionHead('Weekly gatherings', 'Beyond Sunday morning')}${scheduleTable(schedule)}</div>
</section>
<section class="section section--ink section--watermark">
	<span class="watermark" aria-hidden="true">gottesdienst</span>
	<div class="wrap wrap--narrow">
		${sectionHead('FAQ', 'Questions first-time visitors ask', 'left')}
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
	return layout({ title: 'Worship', body, url: '/en/worship/' });
}

export function renderBeliefsEn() {
	const body = `${pageHero({
		title: 'Statement of faith',
		kicker: 'Believe · teach · confess',
		text: 'Rongen belongs to China Evangelical Lutheran Church and confesses the Book of Concord.',
	})}
<section class="section"><div class="wrap">${sectionHead('The four “alones”', 'Foundations')}${pillarsGrid()}</div></section>
<section class="section section--paper">
	<div class="wrap wrap--narrow prose">
		<h2>What “Lutheran” means here</h2>
		<p>After Luther’s Reformation (1517) through the Book of Concord (1580), Lutheran churches confess that same heritage—not nostalgia for its own sake, but fidelity to Scripture and the confessions, including liturgical practice.</p>
		<h2>Scripture</h2>
		<p>The Old and New Testaments are the inspired, inerrant Word of God and the only rule of faith and life.</p>
		<h2>Confessions</h2>
		<p>The Book of Concord (1580) includes the Unaltered Augsburg Confession and Luther’s Small and Large Catechisms—faithful expositions of Scripture.</p>
		<h2>Sacraments</h2>
		<p>Baptism and the Lord’s Supper are more than symbols. In Baptism God places His name on us; in the Supper Christ truly gives His body and blood with the bread and wine.</p>
		<h2>Law and Gospel</h2>
		<p>Distinguishing Law and Gospel is central to Lutheran preaching: the Law exposes sin; the Gospel announces what Christ has done.</p>
	</div>
</section>
<section class="section">
	<div class="wrap wrap--narrow">
		<div class="btn-row">
			<a class="btn" href="${esc(church.celcUrl)}" target="_blank" rel="noopener">Synod website</a>
			<a class="btn btn--ghost" href="/en/sermons/">Listen to sermons</a>
		</div>
	</div>
</section>`;
	return layout({ title: 'Beliefs', body, url: '/en/beliefs/' });
}

export function renderAboutEn() {
	const body = `${pageHero({
		title: 'About Rongen',
		kicker: 'Baihe · Xiancao, Tainan',
		text: 'Rongen is a self-supporting congregation of China Evangelical Lutheran Church in Baihe, Tainan.',
	})}
<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__media">${CROSS}</div>
			<div class="split__body">
				<p class="kicker">Who we are</p>
				<h2>Quietly preaching an unchanging Word in a rural town</h2>
				<p>Rongen sits in Xiancao Village near Guanziling. It is a small parish—about fifty members, many families, roughly twenty children and youth.</p>
				<p>We do not measure the church by noise or attendance charts. Each Sunday we gather to receive grace in Word and Sacrament, then return to home and work.</p>
				<p>If you live in Baihe, Dongshan, Houbi, or Guanziling—or are simply passing through—you are welcome on Sunday morning.</p>
			</div>
		</div>
	</div>
</section>
<section class="section section--paper">
	<div class="wrap">
		${sectionHead('Pastoral staff', 'Those who serve this parish')}
		<div class="give-grid">
			<div class="give-card"><p class="kicker">Overseeing pastor</p><h3>${esc(church.overseer)}</h3><p>Synod mission leadership; shepherds multiple congregations and stations.</p></div>
			<div class="give-card"><p class="kicker">Sacramental pastor</p><h3>${esc(church.pastor)}</h3><p>Administers the Sacraments and preaches.</p><p>${esc(church.pastorPhone)}</p></div>
			<div class="give-card"><p class="kicker">Resident teacher</p><h3>${esc(church.teacher)}</h3><p>Day-to-day teaching, preaching, visits, and scheduling.</p><p>${esc(church.mobile)} · LINE: ${esc(church.teacherLine)}</p></div>
		</div>
	</div>
</section>
<section class="section section--ink">
	<div class="wrap wrap--narrow" style="text-align:center">
		<p class="kicker">${esc(ui.welcome)}</p>
		<h2>Sunday morning, we are here</h2>
		<p>${esc(church.serviceTime)} · ${esc(church.address)}</p>
		<div class="btn-row" style="justify-content:center"><a class="btn btn--light" href="/en/contact/">Directions</a></div>
	</div>
</section>`;
	return layout({ title: 'About', body, url: '/en/about/' });
}

export function renderContactEn() {
	const body = `${pageHero({
		title: 'Visit & contact',
		kicker: 'First visit',
		text: 'No registration required—come on Sunday morning. Prefer to call first? Contacts are below.',
	})}
<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__body">
				<p class="kicker">Contact</p>
				<h2>${esc(church.name)}</h2>
				${contactList()}
				<div class="btn-row">
					<a class="btn" href="${esc(church.mapUrl)}" target="_blank" rel="noopener">${esc(ui.openMap)}</a>
					<a class="btn btn--ghost" href="${esc(church.facebook)}" target="_blank" rel="noopener">Facebook message</a>
				</div>
			</div>
			<div>
				<div class="map-frame" style="--map-h:520px">
					${mapFallback}
					<iframe src="${esc(church.mapEmbed)}" title="${esc(church.name)} map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>
</section>
<section class="section section--paper">
	<div class="wrap">
		${sectionHead('Getting here', 'Baihe · Xiancao')}
		<div class="give-grid">
			<div class="give-card"><h3>By car</h3><p>From Freeway 1 (Xinying interchange) toward Baihe / Guanziling on County Road 172. Street parking nearby.</p></div>
			<div class="give-card"><h3>Transit</h3><p>TRA to Xinying, bus to Baihe, then toward Guanziling—service is limited; call ahead if you need a ride.</p></div>
			<div class="give-card"><h3>First visit</h3><p>Arrive ~10 minutes early. Greeters help with seating and a worship folder. Children welcome; dress is informal.</p></div>
		</div>
	</div>
</section>`;
	return layout({ title: 'Contact', body, url: '/en/contact/' });
}

export function renderGivingEn() {
	const body = `${pageHero({
		title: 'Giving',
		kicker: 'A thankful response',
		text: 'Giving is not payment for grace. We give because Christ has already given everything for us.',
	})}
<section class="section">
	<div class="wrap wrap--narrow prose">
		<p>Offerings support parish life, teaching, care visits, and synod mission/education. Visitors should feel no pressure to give.</p>
		<p>For bank details or designated gifts, contact the resident teacher: ${esc(church.teacher)} · ${esc(church.mobile)}.</p>
	</div>
</section>`;
	return layout({ title: 'Giving', body, url: '/en/giving/' });
}

export function renderCelcEn() {
	const body = `${pageHero({
		title: 'CELC congregations',
		kicker: 'China Evangelical Lutheran Church',
		text: 'Rongen is one self-supporting congregation among the synod’s churches and mission stations.',
	})}
<section class="section">
	<div class="wrap">
		<div class="schedule">${churches
			.map(
				(c) => `<div class="schedule__row">
			<div class="schedule__name">${esc(c.name)}<br><span style="opacity:.7;font-weight:400">${esc(c.city)}</span></div>
			<div class="schedule__when">${esc(c.phone)}</div>
			<div class="schedule__note">${esc(c.address)} · ${esc(c.note)}</div>
		</div>`
			)
			.join('')}</div>
	</div>
</section>`;
	return layout({ title: 'CELC', body, url: '/en/celc/' });
}

function archivePage({ title, kicker, text, items, base, label }) {
	const body = `${pageHero({ title, kicker, text })}
<section class="section"><div class="wrap"><div class="card-grid">${items
		.map((item) => card(item, { base, label }))
		.join('')}</div></div></section>`;
	return layout({ title, body, url: base });
}

export function renderNewsArchiveEn() {
	return archivePage({
		title: 'News',
		kicker: 'Parish notices',
		text: 'English preview shows a sample notice.',
		items: news,
		base: '/en/news/',
		label: 'News',
	});
}

export function renderSermonArchiveEn() {
	return archivePage({
		title: 'Sermons',
		kicker: 'The Word preached',
		text: 'English preview includes a sample sermon card.',
		items: sermons,
		base: '/en/sermons/',
		label: 'Sermon',
	});
}

export function renderBulletinArchiveEn() {
	return archivePage({
		title: 'Bulletins',
		kicker: 'Sunday materials',
		text: 'Full bulletins are published as images on Facebook; this preview links a sample week.',
		items: bulletins,
		base: '/en/bulletins/',
		label: 'Bulletin',
	});
}

export function renderEventArchiveEn() {
	return archivePage({
		title: 'Events',
		kicker: 'Parish & synod',
		text: 'Sample upcoming event for the English preview.',
		items: events,
		base: '/en/events/',
		label: 'Event',
	});
}

function singlePage(item, { label, base, extra = '' }) {
	const body = `${pageHero({ title: item.title, kicker: label, text: formatDate(item.date) })}
<section class="section"><div class="wrap wrap--narrow prose">
	${item.scripture ? `<p><strong>${esc(item.scripture)}</strong>${item.preacher ? ` · ${esc(item.preacher)}` : ''}</p>` : ''}
	${item.time ? `<p>${esc(item.time)}${item.location ? ` · ${esc(item.location)}` : ''}</p>` : ''}
	${extra}
	${item.content || ''}
	<p><a href="${base}">← Back</a></p>
</div></section>`;
	return layout({ title: item.title, body, url: `${base}${item.slug}/` });
}

export function renderSermonEn(item) {
	return singlePage(item, { label: 'Sermon', base: '/en/sermons/' });
}

export function renderBulletinEn(item) {
	const btn = item.fbUrl
		? `<p><a class="btn" href="${esc(item.fbUrl)}" target="_blank" rel="noopener">Open this week’s Facebook post →</a></p>`
		: '';
	return singlePage(item, { label: 'Bulletin', base: '/en/bulletins/', extra: btn });
}

export function renderEventEn(item) {
	return singlePage(item, { label: 'Event', base: '/en/events/' });
}

export function renderPostEn(item) {
	return singlePage(item, { label: 'News', base: '/en/news/' });
}

export function render404En() {
	const body = `${pageHero({ title: 'Page not found', text: 'This English preview route does not exist.' })}
<section class="section"><div class="wrap" style="text-align:center"><a class="btn" href="/en/">Back to English home</a></div></section>`;
	return layout({ title: '404', body, url: '/en/' });
}
