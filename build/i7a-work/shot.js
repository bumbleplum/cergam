// usage: node shot.js <hash or ''> <width> <out.png> [full=1] [height] [scheme] [lang]
const {chromium}=require('/Users/globe/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const D=require('path').resolve(__dirname,'..');
const [hash,w,out,full,hh,scheme,lang]=[process.argv[2]||'',+process.argv[3],process.argv[4],process.argv[5]!=='0',+(process.argv[6]||900),process.argv[7]||'light',process.argv[8]||'pt'];
(async()=>{
 const b=await chromium.launch({executablePath:exe});
 const ctx=await b.newContext({viewport:{width:w,height:hh},colorScheme:scheme,deviceScaleFactor:1});
 const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text())});
 p.on('request',r=>{const u=r.url();if(!u.startsWith('file:')&&!u.startsWith('data:')&&!u.includes('fonts.g'))errs.push('EXT '+u)});
 await p.goto('file://'+D+'/i7a.html'+(hash?'#'+hash:''));await p.waitForTimeout(1200);
 if(lang==='en'){await p.click('#lang-en');await p.waitForTimeout(500)}
 await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(50)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(500);
 if(process.env.SEG){const sg=+process.env.SEG;let n=0;for(let y=0;y<H;y+=sg){await p.screenshot({path:D+'/i7a-work/'+out.replace('.png','')+'-'+n+'.png',fullPage:true,clip:{x:0,y,width:w,height:Math.min(sg,H-y)}});n++}}
 else await p.screenshot({path:D+'/'+out,fullPage:full});
 const sw=await p.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);
 console.log(out,'H',H,'scrollW/innerW',sw.join('/'),errs.join(' | '));
 await b.close();
})();
