/**
 * English preview content (portfolio / bilingual demo).
 * Production WordPress theme remains Traditional Chinese for the parish.
 * Keep structure aligned with content.mjs where possible.
 */

export const church = {
	name: 'Rongen Lutheran Church',
	short: 'Rongen',
	latin: 'China Evangelical Lutheran Church',
	tagline: 'Baihe · Xiancao, Tainan',
	address: 'No. 21-4, Xiancao, Xiancao Village, Baihe Dist., Tainan City 732010, Taiwan',
	phone: '06-685-7444',
	mobile: '0986-375-031',
	email: 'service@celc.org.tw',
	overseer: 'Rev. Sihao Lu',
	pastor: 'Rev. Peide Bai',
	pastorPhone: '0975-959-112',
	teacher: 'Teacher Qizhen Wu',
	teacherLine: 'marigold1301',
	serviceTime: 'Sundays 10:00–11:00 AM',
	facebook:
		'https://www.facebook.com/people/%E4%B8%AD%E8%8F%AF%E7%A6%8F%E9%9F%B3%E9%81%93-%E8%B7%AF%E5%BE%B7%E6%9C%83-%E6%A6%AE%E6%81%A9%E5%A0%82/61569452264190/',
	celcUrl: 'https://celc.org.tw/',
	mapUrl: 'https://maps.google.com/?q=23.3453317,120.474678',
	mapEmbed: 'https://maps.google.com/maps?q=23.3453317,120.474678&z=16&output=embed',
	heroKicker: 'Word and Sacrament at the center',
	heroTitle: 'The word of the Lord<br>endures forever',
	heroText:
		'Rongen is a China Evangelical Lutheran Church congregation in Baihe, Tainan. We gather for historic liturgical worship—to hear God’s Word and receive Christ’s body and blood. Whether you are visiting for the first time or returning after a long time, there is a place for you.',
	verseText:
		'All flesh is like grass and all its glory like the flower of grass. The grass withers, and the flower falls, but the word of the Lord remains forever.',
	verseRef: '1 Peter 1:24–25',
};

export const nav = [
	{ label: 'About', url: '/en/about/' },
	{ label: 'Worship', url: '/en/worship/' },
	{ label: 'Beliefs', url: '/en/beliefs/' },
	{ label: 'Sermons', url: '/en/sermons/' },
	{ label: 'Bulletins', url: '/en/bulletins/' },
	{ label: 'News', url: '/en/news/' },
	{ label: 'Visit / Contact', url: '/en/contact/' },
];

export const footerNav = [
	{ label: 'Worship', url: '/en/worship/' },
	{ label: 'Sermons', url: '/en/sermons/' },
	{ label: 'Bulletins', url: '/en/bulletins/' },
	{ label: 'Events', url: '/en/events/' },
	{ label: 'Giving', url: '/en/giving/' },
	{ label: 'CELC churches', url: '/en/celc/' },
];

export const schedule = [
	{
		name: 'Divine Service',
		when: church.serviceTime,
		note: 'Liturgical order with confession & absolution, Introit, three readings, sermon, and benediction. Communion Sundays include a separate service folder.',
	},
	{
		name: 'Sunday school / children',
		when: 'After the Divine Service',
		note: 'Catechism and Bible stories for children; families are welcome.',
	},
	{
		name: 'Bible study & prayer',
		when: 'Weekday evenings (see current notices)',
		note: 'Book-by-book Scripture study and prayer for church, community, and mission.',
	},
	{
		name: 'Pastoral care visits',
		when: 'Weekdays, by appointment',
		note: 'The resident teacher and coworkers visit homes and seniors—please call ahead.',
	},
];

export const pillars = [
	{
		title: 'Scripture alone',
		latin: 'Sola Scriptura',
		text: 'The Old and New Testaments are the inspired Word of God and the only rule for faith and life. All teaching must be tested by Scripture.',
	},
	{
		title: 'Grace alone',
		latin: 'Sola Gratia',
		text: 'Salvation is not earned by effort or merit, but is given freely by God’s grace.',
	},
	{
		title: 'Faith alone',
		latin: 'Sola Fide',
		text: 'We are justified by faith in Christ. Even that faith is the Spirit’s work through Word and Sacrament.',
	},
	{
		title: 'Christ alone',
		latin: 'Solus Christus',
		text: 'Jesus Christ is the only Mediator between God and humanity. His cross and resurrection are the ground of every comfort.',
	},
];

