# GameMateNet 🎮

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white) ![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Автор

**Розробник:** Сергій Щербаков
**Email:** sergiyscherbakov@ukr.net
**Telegram:** @s_help_2010

### 💰 Підтримати розробку
Задонатити на каву USDT (BINANCE SMART CHAIN):
**`0xDFD0A23d2FEd7c1ab8A0F9A4a1F8386832B6f95A`**

---

**Платформа для пошуку ігрових партнерів та створення команд**

Соціальна мережа для геймерів на основі Next.js, Nest.js та PostgreSQL з повноцінним GUI інтерфейсом.

## 🚀 Технології

### Backend
- **Nest.js** - Progressive Node.js framework
- **PostgreSQL** - Реляційна база даних
- **TypeORM** - ORM для TypeScript
- **JWT** - Аутентифікація та авторизація
- **Bcrypt** - Хешування паролів
- **Passport** - Middleware для аутентифікації

### Frontend
- **Next.js 14** - React framework з SSR
- **React 18** - UI бібліотека
- **TypeScript** - Типізація
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Axios** - HTTP клієнт

## 📁 Структура проекту

```
GameMateNet/
├── backend/               # Nest.js backend
│   ├── src/
│   │   ├── auth/         # Модуль аутентифікації
│   │   ├── users/        # Модуль користувачів
│   │   ├── games/        # Модуль ігор
│   │   ├── matches/      # Модуль матчів
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/             # Next.js frontend
│   ├── src/
│   │   ├── app/         # App Router (Next.js 14)
│   │   ├── components/  # React компоненти
│   │   ├── lib/         # API клієнт
│   │   └── store/       # Zustand store
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## ⚙️ Встановлення

### Вимоги
- Node.js >= 18.0.0
- PostgreSQL >= 12.0
- npm >= 9.0.0

### 1. Клонування репозиторію

```bash
git clone https://github.com/sergiyscherbakov/GameMateNet.git
cd GameMateNet
```

### 2. Налаштування Backend

```bash
cd backend
npm install

# Створити .env файл
cp .env.example .env

# Відредагувати .env з вашими налаштуваннями
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USER=postgres
# DATABASE_PASSWORD=your_password
# DATABASE_NAME=gamematenet
# JWT_SECRET=your_secret_key
```

### 3. Налаштування Frontend

```bash
cd ../frontend
npm install

# Створити .env.local файл
cp .env.local.example .env.local

# NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Налаштування PostgreSQL

```bash
# Створити базу даних
psql -U postgres
CREATE DATABASE gamematenet;
\q
```

## 🏃 Запуск

### Backend (порт 3001)

```bash
cd backend

# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### Frontend (порт 3000)

```bash
cd frontend

# Development mode
npm run dev

# Production mode
npm run build
npm run start
```

Відкрийте http://localhost:3000 у браузері.

## 📖 API Endpoints

### Аутентифікація
- `POST /api/auth/register` - Реєстрація користувача
- `POST /api/auth/login` - Вхід користувача

### Користувачі
- `GET /api/users` - Список всіх користувачів
- `GET /api/users/:id` - Отримати користувача
- `PATCH /api/users/:id` - Оновити користувача (потребує auth)
- `DELETE /api/users/:id` - Видалити користувача (потребує auth)

### Ігри
- `GET /api/games` - Список всіх ігор
- `GET /api/games/:id` - Отримати гру
- `POST /api/games` - Створити гру (потребує auth)
- `POST /api/games/seed` - Заповнити БД початковими іграми
- `PATCH /api/games/:id` - Оновити гру (потребує auth)
- `DELETE /api/games/:id` - Видалити гру (потребує auth)

### Матчі
- `GET /api/matches` - Список всіх матчів
- `GET /api/matches?gameId=xxx` - Матчі по грі
- `GET /api/matches/:id` - Отримати матч
- `POST /api/matches` - Створити матч (потребує auth)
- `PATCH /api/matches/:id` - Оновити матч (потребує auth)
- `DELETE /api/matches/:id` - Видалити матч (потребує auth)

## ✨ Функціонал

- ✅ Реєстрація та авторизація користувачів
- ✅ JWT аутентифікація
- ✅ Перегляд списку ігор
- ✅ Створення та перегляд матчів
- ✅ Пошук гравців
- ✅ Фільтрація матчів за грою
- ✅ Responsive дизайн
- ✅ Темна тема

## 🔐 Безпека

- Паролі хешуються за допомогою bcrypt
- JWT токени для аутентифікації
- CORS налаштований для frontend
- Валідація даних на backend
- Protected routes для авторизованих користувачів

## 📄 Ліцензія

MIT License - дивіться файл [LICENSE](LICENSE)

---

**Зроблено з ❤️ для ігрової спільноти**
