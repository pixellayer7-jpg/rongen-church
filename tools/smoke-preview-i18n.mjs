import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderHomeEn, renderWorshipEn } from './preview/render-en.mjs'
import { renderHome } from './preview/render.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const themeCss = fs.readFileSync(
	path.join(__dirname, '../wp-content/themes/rongen/assets/css/theme.css'),
	'utf8'
)
if (!themeCss.includes('@media print')) throw new Error('theme print CSS missing')
if (!themeCss.includes('.no-print')) throw new Error('theme .no-print missing')

const en = renderHomeEn()
const zh = renderHome()
if (!en.includes('lang="en"')) throw new Error('EN lang missing')
if (!en.includes('/en/worship/')) throw new Error('EN worship link missing')
if (!en.includes('og:title')) throw new Error('EN og missing')
if (!en.includes('og:image')) throw new Error('EN og:image missing')
if (!en.includes('print-hint')) throw new Error('EN print hint missing')
if (!zh.includes('lang-switch')) throw new Error('ZH switcher missing')
if (!zh.includes('/en/')) throw new Error('ZH→EN link missing')
if (!zh.includes('og:title')) throw new Error('ZH og missing')
if (!zh.includes('og:image')) throw new Error('ZH og:image missing')
if (!zh.includes('name="description"')) throw new Error('ZH description missing')
if (!zh.includes('print-hint')) throw new Error('ZH print hint missing')
renderWorshipEn()
console.log('preview bilingual smoke OK')
