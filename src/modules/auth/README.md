# Módulo de Autenticação - Super Pet

Este módulo implementa autenticação completa com Redux Toolkit, incluindo login, registro, gestão de perfil e proteção de rotas.

## 📁 Estrutura

```
src/
├── types/
│   └── auth.ts                 # Tipos TypeScript
├── services/
│   └── authService.ts          # Serviços de API
├── store/
│   ├── authSlice.ts            # Redux slice
│   ├── store.ts                # Configuração do Redux
│   └── hooks.ts                # Hooks tipados
├── hooks/
│   └── useAuth.ts              # Hook customizado
├── components/
│   ├── ProtectedRoute.tsx       # Componente de rota protegida
│   └── auth/
│       ├── login-form.tsx      # Formulário de login
│       └── register-form.tsx   # Formulário de registro
└── pages/
    ├── LoginPage.tsx           # Página de login
    └── RegisterPage.tsx        # Página de registro
```

## 🚀 Funcionalidades

### 1. **Redux Store**
- Gerenciamento de estado centralizado
- Persistência com `redux-persist`
- Ações assíncronas com `createAsyncThunk`

### 2. **Autenticação**
- ✅ Login com email e senha
- ✅ Registro de novos usuários
- ✅ Obter perfil do usuário
- ✅ Alterar senha
- ✅ Recuperar senha (forgot/reset)
- ✅ Refresh token
- ✅ Logout

### 3. **Segurança**
- Tokens JWT armazenados com segurança
- Interceptores de requisição para adicionar token
- Tratamento automático de tokens expirados
- Rotas protegidas

## 📝 Como Usar

### Login

```tsx
import { useAppDispatch } from '@/store/hooks'
import { loginAsync } from '@/store/authSlice'
import { toast } from 'sonner'

const dispatch = useAppDispatch()

const handleLogin = async (email: string, password: string) => {
  const result = await dispatch(loginAsync({ email, password }))
  
  if (loginAsync.fulfilled.match(result)) {
    toast.success("Login realizado com sucesso!")
    navigate("/dashboard")
  }
}
```

### Hook useAuth

```tsx
import { useAuth } from '@/hooks/useAuth'

function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  
  if (isLoading) return <div>Carregando...</div>
  
  return (
    <div>
      {isAuthenticated && <p>Olá, {user?.name}!</p>}
      <button onClick={logout}>Sair</button>
    </div>
  )
}
```

### Rotas Protegidas

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### API Endpoints

Todos os endpoints esperam o seguinte formato:

```typescript
POST /auth/login
POST /auth/register
GET /auth/me
POST /auth/change-password
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/refresh
```

## 📊 Estado Redux

```typescript
interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
```

## 🎯 Ações Disponíveis

- `loginAsync` - Login do usuário
- `registerAsync` - Registro de novo usuário
- `getProfileAsync` - Obter perfil do usuário
- `logout` - Fazer logout
- `setCredentials` - Definir credenciais
- `clearError` - Limpar erros

## 🔒 Segurança

- Tokens são armazenados no `localStorage`
- Todas as requisições incluem o token automaticamente
- Tokens expirados resultam em logout automático
- Rotas protegidas redirecionam para `/login` se não autenticado

## 📝 Notas

- O módulo utiliza Redux Toolkit para gerenciamento de estado
- A persistência é feita com `redux-persist`
- Os interceptores Axios gerenciam tokens automaticamente
- O hook `useAuth` fornece acesso fácil aos dados do usuário

## 🐛 Troubleshooting

### Token não está sendo enviado
Verifique se o token está no localStorage e se o interceptor está configurado corretamente.

### Erro 401 em requisições
O token pode ter expirado. O usuário será redirecionado automaticamente para `/login`.

### Estado não persiste
Verifique se o `PersistGate` está configurado no `main.tsx`.

