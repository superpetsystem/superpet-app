import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { getAppointments, updateAppointmentStatus, type Appointment } from "@/lib/data"
import { useNavigate } from "react-router-dom"
import { Calendar, Clock, User, Phone, Mail, MapPin, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Link } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    // Filter appointments for current user
    const allAppointments = getAppointments()
    const userAppointments = allAppointments.filter((apt) => apt.clientId === user?.id)
    setAppointments(userAppointments)
  }, [isAuthenticated, user, navigate])

  const handleCancelAppointment = (id: string) => {
    updateAppointmentStatus(id, "cancelled")
    const allAppointments = getAppointments()
    const userAppointments = allAppointments.filter((apt) => apt.clientId === user?.id)
    setAppointments(userAppointments)
    setCancellingId(null)
  }

  const getStatusBadge = (status: Appointment["status"]) => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const },
      confirmed: { label: "Confirmado", variant: "default" as const },
      completed: { label: "Concluído", variant: "outline" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    }
    const config = statusConfig[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === "pending" || apt.status === "confirmed")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed" || apt.status === "cancelled")

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
                    {user?.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>Cliente Super Pet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>São Paulo, SP</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-secondary">{appointments.length}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary">{upcomingAppointments.length}</p>
                      <p className="text-xs text-muted-foreground">Próximos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/agendar">
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Appointments */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Meus Agendamentos</h1>
              <p className="text-muted-foreground">Gerencie seus agendamentos e histórico</p>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Próximos ({upcomingAppointments.length})</TabsTrigger>
                <TabsTrigger value="past">Histórico ({pastAppointments.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Nenhum agendamento próximo</h3>
                      <p className="text-muted-foreground text-center mb-6">
                        Você não tem agendamentos futuros. Que tal agendar um serviço?
                      </p>
                      <Link to="/agendar">
                        <Button className="bg-secondary hover:bg-secondary/90">
                          <Plus className="w-4 h-4 mr-2" />
                          Agendar Agora
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl">{appointment.serviceName}</CardTitle>
                              {getStatusBadge(appointment.status)}
                            </div>
                            <CardDescription>Agendamento #{appointment.id}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Data</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Horário</p>
                                <p className="text-sm text-muted-foreground">{appointment.time}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Profissional</p>
                                <p className="text-sm text-muted-foreground">{appointment.employeeName}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 text-muted-foreground">🐾</div>
                              <div>
                                <p className="text-sm font-medium">Pet</p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.petName} ({appointment.petType})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-4 p-3 bg-secondary/10 rounded-lg">
                            <p className="text-sm font-medium mb-1">Observações:</p>
                            <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                          </div>
                        )}
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setCancellingId(appointment.id)}
                            className="ml-auto"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancelar Agendamento
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastAppointments.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Nenhum histórico</h3>
                      <p className="text-muted-foreground text-center">
                        Você ainda não tem agendamentos concluídos ou cancelados.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  pastAppointments.map((appointment) => (
                    <Card key={appointment.id} className="opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-xl">{appointment.serviceName}</CardTitle>
                              {getStatusBadge(appointment.status)}
                            </div>
                            <CardDescription>Agendamento #{appointment.id}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Data</p>
                                <p className="text-sm text-muted-foreground">
                                  {format(new Date(appointment.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Horário</p>
                                <p className="text-sm text-muted-foreground">{appointment.time}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Profissional</p>
                                <p className="text-sm text-muted-foreground">{appointment.employeeName}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 text-muted-foreground">🐾</div>
                              <div>
                                <p className="text-sm font-medium">Pet</p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.petName} ({appointment.petType})
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={!!cancellingId} onOpenChange={() => setCancellingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar Agendamento</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancellingId && handleCancelAppointment(cancellingId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, Cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
