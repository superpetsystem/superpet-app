import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { loginAsync, clearError } from "@/store/authSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Mail, Lock } from "lucide-react"
import { 
  Button, 
  TextField, 
  InputAdornment, 
  Alert, 
  CircularProgress, 
  Card,
  CardContent,
  Box 
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await dispatch(loginAsync({ email, password }))
      
      if (loginAsync.fulfilled.match(result)) {
        toast.success("Login realizado com sucesso!")
        navigate("/dashboard")
      } else if (loginAsync.rejected.match(result)) {
        setError(result.payload as string || "Email ou senha incorretos")
      }
    } catch (err) {
      setError("Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  const isEmailActive = email.length > 0 || emailFocused
  const isPasswordActive = password.length > 0 || passwordFocused

  return (
    <Card className="!shadow-xl !border-0">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <Box className="space-y-4">
            <TextField
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                      className="min-w-0"
                      disableElevation
                      disableRipple
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" className="animate-in slide-in-from-top-2">
                {error}
              </Alert>
            )}

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={isLoading}
              sx={{ height: 44 }}
              startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}
