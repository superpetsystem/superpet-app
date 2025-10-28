import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { getServicesByCompany, getEmployeesByCompany, addAppointment, getCompanies } from "@/lib/data"
import type { Service, Employee } from "@/lib/data"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Clock, Star, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function AgendarPage() {
  const { isAuthenticated, user, currentCompanyId } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const companySlug = searchParams.get("company")

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("")
  const [services, setServices] = useState<Service[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [step, setStep] = useState(companySlug ? 1 : 0)
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedEmployee, setSelectedEmployee] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (companySlug) {
      const companies = getCompanies()
      const company = companies.find((c) => c.slug === companySlug)
      if (company) {
        setSelectedCompanyId(company.id)
        setServices(getServicesByCompany(company.id))
        setEmployees(getEmployeesByCompany(company.id))
      }
    } else if (currentCompanyId) {
      setSelectedCompanyId(currentCompanyId)
      setServices(getServicesByCompany(currentCompanyId))
      setEmployees(getEmployeesByCompany(currentCompanyId))
      setStep(1)
    }
  }, [companySlug, currentCompanyId])

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const selectedEmployeeData = employees.find((e) => e.id === selectedEmployee)
  const availableEmployees = employees.filter((e) => e.available)

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanyId(companyId)
    setServices(getServicesByCompany(companyId))
    setEmployees(getEmployeesByCompany(companyId))
    setStep(1)
  }

  const handleSubmit = async () => {
    if (!isAuthenticated || !user) {
      navigate("/login")
      return
    }

    if (!selectedService || !selectedEmployee || !selectedDate || !selectedTime || !petName || !petType) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const appointment = {
      companyId: selectedCompanyId,
      clientId: user.id,
      clientName: user.name,
      serviceId: selectedService,
      serviceName: selectedServiceData?.name || "",
      employeeId: selectedEmployee,
      employeeName: selectedEmployeeData?.name || "",
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      status: "pending" as const,
      petName,
      petType,
      notes,
    }

    addAppointment(appointment)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-card">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader className="space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-3xl">Agendamento Confirmado!</CardTitle>
              <CardDescription className="text-lg">
                Seu agendamento foi realizado com sucesso. Você receberá uma confirmação em breve.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-lg space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serviço:</span>
                  <span className="font-semibold">{selectedServiceData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profissional:</span>
                  <span className="font-semibold">{selectedEmployeeData?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="font-semibold">
                    {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horário:</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pet:</span>
                  <span className="font-semibold">
                    {petName} ({petType})
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => navigate("/dashboard")} className="flex-1 bg-primary hover:bg-primary/90">
                  Ver Meus Agendamentos
                </Button>
                <Button
                  onClick={() => {
                    setIsSuccess(false)
                    setStep(companySlug || currentCompanyId ? 1 : 0)
                    setSelectedService("")
                    setSelectedEmployee("")
                    setSelectedDate(undefined)
                    setSelectedTime("")
                    setPetName("")
                    setPetType("")
                    setNotes("")
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Novo Agendamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Agendar Serviço</h1>
            <p className="text-muted-foreground">Escolha o serviço, profissional e horário ideal para seu pet</p>
          </div>

          {step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha o Pet Shop</CardTitle>
                <CardDescription>Selecione onde deseja agendar o serviço</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {getCompanies()
                    .filter((c) => c.active)
                    .map((company) => (
                      <Card
                        key={company.id}
                        className="cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleCompanySelect(company.id)}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <CardDescription className="mt-2">{company.address}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">📞 {company.phone}</p>
                            <p className="text-muted-foreground">✉️ {company.email}</p>
                            <Badge variant="secondary" className="mt-2">
                              {company.plan === "free" && "Plano Gratuito"}
                              {company.plan === "basic" && "Plano Básico"}
                              {company.plan === "premium" && "Plano Premium"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Steps */}
          {step > 0 && (
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: "Serviço" },
                { num: 2, label: "Profissional" },
                { num: 3, label: "Data e Hora" },
                { num: 4, label: "Informações" },
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s.num}
                    </div>
                    <span className="text-xs mt-2 text-center">{s.label}</span>
                  </div>
                  {idx < 3 && <div className={`h-1 flex-1 ${step > s.num ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
          )}

          {/* Step 1: Select Service */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha o Serviço</CardTitle>
                <CardDescription>Selecione o serviço que deseja agendar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedService === service.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <CardDescription className="mt-2">{service.description}</CardDescription>
                          </div>
                          {selectedService === service.id && (
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration} min</span>
                          </div>
                          <span className="text-xl font-bold text-primary">R$ {service.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  {!companySlug && !currentCompanyId && (
                    <Button onClick={() => setStep(0)} variant="outline">
                      Voltar
                    </Button>
                  )}
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedService}
                    className="bg-primary hover:bg-primary/90 ml-auto"
                  >
                    Próximo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Employee */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha o Profissional</CardTitle>
                <CardDescription>Selecione o profissional de sua preferência</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {availableEmployees.map((employee) => (
                    <Card
                      key={employee.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedEmployee === employee.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedEmployee(employee.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                            <img
                              src={employee.photo || "/placeholder.svg"}
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{employee.name}</CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-primary fill-primary" />
                              <span className="font-semibold text-sm">{employee.rating}</span>
                            </div>
                          </div>
                          {selectedEmployee === employee.id && (
                            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {employee.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button onClick={() => setStep(1)} variant="outline">
                    Voltar
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!selectedEmployee}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Próximo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Select Date and Time */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Escolha Data e Horário</CardTitle>
                <CardDescription>Selecione quando deseja realizar o serviço</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="mb-4 block">Data</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border"
                      locale={ptBR}
                    />
                  </div>
                  <div>
                    <Label className="mb-4 block">Horário Disponível</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={selectedTime === time ? "bg-blue-600 hover:bg-blue-700" : ""}
                          onClick={() => setSelectedTime(time)}
                          disabled={!selectedDate}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button onClick={() => setStep(2)} variant="outline">
                    Voltar
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Próximo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Pet Information */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Informações do Pet</CardTitle>
                <CardDescription>Conte-nos sobre seu pet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Nome do Pet *</Label>
                    <Input
                      id="petName"
                      placeholder="Ex: Rex"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="petType">Tipo de Pet *</Label>
                    <Select value={petType} onValueChange={setPetType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cachorro">Cachorro</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações (opcional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Alguma informação adicional sobre seu pet..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-blue-50 p-6 rounded-lg space-y-3 mt-6">
                    <h3 className="font-semibold text-lg mb-4">Resumo do Agendamento</h3>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serviço:</span>
                      <span className="font-semibold">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profissional:</span>
                      <span className="font-semibold">{selectedEmployeeData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-semibold">
                        {selectedDate && format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="font-semibold">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="font-semibold">{selectedServiceData?.duration} minutos</span>
                    </div>
                    <div className="flex justify-between text-lg pt-3 border-t">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-blue-600">R$ {selectedServiceData?.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button onClick={() => setStep(3)} variant="outline">
                    Voltar
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!petName || !petType || isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Confirmando..." : "Confirmar Agendamento"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
