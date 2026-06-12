# 🥛 Milzo

Milzo is a full-stack dairy subscription platform that connects customers with nearby dairy vendors through a location-aware subscription system. The platform features dedicated **User, Vendor, and Admin panels**, enabling seamless subscription management, vendor onboarding, inventory control, campaign management, and administrative operations.

---

## Features

### 👤 Customer Module

* Google Authentication (Firebase)
* Discover nearby vendors using geolocation-based search
* Browse vendor profiles and products
* Create and manage subscriptions
* Apply promotional offers and discount campaigns
* Manage delivery addresses
* Update profile information

### 🏪 Vendor Module

* Vendor registration and onboarding
* KYC submission and verification workflow
* Product catalog management
* Inventory and stock management
* Cloudinary-powered image uploads
* Subscription order management

### 🛡️ Admin Module

* Secure admin authentication
* Vendor approval and rejection workflow
* KYC document review system
* Campaign creation and management
* Campaign activation and deactivation
* Dashboard analytics and platform statistics

---

💳 Payment Integration
Stripe Payment Gateway Integration
Secure Checkout Session Creation
Stripe Webhook Integration
Automatic Payment Status Updates via Webhooks
Server-side Payment Verification
Event-driven Payment Processing
Test Environment Implementation using Stripe Sandbox Account

## ⚡ Advanced Features

* Multi-role architecture (User, Vendor, Admin)
* MongoDB Geospatial Search using `$near` and `2dsphere` indexes
* Infinite Scroll Pagination for vendor discovery
* Server-side Pagination for Admin and Vendor dashboards
* JWT Authentication and Role-Based Authorization
* Google OAuth Authentication
* Campaign and Discount Engine
* Vendor KYC Verification Workflow
* Inventory and Product Management
* RTK Query Data Fetching and Caching
* Cloudinary Media Storage
* SEO Optimization for public pages
* Responsive and Mobile-Friendly UI
* Production Deployment with Render 
* Stripe Payment Gateway Integration
* Stripe Webhook-based Payment Status Synchronization

---

## ⚙️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* RTK Query
* Tailwind CSS
* Framer Motion
* React Hook Form
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Services & Deployment

* Firebase Authentication
* Cloudinary
* Render
* Vercel

---

## 🔥 Key Technical Implementations

* Clean and scalable project architecture
* Reusable React components and custom hooks
* Optimized RESTful API design
* MongoDB Geospatial Search for nearby vendor discovery
* JWT-based authentication and authorization
* Automatic logout and session handling on token expiration (401 responses)
* Vendor KYC verification workflow
* Subscription lifecycle management
* Campaign and offer management system
* RTK Query caching and state management
* Loading, Error, and Empty State handling
* Responsive and mobile-first design
* Production-ready deployment and monitoring

---

## 📈 Project Highlights

* Reduced API response times through optimized database queries and efficient data fetching strategies
* Implemented scalable pagination solutions (Infinite Scroll + Server-side Pagination)
* Built a complete multi-role ecosystem with separate User, Vendor, and Admin experiences
* Developed with a strong focus on code reusability, maintainability, performance, and user experience

---

### Short Description

**A production-ready full-stack dairy subscription platform with User, Vendor, and Admin panels, featuring geospatial vendor discovery, campaign management, KYC verification, inventory management, Google Authentication, and scalable architecture.**
