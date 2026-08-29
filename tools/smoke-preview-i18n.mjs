import { renderHomeEn, renderWorshipEn } from './preview/render-en.mjs'
import { renderHome } from './preview/render.mjs'

const en = renderHomeEn()
const zh = renderHome()
if (!en.includes('lang="en"')) throw new Error('EN lang missing')
if (!en.includes('/en/worship/')) throw new Error('EN worship link missing')
if (!zh.includes('lang-switch')) throw new Error('ZH switcher missing')
if (!zh.includes('/en/')) throw new Error('ZH→EN link missing')
renderWorshipEn()
console.log('preview bilingual smoke OK')
