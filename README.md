# Simple To-Do List Backend (REST)

This is a simple to-do list backend built using Node.js, Express.js, and MongoDB. It provides basic functionality for user registration, authentication, and task management. The application uses Joi for request validation and bcrypt for password hashing.

## Getting Started

### Prerequisites

Before you can run this project, make sure you have the following dependencies installed:

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/derekology/todo-api-rest.git
   cd todo-api-rest
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the project root and configure your environment variables.

   ```dotenv
   MONGODB_CLUSTER=<your_mongodb_cluster>
   MONGODB_USER=<your_mongodb_username>
   MONGODB_PASSWORD=<your_mongodb_password>
   MONGODB_DATABASE=<your_database_name>
   PORT=<your_desired_port>
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

   The server will start on the port specified in the environment variables or default to 3000.

## API Endpoints

### Authentication

- #### Register a User

  Registers a new user with the provided email and password.

  POST `/auth/register`

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- #### Login

  Logs in a user with the provided email and password.

  POST `/auth/login`

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

### Task Management

- #### Get All Tasks

  Retrieves a list of all tasks.

  GET `/tasks`

- #### Search Tasks

  Searches for tasks based on specified filters.

  POST `/tasks/searchTasks`

  ```json
  {
    "owner": "userId",
    "name": "taskName",
    "category": "taskCategory",
    "operator": "and/or"
  }
  ```

- #### Add a Task

  Adds a new task.

  POST `/tasks/addTask`

  ```json
  {
    "owner": "userId",
    "name": "taskName",
    "description": "taskDescription",
    "category": "Cleaning/Shopping/Work"
  }
  ```

- #### Delete a Task

  Deletes a task with the specified task ID.

  DELETE `/tasks/deleteTask`

  ```json
  {
    "id": "taskId",
    "userId": "userId"
  }
  ```

- #### Update a Task

  Updates a task with the specified task ID.

  PUT `/tasks/updateTask`

  ```json
  {
    "id": "taskId",
    "userId": "userId",
    "category": "newCategory",
    "name": "newName",
    "description": "newDescription"
  }
  ```

## Error Handling

This API provides error responses with appropriate status codes and error messages for various scenarios, such as validation errors, duplicate email addresses during registration, and unauthorized access.

## Project Structure

```
┣ src
┃ ┣ controllers
┃ ┃ ┣ authController.js            // functions for authentication
┃ ┃ ┣ taskController.js            // functions for task manipulation
┃ ┃ ┗ validationSchemas.js         // validation for auth/task objects
┃ ┣ models
┃ ┃ ┣ taskModel.js                 // model for task objects
┃ ┃ ┗ userModel.js                 // model for user objects
┃ ┣ routes
┃ ┃ ┣ authRoutes.js                // routes for register/login
┃ ┃ ┗ taskRoutes.js                // routes for task manipulation
┃ ┣ app.js                         // application main file
┣ .gitignore
┣ package-lock.json
┣ package.json
┣ README.md
┗ server.js                        // entry point for application
```
