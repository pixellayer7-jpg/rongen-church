/**
 * 預覽用資料。
 *
 * 這份資料對應 WordPress 端的兩個來源：
 *   - church：inc/customizer.php 的 rongen_defaults()
 *   - schedule / pillars / churches：inc/template-tags.php 的同名函式
 *   - posts：inc/demo-content.php 的 rongen_sample_content()
 * 修改主題預設值時，請一併更新此檔，預覽才會與實際網站一致。
 */

export const church = {
	name: '中華福音道路德會 榮恩堂',
	short: '榮恩堂',
	latin: 'China Evangelical Lutheran Church',
	tagline: '台南白河・仙草',
	// 地址與電話依 2026-07-26 週報頁尾所載（郵遞區號為六碼新制）。
	address: '732010 台南市白河區仙草里仙草 21 之 4 號',
	phone: '06-685-7444',
	mobile: '0986-375-031',
	email: 'service@celc.org.tw',
	// 三個職分並列：主責牧師依總會網站，聖禮牧師與駐堂教師依本堂週報頁尾。
	overseer: '魯思豪 牧師',
	pastor: '白霈德 牧師',
	pastorPhone: '0975-959-112',
	teacher: '巫奇真 教師',
	teacherLine: 'marigold1301',
	serviceTime: '每主日 上午 10:00－11:00',
	facebook:
		'https://www.facebook.com/people/%E4%B8%AD%E8%8F%AF%E7%A6%8F%E9%9F%B3%E9%81%93-%E8%B7%AF%E5%BE%B7%E6%9C%83-%E6%A6%AE%E6%81%A9%E5%A0%82/61569452264190/',
	celcUrl: 'https://celc.org.tw/',
	mapUrl: 'https://maps.google.com/?q=23.3453317,120.474678',
	mapEmbed: 'https://maps.google.com/maps?q=23.3453317,120.474678&z=16&output=embed',
	heroKicker: '以聖道與聖禮為中心',
	heroTitle: '主的道<br>永遠常存',
	heroText:
		'榮恩堂是中華福音道路德會在台南白河的教會。我們照著歷代教會所傳承的禮儀崇拜聚集，聆聽上帝的話，領受基督的身體與血。無論你是初次來訪或久未回到教會，這裡都為你留了位子。',
	verseText:
		'凡有血氣的，盡都如草；他的美榮都像草上的花。草必枯乾，花必凋謝；惟有主的道永遠常存。',
	verseRef: '彼得前書 1:24-25',
};

export const nav = [
	{ label: '關於榮恩堂', url: '/about/' },
	{ label: '崇拜與聚會', url: '/worship/' },
	{ label: '信仰告白', url: '/beliefs/' },
	{ label: '講道', url: '/sermons/' },
	{ label: '主日週報', url: '/bulletins/' },
	{ label: '教會消息', url: '/news/' },
	{ label: '聯絡與交通', url: '/contact/' },
];

export const footerNav = [
	{ label: '崇拜與聚會', url: '/worship/' },
	{ label: '講道存檔', url: '/sermons/' },
	{ label: '主日週報', url: '/bulletins/' },
	{ label: '教會活動', url: '/events/' },
	{ label: '奉獻', url: '/giving/' },
	{ label: '總會與各堂會', url: '/celc/' },
];

export const schedule = [
	{
		name: '主日崇拜',
		when: church.serviceTime,
		note: '禮儀崇拜程序，內含認罪與赦罪、入壇詞、三段讀經、證道與祝福；設有聖餐的主日另發程序本。',
	},
	{
		name: '主日學／兒童時間',
		when: '主日崇拜後',
		note: '以小要理問答與聖經故事教導孩子，歡迎家長帶孩子一同前來。',
	},
	{
		name: '查經與禱告會',
		when: '平日晚間（依當期公告）',
		note: '按書卷逐段查考聖經，並為教會、社區與宣教事工禱告。',
	},
	{
		name: '關懷探訪',
		when: '平日，事先聯繫',
		note: '駐堂教師與同工前往社區、家庭與長者關懷探訪，歡迎預約。',
	},
];

