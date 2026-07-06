# CopyTrade — Frontend

Painel web de **copy trading** desenvolvido com Next.js. Interface para traders acompanharem métricas financeiras, configurarem limites de risco, gerenciarem chaves de integração com o Expert Advisor (MetaTrader 5) e, no perfil administrador, administrarem usuários da plataforma.

> Este repositório contém apenas o **frontend**. A API REST que alimenta o painel está em [hugh514/copy_trading_back](https://github.com/hugh514/copy_trading_back).

---

## Funcionalidades

### Autenticação e segurança
- Login com validação de formulário (React Hook Form + Zod)
- Autenticação JWT com token armazenado em cookie HTTP-only (Server Actions)
- Middleware de proteção de rotas com verificação de papel (`ADMIN` / usuário comum)
- Redirecionamento automático em sessão expirada (401)
- Páginas de login, registro (desabilitado) e recuperação de senha

### Dashboard
- Visão geral com métricas em tempo real: saldo, equity, lucro diário e taxa de acerto
- Tabela de operações abertas
- Cards de indicadores com ícones e tendências

### Gestão de risco
- Configuração de multiplicador de lote e limite de perda diária
- Validação de formulário com feedback visual
- Persistência via API REST

### Integração com MetaTrader 5
- **Baixar Robô** — download do Expert Advisor (`.ex5`) via URL assinada
- **Chave de Acesso** — geração e rotação de token para vincular o EA à conta

### Gestão de usuários *(admin)*
- Listagem com busca por nome ou e-mail
- Criação de novos usuários via modal
- Ativação/desativação e exclusão de contas
- Controle de acesso restrito a usuários com papel `ADMIN`

### Perfil e configurações
- Página de perfil com dados pessoais e opções de segurança
- Configurações de notificações, aparência e idioma/região

### UI e experiência
- Design system baseado em **shadcn/ui** (Radix UI + Tailwind CSS)
- Componentes reutilizáveis: tabelas, modais, cards, toasts, formulários
- Layout responsivo com sidebar, header e área de conteúdo
- Notificações toast para feedback de ações

---

## Stack tecnológica

| Camada | Tecnologia |
|--------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Linguagem | TypeScript |
| UI | React 19, Tailwind CSS 4, shadcn/ui, Lucide Icons |
| Formulários | React Hook Form, Zod |
| Estado / dados | TanStack React Query, Axios |
| Autenticação | JWT (cookies HTTP-only + middleware) |

---

## Pré-requisitos

- **Node.js** 20 ou superior
- **npm** (ou pnpm / yarn)
- Backend [copy_trading_back](https://github.com/hugh514/copy_trading_back) em execução

---

## Executando localmente

1. Clone o repositório:

```bash
git clone https://github.com/hugh514/copy_trading.git
cd copy_trading
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente. Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> Ajuste a URL conforme a porta em que o backend estiver rodando.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (hot reload) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção (após `build`) |
| `npm run lint` | Análise estática com ESLint |

---

## Estrutura do projeto

```
copy_trading/
├── app/                    # Rotas (App Router)
│   ├── (dashboard)/        # Área autenticada (dashboard, risco, usuários, etc.)
│   ├── login/              # Página de login
│   └── register/           # Registro (redirecionado)
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── layout/             # Sidebar, header
│   ├── dashboard/          # Métricas e tabelas
│   ├── users/              # Gestão de usuários
│   └── features/auth/      # Formulário de login
├── lib/                    # Utilitários, validações e Server Actions
├── src/
│   ├── contexts/           # Auth e React Query providers
│   ├── hooks/              # Hooks de dados (dashboard, usuários, risco, chaves)
│   ├── services/           # Cliente Axios e serviços de API
│   └── types/              # Tipos TypeScript
└── proxy.ts                # Middleware de autenticação e autorização
```

---

## Backend

Este frontend consome a API REST do repositório **[hugh514/copy_trading_back](https://github.com/hugh514/copy_trading_back)**. Para o painel funcionar corretamente, o backend deve estar acessível na URL definida em `NEXT_PUBLIC_API_URL`.

Principais endpoints consumidos:

- `POST /api/auth/login` — autenticação
- `GET /api/auth/me` — perfil do usuário logado
- Dashboard, risco, usuários, chaves de acesso e download do EA

---

## Autor

**Hugo Santos** — [@hugh514](https://github.com/hugh514)

---

## Licença

Projeto privado. Todos os direitos reservados.
