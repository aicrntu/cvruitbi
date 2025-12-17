# CVRUT ITBI

It built using **Next.js**, **Node.js**, **Express**, and **MongoDB**, designed for real-world institutional and industry use.

The application follows **clean architecture**, **scalable folder structure**, and **industry best practices**, supporting long-term maintainability, security, and extensibility.

---

## 🏗️ Architecture Overview

This project is structured as a **monorepo**, separating frontend and backend concerns while maintaining a unified codebase.


---

## 🚀 Technology Stack

### Frontend
- **Next.js (React Framework)**
- TypeScript / JavaScript
- Tailwind CSS
- Axios for API communication

### Backend
- **Node.js**
- **Express.js**
- MongoDB with Mongoose
- JWT-based authentication

### Database
- **MongoDB**

---


## 🔐 Environment Configuration

### Frontend (`frontend/.env.example`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMAGE_BASE_URL=http://localhost:5000


```

### Backend (`backend/.env.example`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=your_super_random_secret


```