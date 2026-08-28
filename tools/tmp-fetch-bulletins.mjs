/**
 * 一次性工具：把 Facebook 上的週報圖片下載到暫存目錄，供人工判讀經課與講題。
 * 圖片網址帶有簽章與有效期，過期後需重新取得。用完即可刪除本檔。
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const targets = [
	['2026-07-19-a', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/749036334_122161679258648408_1227639020443204152_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1198x1708&ctp=s1198x1708&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=A57LEc5ZYQ4Q7kNvwEnhAZf&_nc_oc=AdqAkuguTiTCYNapkThLbkGfhtsGsYsPvJ8VSCj1OI9MPzsWJbVNT6XyvF1Nfi2pLog&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=SLTZ-izI6phZ1b9yufpbEg&_nc_ss=782a8&oh=00_AQFQarE23aKrvhjj-8WrownA7tOCsXfVOadX9qVYCK67Ig&oe=6A71B62D'],
	['2026-07-19-b', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/751202406_122161678808648408_5527212088794248829_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx1360x1942&ctp=s1360x1942&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rno63tHN7soQ7kNvwGQE-YL&_nc_oc=Adp1sScfLv8FnUntoMhtRiyo1XriEeQQY01HIznjcbq3BxI50ZruyK8Z4hDVgGOd2FQ&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=zl-1ErG1WkKv9auuwzAV-w&_nc_ss=7a2a8&oh=00_AQGEAj6kG-AXo-8JTmHkGdbsXgzyaWckVlShMEBISfGEbQ&oe=6A71A841'],
	['2026-07-12-a', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/746411687_122161299404648408_8362503632436500338_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1432&ctp=s2048x1432&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=SJP5zFWlYQ8Q7kNvwHRng-Z&_nc_oc=AdqDFLSrpr4DM8ZeQYn7MWomGrkoPVdFADoF_-Zpb2ARmKnlRxtfZ1Yb4q_E5PzQLnM&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=pnT0f2OIgLytOxRFkxDp_g&_nc_ss=782a8&oh=00_AQH-j-c9X3Q1Xc409Fa6ebajCWptUkY4TLo77xViFWYeog&oe=6A71AC90'],
	['2026-07-12-b', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/743811439_122161299380648408_8880198839632971113_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1440&ctp=s2048x1440&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=gERBcpH7xMkQ7kNvwH861Bd&_nc_oc=AdoP8yFUwEfQqlcHz1VMmgUqJE1ajGUWRcz_Dl4ILzWTK2LM1lo5E70L_NgHAoUxyS4&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=dVXF8UkUOMrfCd5L9fjZDg&_nc_ss=7a2a8&oh=00_AQGE3ZCGrd4whvPt7o7LKHEIbMpfpHferygKkWXs8oKZgg&oe=6A71960A'],
	['2026-07-05-a', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/738653465_122160881852648408_5241238056542901234_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1447&ctp=s2048x1447&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=b44x-sKew-EQ7kNvwFlKwp8&_nc_oc=AdptaAbOSvXk6VUc7mL0mP2FC6q52VtxPuBskPNKimCUNFvqt96l0fmaZNg9rlvlbis&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=WAkqlKBqN42WLlec1IeFyg&_nc_ss=7a2a8&oh=00_AQGE2O653fRgF_A4OPyp5ijMX3S7H3Jg5xrrQUkFrVgp2g&oe=6A71B107'],
	['2026-07-05-b', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/738396286_122160881846648408_2025433821669509023_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1414&ctp=s2048x1414&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=KLrli9t2trUQ7kNvwHUjJH9&_nc_oc=Adp8y54E6SSTdzhakeD_oSNb_S_78FYNl3W5Py2A3JlcKxHZhhrBgvWbwwrS3yWHpRU&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=NuV_6qpUqdR1BTU20gSqpw&_nc_ss=7a2a8&oh=00_AQG31WbyNYk8r1gZwcVDD53T22hgI9cMG4Wn14sJ1UULAw&oe=6A71BDEE'],
	['2026-06-21-a', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/727465734_122160148742648408_6181240366392557654_n.jpg?stp=dst-jpg_tt6&cstp=mx1354x941&ctp=s1354x941&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Qte-hyDJEB8Q7kNvwEC7ESF&_nc_oc=Adr4BJ-04b-z6CJfdscz5VqIsLaPb9FMptegU8T_AWTbiyxJFb-lFSfmnAHGj-Nx-vk&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=8hsHk3DT-QVupkG9SrDF8A&_nc_ss=782a8&oh=00_AQGgO0RVNXIxxZMRIic9i54xeDRaWKlAbPsSQnRmWfIuEA&oe=6A7196CC'],
	['2026-06-14-a', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/723137478_122159756582648408_4536291507999783204_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1472&ctp=s2048x1472&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LbS28qRGts4Q7kNvwFv7tqZ&_nc_oc=AdqflFloywUhj88nMwv2vO29KB1AChMHplnR3k7rjU5tI6pN010tplc6YrR3s3__upQ&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=ooeZEZlK4kdf0C8Yullztg&_nc_ss=7a2a8&oh=00_AQECMJYk1kWasq8_3oNhfMWNRBl2diNycm0wAxgtqgXm9g&oe=6A71B54B'],
	['2026-06-14-b', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/721441220_122159756576648408_1050238031229778373_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1482&ctp=s2048x1482&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9vm-Jj42dWkQ7kNvwHkBpB7&_nc_oc=AdomIq8id9VSxkuKH37oxZIz0r0PoIjc8Eu7AHLhDgqODaP06rJMHgGlvSBzj4NI92M&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=Lkj4TtosQOZ1I8Cc9BdMkg&_nc_ss=7a2a8&oh=00_AQFgpbFGZLFH6j8fL2PNYDdVaVAdJl3WVID9tX3PSUU_lw&oe=6A71A9C9'],
	['2026-06-07-a', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/715690855_122159384114648408_9082509843924765565_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1430&ctp=s2048x1430&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=dUxpWWfvr1YQ7kNvwG9vlum&_nc_oc=AdrU6SsWCpTcOEHgWJlnAIJ49DuRvdCO2DawKgi7aj0eh2DQ1f8JmHDjuvUSPCVViVQ&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=VrGUh8KeLXRQOGCNBz3-Hg&_nc_ss=7a2a8&oh=00_AQFx0gFif-iyLlyKmuRwwT_AUPnSPZBXjocvLjxct9WzZA&oe=6A71BE28'],
	['2026-06-07-b', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/715464959_122159384108648408_1388922019657434644_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1490&ctp=s2048x1490&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=h4J_fq8oYoMQ7kNvwGnr3FC&_nc_oc=Ado18MrHCp2Doh4oEi8lrvGwZ0DLBi18t1O6WX_QAvf1riof6kYGQDgeW2dzv6m9nj4&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=9t9QnsKZSOmg_MkDrHCvlw&_nc_ss=7a2a8&oh=00_AQG_mjfpy-0byx4jlFSPaKvEgdOlJRz9fnsSZZfhXUhO2A&oe=6A71C532'],
	['2026-05-31-a', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/710192907_122158994024648408_5941335698273486427_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1423&ctp=s2048x1423&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=njJAeJy_0ssQ7kNvwGP19An&_nc_oc=Adoi7X_H_78aN7Davsk9f5YMVEigX-a-JA_60jlFvE-h8du6357pxiw-5zP7sgouJTk&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=3IfveIm05whW8CFJILF1wQ&_nc_ss=7a2a8&oh=00_AQHwtCAcEzoIq9hCUuHwgtROxBv13AUQ1Dj7nLdnAlyQQg&oe=6A718E7D'],
	['2026-05-31-b', 'https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/710391563_122158993994648408_3207116998212262709_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1481&ctp=s2048x1481&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cRNdxQhwzO0Q7kNvwHjcKJQ&_nc_oc=Ado3Z5SBshCN2_BcwiWOQiKha3N6sadScwuNVCVHkdywQ2ofHY2-G79D3H4Jm8_zR8Y&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=juzdle4T_5oi1O2Jlawukg&_nc_ss=7a2a8&oh=00_AQHchbuOSa_9jGI7OAY5fSOxPz2QYU0WmbWUfcOkyMkdyg&oe=6A71ADFB'],
];

const outDir = join(tmpdir(), 'rongen-fb');
await mkdir(outDir, { recursive: true });

for (const [name, url] of targets) {
	try {
		const res = await fetch(url, {
			headers: {
				'user-agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
				referer: 'https://www.facebook.com/',
			},
		});
		if (!res.ok) {
			console.log(`${name}  失敗 HTTP ${res.status}`);
			continue;
		}
		const buf = Buffer.from(await res.arrayBuffer());
		const file = join(outDir, `${name}.jpg`);
		await writeFile(file, buf);
		console.log(`${name}  ${(buf.length / 1024).toFixed(0)} KB  ${file}`);
	} catch (err) {
		console.log(`${name}  錯誤 ${err.message}`);
	}
}
