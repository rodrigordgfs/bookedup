# REQUESTS.md - API Endpoints do BookedUp

Este documento contém todas as requisições da API necessárias para o sistema de gerenciamento de agendamentos BookedUp.

## Base URL
```
https://api.bookedup.com/v1
```

## Autenticação
Todas as requisições (exceto login/registro) devem incluir o header de autorização:
```
Authorization: Bearer <token>
```

---

## 🔐 AUTENTICAÇÃO

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@bookedup.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@bookedup.com",
    "role": "admin",
    "avatarUrl": "https://..."
  }
}
```

### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@bookedup.com",
  "password": "senha123",
  "businessName": "BookedUp Barbearia"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer <token>
```

---

## 👥 CLIENTES

### Listar Clientes
```http
GET /clients?page=1&limit=10&search=joao&status=active
Authorization: Bearer <token>
```

**Headers:**
```
X-Pagination-Page: 1
X-Pagination-Limit: 10
X-Pagination-Total: 25
X-Pagination-TotalPages: 3
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "(11) 99999-9999",
    "totalAppointments": 15,
    "lastVisit": "2024-01-10",
    "status": "active",
    "notes": "Cliente preferencial",
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-10T15:30:00Z"
  }
]
```

### Buscar Cliente por ID
```http
GET /clients/1
Authorization: Bearer <token>
```

### Criar Cliente
```http
POST /clients
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "notes": "Cliente preferencial"
}
```

### Atualizar Cliente
```http
PUT /clients/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao.silva@email.com",
  "phone": "(11) 99999-8888",
  "notes": "Cliente preferencial - atualizado"
}
```

### Excluir Cliente
```http
DELETE /clients/1
Authorization: Bearer <token>
```

### Ativar/Desativar Cliente
```http
PATCH /clients/1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "inactive"
}
```

### Histórico de Agendamentos do Cliente
```http
GET /clients/1/appointments?page=1&limit=10
Authorization: Bearer <token>
```

---

## 👨‍💼 FUNCIONÁRIOS

### Listar Funcionários
```http
GET /staff?page=1&limit=10&search=joao&status=active
Authorization: Bearer <token>
```

**Headers:**
```
X-Pagination-Page: 1
X-Pagination-Limit: 10
X-Pagination-Total: 8
X-Pagination-TotalPages: 1
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@bookedup.com",
    "phone": "(11) 99999-9999",
    "specialties": ["Corte Masculino", "Barba"],
    "workingHours": "Seg-Sex: 9h-18h",
    "active": true,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-10T15:30:00Z"
  }
]
```

### Buscar Funcionário por ID
```http
GET /staff/1
Authorization: Bearer <token>
```

### Criar Funcionário
```http
POST /staff
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@bookedup.com",
  "phone": "(11) 99999-9999",
  "specialties": ["Corte Masculino", "Barba"],
  "workingHours": "Seg-Sex: 9h-18h"
}
```

### Atualizar Funcionário
```http
PUT /staff/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao.silva@bookedup.com",
  "phone": "(11) 99999-8888",
  "specialties": ["Corte Masculino", "Barba", "Tratamento Capilar"],
  "workingHours": "Seg-Sex: 8h-17h"
}
```

### Excluir Funcionário
```http
DELETE /staff/1
Authorization: Bearer <token>
```

### Ativar/Desativar Funcionário
```http
PATCH /staff/1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "active": false
}
```

### Agendamentos do Funcionário
```http
GET /staff/1/appointments?date=2024-01-15
Authorization: Bearer <token>
```

---

## ✂️ SERVIÇOS

### Listar Serviços
```http
GET /services?page=1&limit=10&search=corte&category=Cabelo
Authorization: Bearer <token>
```

**Headers:**
```
X-Pagination-Page: 1
X-Pagination-Limit: 10
X-Pagination-Total: 12
X-Pagination-TotalPages: 2
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Corte Masculino",
    "description": "Corte tradicional masculino com acabamento",
    "duration": 30,
    "price": 35.00,
    "category": "Cabelo",
    "active": true,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-10T15:30:00Z"
  }
]
```

### Buscar Serviço por ID
```http
GET /services/1
Authorization: Bearer <token>
```

### Criar Serviço
```http
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Corte Masculino",
  "description": "Corte tradicional masculino com acabamento",
  "duration": 30,
  "price": 35.00,
  "category": "Cabelo"
}
```

### Atualizar Serviço
```http
PUT /services/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Corte Masculino Premium",
  "description": "Corte tradicional masculino com acabamento premium",
  "duration": 45,
  "price": 45.00,
  "category": "Cabelo"
}
```

### Excluir Serviço
```http
DELETE /services/1
Authorization: Bearer <token>
```

### Ativar/Desativar Serviço
```http
PATCH /services/1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "active": false
}
```

---

## 📂 CATEGORIAS DE SERVIÇOS

