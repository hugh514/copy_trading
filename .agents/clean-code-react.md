# Clean Code no React

Mantenha a base de código visualmente limpa e facilmente manutenível, respeitando as seguintes regras:

1. **Padrão de Nomenclatura:**
   - **PascalCase** para nomes de Componentes (ex: `LoginForm.tsx`, `DashboardHeader.tsx`).
   - **camelCase** para funções utilitárias e Hooks (ex: `handleLogin`, `useAuth`, `formatDate`).

2. **Separação de Preocupações (SoC):**
   - É estritamente obrigatório separar a lógica de negócio da camada puramente visual.
   - Todo JSX extenso deve ser enxuto. Toda lógica complexa (controle de formulários, chamadas de API, transformações de dados pesadas) deve ser isolada em **Custom Hooks** ou **Server Actions**.

3. **Arquivos Enxutos:**
   - Limite estritamente o tamanho dos componentes. Componentes muito extensos (acima de 200 linhas) indicam falta de abstração. Divida em micro-componentes de apresentação menores.
