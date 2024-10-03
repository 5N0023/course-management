# Project Name

Welcome to the **Project Name**! This project can be run locally for development purposes or in production using Docker Compose. Below is a guide on how to run the project using both methods, along with details about the website's features and pages.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the Project

You have two ways to run the project:

---

## 1. Run on Local Machine

For local development, you can run the frontend and backend separately using two provided scripts.

### Steps:

1. **Run the Backend**
   ```bash
   ./runBackend.sh
   ```

2. **Run the Frontend**
   ```bash
   ./runFrontend.sh
   ```

3. **Visit the Application**  
   Once both scripts are running, open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Environment Variables:

You can modify environment variables inside the `runBackend.sh` and `runFrontend.sh` scripts to suit your needs during development.

---

## 2. Run in Production

For production deployment, use Docker Compose to spin up the entire application with one command.

### Steps:

1. **Run the Production Setup**

   ```bash
   ./runProduction.sh
   ```

2. **Visit the Application**  
   After running the production setup, visit the application in your browser:
   ```
   http://localhost
   ```

### Environment Variables:

You can modify environment variables inside the `runProduction.sh` script to configure the production environment.

---

## Website Overview

The website contains several key pages and functionality, listed below:

### Pages:

1. **/login**  
   This page is used for logging into the website if you already have an account.
   
2. **/signup**  
   This page is for creating a new account. When signing up, you must provide a unique username.
   
3. **/admin**  
   This page allows administrators to manage course data. You can upload a `courses_data.json` file to populate the database or clear the entire database using the buttons available on this page.

4. **/** (Home Page)  
   - **Logout Button**: In the top-right corner, you'll find a logout button to sign out of your account.
   - **Create Course Button**: In the top-left corner, there's a button to add a new course. Clicking it opens a slide panel where you can input course information.
   - **Course Table**: The main section displays a table of all the courses currently in the database. You can click on any course in the table to view more details about it.

---

## Notes

- Make sure ports 3000 (for local development) and 80 (for production) are available on your machine.
- You can modify the environment variables in the provided scripts for both development and production environments as needed.
