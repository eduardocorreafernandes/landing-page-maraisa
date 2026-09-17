# Inventário e fontes da identidade visual

Auditoria realizada em 16/09/2026. Os arquivos originais foram preservados. Este documento registra fatos de marca, procedência das versões web e informações que ainda precisam ser confirmadas.

## Materiais inspecionados

- `Apresentação-IDV-Maraisa-Fernandes.pdf`: 24 páginas; a cópia em `Identidade Visual/Apresentação/` contém o mesmo documento. Todas as páginas foram renderizadas e revisadas.
- `Maraísa-Fernandes-Paleta-de-Cores.pdf`: uma página; existe também em `Identidade Visual/Paleta de Cores/`.
- `Identidade Visual/Dossiê de Marca - Maraisa Fernandes.pdf`: 27 páginas, com posicionamento, referências de universo de marca e estratégia de comunicação. Todas as páginas foram renderizadas e revisadas.
- `Identidade Visual/PDF - Vetorial/Maraisa-Fernandes-IDV.pdf`: 24 pranchetas com logos, símbolos, fundos e elementos oficiais.
- `Identidade Visual/JPG - Fundo Preenchido/`: 24 imagens principais, versão menor do logo e ZIP contendo somente outra cópia do artboard 1.
- `Identidade Visual/PNG - Fundo Transparente/`: apesar do nome da pasta, os arquivos entregues são JPEG CMYK sem transparência. Por isso as versões web transparentes vieram do PDF vetorial, e não de remoção manual de fundo.
- `Identidade Visual/Mock-Up/`: Caneca, Cartoes, Outdoor e Papelaria; aplicações coincidentes com as páginas 21–24 da apresentação.
- `Identidade Visual/Fontes/`: arquivos OTF oficiais das famílias Univia Pro e Grota Sans, com diferentes pesos e itálicos.
- `FOTOS PROFISSIONAIS - 10-2024/`: ensaio real da consultora; a seleção e as conversões web foram feitas a partir dos arquivos locais.

## Paleta e tipografia

A referência final é a tabela HEX da paleta oficial e a página 20 da apresentação:

| Cor | HEX oficial | Significado apresentado |
| --- | --- | --- |
| Azul | `#0f3b53` | Dinheiro e prosperidade |
| Dourado | `#c79b5b` | Compromisso e segurança |
| Bege | `#e1ccb5` | Confiança e tranquilidade |
| Creme | `#feedde` | Equilíbrio e transparência |

A apresentação, página 4, contém um texto preliminar que menciona verde e um RGB impossível. Há também diferenças de um ponto entre números RGB e HEX da tabela final. A implementação prioriza os HEX finais e a aparência dos assets aprovados.

- **Univia Pro**, tipografia primária: apresentação, página 6. Associada a sofisticação, clareza, transparência e compromisso.
- **Grota Sans**, tipografia secundária: apresentação, página 7. Associada a modernidade, versatilidade e adaptação às necessidades do cliente.

## Conteúdo real utilizável

### Slogans e narrativas

- “Dinheiro é liberdade” — Dossiê, página 16.
- “Te ensino como sair do ciclo de sobrevivência para uma mente capaz de realizar seus sonhos.” — Dossiê, página 16.
- “Agende sua análise financeira gratuita:” — Dossiê, página 16. Trata-se de uma orientação de bio da época do dossiê; a disponibilidade atual dessa oferta merece confirmação antes de promovê-la como oferta vigente.
- “Se cuidar do nosso dinheiro fosse apenas sobre números a conta fecharia, mas a conta não fecha.” — Dossiê, página 10.
- “Nunca delegue a terceiros decisões importantes sobre o seu dinheiro” — Dossiê, página 10.
- “A tua dor é o que te cura”, “Assim como você, eu também já...” e “E eu sei que você tentou antes...” — Dossiê, página 10. As duas últimas são pontos de partida de narrativa, não relatos biográficos concluídos.
- “A sua fonte confiável em Orientação Financeira!” — Mock-Up/Outdoor.png e apresentação, página 21.

### Visão e abordagem da profissional

A apresentação, página 2, afirma como missão da marca promover equilíbrio financeiro, proporcionar tranquilidade e construir um futuro próspero. Apresenta o dinheiro como ferramenta para a realização de sonhos, e Maraísa como parceira de orientação financeira confiável. A página 5 reforça clareza, orientação e objetivos financeiros.

Os atributos oficiais da página 3 são: equilíbrio, transparência, confiança, tranquilidade, compromisso, segurança, dinheiro e prosperidade.

