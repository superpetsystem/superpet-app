import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { useNavigate } from "react-router-dom"
import { LogOut, User, Shield, Calendar } from "lucide-react"

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-primary">PetScheduler</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Planos
          </Link>
          {isAuthenticated && (
            <>
              {user?.role === "client" && (
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                  Meus Agendamentos
                </Link>
              )}
              {user?.role === "company-admin" && (
                <Link
                  to="/admin"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Painel Admin
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  to="/super-admin"
                  className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Super Admin
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center gap-2 mr-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user?.name}</span>
                {user?.role === "company-admin" && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Admin</span>
                )}
                {user?.role === "admin" && (
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">Super Admin</span>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link to="/register-company">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Criar Conta
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
