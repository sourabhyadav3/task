# Task Management Web Application

## Tech Stack

### Frontend

React.js

React Router

Axios

Context API

Tailwind CSS

---

### Backend

Node.js

Express.js

JWT Authentication

BcryptJS

---

### Database

MongoDB Atlas

Mongoose

---

# Folder Structure

```text
project-root/

frontend/
│
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskCard.jsx
│   │   ├── StatsCard.jsx
│   │   └── SearchFilter.jsx
│   │
│   ├── services/
│   │   ├── authApi.js
│   │   └── taskApi.js
│   │
│   └── App.jsx

backend/
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── config/
│   └── db.js
│
└── server.js
```

---

# Database Schemas

## User

```javascript
{
  name: String,
  email: String,
  password: String
}
```

## Task

```javascript
{
  title: String,
  description: String,
  status: String,
  userId: ObjectId
}
```

---

# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

---

## Tasks

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id

PATCH /api/tasks/:id/status

---

# Dashboard Features

Statistics Cards

Search Tasks

Filter Tasks

Add Task

Edit Task

Delete Task

Toggle Status

Pagination

Logout

---

# Bonus Features

Search

Filter

Pagination

Deployment

Dark Mode

Toast Notifications

---

# Deployment

Frontend:
Vercel

Backend:
Render

Database:
MongoDB Atlas

---

# Evaluation Focus

Code Quality

Folder Structure

Authentication

CRUD Functionality

UI/UX

Error Handling

Deployment

Documentation
