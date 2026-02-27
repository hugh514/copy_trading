# Boas Práticas de UI/UX e Estilo

1. **Uso Rigoroso do Tailwind CSS:**
   - A estilização completa da aplicação é feita com **Tailwind CSS**.
   - É **proibido** o uso de CSS customizado solto, arquivos `.css`/`.scss` globais (exceto para as diretivas principais e base do shadcn). Tudo deve ser componentizado via utilitários do Tailwind.

2. **Feedback Visual Obrigatório (Acessibilidade & UX):**
   - **Chamada de Requisições:** Todo clique de submissão (ex: botão de login ou salvar) **deve assumir um estado de loading** enquanto a promise não resolve (spinner visível ou botão via propriedade `disabled`). 
   - Nunca bloqueie a UI sem avisar o usuário do processamento.

3. **Notificações:**
   - Todas as respostas de servidor, bem como erros imprevistos nas ações, devem se comunicar com o usuário disparando um **Toast** originário do shadcn/ui.
   - Sucessos (ex: "Logado com sucesso", "Configurações Salvas") utilizam o toast de sucesso.
   - Erros da API utilizam a variação `destructive` com uma descrição amigável do ocorrido.
