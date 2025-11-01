import { Link } from "react-router-dom"
import { Button, AppBar, Toolbar, Avatar, Chip, Box, Typography } from "@mui/material"
import { Logout as LogoutIcon, Security as SecurityIcon } from "@mui/icons-material"
import { Calendar } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <AppBar position="sticky" className="!bg-white/80 backdrop-blur-sm !shadow-sm border-b !z-50">
      <Toolbar className="container mx-auto max-w-7xl px-4">
        <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
          <Avatar className="!w-10 !h-10 bg-primary">
            <Calendar className="w-5 h-5 text-white" />
          </Avatar>
          <Typography variant="h6" className="font-bold text-primary">
            Super Pet
          </Typography>
        </Link>

        <Box className="hidden md:flex items-center gap-6 ml-8 flex-grow">
          <Link to="/#pricing" className="no-underline">
            <Typography variant="body2" className="text-gray-700 hover:text-primary transition-colors">
              Planos
            </Typography>
          </Link>
          {isAuthenticated && (
            <>
              {user?.role === "client" && (
                <Link to="/dashboard" className="no-underline">
                  <Typography variant="body2" className="text-gray-700 hover:text-primary transition-colors">
                    Meus Agendamentos
                  </Typography>
                </Link>
              )}
              {user?.role === "company-admin" && (
                <Link to="/admin" className="no-underline flex items-center gap-1">
                  <SecurityIcon className="w-4 h-4" />
                  <Typography variant="body2" className="text-gray-700 hover:text-primary transition-colors">
                    Painel Admin
                  </Typography>
                </Link>
              )}
              {user?.role === "admin" && (
                <Link to="/super-admin" className="no-underline flex items-center gap-1">
                  <SecurityIcon className="w-4 h-4" />
                  <Typography variant="body2" className="text-gray-700 hover:text-primary transition-colors">
                    Super Admin
                  </Typography>
                </Link>
              )}
            </>
          )}
        </Box>

        <Box className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Box className="hidden md:flex items-center gap-2 mr-2">
                <Avatar className="!w-8 !h-8" src="/placeholder.svg">
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body2" className="font-medium">
                  {user?.name}
                </Typography>
                {user?.role === "company-admin" && <Chip label="Admin" size="small" className="bg-primary/10 text-primary" />}
                {user?.role === "admin" && <Chip label="Super Admin" size="small" className="bg-secondary/10 text-secondary" />}
              </Box>
              <Button variant="outlined" size="small" onClick={handleLogout} startIcon={<LogoutIcon />}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="no-underline">
                <Button variant="outlined" size="small">
                  Entrar
                </Button>
              </Link>
              <Link to="/register-company" className="no-underline">
                <Button size="small" variant="contained" color="primary">
                  Criar Conta
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
