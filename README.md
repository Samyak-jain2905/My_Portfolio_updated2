# My Portfolio

A full-stack portfolio application featuring a modern React frontend and a robust Java Spring Boot backend.

## Project Structure

This repository is divided into two main parts:

- `frontend`: The user interface, built with Next.js and Tailwind CSS.
- `backend`: The API and business logic, built with Java Spring Boot.

## Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (v16) with React 19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

### Backend
- **Framework:** [Spring Boot](https://spring.io/projects/spring-boot) (v3.2.4)
- **Language:** Java 21
- **Database Access:** Spring Data JPA
- **Database:** MySQL
- **Security:** Spring Security & JWT (JSON Web Tokens)
- **Utilities:** Lombok

## Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (v20+) and **npm** installed for the frontend
- **Java** (JDK 21) installed for the backend
- **Maven** installed for backend dependency management
- **MySQL** installed and running on your local machine

## Getting Started

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure your database connection in `src/main/resources/application.properties` (or `.env` if configured). Ensure your MySQL instance is running and the database is created.
3. Build the project using Maven:
   ```bash
   mvn clean install
   ```
4. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will typically start on port `8080`.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Create a `.env.local` file if necessary, pointing your API calls to the backend (e.g., `NEXT_PUBLIC_API_URL=http://localhost:8080`).
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Features (Planned/Implemented)
- Secure authentication using JWT
- Dynamic portfolio content generation
- Responsive and accessible UI
- Smooth animations and transitions

## License

[MIT License](LICENSE) (or choose an appropriate license)