export const liturgy = [
	['Hymn', 'Worship begins with a hymn. This congregation uses the hymnal Sheng Zhu Sheng Shi; hymn numbers appear in the bulletin.'],
	['Invocation', 'In the name of the Father and of the Son and of the Holy Spirit (e.g. Matthew 28:19).'],
	['Confession & Absolution', 'The congregation confesses sin and hears forgiveness declared in Christ’s name. We arrive empty-handed.'],
	['Introit', 'Psalm texts lead us into the sanctuary with responsive reading.'],
	['Kyrie', '“Lord, have mercy.”'],
	['Gloria in Excelsis', 'Glory to God in the highest.'],
	['Salutation', 'Greeting between pastor/leader and people.'],
	['Collect of the Day', 'A prayer for the Sunday in the church year.'],
	['Old Testament', 'The appointed Old Testament reading.'],
	['Response', 'A scriptural response to what was heard.'],
	['Epistle', 'The appointed Epistle reading.'],
	['Gospel Acclamation', 'Preparation before the Gospel reading.'],
	['Holy Gospel', 'The appointed Gospel—Christ speaking to us.'],
	['Hymn', 'A hymn responding to the Word.'],
	['Sermon', 'Law and Gospel preaching: the Law names our sin; the Gospel announces Christ’s forgiveness.'],
	['Offering', 'Gifts offered in thanksgiving.'],
	['Hymn', 'Further praise in song.'],
	["Lord’s Prayer", 'The prayer Christ taught us.'],
	['Benediction', 'God’s blessing as we are sent into daily life.'],
	['Announcements', 'Parish notices and prayer requests.'],
];

export const faq = [
	['Do I need formal clothes?', 'No. Some dress formally; others come casually. What is solemn is the worship, not the wardrobe.'],
	['I’m not a Christian—may I attend?', 'Yes. You may simply listen and watch. After the service, feel free to speak with the resident teacher.'],
	['May I commune?', 'Lutherans practice closed communion among those who share the confession. If you have not been baptized or instructed in a Lutheran church, please speak with a pastor first; you may still come forward for a blessing.'],
	['May I bring children?', 'Absolutely. Sounds from children are normal. Sunday school follows the service.'],
	['Is an offering required?', 'Giving is a voluntary response of thanks. Visitors should feel no pressure.'],
];

export const churches = [
	{ name: 'Songshan Church', city: 'Taipei', address: 'B1, No. 58, Ln. 25, Songde Rd., Xinyi Dist., Taipei', phone: '0921-262-106', note: 'Mission station' },
	{ name: 'Shengdao Church', city: 'Hsinchu', address: '12F, No. 132, Sec. 1, Dongda Rd., East Dist., Hsinchu', phone: '03-533-1215', note: 'Mission · Vietnamese fellowship' },
	{ name: 'Holy Trinity', city: 'Nantou', address: 'No. 104, Hushan Rd., Nantou City', phone: '0972-104-524', note: 'Mission station' },
	{ name: 'Grace Church (Jiayi)', city: 'Chiayi', address: 'No. 19, Jiancheng St., West Dist., Chiayi', phone: '05-285-2382', note: 'Self-supporting' },
	{ name: 'Ling-en Church', city: 'Douliu', address: 'No. 98, Chengding St., Douliu, Yunlin', phone: '05-532-1370', note: 'Self-supporting' },
	{ name: 'Rongen Church', city: 'Baihe, Tainan', address: 'No. 21-4, Xiancao, Baihe Dist., Tainan', phone: '06-685-7444', note: 'Self-supporting · this parish' },
	{ name: 'Eternal Life Church', city: 'Taipei', address: 'No. 16, Chaozhou St., Zhongzheng Dist., Taipei', phone: '02-2351-4093', note: 'Partner' },
	{ name: 'Banqiao Peace Church', city: 'New Taipei', address: '2F, No. 70, Aly. 17, Ln. 202, Minquan Rd., Banqiao', phone: '02-2968-8148', note: 'Partner' },
	{ name: 'Song-en Church', city: 'Tainan', address: 'No. 57, Ln. 39, Shijian St., North Dist., Tainan', phone: '06-251-6108', note: 'Partner' },
	{ name: 'Shi-en / South Seminary Center', city: 'Chiayi', address: 'No. 140, Yanping St., East Dist., Chiayi', phone: '0972-104-524', note: 'In preparation' },
	{ name: 'North Seminary / Synod office', city: 'Taipei', address: 'No. 15-5, Ln. 38, Songjiang Rd., Zhongshan Dist., Taipei', phone: '02-2775-4145', note: 'Synod headquarters' },
];