export const pillars = [
	{
		title: '惟獨聖經',
		latin: 'Sola Scriptura',
		text: '新舊約聖經是上帝所默示的話，是教會信仰與生活惟一的準則。凡教導必須以聖經為根據。',
	},
	{
		title: '惟獨恩典',
		latin: 'Sola Gratia',
		text: '人得救不憑自己的努力或功德，全然出於上帝白白賜下的恩典。',
	},
	{
		title: '惟獨信心',
		latin: 'Sola Fide',
		text: '我們因信基督而被稱為義。這信心也是聖靈藉著聖道與聖禮在人心中所做的工。',
	},
	{
		title: '惟獨基督',
		latin: 'Solus Christus',
		text: '耶穌基督是上帝與人之間惟一的中保，祂的十字架與復活是我們一切安慰的根基。',
	},
];

/**
 * 主日崇拜次序。
 *
 * 此次序抄錄自本堂 2026 年 7 月 26 日（聖靈降臨後第九主日，030 期）的實際週報，
 * 每一項後方標註週報上所列的經文出處。設有聖餐的主日另發「程序本」，
 * 會在此次序中加入聖餐禮，故各項目可能略有調整。
 */
export const liturgy = [
	['聖詩', '以聖詩開始崇拜。本堂使用《頌主聖詩》，週報上會註明詩號。'],
	['宣召', '奉父、子、聖靈的名宣告崇拜開始（如馬太福音 28:19）。'],
	['認罪與赦罪', '會眾一同承認自己的罪，並聽見奉基督的名所宣告的赦免（如約翰壹書 1:8-9、腓立比書 1:6）。這是整場崇拜的起點：我們一無所有地來。'],
	['入壇詞', '以詩篇經文進入聖所，會眾與主領者應答誦讀（如詩篇 105 篇）。'],
	['求主憐憫文', '同聲呼求「主啊，憐憫我」（如馬可福音 10:47）。'],
	['榮歸主頌', '將榮耀歸給在高天的上帝（如路加福音 2:14、約翰福音 1:29）。'],
	['問安', '主領者與會眾互相問安（如提摩太後書 4:22）。'],
	['本日共禱文', '按教會年的節期，為當週的主題與需要一同禱告。'],
	['宣讀聖經：舊約', '誦讀當日的舊約經課。'],
	['回應經文', '以經文回應所聽見的話。'],
	['宣讀聖經：書信', '誦讀當日的書信經課。'],
	['備福音詞', '在福音書誦讀之前預備人心（如約翰福音 6:68）。'],
	['宣讀聖經：聖福音', '誦讀當日的福音書經課。這是基督親自對我們說話。'],
	['聖詩', '以聖詩回應聖道。'],
	['證道', '按律法與福音傳講當日經文：律法指出我們的罪，福音宣告基督的赦免。'],
	['奉獻', '獻上財物，作為感恩的回應。'],
	['聖詩', '再以聖詩頌讚。'],
	['主禱文', '同誦主耶穌所教導的禱文。'],
	['祝福', '奉上帝的名祝福會眾，差遣我們回到日常生活中。'],
	['報告', '報告教會消息與代禱事項。'],
];

export const faq = [
	['我需要穿正式服裝嗎？', '不需要。有人西裝領帶，也有人輕便前來，兩者我們都歡迎。莊重的是崇拜本身，而不是衣著。'],
	['我不是基督徒，可以參加嗎？', '非常歡迎。你可以只是坐著聆聽與觀看。崇拜結束後若有問題，歡迎找駐堂教師聊聊。'],
	['可以領聖餐嗎？', '路德會實行「同信聖餐」。若你尚未在路德宗教會受洗或接受過相關教導，請先與牧者談談；在此之前你仍可上前接受祝福。'],
	['我可以帶孩子來嗎？', '當然可以。孩子在崇拜中發出聲音是很自然的事，不必緊張。崇拜後另有兒童主日學時間。'],
	['需要奉獻嗎？', '奉獻是出於感恩的自願回應，來訪者完全沒有任何壓力。'],
];

