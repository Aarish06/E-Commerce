# Sprint 3 Architecture – Products Module

## Overview

This module implements the Hook–Service–Repository architecture for managing products in the clothing brand E-commerce application.

The goal of this architecture is to separate concerns clearly between:

- Presentation logic (React components + hooks)
- Business logic (services)
- Data access (repositories)

This structure improves maintainability and prepares the application for backend integration.

---

## 1. Product Type

File: `src/types/Product.ts`

### What does it do?
Defines the shape of a Product object:

- id
- name
- price
- description
- image
- likes
- dislikes
- rating
- category

### Why is it separated?
Types act as contracts shared across layers. Keeping it centralized ensures consistency between repository, service, hook, and UI.

### Where is it used?
- testProducts
- productRepository
- productService
- useProducts
- ProductList
- ProductPage
- Home

---

## 2. Test Data

File: `src/data/testProducts.ts`

### What does it do?
Provides predefined Product objects used as initial data.

### Why?
The sprint requires test data stored as TypeScript objects. This allows development without a backend and makes future backend replacement easier.

### Where is it used?
Imported by productRepository as initial data source.

---

## 3. Product Repository

File: `src/repositories/productRepository.ts`

### What does it do?
Handles CRUD operations:

- getAll()
- create()
- update()
- delete()
- saveAll()

Currently stores data in memory based on testProducts.

### Why?
Repositories isolate data access logic from business logic and UI. When a backend is introduced, only this file needs modification.

### Where is it used?
Used exclusively by productService.

---

## 4. Product Service

File: `src/services/productService.ts`

### What does it do?
Contains business logic such as:

- Adding products
- Updating products
- Deleting products
- Liking/disliking products
- Getting top liked products

### Why?
Business logic should not live inside components. Services ensure reusable and centralized rules.

### Where is it used?
Used inside useProducts hook.

---

## 5. useProducts Hook

File: `src/hooks/useProducts.ts`

### What does it do?
Manages presentation state and exposes product operations to components.

Returns:
- products
- loadProducts()
- addProduct()
- updateProduct()
- deleteProduct()
- likeProduct()
- dislikeProduct()
- getTopLiked()

### Why?
Hooks consolidate presentation logic and prevent prop drilling between pages.

### Where is it used?
- ProductList
- ProductPage
- Home

---

## 6. UI Components

### ProductList
Displays products and triggers like/dislike actions.
Contains only UI logic.

### ProductPage
Admin-only page for adding and editing products.
Uses hook methods for operations.

### Home
Displays trending products using getTopLiked().

---

## Architecture Flow

Component  
↓  
useProducts (Hook – presentation logic)  
↓  
productService (Business logic)  
↓  
productRepository (Data access)  
↓  
testProducts (Data source)

---

## Conclusion

The Products module now follows a clean separation of concerns and is fully prepared for backend integration in future modules.