Esses pontos sustentam uma seção sobre a visão da consultora. Não fornecem uma cronologia profissional, formação acadêmica ou casos de clientes.

### Símbolo e composição

A apresentação, página 5, explica a união de M e F com indicadores de projeção de crescimento. O material usa alternância de fundos azuis e claros, recortes superiores assimétricos, fotografias de marca pessoal, símbolos repetidos de baixo contraste e linhas anguladas derivadas da marca. Os elementos devem apoiar o ritmo da página, sem repetir o logo em todo bloco.

## Versões web da marca

Os SVGs abaixo são extrações diretas dos caminhos vetoriais oficiais, com área vazia recortada e fundo removido quando necessário. Não houve redesenho. As conversões CMYK do PDF geravam pequenas diferenças de cor; os preenchimentos principais foram alinhados aos HEX declarados na paleta oficial. A forma, as proporções e o lettering permanecem originais.

| Arquivo em `public/assets/brand/` | Origem no PDF vetorial | Dimensões do viewBox | Aplicação |
| --- | --- | --- | --- |
| `logo-blue.svg` | Página 5 | 751.999 × 102.949 | Logo horizontal sobre fundo claro |
| `logo-cream.svg` | Página 6 | 751.999 × 102.949 | Logo horizontal sobre fundo azul |
| `logo-stacked-blue.svg` | Página 1 | 631.250 × 288.580 | Logo empilhado sobre fundo claro |
| `logo-stacked-cream.svg` | Página 2 | 631.250 × 288.580 | Logo empilhado sobre fundo azul |
| `symbol.svg` | Página 13 | 690.765 × 640.803 | Símbolo oficial azul e dourado |
| `symbol-light.svg` | Página 14 | 690.765 × 640.803 | Símbolo oficial claro |
| `divider.svg` | Página 24 | 952.000 × 76.232 | Divisor azul e dourado |
| `divider-light.svg` | Página 23 | 952.000 × 76.232 | Divisor creme e dourado |
| `pattern-blue.webp` | Página 17 | 1080 × 1080 pixels | Textura azul oficial |

A textura usa WebP porque o padrão repetido do PDF não se preservou no teste de renderização da exportação SVG. O WebP foi renderizado diretamente da página original. Os SVGs de marca, símbolos e divisores foram renderizados e conferidos após a extração.

## Lacunas e dados de demonstração

Não foram encontrados nos materiais fornecidos:

- depoimentos reais autorizados, nomes de clientes ou resultados documentados;
- diplomas, certificações, prêmios, anos de experiência, número de clientes ou eventos;
- uma biografia com trajetória verificável;
- conteúdo ou link do Google Forms atual;
- descrição factual de uma metodologia proprietária consolidada;
- canais de contato confirmados para uso público nos documentos originais.

O dossiê recomenda produzir histórias, depoimentos e provas de autoridade; essas recomendações não são provas de que os resultados ou conteúdos existam. Estruturas editoriais criadas para o site, etapas conceituais e perguntas temporárias não devem ser apresentadas como transcrição de uma metodologia já documentada.

O rodapé de `Mock-Up/Papelaria.png` contém um telefone em sequência de exemplo (`16 99123-4567`), um e-mail com o domínio da marca e um identificador de Instagram. O corpo da carta é lorem ipsum. Esses dados estão em uma simulação de papelaria e não foram considerados contatos reais confirmados. O telefone e os canais reais devem vir diretamente da consultora ou de outra fonte inequívoca.

Conteúdos pendentes devem continuar sinalizados nos dados/código. Depoimentos vazios não devem gerar citações fictícias nem fingir aprovação de clientes. O diagnóstico é uma conversa inicial, não uma análise financeira automática.

## Confirmação durante a implementação

O usuário informou o WhatsApp `16991544562` em 16/09/2026. Os links usam `5516991544562` (Brasil). O Instagram permanece sem confirmação e não foi publicado.

## Fotografias selecionadas

As versões WebP foram criadas a partir de `FOTOS PROFISSIONAIS - 10-2024/Editadas Maraisa Fernandes/`, em larguras de 640 e 1100 px, mantendo os originais intactos:

- `hero`: `_MG_1386.jpg`, retrato de blazer claro.
- `maraisa`: `_MG_1548.jpg`, retrato próximo da consultora.
- `conversation`: `_MG_1329.jpg`, conversa com xícara e livro.
- `contact`: `_MG_1574.jpg`, consultora com xícara.

Fontes OTF oficiais auto-hospedadas: Univia Pro Light/Regular e Grota Sans Regular/Medium.
