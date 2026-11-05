
(function(){
"use strict";
var COLORS=[["C1","#221F20"],["C3","#929497"],["C4","#BBBDBF"],["C5","#DBDDDE"],["C6","#FEFEFE"],["C7","#C4AA78"],["C8","#551E11"],["C9","#A14726"],["C10","#CC936E"],["C11","#952A2E"],["C12","#D02129"],["C14","#F36E28"],["C15","#F3AD27"],["C16","#F4D033"],["C21","#1F5A32"],["C22","#00786E"],["C24","#318B40"],["C25","#9AC13B"],["C27","#68B9DD"],["C28","#5990CC"],["C29","#0087B4"],["C31","#003D6E"]];
var EN={
skip:"Skip to the order sheet",n_rules:"Rules",n_rep:"Repeat orders",n_jobs:"Work",n_col:"Sample",n_who:"Contact",
kick:"Glass and porcelain decoration · Malveira, Portugal",h1a:"Bottles with your brand.",h1b:"Always the same.",
supply:"Cergam decorates bottles, glasses, mugs and porcelain with your logo. We supply makers of water equipment, producers and companies.",
q1:"Can you?",q2:"By when?",q3:"Who replies?",
doors_h:"Another situation?",d1:"Wine or gin",d2:"Olive oil",d3:"I have a date for a gift",d4:"Tableware for a hotel or restaurant",d5:"I am already a customer",
sheet_t:"Order sheet",sheet_l:"The summary changes as you fill it",l_prod:"Product",
p_water:"Glass bottles for water",p_spirits:"Glass bottles for wine or spirits",p_oil:"Glass bottles for olive oil",p_cups:"Glasses",p_porc:"Porcelain (plates, mugs)",p_unsure:"Not sure yet",
l_qty:"Quantity",q_100:"Up to 100",q_2000:"Over 2,000",q_unsure:"Not sure",l_cols:"Number of colours in the logo",c_4:"4 or more",c_unsure:"Not sure",
l_date:"I need the pieces by",date_hint:"Optional. With no date we show the estimate only.",
est_note:"Simple estimate: working days Monday to Friday, no holidays. Not a promised date.",
go_send:"Send this sheet",go_quick:"I have nothing ready yet",send_t:"Where we send the reply",
l_logo:"Logo",o_have:"I have the file",o_later:"I will send it later",o_photo:"I only have a photo",o_none:"I do not have a logo yet",
l_country:"Delivery country",l_name:"Name",l_email:"Email",more_s:"Repeat supply (optional)",l_contract:"Contract or project, in one line",l_total:"Expected total and how often",ph_total:"e.g. 3,000 a year, 4 deliveries",l_first:"First delivery date",
l_line:"One line on what you need",l_link:"Website or Instagram<span class=\"opt\">optional</span>",optional:"optional",
submit:"Send enquiry",to_quick:"Nothing ready? Just email and one line",proto:"Prototype",done_t:"Checked. Nothing was sent.",done_p:"On a live site this copy would go by email, with the name of the person replying and the reply time:",
s_rules:"Rules",t_rules:"Order rules",rules_l:"What applies to every enquiry. Anything Cergam has not settled is shown in yellow.",th_rule:"Rule",th_know:"What we know",th_state:"Status",
r1:"Minimum, glass",r1v:"From 24 pieces. The Cergam site also says 12.",r2:"Minimum, porcelain",r2v:"48 pieces.",r3:"Lead time",r3v:"12 to 25 working days.",insite:"on site",
r4:"What starts the lead time",r4v:"Not settled: artwork approval, order or payment.",
r5:"Same colours, batch after batch",r5v:"Colours come from a fixed range, the 22 Cores Cergam, by code (C1, C8, C21 and others). Tolerance between batches is not settled. <a href=\"#amostra\">See the 22 colours</a>",
r6:"Pantone and CMYK",r6v:"Not matched exactly. You choose from the Cergam range.",r7:"Packing",r7v:"Not settled.",
r8:"Samples and proof",r8v:"Not settled: whether there is a proof before production, what it costs and how long it takes.",
r9:"Price",r9v:"Not settled what moves it: colours, quantity, product.",r10:"Washing",r10v:"Industrial machines. Domestic machines to be confirmed.",r11:"Decal firing",r11v:"580 ºC. Another listing says 620 ºC.",
s_rep:"Repeat orders",t_rep:"Repeating a supply",rep_l:"How the second and later orders should work. Each rule is still to be confirmed with Cergam.",
rp1:"Same artwork, same colour codes. Cergam keeps the data from the previous order.",rp2:"You ask with model, colours, quantity and date. You do not send the logo again.",
rp3:"Recommended notice: not settled. The usual lead time is 12 to 25 working days.",rp4:"One person always answers repeat orders.",
rep_t:"Same as the last order",l_model:"Model or reference",l_rcols:"Colours, if you know<span class=\"opt\">optional</span>",l_rqty:"Quantity, if you know<span class=\"opt\">optional</span>",l_rdate:"I need the pieces by",rep_go:"Request repeat order",
s_jobs:"Real work",t_jobs:"Real work",jobs_l:"Pieces decorated by Cergam, pinned here as specimens. Clients and quantities will only be shown with permission.",
jmeta:"Client and quantity:",
n_fab:"Factory",fab_k:"Factory proof",t_fab:"Where the pieces are decorated",fab_l:"Three Cergam production photos, with no people: the kiln entrance, the screen-printing machine, the bottle line.",
proof:"Proof",fc1:"Decorated bottles at the entrance of the firing kiln.",fc2:"Screen-printing machine running in the factory.",fc3:"Decorated bottles in rows, on their way to the kiln.",photo_tag:"Cergam photo, provisional",
jc1:"Multicolour print on glass, with small text and a QR code that stay legible.",jc2:"One-colour print on frosted glass.",jc3:"White print on dark glass.",jc4:"Black illustration on white porcelain.",loupe:"Detail",
tag_k:"Sample",tag_c:"Cergam colour",tag_l:"Batch:",tag_s:"screen values",spec_cap:"Concept sample. It changes with the product and the number of colours.",
rk_o1:"Order 1",rk_o2:"Order 2",rack_t:"Same colour, order after order.",rack_n:"Design intent, not a measurement and not a guarantee.",
bd_t:"Board, 22 screen chips",bd_n:"Each chip shows the code and the screen value. It is not a fired sample.",
tc:"Cergam technical bottle, with the colours printed and fired into the glass.",tt:"Temperature printed on the glass: 580 ºC and 620 ºC.",
s_col:"Sample",t_col:"Sample: the 22 Cores Cergam",col_l:"The 22 Cores Cergam, by code, as chips. Values are screen values, a guide only. Pantone and CMYK are not matched exactly. Official colour names: <span class=\"tbc\">a confirmar</span>",
s_who:"Who replies",t_who:"Who replies",who_l:"One person, one number, one reply time. Cergam has not given us the three fields below yet.",
who_h1:"To be named by Cergam",sl1:"Name",sl2:"Direct line",sl3:"Reply time",who_h2:"Verified contacts",sl4:"Phone",sl5:"Address",open_sheet:"Open the order sheet",open_quick:"Nothing ready? Leave just your email",
s_com:"Commitments",t_com:"What is confirmed",com_l:"Only facts published by Cergam. Everything else stays to be confirmed until Cergam answers.",c_h1:"Confirmed",c_h2:"To be confirmed with Cergam",
k1:"<span class=\"n\">1968</span>: in the industry since 1968.",k2:"<span class=\"n\">2008</span>: personalisation since 2008.",k3:"Deliveries to <span class=\"n\">40+</span> countries.",
k4:"Glass with up to <span class=\"n\">10%</span> recycled glass. Reusable bottles.",k5:"Usual lead time: <span class=\"n\">12 to 25</span> working days.",k6:"Pantone and CMYK are not matched exactly.",
u1:"Name of the person replying and reply time",u2:"Price and what moves it",u3:"Proof or mock-up before production",u4:"Dishwashers: industrial, domestic",u5:"Made Blue: official wording and figure",u6:"Customers that may be named",
f1:"Glass and porcelain decoration since 2008. In the industry since 1968.",f2:"Page prototype. No form sends data. Items marked to be confirmed depend on an answer from Cergam."
};
var EN2={rt_t:"What is your case?",rt_s:"Pick one. The sheet changes to fit your case.",ans_s:"Can you? By when? Who replies?",cyc:"See another object",call:"Talk to a person",l_client:"Which client is it for",
 cta1:"Send the logo",menu:"Menu",f_a:"1968",f_al:"in the industry since",f_bl:"countries delivered to",f_c:"2,500 m²",f_cl:"covered area",f_d:"12 to 25",f_dl:"working days.",f_dn:"What starts the clock:",
 sum_t:"Summary of the request",sum_s:"Only your own choices. You can paste this text into an email as it is.",conf_t:"What Cergam still has to confirm",copy:"Copy summary",
 a1x:"",
 r12:"Logo file",r12v:"Accepted formats and resolution: not settled.",rules_hl:"Highlighted: what matters most for your case.",
 repnote:"The Same as the last order request is at the top of the page.",repnote_a:"Go to the request",hl_sr:"highlighted for your case"};
for(var _k in EN2)EN[_k]=EN2[_k];
var TBC={pt:"a confirmar",en:"to be confirmed"};
var TBC_SPECIAL={pt:{"nome a confirmar":"nome a confirmar","prazo de resposta a confirmar":"prazo de resposta a confirmar","lote a confirmar":"lote a confirmar","lote e cozedura a confirmar":"lote e cozedura a confirmar"},en:{"nome a confirmar":"name to be confirmed","prazo de resposta a confirmar":"reply time to be confirmed","lote a confirmar":"batch to be confirmed","lote e cozedura a confirmar":"batch and firing to be confirmed"}};
var EN7={
n_fabr:"Supply",n_am:"Sample",n_mod:"Product example",bc_home:"Home",col_link:"Choose colours and see the piece",q_100_500:"100 to 500",q_500_2000:"500 to 2,000",
l_rcols0:"Colours, if you know",l_rqty0:"Quantity, if you know",dh_def:"Optional. With no date we show the estimate only.",sl_n:"[ name to be confirmed ]",sl_l:"[ number to be confirmed ]",sl_t:"[ time to be confirmed ]",
ft_pgs:"Example pages",ft_ex:"Example",ft_l1:"Supply for water equipment makers",ft_l2:"Sample and colours",ft_l3:"Product sheet",ft_home:"Home page",
fb_bc:"For water equipment makers",fb_h1a:"Supply for equipment makers",fb_h1b:"for water equipment.",
fb_sup:"Glass bottles and carafes with your logo, for your filters, purifiers and dispensers. This page shows the rules, how an order is repeated and what is still to be confirmed.",
fb_cta1:"Go to the enquiry",fb_f1:"Cergam colours, by code",fb_f2b:"12 to 25",fb_f3:"glass pieces, at least.",fb_s3:"Colours and samples",fb_s5:"Ask",
fb_doc:"Supply sheet",fb_doc_l:"Five working sections. In yellow, what Cergam has not settled yet.",
fb_t1:"Rules for a supply",fb_l1:"What applies to every enquiry from an equipment maker. Each open rule has a yellow stamp.",
fb_r1:"Minimum",fb_r1v:"Glass: from 24 pieces. The Cergam site also says 12. Porcelain: 48 pieces.",
fb_r5v:"Colours come from a fixed range of 22, by code. Tolerance between batches is not settled.",
fb_r6:"Neck and cap",fb_r6v:"Not settled: which necks and caps fit your equipment.",fb_r7v:"Not settled: type of box, pallets and protection in transport.",
fb_pk_c:"Boxes packed on pallets, ready to ship.",fb_pk_n:"This photo shows the end of the line. Packing rules for you are not defined yet.",
fb_t2:"Repeating a supply",fb_l2:"How the second and later orders should work. It is a design intent. Each rule is still to be confirmed with Cergam.",
fb_rack_n:"Twelve identical bottles, in two orders. Design intent, not a measurement and not a guarantee.",fb_rp3:"The colour repeats because the code repeats. Tolerance between batches is not settled.",
fb_t3:"Colours and samples",fb_l3:"Colours come from a range of 22, by code. For the same colour in every order, always give the same codes.",
fb_bd_n:"Screen values, not a print standard. Not a fired sample. Physical sample:",fb_to_am:"Choose colours and see the piece",fb_to_am_n:"Sample and colours page: up to three colours on a bottle, mug or plate.",
fb_t5:"Ask for a supply",fb_l5:"The usual fields, plus three for a supply that repeats. Every field accepts Not sure. Nothing is sent in this prototype.",
fe_p_carafe:"Glass carafes",fe_p_other:"Another glass piece",fe_grp:"Repeat supply",fe_company:"Company",
am_bc:"Sample and colours",am_h1a:"Sample and colours.",am_h1b:"Pick up to three and see the piece.",
am_sup:"The 22 Cores Cergam, by code. Pick one to three and see them on a bottle, mug or plate. Colours are screen colours and a guide only, not a print standard.",
am_ask:"Ask for a sample",am_f2b:"1 to 3",am_f2:"colours, or black: by quote",am_f3:"units: minimum for other colours",am_f4:"decal firing.",
am_doc:"Sample board",am_doc_l:"Screen values, not a print standard.",
am_s1:"Choose",am_t1:"Pick 1 to 3 colours",am_l1:"Tap a chip to add it to the piece. Tap again to remove it. The number on the chip is the order you use it in the logo.",
am_obj:"Object",am_o1:"Bottle for water",am_o2:"Wine bottle",am_o3:"Mug",am_o4:"Plate",am_sel:"Chosen colours",am_clear:"Clear",
am_cap_s:"Concept image, not a photograph. Screen values.",am_bn2:"Screen values are not a print standard.",
am_s2:"Honest notes",am_t2:"What a screen colour does not tell you",am_l2:"What we know and what Cergam has not confirmed yet.",
am_n2:"Not matched exactly. You choose a code from the range.",am_n3t:"Screen values",am_n3:"The hex value shows the colour on a screen. It is not a print standard or a measure of the fired colour.",am_own:"this page",
am_n4t:"Black, 1, 2 or 3 colours",am_n4:"By quote.",am_n5t:"Other colours",am_n5:"Only above 250 units, after sample and quote are approved.",
am_n6t:"Colour names",am_n6:"Official names not settled. Today there is only the code, from C1 to C31.",
am_s3:"Ask for a sample",am_t3:"Ask for a sample",am_c1:"We do not yet know whether Cergam sends physical samples, or in what form.",
am_c2:"Until there is an answer, the request goes as a question: say which colours you want to see and the team replies.",am_to_fb:"See the supply page for equipment makers",
md_bc2:"Bottles for water",md_bc3:"Example model",md_ex:"Example product page",md_ex_n:"Today's site has no pages per model.",
md_h1a:"Product sheet",md_h1b:"Glass bottle for water.",md_sup:"One page per model: what it is, the measurements, the documents and the enquiry already filled in. Every value on this page is still to be confirmed with Cergam.",
md_cta:"Order this model",md_doc:"Product sheet",md_doc_l:"Example product page. No value is real.",md_s1:"Specification",
md_t1:"Glass bottle for water <span class=\"tbc\">referência a confirmar</span>",md_l1:"The image is a concept. The table is a blank sheet: every value comes from Cergam, none was made up.",
md_tag:"Model",md_tag_c:"Example",md_ref:"Ref.:",md_th1:"Specification",md_th2:"Value",md_blank:"to be filled in",
md_s_ref:"Reference",md_s_cap:"Capacity (ml)",md_s_h:"Height (mm)",md_s_d:"Diameter (mm)",md_s_w:"Weight (g)",md_s_n:"Neck finish",md_s_c:"Glass colour",md_s_m:"Minimum",md_s_l:"Lead time",
md_gen:"General values from the site, for all models: lead time 12 to 25 working days. Minimum in glass from 24 pieces, to be confirmed (the site also says 12).",
md_docs_t:"Documents",md_d1:"Datasheet (PDF)",md_d2:"3D drawing",md_docs_n:"The documents do not exist on this page yet. Each button would link to a Cergam file.",
md_s2:"Order",md_t2:"Order sheet for this model",md_l2:"The model is already filled in. Choose the rest, copy the summary or send. Nothing is sent in this prototype.",
md_model:"Glass bottle for water, example model",md_send:"Send enquiry for this model",md_fw_t:"Summary to forward",
md_s3:"Similar",md_t3:"Similar models",md_l3:"Three blank cards. They would show models with the same neck or the same capacity.",md_thumb:"image to be confirmed",
md_s4:"How it is made",md_t4:"One page per model, from one file",md_l4:"Each model would have one data file. The file generates this page, the row in the models table and the filled-in enquiry. When Cergam sends the values, the page fills itself.",md_l4n:"All null: Cergam has given no value."
};
var TBC7={
 pt:{"referência a confirmar":"referência a confirmar","tolerância a confirmar":"tolerância a confirmar"},
 en:{"referência a confirmar":"reference to be confirmed","tolerância a confirmar":"tolerance to be confirmed"}
};
for(var _k7 in EN7)EN[_k7]=EN7[_k7];
for(var _l7 in TBC7)for(var _t7 in TBC7[_l7])TBC_SPECIAL[_l7][_t7]=TBC7[_l7][_t7];

var lang="pt";

function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function S(pt,en){return lang==="pt"?pt:en}

/* ---------- THE DATA OBJECT: one entry per situation. Every pair is [PT, EN].
 k: hash (ASCII). tab: the situation as the visitor says it. h: [line 1, line 2] of the H1. promise: the one sentence under it.
 can/when/who: the three answers. {tbc} {tbc:nome} {tbc:prazo} become hatched stamps, {tel} the phone link.
 prod/qty/cols: sheet defaults. dateEmph: the needed-by date moves to the top of the sheet. dl/dh: its label and hint.
 ctx: the "Para" line of the request summary (PT, EN) or null.
 cycle: objects the render steps through. rows: Regras rows to highlight, in order. jobs: photos for Trabalhos reais, jt their heading.
 cta: main button. trade/client: optional enquiry fields. view: order sheet, reorder form or the two-field path. ---------- */
var DEFHINT=["Opcional. Sem data, mostramos só a estimativa.","Optional. With no date we show the estimate only."];
var HOTHINT=["Com a data, a ficha mostra se cabe no prazo habitual e quando aprovar a arte.","With a date, the sheet shows whether it fits the usual lead time and when to approve the artwork."];
var DOORS=[
{k:"maquinas",n:"01",
 tab:["Preciso de garrafas para equipamento de água","I need bottles for water equipment"],
 h:[["Garrafas com a sua marca.","Bottles with your brand."],["Sempre iguais.","Always the same."]],
 promise:["Decoramos garrafas e jarros de vidro com o seu logótipo, para os seus equipamentos de água. Também copos, canecas e pratos.","We decorate glass bottles and carafes with your logo, for your water equipment. Also glasses, mugs and plates."],
 can:["Garrafas de vidro, a uma ou mais cores.","Glass bottles, in one or more colours."],
 when:["Escreva a data na ficha e vemos se cabe.","Enter your date on the sheet and we check whether it fits."],
 who:["A equipa da Cergam, em Malveira: {tel}","The Cergam team, in Malveira: {tel}"],
 prod:"water",qty:"500-2000",cols:"2",dateEmph:0,dl:["Preciso das peças até","I need the pieces by"],dh:DEFHINT,
 ctx:["equipamento de água, fornecimento repetido","water equipment, repeat supply"],
 st:["Ficha de encomenda","Order sheet"],sl:["O resumo muda ao preencher","The summary changes as you fill it"],
 cta:["Enviar o logótipo e a ficha","Send the logo and the sheet"],
 rows:["r5","r4","r3","r10","r7"],
 jobs:["agua-padrao-azulejo-A","agua-casario-fosco-A","agua-azul-fosco-B","azeite-folhas-A"],jt:["Garrafas de água decoradas","Decorated water bottles"],
 more:["Ver o fornecimento para fabricantes","See the supply page for equipment makers"],
 trade:1,view:"order"},
{k:"lancamento",n:"02",
 tab:["Vou lançar um vinho, gin ou azeite","I am launching a wine, gin or olive oil"],
 h:[["O seu vinho, gin ou azeite.","Your wine, gin or olive oil."],["Numa garrafa com o seu desenho.","In a bottle with your design."]],
 promise:["Imprimimos o seu desenho no vidro, em vez de um rótulo de papel. Séries pequenas. Diga-nos a data de engarrafamento.","We print your design on the glass, instead of a paper label. Small runs. Tell us your bottling date."],
 can:["Vinho, gin e azeite: desenho impresso no vidro.","Wine, gin and olive oil: your design printed on the glass."],
 when:["Com a data de engarrafamento, a ficha mostra se cabe.","Give your bottling date and the sheet shows whether it fits."],
 who:["A equipa da Cergam, em Malveira: {tel}","The Cergam team, in Malveira: {tel}"],
 prod:"spirits",qty:"100-500",cols:"2",dateEmph:1,dl:["Data de engarrafamento","Bottling date"],dh:HOTHINT,
 ctx:["lançamento de um vinho, gin ou azeite","launch of a wine, gin or olive oil"],
 st:["Ficha de lançamento","Launch sheet"],sl:["O resumo muda ao preencher","The summary changes as you fill it"],
 cta:["Enviar o desenho e a quantidade","Send the design and the quantity"],
 rows:["r1","r6","r8","r9","r3"],
 jobs:["vinho-ouro-preto-B","vinho-azul-floral-B","azeite-folhas-A","azeite-texto-negro-A"],jt:["Vinho, gin e azeite no vidro","Wine, gin and olive oil on glass"],
 view:"order"},
{k:"brinde",n:"03",
 tab:["Tenho uma data para um brinde","I have a date for a gift or toast"],
 h:[["Um brinde com o seu logótipo.","A gift with your logo."],["Para a sua data.","For your date."]],
 promise:["Copos e canecas decorados com o seu logótipo, em séries pequenas. Escolha a data e a ficha mostra se cabe.","Glasses and mugs decorated with your logo, in small runs. Pick the date and the sheet shows whether it fits."],
 can:["Copos de vidro e canecas de porcelana, com o seu logótipo.","Glasses and porcelain mugs, with your logo."],
 when:["Escolha a data na ficha e veja se cabe.","Pick the date on the sheet and see if it fits."],
 who:["A equipa da Cergam, em Malveira: {tel}","The Cergam team, in Malveira: {tel}"],
 prod:"cups",qty:"to100",cols:"1",dateEmph:1,dl:["Data do brinde","Date of the gift"],dh:HOTHINT,
 ctx:["brinde","gift or toast"],
 cycle:[{prod:"cups",o:{object:"tumbler"},pt:"copo de vidro",en:"drinking glass"},{prod:"porcelain",o:{object:"mug"},pt:"caneca de porcelana",en:"porcelain mug"}],
 st:["Ficha de encomenda","Order sheet"],sl:["Com a data, vemos se cabe","With the date, we see if it fits"],
 cta:["Enviar a data e o logótipo","Send the date and the logo"],
 rows:["r3","r4","r1","r2","r9"],
 jobs:["porcelana-cruz-caneca-A","porcelana-ilustracao-caneca-B","porcelana-passaro-caneca-B","copos-conhaque-serif-B"],jt:["Copos e canecas decorados","Decorated glasses and mugs"],
 view:"order"},
{k:"agencia",n:"04",
 tab:["Compro para um cliente","I buy for a client"],
 h:[["Decoramos para o seu cliente.","We decorate for your client."],["Diga-nos o briefing e a data.","Tell us the brief and the date."]],
 promise:["Garrafas, copos, canecas e loiça com o logótipo do seu cliente. Pantone e CMYK não são reproduzidos exatamente: a cor escolhe-se numa gama fixa.","Bottles, glasses, mugs and tableware with your client's logo. Pantone and CMYK are not matched exactly: you choose the colour from a fixed range."],
 can:["Garrafas, copos, canecas e loiça, com o logótipo do cliente.","Bottles, glasses, mugs and tableware, with the client's logo."],
 when:["Escreva a data de entrega ao cliente na ficha.","Enter the delivery date for your client on the sheet."],
 who:["A equipa da Cergam, em Malveira: {tel}","The Cergam team, in Malveira: {tel}"],
 prod:"unsure",qty:"100-500",cols:"unsure",dateEmph:1,dl:["Data de entrega ao cliente","Delivery date for your client"],dh:HOTHINT,
 ctx:["pedido para um cliente","request for a client"],
 cycle:[{prod:"unsure",o:{object:"swing"},pt:"garrafa de vidro",en:"glass bottle"},{prod:"porcelain",o:{object:"mug"},pt:"caneca de porcelana",en:"porcelain mug"},{prod:"spirits",o:{object:"bordeaux",liquid:"gin",fill:.8},pt:"garrafa para vinho ou espirituosos",en:"bottle for wine or spirits"},{prod:"cups",o:{object:"tumbler"},pt:"copo de vidro",en:"drinking glass"},{prod:"water",o:{object:"carafe",liquid:"water",fill:.72},pt:"garrafa para água",en:"bottle for water"},{prod:"oil",o:{object:"oil",liquid:"oil",fill:.8},pt:"garrafa para azeite",en:"bottle for olive oil"},{prod:"porcelain",o:{object:"plate"},pt:"prato de porcelana",en:"porcelain plate"}],
 st:["Ficha de encomenda","Order sheet"],sl:["Um objeto de cada vez","One object at a time"],
 cta:["Enviar o briefing","Send the brief"],
 rows:["r6","r12","r8","r9","r1","r2"],
 jobs:["tampas-dourada-B","copos-conhaque-serif-B","porcelana-passaro-caneca-B","agua-casario-fosco-A"],jt:["Peças decoradas, de vários tipos","Decorated pieces, of several kinds"],
 client:1,view:"order"},
{k:"loica",n:"05",
 tab:["Loiça para hotel ou restaurante","Tableware for a hotel or restaurant"],
 h:[["Loiça com a marca da casa.","Tableware with your venue's mark."],["Para o dia da abertura.","For opening day."]],
 promise:["Pratos, chávenas, canecas e copos com o logótipo do seu espaço, em porcelana e vidro.","Plates, cups, mugs and glasses with your venue's logo, in porcelain and glass."],
 can:["Pratos, chávenas, canecas e copos, em porcelana e vidro.","Plates, cups, mugs and glasses, in porcelain and glass."],
 when:["Marque a data de abertura na ficha.","Enter your opening date on the sheet."],
 who:["A equipa da Cergam, em Malveira: {tel}","The Cergam team, in Malveira: {tel}"],
 prod:"porcelain",qty:"to100",cols:"2",dateEmph:1,dl:["Data de abertura","Opening date"],dh:HOTHINT,
 ctx:["hotel ou restaurante","hotel or restaurant"],
 cycle:[{prod:"porcelain",o:{object:"plate"},pt:"prato de porcelana",en:"porcelain plate"},{prod:"porcelain",o:{object:"cup"},pt:"chávena de porcelana",en:"porcelain cup"}],
 st:["Ficha de encomenda","Order sheet"],sl:["Prato e chávena","Plate and cup"],
 cta:["Enviar o logótipo e a quantidade","Send the logo and the quantity"],
 rows:["r2","r10","r3","r1","r8"],
 jobs:["porcelana-cruz-caneca-A","porcelana-azulejo-A","porcelana-passaro-caneca-B","copos-conhaque-serif-B"],jt:["Porcelana e copos decorados","Decorated porcelain and glasses"],
 view:"order"},
{k:"reencomenda",n:"06",
 tab:["Já sou cliente","I am already a customer"],
 h:[["Igual à última encomenda.","Same as the last order."],["Sem recomeçar do zero.","Without starting from zero."]],
 promise:["Diga o modelo, as cores, a quantidade e a data da última encomenda.","Give the model, the colours, the quantity and the date of the last order."],
 can:["O mesmo modelo, as mesmas cores, a mesma arte.","The same model, the same colours, the same artwork."],
 when:["Escolha a data na ficha e veja se cabe.","Pick the date on the sheet and see if it fits."],
 who:["A equipa da Cergam, em Malveira: {tel}","The Cergam team, in Malveira: {tel}"],
 prod:"water",qty:"500-2000",cols:"2",dateEmph:1,dl:["Preciso das peças até","I need the pieces by"],dh:HOTHINT,
 ctx:null,
 st:["Igual à última encomenda","Same as the last order"],sl:["Modelo, cores, quantidade e data","Model, colours, quantity and date"],
 cta:["Pedir reposição","Request repeat order"],
 rows:["r5","r3","r4"],
 jobs:["agua-casario-fosco-A","azeite-folhas-A","fabrica-paletes-B","agua-padrao-azulejo-A"],jt:["Peças decoradas e embaladas","Decorated and packed pieces"],
 view:"reorder"},
{k:"outro",n:"?",
 tab:["Não sei por onde começar","I do not know where to start"],
 h:[["Não sabe por onde começar?","Not sure where to start?"],["Deixe só o email.","Just leave your email."]],
 promise:["Escreva o email e uma linha sobre o que procura. Dizemos qual é o passo seguinte.","Write your email and one line about what you need. We tell you the next step."],
 can:["Vidro e porcelana, com o seu logótipo.","Glass and porcelain, with your logo."],
 when:["Se tiver uma data, diga-a na linha.","If you have a date, put it in the line."],
 who:["A equipa da Cergam, em Malveira: {tel}","The Cergam team, in Malveira: {tel}"],
 prod:"unsure",qty:"unsure",cols:"unsure",dateEmph:0,dl:["Preciso das peças até","I need the pieces by"],dh:DEFHINT,
 ctx:null,
 st:["Não sei por onde começar","I do not know where to start"],sl:["Dois campos: email e uma linha","Two fields: email and one line"],
 cta:["Enviar email e uma linha","Send email and one line"],
 rows:["r1","r2","r3"],
 jobs:["agua-padrao-azulejo-A","vinho-ouro-preto-B","porcelana-passaro-caneca-B","azeite-folhas-A"],jt:["Trabalhos reais","Real work"],
 view:"quick"}
];
var DK={};DOORS.forEach(function(d,i){DK[d.k]=i});

/* colours: fired-chip board */
(function(){
  var h="";
  COLORS.forEach(function(c){h+='<li class="chipt"><span class="fired" style="--c:'+c[1]+'"></span><span class="code">'+c[0]+'</span><span class="hex">'+c[1]+'</span></li>'});
  $("#chipgrid").innerHTML=h;
})();

/* i18n */
$$("[data-i]").forEach(function(e){e.setAttribute("data-pt",e.innerHTML)});
$$("[data-i-ph]").forEach(function(e){e.setAttribute("data-pt-ph",e.getAttribute("placeholder"))});
$$("[data-i-alt]").forEach(function(e){e.setAttribute("data-pt-alt",e.getAttribute("alt"))});
$$("[data-alt-en]").forEach(function(e){e.setAttribute("data-pt-alt",e.getAttribute("alt"))});
function setLang(l){
  lang=l;document.documentElement.lang=l==="pt"?"pt-PT":"en";
  $$("[data-i]").forEach(function(e){var k=e.getAttribute("data-i");e.innerHTML=l==="pt"?e.getAttribute("data-pt"):(EN[k]!==undefined?EN[k]:e.getAttribute("data-pt"))});
  $$("[data-i-ph]").forEach(function(e){var k=e.getAttribute("data-i-ph");e.setAttribute("placeholder",l==="pt"?e.getAttribute("data-pt-ph"):EN[k])});
  $$("[data-i-alt]").forEach(function(e){var k=e.getAttribute("data-i-alt");e.setAttribute("alt",l==="pt"?e.getAttribute("data-pt-alt"):EN[k])});
  $$("[data-alt-en]").forEach(function(e){e.setAttribute("alt",l==="pt"?e.getAttribute("data-pt-alt"):e.getAttribute("data-alt-en"))});
  $$(".tbc").forEach(function(e){
    var t=e.getAttribute("data-k");if(!t){t=e.textContent.trim();e.setAttribute("data-k",t)}
    e.textContent=(t===TBC.pt)?TBC[l]:(TBC_SPECIAL[l][t]||t);
  });
  $$("[data-ct]").forEach(function(e){var m={c:["Código","Code"],s:["Amostra","Swatch"],h:["Ecrã","Screen"]}[e.getAttribute("data-ct")];e.textContent=l==="pt"?m[0]:m[1]});
  $("#slot-name").textContent=S("[ nome a confirmar ]","[ name to be confirmed ]");
  $("#slot-line").textContent=S("[ número a confirmar ]","[ number to be confirmed ]");
  $("#slot-time").textContent=S("[ prazo a confirmar ]","[ time to be confirmed ]");
  $("#lang-pt").setAttribute("aria-pressed",l==="pt");$("#lang-en").setAttribute("aria-pressed",l==="en");
  updateModeLabels();renderDoor();render();maybeSpec(true);if(rackDone)renderRack();if(heroRackDone)renderHeroRack();renderRepSent();clearErrors();v7lang();
}
$("#lang-pt").addEventListener("click",function(){setLang("pt")});
$("#lang-en").addEventListener("click",function(){setLang("en")});

/* dates */
function startOfDay(d){var x=new Date(d);x.setHours(0,0,0,0);return x}
function addBD(d,n){var x=startOfDay(d),dir=n<0?-1:1,c=Math.abs(n);while(c>0){x.setDate(x.getDate()+dir);var w=x.getDay();if(w!==0&&w!==6)c--}return x}
function iso(d){var m=d.getMonth()+1,dd=d.getDate();return d.getFullYear()+"-"+(m<10?"0":"")+m+"-"+(dd<10?"0":"")+dd}
function fmt(d){return d.toLocaleDateString(lang==="pt"?"pt-PT":"en-GB",{day:"numeric",month:"short",year:"numeric"})}
function parseISO(s){var p=s.split("-");return p.length===3?new Date(+p[0],+p[1]-1,+p[2]):null}
var today=startOfDay(new Date());
$("#f-date").min=iso(today);$("#r-date").min=iso(today);$("#f-first").min=iso(today);

/* order sheet */
var PROD={
 water:{pt:"garrafas de vidro para água",en:"glass bottles for water",min:24},
 spirits:{pt:"garrafas de vidro para vinho ou espirituosos",en:"glass bottles for wine or spirits",min:24},
 oil:{pt:"garrafas de vidro para azeite",en:"glass bottles for olive oil",min:24},
 cups:{pt:"copos de vidro",en:"glasses",min:24},
 porcelain:{pt:"peças de porcelana",en:"porcelain pieces",min:48},
 unsure:{pt:"peças em vidro ou porcelana",en:"glass or porcelain pieces",min:null}
};
var QTY={
 "to100":{pt:"até 100 unidades",en:"up to 100 units"},
 "100-500":{pt:"100 a 500 unidades",en:"100 to 500 units"},
 "500-2000":{pt:"500 a 2 000 unidades",en:"500 to 2,000 units"},
 "2000+":{pt:"mais de 2 000 unidades",en:"over 2,000 units"},
 "unsure":{pt:"uma quantidade ainda por definir",en:"a quantity still to be decided"}
};
function colsText(c){
  if(c==="unsure")return S("um número de cores por definir","a number of colours still to be decided");
  if(c==="1")return S("1 cor","1 colour");
  if(c==="4+")return S("4 ou mais cores","4 or more colours");
  return c+S(" cores"," colours");
}
function val(name){var e=$('input[name="'+name+'"]:checked');return e?e.value:""}
function V(t){return '<span class="v">'+t+'</span>'}
function tbcH(k){var map={nome:"nome a confirmar",prazo:"prazo de resposta a confirmar"},key=k?map[k]:"a confirmar";return '<span class="tbc" data-k="'+key+'">'+(key===TBC.pt?TBC[lang]:TBC_SPECIAL[lang][key])+'</span>'}
function X(pair){return pair[lang==="pt"?0:1].replace(/\{tbc(?::(\w+))?\}/g,function(m,k){return tbcH(k)}).replace(/\{tel\}/g,'<a href="tel:+351219862540">+351 21 9862 540</a>')}
function esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function dl(pairs){return pairs.map(function(r){return '<div><dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+'</dd></div>'}).join("")}
function pairsText(pairs){return pairs.map(function(r){return r[0]+": "+r[1]}).join("\n")}
function ci(t,tbc,v){return '<li'+(v?' class="est-i"':'')+'><span>'+t+'</span>'+(tbc?tbcH():'')+(v?'<span class="cv">'+v+'</span>':'')+'</li>'}
/* (a) the summary: only the buyer's own choices */
var sumPairs=[],repPairs=[];
function buildSummary(){
  var d0=DOORS[cur],L=lang==="pt"?0:1,p=PROD[$("#f-prod").value],q=val("qty"),c=val("cols"),ds=$("#f-date").value,cl=$("#f-client").value.trim(),r=[];
  if(d0.ctx)r.push([S("Para","For"),d0.ctx[L]]);
  if(d0.client&&cl)r.push([S("Cliente final","End client"),cl]);
  r.push([S("Produto","Product"),p[lang]]);
  r.push([S("Quantidade","Quantity"),QTY[q][lang]]);
  r.push([S("Cores no logótipo","Colours in the logo"),colsText(c)]);
  r.push([d0.dl[L],ds?fmt(parseISO(ds)):S("sem data","no date")]);
  return r;
}
/* (b) what Cergam still has to confirm: estimate from today, minimum, dishwasher wording, what starts the clock */
function confirmHTML(kind){
  var p=PROD[$("#f-prod").value],d0=DOORS[cur],e1=addBD(today,12),e2=addBD(today,25),h="";
  h+=ci(S("Entrega estimada, se a arte for aprovada hoje (12 a 25 dias úteis)","Estimated delivery, if the artwork is approved today (12 to 25 working days)"),false,S("De "+fmt(e1)+" a "+fmt(e2),"From "+fmt(e1)+" to "+fmt(e2)));
  h+=ci(S("O que inicia o prazo: aprovação da arte, encomenda ou pagamento","What starts the lead time: artwork approval, order or payment"),true);
  if(kind==="rep"){
    h+=ci(S("Mesma arte e mesmas cores da última encomenda","Same artwork and colours as the last order"),true);
    h+=ci(S("Antecedência recomendada para repetir","Recommended notice for a repeat order"),true);
    return h;
  }
  h+=ci(p.min?S("Mínimo para este produto: "+p.min+" peças","Minimum for this product: "+p.min+" pieces"):S("Mínimo: 24 peças em vidro, 48 em porcelana","Minimum: 24 pieces in glass, 48 in porcelain"),true);
  var pv=$("#f-prod").value;
  if(d0.rows.indexOf("r10")>-1||pv==="cups"||pv==="porcelain")h+=ci(S("Lavagem em máquina: industriais indicadas no site, domésticas por confirmar","Dishwasher: industrial machines stated on the site, domestic ones to be confirmed"),true);
  if(d0.rows.indexOf("r8")>-1)h+=ci(S("Prova ou maquete antes da produção","Proof or mock-up before production"),true);
  return h;
}
function renderRepSent(){
  var m=$("#r-model").value.trim(),cs=$("#r-cols").value.trim(),q=$("#r-qty").value,ds=$("#r-date").value,r=[];
  r.push([S("Pedido","Request"),S("Igual à última encomenda","Same as the last order")]);
  r.push([S("Modelo ou referência","Model or reference"),m||S("por indicar","to be given")]);
  if(cs)r.push([S("Cores","Colours"),cs]);
  if(q)r.push([S("Quantidade","Quantity"),q]);
  r.push([S("Preciso das peças até","I need the pieces by"),ds?fmt(parseISO(ds)):S("sem data","no date")]);
  repPairs=r;$("#repsum").innerHTML=dl(r);$("#repclist").innerHTML=confirmHTML("rep");
}
function render(){
  var ds=$("#f-date").value,d=ds?parseISO(ds):null,e1=addBD(today,12),e2=addBD(today,25);
  var pl=$("#prodlink"),pp=PROD[$("#f-prod").value];pl.textContent=pp.min===null?S("Ver um exemplo de ficha de produto","See an example product sheet"):S("Ver um exemplo de ficha de produto: "+pp.pt,"See an example product sheet: "+pp.en);
  sumPairs=buildSummary();$("#sumlist").innerHTML=dl(sumPairs);$("#clist").innerHTML=confirmHTML("order");
  /* the date check sits next to the date field */
  var st=$("#status"),ap=$("#approve"),cls="",msg="",tag="";ap.textContent="";
  if(d){
    var latestApprove=addBD(d,-25);
    ap.textContent=S("Aprovar a arte até ","Approve the artwork by ")+(latestApprove>=today?fmt(latestApprove):S("já passou","passed"))+".";
    if(d<e1){cls="warn";tag=S("Cedo demais","Too early");msg=S("A data é anterior ao prazo mais curto. Pode não dar. Ligue antes de enviar.","The date is earlier than the shortest lead time. It may not work. Call before you send.")}
    else if(d<=e2){cls="warn";tag=S("Justo","Tight");msg=S("A data cai dentro da janela habitual. Convém aprovar a arte já.","The date falls inside the usual window. Approve the artwork soon.")}
    else{cls="ok";tag=S("Cabe","Fits");msg=S("A data cabe no prazo habitual, com folga.","The date fits the usual lead time with room to spare.")}
    st.className="status "+cls;st.innerHTML="<b>"+tag+"</b>"+msg;
  }else if(DOORS[cur].dateEmph){st.className="status";st.innerHTML="<b>"+S("Data","Date")+"</b>"+S("Escolha a data e a ficha mostra se cabe no prazo habitual.","Choose the date and the sheet shows whether it fits the usual lead time.")}else{st.className="status";st.textContent=""}
  if(typeof maybeSpec==="function")maybeSpec(false);
}
function wireCopy(btn,getText,selSel,outSel){
  $(btn).addEventListener("click",function(){
    var t=getText(),out=$(outSel);
    function ok(){out.textContent=S("Copiado.","Copied.");setTimeout(function(){out.textContent=""},2500)}
    function fall(){
      try{var r=document.createRange();r.selectNodeContents($(selSel));var sel=window.getSelection();sel.removeAllRanges();sel.addRange(r);out.textContent=S("Texto selecionado. Copie com Ctrl+C.","Text selected. Copy with Ctrl+C.")}catch(x){out.textContent=S("Não foi possível copiar.","Could not copy.")}
    }
    try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,fall)}else fall()}catch(x){fall()}
  });
}
$("#orderform").addEventListener("change",render);
$("#orderform").addEventListener("input",function(e){if(e.target.id==="f-date")render()});
wireCopy("#copybtn",function(){return pairsText(sumPairs)},"#sumlist","#copied");
wireCopy("#repcopy",function(){return pairsText(repPairs)},"#repsum","#repcopied");
$("#repform").addEventListener("input",renderRepSent);

/* ---------- concept renders (CergamGlass, inlined) ---------- */
var CG=window.CergamGlass;
var SPEC={
 water:{o:{object:"carafe",liquid:"water",fill:.72},pt:"garrafa de vidro para água",en:"glass bottle for water"},
 spirits:{o:{object:"bordeaux",liquid:"gin",fill:.8},pt:"garrafa de vidro para vinho ou espirituosos",en:"glass bottle for wine or spirits"},
 oil:{o:{object:"oil",liquid:"oil",fill:.8},pt:"garrafa de vidro para azeite",en:"glass bottle for olive oil"},
 cups:{o:{object:"tumbler"},pt:"copo de vidro",en:"drinking glass"},
 porcelain:{o:{object:"plate"},pt:"prato de porcelana",en:"porcelain plate"},
 unsure:{o:{object:"swing"},pt:"garrafa de vidro",en:"glass bottle"}
};
var PAL=["C31","C15","C22"];
var HEX={};COLORS.forEach(function(c){HEX[c[0]]=c[1]});
function nCols(c){return c==="1"?1:(c==="3"||c==="4+")?3:2}
var narrowMQ=window.matchMedia?window.matchMedia("(max-width:699px)"):null;
function curCfg(){var dd=DOORS[cur];return (dd.cycle&&cycI>=0)?dd.cycle[cycI]:(SPEC[$("#f-prod").value]||SPEC.unsure)}
/* the quiet concept render in the first screen: same object as the sheet, no tag, no ticks */
var heroW=0;
function renderHero(){
  if(!CG)return;
  var host=$("#hero-art"),w=host.clientWidth||host.getBoundingClientRect().width;
  if(!w||getComputedStyle($("#hero-fig")).display==="none"){host.innerHTML="";heroW=0;return}
  var cfg=curCfg(),n=nCols(val("cols"));heroW=Math.round(w);
  var o={glass:"clear",colours:PAL.slice(0,n),logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),backdrop:"paper",size:Math.round(w),aspect:1.1,logoScale:1.1,
    label:S("Imagem de conceito, não fotografia","Concept image, not a photograph"),
    alt:S("Imagem de conceito, não fotografia: "+cfg.pt+" com um logótipo de exemplo em "+n+(n>1?" cores.":" cor."),"Concept image, not a photograph: "+cfg.en+" with a sample logo in "+n+(n>1?" colours.":" colour."))};
  for(var k in cfg.o)o[k]=cfg.o[k];
  CG.render(host,o);
}
var rzT=0;window.addEventListener("resize",function(){clearTimeout(rzT);rzT=setTimeout(function(){var w=Math.round($("#hero-art").clientWidth||0);if(w!==heroW)renderHero()},120)});
function renderSpec(){
  if(!CG)return;
  var c=val("cols"),n=nCols(c),cfg=curCfg(),host=$("#spec-art");
  var narrow=narrowMQ&&narrowMQ.matches;
  var o={glass:"clear",colours:PAL.slice(0,n),logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),backdrop:"paper",size:host.clientWidth||330,aspect:narrow?1:0.8,logoScale:1.14,
    label:S("Imagem de conceito, não fotografia","Concept image, not a photograph"),
    alt:S("Imagem de conceito, não fotografia: "+cfg.pt+" com um logótipo de exemplo em "+n+(n>1?" cores.":" cor."),"Concept image, not a photograph: "+cfg.en+" with a sample logo in "+n+(n>1?" colours.":" colour."))};
  for(var k in cfg.o)o[k]=cfg.o[k];
  CG.render(host,o);
  $("#spec-cap").textContent=S("Amostra de conceito: "+cfg.pt+". Muda com o produto e com o número de cores.","Concept sample: "+cfg.en+". It changes with the product and the number of colours.");
  var h="";PAL.slice(0,n).forEach(function(code){h+='<li><i style="background:'+HEX[code]+'"></i>'+code+'</li>'});
  if(c==="4+")h+='<li><span aria-hidden="true">+</span><span class="sr">'+S("e mais cores","and more colours")+'</span></li>';
  $("#tag-chips").innerHTML=h;
}
var rackDone=false;
function renderRack(){
  if(!CG)return;rackDone=true;
  var host=$("#rack-art"),narrow=narrowMQ&&narrowMQ.matches;
  CG.batch(host,{object:"carafe",glass:"clear",liquid:"water",fill:.7,colours:["C31","C15"],logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),backdrop:"paper",size:host.clientWidth||900,count:narrow?6:12,aspect:narrow?.6:.26,
    label:S("Imagem de conceito, não fotografia","Concept image, not a photograph"),
    alt:S("Imagem de conceito, não fotografia: fila de garrafas de vidro iguais, com o mesmo logótipo nas mesmas duas cores, em duas encomendas.","Concept image, not a photograph: a row of identical glass bottles with the same logo in the same two colours, in two orders.")});
}
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){renderRack();io.disconnect()}})},{rootMargin:"400px 0px"});
  io.observe($("#rack"));
}else renderRack();
if(narrowMQ){var onMQ=function(){renderSpec();if(rackDone)renderRack()};if(narrowMQ.addEventListener)narrowMQ.addEventListener("change",onMQ);else if(narrowMQ.addListener)narrowMQ.addListener(onMQ)}
var lastSpec="";
function maybeSpec(force){var k=$("#f-prod").value+"|"+val("cols")+"|"+cycI;if(force||k!==lastSpec){lastSpec=k;renderSpec();renderHero()}}