export const churches = [
	{ name: '松山教會', city: '台北', address: '台北市信義區松德路 25 巷 58 號 B1', phone: '0921-262-106', note: '佈道所' },
	{ name: '聖道教會', city: '新竹', address: '新竹市東區東大路一段 132 號 12 樓', phone: '03-533-1215', note: '佈道所・附設越南語團契' },
	{ name: '聖三一堂', city: '南投', address: '南投縣南投市虎山路 104 號', phone: '0972-104-524', note: '佈道所' },
	{ name: '救恩堂', city: '嘉義', address: '嘉義市西區建成街 19 號', phone: '05-285-2382', note: '經濟自立教會' },
	{ name: '靈恩堂', city: '斗六', address: '雲林縣斗六市城頂街 98 號', phone: '05-532-1370', note: '經濟自立教會' },
	{ name: '榮恩堂', city: '台南白河', address: '台南市白河區仙草里仙草 21 之 4 號', phone: '06-685-7444', note: '經濟自立教會・本堂' },
	{ name: '永生堂', city: '台北', address: '台北市中正區潮州街 16 號', phone: '02-2351-4093', note: '伙伴教會' },
	{ name: '板橋和平堂', city: '新北', address: '新北市板橋區民權路 202 巷 17 弄 70 號 2 樓', phone: '02-2968-8148', note: '伙伴教會' },
	{ name: '頌恩堂', city: '台南', address: '台南市北區實踐街 39 巷 57 號', phone: '06-251-6108', note: '伙伴教會' },
	{ name: '施恩堂／南部神學教育中心', city: '嘉義', address: '嘉義市東區延平街 140 號', phone: '0972-104-524', note: '籌備中' },
	{ name: '北部神學教育中心／宣道廳', city: '台北', address: '台北市中山區松江路 38 巷 15-5 號', phone: '02-2775-4145', note: '總會所在地' },
];

