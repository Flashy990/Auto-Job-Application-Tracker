# Job Application Tracker

## Project Structure

The project consists of three main components:
- Frontend: React-based web application
- Backend: Spring Boot REST API
- PostgreSQL Database

## Prerequisites

- Java 17
    - build.gradle specifies the Java version. In our current [build.gradle](JobApplicationTrackerBackend/build.gradle), we are using Java 17.
- Node.js 18 or higher
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

TODO by frontend team

## Project Structure

### Backend
- The backend is built with Spring Boot
- Main application code is in `src/main/java`
- API endpoints are defined in the controller classes
- Database configuration is in `application.properties`
    - Once again, make sure these are correctly update with your PostgreSQL configuration.

### Frontend
TODO by frontend team

## Members:
- Flashy990 - Aryan Kakadia
- cjkardokus - Connor Kardokus
- honzie-y - Hongzhang Yu
- Allen Guo - Shaohua Guo
