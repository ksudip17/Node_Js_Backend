# Express Middleware Explained

## What is Middleware?

Think of **Middleware** like a series of checkpoints or filters that a request goes through before it reaches its final destination (the response).

In technical terms, middleware functions are functions that have access to:
1. The **Request** object (`req`)
2. The **Response** object (`res`)
3. The **Next** function (`next`)

If a middleware function doesn't end the request-response cycle (by sending a response), it must call `next()` to pass control to the next middleware function. Otherwise, the request will modify hanging.

---

## Types of Middleware

Express has 5 main types of middleware:

### 1. Application-level Middleware
Bound to the entire application using `app.use()` or `app.getMethod()`.
```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

### 2. Router-level Middleware
Works just like application-level middleware but is bound to an instance of `express.Router()`.
```javascript
const router = express.Router();
router.use((req, res, next) => { ... });
```

### 3. Error-handling Middleware
Define error-handling middleware functions in the same way as other middleware functions, except with **four arguments** instead of three: `(err, req, res, next)`.
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### 4. Built-in Middleware
Express comes with some built-in middleware functions, such as:
- `express.json()` processes JSON data.
- `express.static()` serves static files.

### 5. Third-party Middleware
 libraries usually installed via npm to add functionality to your app.
 - Examples: `cookie-parser`, `cors`, `morgan`.

---

## About The Code in `app.js`

In your current `app.js`, you are demonstrating:

1.  **Request Handler Middleware**: Specifically the first function in `app.get`. It tries to process the request but encounters an error (accessing undefined `num`).
2.  **Error Handling Middleware**: The second function `(err, req, res, next)`. Because the previous middleware crashed or could pass an error, this specialized middleware catches it and sends a response.
