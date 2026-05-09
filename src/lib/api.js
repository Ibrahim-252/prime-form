/**
 * ============================================================
 *  PRIME FORM — API LAYER
 *  ─────────────────────────────────────────────────────────
 *  ALL backend calls live here.
 *  Your backend friend only needs to:
 *    1. Set BASE to the real API URL
 *    2. Uncomment the apiFetch lines
 *    3. Comment out the // ── MOCK ── blocks
 *
 *  Token storage: localStorage  →  'pf_token' + 'pf_user'
 *  Every protected request auto-sends: Authorization: Bearer <token>
 * ============================================================
 */

// ① Change this to real API URL when backend is ready
const BASE = 'http://localhost:3000/api'

const delay = (ms = 800) => new Promise(r => setTimeout(r, ms))

/* ── localStorage helpers ─────────────────────────────────── */
export const getToken = ()      => localStorage.getItem('pf_token')
export const getUser  = ()      => { try { return JSON.parse(localStorage.getItem('pf_user')) } catch { return null } }
const setToken = (t)            => localStorage.setItem('pf_token', t)
const setUser  = (u)            => localStorage.setItem('pf_user', JSON.stringify(u))
export const clearSession = ()  => { localStorage.removeItem('pf_token'); localStorage.removeItem('pf_user') }

async function apiFetch(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Request failed')
  }
  return res.json()
}

/* ══════════════════════════════════════════════════════════
   CLIENT AUTH
   Backend endpoints:
     POST /auth/client/signup
     POST /auth/client/login
     POST /auth/logout
══════════════════════════════════════════════════════════ */

export async function clientSignup({ name, email, password, goal, phone }) {
  await delay(1000)
  const data = await apiFetch('/auth/client/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, goal, phone }),
  })
  setToken(data.token)
  setUser(data.user)
  return data
}

export async function clientLogin({ email, password }) {
  await delay(1000)
  const data = await apiFetch('/auth/client/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setToken(data.token)
  setUser(data.user)
  return data
}

export async function logout() {
  await apiFetch('/auth/logout', { method:'POST' })
  clearSession()
}

/* ══════════════════════════════════════════════════════════
   ADMIN AUTH
   Backend endpoints:
     POST /auth/admin/login
══════════════════════════════════════════════════════════ */

export async function adminLogin({ email, password }) {
  await delay(1000)
  return apiFetch('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

/* ══════════════════════════════════════════════════════════
   CLIENT DATA  (all require auth token)
   Backend endpoints:
     GET  /client/dashboard
     GET  /client/programme
     GET  /client/bookings
     GET  /client/progress
     POST /client/progress
     PUT  /client/profile
══════════════════════════════════════════════════════════ */

export async function getClientDashboard() {
  await delay(600)
  return apiFetch('/client/dashboard')
}

export async function getClientProgramme() {
  await delay(600)
  return apiFetch('/client/programme')
}

export async function getClientBookings() {
  await delay(500)
  return apiFetch('/client/bookings')
}

export async function getClientProgress() {
  await delay(500)
  return apiFetch('/client/progress')
}
