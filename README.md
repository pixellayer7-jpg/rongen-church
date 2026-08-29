# 中華福音道路德會 榮恩堂 — WordPress 網站

> **GitHub:** [pixellayer7-jpg/rongen-church](https://github.com/pixellayer7-jpg/rongen-church)  
> **English preview:** run `npm run preview` → open <http://localhost:4321/en/> (中 / EN switcher in the header)

為台南白河「中華福音道路德會 榮恩堂」製作的自訂 WordPress 佈景主題，
以及一套不需要 PHP 環境就能檢視版面的本機預覽工具。

設計風格參考 [Redeemer Lutheran Church, Fort Wayne](https://redeemer-fortwayne.org/worship/)
的禮儀教會質感：深墨底色、古金強調色、襯線標題、大量留白，
避免商業網站式的高飽和色塊與動畫。

### 語言說明

| 層級 | 語言 |
| --- | --- |
| **正式 WordPress 主題**（給堂會上線） | 繁體中文 |
| **本機／靜態預覽** | 繁中為主，另提供 **`/en/` 英文版** 供作品集與英語讀者瀏覽 |

英文預覽涵蓋首頁、關於、崇拜、信仰、聯絡等核心頁，並含精簡示範講道／週報／消息；完整堂會內容以繁中為準。

---

## English (portfolio summary)

**Rongen Lutheran Church** — custom WordPress theme + zero-PHP local preview for China Evangelical Lutheran Church · Rongen (Baihe, Tainan).

- **Theme:** custom post types (sermons / bulletins / events), Customizer church fields, shortcodes, liturgical visual language
- **Preview:** `npm run preview` → [http://localhost:4321](http://localhost:4321) (中文) · [http://localhost:4321/en/](http://localhost:4321/en/) (English)
- **Export:** `npm run export` builds a static zip (includes `/en/` pages) for pastors to review offline
- **Package:** `npm run build:theme` → `dist/rongen.zip` for WordPress upload

Production copy for the parish remains Traditional Chinese; the English routes are a bilingual portfolio demo with a 中 / EN header switcher.

---

## 教會資料

| 項目 | 內容 |
| --- | --- |
| 教會全名 | 中華福音道路德會 榮恩堂 |
| 地址 | 732 台南市白河區仙草里仙草 21 之 4 號 |
| 電話 | 06-685-7444 |
| 主責牧師 | 魯思豪 牧師 |
| 駐堂教師 | 巫奇真 教師（0986-375-031） |
| 主日崇拜 | 每主日 上午 10:00－11:00 |
| 電子郵件 | service@celc.org.tw |
| 所屬 | 財團法人中華福音道路德會（<https://celc.org.tw/>） |

資料來源為總會官網的教會一覽頁與榮恩堂 Facebook 專頁。
這些欄位都寫在自訂器裡，日後有異動可在後台直接修改，不需要改程式。

---

## 目錄結構

```
rongen-church/
├── wp-content/themes/rongen/     WordPress 佈景主題（實際要上傳的東西）
│   ├── style.css                 主題資訊標頭
│   ├── functions.php             載入點
│   ├── inc/                      功能模組
│   │   ├── setup.php             主題支援、選單位置、小工具區
│   │   ├── enqueue.php           樣式與腳本載入
│   │   ├── post-types.php        講道／週報／活動 三種內容類型
│   │   ├── meta-boxes.php        講員、經文、PDF 連結等自訂欄位
│   │   ├── customizer.php        教會資料設定（外觀 → 自訂）
│   │   ├── template-tags.php     樣板輔助函式與共用資料
│   │   ├── shortcodes.php        聚會表、地圖、各堂會等簡碼
│   │   └── demo-content.php      一鍵建立頁面與選單的設定精靈
│   ├── page-templates/           六個專屬頁面版型
│   ├── template-parts/           可重用區塊
│   └── assets/                   CSS、JS、SVG
├── tools/
│   ├── preview/                  本機預覽伺服器（Node，零相依）
│   │   ├── content.mjs           繁中預覽文案
│   │   ├── content-en.mjs        英文預覽文案（作品集）
│   │   ├── render.mjs / render-en.mjs
│   │   └── server.mjs
│   ├── lib/zip.mjs               標準 ZIP 產生器（跨平台可解壓）
│   ├── export-static.mjs         匯出靜態網站（含 /en/）
│   ├── verify-export.mjs         檢查匯出成品的連結與資源是否完整
│   ├── package-theme.mjs         打包成可上傳的 zip
│   └── smoke-test.mjs            對已架好的 WordPress 逐頁檢查錯誤
└── package.json
```

---

## 本機預覽（不需要安裝 PHP 或 WordPress）

```bash
npm run preview
```

開啟 <http://localhost:4321>（繁中）或 <http://localhost:4321/en/>（English）。
頁首有 **中文 · EN** 切換。

預覽伺服器直接讀取主題的 `assets/css/theme.css` 與 `assets/js/main.js`，
HTML 結構也刻意與 PHP 樣板保持一致，所以看到的版面就是網站上線後的樣子。

> 預覽伺服器只是給你看版面用的，**不會**上傳到主機。
> 真正要部署的是 `wp-content/themes/rongen`。
>
> 若日後修改了主題的預設文案或教會資料，請一併更新 `tools/preview/content.mjs`，
> 兩邊才會一致。

---

## 給牧師／同工預覽（匯出靜態網站）

`npm run preview` 只有自己這台電腦連得到，別人打不開。要讓牧師或同工看，先匯出靜態版：

```bash
npm run export
```

會產生兩樣東西：

| 產出 | 用途 |
| --- | --- |
| `dist/preview-site/` | 靜態網站資料夾 |
| `dist/榮恩堂網站預覽.zip` | 可直接寄出的壓縮檔（約 82 KB） |

**方式一：寄壓縮檔**（最單純，不需要帳號或網路空間）
把 zip 用 Email 或 LINE 傳給對方，解壓後雙擊 `index.html` 就能瀏覽，
所有頁面與選單都能正常點選。壓縮檔內附「請先讀我.txt」說明怎麼開、
以及目前哪些是示範內容。

**方式二：取得公開網址**（方便手機看，或多人同時看）

最省事的是把 `dist/preview-site` 整個資料夾拖到 <https://app.netlify.com/drop>，
會立刻得到一個公開網址，手機直接開即可，不需要註冊，網址也會一直存在。

若只是想臨時給人看幾分鐘，也可以用 Cloudflare 快速通道把本機的預覽伺服器暫時公開
（不需帳號，且沒有中間警告頁）：

```bash
npm run preview                                   # 先確認 4321 正在跑
cloudflared tunnel --url http://localhost:4321    # 取得 https://xxx.trycloudflare.com
```

> 通道網址只在你的電腦與 `cloudflared` 都開著時有效，關掉即失效，
> 每次重開也會拿到不同網址。要長期、穩定的網址請用 Netlify Drop 或正式部署。

匯出後可以檢查成品有沒有斷掉的連結或漏掉的圖檔：

```bash
node tools/verify-export.mjs
```

> 匯出的版本是**靜態**的，只用於看版面與文案，
> 沒有後台、無法在上面編輯內容。要能實際編輯，仍需依下方步驟部署到 WordPress。
>
> 字體與地圖需要連網才會完整顯示；離線時版面照常，只是字體換成系統預設。
>
> 預覽頁面一律帶有 `<meta name="robots" content="noindex, nofollow">`，
> 避免尚未定稿的內容被搜尋引擎收錄。正式主題的 PHP 樣板**不含**此標記，
> 上線後可正常被搜尋到。

---

## 打包主題

```bash
npm run build:theme
```

會產生 `dist/rongen.zip`，可直接在 WordPress 後台
「外觀 → 佈景主題 → 安裝佈景主題 → 上傳佈景主題」上傳。

---

## 冒煙測試

主題安裝到 WordPress 之後，可以逐頁檢查是否有 PHP 錯誤、未解析的簡碼或空白頁：

```bash
node tools/smoke-test.mjs http://你的網址
```

會檢查全部 17 個頁面（首頁、七個內容頁、三個彙整頁、三種單篇頁、節期彙整、搜尋、404），
確認 HTTP 狀態碼正確、頁尾有完整輸出、樣式有載入，且頁面中沒有任何 PHP 警告或通知。

---

## 已驗證項目

本主題已在 **WordPress 7.0.2 + PHP 8.3.32**、且開啟 `WP_DEBUG` 的環境實際安裝執行：

- 全部 26 個 PHP 檔案通過語法檢查。
- 設定精靈正確建立八個頁面、兩組選單，並設定首頁與消息頁。
- 三種自訂內容類型與教會年節期分類正常註冊，固定網址 `/sermons/`、`/bulletins/`、`/events/` 可正常運作。
- 五個簡碼全部正常解析。
- 17 個頁面全數回傳正確狀態碼，且沒有任何 PHP 警告、通知或棄用訊息。
- 桌面版與行動版（390px）版面、行動版選單皆正常。

---

## 部署到 WordPress

1. **上傳並啟用主題**
   後台「外觀 → 佈景主題 → 上傳佈景主題」，選擇 `dist/rongen.zip`，安裝後啟用。

2. **執行設定精靈**
   後台「外觀 → 網站設定精靈」，按下「建立網站架構」。
   這會一次建立八個頁面、指定對應版型、設定首頁與消息頁，並建立主選單與頁尾選單。
   接著可再按「匯入示範內容」，看到講道、週報、活動列表的實際樣子（正式上線前請刪除或改寫）。

3. **核對教會資料**
   「外觀 → 自訂 → 榮恩堂設定」檢查地址、電話、崇拜時間、牧養同工與首頁文案。

4. **上傳教會標誌與照片**
   - 「外觀 → 自訂 → 網站識別」上傳 Logo 與網站圖示。
   - 「外觀 → 自訂 → 榮恩堂設定 → 首頁文案」上傳首頁主視覺照片與崇拜段落照片。
     未上傳時會自動使用深色十字底紋，網站不會開天窗。

5. **設定固定網址**
   「設定 → 固定網址」選「文章名稱」，讓 `/sermons/`、`/bulletins/` 這類網址正常運作。

6. **補上奉獻頁的帳戶資料**
   「頁面 → 奉獻」在編輯器中填入銀行、戶名、帳號與收據開立方式。
   在填寫之前，該頁會顯示提醒同工的提示訊息。

---

## 日常維護（給教會同工）

| 想做的事 | 到哪裡做 |
| --- | --- |
| 發佈本週講道 | 後台「講道 → 新增講道」，填日期、講員、經文，可貼 YouTube 網址 |
| 上傳主日週報 | 先在「媒體」上傳 PDF，複製網址；再到「主日週報 → 新增週報」貼上 |
| 公告活動 | 「教會活動 → 新增活動」，填日期、時間、地點 |
| 一般消息 | 「文章 → 新增文章」 |
| 改地址／電話／崇拜時間 | 「外觀 → 自訂 → 榮恩堂設定」 |
| 調整選單 | 「外觀 → 選單」 |

### 可用簡碼

在任何頁面或文章中貼上即可：

| 簡碼 | 用途 |
| --- | --- |
| `[rongen_schedule]` | 每週聚會表 |
| `[rongen_map]` | Google 地圖（可加 `height="520"`） |
| `[rongen_contact]` | 聯絡資訊表 |
| `[rongen_churches]` | 總會各堂會一覽 |
| `[rongen_pillars]` | 路德宗信仰四重點 |

---

## 技術說明

- 傳統 PHP 佈景主題（非區塊主題），不依賴 ACF、Elementor 等任何外掛。
- 純手寫 CSS，無建置流程；改完檔案存檔即生效。
- 中文字體使用 Google Fonts 的 Noto Serif TC 與 Noto Sans TC。
  若主機所在網路無法連線 Google Fonts，可在
  「外觀 → 自訂 → 榮恩堂設定 → 進階」關閉，改用系統字體。
- 地圖使用免金鑰的 Google Maps 內嵌網址；若被網路環境阻擋，
  底層會顯示地址與「在 Google 地圖開啟」連結，不會留下空白區塊。
- 內建列印樣式，週報與講道稿可直接列印。
- 需求版本：WordPress 6.2 以上、PHP 7.4 以上。

## 資料來源與查核

以下內容已與外部來源核對，可視為正確：

| 項目 | 來源 |
| --- | --- |
| 地址、電話 06-685-7444、電子郵件 | 總會官網 <https://celc.org.tw/lutheran-church/> |
| 主責牧師 魯思豪 牧師 | 同上 |
| 郵遞區號 732010、市話 06-6857444 | 本堂 2026-07-26 週報頁尾 |
| 聖禮牧師 白霈德 牧師（0975-959-112） | 同上 |
| 駐堂教師 巫奇真 教師（0986-375-031、LINE marigold1301） | 同上 |
| **主日崇拜次序（20 個項目）** | 同上，逐項抄錄 |
| 2026-07-26 證道：〈使你歡喜丟棄一切的寶貝〉／馬太福音 13:44-46／巫奇真 教師 | 同上 |
| 24 篇週報的標題與日期（2026-01-04 至 2026-07-26） | Facebook 專頁貼文，逐篇抄錄 |
| 8/8 信徒神學線上講座（主題、講員、中譯、時間、報名期限） | Facebook 專頁貼文＋週報報告事項 |
| 九月社區兒童工作、總會暑期營會 | 週報代禱事項＋Facebook 貼文 |
| 平安夜晚禱、新教會年、主日證道錄影上 YouTube | Facebook 專頁貼文 |
| 行動電話 0986-375-031、主日崇拜 10:00–11:00 | 教會 Facebook 專頁簡介 |
| 各堂會名稱、地址、電話（總會與各堂會頁） | 總會官網，逐筆比對無誤 |
| 教會歷史（1981 年起、榮民時期、轉型兒少與家庭、靈修本事工、現況約 50 人） | 《基督教今日報》2023-11-17 對萬德樹牧師的專訪 |

週報的實際發佈方式也已查核：本堂把週報**掃描成圖片發佈於 Facebook 專頁**，
標題格式為「YYYYMMDD＋節期主日＋週報」（例：`20260726聖靈降臨後第九主日週報`）。
設有聖餐的主日發的是**程序本**而非週報，標題已照原樣保留。
因此週報內容類型除了 PDF 欄位，另備有「Facebook 貼文連結」欄位，兩者填其一即可。

### 兩件需要教會確認的事

1. **牧職稱謂**：總會官網列「主責牧師：魯思豪 牧師」，但本堂週報頁尾列的是
   「聖禮牧師：白霈德 牧師」與「駐堂教師：巫奇真 教師」。網站目前**三個職分並列**，
   以週報為準呈現本堂的實際服事者。若稱謂或分工有誤，請告知後調整。
2. **地址寫法**：週報頁尾寫「仙草里 21-4 號」，Facebook 與總會官網寫
   「仙草里仙草 21 之 4 號」。網站目前採後者（較完整），僅把郵遞區號更新為六碼 732010。

### 未收錄的週報內容（刻意排除）

週報內頁含**具名的代禱事項**（含個人健康狀況）與**具名的奉獻徵信**。
這些屬於個人資料，網站**僅連向 Facebook 原貼文，不轉載**。
若教會日後要在網站上公開這類內容，建議先取得當事人同意，或改以不具名方式呈現。

## 尚待補上的內容

- **講道全文**：2026-07-26 那篇的講題、經文、講員為週報上的真實資料，
  但內文是配合版面所寫的摘要；其餘三篇為示範稿。實際講稿請由教會提供。
  另本堂已有主日證道錄影上傳 YouTube，可考慮在講道頁嵌入影片。
- **週報連結**：24 篇週報的標題與日期均為真實資料，但每篇的連結目前都指向
  Facebook 專頁首頁，而非各篇貼文的永久連結。若要逐篇精確連結，
  需登入後複製各貼文的 permalink。
- 教會實景照片（會堂內部、外觀、聚會畫面）—— 目前以十字底紋佔位。
- 教會標誌（Logo）。
- 奉獻頁的實際帳戶資料。
- 平日查經與禱告會的確切時間（目前寫為「依當期公告」）。
- 交通方式頁的公車路線僅為一般性描述，建議由熟悉在地路線的同工校對。
- 教會歷史段落請由教會確認現況（萬德樹牧師的服事年資引自 2023 年報導）。