export const sermons = [
	{
		// 講題、經文與講員抄錄自 2026-07-26（030 期）週報，為實際的證道資料。
		slug: 'matthew-13',
		title: '使你歡喜丟棄一切的寶貝',
		date: '2026-07-26',
		preacher: '巫奇真 教師',
		scripture: '馬太福音 13:44-46',
		season: '聖靈降臨期',
		verified: true,
		excerpt:
			'天國好像寶貝藏在地裡，人遇見了就變賣一切買這塊地。不是勉強割捨，而是因為看見了更寶貴的，就歡歡喜喜地放手。',
		content: `<p>耶穌用兩個很短的比喻講天國：一個人在地裡發現寶貝，就去變賣他一切所有的，買了那塊地；一個買賣人尋見一顆重價的珠子，也去變賣他一切所有的，買了這顆珠子。</p>
<p>這兩個人都「變賣一切」，但經文特別提到的是他的心情——「歡喜」。他不是咬著牙犧牲，而是因為看見了更寶貴的東西，於是放手變得理所當然。</p>
<h2>我們常把福音當成損失</h2>
<p>我們談信仰時，常常在算自己要付出什麼、要放棄什麼。若心裡是這樣算的，信仰就成了一種負擔，而不是喜樂。</p>
<h2>真正的順序是：先看見寶貝</h2>
<p>比喻裡的順序很清楚：先遇見寶貝，然後才變賣一切。不是先努力捨棄，才配得到基督；而是因為基督已經是你的，其餘的才顯得可以放下。</p>
<p>今天你來到這裡，就是來看見這位寶貝。</p>
<p class="footnote">本篇講題、經文與講員抄錄自本堂 2026 年 7 月 26 日週報；內文為配合版面呈現所寫的摘要，實際講稿請由教會提供。</p>`,
	},
	{
		slug: 'luke-12',
		title: '不要為自己積財，要在上帝面前富足',
		date: '2026-07-19',
		preacher: '巫奇真 教師',
		scripture: '路加福音 12:13-21',
		season: '聖靈降臨期',
		excerpt: '無知的財主以為自己還有許多年日，卻不知當夜就要交出靈魂。真正的富足不在倉房裡，而在上帝面前。',
		content: `<p>耶穌講這個比喻的時候，起因是一個人請祂主持分家產。耶穌沒有處理那樁糾紛，反而對眾人說：「你們要謹慎自守，免去一切的貪心。因為人的生命不在乎家道豐富。」</p>
<p>比喻中的財主並不邪惡。他勤奮、有遠見、懂得規劃，甚至可以說是我們社會所讚許的那種人。他的問題只有一個：在他所有的盤算裡，沒有上帝，也沒有鄰舍。</p>
<h2>律法：這也是我們的樣子</h2>
<p>我們也常常這樣計算——再多存一點就安心了，再穩定一點就可以開始服事了。但上帝對財主說：「無知的人哪，今夜必要你的靈魂。」我們所倚靠的，隨時可能被取走。</p>
<h2>福音：基督使我們富足</h2>
<p>然而好消息是：使我們在上帝面前富足的，從來不是我們積攢了什麼，而是基督為我們捨了什麼。祂本來富足，卻為我們成了貧窮，叫我們因祂的貧窮可以成為富足。</p>
<p>今天你在這裡領受祂的身體與血，就是領受這份富足。你什麼都不必先預備好，只要空著手來。</p>`,
	},
	{
		slug: 'psalm-46',
		title: '你們要休息，要知道我是上帝',
		date: '2026-07-05',
		preacher: '巫奇真 教師',
		scripture: '詩篇 46',
		season: '聖靈降臨期',
		excerpt: '地雖改變，山雖搖動到海心，我們也不害怕。因為有一道河的分汊使上帝的城歡喜。',
		content: `<p>詩篇四十六篇寫在一個看似天崩地裂的處境裡。地在改變，山在搖動，海水匉訇翻騰。詩人沒有說這些不會發生，他說的是：即使發生，我們也不害怕。</p>
<h2>上帝是我們的避難所</h2>
<p>「上帝是我們的避難所，是我們的力量，是我們在患難中隨時的幫助。」這句話不是安慰性的說詞，而是事實的陳述。避難所不是讓風浪停止，而是讓你在風浪中有地方可躲。</p>
<h2>你們要休息</h2>
<p>「你們要休息，要知道我是上帝。」原文帶著「停手」的意思——停下你想靠自己解決一切的手。這正是主日崇拜在做的事：你停下來，讓上帝作工。</p>`,
	},
	{
		slug: 'romans-3',
		title: '因信稱義：宗教改革主日',
		date: '2026-06-14',
		preacher: '魯思豪 牧師',
		scripture: '羅馬書 3:19-28',
		season: '教會改革紀念',
		excerpt: '如今上帝的義在律法以外已經顯明出來。人稱義是因著信，不在乎遵行律法。',
		content: `<p>1517 年，馬丁路德把九十五條論綱釘在威登堡教堂的門上。他要處理的不是政治，而是一個牧養上的問題：一個被罪困擾的良心，要怎樣才能得著平安？</p>
<p>他在羅馬書裡找到答案：「人稱義是因著信，不在乎遵行律法。」這不是路德的發明，而是保羅的話，是聖經本身的教導。</p>
<h2>我們今天仍需要這個答案</h2>
<p>宗教改革不是一件過去的事。只要人心仍然想靠自己的表現站立在上帝面前，這個福音就仍然是每天都需要聽見的消息。</p>`,
	},
];

