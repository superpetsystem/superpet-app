import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import {
  getAppointments,
  updateAppointmentStatus,
  type Appointment,
  getServicesByCompany,
  getEmployeesByCompany,
  getCompanies,
  type Service,
  type Employee,
} from "@/lib/data"
import { useNavigate } from "react-router-dom"
import { Calendar, Clock, User, TrendingUp, CheckCircle, XCircle, AlertCircle, Settings } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  const { isAuthenticated, user, currentCompanyId } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [companyData, setCompanyData] = useState<any>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all")

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (user?.role !== "company-admin") {
      navigate("/dashboard")
      return
    }

    if (currentCompanyId) {
      setAppointments(getAppointments(currentCompanyId))
      setServices(getServicesByCompany(currentCompanyId))
      setEmployees(getEmployeesByCompany(currentCompanyId))
      const company = getCompanies().find((c) => c.id === currentCompanyId)
      setCompanyData(company)
    }
  }, [isAuthenticated, user, navigate, currentCompanyId])

  const handleStatusChange = (id: string, status: Appointment["status"]) => {
    updateAppointmentStatus(id, status)
    if (currentCompanyId) {
      setAppointments(getAppointments(currentCompanyId))
    }
  }

  const getStatusBadge = (status: Appointment["status"]) => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const, icon: AlertCircle },
      confirmed: { label: "Confirmado", variant: "default" as const, icon: CheckCircle },
      completed: { label: "Concluído", variant: "outline" as const, icon: CheckCircle },
      cancelled: { label: "Cancelado", variant: "destructive" as const, icon: XCircle },
    }
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const filteredAppointments = filter === "all" ? appointments : appointments.filter((apt) => apt.status === filter)

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  }

  const todayAppointments = appointments.filter((apt) => apt.date === format(new Date(), "yyyy-MM-dd"))

  if (!isAuthenticated || user?.role !== "company-admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{companyData?.name || "Painel Administrativo"}</h1>
              <p className="text-muted-foreground">Gerencie agendamentos, serviços e equipe</p>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Settings className="w-4 h-4" />
              Configurações
            </Button>
          </div>
          {companyData && (
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>📍 {companyData.address}</span>
              <span>📞 {companyData.phone}</span>
              <Badge variant="secondary">
                {companyData.plan === "free" && "Plano Gratuito"}
                {companyData.plan === "basic" && "Plano Básico"}
                {companyData.plan === "premium" && "Plano Premium"}
              </Badge>
            </div>
          )}
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-5 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">{stats.total}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    <span>Agendamentos</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pendentes</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="w-3 h-3" />
                    <span>Aguardando</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Confirmados</CardDescription>
                  <CardTitle className="text-3xl text-blue-600">{stats.confirmed}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3" />
                    <span>Confirmados</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Concluídos</CardDescription>
                  <CardTitle className="text-3xl text-green-600">{stats.completed}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3" />
                    <span>Finalizados</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Cancelados</CardDescription>
                  <CardTitle className="text-3xl text-red-600">{stats.cancelled}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <XCircle className="w-3 h-3" />
                    <span>Cancelados</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Appointments */}
            {todayAppointments.length > 0 && (
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Agendamentos de Hoje
                  </CardTitle>
                  <CardDescription>
                    {todayAppointments.length} agendamento(s) para{" "}
                    {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayAppointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{apt.time}</p>
                          </div>
                          <div>
                            <p className="font-semibold">{apt.serviceName}</p>
                            <p className="text-sm text-muted-foreground">
                              {apt.clientName} - {apt.petName} ({apt.petType})
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{apt.employeeName}</Badge>
                          {getStatusBadge(apt.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Mais Agendados</CardTitle>
                  <CardDescription>Top 5 serviços</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {services.slice(0, 5).map((service) => {
                      const count = appointments.filter((apt) => apt.serviceId === service.id).length
                      return (
                        <div key={service.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{service.name}</span>
                          <Badge variant="secondary">{count} agendamentos</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profissionais</CardTitle>
                  <CardDescription>Agendamentos por profissional</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {employees.map((employee) => {
                      const count = appointments.filter((apt) => apt.employeeId === employee.id).length
                      return (
                        <div key={employee.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-100">
                              <img
                                src={employee.photo || "/placeholder.svg"}
                                alt={employee.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">{employee.name}</span>
                          </div>
                          <Badge variant="secondary">{count} agendamentos</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Todos os Agendamentos</CardTitle>
                    <CardDescription>Gerencie e atualize o status dos agendamentos</CardDescription>
                  </div>
                  <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="confirmed">Confirmados</SelectItem>
                      <SelectItem value="completed">Concluídos</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum agendamento encontrado</h3>
                    <p className="text-muted-foreground">
                      {filter === "all"
                        ? "Não há agendamentos no sistema."
                        : `Não há agendamentos com status "${filter}".`}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CardTitle className="text-lg">{appointment.serviceName}</CardTitle>
                                {getStatusBadge(appointment.status)}
                              </div>
                              <CardDescription>Agendamento #{appointment.id}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Cliente</p>
                                  <p className="text-sm text-muted-foreground">{appointment.clientName}</p>
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
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Data</p>
                                  <p className="text-sm text-muted-foreground">
                                    {format(new Date(appointment.date), "dd/MM/yyyy", { locale: ptBR })}
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
                            </div>
                          </div>
                          {appointment.notes && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium mb-1">Observações:</p>
                              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                            </div>
                          )}
                          <div className="flex gap-2 pt-4 border-t">
                            <Select
                              value={appointment.status}
                              onValueChange={(value: Appointment["status"]) =>
                                handleStatusChange(appointment.id, value)
                              }
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="confirmed">Confirmado</SelectItem>
                                <SelectItem value="completed">Concluído</SelectItem>
                                <SelectItem value="cancelled">Cancelado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Serviços</CardTitle>
                    <CardDescription>Gerencie os serviços oferecidos</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Adicionar Serviço</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card key={service.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration} min</span>
                          </div>
                          <span className="text-xl font-bold text-blue-600">R$ {service.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Equipe</CardTitle>
                    <CardDescription>Gerencie os profissionais da sua equipe</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Adicionar Profissional</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {employees.map((employee) => (
                    <Card key={employee.id}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100">
                            <img
                              src={employee.photo || "/placeholder.svg"}
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-sm text-muted-foreground">⭐ {employee.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {employee.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <Badge variant={employee.available ? "default" : "secondary"}>
                              {employee.available ? "Disponível" : "Indisponível"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
