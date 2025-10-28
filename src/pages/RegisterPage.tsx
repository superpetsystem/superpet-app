import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuth } from "@/lib/auth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function RegisterPage() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-card p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-secondary">Super Pet</h1>
          <p className="text-muted-foreground">Cuidado e carinho para seu pet</p>
        </div>
        <RegisterForm />
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login">
              <Button variant="link" className="p-0 h-auto text-secondary">
                Entrar
              </Button>
            </Link>
          </p>
          <Link to="/">
            <Button variant="link" className="text-muted-foreground">
              Voltar para home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
