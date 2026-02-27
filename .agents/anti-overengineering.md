# Anti-Overengineering Guidelines

Nossa abordagem de arquitetura preza pela simplicidade e pela utilização correta do ecossistema Next.js:

1. **Evite Gerenciadores de Estado Complexos:** Está estritamente proibido o uso de Redux, Zustand, Recoil ou Jotai para dados globais simples que podem ser resolvidos pelo Next.js.
2. **Prioridade às Server Actions:** Para mutações e submissões de dados, utilize sempre Server Actions nativas do Next.js.
3. **Data Fetching Nativo:** O uso da API `fetch` nativa dentro do ambiente Server (Server Components) deve ser sua escolha primeira antes de bibliotecas de terceiros complexas.
4. **Uso Moderado da Context API:** A Context API deve ser restrita apenas a estados isolados que precisam de distribuição ampla localmente (ex: ThemeProvider para Dark/Light Mode, Toast/Alert Provider). Não utilize Context API para cache ou fetching de API.
