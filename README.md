# 🚀 TaskFlow | Modern Task Management System

TaskFlow is a **full-stack productivity and task management platform** designed to help individuals and organizations manage daily work efficiently.

The platform provides a **secure and scalable environment** for managing tasks, tracking deadlines, and monitoring productivity using **modern full-stack technologies**.

TaskFlow implements **JWT Authentication, Email OTP Verification, and Role-Based Access Control (RBAC)** to ensure enterprise-level security.

The system follows a **3-Tier Architecture** using **React, Spring Boot, and MySQL**, making it scalable, maintainable, and production-ready.

---

# 📌 Table of Contents

- Project Overview
- Features
- System Architecture
- Technology Stack
- Project Structure
- Installation & Setup
- Environment Configuration
- API Documentation
- Security Implementation
- Screenshot
- Future Improvements
- Author

---

# 📖 Project Overview

TaskFlow is designed to solve productivity challenges by providing a **centralized platform for task management**.

Unlike basic To-Do applications, TaskFlow includes **secure authentication, analytics dashboards, and administrative monitoring**.

The platform supports two types of users:

### USER
- Create tasks
- Update tasks
- Delete tasks
- Track productivity analytics

### ADMIN
- Monitor all users
- View all tasks
- Manage system activity

---

# ✨ Features

## 🛠 Task Management

- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks

## 📂 Task Organization

Tasks can be categorized into:

- Work
- Personal
- Study

## 🔥 Priority Levels

Tasks can be assigned priority:

- High
- Medium
- Low

## 🔍 Dynamic Filtering

Users can filter tasks by:

- All Tasks
- Pending Tasks
- Completed Tasks
- Overdue Tasks

## 🔄 Status Toggle

Tasks can be quickly marked as:

- Completed
- Pending

---

# 🔐 Advanced Security Features

## JWT Authentication
All API requests are authenticated using **JSON Web Tokens (JWT)**.

## Email OTP Verification
During registration, a **6-digit OTP** is sent to the user's email for verification.

## Role-Based Access Control (RBAC)

Two system roles exist:

- USER
- ADMIN

Access to endpoints is restricted based on role permissions.

---

# 📊 Productivity Analytics

The dashboard displays real-time statistics:

- Total Tasks
- Completed Tasks
- Pending Tasks
- Completion Percentage

These analytics help users track productivity performance.

---

# 🏗 System Architecture

TaskFlow follows a **3-Tier Architecture**.
  
Frontend (React + Tailwind CSS)  
|  
REST API (Spring Boot Backend)  
|  
MySQL Database  


### Layers

**Presentation Layer**
- React.js UI
- Tailwind CSS styling
- Axios for API communication

**Application Layer**
- Spring Boot REST API
- Business logic
- Authentication & Authorization

**Data Layer**
- MySQL relational database
- JPA/Hibernate ORM

---

# 🛠 Technology Stack

### Frontend

- React.js
- Tailwind CSS
- Axios
- React Router

### Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication

### Database

- MySQL

### Dev Tools

- Eclipse  
- Git & GitHub
- Postman
- Maven
- VS Code 

---

# 📂 Project Structure  
  
TaskFlow  
│  
├── taskflow-backend  
│   ├── src/main/java/com/taskflow  
│   │   ├── config  
│   │   ├── controller  
│   │   ├── dto  
│   │   ├── entity  
│   │   ├── exception  
│   │   ├── repository  
│   │   ├── security  
│   │   ├── service  
│   │   └── TaskflowBackendApplication.java  
│   │  
│   ├── src/main/resources  
│   │   └── application.yml  
│   │  
│   ├── pom.xml  
│   └── mvnw  
│  
├── taskflow-frontend  
│   ├── src  
│   │   ├── api  
│   │   ├── components  
│   │   ├── context  
│   │   ├── layout  
│   │   ├── pages  
│   │   ├── services  
│   │   ├── styles  
│   │   └── utils  
│   │  
│   ├── App.jsx  
│   ├── main.jsx  
│   ├── index.html  
│   └── package.json  
│  
├── db  
│   ├── taskflow_db.sql  
│   ├── tasks.sql  
│   └── users.sql  
│  
├── API Collection  
│   └── TaskFlow Backend API's.postman_collection.json  
│  
└── README.md  



---

# ⚙️ Installation & Setup

Follow the steps below to run the project locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/VaibhavChougule236/TaskFlow_Smart_Workflow_Management_Platform.git
cd TaskFlow_Smart_Workflow_Management_Platform


## 2️⃣ Backend Setup (Spring Boot)

Navigate to backend folder:

```bash
cd taskflow-backend
```

### Configure Database

Open the configuration file:

```
src/main/resources/application.yml
```

Example configuration:

```yaml
server:
  port: 8285

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db_name
    username: root
    password: Password
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
    database-platform: org.hibernate.dialect.MySQLDialect

  
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${MAIL_USERNAME:your-email}
    password: ${MAIL_PASSWORD:app password}
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
          connectiontimeout: 5000
          timeout: 5000
          writetimeout: 5000

jwt:
  secret: secrete key
  expiration: 86400000

logging:
  level:
    org.springframework.security: DEBUG
    org.springframework.web: INFO
```

### Run Backend

```bash
./mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8285
```

---

```markdown
## 3️⃣ Frontend Setup (React)

Navigate to frontend folder:

```bash
cd taskflow-frontend


Install dependencies:

```bash
npm install
```

Start React app:

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🌐 API Documentation

Below are the major REST API endpoints.

---

# 🔑 Authentication APIs

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/verify-otp | Verify email OTP |
| POST | /api/auth/login | Login user |
| POST | /api/auth/resend-otp | Resend OTP |

---

# 📋 Task APIs

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |
| PATCH | /api/tasks/{id}/status | Toggle task status |

---

# 👨‍💻 Admin APIs

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/admin/users | Get all users |
| GET | /api/admin/tasks | View all tasks |
| DELETE | /api/admin/user/{id} | Delete user |

---

# 🔐 Security Implementation

TaskFlow implements multiple security layers.

### Password Encryption

Passwords are hashed using:

```
BCryptPasswordEncoder
```

### JWT Authentication

All secured endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```


### CORS Protection

Backend allows requests only from authorized frontend domains.

---

# 📸 Application Screenshot


# 🚀 Future Improvements

Planned features:

- Calendar View for tasks
- Team Collaboration
- Subtasks
- Push Notifications
- Mobile App Version
- Task reminders with Email

---

# ✍️ Author

**Vaibhav Chougule**

Full Stack Developer  
Java • Spring Boot • React  • SQL 

GitHub:  
[https://github.com/YOUR_GITHUB_USERNAME](https://github.com/VaibhavChougule236)

LinkedIn:  
[(Add LinkedIn Profile)](https://www.linkedin.com/in/vaibhavchougule124/)


