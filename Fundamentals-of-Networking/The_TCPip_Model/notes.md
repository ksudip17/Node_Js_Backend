# TCP/IP Model - Quick Notes for Backend Devs

## The 4 Layers (Bottom to Top)

| Layer | What It Does | You Need to Know |
|-------|--------------|------------------|
| **1. Network Access** | Physical network (cables, WiFi) | ❌ Ignore |
| **2. Internet** | **IP addresses, routing** | ✅ Basics for deployment |
| **3. Transport** | **TCP/UDP, ports** | ✅ Critical - use daily |
| **4. Application** | **HTTP, APIs, WebSocket** | ✅ Main work (90%) |

---

## Layer 4: Application (Your Main Work)

**Protocols you use daily:**
- **HTTP/HTTPS** - REST APIs
- **WebSocket** - Real-time apps
- **DNS** - Domain lookup
- **SMTP** - Email sending

```javascript
import express from 'express';
const app = express();

// Your entire backend code lives here
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000);
```

---

## Layer 3: Transport (TCP/UDP & Ports)

### TCP vs UDP

**TCP** (Reliable - Your APIs use this):
```javascript
// TCP guarantees delivery, order, no duplicates
app.listen(3000); // Express uses TCP

// Three-way handshake:
// Client → SYN → Server
// Server → SYN-ACK → Client
// Client → ACK → Server
// ✓ Connection established
```

**UDP** (Fast - Gaming, streaming):
```javascript
// UDP = Fast, no guarantees
import dgram from 'dgram';
const server = dgram.createSocket('udp4');
server.bind(5000);

// Just sends packets, doesn't wait for confirmation
```

**When to use:**
- **TCP**: REST APIs, databases, file transfer (reliability matters)
- **UDP**: Gaming, live video, VoIP (speed matters)

### Common Ports

```javascript
// Well-known ports
HTTP: 80
HTTPS: 443
SSH: 22
DNS: 53

// Database ports
MongoDB: 27017
PostgreSQL: 5432
MySQL: 3306
Redis: 6379

// Your dev server
Node.js: 3000 (custom)
```

---

## Layer 2: Internet (IP Addresses)

### IPv4 Basics
```javascript
// Format: XXX.XXX.XXX.XXX
Public IP: 54.123.45.67
Private IP: 192.168.1.100

// In your app
app.listen(3000, '0.0.0.0'); // Listen on all interfaces
```

### CIDR Notation (For firewall rules)
```
10.0.0.0/24  = 256 IPs (10.0.0.0 to 10.0.0.255)
10.0.0.0/16  = 65,536 IPs (10.0.0.0 to 10.0.255.255)
0.0.0.0/0    = All IPs (anywhere on internet)
```

**Real usage:**
```
Security Group Rules:
- HTTPS (443) from 0.0.0.0/0 → Allow public access
- SSH (22) from YOUR_IP/32 → Only you can SSH
- PostgreSQL (5432) from 10.0.1.0/24 → Only app servers
```

### Private vs Public IPs
```javascript
// Private IPs (internal network only)
10.0.0.0 - 10.255.255.255
172.16.0.0 - 172.31.255.255
192.168.0.0 - 192.168.255.255

// Example setup:
App Server: 10.0.1.50 (private)
Database: 10.0.2.100 (private)
Load Balancer: 54.123.45.67 (public)
```

---

## Debugging Common Issues

### Problem: "Connection Refused"
```javascript
// Check layer by layer:

// 1. App running? (Application Layer)
app.listen(3000, () => console.log('Server running'));

// 2. Port accessible? (Transport Layer)
import net from 'net';
const socket = new net.Socket();
socket.connect(3000, 'localhost', () => {
  console.log('Port 3000 is open');
});

// 3. Firewall blocking? (Internet Layer)
// Check security group - is port 3000 allowed?

// 4. Correct IP? (Internet Layer)
// Verify server IP address
```

### Problem: "Database Timeout"
```javascript
import pg from 'pg';

const pool = new pg.Pool({
  host: '10.0.2.100',    // Internet Layer - IP
  port: 5432,            // Transport Layer - TCP port
  connectionTimeoutMillis: 5000
});

// If timeout occurs:
// 1. Is DB running?
// 2. Is port 5432 open in firewall?
// 3. Can app server IP access DB IP?
```

---

## Real-World Example: API Request Flow

```
User requests: https://api.com/users

Layer 4 (Application):
- HTTP GET /users
- Headers, body, etc.

Layer 3 (Transport):
- TCP connection to port 443
- Breaks data into segments
- Ensures reliable delivery

Layer 2 (Internet):
- Routes packets using IPs
- Source: 192.168.1.100
- Destination: 54.123.45.67

Layer 1 (Network Access):
- Physical transmission (WiFi/cable)

(Server processes in reverse: 1→2→3→4)
```

---

## What to Actually Remember

### Focus 90% here:
**Application Layer:**
- HTTP methods, status codes
- REST API design
- WebSocket basics

**Transport Layer:**
- TCP = reliable (your APIs)
- UDP = fast (gaming, streaming)
- Port numbers (80, 443, 3000, etc.)

### Know 10% here:
**Internet Layer:**
- IP addresses (IPv4)
- CIDR notation (`10.0.0.0/24`)
- Private vs public IPs

### Ignore:
**Network Access Layer:**
- Leave to network engineers

---

## Quick Reference Card

```
TCP/IP = What internet actually uses
OSI = Theoretical model

Your Stack:
- Layer 4: Your Express/Node.js code (HTTP)
- Layer 3: TCP connection, port 3000
- Layer 2: IP routing to your server
- Layer 1: Physical network (ignore)

Key Concepts:
TCP → Reliable (REST APIs)
UDP → Fast (gaming)
Port 443 → HTTPS
0.0.0.0/0 → Anywhere (firewall rule)

Debug Order:
1. Is app running?
2. Is port open?
3. Is IP correct?
4. Is firewall allowing?
```

---

**Bottom Line**: TCP/IP is simpler than OSI. Focus on **Application (your code)** and **Transport (TCP/ports)**. Learn **Internet layer (IPs)** for deployments. That's 95% of what you need!