/* send panel + modes */
var mode="full";
function updateModeLabels(){
  $("#mode-toggle").textContent=mode==="full"?S("Nada pronto? Só email e uma linha","Nothing ready? Just email and one line"):S("Voltar ao pedido completo","Back to the full enquiry");
  $("#send-t").textContent=mode==="full"?S("Para onde enviamos a resposta","Where we send the reply"):S("Deixe um email e uma linha","Leave an email and one line");
}
function setMode(m){mode=m;$("#full-fields").hidden=m!=="full";$("#quick-fields").hidden=m!=="quick";updateModeLabels();clearErrors()}
function openSend(m,focusFirst){
  setMode(m);var s=$("#send");s.hidden=false;$("#go-send").setAttribute("aria-expanded","true");
  if(focusFirst){var f=m==="full"?$("#f-country"):$("#q-email");setTimeout(function(){f.focus()},30)}
}
$("#go-send").addEventListener("click",function(){
  var s=$("#send");
  if(s.hidden||mode!=="full")openSend("full",true);else{s.hidden=true;this.setAttribute("aria-expanded","false")}
});
$("#go-quick").addEventListener("click",function(){openSend("quick",true)});
$("#mode-toggle").addEventListener("click",function(){setMode(mode==="full"?"quick":"full");$($("#full-fields").hidden?"#q-email":"#f-country").focus()});

