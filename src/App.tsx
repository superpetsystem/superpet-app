import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

// Pages
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import RegisterCompanyPage from '@/pages/RegisterCompanyPage'
import DashboardPage from '@/pages/DashboardPage'
import AgendarPage from '@/pages/AgendarPage'
import AdminPage from '@/pages/AdminPage'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-company" element={<RegisterCompanyPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/agendar" element={<AgendarPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
