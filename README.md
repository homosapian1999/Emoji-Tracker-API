# Emoji Mood Tracker API Documentation

Welcome to the Emoji Mood Tracker API documentation. This API allows users to track their moods using emojis and descriptions, view monthly statistics of their mood usage, and share their mood history. It is built using Node.js, Express, Sequelize, and MySQL for data storage. Authentication is implemented using JSON Web Tokens (JWT), and the API provides functionalities such as user registration, login, and forgot password.

## Table of Contents
1. [Authentication](#authentication)
   - [Register](#register)
   - [Login](#login)
   - [Forgot Password](#forgot-password)
2. [Mood Tracking](#mood-tracking)
   - [Add Mood](#add-mood)
   - [Update Mood](#update-mood)
   - [Delete Mood](#delete-mood)
3. [Statistics](#statistics)
   - [Monthly Mood Summary](#monthly-mood-summary)
4. [Sharing Mood History](#sharing-mood-history)

## Authentication

### Register
**POST** `/api/v1/auth/register`

Create a new user account.

**Request Body**
- `username` (string): User's username.
- `password` (string): User's password.
- `name` (string): User's email.
- `recoveryKey` (string): User's recovery key.

**Response**
- 201 Created: User successfully registered.
- 400 Bad Request: Validation error (e.g., invalid username or password).

### Login
**GET** `/api/v1/auth/login`

Authenticate the user and receive a JWT token for further API access.

**Request Body**
- `username` (string): User's username.
- `password` (string): User's password.

**Response**
- 200 OK: Login successful. The response will include a JWT token.
- 401 Unauthorized: Invalid credentials.

### Forgot Password
**POST** `/api/v1/auth/forgot-password`

Recover the user with mail and the recovery Key.

**Request Body**
- `email` (string): User's email address.
- `recoveryKey` (string): User's recovery key.

**Response**
- 200 OK: Password reset email sent.
- 404 Not Found: User not found.
- 500 Internal Server Error: Error sending the reset email.

## Mood Tracking

### Add Mood
**POST** `/api/v1/emoji/create`

Add a new mood entry with an emoji and an optional description.

**Request Body**
- `emoji` (string): The mood emoji (e.g., 😄).
- `description` (string): A description of the mood.
- `username` (string): username of the user.
- `date` (date): Date of the mood.

**Authorization Header**
- `Authorization: Bearer <JWT token>`

**Response**
- 201 Created: Mood entry added.
- 400 Bad Request: Validation error.
- 401 Unauthorized: Invalid or missing JWT token.

### Update Mood
**PATCH** `/api/v1/emoji/update/:emojid`

Update an existing mood entry.

**Request Body**
- `emoji` (string): The updated mood emoji.
- `description` (string): The updated mood description.

**Authorization Header**
- `Authorization: Bearer <JWT token>`

**Response**
- 200 OK: Mood entry updated.
- 400 Bad Request: Validation error.
- 401 Unauthorized: Invalid or missing JWT token.
- 404 Not Found: Mood entry not found.

### Delete Mood
**DELETE** `/api/v1/emoji/delete/:emojId`

Delete an existing mood entry.

**Authorization Header**
- `Authorization: Bearer <JWT token>`

**Response**
- 204 No Content: Mood entry deleted.
- 401 Unauthorized: Invalid or missing JWT token.
- 404 Not Found: Mood entry not found.

## Statistics

### Monthly Mood Summary
**GET** `/api/v1/emoji/monthly-stats/:username`

Retrieve a monthly summary of mood usage, showing the most frequently used emojis in descending order.

**Authorization Header**
- `Authorization: Bearer <JWT token>`

**Response**
- 200 OK: Monthly summary retrieved.
- 401 Unauthorized: Invalid or missing JWT token.

## Sharing Mood History

### Creating the Share link 
**POST** `/api/v1/sharing/create`

Generate a unique link to share the user's mood history.

**Authorization Header**
- `Authorization: Bearer <JWT token>`

**Response**
- 200 OK: Shareable link created.
- 401 Unauthorized: Invalid or missing JWT token.

### Disable Shared Mood History
**POST** `/api/v1/sharing//disable/:uniqueLink`

Disable a previously shared mood history link.

**Authorization Header**
- `Authorization: Bearer <JWT token>`

**Response**
- 204 No Content: Link disabled.
- 401 Unauthorized: Invalid or missing JWT token.
- 404 Not Found: Link not found.

---

For Queries: [Ankit](mailto:ankit349@gmail.com).
