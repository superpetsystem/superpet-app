"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "client" | "admin" | "company-admin" // Added company-admin role
  companyId?: string // Added companyId for company admins
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  currentCompanyId: string | null // Added current company context
  setCurrentCompany: (companyId: string) => void // Added function to set company
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => void
}

const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Admin Super Pet",
    email: "admin@superpet.com",
    phone: "(11) 99999-9999",
    password: "admin123",
    role: "company-admin",
    companyId: "1",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 98888-8888",
    password: "123456",
    role: "client",
  },
  {
    id: "3",
    name: "Admin Pet Mania",
    email: "admin@petmania.com",
    phone: "(11) 97777-7777",
    password: "admin123",
    role: "company-admin",
    companyId: "2",
  },
  {
    id: "4",
    name: "Super Admin",
    email: "superadmin@petscheduler.com",
    phone: "(11) 96666-6666",
    password: "super123",
    role: "admin",
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      currentCompanyId: null, // Initialize current company
      setCurrentCompany: (companyId: string) => {
        set({ currentCompanyId: companyId })
      },
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const user = mockUsers.find((u) => u.email === email && u.password === password)
        if (user) {
          const { password: _, ...userWithoutPassword } = user
          const currentCompanyId = user.role === "company-admin" ? user.companyId || null : null
          set({ user: userWithoutPassword, isAuthenticated: true, currentCompanyId })
          return true
        }
        return false
      },
      register: async (name: string, email: string, phone: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Check if user already exists
        if (mockUsers.find((u) => u.email === email)) {
          return false
        }

        const newUser: User = {
          id: String(mockUsers.length + 1),
          name,
          email,
          phone,
          role: "client",
        }

        mockUsers.push({ ...newUser, password })
        set({ user: newUser, isAuthenticated: true })
        return true
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, currentCompanyId: null }) // Clear company on logout
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
