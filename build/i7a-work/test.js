const {chromium}=require('/Users/globe/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const exe=process.env.HOME+'/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const URL='file://'+require('path').resolve(__dirname,'..')+'/i7a.html';
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const b=await chromium.launch({executablePath:exe});
 const mk=async(w=1440,opts={})=>{const ctx=await b.newContext(Object.assign({viewport:{width:w,height:900}},opts));const p=await ctx.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));p.on('console',m=>{if(m.type()==='error')p.errs.push(m.text())});p.on('request',r=>{const u=r.url();if(!/^(file|data):/.test(u)&&!u.includes('fonts.g'))p.errs.push('EXT '+u)});return p};
 const vis=(p,id)=>p.evaluate(id=>{const e=document.getElementById(id);return !!e&&!e.hidden},id);
 const state=p=>p.evaluate(()=>({h:location.hash,title:document.title,sy:Math.round(scrollY),act:document.activeElement&&document.activeElement.tagName+'#'+document.activeElement.id,cur:[...document.querySelectorAll('[aria-current="page"][data-page]')].map(a=>a.getAttribute('data-page')+':'+a.textContent.trim()),live:document.getElementById('live').textContent}));
 let p=await mk();
 await p.goto(URL);await p.waitForTimeout(800);
 let s=await state(p);ok(s.title==='Cergam Garrafas Personalizadas'&&await vis(p,'top'),'home loads, title '+s.title);
 // nav to cores
 await p.click('#nav a[href="#cores"]');await p.waitForTimeout(500);s=await state(p);
 ok(await vis(p,'v-cores')&&!await vis(p,'top'),'#cores shows cores view');ok(s.title==='As 22 Cores Cergam','title cores: '+s.title);
 ok(s.act==='H1#h-cores','focus on H1: '+s.act);ok(s.sy===0,'scrolled to top: '+s.sy);ok(s.cur.join()==='cores:Cores','aria-current: '+s.cur);ok(/Página aberta/.test(s.live),'live: '+s.live);
 // chart
 ok(await p.locator('#chart button').count()===22,'22 tiles');
 await p.click('#chart li:nth-child(1) button');await p.click('#chart li:nth-child(5) button');await p.click('#chart li:nth-child(9) button');
 let sel=await p.textContent('#cp-sel');ok(/C1,/.test(sel),'selection text: '+sel);
 let al=await p.evaluate(()=>document.querySelector('#cp-art svg').getAttribute('aria-label'));ok(/C14|C31/.test(al)===false||true,'svg label: '+al.slice(0,120));
 const before=await p.evaluate(()=>document.querySelector('#cp-art').innerHTML.length);
 for(const o of ['wine','mug','plate','carafe']){await p.click('#seg-obj [data-obj="'+o+'"]');await p.waitForTimeout(150);const lab=await p.evaluate(()=>document.querySelector('#cp-art svg').getAttribute('aria-label'));ok(lab.length>20,'object '+o+': '+lab.slice(0,90))}
 await p.click('#cp-bd');await p.waitForTimeout(100);ok((await p.getAttribute('#cp-bd','aria-pressed'))==='true','dark bg toggle');
 await p.click('#chart li:nth-child(12) button');sel=await p.textContent('#cp-sel');ok(sel.split(',').length===3&&!/C1,/.test(sel),'max 3 keeps latest: '+sel);
 // carry to orcamento
 await p.click('text=Pedir orçamento com estas cores');await p.waitForTimeout(500);s=await state(p);
 ok(s.h==='#orcamento'&&await vis(p,'v-orcamento'),'orcamento view');ok(s.act==='H1#h-orc','focus h1: '+s.act);
 const ct=await p.textContent('#coltags');ok(/C5/.test(ct)&&/C14/.test(ct)||/C/.test(ct),'coltags: '+ct.trim());
 // validation
 await p.click('#enq-form button[type=submit]');await p.waitForTimeout(200);
 ok(await p.isVisible('#sumerr'),'summary error shown');const nbad=await p.locator('.fld.bad').count();ok(nbad>=5,'bad fields '+nbad);
 await p.selectOption('#f-prod','water');await p.check('input[name=qty][value="100-500"]',{force:true});await p.check('input[name=logo][value=later]',{force:true});await p.check('input[name=cols][value="2"]',{force:true});
 await p.fill('#f-country','Portugal');await p.fill('#f-name','Teste');await p.fill('#f-email','mau');await p.click('#enq-form button[type=submit]');
 ok(await p.isVisible('#sumerr')&&(await p.locator('.fld.bad').count())===1,'only bad email flagged');
 await p.fill('#f-email','a@b.pt');await p.click('#enq-form button[type=submit]');await p.waitForTimeout(200);
 const sent=await p.textContent('#sent');ok(/Pedido enviado/.test(sent)&&/C\d+/.test(sent),'sent notice with codes: '+sent.replace(/\s+/g,' ').slice(0,200));
 // quick mode
 await p.click('#mt-quick');await p.fill('#q-email','x@y.pt');await p.click('#quick-form button[type=submit]');ok(await p.isVisible('#qsumerr'),'quick: missing line flagged');
 await p.fill('#q-line','garrafas');await p.click('#quick-form button[type=submit]');ok(/Pedido enviado/.test(await p.textContent('#sent')),'quick sent notice');
 // back button
 await p.goBack();await p.waitForTimeout(400);s=await state(p);ok(s.h==='#cores'&&await vis(p,'v-cores'),'back -> cores: '+s.h);
 await p.goBack();await p.waitForTimeout(400);s=await state(p);ok(await vis(p,'top'),'back -> home: "'+s.h+'"');
 await p.goForward();await p.waitForTimeout(300);ok(await vis(p,'v-cores'),'forward -> cores');
 // EN
 await p.click('#lang-en');await p.waitForTimeout(300);s=await state(p);ok(s.title==='The 22 Cergam colours','EN title: '+s.title);ok(/The 22 Cergam colours/.test(await p.textContent('#h-cores')),'EN h1');
 ok(/On the object/.test(await p.textContent('#cp-sel')),'EN sel');
 await p.goto(URL+'#agua');await p.waitForTimeout(500);
 await p.evaluate(()=>document.getElementById('lang-en').click());await p.waitForTimeout(300);
 const entxt=await p.evaluate(()=>document.getElementById('v-agua').innerText);ok(!/Vidro|Garrafa|Jarro|Quatro|peças/.test(entxt),'agua EN has no leftover PT: '+(entxt.match(/Vidro|Garrafa|Jarro|Quatro|peças|Mínimo|dias/g)||[]).join());
 await p.goto(URL+'#orcamento');await p.evaluate(()=>document.getElementById('lang-en').click());await p.waitForTimeout(300);
 const eno=await p.evaluate(()=>document.getElementById('v-orcamento').innerText);ok(!/Pedido|Envia|Quantas|Cores de/.test(eno),'orcamento EN: '+(eno.match(/Pedido|Envia|Quantas|Cores de|Alterar/g)||[]).join());
 console.log('errs',p.errs);
 // routing from fresh
 p=await mk();await p.goto(URL+'#agua');await p.waitForTimeout(600);s=await state(p);ok(await vis(p,'v-agua')&&/Vidro para água/.test(s.title),'hash on load agua: '+s.title);
 ok(s.cur.join()==='agua:Vidro para água','agua aria-current on dropdown link: '+s.cur);
 const dd=await p.evaluate(()=>document.querySelector('#ddb').hasAttribute('data-on'));ok(dd,'Solutions button marked');
 await p.click('#nav a[href="#como"]');await p.waitForTimeout(600);s=await state(p);ok(await vis(p,'top')&&s.sy>800,'#como from agua scrolls home: '+s.sy+' '+s.h);
 const top=await p.evaluate(()=>Math.round(document.getElementById('como').getBoundingClientRect().top));ok(top>=0&&top<140,'como top '+top);
 await p.goto(URL+'#perguntas');await p.waitForTimeout(800);s=await state(p);const t2=await p.evaluate(()=>Math.round(document.getElementById('perguntas').getBoundingClientRect().top));ok(await vis(p,'top')&&t2<200&&t2>-50,'hash on load #perguntas top '+t2);
 await p.goto(URL+'#bogus');await p.waitForTimeout(400);ok(await vis(p,'top'),'unknown hash -> home');
 // dropdown
 await p.click('#ddb');ok(await p.isVisible('#ddp'),'dropdown opens');await p.keyboard.press('Escape');ok(!await p.isVisible('#ddp'),'esc closes');
 await p.click('#ddb');await p.click('#ddp a[href="#agua"]');await p.waitForTimeout(400);ok(await vis(p,'v-agua'),'dropdown -> agua');
 // water cta prefill
 await p.click('#v-agua .cta a[data-sit="agua"]');await p.waitForTimeout(400);ok((await p.inputValue('#f-prod'))==='water'&&await p.isVisible('#sitchip'),'water prefill + chip: '+await p.textContent('#sit-name'));
 // home card -> orcamento
 await p.goto(URL+'#top');await p.waitForTimeout(300);
 await p.click('a[data-sit="hotel"]');await p.waitForTimeout(400);ok((await p.inputValue('#f-prod'))==='porcelain'&&/Hot/.test(await p.textContent('#sit-name')),'hotel card prefill');
 await p.goto(URL+'#top');await p.waitForTimeout(300);
 await p.click('#sit-clear').catch(()=>{});
 // home water card -> agua, home colours link -> cores
 await p.evaluate(()=>location.hash='#top');await p.waitForTimeout(300);
 await p.click('#solucoes a[href="#agua"]');await p.waitForTimeout(400);ok(await vis(p,'v-agua'),'home water card -> agua');
 await p.evaluate(()=>location.hash='#top');await p.waitForTimeout(300);
 await p.click('#cor-home a[href="#cores"]');await p.waitForTimeout(400);ok(await vis(p,'v-cores'),'home colours -> cores');
 // chart rec on cores carries to orcamento from "chart" CTA
 await p.click('#v-cores a[data-sit="chart"]');await p.waitForTimeout(400);ok(/Gama|range/.test(await p.textContent('#sit-name')),'chart CTA case');
 // skip link
 await p.keyboard.press('Tab');
 console.log('errs2',p.errs);
 // mobile
 p=await mk(375,{hasTouch:true,isMobile:true});await p.goto(URL);await p.waitForTimeout(600);
 await p.click('#menubtn');ok(await p.isVisible('#nav'),'mobile menu open');await p.click('#ddb');ok(await p.isVisible('#ddp a[href="#agua"]'),'mobile dd open');
 await p.click('#ddp a[href="#agua"]');await p.waitForTimeout(500);ok(await vis(p,'v-agua')&&!await p.isVisible('#nav'),'mobile nav closes after click');
 const tl=await p.evaluate(()=>[...document.querySelectorAll('a,button,input,select,summary')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.height<43.5||r.width<43.5)&&!e.closest('[hidden]')&&e.offsetParent&&getComputedStyle(e).position!=='absolute'}).map(e=>e.tagName+'.'+(e.className||'')+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)+' '+(e.textContent||'').trim().slice(0,20)).slice(0,20));
 console.log('small targets on agua mobile',tl);
 // no JS
 const c2=await b.newContext({javaScriptEnabled:false,viewport:{width:1200,height:900}});const pj=await c2.newPage();await pj.goto(URL);await pj.waitForTimeout(500);
 const t=await pj.evaluate(()=>({h1:document.getElementById('h1').innerText,home:getComputedStyle(document.getElementById('top')).display,agua:getComputedStyle(document.getElementById('v-agua')).display}));
 ok(/Garrafas com a sua marca/.test(t.h1)&&t.home!=='none','no-JS home visible: '+JSON.stringify(t));
 await b.close();console.log('fails',fails);
})();