/* validation */
var EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function setErr(id,fid,msg){var e=$("#"+id),f=$("#"+fid);e.textContent=msg||"";if(msg)f.setAttribute("aria-invalid","true");else f.removeAttribute("aria-invalid");return !msg}
function clearErrors(){$$(".err").forEach(function(e){e.textContent=""});$$("[aria-invalid]").forEach(function(e){e.removeAttribute("aria-invalid")});var d=$("#done");if(d)d.hidden=true;var r=$("#repdone");if(r)r.hidden=true}
function emailMsg(v){if(!v.trim())return S("Escreva o seu email, para podermos responder.","Enter your email so we can reply.");if(!EMAIL.test(v.trim()))return S("O email parece incompleto. Exemplo: nome@empresa.pt","The email looks incomplete. Example: name@company.com");return ""}
$("#orderform").addEventListener("submit",function(ev){
  ev.preventDefault();
  if($("#send").hidden){openSend("full",true);return}
  var ok=true,first=null;
  function chk(r,fid){if(!r&&!first)first=fid;ok=ok&&r}
  if(mode==="full"){
    chk(setErr("e-country","f-country",$("#f-country").value.trim()?"":S("Indique o país de entrega.","Enter the delivery country.")),"f-country");
    chk(setErr("e-name","f-name",$("#f-name").value.trim()?"":S("Indique o seu nome.","Enter your name.")),"f-name");
    chk(setErr("e-email","f-email",emailMsg($("#f-email").value)),"f-email");
  }else{
    chk(setErr("e-qemail","q-email",emailMsg($("#q-email").value)),"q-email");
    chk(setErr("e-qline","q-line",$("#q-line").value.trim()?"":S("Escreva uma linha sobre o que precisa.","Write one line about what you need.")),"q-line");
  }
  var d=$("#done");
  if(!ok){d.hidden=true;$("#e-form").textContent=S("Faltam dados. Corrija os campos assinalados.","Some details are missing. Fix the marked fields.");$("#"+first).focus();return}
  $("#e-form").textContent="";
  var lines=[S("Situação: ","Situation: ")+DOORS[cur].tab[lang==="pt"?0:1]];
  if(mode==="full"){
    lines.push(pairsText(sumPairs));
    lines.push(S("Logótipo: ","Logo: ")+$("#f-logo").selectedOptions[0].textContent);
    lines.push(S("País: ","Country: ")+$("#f-country").value.trim());
    lines.push(S("Nome: ","Name: ")+$("#f-name").value.trim()+" · "+$("#f-email").value.trim());
    if(DOORS[cur].trade&&$("#f-contract").value.trim())lines.push(S("Contrato: ","Contract: ")+$("#f-contract").value.trim());
    if(DOORS[cur].trade&&$("#f-total").value.trim())lines.push(S("Total e frequência: ","Total and frequency: ")+$("#f-total").value.trim());
    if(DOORS[cur].trade&&$("#f-first").value)lines.push(S("Primeira entrega: ","First delivery: ")+fmt(parseISO($("#f-first").value)));
  }else{
    lines.push(S("Email: ","Email: ")+$("#q-email").value.trim());
    lines.push(S("Pedido: ","Request: ")+$("#q-line").value.trim());
    if($("#q-link").value.trim())lines.push(S("Ligação: ","Link: ")+$("#q-link").value.trim());
  }
  $("#done-pre").textContent=lines.join("\n");
  d.hidden=false;d.focus();
});

