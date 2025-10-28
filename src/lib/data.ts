export interface Company {
  id: string
  name: string
  slug: string
  logo?: string
  phone: string
  email: string
  address: string
  plan: "free" | "basic" | "premium"
  active: boolean
  createdAt: string
}

export interface Service {
  id: string
  companyId: string // Added companyId for multi-tenant
  name: string
  description: string
  duration: number // in minutes
  price: number
  category: "banho" | "tosa" | "veterinario" | "outros"
}

export interface Employee {
  id: string
  companyId: string // Added companyId for multi-tenant
  name: string
  photo: string
  specialties: string[]
  rating: number
  available: boolean
}

export interface Appointment {
  id: string
  companyId: string // Added companyId for multi-tenant
  clientId: string
  clientName: string
  serviceId: string
  serviceName: string
  employeeId: string
  employeeName: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  petName: string
  petType: string
  notes?: string
}

const companies: Company[] = [
  {
    id: "1",
    name: "Super Pet",
    slug: "super-pet",
    phone: "(11) 3333-3333",
    email: "contato@superpet.com",
    address: "Rua das Flores, 123 - São Paulo, SP",
    plan: "premium",
    active: true,
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Pet Mania",
    slug: "pet-mania",
    phone: "(11) 4444-4444",
    email: "contato@petmania.com",
    address: "Av. Paulista, 456 - São Paulo, SP",
    plan: "basic",
    active: true,
    createdAt: "2025-02-15",
  },
]

export const services: Service[] = [
  {
    id: "1",
    companyId: "1",
    name: "Banho Simples",
    description: "Banho completo com shampoo e condicionador",
    duration: 60,
    price: 50,
    category: "banho",
  },
  {
    id: "2",
    companyId: "1",
    name: "Banho e Tosa",
    description: "Banho completo + tosa higiênica ou completa",
    duration: 120,
    price: 90,
    category: "tosa",
  },
  {
    id: "3",
    companyId: "1",
    name: "Tosa Completa",
    description: "Tosa completa com acabamento profissional",
    duration: 90,
    price: 70,
    category: "tosa",
  },
  {
    id: "4",
    companyId: "1",
    name: "Consulta Veterinária",
    description: "Consulta com veterinário especializado",
    duration: 45,
    price: 120,
    category: "veterinario",
  },
  {
    id: "5",
    companyId: "1",
    name: "Hidratação",
    description: "Tratamento de hidratação profunda para pelos",
    duration: 75,
    price: 80,
    category: "outros",
  },
  {
    id: "6",
    companyId: "1",
    name: "Corte de Unhas",
    description: "Corte e lixamento de unhas",
    duration: 30,
    price: 30,
    category: "outros",
  },
  {
    id: "7",
    companyId: "2",
    name: "Banho Premium",
    description: "Banho com produtos importados",
    duration: 60,
    price: 70,
    category: "banho",
  },
  {
    id: "8",
    companyId: "2",
    name: "Tosa Especial",
    description: "Tosa com design personalizado",
    duration: 90,
    price: 100,
    category: "tosa",
  },
]

export const employees: Employee[] = [
  {
    id: "1",
    companyId: "1",
    name: "Maria Santos",
    photo: "/professional-pet-groomer-woman-smiling.jpg",
    specialties: ["Banho", "Tosa"],
    rating: 4.9,
    available: true,
  },
  {
    id: "2",
    companyId: "1",
    name: "Carlos Oliveira",
    photo: "/professional-pet-groomer-man-smiling.jpg",
    specialties: ["Tosa", "Hidratação"],
    rating: 4.8,
    available: true,
  },
  {
    id: "3",
    companyId: "1",
    name: "Dra. Ana Paula",
    photo: "/female-veterinarian-smiling.jpg",
    specialties: ["Veterinária"],
    rating: 5.0,
    available: true,
  },
  {
    id: "4",
    companyId: "1",
    name: "Pedro Costa",
    photo: "/male-pet-groomer-smiling.jpg",
    specialties: ["Banho", "Corte de Unhas"],
    rating: 4.7,
    available: false,
  },
  {
    id: "5",
    companyId: "2",
    name: "Juliana Lima",
    photo: "/professional-pet-groomer-woman-smiling.jpg",
    specialties: ["Banho", "Tosa"],
    rating: 4.8,
    available: true,
  },
]

const appointments: Appointment[] = [
  {
    id: "1",
    companyId: "1",
    clientId: "2",
    clientName: "João Silva",
    serviceId: "2",
    serviceName: "Banho e Tosa",
    employeeId: "1",
    employeeName: "Maria Santos",
    date: "2025-11-01",
    time: "10:00",
    status: "confirmed",
    petName: "Rex",
    petType: "Cachorro",
  },
]

export const getCompanies = () => companies

export const getCompanyBySlug = (slug: string) => companies.find((c) => c.slug === slug)

export const addCompany = (company: Omit<Company, "id" | "createdAt">) => {
  const newCompany: Company = {
    ...company,
    id: String(companies.length + 1),
    createdAt: new Date().toISOString(),
  }
  companies.push(newCompany)
  return newCompany
}

export const getAppointments = (companyId?: string) => {
  if (companyId) {
    return appointments.filter((a) => a.companyId === companyId)
  }
  return appointments
}

export const addAppointment = (appointment: Omit<Appointment, "id">) => {
  const newAppointment = {
    ...appointment,
    id: String(appointments.length + 1),
  }
  appointments.push(newAppointment)
  return newAppointment
}

export const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
  const appointment = appointments.find((a) => a.id === id)
  if (appointment) {
    appointment.status = status
  }
}

export const getServicesByCompany = (companyId: string) => {
  return services.filter((s) => s.companyId === companyId)
}

export const getEmployeesByCompany = (companyId: string) => {
  return employees.filter((e) => e.companyId === companyId)
}
