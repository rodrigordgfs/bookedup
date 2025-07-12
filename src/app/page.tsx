import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, Star, Phone, MapPin, Mail } from 'lucide-react';

export default function LandingPage() {
  const services = [
    {
      name: 'Corte Masculino',
      price: 'R$ 35',
      duration: '30 min',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Barba',
      price: 'R$ 25',
      duration: '20 min',
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Corte + Barba',
      price: 'R$ 55',
      duration: '45 min',
      image: 'https://images.pexels.com/photos/1570808/pexels-photo-1570808.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Tratamento Capilar',
      price: 'R$ 45',
      duration: '40 min',
      image: 'https://images.pexels.com/photos/1570809/pexels-photo-1570809.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const testimonials = [
    {
      name: 'João Silva',
      rating: 5,
      comment: 'Excelente atendimento! Sempre saio satisfeito com o resultado.',
      service: 'Corte + Barba'
    },
    {
      name: 'Pedro Santos',
      rating: 5,
      comment: 'Profissionais muito competentes. Recomendo!',
      service: 'Corte Masculino'
    },
    {
      name: 'Carlos Lima',
      rating: 5,
      comment: 'O agendamento online é muito prático. Adorei!',
      service: 'Tratamento Capilar'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">StyleBook</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#services" className="text-slate-600 hover:text-slate-800 transition-colors">
                Serviços
              </Link>
              <Link href="#about" className="text-slate-600 hover:text-slate-800 transition-colors">
                Sobre
              </Link>
              <Link href="#contact" className="text-slate-600 hover:text-slate-800 transition-colors">
                Contato
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-slate-800 hover:bg-slate-700">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Agende seus serviços
                <span className="block text-amber-500">com facilidade</span>
              </h1>
              <p className="text-xl text-slate-600 mt-6 leading-relaxed">
                Sistema de agendamento online para barbearias, salões de beleza e estúdios. 
                Simplifique sua rotina e ofereça mais comodidade aos seus clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/booking">
                  <Button size="lg" className="bg-slate-800 hover:bg-slate-700 px-8">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Agora
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="lg" variant="outline" className="border-slate-300 px-8">
                    Cadastrar Negócio
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img 
                  src="https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Barbershop" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Agendamento Rápido</p>
                    <p className="text-sm text-slate-600">Em apenas 2 minutos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços para cuidar da sua aparência
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{service.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-amber-500">{service.price}</span>
                    <span className="text-slate-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </span>
                  </div>
                  <Link href="/booking">
                    <Button className="w-full bg-slate-800 hover:bg-slate-700">
                      Agendar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Por que escolher o StyleBook?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Agendamento Online</h3>
              <p className="text-slate-600">
                Agende seus horários 24/7 através da nossa plataforma intuitiva
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Horários Flexíveis</h3>
              <p className="text-slate-600">
                Escolha o horário que melhor se adequa à sua rotina
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Profissionais Qualificados</h3>
              <p className="text-slate-600">
                Nossa equipe é composta por profissionais experientes e qualificados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              O que nossos clientes dizem
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
                Entre em Contato
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Estamos aqui para ajudar. Entre em contato conosco para agendar ou tirar dúvidas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Telefone</p>
                    <p className="text-slate-600">(11) 99999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Email</p>
                    <p className="text-slate-600">contato@stylebook.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Endereço</p>
                    <p className="text-slate-600">Rua das Flores, 123 - São Paulo, SP</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Envie uma mensagem</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nome
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mensagem
                    </label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="Sua mensagem..."
                    />
                  </div>
                  
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 py-3">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-800" />
                </div>
                <span className="text-lg font-bold">StyleBook</span>
              </div>
              <p className="text-slate-300">
                Plataforma de agendamento online para profissionais da beleza.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="#" className="hover:text-white transition-colors">Agendamento Online</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Gestão de Horários</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Notificações</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Relatórios</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="#" className="hover:text-white transition-colors">Sobre</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Suporte</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-slate-300">
                <li>contato@stylebook.com</li>
                <li>(11) 99999-9999</li>
                <li>Rua das Flores, 123</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; 2024 StyleBook. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}