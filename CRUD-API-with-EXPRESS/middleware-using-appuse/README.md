# Express Middleware Demo

A simple Express.js application demonstrating middleware usage with `app.use()`.

## What This Project Shows

- How `app.use()` works as middleware in Express
- Using `express.json()` to parse JSON request bodies
- Basic GET and POST routes

## Prerequisites

- Node.js installed
- Basic JavaScript knowledge

## Installation

```bash
npm install express
```

## Running the Server

```bash
node app.js
```

Server runs on: `http://localhost:8080`

## Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Welcome page |
| GET    | `/login` | Login page |
| POST   | `/login` | Handle login (logs req.body) |

## Key Concepts

### Middleware Flow
```
Request → app.use() → Route Handler → Response
```

### express.json() Middleware
- Automatically parses JSON request bodies
- Makes data available in `req.body`
- Must be called before route handlers

## Testing the POST Route

```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"1234"}'
```

## Project Structure

```
.
├── app.js          # Main server file
├── package.json    # Dependencies
└── README.md       # This file
```

## Learn More

- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)
- [Express.json() Documentation](https://expressjs.com/en/api.html#express.json)