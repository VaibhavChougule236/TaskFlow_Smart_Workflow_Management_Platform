# TaskFlow | Modern Task Management System

TaskFlow is a **full-stack productivity and task management platform**.  
It allows users to organize their daily work, track deadlines, and monitor productivity through a **modern, responsive interface**.

The system includes **JWT Authentication, Email OTP Verification, and Role-Based Access Control (RBAC)** to provide enterprise-grade security and user management.

The platform follows a **modern full-stack architecture using React, Spring Boot, and MySQL**, making it scalable and maintainable.

---

# 📌 Table of Contents

1. Project Overview
2. Features
3. System Architecture
4. Technology Stack
5. Project Structure
6. API Documentation
7. Installation & Setup
8. Environment Configuration
9. Screenshots
10. UML & Architecture Diagrams
11. Security Implementation
12. Future Improvements
13. Author

---

# 🚀 Project Overview

TaskFlow helps users manage and track tasks efficiently while giving administrators oversight of the system.

Key goals of the project:

• Improve productivity through task organization  
• Provide secure authentication using JWT  
• Implement role-based authorization  
• Allow administrators to monitor system usage  
• Follow **industry standard full-stack architecture**

---

# ✨ Features

## Core Functionality   

### Task Management
• Create tasks  
• View tasks  
• Update tasks  
• Delete tasks  

### Task Organization
Tasks can be categorized by:

• Work  
• Personal  
• Study  

### Priority Levels

• High  
• Medium  
• Low  

### Dynamic Filtering

Users can filter tasks by:

• All   
• Pending  
• Completed  
• Overdue  

### Status Toggling

Users can quickly mark tasks as:

• Completed  
• Pending  

---

# 🔐 Advanced Features  

### JWT Authentication
Secure authentication using **JSON Web Tokens**.

### Email OTP Verification
A **6-digit OTP** is sent to the user's email during registration.

### Role Based Access Control (RBAC)

Two system roles exist:

USER  
ADMIN  

Admins have additional system privileges.

### Admin Dashboard

Admins can:

• Monitor all tasks  
• View all users  
• Manage system activity  

### Security Enhancements

• BCrypt password hashing  
• Password visibility toggle  
• Protected API routes  

### Productivity Analytics

Dashboard statistics include:

• Total tasks  
• Completed tasks  
• Pending tasks  
• Completion percentage  

---

# 🏗 System Architecture

TaskFlow follows a **3-tier architecture**:

