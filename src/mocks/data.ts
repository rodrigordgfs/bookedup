// Dados mockados centralizados para uso nas páginas

// Clientes
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalAppointments: number;
  lastVisit: string;
  status: 'active' | 'inactive';
  notes: string;
}

export const clients: Client[] = [
  ...[...Array(30)].map((_, i) => ({
    id: i + 1,
    name: `Cliente ${i + 1}`,
    email: `cliente${i + 1}@email.com`,
    phone: `(11) 90000-00${(i + 1).toString().padStart(2, '0')}`,
    totalAppointments: Math.floor(Math.random() * 30) + 1,
    lastVisit: `2024-01-${(i % 28 + 1).toString().padStart(2, '0')}`,
    status: (i % 5 === 0 ? 'inactive' : 'active') as 'active' | 'inactive',
    notes: i % 3 === 0 ? 'Cliente VIP' : ''
  }))
];

// Serviços
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  active: boolean;
}

export const services: Service[] = [
  ...[...Array(30)].map((_, i) => ({
    id: String(i + 1),
    name: `Serviço ${i + 1}`,
    description: `Descrição do serviço ${i + 1}`,
    duration: 20 + (i % 5) * 10,
    price: 30 + (i % 10) * 5,
    category: ['Cabelo', 'Barba', 'Combo', 'Tratamento'][i % 4],
    active: i % 7 !== 0
  }))
];

// Funcionários
export interface StaffMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  workingHours: string;
  active: boolean;
}

export const staff: StaffMember[] = [
  ...[...Array(30)].map((_, i) => ({
    id: i + 1,
    name: `Funcionário ${i + 1}`,
    email: `func${i + 1}@bookedup.com`,
    phone: `(11) 98888-88${(i + 1).toString().padStart(2, '0')}`,
    specialties: [
      ['Corte Masculino', 'Barba'],
      ['Tratamento Capilar', 'Corte Feminino'],
      ['Combo', 'Coloração'],
      ['Sobrancelha', 'Escova']
    ][i % 4],
    workingHours: ['Seg-Sex: 9h-18h', 'Ter-Sáb: 10h-19h', 'Qua-Dom: 8h-17h'][i % 3],
    active: i % 6 !== 0
  }))
];

// Agendamentos
export interface Appointment {
  id: number;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  service: string;
  professional: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: string;
  notes?: string;
}

export const appointments: Appointment[] = [
  // 10 primeiros: data de hoje
  ...[...Array(10)].map((_, i) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return {
      id: i + 1,
      client: {
        name: `Cliente ${((i % 30) + 1)}`,
        email: `cliente${((i % 30) + 1)}@email.com`,
        phone: `(11) 90000-00${((i % 30) + 1).toString().padStart(2, '0')}`
      },
      service: `Serviço ${((i % 30) + 1)}`,
      professional: `Funcionário ${((i % 30) + 1)}`,
      date: `${yyyy}-${mm}-${dd}`,
      time: `${8 + (i % 10)}:00`,
      duration: 20 + (i % 5) * 10,
      price: 30 + (i % 10) * 5,
      status: ['confirmed', 'pending', 'cancelled', 'completed'][i % 4],
      notes: i % 4 === 0 ? 'Agendamento importante' : undefined
    };
  }),
  // 20 restantes: datas aleatórias no mês atual
  ...[...Array(20)].map((_, i) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    // Gera um dia aleatório entre 1 e o último dia do mês
    const lastDay = new Date(yyyy, today.getMonth() + 1, 0).getDate();
    const randomDay = String(Math.floor(Math.random() * lastDay) + 1).padStart(2, '0');
    return {
      id: i + 11,
      client: {
        name: `Cliente ${(((i + 10) % 30) + 1)}`,
        email: `cliente${(((i + 10) % 30) + 1)}@email.com`,
        phone: `(11) 90000-00${(((i + 10) % 30) + 1).toString().padStart(2, '0')}`
      },
      service: `Serviço ${(((i + 10) % 30) + 1)}`,
      professional: `Funcionário ${(((i + 10) % 30) + 1)}`,
      date: `${yyyy}-${mm}-${randomDay}`,
      time: `${8 + ((i + 10) % 10)}:00`,
      duration: 20 + ((i + 10) % 5) * 10,
      price: 30 + ((i + 10) % 10) * 5,
      status: ['confirmed', 'pending', 'cancelled', 'completed'][(i + 10) % 4],
      notes: (i + 10) % 4 === 0 ? 'Agendamento importante' : undefined
    };
  })
];

// Notificações
export interface Notification {
  id: number;
  type: 'appointment_confirmed' | 'appointment_cancelled' | 'appointment_reminder' | 'new_client' | 'new_appointment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  data?: {
    appointmentId?: number;
    clientId?: number;
    serviceId?: number;
  };
}

export const notifications: Notification[] = [
  ...[...Array(30)].map((_, i) => ({
    id: i + 1,
    type: ['appointment_confirmed', 'appointment_cancelled', 'appointment_reminder', 'new_client', 'new_appointment', 'system'][i % 6] as Notification['type'],
    title: `Notificação ${i + 1}`,
    message: `Mensagem da notificação ${i + 1}`,
    timestamp: `2024-01-${(i % 28 + 1).toString().padStart(2, '0')}T${8 + (i % 10)}:00:00Z`,
    read: i % 3 === 0,
    data: {
      appointmentId: i + 1,
      clientId: ((i % 30) + 1),
      serviceId: ((i % 30) + 1)
    }
  }))
];

// Categorias de Serviços
export interface Category {
  id: string;
  name: string;
  active: boolean;
}

export const categories: Category[] = [
  ...[...Array(30)].map((_, i) => ({
    id: String(i + 1),
    name: `Categoria ${i + 1}`,
    active: i % 4 !== 0
  }))
]; 