### Listar Categorias
```http
GET /categories?active=true
Authorization: Bearer <token>
```

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Cabelo",
    "active": true,
    "servicesCount": 5,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-10T15:30:00Z"
  }
]
```

### Buscar Categoria por ID
```http
GET /categories/1
Authorization: Bearer <token>
```

### Criar Categoria
```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Cabelo"
}
```

### Atualizar Categoria
```http
PUT /categories/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Cabelo Masculino"
}
```

### Excluir Categoria
```http
DELETE /categories/1
Authorization: Bearer <token>
```

### Ativar/Desativar Categoria
```http
PATCH /categories/1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "active": false
}
```

---

## 📅 AGENDAMENTOS

### Listar Agendamentos
```http
GET /appointments?page=1&limit=10&date=2024-01-15&status=confirmed&client=1&service=1&professional=1
Authorization: Bearer <token>
```

**Headers:**
```
X-Pagination-Page: 1
X-Pagination-Limit: 10
X-Pagination-Total: 25
X-Pagination-TotalPages: 3
```

**Resposta:**
```json
[
  {
    "id": 1,
    "client": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com",
      "phone": "(11) 99999-9999"
    },
    "service": {
      "id": 1,
      "name": "Corte Masculino",
      "duration": 30,
      "price": 35.00
    },
    "professional": {
      "id": 1,
      "name": "João Silva"
    },
    "date": "2024-01-15",
    "time": "09:00",
    "duration": 30,
    "price": 35.00,
    "status": "confirmed",
    "notes": "Cliente preferencial",
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-10T15:30:00Z"
  }
]
```

### Buscar Agendamento por ID
```http
GET /appointments/1
Authorization: Bearer <token>
```

### Criar Agendamento
```http
POST /appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": 1,
  "serviceId": 1,
  "professionalId": 1,
  "date": "2024-01-15",
  "time": "09:00",
  "notes": "Cliente preferencial"
}
```

### Atualizar Agendamento
```http
PUT /appointments/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "clientId": 1,
  "serviceId": 1,
  "professionalId": 1,
  "date": "2024-01-16",
  "time": "10:00",
  "notes": "Cliente preferencial - reagendado"
}
```

### Excluir Agendamento
```http
DELETE /appointments/1
Authorization: Bearer <token>
```

### Atualizar Status do Agendamento
```http
PATCH /appointments/1/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

### Agendamentos por Data
```http
GET /appointments/date/2024-01-15
Authorization: Bearer <token>
```

### Agendamentos por Cliente
```http
GET /clients/1/appointments?page=1&limit=10
Authorization: Bearer <token>
```

### Agendamentos por Funcionário
```http
GET /staff/1/appointments?date=2024-01-15
Authorization: Bearer <token>
```

### Verificar Disponibilidade
```http
POST /appointments/check-availability
Authorization: Bearer <token>
Content-Type: application/json

{
  "professionalId": 1,
  "date": "2024-01-15",
  "time": "09:00",
  "duration": 30
}
```

**Resposta:**
```json
{
  "available": true,
  "conflicts": []
}
```

---

## 📊 DASHBOARD

### Estatísticas do Dashboard
```http
GET /dashboard/stats?date=2024-01-15
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "todayStats": {
    "appointments": 8,
    "revenue": 385.00,
    "completed": 4,
    "pending": 2,
    "cancelled": 1
  },
  "upcomingAppointments": [
    {
      "id": 1,
      "client": "João Silva",
      "service": "Corte + Barba",
      "time": "09:00",
      "duration": "45 min",
      "status": "confirmed",
      "price": 55.00
    }
  ],
  "recentActivity": [
    {
      "id": 1,
      "type": "appointment_confirmed",
      "message": "João Silva confirmou agendamento",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Relatórios
```http
GET /dashboard/reports?type=revenue&period=month&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

---

## ⚙️ CONFIGURAÇÕES

### Buscar Configurações
```http
GET /settings
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "business": {
    "name": "BookedUp Barbearia",
    "email": "contato@bookedup.com",
    "phone": "(11) 99999-9999",
    "address": "Rua das Flores, 123 - São Paulo, SP",
    "description": "A melhor barbearia da região"
  },
  "workingHours": {
    "monday": { "open": "09:00", "close": "18:00", "enabled": true },
    "tuesday": { "open": "09:00", "close": "18:00", "enabled": true },
    "wednesday": { "open": "09:00", "close": "18:00", "enabled": true },
    "thursday": { "open": "09:00", "close": "18:00", "enabled": true },
    "friday": { "open": "09:00", "close": "18:00", "enabled": true },
    "saturday": { "open": "09:00", "close": "16:00", "enabled": true },
    "sunday": { "open": "10:00", "close": "14:00", "enabled": false }
  },
  "notifications": {
    "emailBookings": true,
    "smsReminders": true,
    "whatsappNotifications": true,
    "dailyReport": false
  }
}
```

