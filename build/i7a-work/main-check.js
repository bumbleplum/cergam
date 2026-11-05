
(function(){
"use strict";
var $=function(s,r){return(r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var lang="pt";
function S(p,e){return lang==="pt"?p:e}
var CG=window.CergamGlass;
var COLORS=[["C1","#221F20"],["C3","#929497"],["C4","#BBBDBF"],["C5","#DBDDDE"],["C6","#FEFEFE"],["C7","#C4AA78"],["C8","#551E11"],["C9","#A14726"],["C10","#CC936E"],["C11","#952A2E"],["C12","#D02129"],["C14","#F36E28"],["C15","#F3AD27"],["C16","#F4D033"],["C21","#1F5A32"],["C22","#00786E"],["C24","#318B40"],["C25","#9AC13B"],["C27","#68B9DD"],["C28","#5990CC"],["C29","#0087B4"],["C31","#003D6E"]];

/* ---------- language ---------- */
$$("[data-en]").forEach(function(e){e.setAttribute("data-pt",e.innerHTML)});
$$("[data-alt-en]").forEach(function(e){e.setAttribute("data-alt-pt",e.getAttribute("alt"))});
$$("[data-al-en]").forEach(function(e){e.setAttribute("data-al-pt",e.getAttribute("aria-label"))});
function setLang(l){
  lang=l;document.documentElement.lang=l==="pt"?"pt-PT":"en";
  $$("[data-en]").forEach(function(e){e.innerHTML=l==="pt"?e.getAttribute("data-pt"):e.getAttribute("data-en")});
  $$("[data-alt-en]").forEach(function(e){e.setAttribute("alt",l==="pt"?e.getAttribute("data-alt-pt"):e.getAttribute("data-alt-en"))});
  $$("[data-al-en]").forEach(function(e){e.setAttribute("aria-label",l==="pt"?e.getAttribute("data-al-pt"):e.getAttribute("data-al-en"))});
  $("#lang-pt").setAttribute("aria-pressed",l==="pt");$("#lang-en").setAttribute("aria-pressed",l==="en");
  renderAll();renderPickers();renderSel();updateSit();clearErrors();applyTitle();
  if(sentOn)showSent(lastSent);
}
$("#lang-pt").addEventListener("click",function(){setLang("pt")});
$("#lang-en").addEventListener("click",function(){setLang("en")});

/* ---------- menu and Solutions disclosure ---------- */
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

/* ---------- concept renders ---------- */
var CARDS=[
 {o:{object:"carafe",glass:"clear",liquid:"water",fill:.7,colours:["C31"],logo:"geometric",text:["A SUA MARCA","YOUR BRAND"]},pt:"jarro de água com um logótipo de exemplo a uma cor",en:"water carafe with a sample logo in one colour"},
 {o:{object:"bordeaux",glass:"green",colours:["C16"],logo:"script",text:["Quinta","Estate"]},pt:"garrafa de vinho verde com um logótipo de exemplo a dourado",en:"green wine bottle with a sample logo in gold"},
 {o:{object:"mug",colours:["C12"],logo:"crest",text:["Evento","Event"]},pt:"caneca de porcelana com um emblema de exemplo a vermelho",en:"porcelain mug with a sample emblem in red"},
 {o:{object:"flask",glass:"clear",colours:["C29","C14"],logo:"text",text:["AGÊNCIA","AGENCY"]},pt:"garrafa de vidro com um nome de exemplo a duas cores",en:"glass bottle with a sample name in two colours"},
 {o:{object:"plate",colours:["C31"],logo:"crest",text:["Mesa","Table"]},pt:"prato de porcelana com um emblema de exemplo a azul",en:"porcelain plate with a sample emblem in blue"},
 {o:{object:"swing",glass:"clear",colours:["C14"],logo:"geometric",text:["A SUA MARCA","YOUR BRAND"]},pt:"garrafa de fecho de mola com um logótipo de exemplo a laranja",en:"swing-top bottle with a sample logo in orange"}
];
var LBL=function(){return S("Imagem de conceito, não fotografia","Concept image, not a photograph")};
function box(el){var r=el.getBoundingClientRect();return[Math.round(r.width),Math.round(r.height)]}
var renderedW={};
function fit(host){var s=$("svg",host);if(s){s.setAttribute("preserveAspectRatio","xMidYMid slice");s.removeAttribute("height");s.style.width="100%";s.style.height="100%"}}
function renderHero(){
  if(!CG)return;var h=$("#hero-art"),b=box(h);if(!b[0]||!b[1])return;
  CG.render(h,{object:"carafe",glass:"clear",liquid:"water",fill:.72,colours:["C6","C14"],logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),
    backdrop:"colour",backdropColour:"C31",size:b[0],aspect:b[0]/b[1],logoScale:1.15,label:LBL(),
    alt:S("Imagem de conceito, não fotografia: jarro de vidro com um logótipo de exemplo a duas cores.","Concept image, not a photograph: a glass carafe with a sample logo in two colours.")});
  fit(h);h.removeAttribute("role");h.removeAttribute("aria-label");
}
function renderCards(){
  if(!CG)return;
  $$("[data-card]").forEach(function(h){
    var c=CARDS[+h.getAttribute("data-card")],b=box(h);if(!b[0])return;
    var o={backdrop:"paper",size:b[0],aspect:b[0]/b[1],label:LBL(),alt:S("Imagem de conceito, não fotografia: ","Concept image, not a photograph: ")+S(c.pt,c.en)+"."};
    for(var k in c.o)o[k]=c.o[k];
    o.text=S(c.o.text[0],c.o.text[1]);
    CG.render(h,o);
    fit(h);
  });
}
var sel=["C31","C14"],cbBg="paper",touched=false;
function hexOf(c){for(var i=0;i<COLORS.length;i++)if(COLORS[i][0]===c)return COLORS[i][1]}
function renderColour(){
  if(!CG)return;var h=$("#cb-art"),b=box(h);if(!b[0])return;
  CG.render(h,{object:"carafe",glass:"clear",liquid:"water",fill:.72,colours:sel.slice(),logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),
    backdrop:cbBg,size:b[0],aspect:b[0]/b[1],logoScale:1.2,label:LBL(),
    alt:S("Imagem de conceito, não fotografia: jarro com um logótipo de exemplo nas cores "+sel.join(", ")+".","Concept image, not a photograph: carafe with a sample logo in colours "+sel.join(", ")+".")});
  fit(h);
}
var RNG=[
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
function renderAll(){renderHero();renderCards();renderColour();renderAgua();renderRange();renderCores()}
var rzT=0,lastW=window.innerWidth;
window.addEventListener("resize",function(){clearTimeout(rzT);rzT=setTimeout(function(){if(window.innerWidth!==lastW){lastW=window.innerWidth;renderAll()}},150)});

/* ---------- colour pickers (home swatches and the colour page chart share one selection) ---------- */
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

/* ---------- roving tabs (gallery and form mode) ---------- */
function tabs(list,onShow){
  var tb=$$('[role="tab"]',list);
  function show(t,focus){
    tb.forEach(function(x){var on=x===t;x.setAttribute("aria-selected",on);x.tabIndex=on?0:-1;var p=document.getElementById(x.getAttribute("aria-controls"));if(p)p.hidden=!on});
    if(focus)t.focus();if(onShow)onShow(t);
  }
  tb.forEach(function(t,i){
    t.addEventListener("click",function(){show(t,false)});
    t.addEventListener("keydown",function(e){
      var n=-1;if(e.key==="ArrowRight")n=(i+1)%tb.length;else if(e.key==="ArrowLeft")n=(i-1+tb.length)%tb.length;else if(e.key==="Home")n=0;else if(e.key==="End")n=tb.length-1;
      if(n>-1){e.preventDefault();show(tb[n],true)}
    });
  });
  return show;
}
tabs($("#gtabs"));
var showMode=tabs($(".mode"),function(){$("#sent").hidden=true;sentOn=false});

/* ---------- accordions (one per FAQ list) ---------- */
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

/* ---------- situation prefill ---------- */
var SIT={
 water:["Fabricantes de equipamento de água","Makers of water equipment","water"],
 spirits:["Produtores de vinho, gin e azeite","Wine, gin and olive oil producers","spirits"],
 gift:["Brindes com data","Gifts with a date","unsure"],
 agency:["Agências e revendedores","Agencies and resellers","unsure"],
 hotel:["Hotéis e restaurantes","Hotels and restaurants","porcelain"],
 repeat:["Clientes que repetem","Customers who reorder","unsure"],
 agua:["Vidro para água","Glass for water","water"],
 chart:["Gama de cores impressa","Printed colour range","unsure"]
};
var sitKey="";
function updateSit(){
  var c=$("#sitchip");if(!sitKey){c.hidden=true;return}
  c.hidden=false;$("#sit-name").textContent=S(SIT[sitKey][0],SIT[sitKey][1]);
}
document.addEventListener("click",function(ev){
  var a=ev.target.closest&&ev.target.closest("[data-sit]");if(!a)return;
  sitKey=a.getAttribute("data-sit");$("#f-prod").value=SIT[sitKey][2];showMode($("#mt-full"),false);updateSit();
});
$("#sit-clear").addEventListener("click",function(){sitKey="";$("#f-prod").value="";updateSit()});

/* ---------- validation ---------- */
var sentOn=false,lastSent=null;
var today=new Date();today.setHours(0,0,0,0);
function pad(n){return(n<10?"0":"")+n}
$("#f-date").min=today.getFullYear()+"-"+pad(today.getMonth()+1)+"-"+pad(today.getDate());
function clearErrors(){$$(".fld.bad").forEach(function(f){f.classList.remove("bad")});["#sumerr","#qsumerr"].forEach(function(s){$(s).hidden=true;$(s).innerHTML=""})}
function bad(id,list,focusId,labelPt,labelEn){document.getElementById(id).classList.add("bad");list.push({f:focusId,l:S(labelPt,labelEn)})}
function summary(box,list){
  box.hidden=false;
  box.innerHTML="<b>"+S("Falta corrigir "+list.length+(list.length>1?" campos":" campo")+":","Please fix "+list.length+(list.length>1?" fields":" field")+":")+"</b><ul>"+list.map(function(x){return'<li><a href="#'+x.f+'">'+x.l+"</a></li>"}).join("")+"</ul>";
  $$("a",box).forEach(function(a){a.addEventListener("click",function(ev){ev.preventDefault();var t=document.getElementById(a.getAttribute("href").slice(1));if(t)t.focus()})});
  box.focus();
}
function radioVal(n){var r=$('input[name="'+n+'"]:checked');return r?r.value:""}
function radioLabel(n){var r=$('input[name="'+n+'"]:checked');return r?r.nextElementSibling.textContent:""}
var EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
$("#enq-form").addEventListener("submit",function(ev){
  ev.preventDefault();clearErrors();$("#sent").hidden=true;sentOn=false;var L=[];
  if(!$("#f-prod").value)bad("fl-prod",L,"f-prod","O que quer imprimir","What to print on");
  if(!radioVal("qty"))bad("fl-qty",L,$('input[name="qty"]').id||"fl-qty","Quantas peças","How many pieces");
  if(!radioVal("logo"))bad("fl-logo",L,"fl-logo","O seu logótipo","Your logo");
  if(!radioVal("cols"))bad("fl-cols",L,"fl-cols","Número de cores","Number of colours");
  var d=$("#f-date").value;if(d){var dd=new Date(d+"T00:00:00");if(dd<today)bad("fl-date",L,"f-date","Data já passou","Date has passed")}
  if(!$("#f-country").value.trim())bad("fl-country",L,"f-country","País de entrega","Delivery country");
  if(!$("#f-name").value.trim())bad("fl-name",L,"f-name","O seu nome","Your name");
  if(!EMAIL.test($("#f-email").value.trim()))bad("fl-email",L,"f-email","O seu email","Your email");
  if(L.length){
    /* radio groups: focus the first radio of the group */
    L.forEach(function(x){if(x.f.indexOf("fl-")===0){var g=document.getElementById(x.f),r=$("input",g);if(r){if(!r.id)r.id=x.f+"-first";x.f=r.id}}});
    summary($("#sumerr"),L);return}
  var snap={prod:$("#f-prod").value,qty:radioVal("qty"),logo:radioVal("logo"),cols:radioVal("cols"),codes:touched?sel.join(", "):"",d:d,country:$("#f-country").value.trim(),sit:sitKey};
  function opt(v,n){var r=$('input[name="'+n+'"][value="'+v+'"]');return r?r.nextElementSibling.textContent:v}
  lastSent=function(){var rows=[[S("Imprimir em","Print on"),$('#f-prod option[value="'+snap.prod+'"]').textContent],[S("Quantidade","Quantity"),opt(snap.qty,"qty")],[S("Logótipo","Logo"),opt(snap.logo,"logo")],[S("Cores","Colours"),opt(snap.cols,"cols")],[S("Códigos das cores","Colour codes"),snap.codes||S("ainda não escolhidos","not chosen yet")],[S("Data","Date"),snap.d||S("sem data","no date")],[S("País","Country"),snap.country]];
    if(snap.sit)rows.unshift([S("Caso","Case"),S(SIT[snap.sit][0],SIT[snap.sit][1])]);return rows};
  showSent(lastSent,true);
});
$("#quick-form").addEventListener("submit",function(ev){
  ev.preventDefault();clearErrors();$("#sent").hidden=true;sentOn=false;var L=[];
  if(!EMAIL.test($("#q-email").value.trim()))bad("fl-qemail",L,"q-email","O seu email","Your email");
  if(!$("#q-line").value.trim())bad("fl-qline",L,"q-line","Uma linha sobre o que precisa","One line on what you need");
  if(L.length){summary($("#qsumerr"),L);return}
  var qe=$("#q-email").value.trim(),ql=$("#q-line").value.trim(),lk=$("#q-link").value.trim();
  lastSent=function(){var rows=[[S("Email","Email"),qe],[S("O que precisa","What you need"),ql]];if(lk)rows.push([S("Site ou Instagram","Website or Instagram"),lk]);return rows};
  showSent(lastSent,true);
});
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function showSent(fn,focus){
  if(!fn)return;var rows=fn();sentOn=true;var s=$("#sent");s.hidden=false;
  s.innerHTML="<h3>"+S("Nada foi enviado.","Nothing was sent.")+"</h3><p>"+S("Esta página é um protótipo. O formulário foi validado, mas não envia dados a ninguém. O resumo abaixo é o que seguiria para a Cergam.","This page is a prototype. The form passed the checks, but it sends no data to anyone. The summary below is what would go to Cergam.")+"</p><dl>"+
    rows.map(function(r){return"<dt>"+esc(r[0])+"</dt><dd>"+esc(r[1])+"</dd>"}).join("")+
    "<dt>"+S("Quem responde","Who replies")+'</dt><dd><span class="tbc">'+S("nome a confirmar","name to be confirmed")+"</span></dd><dt>"+S("Prazo de resposta","Reply time")+'</dt><dd><span class="tbc">'+S("prazo a confirmar","time to be confirmed")+"</span></dd></dl>";
  if(focus)s.focus();
}
$$("input[type=radio]").forEach(function(r){r.addEventListener("change",function(){var f=r.closest(".fld");if(f)f.classList.remove("bad")})});

/* images used more than once are defined once (first occurrence holds the data), later ones copy it */
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
var go=function(){renderAll()};
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go);
route(true);
window.addEventListener("load",go);
})();
