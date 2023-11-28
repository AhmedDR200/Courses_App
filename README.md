# Courses Management API

This project provides a robust backend for managing courses and users. The application is built using Node.js, Express, and MongoDB with Mongoose. It features RESTful API endpoints for course and user operations, user authentication, and avatar uploads.

## Table of Contents

- [Courses Routes](#courses-routes)
- [Users Routes](#users-routes)
- [Middleware](#middleware)
- [Controller Functions](#controller-functions)
- [Models](#models)
- [Additional Notes](#additional-notes)

---

## Courses Routes

These routes handle the CRUD operations for courses.

### GET /courses

- **Description:** Retrieve all courses.
- **Controller:** `coursesController.getAll`
- **Usage:** `GET /courses`

### GET /courses/:id

- **Description:** Retrieve a specific course by ID.
- **Controller:** `coursesController.getOne`
- **Usage:** `GET /courses/:id`

### POST /courses

- **Description:** Create a new course.
- **Controller:** `coursesController.validateCourse`, `coursesController.create`
- **Usage:** `POST /courses`

### PATCH /courses/:id

- **Description:** Update a course by ID.
- **Controller:** `coursesController.validateCourse`, `coursesController.update`
- **Usage:** `PATCH /courses/:id`

### DELETE /courses/:id

- **Description:** Delete a course by ID.
- **Controller:** `coursesController.remove`
- **Usage:** `DELETE /courses/:id`

## Users Routes

These routes handle user-related operations, including registration and login.

### GET /users

- **Description:** Retrieve all users. (Requires token verification)
- **Middleware:** `verifyToken`
- **Controller:** `userController.getAllUsers`
- **Usage:** `GET /users`

### POST /register

- **Description:** Register a new user.
- **Middleware:** `upload.single('avatar')`
- **Controller:** `userController.register`
- **Usage:** `POST /register`

### POST /login

- **Description:** Authenticate and receive a user token.
- **Controller:** `userController.login`
- **Usage:** `POST /login`

## Middleware

### `verifyToken`

- **Description:** Verifies the authenticity of a user token.
- **Usage:** Applied to the `GET /users` route.

### `upload.single('avatar')`

- **Description:** Handles the upload of user avatars.
- **Usage:** Applied to the `POST /register` route.

## Controller Functions

- **`coursesController.getAll`**: Retrieves all courses.
- **`coursesController.getOne`**: Retrieves a specific course by ID.
- **`coursesController.validateCourse`**: Validates course data (middleware).
- **`coursesController.create`**: Creates a new course.
- **`coursesController.update`**: Updates a course by ID.
- **`coursesController.remove`**: Deletes a course by ID.
- **`userController.getAllUsers`**: Retrieves all users.
- **`userController.register`**: Registers a new user.
- **`userController.login`**: Handles user login.

## Models

- **`Course`**: Represents the course schema.
- **`User`**: Represents the user schema.

## Additional Notes

- The project structure assumes the existence of controller functions (`coursesController` and `userController`) that handle the logic for each route.
- User avatars are uploaded using `multer` middleware with custom storage and file filtering.

Feel free to customize and expand upon these routes based on your project requirements.