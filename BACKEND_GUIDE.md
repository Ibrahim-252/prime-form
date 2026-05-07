# Backend Integration Guide (Node.js + MongoDB)

This guide is for the backend developer connecting a Node.js/Express and MongoDB server to the **Prime Form** frontend.

## 🚀 Setup Instructions

The frontend is built with React + Vite and uses a centralized API layer in `src/lib/api.js`. It is currently running in **MOCK mode** (simulating responses).

### 1. Configure the Base URL
In `src/lib/api.js`, update the `BASE` constant to point to your local or production server:
```javascript
const BASE = 'http://localhost:5000/api' // Your Node.js server URL
```

### 2. Activate Real API Calls
Uncomment the `apiFetch` function at the top of `src/lib/api.js`. This function handles:
- JSON content headers.
- Automatic injection of the `Authorization: Bearer <token>` header from localStorage.
- Global error handling.

### 3. Switch Endpoints from MOCK to REAL
For each function (e.g., `clientLogin`, `getClientDashboard`), comment out the mock return and uncomment the `apiFetch` call.

Example:
```javascript
export async function clientLogin({ email, password }) {
  // Comment this out:
  // return { user: { ... }, token: '...' } 

  // Uncomment this:
  const data = await apiFetch('/auth/client/login', { 
    method: 'POST', 
    body: JSON.stringify({ email, password }) 
  })
  setToken(data.token)
  setUser(data.user)
  return data
}
```

## 🛠️ Expected API Data Structures

### Authentication
- **POST `/auth/client/signup`**: Should return `{ user, token }`.
- **POST `/auth/client/login`**: Should return `{ user, token }`.
- **Token Storage**: The frontend stores the token in `pf_token` and the user object in `pf_user` in `localStorage`.

### User Object
The frontend expects a user object with at least:
```json
{
  "id": "unique_id",
  "name": "User Name",
  "email": "user@example.com",
  "role": "client",
  "avatar": "U"
}
```

### CORS
Ensure your Node.js server has CORS enabled for the frontend origin (usually `http://localhost:5173` or `http://localhost:5174` during development).

```javascript
// Express Example
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
```

## 📂 Key Files to Watch
- `src/lib/api.js`: The only file you need to modify to connect the backend.
- `src/App.jsx`: Handles the routing logic based on `clientUser` and `adminUser` states.
