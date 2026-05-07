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
const BASE = '/api'

const delay = (ms = 800) => new Promise(r => setTimeout(r, ms))

/* ── localStorage helpers ─────────────────────────────────── */
export const getToken = ()      => localStorage.getItem('pf_token')
export const getUser  = ()      => { try { return JSON.parse(localStorage.getItem('pf_user')) } catch { return null } }
const setToken = (t)            => localStorage.setItem('pf_token', t)
const setUser  = (u)            => localStorage.setItem('pf_user', JSON.stringify(u))
export const clearSession = ()  => { localStorage.removeItem('pf_token'); localStorage.removeItem('pf_user') }

/* ── Real fetch helper ── uncomment when backend is ready ────
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
─────────────────────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════════
   CLIENT AUTH
   Backend endpoints:
     POST /auth/client/signup
     POST /auth/client/login
     POST /auth/logout
══════════════════════════════════════════════════════════ */

export async function clientSignup({ name, email, password, goal, phone }) {
  await delay(1000)
  // ── MOCK ──────────────────────────────────────────────
  if (email === 'existing@test.com') throw new Error('Email already registered.')
  const user = {
    id: 'c_' + Date.now(), name, email, goal, phone,
    role: 'client', avatar: name[0].toUpperCase(),
    joinedAt: new Date().toISOString(),
  }
  const token = 'mock_client_' + Date.now()
  setToken(token); setUser(user)
  return { user, token }
  // ── REAL (replace mock above with this) ───────────────
  // const data = await apiFetch('/auth/client/signup', { method:'POST', body: JSON.stringify({ name, email, password, goal, phone }) })
  // setToken(data.token); setUser(data.user)
  // return data
}

export async function clientLogin({ email, password }) {
  await delay(1000)
  // ── MOCK ──────────────────────────────────────────────
  const DEMO = { email: 'client@demo.com', password: 'Demo@2025' }
  if (email !== DEMO.email || password !== DEMO.password)
    throw new Error('Invalid email or password.')
  const user = {
    id: 'c_demo', name: 'Marcus Webb', email, goal: 'Weight Loss',
    phone: '+44 7700 111000', role: 'client', avatar: 'M',
    joinedAt: '2025-04-01T00:00:00.000Z', weekStart: 8,
  }
  const token = 'mock_client_token_demo'
  setToken(token); setUser(user)
  return { user, token }
  // ── REAL ──────────────────────────────────────────────
  // const data = await apiFetch('/auth/client/login', { method:'POST', body: JSON.stringify({ email, password }) })
  // setToken(data.token); setUser(data.user)
  // return data
}

export async function logout() {
  await delay(300)
  clearSession()
  // ── REAL: await apiFetch('/auth/logout', { method:'POST' }) ──
}

/* ══════════════════════════════════════════════════════════
   ADMIN AUTH
   Backend endpoints:
     POST /auth/admin/login
══════════════════════════════════════════════════════════ */

export async function adminLogin({ email, password }) {
  await delay(1000)
  // ── MOCK ──────────────────────────────────────────────
  const ADMINS = [
    { email:'admin@primeform.com', password:'Admin@2025', name:'James Clarke',   role:'Super Admin' },
    { email:'coach@primeform.com', password:'Coach@2025', name:'Sarah Mitchell', role:'Coach'       },
  ]
  const match = ADMINS.find(a => a.email === email && a.password === password)
  if (!match) throw new Error('Invalid email or password.')
  return { name: match.name, role: match.role, email: match.email }
  // ── REAL ──────────────────────────────────────────────
  // return apiFetch('/auth/admin/login', { method:'POST', body: JSON.stringify({ email, password }) })
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
  // ── MOCK ──────────────────────────────────────────────
  return {
    weekNumber: 8,
    nextSession: { date: '2025-07-24', time: '07:30', type: 'Weekly Check-in', coachNote: 'Great consistency this week Marcus — let\'s review your sleep data today.' },
    stats: { sessionsCompleted: 21, currentWeight: 92.4, startWeight: 108, targetWeight: 85, energyScore: 8.2, adherence: 91 },
    weeklyWorkouts: [
      { day: 'Mon', label: 'Upper Body Strength', done: true  },
      { day: 'Tue', label: 'Rest / Walk',          done: true  },
      { day: 'Wed', label: 'Lower Body Power',     done: true  },
      { day: 'Thu', label: 'Rest',                 done: true  },
      { day: 'Fri', label: 'Full Body Circuit',    done: false },
      { day: 'Sat', label: 'Active Recovery',      done: false },
      { day: 'Sun', label: 'Rest',                 done: false },
    ],
    recentActivity: [
      { type: 'workout', label: 'Lower Body Power completed',   time: '2 days ago' },
      { type: 'checkin', label: 'Weekly check-in — Week 7',     time: '5 days ago' },
      { type: 'weight',  label: 'Weight logged: 92.4 kg',       time: '6 days ago' },
      { type: 'workout', label: 'Upper Body Strength completed', time: '1 week ago' },
    ],
  }
  // ── REAL: return apiFetch('/client/dashboard') ──
}