/* repeat form */
$("#repform").addEventListener("submit",function(ev){
  ev.preventDefault();
  var ok=true,first=null;
  function chk(r,fid){if(!r&&!first)first=fid;ok=ok&&r}
  chk(setErr("e-model","r-model",$("#r-model").value.trim()?"":S("Indique o modelo ou a referência da última encomenda.","Enter the model or reference from the last order.")),"r-model");
  chk(setErr("e-rdate","r-date",$("#r-date").value?"":S("Escolha a data em que precisa das peças.","Choose the date you need the pieces.")),"r-date");
  chk(setErr("e-remail","r-email",emailMsg($("#r-email").value)),"r-email");
  var d=$("#repdone");
  if(!ok){d.hidden=true;$("#"+first).focus();return}
  var L=[S("Igual à última encomenda","Same as the last order"),S("Modelo: ","Model: ")+$("#r-model").value.trim()];
  if($("#r-cols").value.trim())L.push(S("Cores: ","Colours: ")+$("#r-cols").value.trim());
  if($("#r-qty").value)L.push(S("Quantidade: ","Quantity: ")+$("#r-qty").value);
  L.push(S("Data: ","Date: ")+fmt(parseISO($("#r-date").value)));L.push("Email: "+$("#r-email").value.trim());
  $("#repdone-pre").textContent=L.join("\n");d.hidden=false;d.focus();
});

