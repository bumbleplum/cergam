
/* ======================= v7: hash routing and three inner pages ======================= */
/* each photo is embedded once, in the home page. The inner pages borrow its src. */
$$("img[data-use]").forEach(function(im){var s=document.querySelector('img[data-ik="'+im.getAttribute("data-use")+'"]');if(s)im.src=s.getAttribute("src")});
(function(){var h="";COLORS.forEach(function(c){h+='<li class="chipt"><span class="fired" style="--c:'+c[1]+'"></span><span class="code">'+c[0]+'</span><span class="hex">'+c[1]+'</span></li>'});$("#fb-chipgrid").innerHTML=h})();

var PGS={
 home:{t:["Cergam Mesa de Comércio","Cergam Trade Desk"]},
 fabricantes:{t:["Cergam Fornecimento","Cergam Supply"]},
 amostra:{t:["Cergam Amostra e cores","Cergam Sample and colours"]},
 modelo:{t:["Cergam Ficha de produto","Cergam Product sheet"]}
};
var PGEL={};Object.keys(PGS).forEach(function(k){PGEL[k]=$("#pg-"+k)});
var ROUTES={fabricantes:1,amostra:1,modelo:1};
var curPage="home";
function hasOwn(o,k){return Object.prototype.hasOwnProperty.call(o,k)}
function pageOf(el){var p=el&&el.closest?el.closest(".page"):null;return p?p.getAttribute("data-page"):null}
function setTitle(){document.title=PGS[curPage].t[lang==="pt"?0:1]}
function setNavCurrent(){$$("a[data-page]").forEach(function(a){if(a.getAttribute("data-page")===curPage)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}
function focusH1(){var h=PGEL[curPage].querySelector("h1");if(h){h.tabIndex=-1;try{h.focus({preventScroll:true})}catch(x){h.focus()}}}
function showPage(name,nav){
  var changed=name!==curPage;
  if(changed){Object.keys(PGEL).forEach(function(k){PGEL[k].hidden=(k!==name)});curPage=name;closeMenu()}
  setTitle();setNavCurrent();
  if(changed){
    refreshPage();
    if(nav){window.scrollTo(0,0);focusH1();$("#announce").textContent=S("Página: ","Page: ")+document.title.replace(/^Cergam /,"")}
  }
  return changed;
}
function route(initial){
  var h=(location.hash||"").replace(/^#/,""),name="home",target=null;
  try{h=decodeURIComponent(h)}catch(x){}
  if(hasOwn(ROUTES,h))name=h;
  else if(h===""||h==="top"||hasOwn(DK,h))name="home";
  else{var el=document.getElementById(h),pn=el?pageOf(el):null;if(pn){name=pn;target=el}}
  var changed=showPage(name,!initial);
  if(name==="home"&&hasOwn(DK,h)&&DK[h]!==cur)setDoor(DK[h],false);
  if(target)setTimeout(function(){goto(target)},initial?60:30);
  else if(changed&&!initial)window.scrollTo(0,0);
}
window.addEventListener("hashchange",function(){route(false)});

/* ---- generic helpers for the inner pages ---- */
function dateCheck(ds,st,ap){
  ap.textContent="";var d=ds?parseISO(ds):null;
  if(!d){st.className="status";st.textContent="";return}
  var e1=addBD(today,12),e2=addBD(today,25),cls,tag,msg,la=addBD(d,-25);
  ap.textContent=S("Aprovar a arte até ","Approve the artwork by ")+(la>=today?fmt(la):S("já passou","passed"))+".";
  if(d<e1){cls="warn";tag=S("Cedo demais","Too early");msg=S("A data é anterior ao prazo mais curto. Pode não dar. Ligue antes de enviar.","The date is earlier than the shortest lead time. It may not work. Call before you send.")}
  else if(d<=e2){cls="warn";tag=S("Justo","Tight");msg=S("A data cai dentro da janela habitual. Convém aprovar a arte já.","The date falls inside the usual window. Approve the artwork soon.")}
  else{cls="ok";tag=S("Cabe","Fits");msg=S("A data cabe no prazo habitual, com folga.","The date fits the usual lead time with room to spare.")}
  st.className="status "+cls;st.innerHTML="<b>"+tag+"</b>"+msg;
}
function estLi(){var e1=addBD(today,12),e2=addBD(today,25);return ci(S("Entrega estimada, se a arte for aprovada hoje (12 a 25 dias úteis)","Estimated delivery, if the artwork is approved today (12 to 25 working days)"),false,S("De "+fmt(e1)+" a "+fmt(e2),"From "+fmt(e1)+" to "+fmt(e2)))}
function clockLi(){return ci(S("O que inicia o prazo: aprovação da arte, encomenda ou pagamento","What starts the lead time: artwork approval, order or payment"),true)}
function wire(formSel,fn){var f=$(formSel);f.addEventListener("input",fn);f.addEventListener("change",fn)}
function hideDone(){$$(".done").forEach(function(d){d.hidden=true})}

/* ---- #fabricantes ---- */
function fbCount(){
  var rows=$$("#fb-rules tbody tr"),n=0;rows.forEach(function(r){if(r.querySelector(".tbc"))n++});
  $("#fb-count").textContent=S(n+" de "+rows.length+" regras ainda por fechar com a Cergam.",n+" of "+rows.length+" rules still to settle with Cergam.");
}
function renderFabRack(){
  if(!CG)return;var host=$("#fb-rack-art");if(!host.clientWidth)return;
  var narrow=narrowMQ&&narrowMQ.matches;
  CG.batch(host,{object:"carafe",glass:"clear",liquid:"water",fill:.7,colours:["C31","C15"],logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),backdrop:"paper",size:host.clientWidth,count:narrow?6:12,aspect:narrow?.6:.26,
    label:S("Imagem de conceito, não fotografia","Concept image, not a photograph"),
    alt:S("Imagem de conceito, não fotografia: fila de garrafas de vidro iguais, com o mesmo logótipo nas mesmas duas cores, em duas encomendas.","Concept image, not a photograph: a row of identical glass bottles with the same logo in the same two colours, in two orders.")});
}
var frPairs=[];
function frRender(){
  var m=$("#fr-model").value.trim(),cs=$("#fr-cols").value.trim(),q=$("#fr-qty").value,ds=$("#fr-date").value,r=[];
  r.push([S("Pedido","Request"),S("Igual à última encomenda","Same as the last order")]);
  r.push([S("Para","For"),S("fabricante de equipamento de água","water equipment maker")]);
  r.push([S("Modelo ou referência","Model or reference"),m||S("por indicar","to be given")]);
  if(cs)r.push([S("Cores","Colours"),cs]);
  if(q)r.push([S("Quantidade","Quantity"),q]);
  r.push([S("Preciso das peças até","I need the pieces by"),ds?fmt(parseISO(ds)):S("sem data","no date")]);
  frPairs=r;$("#fr-sum").innerHTML=dl(r);
  $("#fr-clist").innerHTML=estLi()+clockLi()+ci(S("Mesma arte e mesmas cores da última encomenda","Same artwork and colours as the last order"),true)+ci(S("Antecedência recomendada para repetir","Recommended notice for a repeat order"),true)+ci(S("Tolerância de cor entre lotes","Colour tolerance between batches"),true);
}
wire("#fr-form",frRender);
wireCopy("#fr-copy",function(){return pairsText(frPairs)},"#fr-sum","#fr-copied");
$("#fr-date").min=iso(today);
$("#fr-form").addEventListener("submit",function(ev){
  ev.preventDefault();var ok=true,first=null;
  function chk(r,fid){if(!r&&!first)first=fid;ok=ok&&r}
  chk(setErr("e-fr-model","fr-model",$("#fr-model").value.trim()?"":S("Indique o modelo ou a referência da última encomenda.","Enter the model or reference from the last order.")),"fr-model");
  chk(setErr("e-fr-date","fr-date",$("#fr-date").value?"":S("Escolha a data em que precisa das peças.","Choose the date you need the pieces.")),"fr-date");
  chk(setErr("e-fr-email","fr-email",emailMsg($("#fr-email").value)),"fr-email");
  var d=$("#fr-done");if(!ok){d.hidden=true;$("#"+first).focus();return}
  var L=[S("Igual à última encomenda","Same as the last order"),S("Modelo: ","Model: ")+$("#fr-model").value.trim()];
  if($("#fr-cols").value.trim())L.push(S("Cores: ","Colours: ")+$("#fr-cols").value.trim());
  if($("#fr-qty").value)L.push(S("Quantidade: ","Quantity: ")+$("#fr-qty").value);
  L.push(S("Data: ","Date: ")+fmt(parseISO($("#fr-date").value)));L.push("Email: "+$("#fr-email").value.trim());
  $("#fr-done-pre").textContent=L.join("\n");d.hidden=false;d.focus();
});

var FEPROD={water:{pt:"garrafas de vidro para água",en:"glass bottles for water"},carafe:{pt:"jarros ou carafes de vidro",en:"glass carafes"},other:{pt:"outra peça de vidro",en:"another glass piece"},unsure:{pt:"peças de vidro, por definir",en:"glass pieces, to be decided"}};
var fePairs=[];
function feRender(){
  var p=FEPROD[$("#fe-prod").value],q=val("feqty"),c=val("fecols"),fd=$("#fe-first").value,tot=$("#fe-total").value.trim(),ct=$("#fe-contract").value.trim(),r=[];
  r.push([S("Para","For"),S("fabricante de equipamento de água, fornecimento repetido","water equipment maker, repeat supply")]);
  r.push([S("Produto","Product"),p[lang]]);
  r.push([S("Quantidade","Quantity"),QTY[q][lang]]);
  r.push([S("Cores no logótipo","Colours in the logo"),colsText(c)]);
  if(ct)r.push([S("Contrato ou projeto","Contract or project"),ct]);
  if(tot)r.push([S("Total e frequência","Total and frequency"),tot]);
  r.push([S("Primeira entrega","First delivery"),fd?fmt(parseISO(fd)):S("sem data","no date")]);
  fePairs=r;$("#fe-sum").innerHTML=dl(r);
  $("#fe-clist").innerHTML=estLi()+clockLi()+ci(S("Mínimo em vidro: 24 peças. O site indica também 12","Minimum in glass: 24 pieces. The site also says 12"),true)+ci(S("Tolerância de cor entre lotes","Colour tolerance between batches"),true)+ci(S("Regras de embalagem","Packing rules"),true)+ci(S("Lavagem em máquina: industriais indicadas no site, domésticas por confirmar","Dishwasher: industrial machines stated on the site, domestic ones to be confirmed"),true)+ci(S("Prova ou maquete antes da produção","Proof or mock-up before production"),true);
  dateCheck(fd,$("#fe-status"),$("#fe-approve"));
}
wire("#fe-form",feRender);
wireCopy("#fe-copy",function(){return pairsText(fePairs)},"#fe-sum","#fe-copied");
$("#fe-first").min=iso(today);
$("#fe-form").addEventListener("submit",function(ev){
  ev.preventDefault();var ok=true,first=null;
  function chk(r,fid){if(!r&&!first)first=fid;ok=ok&&r}
  chk(setErr("e-fe-company","fe-company",$("#fe-company").value.trim()?"":S("Indique o nome da empresa.","Enter the company name.")),"fe-company");
  chk(setErr("e-fe-country","fe-country",$("#fe-country").value.trim()?"":S("Indique o país de entrega.","Enter the delivery country.")),"fe-country");
  chk(setErr("e-fe-name","fe-name",$("#fe-name").value.trim()?"":S("Indique o seu nome.","Enter your name.")),"fe-name");
  chk(setErr("e-fe-email","fe-email",emailMsg($("#fe-email").value)),"fe-email");
  var d=$("#fe-done");
  if(!ok){d.hidden=true;$("#e-fe-form").textContent=S("Faltam dados. Corrija os campos assinalados.","Some details are missing. Fix the marked fields.");$("#"+first).focus();return}
  $("#e-fe-form").textContent="";
  var L=[S("Situação: ","Situation: ")+S("fabricante de equipamento de água","water equipment maker"),pairsText(fePairs),S("Logótipo: ","Logo: ")+$("#fe-logo").selectedOptions[0].textContent,S("Empresa: ","Company: ")+$("#fe-company").value.trim(),S("País: ","Country: ")+$("#fe-country").value.trim(),S("Nome: ","Name: ")+$("#fe-name").value.trim()+" · "+$("#fe-email").value.trim()];
  $("#fe-done-pre").textContent=L.join("\n");d.hidden=false;d.focus();
});

/* ---- #amostra: the tiles are the picker, the render is the simulator ---- */
var amSel=["C31","C15"],amMax=3;
var AMOBJ={
 carafe:{o:{object:"carafe",liquid:"water",fill:.72},pt:"garrafa de vidro para água",en:"glass bottle for water"},
 bordeaux:{o:{object:"bordeaux",liquid:"gin",fill:.8},pt:"garrafa de vidro para vinho",en:"glass wine bottle"},
 mug:{o:{object:"mug"},pt:"caneca de porcelana",en:"porcelain mug"},
 plate:{o:{object:"plate"},pt:"prato de porcelana",en:"porcelain plate"}
};
(function(){var h="";COLORS.forEach(function(c){h+='<li><button type="button" class="tile" data-code="'+c[0]+'" aria-pressed="false"><span class="ord" aria-hidden="true"></span><span class="fired" style="--c:'+c[1]+'"></span><span class="code">'+c[0]+'</span><span class="hex">'+c[1]+'</span></button></li>'});$("#am-tiles").innerHTML=h})();
function amToggle(code){
  var i=amSel.indexOf(code),msg=$("#am-msg");msg.textContent="";
  if(i>-1)amSel.splice(i,1);
  else if(amSel.length>=amMax){msg.textContent=S("Já escolheu "+amMax+" cores. Retire uma para trocar.","You have already picked "+amMax+" colours. Remove one to swap.");return}
  else amSel.push(code);
  renderSim();
}
$("#am-tiles").addEventListener("click",function(e){var b=e.target.closest?e.target.closest("button.tile"):null;if(b)amToggle(b.getAttribute("data-code"))});
$("#am-sel").addEventListener("click",function(e){var b=e.target.closest?e.target.closest("button[data-code]"):null;if(b){amToggle(b.getAttribute("data-code"));var t=$('#am-tiles .tile[data-code="'+b.getAttribute("data-code")+'"]');if(t)t.focus()}});
$("#am-clear").addEventListener("click",function(){amSel=[];$("#am-msg").textContent="";renderSim();$("#am-tiles .tile").focus()});
$("#am-obj").addEventListener("change",renderSim);
function renderSim(){
  var n=amSel.length,cfg=AMOBJ[$("#am-obj").value],host=$("#am-art");
  $$("#am-tiles .tile").forEach(function(b){var i=amSel.indexOf(b.getAttribute("data-code"));b.setAttribute("aria-pressed",i>-1?"true":"false");b.querySelector(".ord").textContent=i>-1?String(i+1):""});
  var h="";amSel.forEach(function(c,i){h+='<li><button type="button" data-code="'+c+'" aria-label="'+S("Tirar ","Remove ")+c+'"><i style="background:'+HEX[c]+'"></i>'+(i+1)+" "+c+'<span class="x" aria-hidden="true">×</span></button></li>'});
  if(!n)h='<li class="small-note" style="margin:0">'+S("Nenhuma cor escolhida.","No colour chosen.")+'</li>';
  $("#am-sel").innerHTML=h;
  var t="";amSel.forEach(function(c){t+='<li><i style="background:'+HEX[c]+'"></i>'+c+'</li>'});$("#am-tag-chips").innerHTML=t;
  $("#am-clear").hidden=!n;
  var capTxt=n?S("Amostra de conceito: "+cfg.pt+", com "+n+(n>1?" cores":" cor")+" ("+amSel.join(", ")+"). Imagem de conceito, não fotografia. Valores de ecrã.","Concept sample: "+cfg.en+", with "+n+(n>1?" colours":" colour")+" ("+amSel.join(", ")+"). Concept image, not a photograph. Screen values."):S("Escolha 1 a 3 cores para ver a peça.","Pick 1 to 3 colours to see the piece.");
  $("#am-cap").textContent=capTxt;
  if(!n){host.className="spec-art empty";host.innerHTML=S("Escolha 1 a 3 cores para ver a peça.","Pick 1 to 3 colours to see the piece.");return}
  if(!CG)return;
  host.className="spec-art";host.innerHTML="";
  var w=host.clientWidth;if(!w)return;
  var compact=window.innerWidth<900;
  var o={glass:"clear",colours:amSel.slice(),logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),backdrop:"paper",size:w,aspect:compact?1:0.8,logoScale:1.14,
    label:S("Imagem de conceito, não fotografia","Concept image, not a photograph"),
    alt:S("Imagem de conceito, não fotografia: "+cfg.pt+" com um logótipo de exemplo em "+n+(n>1?" cores.":" cor."),"Concept image, not a photograph: "+cfg.en+" with a sample logo in "+n+(n>1?" colours.":" colour."))};
  for(var k in cfg.o)o[k]=cfg.o[k];
  CG.render(host,o);
}
function askSample(){
  if(DOORS[cur].k!=="outro")setDoor(DK.outro,false);
  openSend("quick",false);
  var codes=amSel.length?" ("+amSel.join(", ")+")":"";
  $("#q-line").value=S("Quero ver uma amostra das cores"+codes+". Pedido a confirmar com a Cergam.","I would like to see a sample of the colours"+codes+". Request to be confirmed with Cergam.");
  if(location.hash==="#ficha")route(false);else location.hash="#ficha";
  setTimeout(function(){try{$("#q-email").focus({preventScroll:true})}catch(x){}},reduce?60:500);
}
$("#am-ask").addEventListener("click",askSample);$("#am-ask2").addEventListener("click",askSample);

/* ---- #modelo ---- */
function renderMdl(){
  var host=$("#md-art"),w=host.clientWidth;if(!w||!CG)return;
  CG.render(host,{object:"carafe",glass:"clear",liquid:"water",fill:.72,colours:["C31","C15"],logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),backdrop:"paper",size:w,aspect:.8,logoScale:1.14,
    label:S("Imagem de conceito, não fotografia","Concept image, not a photograph"),
    alt:S("Imagem de conceito, não fotografia: garrafa de vidro para água com um logótipo de exemplo em duas cores. Não representa um modelo real.","Concept image, not a photograph: a glass bottle for water with a sample logo in two colours. It does not show a real model.")});
  $("#md-cap").textContent=S("Imagem de conceito, não fotografia. Não representa um modelo real.","Concept image, not a photograph. It does not show a real model.");
}
var mdPairs=[];
function mdRender(){
  var q=val("mdqty"),c=val("mdcols"),ds=$("#md-date").value,r=[];
  r.push([S("Modelo","Model"),S("garrafa de vidro para água, modelo de exemplo (referência por indicar)","glass bottle for water, example model (reference to be given)")]);
  r.push([S("Quantidade","Quantity"),QTY[q][lang]]);
  r.push([S("Cores no logótipo","Colours in the logo"),colsText(c)]);
  r.push([S("Preciso das peças até","I need the pieces by"),ds?fmt(parseISO(ds)):S("sem data","no date")]);
  mdPairs=r;$("#md-sum").innerHTML=dl(r);
  $("#md-clist").innerHTML=estLi()+clockLi()+ci(S("Mínimo para este modelo: por preencher na ficha","Minimum for this model: still blank on the sheet"),true)+ci(S("Referência e medidas deste modelo","Reference and measurements of this model"),true);
  dateCheck(ds,$("#md-status"),$("#md-approve"));
}
wire("#md-form",mdRender);
wireCopy("#md-copy",function(){return pairsText(mdPairs)},"#md-sum","#md-copied");
$("#md-date").min=iso(today);
$("#md-form").addEventListener("submit",function(ev){
  ev.preventDefault();
  var m=emailMsg($("#md-email").value),d=$("#md-done");
  if(!setErr("e-md-email","md-email",m)){d.hidden=true;$("#md-email").focus();return}
  $("#md-done-pre").textContent=pairsText(mdPairs)+"\nEmail: "+$("#md-email").value.trim();d.hidden=false;d.focus();
});

/* ---- refresh on show, language and resize ---- */
function refreshPage(){
  if(curPage==="home"){maybeSpec(true);if(rackDone)renderRack();if(heroRackDone)renderHeroRack()}
  else if(curPage==="fabricantes"){renderFabRack()}
  else if(curPage==="amostra"){renderSim()}
  else if(curPage==="modelo"){renderMdl()}
}
function v7lang(){
  setTitle();fbCount();frRender();feRender();mdRender();renderSim();hideDone();
  if(curPage!=="home")refreshPage();
}
var rz7=0,rzW=window.innerWidth;
window.addEventListener("resize",function(){clearTimeout(rz7);rz7=setTimeout(function(){if(window.innerWidth!==rzW){rzW=window.innerWidth;if(curPage!=="home")refreshPage()}},150)});
fbCount();frRender();feRender();mdRender();renderSim();
/* skip link: go to the current page's heading */
$("#skip").addEventListener("click",function(e){e.preventDefault();focusH1();var h=PGEL[curPage].querySelector("h1");if(h)h.scrollIntoView(true)});
