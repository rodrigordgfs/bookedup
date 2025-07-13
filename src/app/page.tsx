"use client";

// biome-ignore assist/source/organizeImports: <imports>
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, User, Star, Phone, MapPin, Mail, CheckCircle, Info } from 'lucide-react';
import Image from 'next/image';
import { formatToReal } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserMenu } from '@/components/auth/user-menu';
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const services = [
    {
      name: 'Consultoria',
      price: 150,
      duration: '60 min',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: true,
      rating: 4.8
    },
    {
      name: 'Avaliação',
      price: 80,
      duration: '30 min',
      image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false,
      rating: 4.6
    },
    {
      name: 'Sessão Completa',
      price: 200,
      duration: '90 min',
      image: 'https://images.pexels.com/photos/3183155/pexels-photo-3183155.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: true,
      rating: 4.9
    },
    {
      name: 'Manutenção',
      price: 120,
      duration: '45 min',
      image: 'https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false,
      rating: 4.7
    }
  ];

  const testimonials = [
    {
      name: 'João Silva',
      rating: 5,
      comment: 'Excelente plataforma! Facilita muito o agendamento dos meus clientes.',
      service: 'Consultoria',
      avatar: 'JS'
    },
    {
      name: 'Maria Santos',
      rating: 5,
      comment: 'Sistema muito intuitivo e profissional. Recomendo!',
      service: 'Avaliação',
      avatar: 'MS'
    },
    {
      name: 'Carlos Lima',
      rating: 5,
      comment: 'O agendamento online é muito prático. Adorei a experiência!',
      service: 'Sessão Completa',
      avatar: 'CL'
    }
  ];

  const stats = [
    { label: 'Clientes Satisfeitos', value: '10k+', icon: CheckCircle },
    { label: 'Agendamentos Realizados', value: '50k+', icon: Calendar },
    { label: 'Profissionais Ativos', value: '500+', icon: User },
    { label: 'Avaliação Média', value: '4.8/5', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-zinc-800 to-zinc-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">BookedUp</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Serviços
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contato
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <UserMenu />
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                          Entrar
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button className="bg-foreground text-background hover:bg-foreground/90">
                          Cadastrar
                        </Button>
                      </SignUpButton>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Agendamento Online
                </Badge>
                <Badge variant="outline">Disponível 24/7</Badge>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Agende seus serviços
                <span className="block text-amber-500">com facilidade</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
                Plataforma completa de agendamento online para profissionais e empresas. 
                Simplifique sua rotina e ofereça mais comodidade aos seus clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/booking">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-8">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Agora
                  </Button>
                </Link>
                <SignUpButton mode="modal">
                  <Button size="lg" variant="outline" className="border-zinc-300 px-8">
                    Cadastrar Negócio
                  </Button>
                </SignUpButton>
              </div>
            </div>
            <div className="relative">
              <Image
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional Consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Agendamento Rápido</p>
                    <p className="text-sm text-muted-foreground">Em apenas 2 minutos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Nossos Serviços</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Serviços Profissionais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços para atender suas necessidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.name} className="group hover:shadow-xl transition-all duration-300 transform hover:-tranzinc-y-2">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  {service.popular && (
                    <Badge className="absolute top-2 right-2 bg-amber-500">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-500">{formatToReal(service.price)}</span>
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={`${service.name}-star-${i}`} 
                          className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-amber-500 fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">{service.rating}</span>
                  </div>
                  <Link href="/booking">
                    <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                      Agendar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Tabs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Por que escolher o BookedUp?
            </h2>
          </div>
          
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Recursos</TabsTrigger>
              <TabsTrigger value="benefits">Benefícios</TabsTrigger>
              <TabsTrigger value="technology">Tecnologia</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-8">
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>Agendamento Online</CardTitle>
                    <CardDescription>
                      Agende seus horários 24/7 através da nossa plataforma intuitiva
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Horários Flexíveis</CardTitle>
                    <CardDescription>
                      Escolha o horário que melhor se adequa à sua rotina
                    </CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                      <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>Profissionais Qualificados</CardTitle>
                    <CardDescription>
                      Conectamos você com profissionais experientes e qualificados
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="benefits" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Para Clientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Agendamento rápido e fácil
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Lembretes automáticos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Avaliações e comentários
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Pagamento online seguro
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Para Profissionais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Gestão de agenda simplificada
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Relatórios detalhados
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Integração com pagamentos
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        Marketing e promoções
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="technology" className="mt-8">
              <div className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Nossa plataforma utiliza as mais recentes tecnologias para garantir uma experiência excepcional e segura.
                  </AlertDescription>
                </Alert>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Segurança</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={95} className="mb-2" />
                      <p className="text-sm text-muted-foreground">Dados criptografados e protegidos</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={98} className="mb-2" />
                      <p className="text-sm text-muted-foreground">Carregamento rápido e responsivo</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Disponibilidade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={99} className="mb-2" />
                      <p className="text-sm text-muted-foreground">99.9% de uptime garantido</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              O que nossos clientes dizem
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={`${testimonial.name}-${testimonial.service}`} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-4">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.avatar}`} />
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`${testimonial.avatar}-${i}`} className="w-5 h-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">&quot;{testimonial.comment}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como funciona o agendamento online?</AccordionTrigger>
              <AccordionContent>
                O agendamento é simples e rápido. Escolha o serviço, selecione a data e horário disponível, 
                preencha seus dados e confirme. Você receberá uma confirmação por email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Posso cancelar ou reagendar?</AccordionTrigger>
              <AccordionContent>
                Sim! Você pode cancelar ou reagendar seu agendamento até 24 horas antes do horário marcado 
                através da sua conta ou entrando em contato conosco.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Quais formas de pagamento são aceitas?</AccordionTrigger>
              <AccordionContent>
                Aceitamos cartões de crédito e débito, PIX, transferência bancária e pagamento em dinheiro 
                no local. Você pode escolher a forma que preferir.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Como funciona a avaliação dos serviços?</AccordionTrigger>
              <AccordionContent>
                Após cada serviço, você receberá um email solicitando sua avaliação. Sua opinião é muito 
                importante para nós e ajuda outros clientes a escolherem nossos serviços.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Posso usar para diferentes tipos de negócio?</AccordionTrigger>
              <AccordionContent>
                Sim! Nossa plataforma é versátil e pode ser adaptada para diversos tipos de negócios: 
                consultorias, terapias, aulas, serviços técnicos, e muito mais.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Entre em Contato
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Estamos aqui para ajudar. Entre em contato conosco para implementar o sistema de agendamento 
                em seu negócio ou tirar dúvidas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Telefone</p>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">contato@bookedup.com</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Endereço</p>
                    <p className="text-muted-foreground">Rua das Flores, 123 - São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <CardHeader>
                <CardTitle>Envie uma mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contato em breve.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                      Nome
                    </label>
                    <input 
                      id="contact-name"
                      type="text" 
                      className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input 
                      id="contact-email"
                      type="email" 
                      className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                      Mensagem
                    </label>
                    <textarea 
                      id="contact-message"
                      rows={4}
                      className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                      placeholder="Sua mensagem..."
                    />
                  </div>
                  
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90 py-3">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-background" />
                </div>
                <span className="text-lg font-bold">BookedUp</span>
              </div>
              <p className="text-muted-foreground">
                Plataforma completa de agendamento online para profissionais e empresas.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Agendamento Online</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Gestão de Horários</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Notificações</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Relatórios</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Integração de Pagamentos</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Sobre</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contato</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Suporte</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>contato@bookedup.com</li>
                <li>(11) 99999-9999</li>
                <li>Rua das Flores, 123</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 BookedUp. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}