import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowLeft, Check } from "lucide-react"
import { addCompany } from "@/lib/data"
import { useAppDispatch } from "@/store/hooks"
import { loginAsync } from "@/store/authSlice"
import { toast } from "sonner"

export default function RegisterCompanyPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [companyData, setCompanyData] = useState({
    name: "",
    slug: "",
    phone: "",
    email: "",
    address: "",
    plan: "free" as "free" | "basic" | "premium",
  })

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleCompanyChange = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "name" && {
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }),
    }))
  }

  const handleAdminChange = (field: string, value: string) => {
    setAdminData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!companyData.name || !companyData.phone || !companyData.email || !companyData.address) {
      setError("Por favor, preencha todos os campos")
      return
    }

    setStep(2)
  }

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!adminData.name || !adminData.email || !adminData.password) {
      setError("Por favor, preencha todos os campos")
      setLoading(false)
      return
    }

    if (adminData.password !== adminData.confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (adminData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      // Create company
      addCompany({
        ...companyData,
        active: true,
      })

      // In a real app, this would create the admin user in the database
      // For now, we'll simulate it and log them in
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Auto-login the new admin
      const result = await dispatch(loginAsync({ 
        email: adminData.email, 
        password: adminData.password 
      }))

      if (loginAsync.fulfilled.match(result)) {
        toast.success("Empresa criada e login realizado com sucesso!")
        navigate("/admin")
      } else {
        setError("Erro ao fazer login. Por favor, tente novamente.")
      }
    } catch (err) {
      setError("Erro ao criar empresa. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">PetScheduler</span>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Já tenho conta
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary mb-4">Cadastro de Empresa</Badge>
            <h1 className="text-4xl font-bold mb-2">Crie sua conta</h1>
            <p className="text-lg text-muted-foreground">
              Configure seu pet shop em minutos e comece a receber agendamentos
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 1 ? <Check className="w-5 h-5" /> : "1"}
              </div>
              <span className={`text-sm font-medium ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                Dados da Empresa
              </span>
            </div>
            <div className="w-12 h-0.5 bg-muted" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className={`text-sm font-medium ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                Criar Admin
              </span>
            </div>
          </div>

          {/* Step 1: Company Data */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>Preencha os dados do seu pet shop</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Empresa *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Pet Shop Amigo Fiel"
                      value={companyData.name}
                      onChange={(e) => handleCompanyChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Personalizada *</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">petscheduler.com/</span>
                      <Input
                        id="slug"
                        placeholder="pet-shop-amigo-fiel"
                        value={companyData.slug}
                        onChange={(e) => handleCompanyChange("slug", e.target.value)}
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Esta será a URL onde seus clientes farão agendamentos
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={companyData.phone}
                        onChange={(e) => handleCompanyChange("phone", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contato@petshop.com"
                        value={companyData.email}
                        onChange={(e) => handleCompanyChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, cidade - UF"
                      value={companyData.address}
                      onChange={(e) => handleCompanyChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Escolha seu Plano</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card
                        className={`cursor-pointer transition-all ${
                          companyData.plan === "free" ? "border-2 border-primary" : "hover:border-primary/30"
                        }`}
                        onClick={() => handleCompanyChange("plan", "free")}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Gratuito</CardTitle>
                          <div className="text-2xl font-bold">R$ 0</div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <p>50 agendamentos/mês</p>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${
                          companyData.plan === "basic" ? "border-2 border-primary" : "hover:border-primary/30"
                        }`}
                        onClick={() => handleCompanyChange("plan", "basic")}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Básico</CardTitle>
                          <div className="text-2xl font-bold">R$ 79</div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <p>Ilimitado</p>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all ${
                          companyData.plan === "premium" ? "border-2 border-primary" : "hover:border-primary/30"
                        }`}
                        onClick={() => handleCompanyChange("plan", "premium")}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Premium</CardTitle>
                          <div className="text-2xl font-bold">R$ 149</div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <p>Tudo + Relatórios</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Continuar
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Admin Account */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Criar Conta de Administrador</CardTitle>
                <CardDescription>Esta será sua conta para gerenciar o sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Nome Completo *</Label>
                    <Input
                      id="adminName"
                      placeholder="Seu nome"
                      value={adminData.name}
                      onChange={(e) => handleAdminChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email *</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="seu@email.com"
                      value={adminData.email}
                      onChange={(e) => handleAdminChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={adminData.password}
                      onChange={(e) => handleAdminChange("password", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={adminData.confirmPassword}
                      onChange={(e) => handleAdminChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Voltar
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
                      {loading ? "Criando..." : "Criar Conta"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
