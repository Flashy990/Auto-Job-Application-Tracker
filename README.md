# Job Application Tracker

## Project Structure

The project consists of three main components:
- Frontend: React-based web application
- Backend: Spring Boot REST API
- PostgreSQL Database

## Prerequisites

- Java 17
    - build.gradle specifies the Java version. In our current [build.gradle](JobApplicationTrackerBackend/build.gradle), we are using Java 17.
- Node.js **version 20.12.2** or higher
- npm package manager
- PostgreSQL
    - Make sure PostgreSQL is correctly set up.
    - Make sure you update the [application.properties](JobApplicationTrackerBackend/src/main/resources/application.properties) file with your PostgreSQL configurations.

## How to run the project

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd JobApplicationTrackerBackend
   ```

2. Build the project using Gradle:
   ```bash
   ./gradlew build
   ```

3. Run the application:
   ```bash
   ./gradlew bootRun
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup
Please check your **Node.js version** first. If you fail to set up, please update your version. For your reference, we run the frontend with **version 20.12.2**.

1. Navigate to the frontend directory
```bash
cd jobtracker-frontend
```

2. Install dependencies
```bash
npm install
```

3. Run the application
```bash
npm run dev
```

The fronend server will start on `http://localhost:3000`

## Project Structure

### Backend
- The backend is built with Spring Boot
- Main application code is in `src/main/java`
- API endpoints are defined in the controller classes
- Database configuration is in `application.properties`
    - Once again, make sure these are correctly update with your PostgreSQL configuration.

### Frontend
- The frontend is built with TypeScript, React and Vite
- We use Redux Toolkit for state management and Tailwind CSS for styling.
- Main application code is in `src`.
  - Components use PascalCase naming
  - Hooks use camelCase with "use" prefix
  - Each feature manages its own state slice and API interactions
