import os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/..")
s = open('i7a-src.html', encoding='utf-8').read()
def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:70])
    s = s.replace(a, b)

# noscript
rep('<noscript><p style="padding:16px">Cergam, +351 21 9862 540, info@cergam.pt</p></noscript>',
    '<noscript><style>.view[hidden]{display:block!important}</style><p style="padding:16px">Cergam, +351 21 9862 540, info@cergam.pt</p></noscript>')

# ---- language
rep('''  renderAll();renderSw();renderSel();updateSit();clearErrors();
  if(sentOn)showSent(lastSent);
}''', '''  renderAll();renderPickers();renderSel();updateSit();clearErrors();applyTitle();
  if(sentOn)showSent(lastSent);
}''')

# ---- menu
a = s.index('/* ---------- menu ---------- */'); b = s.index('/* ---------- concept renders ---------- */')
s = s[:a] + '''/* ---------- menu and Solutions disclosure ---------- */
var mb=$("#menubtn"),nav=$("#nav"),ddb=$("#ddb"),ddp=$("#ddp");
function closeMenu(){nav.classList.remove("open");mb.setAttribute("aria-expanded","false")}
function closeDd(){ddp.hidden=true;ddb.setAttribute("aria-expanded","false")}
mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
ddb.addEventListener("click",function(){var o=ddp.hidden;ddp.hidden=!o;ddb.setAttribute("aria-expanded",o)});
$$("a",nav).forEach(function(a){a.addEventListener("click",function(){closeMenu();closeDd()})});
document.addEventListener("click",function(e){if(!ddp.hidden&&!$("#dd").contains(e.target))closeDd()});
$("#dd").addEventListener("focusout",function(e){if(!ddp.hidden&&e.relatedTarget&&!$("#dd").contains(e.relatedTarget))closeDd()});
document.addEventListener("keydown",function(e){
  if(e.key!=="Escape")return;
  if(!ddp.hidden){closeDd();ddb.focus();return}
  if(nav.classList.contains("open")){closeMenu();mb.focus()}
});

''' + s[b:]

