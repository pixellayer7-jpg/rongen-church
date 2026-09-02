import { renderHomeEn, renderWorshipEn } from './preview/render-en.mjs'
import { renderHome } from './preview/render.mjs'

const en = renderHomeEn()
const zh = renderHome()
if (!en.includes('lang="en"')) throw new Error('EN lang missing')
if (!en.includes('/en/worship/')) throw new Error('EN worship link missing')
if (!en.includes('og:title')) throw new Error('EN og missing')
if (!en.includes('og:image')) throw new Error('EN og:image missing')
if (!zh.includes('lang-switch')) throw new Error('ZH switcher missing')
if (!zh.includes('/en/')) throw new Error('ZH→EN link missing')
if (!zh.includes('og:title')) throw new Error('ZH og missing')
if (!zh.includes('og:image')) throw new Error('ZH og:image missing')
if (!zh.includes('name="description"')) throw new Error('ZH description missing')
renderWorshipEn()
console.log('preview bilingual smoke OK')
