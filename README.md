# Central de Suporte App RH — PWA

Portal responsivo para GitHub Pages com menu lateral e telas integradas por `iframe` ou link externo.

## O que está incluído
- Início com cartões de acesso rápido.
- Menu lateral: Folgas, Trocas, Atestados, Treinamentos e Dashboard Planilha.
- Cada módulo possui uma tela de integração.
- Configuração central em `config.js`.
- Layout responsivo para celular e desktop.
- Manifesto, ícones e Service Worker para instalação como PWA.
- Ação para abrir cada sistema em nova guia e recarregar iframes.

## Como configurar os links
Abra `config.js` e preencha a propriedade `url` de cada módulo. Exemplo:

```js
folgas: {
  title: "Folgas",
  description: "Solicitações e consulta de folgas.",
  url: "https://seu-endereco-publicado",
  mode: "iframe"
}
```

Use:
- `mode: "iframe"` para tentar exibir dentro do portal.
- `mode: "link"` para abrir uma tela com botão que leva ao sistema em nova guia.

**Importante:** Google Apps Script, Google Sheets e outros sites podem impedir a exibição em iframe por cabeçalhos de segurança ou exigir autenticação. Se o iframe ficar em branco ou apresentar bloqueio, troque o módulo para `mode: "link"`. O portal não consegue contornar essas restrições do site de destino.

## Publicar no GitHub Pages
1. Extraia o ZIP.
2. Envie todos os arquivos e a pasta `icons` para a raiz de um repositório GitHub.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
6. Acesse o endereço publicado pelo GitHub Pages.

## Instalar como PWA
- Android/Chrome: abra o site publicado e use **Instalar aplicativo** ou **Adicionar à tela inicial**, conforme o navegador.
- iPhone: abra no Safari, toque em Compartilhar e escolha **Adicionar à Tela de Início**.

## Observação sobre login e tokens
Este portal é uma camada de navegação. Ele não replica nem valida o login do App RH e não encaminha automaticamente o token salvo para outros domínios. Se os módulos precisarem compartilhar autenticação, a integração deve ser feita de forma explícita e segura em cada sistema.