/**
 * 主日週報。
 *
 * 以下每一筆都對應本堂 Facebook 專頁上實際發佈的週報貼文，
 * 標題與日期抄錄自貼文本身（格式為「YYYYMMDD＋節期主日＋週報」）。
 *
 * 本堂的作法是把週報掃描成圖片發佈於 Facebook，因此以 fbUrl 連向專頁，
 * 而非假設有 PDF 檔可下載。設有聖餐的主日發的是「程序本」而非「週報」，
 * 標題照原樣保留。
 *
 * 註：週報內頁含具名的代禱事項與奉獻徵信，屬個人資料，
 * 網站僅連向 Facebook 原貼文，不轉載這些內容。
 */
const FB_PAGE =
	'https://www.facebook.com/people/%E4%B8%AD%E8%8F%AF%E7%A6%8F%E9%9F%B3%E9%81%93-%E8%B7%AF%E5%BE%B7%E6%9C%83-%E6%A6%AE%E6%81%A9%E5%A0%82/61569452264190/';

/**
 * 每筆：[日期, 標題, 期號?, Facebook 該篇貼文網址?]
 * 第四欄必須是「該週貼文」的 permalink（含 story_fbid），不可填專頁首頁。
 * 沒有核對過的貼文就留空——頁面上不會出現會誤導的「查看週報」按鈕。
 */