/** Abridged English demo posts for portfolio preview (1–2 each). */
export const sermons = [
	{
		slug: 'matthew-13',
		title: 'The treasure that makes you gladly sell all',
		date: '2026-07-26',
		preacher: 'Teacher Qizhen Wu',
		scripture: 'Matthew 13:44–46',
		season: 'Season after Pentecost',
		excerpt:
			'The kingdom is like treasure hidden in a field. Seeing something more precious makes letting go joyful—not forced.',
		content: `<p>Jesus tells two short parables of the kingdom: a man finds treasure in a field and sells all to buy it; a merchant finds a pearl of great price and does the same.</p>
<p>Both sell everything—but the text highlights their joy. They do not grit their teeth; they have seen something better.</p>
<p class="footnote">Title, text, and preacher from the July 26, 2026 bulletin; body text is a layout summary.</p>`,
	},
];

export const bulletins = [
	{
		slug: 'bulletin-2026-07-26',
		title: 'Ninth Sunday after Pentecost — bulletin',
		date: '2026-07-26',
		issue: '030',
		verified: true,
		fbUrl:
			'https://www.facebook.com/permalink.php?story_fbid=pfbid034bxupbPgtFbh7ZkxYQeXRqb7fCS5PGfptn5TW578EiACsMfDNc9GbMrzqai37obil&id=61569452264190',
		content: `<p>This Sunday’s bulletin is published on the parish Facebook page (order of service, readings, notices).</p>
<p>Bulletins are posted as images—open the week’s post for full content.</p>`,
	},
];

export const events = [
	{
		slug: 'theology-lecture-0808',
		title: 'Online theology lecture: thanksgiving prayer & Holy Communion',
		date: '2026-08-08',
		time: '9:00 AM – 12:00 PM',
		location: 'Online (synod-sponsored)',
		excerpt:
			'Synod online lecture with Rev. Larry A. Peters; Chinese interpretation by Rev. Dr. Peide Bai. Register by Aug 6.',
		content: `<p>China Evangelical Lutheran Church hosts a lay theology webinar. Members of Rongen are welcome to join.</p>
<p>Register by August 6; the link is sent August 7. See the parish Facebook page or LINE group for details.</p>`,
	},
];

export const news = [
	{
		slug: 'first-visit',
		title: 'First visit: you do not need to prepare anything',
		date: '2026-07-10',
		excerpt: 'People often ask what to watch for on a first visit. The answer: sit down and receive.',
		content: `<p>First-time visitors often worry about hymns, when to stand, or being put on the spot.</p>
<p>There is a worship folder at the entrance. Sitting and watching is fine. We do not ask visitors to introduce themselves publicly.</p>
<p>The service lasts about an hour. Stay for tea if you like—or leave quietly. Both are welcome.</p>`,
	},
];

export const ui = {
	skip: 'Skip to main content',
	menu: 'Menu',
	navLabel: 'Primary',
	synod: 'Synod',
	welcome: 'You are welcome',
	footerVisitTitle: 'On Sunday we wait for you in Baihe · Xiancao',
	footerVisitText:
		'Rongen sits near the Guanziling hills. First-time visitors need no preparation. A worship folder is available at the entrance; coworkers will help you find a seat.',
	serviceLabel: 'Divine Service',
	addressLabel: 'Address',
	contactLabel: 'Contact',
	openMap: 'Open in Google Maps',
	staff: 'Pastoral staff',
	sacramentalPastor: 'Sacramental pastor',
	residentTeacher: 'Resident teacher',
	siteNav: 'Site map',
	related: 'Related links',
	synodFull: 'China Evangelical Lutheran Church (synod)',
	allChurches: 'Congregations & mission stations',
	fbPage: 'Rongen Facebook page',
	copyright: 'All rights reserved',
	underSynod: 'A congregation of China Evangelical Lutheran Church',
	mapLabel: 'Gathering place',
	mapOpen: 'Open in Google Maps →',
	homeTitle: 'Home',
	langZh: '中文',
	langEn: 'EN',
	portfolioNote:
		'English preview for portfolio · Production site content is Traditional Chinese',
};
