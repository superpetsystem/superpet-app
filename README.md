# Super Pet - React + Vite

Sistema de agendamento para pet shops com funcionalidades completas de autenticação, agendamento e gestão.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Router** - Roteamento client-side
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Zustand** - Gerenciamento de estado
- **Date-fns** - Manipulação de datas

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── auth/           # Formulários de autenticação
│   ├── ui/             # Componentes de interface
│   ├── header.tsx      # Cabeçalho da aplicação
│   └── theme-provider.tsx
├── pages/              # Páginas da aplicação
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── RegisterCompanyPage.tsx
│   ├── DashboardPage.tsx
│   ├── AgendarPage.tsx
│   └── AdminPage.tsx
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e configurações
├── styles/             # Estilos globais
└── App.tsx             # Componente principal
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o linter

## 📋 Funcionalidades

### Para Clientes
- ✅ Cadastro e login
- ✅ Agendamento de serviços
- ✅ Visualização de agendamentos
- ✅ Cancelamento de agendamentos
- ✅ Dashboard pessoal

### Para Administradores
- ✅ Painel administrativo
- ✅ Gestão de agendamentos
- ✅ Visualização de estatísticas
- ✅ Gestão de serviços e equipe

### Para Empresas
- ✅ Cadastro de empresa
- ✅ Configuração de serviços
- ✅ Gestão de profissionais
- ✅ Relatórios e análises

## 🎨 Design System

O projeto utiliza um design system baseado em:
- **Tailwind CSS** para estilização
- **Radix UI** para componentes acessíveis
- **Lucide React** para ícones
- **CSS Variables** para temas

## 🔐 Autenticação

O sistema inclui diferentes tipos de usuários:
- **Cliente** - Pode agendar serviços
- **Admin da Empresa** - Gerencia uma empresa específica
- **Super Admin** - Acesso total ao sistema

### Credenciais de Teste
- Admin: `admin@superpet.com` / `admin123`
- Cliente: `joao@email.com` / `123456`

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops

## 🚀 Deploy

Para fazer deploy da aplicação:

1. Execute `npm run build`
2. Os arquivos estáticos estarão na pasta `dist/`
3. Faça upload dos arquivos para seu servidor web

## 📝 Notas da Migração

Esta aplicação foi migrada de Next.js para React + Vite. As principais mudanças incluem:

- ✅ Substituição do roteamento do Next.js pelo React Router
- ✅ Migração de `useRouter` para `useNavigate`
- ✅ Atualização de imports de `next/link` para `react-router-dom`
- ✅ Configuração do Vite com TypeScript
- ✅ Adaptação do sistema de temas
- ✅ Configuração do Tailwind CSS para Vite

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
