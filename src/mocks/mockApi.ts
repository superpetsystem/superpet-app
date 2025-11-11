import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { api } from '@/lib/api'
import type { AuthResponse, User } from '@/types/auth'

// In-memory mock database
const users = new Map<string, User>([
  [
    'superadmin@superpet.com',
    {
      id: 'u-1',
      email: 'superadmin@superpet.com',
      name: 'Super Admin',
      role: 'admin',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    },
  ],
  [
    'admin@petshop.com',
    {
      id: 'u-2',
      email: 'admin@petshop.com',
      name: 'Admin Empresa',
      role: 'company-admin',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    },
  ],
  [
    'cliente@exemplo.com',
    {
      id: 'u-3',
      email: 'cliente@exemplo.com',
      name: 'Cliente',
      role: 'client',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    },
  ],
])

function makeTokens(email: string) {
  return {
    access_token: `mock-access-${btoa(email)}-${Date.now()}`,
    refresh_token: `mock-refresh-${btoa(email)}`,
  }
}

function userFromAccessToken(token?: string | null): User | null {
  if (!token) return null
  const parts = token.replace(/^Bearer\s+/i, '').split('-')
  if (parts.length < 3) return null
  try {
    const email = atob(parts[2])
    return users.get(email) ?? null
  } catch {
    return null
  }
}

function ok<T>(config: InternalAxiosRequestConfig<any>, data: T, status = 200): AxiosResponse<T> {
  return { data, status, statusText: 'OK', headers: {}, config }
}

function err(config: InternalAxiosRequestConfig<any>, status: number, message: string): AxiosResponse<any> {
  return { data: { message }, status, statusText: 'Error', headers: {}, config }
}

export function enableMocking() {
  const originalAdapter = api.defaults.adapter as AxiosAdapter

  const mockAdapter: AxiosAdapter = async (config) => {
    const { url = '', method = 'get', data: body } = config
    const path = new URL(url, 'http://localhost').pathname // normalize only path

    // Helper to parse JSON body when axios passes string
    const parsedBody = typeof body === 'string' && body ? (() => {
      try { return JSON.parse(body) } catch { return {} }
    })() : body || {}

    // AUTH ENDPOINTS
    if (method.toLowerCase() === 'post' && path === '/auth/login') {
      const { email } = parsedBody as { email: string; password: string }
      const baseUser: User =
        users.get(email) || {
          id: `u-${users.size + 1}`,
          email,
          name: email.split('@')[0],
          role: 'company-admin',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        }
      if (!users.has(email)) users.set(email, baseUser)
      const tokens = makeTokens(email)
      const payload: AuthResponse = { ...tokens, user: baseUser }
      return Promise.resolve(ok(config, payload))
    }

    if (method.toLowerCase() === 'post' && path === '/auth/register') {
      const { email, name } = parsedBody as { email: string; name: string; password: string }
      const newUser: User = users.get(email) || {
        id: `u-${users.size + 1}`,
        email,
        name: name || email.split('@')[0],
        role: 'company-admin',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      }
      users.set(email, newUser)
      const tokens = makeTokens(email)
      const payload: AuthResponse = { ...tokens, user: newUser }
      return Promise.resolve(ok(config, payload, 201))
    }

    if (method.toLowerCase() === 'get' && path === '/auth/me') {
      const auth = config.headers?.Authorization || config.headers?.authorization || ''
      const user = userFromAccessToken(String(auth))
      if (!user) return Promise.reject({ response: err(config, 401, 'Unauthorized') })
      return Promise.resolve(ok(config, user))
    }

    if (method.toLowerCase() === 'post' && path === '/auth/refresh') {
      const { refreshToken } = parsedBody as { refreshToken: string }
      if (!refreshToken?.startsWith('mock-refresh-')) {
        return Promise.reject({ response: err(config, 401, 'Invalid refresh token') })
      }
      try {
        const email = atob(refreshToken.replace('mock-refresh-', ''))
        const tokens = makeTokens(email)
        return Promise.resolve(ok(config, { access_token: tokens.access_token }))
      } catch {
        return Promise.reject({ response: err(config, 401, 'Invalid refresh token') })
      }
    }

    if (method.toLowerCase() === 'post' && path === '/auth/logout') {
      return Promise.resolve(ok(config, { message: 'Logged out' }))
    }

    if (method.toLowerCase() === 'post' && path === '/auth/change-password') {
      return Promise.resolve(ok(config, { message: 'Password changed' }))
    }

    if (method.toLowerCase() === 'post' && path === '/auth/forgot-password') {
      const { email } = parsedBody as { email: string }
      return Promise.resolve(ok(config, { message: 'Email sent', token: `reset-${btoa(email)}` }))
    }

    if (method.toLowerCase() === 'post' && path === '/auth/reset-password') {
      return Promise.resolve(ok(config, { message: 'Password reset' }))
    }

    // Fallback to real adapter for anything not mocked
    if (originalAdapter) {
      return originalAdapter(config)
    }
    // If no original adapter, return Network Error-like rejection
    return Promise.reject({ response: err(config, 404, 'No adapter available') })
  }

  api.defaults.adapter = mockAdapter
}
