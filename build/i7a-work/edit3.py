import os
os.chdir(os.path.dirname(os.path.abspath(__file__)) + "/..")
s = open('i7a-src.html', encoding='utf-8').read()
def rep(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:70])
    s = s.replace(a, b)

# water facts: answer "who" up front
rep('<li><b>1968</b><span data-en="in the industry since">na indústria desde</span></li>\n      </ul>\n    </div>\n  </div>\n</section>\n\n<section class="band" aria-labelledby="h-ag-in">',
    '<li><b>Malveira</b><span><span data-en="one team, by phone or email. Named contact:">uma equipa, por telefone ou email. Contacto com nome:</span> {{tbc}}</span></li>\n      </ul>\n    </div>\n  </div>\n</section>\n\n<section class="band" aria-labelledby="h-ag-in">')
rep('<p class="lead" data-en="A maker of filtration or purification equipment needs bottles and carafes with its own logo, the same from one order to the next. Cergam prints the logo on the glass and fires it. Hotels and water brands ask for the same thing: a bottle with their name on the table.">Quem faz equipamento de filtração ou purificação de água precisa de garrafas e jarros com o seu logótipo, iguais de encomenda para encomenda. A Cergam imprime o logótipo no vidro e coze-o. Hotéis e marcas de água pedem o mesmo: uma garrafa com o seu nome na mesa.</p>',
    '<p class="lead" data-en="A maker of filtration or purification equipment needs bottles and carafes with its own logo, the same from one order to the next. Cergam prints the logo on the glass and fires it. Hotels and water brands ask for the same thing: a bottle with their name on the table. In the industry since 1968, decorating since 2008.">Quem faz equipamento de filtração ou purificação de água precisa de garrafas e jarros com o seu logótipo, iguais de encomenda para encomenda. A Cergam imprime o logótipo no vidro e coze-o. Hotéis e marcas de água pedem o mesmo: uma garrafa com o seu nome na mesa. Na indústria desde 1968, a decorar desde 2008.</p>')

# crumb targets
rep('.crumb a{display:inline-flex;align-items:center;min-height:44px;color:var(--link)}', '.crumb a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;min-width:44px;color:var(--link)}')

# colour ribbon on the colour page head
rep('.phead.slim .supply{max-width:36em}', '.phead.slim .supply{max-width:36em}\n.ribbon{display:flex;height:16px;margin-top:0}\n.ribbon i{flex:1;display:block}')
rep('        <p class="pill"><b data-en="Screen samples, not a print standard.">Amostras de ecrã, não um padrão de impressão.</b></p>\n      </div>\n    </div>\n  </div>\n</section>',
    '        <p class="pill"><b data-en="Screen samples, not a print standard.">Amostras de ecrã, não um padrão de impressão.</b></p>\n      </div>\n    </div>\n  </div>\n  <div class="ribbon" id="ribbon" aria-hidden="true"></div>\n</section>')
rep('function renderPickers(){', 'function renderPickers(){var rb=$("#ribbon");rb.innerHTML=COLORS.map(function(c){return\'<i style="background:\'+c[1]+\'"></i>\'}).join("");')

# orcamento head: reply card on the right, slots removed from the side column
a = s.index('        <p class="pill"><span><span data-en="Who replies:">')
b = s.index('</p>', a) + 4
s = s[:a] + s[b:]
rep('''    <div class="phead-grid">
      <div>
        <h1 id="h-orc" tabindex="-1" data-en="Request a quote">Pedir orçamento</h1>''', '''    <div class="phead-grid">
      <div>
        <h1 id="h-orc" tabindex="-1" data-en="Request a quote">Pedir orçamento</h1>''')
# find the end of that copy div and add the card
c = s.index('Sem morada e sem NIF por agora.</p>', s.index('id="h-orc"'))
c = s.index('</div>', c) + 6
card = '''
      <dl class="slots replycard">
        <div><dt data-en="Who replies">Quem responde</dt><dd>{{tbc|nome a confirmar|name to be confirmed}}</dd></div>
        <div><dt data-en="Reply time">Prazo de resposta</dt><dd>{{tbc|prazo a confirmar|time to be confirmed}}</dd></div>
        <div><dt data-en="Colour proof">Prova de cor</dt><dd>{{tbc|prova: a confirmar|proof: to be confirmed}}</dd></div>
        <div><dt data-en="Phone">Telefone</dt><dd><a href="tel:+351219862540">+351 21 9862 540</a></dd></div>
      </dl>'''
s = s[:c] + card + s[c:]
# remove the slots from the side column
a = s.index('          <dl class="slots">\n            <div><dt data-en="Who replies">')
b = s.index('</dl>', a) + 5
s = s[:a] + s[b:]
rep('.coltags{', '.replycard{margin-top:0;align-self:center}\n@media(min-width:900px){.phead.slim .phead-grid.two{display:grid}}\n.coltags{')
open('i7a-src.html', 'w', encoding='utf-8').write(s)
print('ok')
