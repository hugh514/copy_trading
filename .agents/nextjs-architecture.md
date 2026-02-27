# Padrão de Arquitetura Next.js

Para organizar nosso projeto baseado no Next.js (App Router), siga religiosamente esta estrutura física e mental:

1. **`app/` (App Router):**
   - Diretório exclusivo para roteamento.
   - Agrupe layouts (`layout.tsx`), páginas (`page.tsx`), telas de erro (`error.tsx`), loadings (`loading.tsx`) e `middleware.ts`(na raiz).

2. **`components/ui/`:**
   - Reservado de forma exclusiva para **componentes burros (dumb components)** providos primariamente pelo **shadcn/ui**.
   - Estes componentes não devem ter regras de negócio, chamadas de API ou dependências do domínio da aplicação.
   - Ex: `Button`, `Input`, `Dialog`, `Toast`.

3. **`components/features/` (ou por Domínio):**
   - Diretório destinado a componentes complexos e "Smart" que encapsulam regras de negócio atreladas à UI.
   - Exemplo: `LoginForm` contém regras de validação (Zod), estado do formulário (`react-hook-form`) e ações do Next.js.
