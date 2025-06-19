# Blogging Platform API

A RESTful API for a blogging platform built with Node.js, Express, and MongoDB.

🌐 **Deployed URL:** [https://blogging-api-2000.onrender.com](https://blogging-api-2000.onrender.com)

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NagulmeeraShaik7/blogging-api.git
   cd blogging-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb+srv://nagulmeera7:*********@cluster0.gcehabs.mongodb.net/
   PORT=3000
   ```

4. **Start MongoDB:**
   Ensure MongoDB is running locally or provide a valid MongoDB URI.

5. **Run the application:**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

---

## API Base URL

Use this as the base for all your API requests:

```
https://blogging-api-2000.onrender.com/api
```

---

## API Endpoints

### Users

- **POST /api/users** - Create a new user  
  **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
  **Response:**
  ```json
  {
    "username": "string",
    "email": "string",
    "_id": "string"
  }
  ```

- **GET /api/users/:id** - Get user by ID  
  **Response:**
  ```json
  {
    "username": "string",
    "email": "string",
    "_id": "string"
  }
  ```

---

### Blogs

- **POST /api/blogs** - Create a new blog  
  **Request Body:**
  ```json
  {
    "title": "string",
    "content": "string",
    "author": "userId"
  }
  ```
  **Response:**
  ```json
  {
    "title": "string",
    "content": "string",
    "author": {
      "username": "string"
    },
    "_id": "string"
  }
  ```

- **GET /api/blogs** - Get all blogs  
  **Response:**
  ```json
  [
    {
      "title": "string",
      "content": "string",
      "author": {
        "username": "string"
      },
      "_id": "string"
    }
  ]
  ```

- **GET /api/blogs/:id** - Get blog by ID  
  **Response:**
  ```json
  {
    "title": "string",
    "content": "string",
    "author": {
      "username": "string"
    },
    "_id": "string"
  }
  ```

---

### Comments

- **POST /api/comments** - Create a new comment  
  **Request Body:**
  ```json
  {
    "content": "string",
    "author": "userId",
    "blog": "blogId"
  }
  ```
  **Response:**
  ```json
  {
    "content": "string",
    "author": {
      "username": "string"
    },
    "blog": "string",
    "_id": "string"
  }
  ```

- **GET /api/comments/blog/:blogId** - Get comments for a blog  
  **Response:**
  ```json
  [
    {
      "content": "string",
      "author": {
        "username": "string"
      },
      "blog": "string",
      "_id": "string"
    }
  ]
  ```

---

## Sample Data

To populate the database with sample data using your deployed API, use these `curl` commands:

```bash
# Create a user
curl -X POST https://blogging-api-2000.onrender.com/api/users -H "Content-Type: application/json" -d '{"username":"john_doe","email":"john@example.com","password":"password123"}'

# Create a blog
curl -X POST https://blogging-api-2000.onrender.com/api/blogs -H "Content-Type: application/json" -d '{"title":"My First Blog","content":"This is my first blog post","author":"userId"}'

# Create a comment
curl -X POST https://blogging-api-2000.onrender.com/api/comments -H "Content-Type: application/json" -d '{"content":"Great post!","author":"userId","blog":"blogId"}'
```

---

## Project Structure

```
blogging-api/
├── src/apps
│   ├── controllers/
│   │   ├── user.controller.mjs
│   │   ├── blog.controller.mjs
│   │   └── comment.controller.mjs
│   ├── middleware/
│   │   └── error.middleware.mjs
│   ├── models/
│   │   ├── user.model.mjs
│   │   ├── blog.model.mjs
│   │   └── comment.model.mjs
│   ├── repositories/
│   │   ├── user.repository.mjs
│   │   ├── blog.repository.mjs
│   │   └── comment.repository.mjs
│   ├── routes/
│   │   ├── user.routes.mjs
│   │   ├── blog.routes.mjs
│   │   ├── comment.routes.mjs
│   ├── useCases/
│   │   ├── user.usecases.mjs
│   │   ├── blog.usecases.mjs
│   │   └── comment.usecases.mjs
├── index.mjs
├── .env
├── package.json
├── README.md
```

---

## Error Handling

- Uses centralized error middleware to handle errors consistently.
- Returns appropriate HTTP status codes:
  - `400` for bad requests
  - `404` for not found resources
  - `500` for internal server errors

**Error Response Example:**
```json
{
  "error": {
    "message": "string",
    "status": number
  }
}
```