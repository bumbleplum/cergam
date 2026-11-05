const {chromium}=require('/Users/globe/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
(async()=>{const b=await chromium.launch({executablePath:exe});const p=await b.newPage({viewport:{width:1600,height:1840}});
await p.goto('file://'+__dirname+'/sheet.html');await p.waitForTimeout(2500);
for(const f of p.frames()){try{await f.evaluate(async()=>{for(let y=0;y<2000;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}scrollTo(0,0)})}catch(e){}}
await p.waitForTimeout(800);await p.screenshot({path:__dirname+'/../i7a-mobile.png'});await b.close()})();