# ---- renders
rep('function renderAll(){renderHero();renderCards();renderColour()}', '''var RNG=[
 {o:{object:"swing",glass:"clear",liquid:"water",fill:.7,colours:["C29"],logo:"geometric",text:["A SUA MARCA","YOUR BRAND"]},pt:"garrafa de fecho de mola com um logótipo de exemplo a azul",en:"swing-top bottle with a sample logo in blue"},
 {o:{object:"carafe",glass:"clear",liquid:"water",fill:.7,colours:["C31"],logo:"geometric",text:["A SUA MARCA","YOUR BRAND"]},pt:"jarro de vidro com um logótipo de exemplo a azul-escuro",en:"glass carafe with a sample logo in dark blue"},
 {o:{object:"flask",glass:"clear",liquid:"water",fill:.7,colours:["C14"],logo:"geometric",text:["A SUA MARCA","YOUR BRAND"]},pt:"garrafa de vidro com um logótipo de exemplo a laranja",en:"glass bottle with a sample logo in orange"}
];
function renderRange(){
  if(!CG)return;
  $$("[data-rng]").forEach(function(h){
    var c=RNG[+h.getAttribute("data-rng")],b=box(h);if(!b[0])return;
    var o={backdrop:"paper",size:b[0],aspect:b[0]/b[1],label:LBL(),alt:S("Imagem de conceito, não fotografia: ","Concept image, not a photograph: ")+S(c.pt,c.en)+"."};
    for(var k in c.o)o[k]=c.o[k];o.text=S(c.o.text[0],c.o.text[1]);
    CG.render(h,o);fit(h);
  });
}
function renderAgua(){
  if(!CG)return;var h=$("#agua-art"),b=box(h);if(!b[0]||!b[1])return;
  CG.render(h,{object:"carafe",count:4,glass:"clear",liquid:"water",fill:.72,colours:["C31","C14"],logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),
    backdrop:"paper",size:b[0],aspect:b[1]/b[0],logoScale:1.1,label:LBL(),
    alt:S("Imagem de conceito, não fotografia: quatro jarros de vidro iguais com o mesmo logótipo de exemplo.","Concept image, not a photograph: four identical glass carafes with the same sample logo.")});
  fit(h);h.removeAttribute("role");h.removeAttribute("aria-label");
}
var OBJ={
 carafe:{o:{object:"carafe",glass:"clear",liquid:"water",fill:.72,logo:"geometric",text:["A SUA MARCA","YOUR BRAND"],logoScale:1.2},pt:"jarro",en:"carafe"},
 wine:{o:{object:"bordeaux",glass:"green",logo:"script",text:["Quinta","Estate"],logoScale:1.15},pt:"garrafa de vinho",en:"wine bottle"},
 mug:{o:{object:"mug",logo:"crest",text:["Evento","Event"],logoScale:1.1},pt:"caneca",en:"mug"},
 plate:{o:{object:"plate",logo:"crest",text:["Mesa","Table"],logoScale:1.1},pt:"prato",en:"plate"}
};
var cpObj="carafe",cpBg="paper";
function renderCores(){
  if(!CG)return;var h=$("#cp-art"),b=box(h);if(!b[0]||!b[1])return;
  var d=OBJ[cpObj],o={colours:sel.slice(),backdrop:cpBg,size:b[0],aspect:b[0]/b[1],label:LBL(),
    alt:S("Imagem de conceito, não fotografia: "+d.pt+" com um logótipo de exemplo nas cores "+sel.join(", ")+".","Concept image, not a photograph: "+d.en+" with a sample logo in colours "+sel.join(", ")+".")};
  for(var k in d.o)o[k]=d.o[k];o.text=S(d.o.text[0],d.o.text[1]);
  CG.render(h,o);fit(h);
}
function renderAll(){renderHero();renderCards();renderColour();renderAgua();renderRange();renderCores()}''')
rep('var sel=["C31","C14"],cbBg="paper";', 'var sel=["C31","C14"],cbBg="paper",touched=false;')

