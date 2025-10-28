import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button, TextField, Card, CardContent, CardHeader, Typography, Box, Stepper, Step, StepLabel, Alert, CircularProgress, Chip } from "@mui/material"
import { ArrowBack as ArrowBackIcon, Check as CheckIcon, Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationOnIcon, Store as StoreIcon } from "@mui/icons-material"
import { Calendar } from "lucide-react"
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

  const steps = [
    'Dados da Empresa',
    'Criar Conta Admin'
  ]

  return (
    <Box className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <Box className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Box className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Box className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Box>
            <Typography variant="h6" className="font-bold text-primary hidden sm:block">
              Super Pet
            </Typography>
          </Link>
          <Link to="/login" className="no-underline">
            <Button variant="outlined" size="small" className="!text-xs sm:!text-sm">
              <span className="hidden sm:inline">Já tenho conta</span>
              <span className="sm:hidden">Conta</span>
            </Button>
          </Link>
        </Box>
      </Box>

      <Box className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <Box className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-600 hover:text-primary mb-4 sm:mb-6 no-underline">
            <ArrowBackIcon className="w-4 h-4" />
            Voltar
          </Link>

          {/* Header */}
          <Box className="text-center mb-6 sm:mb-8">
            <Chip label="Cadastro de Empresa" size="small" className="bg-primary/10 text-primary mb-3 sm:mb-4 !text-xs sm:!text-sm" />
            <Typography variant="h4" className="font-bold mb-2 !text-2xl sm:!text-3xl">
              Crie sua conta
            </Typography>
            <Typography variant="body2" className="text-gray-600 !text-sm sm:!text-base px-2">
              Configure seu pet shop em minutos e comece a receber agendamentos
            </Typography>
          </Box>

          {/* Stepper - Mobile Optimized */}
          <Box className="mb-6 sm:mb-8">
            <Stepper activeStep={step - 1} orientation="horizontal" className="flex-wrap">
              {steps.map((label, index) => (
                <Step key={label} className="w-full sm:w-auto">
                  <StepLabel 
                    className="!text-xs sm:!text-sm"
                    sx={{ 
                      '& .MuiStepLabel-label': { 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }
                      }
                    }}
                  >
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{index + 1}</span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Step 1: Company Data */}
          {step === 1 && (
            <Card className="!shadow-lg">
              <CardHeader className="pb-4">
                <Typography variant="h5" className="!text-lg sm:!text-xl">Informações da Empresa</Typography>
                <Typography variant="body2" className="text-gray-600 !text-xs sm:!text-sm">
                  Preencha os dados do seu pet shop
                </Typography>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCompanySubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      fullWidth
                      id="name"
                      label="Nome da Empresa"
                      placeholder="Ex: Pet Shop Amigo Fiel"
                      value={companyData.name}
                      onChange={(e) => handleCompanyChange("name", e.target.value)}
                      required
                      InputProps={{
                        startAdornment: <StoreIcon className="mr-2 text-gray-400" />,
                      }}
                    />

                    <Box>
                      <TextField
                        fullWidth
                        id="slug"
                        label="URL Personalizada"
                        placeholder="pet-shop-amigo-fiel"
                        value={companyData.slug}
                        onChange={(e) => handleCompanyChange("slug", e.target.value)}
                        required
                        InputProps={{
                          startAdornment: (
                            <Typography variant="caption" className="text-gray-500 !text-xs">
                              superpet.com/
                            </Typography>
                          ),
                        }}
                      />
                      <Typography variant="caption" className="text-gray-500 !text-xs mt-1">
                      Esta será a URL onde seus clientes farão agendamentos
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                      gap: 3 
                    }}>
                      <TextField
                        fullWidth
                        id="phone"
                        type="tel"
                        label="Telefone"
                        placeholder="(11) 99999-9999"
                        value={companyData.phone}
                        onChange={(e) => handleCompanyChange("phone", e.target.value)}
                        required
                        InputProps={{
                          startAdornment: <PhoneIcon className="mr-2 text-gray-400" />,
                        }}
                      />

                      <TextField
                        fullWidth
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="contato@petshop.com"
                        value={companyData.email}
                        onChange={(e) => handleCompanyChange("email", e.target.value)}
                        required
                        InputProps={{
                          startAdornment: <EmailIcon className="mr-2 text-gray-400" />,
                        }}
                      />
                    </Box>

                    <TextField
                      fullWidth
                      id="address"
                      label="Endereço Completo"
                      placeholder="Rua, número, bairro, cidade - UF"
                      value={companyData.address}
                      onChange={(e) => handleCompanyChange("address", e.target.value)}
                      required
                      InputProps={{
                        startAdornment: <LocationOnIcon className="mr-2 text-gray-400" />,
                      }}
                    />

                    <Box>
                      <Typography variant="body2" className="mb-3 !text-sm sm:!text-base">Escolha seu Plano</Typography>
                      <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gap: 2
                      }}>
                        {["free", "basic", "premium"].map((plan) => (
                      <Card
                            key={plan}
                        className={`cursor-pointer transition-all ${
                              companyData.plan === plan ? "!border-2 !border-primary" : "hover:!border-primary/30"
                            }`}
                            onClick={() => handleCompanyChange("plan", plan)}
                            sx={{ 
                              minHeight: { xs: 'auto', sm: 140 },
                              '&:hover': { transform: 'translateY(-4px)', transition: '0.2s' }
                            }}
                          >
                            <CardHeader className="pb-2">
                              <Typography variant="h6" className="capitalize !text-base sm:!text-lg">
                                {plan === "free" ? "Gratuito" : plan === "basic" ? "Básico" : "Premium"}
                              </Typography>
                              <Typography variant="h5" className="font-bold !text-2xl sm:!text-3xl">
                                R$ {plan === "free" ? "0" : plan === "basic" ? "79" : "149"}
                              </Typography>
                        </CardHeader>
                            <CardContent>
                              <Typography variant="caption" className="text-gray-600 !text-xs sm:!text-sm">
                                {plan === "free" ? "50 agendamentos/mês" : plan === "basic" ? "Ilimitado" : "Tudo + Relatórios"}
                              </Typography>
                        </CardContent>
                      </Card>
                        ))}
                      </Box>
                    </Box>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                    Continuar
                  </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Admin Account */}
          {step === 2 && (
            <Card className="!shadow-lg">
              <CardHeader className="pb-4">
                <Typography variant="h5" className="!text-lg sm:!text-xl">Criar Conta de Administrador</Typography>
                <Typography variant="body2" className="text-gray-600 !text-xs sm:!text-sm">
                  Esta será sua conta para gerenciar o sistema
                </Typography>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                      fullWidth
                      id="adminName"
                      label="Nome Completo"
                      placeholder="Seu nome"
                      value={adminData.name}
                      onChange={(e) => handleAdminChange("name", e.target.value)}
                      required
                    />

                    <TextField
                      fullWidth
                      id="adminEmail"
                      type="email"
                      label="Email"
                      placeholder="seu@email.com"
                      value={adminData.email}
                      onChange={(e) => handleAdminChange("email", e.target.value)}
                      required
                      InputProps={{
                        startAdornment: <EmailIcon className="mr-2 text-gray-400" />,
                      }}
                    />

                    <TextField
                      fullWidth
                      id="password"
                      type="password"
                      label="Senha"
                      placeholder="Mínimo 6 caracteres"
                      value={adminData.password}
                      onChange={(e) => handleAdminChange("password", e.target.value)}
                      required
                      helperText="Mínimo 6 caracteres"
                      FormHelperTextProps={{ className: '!text-xs' }}
                    />

                    <TextField
                      fullWidth
                      id="confirmPassword"
                      type="password"
                      label="Confirmar Senha"
                      placeholder="Digite a senha novamente"
                      value={adminData.confirmPassword}
                      onChange={(e) => handleAdminChange("confirmPassword", e.target.value)}
                      required
                    />

                    {error && <Alert severity="error" className="!text-sm">{error}</Alert>}

                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2 
                    }}>
                      <Button 
                        type="button" 
                        variant="outlined" 
                        onClick={() => setStep(1)} 
                        fullWidth
                        className="order-2 sm:order-1"
                      >
                      Voltar
                    </Button>
                      <Button 
                        type="submit" 
                        disabled={loading} 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        startIcon={loading ? <CircularProgress size={16} /> : null}
                        className="order-1 sm:order-2"
                      >
                      {loading ? "Criando..." : "Criar Conta"}
                    </Button>
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  )
}
