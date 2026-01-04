# SSH Keys - Backend Developer Notes

## What is SSH?

SSH (Secure Shell) is a secure way to connect to servers and transfer files without using passwords. Instead, it uses **SSH keys** for authentication.

---

## Two Types of Keys

### Private Key
- **What:** Your secret key that proves you are YOU
- **Where:** Stored locally on your machine (`~/.ssh/id_rsa`)
- **Protection:** Must be kept secret. Never share. Use a passphrase to protect it
- **Function:** Unlocks access to servers where your public key is registered

### Public Key
- **What:** The lock design that matches your private key
- **Where:** Placed on servers in `~/.ssh/authorized_keys`
- **Sharing:** Safe to share anywhere (GitHub, servers, etc.)
- **Function:** Server uses this to verify you own the private key

---

## Simple Analogy

Think of it like a **mail lock and key:**
- **Private Key** = Only key that opens YOUR mailbox
- **Public Key** = Lock design on your mailbox (everyone sees it, can't open it)

When you connect to a server, you prove you own the public key by using your private key. Server grants access.

---

## How SSH Authentication Works (4 Steps)

1. **You connect** to a server with SSH
2. **Server checks** if your public key is in `authorized_keys`
3. **Server sends** a challenge encrypted with your public key
4. **You respond** by decrypting the challenge with your private key
5. **Server grants access** ✅ No password needed!

---

## What You Need to Know (Practical Skills)

### 1. Generate SSH Keys
```bash
ssh-keygen -t rsa -b 4096
# Creates two files:
# - id_rsa (private key - KEEP SECRET)
# - id_rsa.pub (public key - share freely)
```

### 2. Add Public Key to Server
```bash
# Copy your public key to server's authorized_keys
cat ~/.ssh/id_rsa.pub | ssh user@server "cat >> ~/.ssh/authorized_keys"

# OR manually paste id_rsa.pub content into server's ~/.ssh/authorized_keys
```

### 3. Connect Without Password
```bash
ssh user@server
# SSH automatically uses your private key
# No password prompt!
```

### 4. Add Key to GitHub
1. Copy content of `~/.ssh/id_rsa.pub`
2. Go to GitHub Settings → SSH Keys → Add new key
3. Paste and save
4. Now `git push` works without passwords

---

## Security Best Practices

| Practice | Why |
|----------|-----|
| **Use a passphrase** | Protects your private key if someone steals it |
| **Never share private key** | Anyone with it can access ALL your servers |
| **Rotate keys yearly** | Keep security fresh, revoke old keys |
| **File permissions** | `chmod 600 ~/.ssh/id_rsa` (only you can read) |
| **Use SSH Agent** | Keeps decrypted key in memory during session |

---

## Common Backend Scenarios

### GitHub Access
```bash
# Add public key to GitHub
# Then clone private repos without passwords
git clone git@github.com:username/repo.git
git push  # Works! Private key authenticates
```

### Server Deployment
```bash
# SSH into production server without password
ssh deploy@production-server.com

# Run commands on remote server
ssh deploy@server "npm start"
```

### CI/CD Pipelines (GitHub Actions)
```bash
# Store private key as secret in GitHub
# Pipeline uses it to deploy code to servers
# All automated, no manual passwords
```

### Node.js SSH Connection
```js
import { readFileSync } from 'fs';

const privateKey = readFileSync(process.env.SSH_KEY_PATH);
const sshConfig = {
  host: 'your-server.com',
  user: 'deploy-user',
  privateKey: privateKey
  // No password needed!
};

// SSH client (like ssh2 package) uses this config
```

---

## What You DON'T Need to Know

❌ Deep RSA cryptography math  
❌ How encryption algorithms work internally  
❌ Building your own SSH implementation  
❌ Advanced cipher suites  

✅ **Just know:** Keys authenticate you. Private key stays safe. Public key goes on servers.

---

## Quick Checklist for Setup

- [ ] Generate SSH key pair (`ssh-keygen`)
- [ ] Add public key to GitHub
- [ ] Add public key to production servers
- [ ] Test connection without password
- [ ] Protect private key (passphrase + permissions)
- [ ] Know where your keys are stored
- [ ] Understand you can't recover a lost private key

---

## Key Takeaway

SSH keys are how modern backend developers access servers and push code **securely and without passwords**. You generate them once, use them everywhere. The cryptography happens behind the scenes—your job is to generate, store safely, and place the public key correctly.

**That's it. Master that, you're good.** ✅