export async function getClientProgramme() {
  await delay(600)
  // ── MOCK ──────────────────────────────────────────────
  return {
    phase: 'Phase 2 — Metabolic Drive',
    phaseWeek: 3,
    phaseTotalWeeks: 6,
    coachNote: 'This phase focuses on building your metabolic engine. Intensity is up — listen to your body and flag anything that feels off.',
    workouts: [
      {
        id: 1, day: 'Monday', title: 'Upper Body Strength', duration: '45 min', tag: 'Strength',
        exercises: [
          { name: 'Barbell Bench Press',    sets: '4', reps: '6–8',   rest: '90s', note: 'Control the eccentric' },
          { name: 'Seated Cable Row',       sets: '4', reps: '8–10',  rest: '75s', note: '' },
          { name: 'Overhead Press',         sets: '3', reps: '8–10',  rest: '75s', note: 'Keep core tight' },
          { name: 'Lat Pulldown',           sets: '3', reps: '10–12', rest: '60s', note: '' },
          { name: 'Tricep Rope Pushdown',   sets: '3', reps: '12–15', rest: '45s', note: '' },
          { name: 'Hammer Curls',           sets: '3', reps: '12–15', rest: '45s', note: '' },
        ],
      },
      {
        id: 2, day: 'Wednesday', title: 'Lower Body Power', duration: '50 min', tag: 'Power',
        exercises: [
          { name: 'Barbell Back Squat',     sets: '4', reps: '5–6',   rest: '120s', note: 'Depth to parallel' },
          { name: 'Romanian Deadlift',      sets: '4', reps: '8–10',  rest: '90s',  note: '' },
          { name: 'Bulgarian Split Squat',  sets: '3', reps: '10/leg',rest: '75s',  note: 'Use DB for balance' },
          { name: 'Leg Press',              sets: '3', reps: '12–15', rest: '60s',  note: '' },
          { name: 'Standing Calf Raise',    sets: '4', reps: '15–20', rest: '45s',  note: '' },
        ],
      },
      {
        id: 3, day: 'Friday', title: 'Full Body Circuit', duration: '40 min', tag: 'Conditioning',
        exercises: [
          { name: 'Deadlift',               sets: '3', reps: '5',     rest: '120s', note: 'Heavy — focus on form' },
          { name: 'Push-Up Variation',      sets: '3', reps: '15',    rest: '45s',  note: '' },
          { name: 'Goblet Squat',           sets: '3', reps: '15',    rest: '45s',  note: '' },
          { name: 'TRX Row / Inverted Row', sets: '3', reps: '12',    rest: '45s',  note: '' },
          { name: 'Farmer Carries',         sets: '3', reps: '30m',   rest: '60s',  note: 'Heavy — stride long' },
        ],
      },
    ],
    nutrition: {
      calories: 2400, protein: 185, carbs: 240, fat: 75,
      tips: [
        'Eat protein within 45 min of finishing a session.',
        'Aim for 3L of water on training days.',
        'Don\'t fear carbs around workouts — they drive performance.',
      ],
    },
  }
  // ── REAL: return apiFetch('/client/programme') ──
}

export async function getClientBookings() {
  await delay(500)
  // ── MOCK ──────────────────────────────────────────────
  return {
    upcoming: [
      { id: 1, date: '2025-07-24', time: '07:30', type: 'Weekly Check-in',   status: 'Confirmed', coachNote: 'Review sleep, nutrition & training load.' },
      { id: 2, date: '2025-07-31', time: '07:30', type: 'Weekly Check-in',   status: 'Confirmed', coachNote: '' },
      { id: 3, date: '2025-08-14', time: '08:00', type: 'Phase Review Call', status: 'Confirmed', coachNote: 'End of Phase 2 — we\'ll set the Phase 3 direction.' },
    ],
    past: [
      { id: 4, date: '2025-07-17', time: '07:30', type: 'Weekly Check-in',   status: 'Completed', summary: 'Great week — pushed through travel disruption.' },
      { id: 5, date: '2025-07-10', time: '07:30', type: 'Weekly Check-in',   status: 'Completed', summary: 'Adjusted nutrition targets upward.' },
      { id: 6, date: '2025-07-03', time: '07:30', type: 'Weekly Check-in',   status: 'Completed', summary: 'Sleep patterns improving after new evening protocol.' },
    ],
  }
  // ── REAL: return apiFetch('/client/bookings') ──
}

export async function getClientProgress() {
  await delay(500)
  // ── MOCK ──────────────────────────────────────────────
  return {
    weightHistory: [
      { week: 'W1', value: 108.0 }, { week: 'W2', value: 106.8 },
      { week: 'W3', value: 105.5 }, { week: 'W4', value: 104.2 },
      { week: 'W5', value: 103.1 }, { week: 'W6', value: 101.8 },
      { week: 'W7', value: 100.0 }, { week: 'W8', value: 92.4  },
    ],
    energyHistory: [
      { week: 'W1', value: 4 }, { week: 'W2', value: 5 },
      { week: 'W3', value: 5 }, { week: 'W4', value: 6 },
      { week: 'W5', value: 7 }, { week: 'W6', value: 7 },
      { week: 'W7', value: 8 }, { week: 'W8', value: 8 },
    ],
    milestones: [
      { label: 'First 5kg lost',         achieved: true,  week: 3  },
      { label: 'Sleep consistency ≥7h',  achieved: true,  week: 4  },
      { label: '10kg total lost',        achieved: true,  week: 6  },
      { label: 'Energy score 8+',        achieved: true,  week: 7  },
      { label: '15kg total lost',        achieved: false, week: null },
      { label: 'Target weight reached',  achieved: false, week: null },
    ],
  }
  // ── REAL: return apiFetch('/client/progress') ──
}
