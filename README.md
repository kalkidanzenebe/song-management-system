# Song Management System

A full-stack MERN application for managing songs and viewing statistics.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Docker

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- Redux Saga
- Emotion (Styled Components)
- Vite

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB (or Docker)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Start the backend (with Docker):
   ```bash
   docker-compose up
   ```
   
   Or without Docker (make sure MongoDB is running locally):
   ```bash
   npm run dev
   ```

The backend will be running on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```

The frontend will be running on http://localhost:5173

## Features

### Backend
- REST API for songs (CRUD operations)
- Statistics endpoint
- Docker support

### Frontend
- Song management (add, edit, delete)
- Real-time updates without page reload
- Filter songs by genre
- Statistics dashboard
- Responsive UI with Emotion

## Project Structure

```
song-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── api/
    │   ├── features/
    │   │   ├── songs/
    │   │   └── stats/
    │   ├── shared/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```
