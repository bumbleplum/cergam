const {chromium}=require('/Users/globe/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const D=require('path').resolve(__dirname,'..');
(async()=>{
 const b=await chromium.launch({executablePath:exe});
 for(const h of process.argv.slice(3)){
  const p=await (await b.newContext({viewport:{width:+process.argv[2],height:800}})).newPage();
  await p.goto('file://'+D+'/i7a.html#'+h);await p.waitForTimeout(1000);
  const r=await p.evaluate(()=>{const W=innerWidth,out=[];document.querySelectorAll('body *:not(svg *)').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>W+1&&getComputedStyle(e).position!=='absolute'||(r.right>W+1&&r.width>0&&e.closest('main:not([hidden])')))out.push(e.tagName+'.'+e.className+'#'+e.id+' '+Math.round(r.left)+'-'+Math.round(r.right))});return out.slice(0,14)});
  console.log(h,r.join('\n  '));
 }
 await b.close();
})();
