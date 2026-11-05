import os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/..")
s = open('i7a-src.html', encoding='utf-8').read()
def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:70])
    s = s.replace(a, b)

rep('@media(min-width:1080px) and (max-width:1279px){.telt{position:absolute!important;width:1px!important;height:1px!important;clip:rect(0 0 0 0)!important;overflow:hidden!important}}\n@media(min-width:1280px){.telt{position:static;width:auto;height:auto;clip:auto;overflow:visible}}\n@media(max-width:1079px){.telt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}',
    '.telt{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n@media(min-width:1500px){.telt{position:static;width:auto;height:auto;clip:auto;overflow:visible}}\n.nav a,.ddb,.hbtn,.tel{white-space:nowrap}')
rep('.cta-band h2{max-width:18em;color:var(--on-band)}', '.cta-band h2{max-width:20em;color:var(--on-band);font-size:clamp(26px,3vw,36px)}\n.cta-band .bi>div:first-child{flex:1 1 380px;min-width:0}\n.cta-band .acts{flex:0 0 auto}')
rep('.cp-sel{font:500 13px/1.4 var(--font-mono);color:var(--ink);min-height:20px}', '.cp-sel{font:500 13px/1.4 var(--font-mono);color:var(--ink);min-height:20px;margin:12px 0 10px}')
rep('        <p class="eyebrow" data-en="Colours">Cores</p>\n', '')
rep('        <p class="eyebrow" data-en="Enquiry">Pedido</p>\n', '')
open('i7a-src.html', 'w', encoding='utf-8').write(s)
print('ok')
