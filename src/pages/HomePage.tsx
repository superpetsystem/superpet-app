import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { Calendar, Clock, TrendingUp, Star, Users, Zap, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Plataforma completa de agendamento</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              Gerencie seu <span className="text-primary">pet shop</span> com facilidade
            </h1>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Sistema completo de agendamento online para pet shops. Seus clientes agendam serviços, escolhem
              profissionais e você gerencia tudo em um só lugar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register-company">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Começar Grátis
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  Fazer Login
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              ✓ Sem cartão de crédito • ✓ Configuração em 5 minutos • ✓ Suporte incluído
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <img
                src="/happy-dog-being-groomed-at-pet-salon.jpg"
                alt="Sistema de agendamento para pet shops"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-2xl">+40%</p>
                  <p className="text-sm text-muted-foreground">Mais agendamentos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-primary/10 text-primary">Por que escolher nossa plataforma</Badge>
          <h2 className="text-4xl font-bold text-balance">Tudo que seu negócio precisa</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ferramentas profissionais para gerenciar agendamentos, clientes e equipe
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <Calendar className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-lg">Agendamento Online</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Clientes agendam 24/7 pelo site, sem ligações</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-lg">Gestão de Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Cadastre profissionais e gerencie disponibilidade</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <BarChart3 className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-lg">Relatórios e Análises</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Acompanhe desempenho e serviços mais vendidos</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/30 transition-colors">
            <CardHeader>
              <Zap className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-lg">Configuração Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Comece a usar em minutos, sem complicação</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 bg-card rounded-3xl my-8">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-primary/10 text-primary">Benefícios</Badge>
          <h2 className="text-4xl font-bold text-balance">Transforme seu pet shop</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Automatize agendamentos e foque no que realmente importa: cuidar dos pets
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Economize Tempo</h3>
            <p className="text-muted-foreground">
              Reduza ligações e mensagens. Clientes agendam sozinhos e você recebe notificações automáticas.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Aumente Faturamento</h3>
            <p className="text-muted-foreground">
              Aceite agendamentos 24/7 e reduza horários vazios. Mais agendamentos = mais receita.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Melhore Experiência</h3>
            <p className="text-muted-foreground">
              Clientes escolhem profissionais favoritos e horários convenientes. Satisfação garantida.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-primary/10 text-primary">Planos</Badge>
          <h2 className="text-4xl font-bold text-balance">Escolha o plano ideal</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comece grátis e escale conforme seu negócio cresce
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Gratuito</CardTitle>
              <CardDescription className="text-lg mt-2">Para começar</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">R$ 0</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Até 50 agendamentos/mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">2 profissionais</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Suporte por email</span>
                </li>
              </ul>
              <Link to="/register-company" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Começar Grátis
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary hover:shadow-xl transition-shadow relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Mais Popular</Badge>
            <CardHeader>
              <CardTitle className="text-2xl">Básico</CardTitle>
              <CardDescription className="text-lg mt-2">Para crescer</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">R$ 79</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Agendamentos ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">5 profissionais</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Relatórios básicos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Suporte prioritário</span>
                </li>
              </ul>
              <Link to="/register-company" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90">Começar Agora</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription className="text-lg mt-2">Para escalar</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">R$ 149</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Tudo do Básico</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Profissionais ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Relatórios avançados</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">✓</span>
                  </div>
                  <span className="text-sm">Suporte 24/7</span>
                </li>
              </ul>
              <Link to="/register-company" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Começar Agora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary to-secondary border-0 text-primary-foreground">
          <CardHeader className="text-center space-y-4 py-12">
            <CardTitle className="text-4xl font-bold text-balance">Pronto para começar?</CardTitle>
            <CardDescription className="text-xl text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
              Cadastre seu pet shop agora e comece a receber agendamentos online em minutos
            </CardDescription>
            <div className="pt-4">
              <Link to="/register-company">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Criar Conta Grátis
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-primary">Super Pet</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Super Pet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
