# E-Commerce Website/Platform with third party intigration
 
 
## Project Overview
This project is a web application integrated with Shopify that allows users to preview customized and purchase custom-designed hoodies and t-shirts.
The platform focuses on bold, expressive designs while providing a smooth and secure e-commerce experience powered by Shopify and Printify.
 
---
 
## Project Team
 
### Team Name
**Rookies**
 
### Team Members
- Aarish Bansal
- Navkaran Singh
- Dilpreet Singh
 
---
 
## Project General Description
 
The goal of this project is to build a E-Commerce website that enables users to purchase apparel with unique and expressive designs. The platform connects directly with Shopify for product management, checkout, and order processing.
 
### High-Level User Stories
 
- As a user, I want customized hoodies and t-shirts by selecting designs, colors, and sizes, so that I can purchase clothing that reflects my personal style.
 
- As a user, I want to preview my custom design before purchasing, so that I can be confident about how the final product will look.
 
- As an admin, I want to manage products, designs, and orders through Shopify, so that inventory and sales can be handled efficiently.
 
---
 
## Technologies Used
 
- Frontend: HTML, CSS, JavaScript and React
- Backend: Node.js / API services
- E-commerce Platform: Shopify & Printify
- Version Control: Git & GitHub
- Deployment: Vercel
---

Local Setup
Prerequisites
Node.js (v18 or higher)
PostgreSQL (installed and running)
Git

1. Clone the Repository
- git clone https://github.com/Aarish06/E-Commerce.git
- cd E-Commerce/E-commerce

2. Install Dependencies
- From the root directory, install all workspace dependencies: 
  npm install

3. Environment Variables Setup
Frontend Environment Variables
- Create a .env file in apps/frontend/:
  env
- VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
- VITE_API_URL=http://localhost:3000
- Backend Environment Variables
- Create a .env file in apps/backend/:
  env
- CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
- CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
- DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"
  PORT=3000

4. Clerk Setup
- Create Clerk Account
- Go to clerk.com and sign up
- Create a new application
- Get API Keys
- Navigate to your Clerk dashboard
- Go to API Keys section
- Copy the Publishable Key and Secret Key
- Add them to your environment variables
- Configure Authentication
- In Clerk dashboard, go to "User & Authentication"
- Enable email/password authentication (minimum requirement)
- Configure any additional auth methods as needed

5. Database Setup
- Create PostgreSQL Database
    # Using psql
    - createdb ecommerce_db
    
    # Or using pgAdmin/DBeaver
    # Create database named "ecommerce_db"
    Run Database Migrations

    - cd apps/backend
    - npx prisma migrate dev --name add_clerk_auth
    - npx prisma generate
    - Seed Database (Optional)
    - npx prisma db seed

6. Clerk Webhook Setup
- Configure Webhook in Clerk Dashboard
- Go to "Webhooks" section in Clerk dashboard
- Add webhook endpoint: https://your-app-url.com/api/webhooks/clerk
- Select events: user.created, user.updated, user.deleted
- Copy the webhook secret
- Add Webhook Secret to Backend env
- CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

7. Start Development Servers
- From the root directory:
  npm run dev(This starts both the frontend (Vite dev server) and backend (Express server) simultaneously.)

    Frontend: http://localhost:5173
    Backend: http://localhost:3000
    Available Scripts
    Script	Description
        npm run dev	Runs both frontend and backend concurrently
        npm run start:frontend	Starts only the frontend dev server
        npm run start:backend	Starts only the backend API server
        npm run build	Builds both frontend and backend for production
        npm run test	Runs tests for both applications
        Prisma Commands
        Database Operations

    # Create and run migrations
    npx prisma migrate dev --name migration_name
    
    # Generate Prisma client
    npx prisma generate
    
    # View database in Prisma Studio
    npx prisma studio
    
    # Reset database (development only)
    npx prisma migrate reset
    
    # Deploy migrations to production
    npx prisma migrate deploy
    Schema Management
    bash
    # Push schema changes to database (development)
    npx prisma db push
    
    # Check database status
    - npx prisma migrate status
        Architecture Overview
        Authentication Flow
        - Frontend: Uses Clerk React components for authentication UI
        - Backend: Verifies Clerk session tokens via middleware
        - Database: Stores user profiles with Clerk user IDs as primary keys

        Key Components
        - ProtectedRoute: Wrapper component for protected routes
        - ClerkProvider: Provides Clerk context to the entire app
        - Auth Middleware: Backend middleware for token verification
        - Webhook Handler: Syncs Clerk users with database

        Development Guidelines
            Frontend Development
            - Components located in apps/frontend/src/components/
            - Pages in apps/frontend/src/pages/
            - Services in apps/frontend/src/services/
            - Uses Clerk hooks: useUser(), useAuth(), SignedIn, SignedOut

            Backend Development
            - API routes in apps/backend/src/api/v1/routes/
            - Controllers in apps/backend/src/api/v1/controllers/
            - Services in apps/backend/src/api/v1/services/
            - Middleware in apps/backend/src/api/v1/middleware/

            Database Changes
            - Update apps/backend/prisma/schema.prisma
            - Run npx prisma migrate dev --name descriptive_name
            - Run npx prisma generate

            Deployment
            - Vercel Deployment
            - Frontend Deployment
            - Prepare for Deployment

    # Build the frontend
    - cd apps/frontend
    - npm run build
    - Connect to Vercel
    - Push code to GitHub repository
    - Go to vercel.com
    - Click "New Project"
    - Import your GitHub repository
    - Configure Vercel Settings
    - Root Directory: apps/frontend
    - Build Command: npm run build
    - Output Directory: dist
    - Install Command: npm install
    - Add Environment Variables In Vercel dashboard, add:
    - VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
    - VITE_API_URL=https://your-backend-url.vercel.app
    - Backend Deployment
    - Configure Backend for Vercel
    - Add vercel.json configuration file
    - Update serverless function structure
    - Deploy Backend
    - Use same repository but different Vercel project
    - Set root directory to apps/backend
    - Configure serverless functions
    - Backend Environment Variables
    - CLERK_SECRET_KEY=sk_test_your_key
    - CLERK_PUBLISHABLE_KEY=pk_test_your_key
    - DATABASE_URL=your_production_db_url
    - CLERK_WEBHOOK_SECRET=your_webhook_secret
    - Database Deployment
    - PostgreSQL Options
    - Vercel Postgres (recommended)
    - Update Connection
    - Update DATABASE_URL in production environment
    - Run migrations: npx prisma migrate deploy
    - Webhook Configuration
    - Update Webhook URL
    - In Clerk dashboard, update webhook endpoint to production URL
    - Test webhook events
    - Verify Integration
    - Test user creation/login flow
    - Verify database synchronization
    - Troubleshooting
    - Common Issues
    - Clerk Authentication Not Working
    - Verify environment variables are correct
    - Check Clerk dashboard configuration
    - Ensure ClerkProvider wraps the app
    - Database Connection Issues
    - Verify PostgreSQL is running
    - Check DATABASE_URL format
    - Ensure database exists
    - Migration Errors
    - Reset database: npx prisma migrate reset
    - Check schema.prisma for syntax errors
    - CORS Issues
    - Verify backend CORS configuration
    - Check frontend API URL
    - Getting Help
    - Check the Clerk Documentation
    - Review Prisma Documentation
    - Check project issues on GitHub