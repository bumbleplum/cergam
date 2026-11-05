const {chromium}=require('/Users/globe/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const URL='file://'+require('path').resolve(__dirname,'..')+'/i7a.html';
(async()=>{
 const b=await chromium.launch({executablePath:exe});
 for(const w of [375,1440]) for(const h of ['top','agua','cores','orcamento']){
  const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();
  await p.goto(URL+'#'+h);await p.waitForTimeout(700);
  const r=await p.evaluate(()=>[...document.querySelectorAll('a,button,input:not([type=radio]),select,textarea,label.cp')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&!e.closest('[hidden]')&&(r.height<43.5||r.width<43.5)&&!e.classList.contains('skip')&&!(e.tagName==='A'&&e.closest('p,li,dd,td,span.line,.a,.faq-more')&&e.closest('p,td,.a,dd,.alt-links,.pn')&&r.height>=24&&false)}).map(e=>e.tagName+'.'+e.className+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)+' "'+(e.textContent||'').trim().slice(0,28)+'"'));
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
  console.log(w,h,'scrollW',sw,r.length?r.join(' | '):'ok');
 }
 await b.close();
})();
