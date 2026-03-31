# E-Commerce Backend Architecture & Team Assignments

## Project Overview
Full-stack e-commerce application with React frontend and Node.js/Express backend, using Prisma ORM with PostgreSQL database.

## Team Members & Responsibilities

### 1. Aarish Bansal - Database & Schema Lead (I.2, T.2, T.3)
**Responsibilities:**
- Design and implement Prisma schema following 3NF
- Create database migrations
- Set up Prisma client initialization
- Define all database models (Product, User, Banner, ProductRating)

**Files to work on:**
- `apps/backend/prisma/schema.prisma`
- `apps/backend/.env` (database connection)
- `docker-compose.yml` (PostgreSQL container)

**Key Tasks:**
1. Backend monorepo setup
2. Define Product model with proper relations
3. Define User and Banner models
4. Create ProductRating model for likes/dislikes (3NF compliance)
5. Run initial migration: `npx prisma migrate dev --name init

---

### 2. Dilpreet Singh - Backend API & Routes Lead (I.1, T.1, T.4)
**Responsibilities:**
- Set up Express server structure
- Implement CORS configuration
- Create route handlers for all resources
- Implement controller layer
- Set up middleware (error handling)

**Files to work on:**
- `apps/backend/src/server.ts` (main server configuration)
- `apps/backend/src/routes/` (all route definitions)
- `apps/backend/src/controllers/` (business logic controllers)
- `apps/backend/src/middleware/` (CORS, error handling)

**Key Tasks:**
1. Configure CORS to allow frontend origin (localhost:5173)
2. Set up Express middleware (json parsing, security headers)
3. Create product routes:
   - `GET /api/products` - Get all products
   - `GET /api/products/:id` - Get single product
   - `POST /api/products` - Create product
   - `PUT /api/products/:id` - Update product
   - `DELETE /api/products/:id` - Delete product
   - `POST /api/products/:id/rate` - Rate product (like/dislike)
4. Create user routes:
   - `GET /api/users` - Get all users
   - `GET /api/users/:id` - Get single user
   - `POST /api/users` - Create user
5. Create banner routes:
   - `GET /api/banners` - Get all banners
   - `POST /api/banners` - Create banner
6. Implement error handling middleware

---

### 3. Navkaran Singh - Frontend Integration & Services Lead (I.3, I.4)
**Responsibilities:**
- Create service layer for database operations
- Refactor frontend repositories to use backend API
- Implement state persistence features
- Handle API error states and loading
- Ensure data consistency between frontend and backend

**Files to work on:**
- `apps/backend/src/services/` (database service layer)
- `apps/frontend/src/repositories/` (refactored repositories)
- `apps/frontend/src/services/api.ts` (API client)

**Key Tasks:**
1. Create service layer functions:
   - `productService.ts`: getProducts, getProductById, createProduct, updateProduct, deleteProduct, rateProduct
   - `userService.ts`: getUsers, getUserById, createUser
   - `bannerService.ts`: getBanners, createBanner
2. Create API client with base URL configuration
3. Refactor frontend repositories:
   - Update `productRepositories.ts` to call backend API instead of using test data
   - Update `userRepository.ts` for API integration
   - Update `bannerRepository.ts` for API integration
4. Implement error handling and loading states in repositories
5. Test data persistence:
   - Verify product likes/dislikes persist after page refresh
   - Ensure product data loads from backend on app start
6. Update frontend components to handle async data loading

---
