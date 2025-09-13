# Overview

This is a full-stack Todo application built with a React frontend and Express.js backend. The application provides user authentication and personal todo management functionality. Users can register, login, and manage their personal todo lists with full CRUD operations. The system uses JWT tokens for authentication and maintains separate todo lists for each authenticated user.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with modern JSX syntax
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router DOM for client-side navigation
- **Development Server**: Runs on port 5000 with API proxy configuration
- **API Integration**: Configured proxy to backend at localhost:3000 for seamless development

## Backend Architecture
- **Framework**: Express.js REST API server
- **Authentication**: JWT-based authentication with bcryptjs for password hashing
- **Data Storage**: In-memory storage for both users and todos (designed for easy database migration)
- **API Design**: RESTful endpoints with proper HTTP status codes and error handling
- **Middleware**: CORS enabled for cross-origin requests, JSON body parsing, and JWT authentication middleware

## Authentication & Authorization
- **Strategy**: JWT tokens with 24-hour expiration
- **Password Security**: bcryptjs with 10 salt rounds
- **Protected Routes**: Middleware-based authentication for todo operations
- **User Isolation**: Todos are filtered by user ID to ensure data privacy

## API Structure
- **Authentication Endpoints**: `/api/auth/register` and `/api/auth/login`
- **Todo Endpoints**: Full CRUD operations at `/api/todos` with user-specific filtering
- **Authorization**: Bearer token authentication for all todo operations
- **Error Handling**: Consistent JSON error responses with appropriate HTTP status codes

## Development Setup
- **Monorepo Structure**: Separate frontend and backend directories with independent package management
- **Hot Reload**: Vite dev server with proxy configuration for seamless API integration
- **TypeScript Support**: Type definitions included for development tooling

# External Dependencies

## Frontend Dependencies
- **react** & **react-dom**: Core React framework for UI components
- **react-router-dom**: Client-side routing and navigation
- **@vitejs/plugin-react**: Vite plugin for React support
- **vite**: Modern build tool and development server

## Backend Dependencies
- **express**: Web framework for REST API server
- **cors**: Cross-origin resource sharing middleware
- **bcryptjs**: Password hashing and validation
- **jsonwebtoken**: JWT token generation and verification
- **uuid**: Unique identifier generation for todos

## Development Dependencies
- **@types/bcryptjs** & **@types/jsonwebtoken**: TypeScript definitions for better development experience

## Environment Requirements
- **JWT_SECRET**: Environment variable required for token signing (currently using fallback for development)
- **PORT**: Configurable port for backend server (defaults to 3000)
