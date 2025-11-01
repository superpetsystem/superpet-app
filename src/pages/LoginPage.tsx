import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Heart, Shield, Sparkles, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-secondary p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">Super Pet</span>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Cuidado especial para seu melhor amigo
              </h2>
              <p className="text-xl text-white/90">
                Sistema completo de agendamento para serviços de pet shop
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Agendamento rápido</h3>
                  <p className="text-white/80">Agende banho, tosa e consultas em segundos</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Seguro e confiável</h3>
                  <p className="text-white/80">Seus dados e agendamentos protegidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para home
            </Button>
          </Link>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Bem-vindo de volta!</h1>
            <p className="text-muted-foreground">
              Entre na sua conta para continuar
            </p>
          </div>

          <LoginForm />

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/register">
                <Button variant="link" className="p-0 h-auto text-primary font-semibold">
                  Criar conta grátis
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