const bulletinList = [
	[
		'2026-08-02',
		'聖靈降臨後第十主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02Sm3KKNcnbw6VTjsCQK7t5uggaw9tw13UU9P4JZ6qxURnJhZXZLagAZSoTfR68RuJl&id=61569452264190',
	],
	[
		'2026-07-26',
		'聖靈降臨後第九主日週報',
		'030',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid034bxupbPgtFbh7ZkxYQeXRqb7fCS5PGfptn5TW578EiACsMfDNc9GbMrzqai37obil&id=61569452264190',
	],
	[
		'2026-07-19',
		'聖靈降臨後第八主日程序本（包含聖餐禮）',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02FkNzgAvmVuwJ5JJhejprDH6xNqWHRYiDtjzvBspmARzFBQy34R8iJTdj6shV4VEml&id=61569452264190',
	],
	[
		'2026-07-12',
		'聖靈降臨後第七主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid0ea7j7vyBhQPyjXBo8Aie1KuWYWUkBNBCzsa9ZGQmTnCC8oqEsE1J6woBjPNw8wU6l&id=61569452264190',
	],
	[
		'2026-07-05',
		'聖靈降臨後第六主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02sdbcDeYwGstjqoVdF7CrYeb1cb2VwNvynNWdZNxKSsv17jsuJh2cy5pjLv3DofdWl&id=61569452264190',
	],
	[
		'2026-06-28',
		'聖靈降臨後第五主日程序本（包含聖餐禮）',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02MT4uorGLbqNCcRiZ1mVrMbypmUzTKs6KuUMPAhGzpVjcj8bz4GyHU9jV5b3my2cYl&id=61569452264190',
	],
	[
		'2026-06-21',
		'聖靈降臨後第四主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02KZe4En2ANZ1wESmPoVfj6PoF1Fpfkqu5UX6pQrbP71pRfqKdMMXr2Wpqjk1TDfjFl&id=61569452264190',
	],
	[
		'2026-06-14',
		'聖靈降臨後第三主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid0C4158nvSP3Eics1s2p8Ht9zeDffZzNUD9pMs57jEXrAu5cGNc89Q1CY4cdGZGxmGl&id=61569452264190',
	],
	[
		'2026-06-07',
		'聖靈降臨後第二主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid0hd38hVHBVf9JdwtCGFtZEqcRbrwgB75CLe2bPVncTvFXdLfURbGrDDPo4Hb4vcQNl&id=61569452264190',
	],
	[
		'2026-05-31',
		'聖三一主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02Ratot9JX964frjpwujtALT6yjPBALSmkjpsf8Hqz3CxcUgKEb4LgrsJwcpjU2wUKl&id=61569452264190',
	],
	[
		'2026-05-24',
		'聖靈降臨日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02pvSgvmr9WjWxQEVUFXXzEeMAfEbkcyMzdSzfy6dz2XGYGH4X6KPgERz3FjqDdoJQl&id=61569452264190',
	],
	[
		'2026-05-17',
		'復活期第七主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02bVLbzwZxXSy7v7EVcoLcgarbuyJUSakkhRegYx9GLAd6viFTM8WCev97YnAjxn43l&id=61569452264190',
	],
	[
		'2026-05-10',
		'復活期第六主日程序本（本主日有堅振禮、聖餐禮）',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid05EfKP8nHgTmJq3ux6qGMHC2R4qsLbEEyCdm8NdVkZ4gvKXA8NPwK67rAf7sVEQrhl&id=61569452264190',
	],
	[
		'2026-04-26',
		'復活期第四主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid08XtUg1KfFudF4TF8HS3mAGXx43poAp1np98VADxrc8e3VUAgBG68LUyqxWHmMk5Nl&id=61569452264190',
	],
	[
		'2026-04-12',
		'復活期第二主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid0UpQfdM5iaoA3K4Mt7o6vGXc2BWYKiwNNoKGHin26NTexZnhwmtKcUfvVrTk9bD3Zl&id=61569452264190',
	],
	[
		'2026-03-22',
		'預苦期第五主日週報',
		null,
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02ihWECC676Ge6m9a54SWAubhmDzqiKKzHXScQyqZ75PDvYeNcZGSqF8Ko7wRykM7Ql&id=61569452264190',
	],
	[
		'2026-03-08',
		'週報 010 期',
		'010',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02geaJKVBY6TLnHT7v56xGpHHV6oH2jTPCjnUSNv2MoBtnfgKd2nUYwdKxpar4CdJyl&id=61569452264190',
	],
	[
		'2026-03-01',
		'週報 009 期',
		'009',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02zpZXmS8TnkX1NU1TvNHrXKZ5D9BsoXAEGUdSAuS9aFMMH5Xi77hqeQSMUbEcBMgQl&id=61569452264190',
	],
	[
		'2026-02-15',
		'週報 007 期',
		'007',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02rM7fiCBYHkctdiPxnTKre8NLSHeBQWbffv2y9VojHtnfL6FJVeS3CRfLsMBqG46yl&id=61569452264190',
	],
	[
		'2026-02-08',
		'週報 006 期',
		'006',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02JUQb2ffkgx2yqAjTcGuQ9uxQzqsHfBTx2dNmSTj9BB8Dg2TYELiq975YYWJW1E9El&id=61569452264190',
	],
	[
		'2026-02-01',
		'週報 005 期',
		'005',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02fntDi38yrELD81wM1vprLi7WoSkPsC699G2uWJgrPBR4sAeHmXYB4rdURNPzNcF3l&id=61569452264190',
	],
	[
		'2026-01-25',
		'週報 004 期',
		'004',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid02AQmbrqtoQbKT7xEnAnaVoqNzgMJZbh4YW1GpTugXUj77vt7u8VGChfFtn8Vo3KCil&id=61569452264190',
	],
	[
		'2026-01-11',
		'週報 002 期',
		'002',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid0318yNmfadqm8UvLbzNH2bEtfJJmnzxAzGmf4tXvWjm6ppBL5aUHBLLoqUswRA1Vrl&id=61569452264190',
	],
	[
		'2026-01-04',
		'週報 001 期',
		'001',
		'https://www.facebook.com/permalink.php?story_fbid=pfbid031fNut2VimhLDRKkn16KazVyqwiLULvtp1aEu2WoQ4qA6AsWaTAGMtsfUyREEQc7Nl&id=61569452264190',
	],
];

