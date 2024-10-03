# aptConnect - Capstone Project

## Project Overview

**aptConnect** is a modern solution designed for residential community management, helping streamline communication, event management, and general interaction among residents. The platform replaces outdated communication methods, such as paper notices and emails, with a unified, easy-to-use digital solution.

The system allows community admins to manage and create events, communicate important announcements, and provide a platform for residents to interact seamlessly. With a user-friendly frontend developed in **Angular** and a robust backend using **Spring Boot** integrated with **MySQL**, aptConnect offers an efficient and scalable solution for community management.

## Key Features

- **Event Management:** Admins can create, edit, and delete community events visible to all residents.
- **User Management:** Admins manage users; residents interact with events and receive updates.
- **Role-Based Access:** Controlled access (Admin and User) with restricted management for admins.
- **Real-Time Communication:** Quick updates via announcements and notifications from admins.
- **Responsive Design:** Angular frontend ensures a mobile-friendly interface for easy access.
- **Database Management:** Secure, scalable data storage with MySQL.

## Technologies Used

### Frontend:
- **Framework:** Angular
- **Styling:** CSS, Bootstrap
- **Routing:** Angular Router
- **State Management:** Angular services for data sharing
- **Forms & Validation:** Angular Forms for user input handling with validation

### Backend:
- **Framework:** Spring Boot
- **Database:** MySQL
- **REST API:** Spring Data JPA (for internal database operations)
- **Security:** Role-based access control with Spring Security
- **Logging:** SLF4J and Logback

### Tools:
- **Version Control:** Git and GitHub
- **Build Tools:** Maven (backend), npm (frontend)
- **Testing:** JUnit, Mockito
- **Deployment:** Docker (containerized), extendable to cloud platforms

### API Endpoints (Backend)

Key REST endpoints for backend operations (without external API integrations):
- **GET /events**: Retrieve all community events.
- **POST /events**: Create a new event (Admin only).
- **PUT /events/{id}**: Update an existing event (Admin only).
- **DELETE /events/{id}:** Delete an event (Admin only).
- **GET /users:** Retrieve all users (Admin only).
- **POST /users:** Create a new user (Admin only).
