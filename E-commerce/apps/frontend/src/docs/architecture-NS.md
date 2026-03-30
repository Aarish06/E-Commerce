# Sprint 3 Architecture – Authentication Module

## Overview

This module implements Hook–Service–Repository architecture for user authentication in the clothing brand E-commerce application.

The goal is to separate:

- Presentation logic
- Business logic
- Data access logic

This structure allows easy backend integration in future modules.

---

## 1. User Type

File: src/types/User.ts

### What does it do?
Defines the shape of a User object:

- id
- username
- password
- role (admin | customer)

### Why is it separated?
Types act as shared contracts between repository, service, and context layers.

### Where is it used?
- testUsers
- userRepository
- authService
- AuthContext

---

## 2. Test Data

File: src/data/testUsers.ts

### What does it do?
Provides predefined users for authentication testing.

### Why?
Sprint requires test data stored as TypeScript objects. This allows development without a backend.

### Where is it used?
Imported by userRepository as the initial data source.

---

## 3. User Repository

File: src/repositories/userRepository.ts

### What does it do?
Handles user data access:

- getAll()
- findByUsername()

Currently stores users in memory using testUsers.

### Why?
Repository isolates data access logic. When backend is introduced, only this file will change.

### Where is it used?
Used exclusively by authService.

---

## 4. Auth Service

File: src/services/authService.ts

### What does it do?
Handles business logic for authentication:

- Validates username
- Validates password
- Returns user if valid
- Returns null if invalid

### Why?
Business rules should not exist in UI or context layers.

### Where is it used?
Used inside AuthContext login method.

---

## 5. Auth Context

File: src/context/AuthContext.tsx

### What does it do?
Manages authenticated user state and exposes:

- user
- role
- isLoggedIn
- login()
- logout()

### Why?
Context provides global authentication state without prop drilling.

### Where is it used?
- Login page
- Protected routes
- ProductPage (admin-only access)
- Navbar