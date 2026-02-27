# Regras Estritas de Segurança no Frontend

1. **Armazenamento de Tokens JWT:**
   - É expressamente **proibido** salvar tokens sensíveis (como Session JWT, Access Tokens e Refresh Tokens) em meios não seguros contra XSS, como `localStorage` ou `sessionStorage`.
   - **Obrigação:** O JWT deve sempre ser armazenado em um **Cookie**, com as chaves Http-Only e Secure (em produção/domínios HTTPS), de forma que apenas o servidor Back-end/Next.js possa interceptar/ler via roteamento de borda.
   - Essa abordagem garante que o `middleware.ts` consiga ler e validar essas informações sem falhas do App Router e que scripts maliciosos injetados na página não possam extraí-lo.

2. **Variáveis de Ambiente (`.env`):**
   - Todo segredo (chaves de API secretas, passwords db) deve ficar restrito ao ambiente Server sem nenhum prefixo.
   - Nunca exponha variáveis de ambiente no frontend com o prefixo `NEXT_PUBLIC_` a menos que seja verdadeiramente público e intencional (como endpoint base da API).
