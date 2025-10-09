#User Management CRUD API

A robust REST API for managing users, built with Node.js, Express, TypeScript, and Prisma. This project serves as the backend for a user management system, providing endpoints for creating, reading, updating, and deleting users.


#Features
 CRUD Operations: Full support for Create, Read, Update, and Delete operations for users.
 Secure: Password hashing using bcryptjs to protect user credentials.
 Validation: Input validation using Zod to ensure data integrity.
 Structured: Modular architecture with a clear separation of concerns (Routes, Controllers, Services).
 Type-Safe: Written entirely in TypeScript for a robust and maintainable codebase.

#Tech Stack
Backend: Node.js, Express.js

Language: TypeScript

Database: MySQL

ORM: Prisma

Validation: Zod

#Getting Started
*Prerequisites*
Node.js (v18.x or later)

MySQL or Docker

Git

#Installation
Clone the repository:

`git clone <your-repository-url>
cd <repository-name>`

Install dependencies:

`npm install`

#Set up environment variables:
Create a .env file in the root of the project by copying the example file:

`cp .env.example .env`

Open the .env file and update the DATABASE_URL with your MySQL connection string.

`DATABASE_URL="mysql://user:password@host:port/database_name"`
Run database migration:
This command will create the User table in your database based on the Prisma schema.


`npx prisma migrate dev`
Running the Application
Development Mode: (with hot-reloading)

`npm run dev`
Production Mode:

`npm run build
npm run start`
The server will start on http://localhost:3000 (or the port specified in your .env file).
