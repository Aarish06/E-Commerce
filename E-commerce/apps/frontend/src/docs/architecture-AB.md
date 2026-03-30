# Sprint 3 Architecture – Shared Page State Refactor (T.4)

## Overview

This document describes how shared state between pages was refactored to use the Hook–Service–Repository architecture instead of localStorage or prop drilling.

The goal of this refactor was to:

- Remove direct localStorage usage
- Eliminate prop drilling between pages
- Centralize shared state logic
- Follow clean separation of concerns

This module specifically refactors Banner state and ensures Product state follows architecture across pages.

---

## 1. Problem Before Refactor

Previously:

- Banner image was stored in localStorage
- Home component directly accessed localStorage
- Shared product state risked being duplicated
- State was not centralized

This created tight coupling and violated architectural separation.

---

## 2. Banner Type

File: `src/types/Banner.ts`

### What does it do?
Defines the shape of Banner data:

- id
- image

### Why?
Ensures consistent structure across repository, service, and hook layers.

### Where is it used?
- testBanner
- bannerRepository
- bannerService
- useBanner
- Home page

---

## 3. Test Banner Data

File: `src/data/testBanner.ts`

### What does it do?
Provides initial banner state for development.

### Why?
Sprint requires test data stored in TypeScript objects. This allows development without backend storage.

### Where is it used?
Imported by bannerRepository as initial data source.

---

## 4. Banner Repository

File: `src/repositories/bannerRepository.ts`

### What does it do?
Handles banner data access:

- get()
- update()

Currently stores banner in memory.

### Why?
Repository isolates data access logic from business logic and UI.
When backend is introduced, only this file will change.

### Where is it used?
Used exclusively by bannerService.

---

## 5. Banner Service

File: `src/services/bannerService.ts`

### What does it do?
Provides business logic for banner updates:

- getBanner()
- updateBanner(image)

### Why?
Business logic should not exist inside UI components.

### Where is it used?
Used inside useBanner hook.

---

## 6. useBanner Hook

File: `src/hooks/useBanner.ts`

### What does it do?
Manages banner presentation state and exposes:

- banner
- updateBanner()

### Why?
Hooks consolidate presentation logic and allow multiple components to access shared state without prop drilling.

### Where is it used?
- Home page

---

## 7. Product Shared State

Product state is shared across:

- ProductList
- ProductPage
- Home (trending)

This state uses:

Component  
↓  
useProducts Hook  
↓  
productService  
↓  
productRepository  

No direct localStorage access exists.

---

## Architecture Flow (Banner Example)

Home  
↓  
useBanner (Hook – presentation logic)  
↓  
bannerService (Business logic)  
↓  
bannerRepository (Data access)  
↓  
testBanner (Data source)

---

## Result of Refactor

After refactoring:

- No localStorage is used for shared state
- No prop drilling between pages
- All shared data follows architecture
- Future backend integration will only require repository updates

This satisfies Sprint 3 Requirement T.4.