# ---- swatches / pickers
a = s.index('/* ---------- swatches ---------- */'); b = s.index('/* ---------- roving tabs')
s = s[:a] + '''/* ---------- colour pickers (home swatches and the colour page chart share one selection) ---------- */
function toggleCol(code){
  var i=sel.indexOf(code);
  if(i>-1){if(sel.length>1)sel.splice(i,1)}else{sel.push(code);if(sel.length>3)sel.shift()}
  touched=true;
}
function buildPicker(ul,chart){
  ul.innerHTML="";
  COLORS.forEach(function(c,idx){
    var li=document.createElement("li"),b=document.createElement("button"),on=sel.indexOf(c[0])>-1;
    b.type="button";b.setAttribute("aria-pressed",on);
    b.setAttribute("aria-label",S("Cor ","Colour ")+c[0]+", "+c[1]);
    b.innerHTML=chart?'<span class="chip" style="background:'+c[1]+'"><span class="ord" aria-hidden="true">'+(sel.indexOf(c[0])+1)+'</span></span><span><span class="code">'+c[0]+'</span><span class="hex">'+c[1]+'</span></span>'
      :'<span class="chip" style="background:'+c[1]+'"></span><span>'+c[0]+'</span>';
    b.addEventListener("click",function(){
      toggleCol(c[0]);renderPickers();renderSel();renderColour();renderCores();
      var nb=$$("button",ul)[idx];if(nb)nb.focus();
    });
    li.appendChild(b);ul.appendChild(li);
  });
}
function renderPickers(){buildPicker($("#sw"),false);buildPicker($("#chart"),true)}
function renderSel(){
  var t=S("No jarro: ","On the carafe: ")+sel.join(", ")+S(" · máx. 3"," · max 3");
  $("#cb-sel").textContent=t;
  $("#cp-sel").textContent=S("No objeto: ","On the object: ")+sel.join(", ")+S(" · máx. 3"," · max 3");
  var p=$("#picked");p.hidden=false;p.textContent=(touched?S("Cores escolhidas na tabela: ","Colours picked in the chart: "):S("Cores de exemplo, ainda não escolheu: ","Sample colours, not chosen yet: "))+sel.join(", ");
  var ct=$("#coltags"),dots=sel.map(function(c){return'<span class="dot" style="background:'+hexOf(c)+'"></span>'}).join("");
  ct.innerHTML='<span class="dots" aria-hidden="true">'+dots+"</span><span>"+(touched?S("Cores escolhidas: ","Colours chosen: "):S("Cores de exemplo: ","Sample colours: "))+"<b>"+sel.join(", ")+'</b></span><a href="#cores">'+S("Alterar nas cores","Change in colours")+"</a>";
}
$("#bg-l").addEventListener("click",function(){cbBg="paper";$("#bg-l").setAttribute("aria-pressed","true");$("#bg-d").setAttribute("aria-pressed","false");renderColour()});
$("#bg-d").addEventListener("click",function(){cbBg="navy";$("#bg-d").setAttribute("aria-pressed","true");$("#bg-l").setAttribute("aria-pressed","false");renderColour()});
$("#cp-bl").addEventListener("click",function(){cpBg="paper";$("#cp-bl").setAttribute("aria-pressed","true");$("#cp-bd").setAttribute("aria-pressed","false");renderCores()});
$("#cp-bd").addEventListener("click",function(){cpBg="navy";$("#cp-bd").setAttribute("aria-pressed","true");$("#cp-bl").setAttribute("aria-pressed","false");renderCores()});
$$("#seg-obj button").forEach(function(b){b.addEventListener("click",function(){
  cpObj=b.getAttribute("data-obj");$$("#seg-obj button").forEach(function(x){x.setAttribute("aria-pressed",x===b)});renderCores();
})});

''' + s[b:]
# remove the old renderSel/bg handlers that lived in the swatch section are gone with it

# ---- accordion
a = s.index('/* ---------- accordion ---------- */'); b = s.index('/* ---------- situation prefill ---------- */')
s = s[:a] + '''/* ---------- accordions (one per FAQ list) ---------- */
$$(".faq").forEach(function(list){
  var qs=$$(".q",list);
  qs.forEach(function(q,i){
    q.addEventListener("click",function(){var o=q.getAttribute("aria-expanded")==="true";q.setAttribute("aria-expanded",!o);document.getElementById(q.getAttribute("aria-controls")).hidden=o});
    q.addEventListener("keydown",function(e){
      var n=-1;if(e.key==="ArrowDown")n=(i+1)%qs.length;else if(e.key==="ArrowUp")n=(i-1+qs.length)%qs.length;else if(e.key==="Home")n=0;else if(e.key==="End")n=qs.length-1;
      if(n>-1){e.preventDefault();qs[n].focus()}
    });
  });
  $$(".a a",list).forEach(function(a){a.style.display="inline-block";a.style.padding="10px 0"});
});

''' + s[b:]

# ---- situation prefill
rep(''' repeat:["Clientes que repetem","Customers who reorder","unsure"]
};''', ''' repeat:["Clientes que repetem","Customers who reorder","unsure"],
 agua:["Vidro para água","Glass for water","water"],
 chart:["Gama de cores impressa","Printed colour range","unsure"]
};''')
rep('''$$("[data-sit]").forEach(function(a){a.addEventListener("click",function(){
  sitKey=a.getAttribute("data-sit");$("#f-prod").value=SIT[sitKey][2];showMode($("#mt-full"),false);updateSit();
})});''', '''document.addEventListener("click",function(ev){
  var a=ev.target.closest&&ev.target.closest("[data-sit]");if(!a)return;
  sitKey=a.getAttribute("data-sit");$("#f-prod").value=SIT[sitKey][2];showMode($("#mt-full"),false);updateSit();
});''')