export { FB_PAGE };

export const bulletins = bulletinList.map(([date, title, issue, fbUrl]) => {
	const hasPost = Boolean(fbUrl);
	return {
		slug: `bulletin-${date}`,
		title,
		date,
		issue: issue || null,
		verified: hasPost,
		/** 僅在有該週貼文 permalink 時才有值；絕不可回退成專頁首頁。 */
		fbUrl: hasPost ? fbUrl : null,
		content: hasPost
			? `<p>本主日的週報已發佈於本堂 Facebook 專頁，內含崇拜程序、本週經課、報告事項與代禱事項。</p>
<p>週報以圖片形式發佈，請點選上方按鈕開啟<strong>本週</strong>貼文查看完整內容。</p>`
			: `<p>本主日的週報以圖片形式發佈於本堂 Facebook 專頁。此筆尚未登錄該週貼文的直接連結，請至專頁依日期或標題「${escTitle(title)}」查找。</p>
<p><a href="${FB_PAGE}" target="_blank" rel="noopener">開啟榮恩堂 Facebook 專頁 →</a></p>`,
	};
});

function escTitle(value = '') {
	return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * 教會活動。以下內容取自本堂 Facebook 專頁的實際貼文與週報報告事項。
 */
export const events = [
	{
		// 詳細資訊取自 2026-07 專頁貼文與 030 期週報報告事項 b。
		slug: 'theology-lecture-0808',
		title: '信徒神學線上講座：以領受聖餐之情感恩祈禱・凡事謝恩',
		date: '2026-08-08',
		time: '上午 9:00－12:00',
		location: '線上直播（總會主辦）',
		verified: true,
		excerpt:
			'總會舉辦的信徒神學線上講座，由賴彼得牧師（Rev. Larry A. Peters）主講、白霈德牧師／博士中譯。請於 8/6 前報名。',
		content: `<p>中華福音道路德會總會舉辦「信徒神學線上講座」，本堂弟兄姊妹歡迎一同報名參加。</p>
<dl class="info-list">
	<div class="info-list__row"><dt>主題</dt><dd>以領受聖餐之情感恩祈禱：凡事謝恩</dd></div>
	<div class="info-list__row"><dt>時間</dt><dd>2026 年 8 月 8 日（六）上午 9:00－12:00</dd></div>
	<div class="info-list__row"><dt>講員</dt><dd>賴彼得牧師 Rev. Larry A. Peters</dd></div>
	<div class="info-list__row"><dt>中譯</dt><dd>白霈德牧師／博士</dd></div>
	<div class="info-list__row"><dt>方式</dt><dd>線上直播</dd></div>
</dl>
<p>本講座將從主的晚餐（聖餐）出發，深入探討感恩祈禱的信仰意義。結合舊約（特別是詩篇）、早期猶太群體、基督教會傳統，以及主禱文的祈禱實踐，幫助我們學習在基督裡「凡事謝恩」。</p>
<p>請於 8 月 6 日前完成報名，主辦方將於 8 月 7 日寄發講座連結。報名方式與最新訊息請見本堂 Facebook 專頁或教會 LINE 群組。</p>`,
	},
	{
		// 取自 030 期週報「教會＆肢體」代禱事項。
		slug: 'community-children-september',
		title: '九月社區兒童工作',
		date: '2026-09-01',
		time: '詳細時間另行公告',
		location: '榮恩堂',
		verified: true,
		excerpt: '教會將於九月開始社區兒童工作，目前正在籌備階段，也請弟兄姊妹一同為此禱告。',
		content: `<p>教會將於九月開始新一階段的社區兒童工作。這延續了榮恩堂長年以來以兒童與家庭為重心的服事——從主日學、課輔班，到陪伴社區的孩子與他們的父母。</p>
<p>目前仍在籌備階段，確切的時間與內容會在週報與 Facebook 專頁公告。也請弟兄姊妹為這項工作、以及參與服事的同工一同禱告。</p>`,
	},
	{
		// 取自 2026-05-29 專頁貼文。
		slug: 'summer-camps',
		title: '總會暑期營會（兒童／成人）',
		date: '2026-08-02',
		time: '詳見總會公告',
		location: '聖道教會等地',
		verified: true,
		excerpt: '總會暑期舉辦兩場營會，分別適合兒童與成人參加。有興趣者可洽巫奇真教師。',
		content: `<p>總會於暑期舉辦兩場營會，一場適合兒童、一場適合成人參加。</p>
<p>其中兒童聯合英語夏令營於 8 月 2 日至 5 日在聖道教會舉行，由 Frank 牧師擔任講員。</p>
<p>有興趣參加的弟兄姊妹，請洽駐堂教師巫奇真教師（0986-375-031）。</p>`,
	},
];

/**
 * 教會消息。標註 verified 者取自本堂 Facebook 專頁的實際貼文。
 */
export const news = [
	{
		// 取自 2026-01-20 專頁貼文（主日證道錄影，YouTube）。
		slug: 'sermon-recordings',
		title: '主日證道錄影陸續發佈於 YouTube',
		date: '2026-01-20',
		verified: true,
		excerpt: '無法到場的弟兄姊妹，可以在 YouTube 上收看主日證道錄影。',
		content: `<p>本堂已開始將主日證道錄影上傳至 YouTube，方便因身體、工作或距離而無法到場的弟兄姊妹在家收看。</p>
<p>影片連結會隨著每週的週報一同發佈於本堂 Facebook 專頁。若你想收看較早的證道，也歡迎直接聯繫駐堂教師。</p>`,
	},
	{
		// 取自 2025-12-19 專頁貼文。
		slug: 'christmas-eve-vespers',
		title: '平安夜晚禱：敬邀弟兄姊妹前來參加',
		date: '2025-12-19',
		verified: true,
		excerpt: '平安夜舉行「晚禱」禮儀崇拜，一同聆聽上帝的話，並頌唱聖誕節期的詩歌。',
		content: `<p>本堂於平安夜舉行「平安夜晚禱」禮儀崇拜，敬邀弟兄姊妹前來參加。</p>
<p>當晚除了有上帝寶貴的話語可以聆聽，更會一起唱很多美妙的聖誕節期詩歌，享受基督所要賜給我們的屬天的寧靜。</p>
<p>歡迎邀請家人與鄰舍一同前來。</p>`,
	},
	{
		// 取自 2025-11-29 專頁貼文（將臨期第一主日）。
		slug: 'new-church-year',
		title: '新的教會年開始了',
		date: '2025-11-29',
		verified: true,
		excerpt: '今天是新的教會年開始，四週之後，讓我們一起歡慶救主基督耶穌的降生。',
		content: `<p>今天是新的教會年開始。教會年不從一月起算，而是從將臨期的第一主日開始——我們以等候基督降臨作為一年的起點。</p>
<p>四週之後，讓我們一起歡慶救主基督耶穌的降生。</p>`,
	},
	{
		slug: 'first-visit',
		title: '關於初次來訪：你不需要事先準備什麼',
		date: '2026-07-10',
		excerpt: '常有人問，第一次來教會要注意什麼。答案是：不需要準備，坐下來就好。',
		content: `<p>不少朋友第一次要走進教會時會有點緊張——擔心不會唱詩、不知道什麼時候該站起來、怕被問問題。</p>
<p>其實完全不必擔心。入口備有崇拜手冊，程序都印在裡面；跟不上時坐著看也沒關係；我們也不會請訪客上台自我介紹。</p>
<p>崇拜大約一小時。結束後如果你願意留下來喝杯茶、聊幾句，我們很歡迎；如果你想安靜地離開，那也完全沒有問題。</p>`,
	},
];
