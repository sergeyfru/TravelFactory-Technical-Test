# Vacation Manager – Full Stack Web Application  
**Vue 3 • Node.js (Express) • PostgreSQL (Neon)**

## Overview
Vacation Manager is a full-stack web application that allows employees to submit vacation requests, while administrators (validators) can approve or reject them.

- Responsive UI built with **Vue 3**
- Backend powered by **Express**
- Database hosted on **Neon PostgreSQL**

---

## How to Install and Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/sergeyfru/TravelFactory-Technical-Test
cd TravelFactory-Technical-Test
```

---

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev
```

Frontend runs at:  
➡ http://localhost:5173/

---

### 3. Start the Backend  
(Open a second terminal)
```bash
cd server
npm install
node index.js
```

Backend runs at:  
➡ http://localhost:3001/

---

## Demo Users (For Testing)

| Username  | Password | Role       | Notes |
|-----------|----------|------------|-------|
| **user1**   | aaa | requester | Can submit vacation requests |
| **johnDou** | aaa | requester | Same capabilities as user1 |
| **admin**   | aaa | validator | **Only user allowed to manage and approve/reject vacation requests** |

---

##  Database (Neon PostgreSQL)

This project uses **Neon.tech** as an online cloud PostgreSQL database.

### Database Schema

```sql
CREATE TABLE users (
    u_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'requester'
        CHECK (role IN ('requester', 'validator'))
);

CREATE TABLE vacation_requests (
    v_id SERIAL PRIMARY KEY,
    u_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(15) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending','approved','rejected')),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (u_id) REFERENCES users(u_id) ON DELETE CASCADE
);
```

---

##  Technical Choices

### **Vue 3 (Composition API)**
- Modern reactive architecture
- Clean separation of logic and templates

### **Node.js + Express**
- Lightweight REST API
- Simple routing and controllers

### **Neon PostgreSQL**
- Fast cloud-hosted database
- Strong data integrity using SQL constraints

### **Axios**
- Easy and reliable HTTP client
- Used for all communication between frontend and backend

### **LocalStorage Authentication**
- Simple persistence solution for a small project
- Allows storing user role and basic auth state

---

## Known Limitations

### 1. **No Password Hashing**
- Passwords are stored in plain text  
- In real deployments, bcrypt would be required

### 2. **No Centralized Global State Management**
- Project does not use Vuex or Pinia  
- Authentication state is stored only in LocalStorage  

---

## 👤 Author
**Sergey Fruman**  
Full Stack Developer  
Vue 3 • Node.js • PostgreSQL