# ---- validation: codes only when chosen
rep('codes:sel.join(", "),d:d', 'codes:touched?sel.join(", "):"",d:d')
rep('[S("Cores","Colours"),opt(snap.cols,"cols")+" ("+snap.codes+")"]', '[S("Cores","Colours"),opt(snap.cols,"cols")],[S("Códigos das cores","Colour codes"),snap.codes||S("ainda não escolhidos","not chosen yet")]')

# ---- init
rep('renderSw();renderSel();updateSit();\nvar go=function(){renderAll()};', '''/* images used more than once are defined once (first occurrence holds the data), later ones copy it */
$$("img[data-dup]").forEach(function(i){var f=$('img[data-img="'+i.getAttribute("data-dup")+'"]');if(f)i.src=f.getAttribute("src")});

/* ---------- routing ---------- */
var VIEWS={agua:"v-agua",cores:"v-cores",orcamento:"v-orcamento"};
var TITLES={
 home:["Cergam Garrafas Personalizadas","Cergam Custom Bottles"],
 agua:["Vidro para água · Cergam","Glass for water · Cergam"],
 cores:["As 22 Cores Cergam","The 22 Cergam colours"],
 orcamento:["Pedir orçamento · Cergam","Request a quote · Cergam"]
};
var NAMES={home:["Início","Home"],agua:["Vidro para água","Glass for water"],cores:["As 22 Cores Cergam","The 22 Cergam colours"],orcamento:["Pedir orçamento","Request a quote"]};
var cur="home";
function hashId(){var h=location.hash.replace(/^#/,"");try{h=decodeURIComponent(h)}catch(e){}return h}
function applyTitle(){document.title=S(TITLES[cur][0],TITLES[cur][1])}
function markNav(){
  $$("[data-page]").forEach(function(a){if(a.getAttribute("data-page")===cur)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  if(cur==="agua")ddb.setAttribute("data-on","");else ddb.removeAttribute("data-on");
}
function mainOf(p){return document.getElementById(p==="home"?"top":VIEWS[p])}
function focusHead(p,id){
  var t=id&&document.getElementById(id);
  if(!t){t=$("h1",mainOf(p))}
  if(!t)return;if(!t.hasAttribute("tabindex"))t.setAttribute("tabindex","-1");
  try{t.focus({preventScroll:true})}catch(e){t.focus()}
}
function route(init){
  var h=hashId();
  if(h==="contactos")return;
  var next=VIEWS[h]?h:"home",changed=next!==cur;
  if(changed||init){
    ["home","agua","cores","orcamento"].forEach(function(p){mainOf(p).hidden=p!==next});
    cur=next;markNav();applyTitle();closeMenu();closeDd();
    renderAll();
  }
  if(next==="home"){
    var el=h&&h!=="top"?document.getElementById(h):null;
    if(el&&mainOf("home").contains(el)){if(changed)el.scrollIntoView({behavior:"instant",block:"start"})}
    else if(changed||!h||h==="top")window.scrollTo({top:0,left:0,behavior:"instant"});
    if(changed&&!init)focusHead("home",el?h:"");
  }else if(changed||init){
    window.scrollTo({top:0,left:0,behavior:"instant"});
    if(!init)focusHead(next);
  }
  if(changed&&!init){
    var lv=$("#live");lv.textContent="";
    setTimeout(function(){lv.textContent=S("Página aberta: ","Page opened: ")+S(NAMES[cur][0],NAMES[cur][1])},60);
  }
}
if("scrollRestoration" in history)history.scrollRestoration="manual";
window.addEventListener("hashchange",function(){route(false)});
$("#skip").addEventListener("click",function(ev){ev.preventDefault();focusHead(cur)});

renderPickers();renderSel();updateSit();
var go=function(){renderAll()};''')
rep('go();\nwindow.addEventListener("load",go);', 'route(true);\nwindow.addEventListener("load",go);')
open('i7a-src.html', 'w', encoding='utf-8').write(s)
print("ok")
