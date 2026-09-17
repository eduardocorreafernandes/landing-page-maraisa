# Maraísa Fernandes — landing page

Landing page estática com a identidade oficial, fotografias reais e diagnóstico progressivo. HTML, CSS e JavaScript modular; Vite para desenvolvimento e build. Nenhuma biblioteca de interface em produção.

## Executar

Requer Node.js 22.12+ (validado com 22.20).

```sh
npm install
npm run dev
```

Abra o endereço exibido no terminal. Para validar e gerar a versão estática:

```sh
npm test
npm run build
npm run preview
```

No ambiente desta sessão, a variável do shell do Windows estava ausente. Se o npm exibir `ERR_INVALID_ARG_TYPE` ao executar scripts, use a opção de shell explícita sem alterar a configuração do sistema:

```powershell
npm install --script-shell 'C:\Windows\System32\cmd.exe'
npm --script-shell 'C:\Windows\System32\cmd.exe' run dev
```

`dist/` é a entrega para hospedagem estática na raiz de um domínio. Somente os arquivos públicos entram no build; os PDFs e fotografias originais não são expostos. A publicação não foi realizada.

## Deploy na Hostinger

O projeto é uma aplicação Vite estática. O Node.js é necessário para instalar as dependências e gerar o build; não existe servidor, API ou middleware para manter em execução depois disso.

Configuração para o deploy gerenciado por Git da Hostinger:

- Framework: `Vite`
- Node.js: `22.x`
- Comando de instalação: `npm ci`
- Comando de build: `npm run build`
- Diretório de saída: `dist`
- Arquivo de entrada do servidor: nenhum

Em uma VPS administrada manualmente, gere o mesmo diretório `dist` e configure o Nginx ou o site HTML do CloudPanel para usá-lo como raiz pública. Não use `npm run preview` como servidor de produção.

## Manutenção

- `index.html`: narrativa, navegação e conteúdo editorial estático, legível sem JavaScript.
- `src/styles.css`: fontes, identidade, layout e responsividade.
- `src/motion.js`: animações discretas com IntersectionObserver e conteúdo visível por padrão.
- `src/data/site.js`: WhatsApp, Instagram, depoimentos e credenciais verificadas.
- `src/data/diagnostic-questions.js`: roteiro de perguntas **temporário**, separado da interface.
- `src/diagnostic-model.js`: estado, navegação, condições e resumo, sem dependência do DOM.
- `src/diagnostic.js` e `.css`: interação e apresentação do diagnóstico.
- `src/contact.js`: adaptador para a mensagem do WhatsApp. Uma integração futura pode ser adicionada aqui sem reconstruir a experiência.
- `public/assets/`: cópias web dos materiais oficiais.
- `docs/ASSETS.md`: inventário e fontes por página; `DESIGN.md`: sistema visual implementado.

## Contato e privacidade

WhatsApp confirmado pelo usuário: **(16) 99154-4562**. Links usam o código do Brasil (+55). Sem armazenamento de respostas, cookies, analytics, requisições de formulário ou backend. As respostas vivem apenas na memória da página. A mensagem só é enviada quando o visitante confirmar no WhatsApp. O nome é solicitado ao final; não é necessário repetir o telefone, pois a conversa ocorre pelo próprio WhatsApp.

## Conteúdo pendente

1. Perguntas ou link do Google Forms original, para substituir o roteiro provisório.
2. Depoimentos reais com autorização. A seção e navegação estão prontas, mas permanecem ocultas quando a lista está vazia.
3. Biografia profissional, formação e provas de autoridade verificáveis, caso se deseje incluí-las. Os atributos de marca publicados não foram apresentados como certificações.
4. Instagram oficial, caso se deseje incluir o link.

“Entender, Organizar, Direcionar” é a estrutura conceitual proposta no briefing, não uma alegação de metodologia proprietária certificada. A oferta de análise gratuita do dossiê não foi anunciada como vigente, pois não houve confirmação atual.

## Materiais e referências

Os arquivos originais permanecem nas pastas fornecidas. `scripts/prepare-assets.py` reproduz as cópias WebP de fotos e copia as fontes oficiais; requer Pillow. Os SVGs da marca foram extraídos do PDF vetorial, sem redesenhar a logo.

Referências de comportamento analisadas: [Microsoft SQL Server](https://www.microsoft.com/pt-br/sql-server) e [MTS](https://mtspecaseservicos.com.br/). Foram usadas para observar cadência de seções, blocos largos, transições e navegação, sem reproduzir sua identidade visual.
