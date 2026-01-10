# OSI Model - Quick Notes for Backend Devs

## The 7 Layers (Bottom to Top)

| Layer | Name | Key Point | Your Work Here? |
|-------|------|-----------|-----------------|
| **1** | Physical | Cables, WiFi signals | ❌ Ignore |
| **2** | Data Link | MAC addresses, switches | ❌ Ignore |
| **3** | Network | **IP addresses, routing** | ✅ Know basics |
| **4** | Transport | **TCP/UDP, ports** | ✅ Use daily |
| **5** | Session | Connection management | ⚠️ Minimal |
| **6** | Presentation | **JSON, encryption** | ✅ Use daily |
| **7** | Application | **HTTP, APIs, WebSocket** | ✅ Main layer |

---

## Layer 3: Network (IP & Routing)
- **IP addresses**: `192.168.1.1` (IPv4), `2001:0db8::1` (IPv6)
- **CIDR**: `10.0.0.0/24` = IPs from 10.0.0.0 to 10.0.0.255
- **Use case**: Firewall rules, security groups

---

## Layer 4: Transport (TCP/UDP & Ports)

### TCP vs UDP:
```javascript
// TCP - Reliable, ordered delivery
app.listen(3000); // Your Express API uses TCP

// UDP - Fast, no guarantee
// Use for: gaming, live streaming, DNS
```

### Common Ports:
- 80 → HTTP
- 443 → HTTPS
- 22 → SSH
- 3000 → Node.js (custom)
- 27017 → MongoDB
- 5432 → PostgreSQL

---

## Layer 6: Presentation (Format & Encrypt)
```javascript
// Data formatting
const user = { name: 'John', age: 30 };
const json = JSON.stringify(user); // Serialize

// Encryption (HTTPS/TLS)
import https from 'https';
https.createServer(options, app).listen(443);
```

---

## Layer 7: Application (Your Main Work)
```javascript
// HTTP - Most common
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// WebSocket - Real-time
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
```

**Protocols**: HTTP, HTTPS, WebSocket, SMTP, FTP, DNS, gRPC

---

## Example: HTTP Request Flow

```
User requests: https://api.com/users

Layer 7: HTTP GET /users
Layer 6: TLS encrypts data
Layer 5: Session established
Layer 4: TCP port 443, breaks into segments
Layer 3: IP packet with source/destination IPs
Layer 2: MAC addresses added
Layer 1: Bits sent over wire

(Server receives in reverse: 1→7)
```

---

## Debugging with OSI

**Problem: "Can't connect to API"**

Check layer by layer:
1. **Layer 7**: Is app running? (`app.listen()`)
2. **Layer 4**: Is port open? (firewall check)
3. **Layer 3**: Can ping server? (`ping api.com`)
4. **Layer 7**: DNS working? (resolve domain to IP)

---

## What to Actually Remember

**Focus 80% here**:
- **Layer 4**: TCP/UDP difference, port numbers
- **Layer 7**: HTTP, WebSocket, REST APIs

**Know 15% here**:
- **Layer 3**: IP addresses for firewall rules

**Ignore 5%**:
- **Layers 1-2**: Leave to network engineers

---

## Quick Reference

**TCP** = Reliable (your APIs)  
**UDP** = Fast (gaming, streaming)  
**HTTP** = Layer 7 protocol that uses TCP  
**Firewall** = Filters at Layers 3-4 (IP + ports)  
**Your code** = Lives at Layer 7

---

**Bottom Line**: When something breaks, think "which layer?" and debug from there. Most backend issues are Layer 4 (ports/firewall) or Layer 7 (app code).