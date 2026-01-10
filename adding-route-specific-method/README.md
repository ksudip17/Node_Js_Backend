# Express Route-Specific Middleware Demo

A simple Express.js application demonstrating **route-specific middleware** for protecting admin routes with password authentication.

## What This Project Shows

- How to use `app.use()` with specific route paths
- Password-based route protection
- Middleware flow control with `next()`

## Installation

```bash
npm install express
```

## Running the Server

```bash
node app.js
```

Server runs on: `http://localhost:8080`

## How It Works

### Middleware Flow

```
Request to /admin
      ↓
Password Middleware (checks req.body.password)
      ↓
   Correct? → next() → Route Handler
   Wrong?   → "Wrong Password" (stops here)
```

### Route-Specific vs Global Middleware

```javascript
// Global (runs on ALL routes)
app.use(express.json());

// Route-Specific (only runs on /admin routes)
app.use("/admin", middlewareFunction);
```

## Testing the Protected Route

### ✅ Correct Password

```bash
curl -X GET http://localhost:8080/admin \
  -H "Content-Type: application/json" \
  -d '{"name":"John","password":"cheater"}'
```

**Response:** `Dear John your password is Correct`

### ❌ Wrong Password

```bash
curl -X GET http://localhost:8080/admin \
  -H "Content-Type: application/json" \
  -d '{"name":"John","password":"wrong"}'
```

**Response:** `Wrong Password`

## Code Structure

```javascript
// Step 1: Parse JSON bodies (global middleware)
app.use(express.json());

// Step 2: Protect /admin routes (route-specific middleware)
app.use("/admin", (req, res, next) => {
    if(req.body.password === "cheater") {
        next(); // Allow access
    } else {
        res.end("Wrong Password"); // Block access
    }
});

// Step 3: Admin route handler (only reached if password correct)
app.get("/admin", (req, res) => {
    res.send(`Dear ${req.body.name} your password is Correct`);
});
```

## Key Concepts

- **`next()`**: Passes control to the next middleware/route handler
- **No `next()`**: Stops the request-response cycle (blocks access)
- **Route-specific middleware**: Only applies to routes matching the path

## Use Cases

- Authentication checks
- Role-based access control
- API versioning (`/api/v1`, `/api/v2`)
- Logging specific route groups

## Learn More

- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html)