/* helpers for the situations */
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function goto(el){try{el.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"})}catch(x){el.scrollIntoView()}}
updateModeLabels();
/* ---------- situations: tabs, hash, announcements ---------- */
var ansd=$("#ansd"),mqA=window.matchMedia?window.matchMedia("(max-width:599px)"):null;
function syncAns(){if(mqA)ansd.open=!mqA.matches}
syncAns();if(mqA){if(mqA.addEventListener)mqA.addEventListener("change",syncAns);else if(mqA.addListener)mqA.addListener(syncAns)}
var main=$("#top"),cur=0,cycI=-1,prevView="order";
function setRadio(name,v){var e=$('input[name="'+name+'"][value="'+v+'"]');if(e)e.checked=true}
function tabsHorizontal(){return window.matchMedia?window.matchMedia("(min-width:960px)").matches:true}
var tabsEl=$("#tabs"),tabEls=[];
DOORS.forEach(function(d,i){
  var b=document.createElement("button");
  b.type="button";b.className="tab"+(d.k==="outro"?" other":"");b.id="tab-"+d.k;
  b.setAttribute("role","tab");b.setAttribute("aria-controls","ficha");b.setAttribute("aria-selected","false");b.tabIndex=-1;
  b.innerHTML='<span class="tn" aria-hidden="true">'+d.n+'</span><span class="tt"></span>';
  b.addEventListener("click",function(){setDoor(i,true)});
  tabsEl.appendChild(b);tabEls.push(b);
});
var seeall=$("#seeall");
function narrowTabs(){return window.matchMedia?window.matchMedia("(max-width:619px)").matches:false}
function setCollapsed(c){tabsEl.classList.toggle("collapsed",c);seeall.setAttribute("aria-expanded",c?"false":"true");seeall.textContent=c?S("Ver todos ("+DOORS.length+")","See all ("+DOORS.length+")"):S("Mostrar menos","Show fewer")}
function markPeek(){var n=0;tabEls.forEach(function(b,j){b.classList.remove("peek");if(j!==cur&&n<2){b.classList.add("peek");n++}})}
seeall.addEventListener("click",function(){setCollapsed(!tabsEl.classList.contains("collapsed"))});
tabsEl.addEventListener("keydown",function(e){
  if(narrowTabs()&&tabsEl.classList.contains("collapsed")&&/^(Arrow|Home|End)/.test(e.key))setCollapsed(false);
  var n=DOORS.length,i=cur,k=e.key;
  if(k==="ArrowRight"||k==="ArrowDown")i=(cur+1)%n;
  else if(k==="ArrowLeft"||k==="ArrowUp")i=(cur+n-1)%n;
  else if(k==="Home")i=0;else if(k==="End")i=n-1;else return;
  e.preventDefault();setDoor(i,true);tabEls[i].focus();
});
function setOrient(){tabsEl.setAttribute("aria-orientation",tabsHorizontal()?"horizontal":"vertical")}
setOrient();
if(window.matchMedia){var mqT=window.matchMedia("(min-width:960px)");if(mqT.addEventListener)mqT.addEventListener("change",setOrient);else if(mqT.addListener)mqT.addListener(setOrient)}
$("#ficha").setAttribute("role","tabpanel");

function hashKey(){var h=(location.hash||"").replace(/^#/,"");return Object.prototype.hasOwnProperty.call(DK,h)?h:null}
function setHash(k){try{if(window.history&&history.replaceState)history.replaceState(null,"","#"+k)}catch(x){}}

/* text that depends on the situation and the language */
function renderDoor(){
  var d=DOORS[cur],L=lang==="pt"?0:1;
  $("#h1a").textContent=d.h[0][L];$("#h1b").textContent=d.h[1][L];
  $("#supply").innerHTML=X(d.promise);
  $("#a1").innerHTML=X(d.can);$("#a2").innerHTML=X(d.when);$("#a3").innerHTML=X(d.who);
  DOORS.forEach(function(x,i){tabEls[i].querySelector(".tt").textContent=x.tab[L]});
  setCollapsed(tabsEl.classList.contains("collapsed"));
  $("#sheet-title").textContent=d.st[L];$("#sheet-l").textContent=d.sl[L];
  $("#go-send").textContent=d.cta[L];
  $("#l-date").textContent=d.dl[L];$("#date-hint").textContent=d.dh[L];
  $("#t-jobs").textContent=d.jt[L];
  var dm=$("#door-more");dm.hidden=!d.more;if(d.more)dm.textContent=d.more[L];
  $$("figure.job").forEach(function(f){f.querySelector(".jcap").textContent=f.getAttribute(L?"data-cap-en":"data-cap-pt")});
  $$("#rules-body .hlsr").forEach(function(e){e.textContent=" ("+S("em destaque para o seu caso",EN.hl_sr)+")"});
}
function arrangeJobs(d){
  var jobs=$("#jobs"),pool=$("#pool"),figs={};
  $$("figure.job").forEach(function(f){figs[f.getAttribute("data-k")]=f});
  Object.keys(figs).forEach(function(k){pool.appendChild(figs[k])});
  d.jobs.forEach(function(k){jobs.appendChild(figs[k])});
}
function arrangeRules(d){
  var body=$("#rules-body"),rows=$$("tr",body);
  rows.forEach(function(r,i){if(!r.hasAttribute("data-o"))r.setAttribute("data-o",i)});
  rows.sort(function(a,b){
    var ia=d.rows.indexOf(a.getAttribute("data-r")),ib=d.rows.indexOf(b.getAttribute("data-r"));
    if(ia<0&&ib<0)return a.getAttribute("data-o")-b.getAttribute("data-o");
    if(ia<0)return 1;if(ib<0)return -1;return ia-ib;
  });
  rows.forEach(function(r){
    var on=d.rows.indexOf(r.getAttribute("data-r"))>-1;
    r.classList.toggle("hl",on);
    var c=r.firstElementChild,old=c.querySelector(".hlsr");
    if(old)c.removeChild(old);
    if(on){var s=document.createElement("span");s.className="sr hlsr";c.appendChild(s)}
    body.appendChild(r);
  });
}
function moveRep(toHero){
  var f=$("#repform");
  if(toHero){$("#rep-hero-slot").appendChild(f);$("#repnote").hidden=false}
  else{$("#repslot").appendChild(f);$("#repnote").hidden=true}
}
var heroRackDone=false;
function renderHeroRack(){
  if(!CG)return;heroRackDone=true;
  var host=$("#rack2-art"),narrow=narrowMQ&&narrowMQ.matches;
  CG.batch(host,{object:"carafe",glass:"clear",liquid:"water",fill:.7,colours:["C31","C15"],logo:"geometric",text:S("A SUA MARCA","YOUR BRAND"),backdrop:"paper",size:host.clientWidth||600,count:10,aspect:.42,
    label:S("Imagem de conceito, não fotografia","Concept image, not a photograph"),
    alt:S("Imagem de conceito, não fotografia: duas encomendas da mesma garrafa, com o mesmo logótipo nas mesmas duas cores.","Concept image, not a photograph: two orders of the same bottle, with the same logo in the same two colours.")});
}
function announce(){
  var d=DOORS[cur],L=lang==="pt"?0:1;
  $("#announce").textContent=S("Situação escolhida: ","Situation chosen: ")+d.tab[L]+". "+d.h[0][L]+" "+S("Respostas, ficha e fotos atualizadas.","Answers, sheet and photos updated.");
}
function setDoor(i,user){
  var d=DOORS[i],slip=$("#slip"),first=(typeof user==="undefined");
  slip.setAttribute("aria-live","off");$("#status").setAttribute("aria-live","off");
  cur=i;main.setAttribute("data-door",d.k);
  tabEls.forEach(function(b,j){var on=j===i;b.setAttribute("aria-selected",on?"true":"false");b.tabIndex=on?0:-1});
  $("#ficha").setAttribute("aria-labelledby","tab-"+d.k);
  $("#f-prod").value=d.prod;setRadio("qty",d.qty);setRadio("cols",d.cols);
  cycI=d.cycle?0:-1;$("#cyc").hidden=!d.cycle;
  $("#fld-date").classList.toggle("hot",!!d.dateEmph);
  $("#more").hidden=!d.trade;$("#fld-client").hidden=!d.client;
  if(!d.client)$("#f-client").value="";
  var v=d.view;
  $("#orderform").hidden=(v==="reorder");$("#rep-hero").hidden=(v!=="reorder");moveRep(v==="reorder");
  $("#mode-toggle").hidden=(v==="quick");
  if(v==="quick")openSend("quick",false);
  else if(prevView==="quick"){$("#send").hidden=true;$("#go-send").setAttribute("aria-expanded","false");setMode("full")}
  prevView=v;
  clearErrors();
  renderDoor();arrangeJobs(d);arrangeRules(d);render();maybeSpec(true);
  if(v==="reorder")renderHeroRack();
  renderRepSent();
  if(user)setHash(d.k);
  if(!first)announce();
  markPeek();if(user)setCollapsed(true);
  setTimeout(function(){slip.setAttribute("aria-live","polite");$("#status").setAttribute("aria-live","polite")},400);
}
$("#cyc").addEventListener("click",function(){
  var d=DOORS[cur];if(!d.cycle)return;
  cycI=(cycI+1)%d.cycle.length;$("#f-prod").value=d.cycle[cycI].prod;render();maybeSpec(true);
});
$("#f-prod").addEventListener("change",function(){
  var d=DOORS[cur];if(!d.cycle)return;
  var p=this.value,idx=-1;d.cycle.forEach(function(e,j){if(idx<0&&e.prod===p)idx=j});cycI=idx;
});
$("#f-client").addEventListener("input",render);
$("#routing").hidden=false;

var mb=$("#menubtn"),nav=$("#nav");
function closeMenu(){nav.classList.remove("open");mb.setAttribute("aria-expanded","false")}
mb.addEventListener("click",function(){var o=!nav.classList.contains("open");nav.classList.toggle("open",o);mb.setAttribute("aria-expanded",o?"true":"false")});
nav.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("a"))closeMenu()});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&nav.classList.contains("open")){closeMenu();mb.focus()}});
/* links: a link to another page changes the hash (so Back works); a link inside the current page scrolls and leaves the hash alone */
document.addEventListener("click",function(e){
  var a=e.target.closest?e.target.closest('a[href^="#"]'):null;if(!a)return;
  var id=a.getAttribute("href").slice(1);if(!id||a.id==="skip")return;
  if(hasOwn(ROUTES,id)){if(id===curPage){e.preventDefault();window.scrollTo(0,0);focusH1()}return}
  var isDoor=hasOwn(DK,id),t=isDoor?null:document.getElementById(id);
  var tp=isDoor?"home":(t?(pageOf(t)||"home"):null);
  if(tp===null||tp!==curPage)return;
  if(isDoor){e.preventDefault();setDoor(DK[id],true);return}
  e.preventDefault();goto(t);
  if(id==="ficha"){
    var f;
    if(a.id==="open-quick"){if(DOORS[cur].view==="reorder")setDoor(DK.outro,true);else openSend("quick",false);f=$("#q-email")}
    else f=$("#orderform").hidden?$("#r-model"):($("#send").hidden||mode!=="full"?$("#f-prod"):$("#f-country"));
    setTimeout(function(){try{f.focus({preventScroll:true})}catch(x){}},reduce?0:350);
  }
});

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

setDoor(hashKey()!==null?DK[hashKey()]:0);
route(true);
})();
