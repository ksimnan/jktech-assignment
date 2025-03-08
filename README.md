# User Management and Document Management Backend

## Overview

This project implements a backend service using **NestJS** to manage **user authentication**, **document management**, and **ingestion controls**. The system is designed to support role-based access control (RBAC) and facilitates interaction with a Python-based backend for document ingestion processes.

## Purpose

The primary goal of this backend is to manage users, provide document management capabilities, and trigger ingestion processes for documents. The service leverages a microservices architecture to integrate with a Python backend via APIs or webhooks.

## Features

- **Authentication APIs**: 
  - Register new users.
  - Login and logout functionality.
  - Role-based authentication (Admin, Editor, Viewer).
  
- **User Management APIs**:
  - Admin-only functionality for managing user roles and permissions.

- **Document Management APIs**:
  - CRUD operations for documents.
  - Ability to upload documents.

- **Ingestion Trigger API**:
  - Trigger ingestion processes in the Python backend through a webhook or API call.

- **Ingestion Management API**:
  - Track and manage ongoing ingestion processes.

## Tools and Libraries

- **NestJS**: A progressive Node.js framework for building scalable and maintainable server-side applications.
- **TypeScript**: Provides static typing and helps with maintaining the codebase.
- **PostgreSQL**: Relational database for storing user and document data.
- **JWT**: JSON Web Token for secure authentication and role-based authorization.
- **Microservices Architecture**: Facilitates communication between the NestJS and Python backends.

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Python backend (for ingestion functionality)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/user-document-management-backend.git
cd user-document-management-backend
