# Express.js: Behind the Scenes 🚂

This guide explains how Express really works under the hood, using your current simple server setup as an example.

## 1. The `app` Object is Just a Function
When you run `const app = express();`, you aren't just creating an object. You are creating a **request handler function**.
Inside Node.js, specifically the native `http` module, every time a request comes in, it triggers a callback. `app` is that callback!

```javascript
// Effectively, this is what happens internally:
http.createServer(app).listen(8080);
```

## 2. The Middleware Chain (The Heart of Express)
Express is essentially a stack of functions (middleware) that execute in order. When a request hits your server (e.g., `GET /`), Express runs through its internal list looking for a match.

1.  **Incoming Request**: A user hits `http://localhost:8080/`.
2.  **Matching**: Express looks at your registered routes (like `app.get('/', ...)`).
3.  **Execution**: It finds the first one that matches the method (`GET`) and path (`/`).
4.  **The Handler**: It executes your callback function: `(req, res) => { ... }`.

## 3. The `req` and `res` Objects
These aren't magic. They are extended versions of Node's native objects:
*   **`req` (Request)**: Express adds handy properties like `req.query`, `req.params`, and `req.body` to the raw Node request stream.
*   **`res` (Response)**: Express adds helper methods like:
    *   `res.send()`: Automatically sets the Content-Type (e.g., text/html) and Content-Length.
    *   `res.json()`: Automatically sets Content-Type to `application/json` and stringifies objects.

## 4. Why `res.send()`?
In your code:
```javascript
res.send("Namastey Sabai ma!!");
```
Behind the scenes, `res.send` decides what data type you are sending.
*   If it's a string -> Content-Type: `text/html`.
*   If it's an object -> Content-Type: `application/json`.
*   It then calls the low-level `res.end()` from Node.js to actually flush data to the client.

## Summary Flow
**Request `GET /`** → Node HTTP Server → **Express `app` function** → Matches `app.get('/')` → **Your Callback** → `res.send()` → **Response to Client**.
