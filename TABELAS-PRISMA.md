# Modelagem de Tabelas para Prisma

## Enums

```prisma
enum ClientStatus {
  active
  inactive
}

enum AppointmentStatus {
  pending
  confirmed
  cancelled
  completed
}

enum NotificationType {
  appointment_confirmed
  appointment_cancelled
  appointment_reminder
  new_client
  new_appointment
  payment_received
  service_completed
  reminder_sent
  system
}

enum ReportType {
  monthly
  financial
  clients
  services
  performance
}
```

## Cliente (`Client`)
```prisma
model Client {
  id                Int      @id @default(autoincrement())
  name              String
  email             String   @unique
  phone             String
  notes             String?
  status            ClientStatus
  totalAppointments Int      @default(0)
  lastVisit         DateTime?
  appointments      Appointment[]
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

## Funcionário (`Staff`)
```prisma
model Staff {
  id           Int      @id @default(autoincrement())
  name         String
  email        String   @unique
  phone        String
  specialties  String[]
  workingHours String?
  active       Boolean  @default(true)
  appointments Appointment[] @relation("StaffAppointments")
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Serviço (`Service`)
```prisma
model Service {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  duration    Int      // minutos
  price       Float
  active      Boolean  @default(true)
  categoryId  Int
  category    Category @relation(fields: [categoryId], references: [id])
  appointments Appointment[]
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Categoria de Serviço (`Category`)
```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  active    Boolean  @default(true)
  services  Service[]
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Agendamento (`Appointment`)
```prisma
model Appointment {
  id             Int               @id @default(autoincrement())
  clientId       Int
  client         Client            @relation(fields: [clientId], references: [id])
  serviceId      Int
  service        Service           @relation(fields: [serviceId], references: [id])
  professionalId Int
  professional   Staff             @relation("StaffAppointments", fields: [professionalId], references: [id])
  date           DateTime
  time           String            // ou DateTime se preferir
  duration       Int
  price          Float
  status         AppointmentStatus
  notes          String?
  userId         String
  user           User              @relation(fields: [userId], references: [id])
  createdAt      DateTime          @default(now())
  updatedAt      DateTime          @updatedAt
}
```

## Notificação (`Notification`)
```prisma
model Notification {
  id         Int              @id @default(autoincrement())
  type       NotificationType
  data       Json?
  clientId   Int?
  client     Client?          @relation(fields: [clientId], references: [id])
  userId     String
  user       User             @relation(fields: [userId], references: [id])
  timestamp  DateTime         @default(now())
}
```

## Relatório (`Report`)
```prisma
model Report {
  id         Int        @id @default(autoincrement())
  type       ReportType
  period     String     // Ex: '2024-06', '2024-Q1', etc
  data       Json
  userId     String
  user       User       @relation(fields: [userId], references: [id])
  createdAt  DateTime   @default(now())
}
```

## Usuário (`User`) (usando Clerk)
```prisma
model User {
  id    String  @id // id do usuário no Clerk
  email String  @unique
  clients        Client[]
  staff          Staff[]
  services       Service[]
  categories     Category[]
  appointments   Appointment[]
  notifications  Notification[]
  reports        Report[]
  businessConfigs BusinessConfig[]
}
```

## Configuração/Empresa (`BusinessConfig`)
```prisma
model BusinessConfig {
  id          Int      @id @default(autoincrement())
  name        String
  email       String
  phone       String
  address     String
  description String?
  workingHours Json
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

> **Observações:**
> - Ajuste os tipos e relações conforme a necessidade real do seu projeto.
> - Se usar autenticação externa (ex: Clerk/Auth0), a tabela `User` pode ser omitida.
> - Campos como status podem ser enums no Prisma.
> - Campos de auditoria (`createdAt`, `updatedAt`) são recomendados para todas as tabelas. 