'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Clock, User, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { formatToReal } from '@/lib/utils';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const services = [
    { id: 'consultoria', name: 'Consultoria', price: 150, duration: 60 },
    { id: 'avaliacao', name: 'Avaliação', price: 80, duration: 30 },
    { id: 'sessao-completa', name: 'Sessão Completa', price: 200, duration: 90 },
    { id: 'manutencao', name: 'Manutenção', price: 120, duration: 45 }
  ];

  const availableDates = [
    { date: '2024-01-15', day: 'Segunda', available: true },
    { date: '2024-01-16', day: 'Terça', available: true },
    { date: '2024-01-17', day: 'Quarta', available: false },
    { date: '2024-01-18', day: 'Quinta', available: true },
    { date: '2024-01-19', day: 'Sexta', available: true }
  ];

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getSelectedService = () => {
    return services.find(s => s.id === selectedService);
  };

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking data:', {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo
    });
    setCurrentStep(4); // Go to confirmation step
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-foreground to-muted-foreground rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-background" />
              </div>
              <span className="text-lg font-bold text-foreground">BookedUp</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-foreground text-background' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step < currentStep ? 'bg-foreground' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Serviço</span>
            <span>Data & Hora</span>
            <span>Dados</span>
            <span>Confirmação</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              {currentStep === 1 && 'Escolha seu serviço'}
              {currentStep === 2 && 'Selecione data e horário'}
              {currentStep === 3 && 'Seus dados'}
              {currentStep === 4 && 'Confirmação do agendamento'}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedService === service.id
                          ? 'border-foreground bg-muted/50'
                          : 'border-border hover:border-foreground/50'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                        <div className="text-right">
                          <p className="text-xl font-bold text-foreground">{formatToReal(service.price)}</p>
                          <p className="text-sm text-muted-foreground">{service.duration} min</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Duração: {service.duration} minutos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Escolha uma data</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {availableDates.map((dateOption) => (
                      <button
                        key={dateOption.date}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          !dateOption.available
                            ? 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                            : selectedDate === dateOption.date
                            ? 'border-foreground bg-muted/50 text-foreground'
                            : 'border-border hover:border-foreground/50 text-foreground'
                        }`}
                        onClick={() => dateOption.available && setSelectedDate(dateOption.date)}
                        disabled={!dateOption.available}
                      >
                        <div className="font-semibold">{dateOption.day}</div>
                        <div className="text-sm">{new Date(dateOption.date).getDate()}/01</div>
                        {!dateOption.available && (
                          <Badge variant="secondary" className="mt-1 text-xs">Indisponível</Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Escolha um horário</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            selectedTime === time
                              ? 'border-foreground bg-muted/50 text-foreground'
                              : 'border-border hover:border-foreground/50 text-foreground'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Customer Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">Nome completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground font-medium">Observações (opcional)</Label>
                  <textarea
                    id="notes"
                    placeholder="Alguma observação especial..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Agendamento confirmado!</h3>
                <p className="text-muted-foreground">
                  Seu agendamento foi realizado com sucesso. Você receberá uma confirmação por email e WhatsApp.
                </p>
                
                <div className="bg-muted/50 p-6 rounded-lg text-left max-w-md mx-auto">
                  <h4 className="font-semibold text-foreground mb-4">Detalhes do agendamento:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serviço:</span>
                      <span className="font-medium text-foreground">{getSelectedService()?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-medium text-foreground">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="font-medium text-foreground">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="font-medium text-foreground">{getSelectedService()?.duration} min</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-bold text-foreground">{formatToReal(getSelectedService()?.price || 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer">
                    Adicionar ao Calendário
                  </Button>
                  <Link href="/">
                    <Button variant="outline">
                      Voltar ao início
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between p-8 pt-0">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button 
                onClick={currentStep === 3 ? handleBooking : nextStep}
                disabled={
                  (currentStep === 1 && !selectedService) ||
                  (currentStep === 2 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 3 && (!customerInfo.name || !customerInfo.email || !customerInfo.phone))
                }
                className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer"
              >
                {currentStep === 3 ? 'Confirmar Agendamento' : 'Próximo'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}