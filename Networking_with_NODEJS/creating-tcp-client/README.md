# TCP Client-Server Communication in Node.js

## 🎯 What is This?

This project demonstrates how two computers (or programs) talk to each other over a network using **TCP (Transmission Control Protocol)**. Think of it like a **phone call** between two people!

---

## 📞 The Phone Call Analogy

| Real Life | In This Code |
|-----------|--------------|
| **Phone waiting for calls** | Server listening on port 8080 |
| **Dialing a number** | Client connecting to server |
| **Conversation** | Data exchange (sending/receiving messages) |
| **Hanging up** | Closing the connection |

---

## 🚀 How It Works (Step-by-Step)

### Step 1: Server Opens for Business 📡
**File:** `server.js`

```javascript
server.listen(8080, "0.0.0.0", () => {
  console.log(`Server is listening on http://localhost:8080`);
});
```

- **Port 8080**: Like a specific door number where the server waits
- **0.0.0.0**: Server listens on ALL network interfaces (Wi-Fi, Ethernet, localhost)
- **Status**: Server is now in `LISTEN` mode, waiting for clients

---

### Step 2: Client Makes the Call 📲
**File:** `client.js`

```javascript
const socket = net.createConnection({ host:"172.168.29.148", port: 8080});
```

**What happens behind the scenes (TCP Handshake):**
1. **Client**: "Hey server, can we talk?" (SYN)
2. **Server**: "Yes! I'm ready!" (SYN-ACK)
3. **Client**: "Great, let's start!" (ACK)

✅ **Connection Established!** A dedicated "pipe" (socket) is created between client and server.

---

### Step 3: The Conversation 💬

#### Client Sends a Message:
```javascript
socket.write("Hello from Vs Code");
```
📤 Data flows from client → server

#### Server Receives & Responds:
```javascript
socket.on("data", (chunk) => {
    console.log(chunk.toString()); // Logs: "Hello from Vs Code"
    socket.write("HTTP\n\nHii From Cursor."); // Sends response back
});
```
📥 Server receives data  
📤 Server sends response back

#### Client Receives Response:
```javascript
socket.on("data", (chunk) => {
    console.log(chunk.toString()); // Logs: "HTTP... Hii From Cursor."
});
```

---

### Step 4: Hanging Up 📴
**File:** `client.js`

```javascript
socket.end(); // Client says "I'm done talking"
```

**Server detects disconnection:**
```javascript
socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
});
```

---

## 🔄 Visual Flow Diagram

```
┌─────────┐                                    ┌─────────┐
│ CLIENT  │                                    │ SERVER  │
└────┬────┘                                    └────┬────┘
     │                                              │
     │  1. server.listen(8080) ──────────────────► │ (Waiting...)
     │                                              │
     │  2. createConnection() ────────────────────► │
     │     (TCP Handshake: SYN → SYN-ACK → ACK)    │
     │ ◄──────────────────────────────────────────  │
     │          ✅ CONNECTION ESTABLISHED            │
     │                                              │
     │  3. write("Hello from Vs Code") ───────────► │
     │                                              │ (Receives & logs)
     │                                              │
     │ ◄──── write("Hii From Cursor.") ────────────  │
     │                                              │
     │ (Receives & logs)                            │
     │                                              │
     │  4. socket.end() ──────────────────────────► │
     │     (FIN packet)                             │
     │                                              │ (Closes connection)
     │                                              │
```

---

## 🔑 Key Concepts

### What is a Socket? 🔌
A **socket** is like a **direct phone line** between client and server. Once created:
- You can `write()` to send data
- You can listen with `on('data')` to receive data
- It's a **full-duplex** connection (both can talk simultaneously)

### What is TCP? 📦
- **Reliable**: Guarantees data arrives in order
- **Connection-oriented**: Requires handshake before communication
- **Error-checked**: Automatically retransmits lost packets

---

## 🎮 How to Run This Project

### Terminal 1 (Start Server):
```bash
node server.js
```
Output: `Server is listening on http://localhost:8080`

### Terminal 2 (Run Client):
```bash
node client.js
```

### Expected Output:

**Server Terminal:**
```
Server is listening on http://localhost:8080
Client Connected 172.168.29.148
Hello from Vs Code
172.168.29.148 : Client disconnected
```

**Client Terminal:**
```
HTTP

Hii From Cursor.
```

---

## 🛡️ Error Handling

Both files handle errors gracefully:

**Client:**
```javascript
socket.on('error', () => {
    console.log("Server Lost");
});
```

**Server:**
```javascript
socket.on('error', () => {
    console.log("Client Lost");
});
```

---

## 🧠 Important Notes

1. **IP Address**: Change `172.168.29.148` in `client.js` to match your server's IP
2. **Port Number**: Both client and server must use the same port (8080)
3. **Firewall**: Make sure port 8080 is not blocked
4. **Same Network**: For local testing, ensure both are on the same network

---

## 📚 What You Learned

✅ How TCP connections are established (3-way handshake)  
✅ How to create a TCP server in Node.js  
✅ How to create a TCP client in Node.js  
✅ How data flows bidirectionally through sockets  
✅ How connections are properly closed  

---

## 🎓 Next Steps

- Try sending JSON data instead of plain text
- Implement a chat application
- Handle multiple clients simultaneously
- Add authentication/encryption

---

**Happy Networking! 🚀**