### Atualizar Configurações do Negócio
```http
PUT /settings/business
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "BookedUp Barbearia Premium",
  "email": "contato@bookedup.com",
  "phone": "(11) 99999-9999",
  "address": "Rua das Flores, 123 - São Paulo, SP",
  "description": "A melhor barbearia da região"
}
```

### Atualizar Horários de Funcionamento
```http
PUT /settings/working-hours
Authorization: Bearer <token>
Content-Type: application/json

{
  "monday": { "open": "09:00", "close": "18:00", "enabled": true },
  "tuesday": { "open": "09:00", "close": "18:00", "enabled": true },
  "wednesday": { "open": "09:00", "close": "18:00", "enabled": true },
  "thursday": { "open": "09:00", "close": "18:00", "enabled": true },
  "friday": { "open": "09:00", "close": "18:00", "enabled": true },
  "saturday": { "open": "09:00", "close": "16:00", "enabled": true },
  "sunday": { "open": "10:00", "close": "14:00", "enabled": false }
}
```

### Atualizar Configurações de Notificações
```http
PUT /settings/notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "emailBookings": true,
  "smsReminders": true,
  "whatsappNotifications": true,
  "dailyReport": false
}
```

---

## 📱 NOTIFICAÇÕES

### Enviar Notificação
```http
POST /notifications/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "appointment_reminder",
  "recipient": "joao@email.com",
  "appointmentId": 1,
  "message": "Lembrete: Seu agendamento está marcado para amanhã às 09:00"
}
```

### Listar Notificações
```http
GET /notifications?page=1&limit=10&type=appointment_reminder
Authorization: Bearer <token>
```

---

## 🔍 BUSCA E FILTROS

### Busca Global
```http
GET /search?q=joao&type=all&page=1&limit=10
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "clients": [...],
  "appointments": [...],
  "services": [...],
  "staff": [...]
}
```

---

## 📈 RELATÓRIOS

### Relatório de Faturamento
```http
GET /reports/revenue?startDate=2024-01-01&endDate=2024-01-31&groupBy=day
Authorization: Bearer <token>
```

### Relatório de Agendamentos
```http
GET /reports/appointments?startDate=2024-01-01&endDate=2024-01-31&professionalId=1
Authorization: Bearer <token>
```

### Relatório de Clientes
```http
GET /reports/clients?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

---

## 🚨 CÓDIGOS DE ERRO

### Erros Comuns
- `400` - Bad Request (dados inválidos)
- `401` - Unauthorized (token inválido/expirado)
- `403` - Forbidden (sem permissão)
- `404` - Not Found (recurso não encontrado)
- `409` - Conflict (conflito de dados)
- `422` - Unprocessable Entity (validação falhou)
- `500` - Internal Server Error (erro interno)

### Exemplo de Resposta de Erro
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Dados inválidos",
  "details": {
    "email": ["Email é obrigatório"],
    "phone": ["Telefone deve ter formato válido"]
  }
}
```

---

## 📝 NOTAS IMPORTANTES

1. **Paginação**: Todos os endpoints de listagem suportam paginação com `page` e `limit`. A paginação vem nos headers HTTP:
   - `X-Pagination-Page`: Página atual
   - `X-Pagination-Limit`: Itens por página
   - `X-Pagination-Total`: Total de itens
   - `X-Pagination-TotalPages`: Total de páginas

2. **Respostas**: Os dados vêm diretamente no corpo da resposta, sem wrapper `success` e `data`

3. **Filtros**: Muitos endpoints suportam filtros por status, data, etc.

4. **Ordenação**: Use `sort` e `order` para ordenar resultados

5. **Busca**: Use `search` para busca textual

6. **Datas**: Use formato ISO 8601 para datas

7. **Valores**: Preços devem ser enviados em centavos ou como decimal

8. **Timezone**: Todas as datas são em UTC

9. **Rate Limiting**: Máximo 100 requisições por minuto por IP

10. **Cache**: Respostas podem ser cacheadas por até 5 minutos

11. **Webhooks**: Suporte a webhooks para eventos importantes

---

## 🔄 WEBHOOKS

### Configurar Webhook
```http
POST /webhooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://seu-site.com/webhook",
  "events": ["appointment.created", "appointment.updated"],
  "secret": "seu-secret-aqui"
}
```

### Eventos Disponíveis
- `appointment.created`
- `appointment.updated`
- `appointment.cancelled`
- `client.created`
- `client.updated`
- `service.created`
- `service.updated`

---

## 📱 API MOBILE

### Endpoints Específicos para Mobile
```http
GET /mobile/appointments/today
GET /mobile/staff/schedule
GET /mobile/clients/search
POST /mobile/appointments/quick-book
```

---

Este documento deve ser atualizado conforme novas funcionalidades são adicionadas ao sistema. 