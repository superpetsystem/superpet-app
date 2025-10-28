import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { loginAsync, clearError } from "@/store/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"

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
    <Card className="w-full border-0 shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input with Floating Label */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Mail className={`h-5 w-5 transition-colors duration-200 ${isEmailActive ? 'text-primary' : 'text-gray-400'}`} />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className="pl-10 pr-4 h-14 pt-6 pb-2 transition-all"
              required
            />
            <Label 
              htmlFor="email"
              className={`absolute left-10 pointer-events-none transition-all duration-300 ease-in-out ${
                isEmailActive 
                  ? 'top-2 text-xs text-primary font-semibold scale-100' 
                  : 'top-4 text-sm text-gray-500 scale-100'
              }`}
            >
              Email
            </Label>
          </div>

          {/* Password Input with Floating Label */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className={`h-5 w-5 transition-colors duration-200 ${isPasswordActive ? 'text-primary' : 'text-gray-400'}`} />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className="pl-10 pr-12 h-14 pt-6 pb-2 transition-all"
              required
            />
            <Label 
              htmlFor="password"
              className={`absolute left-10 pointer-events-none transition-all duration-300 ease-in-out ${
                isPasswordActive 
                  ? 'top-2 text-xs text-primary font-semibold scale-100' 
                  : 'top-4 text-sm text-gray-500 scale-100'
              }`}
            >
              Senha
            </Label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-in slide-in-from-top-2">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-sm transition-all" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
