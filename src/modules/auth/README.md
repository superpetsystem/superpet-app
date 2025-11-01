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
- ✅ Registro de novos usuários (cria Employee com role OWNER automaticamente)
- ✅ Obter perfil do usuário (`/auth/me`)
- ✅ Alterar senha
- ✅ Recuperar senha (forgot/reset)
- ✅ Refresh token automático (access_token 15min + refresh_token 7d)
- ✅ Logout com blacklist de tokens

### 3. **Segurança**
- Tokens JWT armazenados com segurança no localStorage
- Access token com prefixo "Bearer " 
- Refresh token automático quando access_token expira
- Interceptores de requisição para adicionar token
- Tratamento automático de tokens expirados com fila de requisições
- Logout automático quando refresh falha
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

Todos os endpoints esperam o seguinte formato conforme Postman Collection:

```typescript
// 1. Register - Cria usuário e employee automático
POST /auth/register
Body: { email: string, name: string, password: string }
Response: { access_token: string, refresh_token: string, user: User }

// 2. Login - Retorna tokens de acesso
POST /auth/login
Body: { email: string, password: string }
Response: { access_token: string, refresh_token: string, user: User }

// 3. Get Profile - Retorna dados do usuário autenticado
GET /auth/me
Headers: { Authorization: "Bearer {token}" }
Response: User

// 4. Refresh Token - Renova access_token
POST /auth/refresh
Body: { refreshToken: string }
Response: { access_token: string }

// 5. Logout - Blacklist tokens
POST /auth/logout
Headers: { Authorization: "Bearer {token}" }
Body: { refreshToken: string }
Response: { message: string }

// 6. Change Password - Altera senha (requer autenticação)
POST /auth/change-password
Headers: { Authorization: "Bearer {token}" }
Body: { currentPassword: string, newPassword: string }
Response: { message: string }

// 7. Forgot Password - Solicita token de reset
POST /auth/forgot-password
Body: { email: string }
Response: { message: string, token?: string }

// 8. Reset Password - Define nova senha com token
POST /auth/reset-password
Body: { token: string, newPassword: string }
Response: { message: string }
```

**Nota:** A API está rodando em `http://localhost:3000` por padrão.

## 📊 Estado Redux

```typescript
interface AuthState {
  user: User | null
  token: string | null          // Access token (sem "Bearer ")
  refreshToken: string | null   // Refresh token
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  currentCompanyId: string | null
}

interface User {
  id: string
  email: string
  name: string
  organizationId?: string
  status?: "ACTIVE" | "INACTIVE"
  createdAt?: string
}

interface AuthResponse {
  access_token: string      // JWT token (15 minutos)
  refresh_token: string     // JWT token (7 dias)
  user: User
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

- Tokens são armazenados no `localStorage` com prefixo "Bearer "
- Access token com validade de 15 minutos
- Refresh token com validade de 7 dias
- Auto-refresh quando access token expira
- Sistema de fila para múltiplas requisições durante refresh
- Todas as requisições incluem o token automaticamente via interceptor
- Logout faz blacklist de ambos os tokens no servidor
- Tokens expirados resultam em logout automático
- Rotas protegidas redirecionam para `/login` se não autenticado
- Verificação de token ao inicializar app (getProfile)

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

