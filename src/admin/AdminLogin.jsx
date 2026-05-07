import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle2, Loader2, Shield } from 'lucide-react'
import primeLogo from '../../logo/primelogo.jpeg'

/* ─────────────────────────────────────────────
   CREDENTIALS (demo — shown on the UI)
   In production, replace with real auth API.
───────────────────────────────────────────── */
const DEMO_CREDENTIALS = [
  { email: 'admin@primeform.com',  password: 'Admin@2025',  role: 'Super Admin', name: 'James Clarke'   },
  { email: 'coach@primeform.com',  password: 'Coach@2025',  role: 'Coach',       name: 'Sarah Mitchell' },
  { email: 'viewer@primeform.com', password: 'View@2025',   role: 'Viewer',      name: 'Alex Turner'    },
]

/* ─────────────────────────────────────────────
   FLOATING PARTICLE (decorative background)
───────────────────────────────────────────── */
function Particle({ x, y, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-accent/10 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

/* ─────────────────────────────────────────────
   LOGIN FORM
───────────────────────────────────────────── */
export default function AdminLogin({ onLogin }) {
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [remember,    setRemember]    = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [success,     setSuccess]     = useState(false)
  const [showCreds,   setShowCreds]   = useState(false)

  /* Simulate async auth */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1200))

    // Find matching credential
    const match = DEMO_CREDENTIALS.find(
      (c) => c.email === email.trim() && c.password === password
    )

    setLoading(false)

    if (match) {
      setSuccess(true)
      // Short success animation, then enter admin
      await new Promise((r) => setTimeout(r, 900))
      onLogin({ name: match.name, role: match.role, email: match.email })
    } else {
      setError('Invalid email or password. Check the demo credentials below.')
    }
  }

  /* Autofill from demo credential click */
  const autofill = (cred) => {
    setEmail(cred.email)
    setPassword(cred.password)
    setError('')
  }

  const inputBase = `
    w-full bg-white/7 border border-white/12 rounded-xl px-4 py-3 text-sm text-light
    placeholder:text-muted outline-none transition-all duration-200
    hover:bg-white/9 hover:border-white/20
    focus:border-accent/60 focus:bg-white/12 focus:ring-1 focus:ring-accent/20
  `

  return (
    <div className="min-h-screen bg-primary font-body flex items-center justify-center relative overflow-hidden">

      {/* ── Animated background particles ── */}
      {[
        { x: 10, y: 15, size: 80,  delay: 0   },
        { x: 80, y: 20, size: 120, delay: 1.2 },
        { x: 20, y: 70, size: 60,  delay: 0.7 },
        { x: 70, y: 75, size: 90,  delay: 2   },
        { x: 50, y: 40, size: 40,  delay: 1.5 },
        { x: 90, y: 55, size: 70,  delay: 0.3 },
      ].map((p, i) => <Particle key={i} {...p} />)}

      {/* ── Background grid ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Gradient glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Success overlay */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 z-20 bg-surface/95 rounded-3xl flex flex-col items-center justify-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 size={32} className="text-green-400" />
              </motion.div>
              <p className="font-display text-3xl">Welcome Back</p>
              <p className="text-sm text-muted">Entering admin panel…</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-surface/85 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40">

          {/* ── Logo ── */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={primeLogo}
              alt="Prime Form logo"
              className="h-11 w-auto rounded-md"
            />
            <div>
              <span className="font-display text-2xl tracking-widest">
                PRIME FORM
              </span>
              <p className="text-xs text-muted -mt-1">Admin Panel</p>
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="mb-7">
            <h1 className="font-display text-4xl leading-tight">SIGN IN</h1>
            <p className="text-sm text-muted mt-1.5">Access the management dashboard</p>
          </div>

          {/* ── Error alert ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-3 bg-red-400/8 border border-red-400/20
                           rounded-xl p-3.5 mb-5 overflow-hidden"
              >
                <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300 leading-relaxed">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="admin@primeform.com"
                  className={`${inputBase} pl-10 border-white/10 focus:border-accent/40`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  className={`${inputBase} pl-10 pr-11 border-white/10 focus:border-accent/40`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-light transition-colors p-1"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    remember ? 'bg-accent border-accent' : 'border-white/20 bg-transparent'
                  }`}
                >
                  {remember && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 size={10} className="text-white" />
                  </motion.div>}
                </div>
                <span className="text-xs text-muted group-hover:text-light transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-xs text-accent hover:text-orange-400 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full flex items-center justify-center gap-2 rounded-xl py-3.5
                text-sm font-semibold transition-all duration-200 mt-2
                ${loading
                  ? 'bg-accent/50 text-white/60 cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  <Shield size={15} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* ── Demo credentials section ── */}
          <div className="mt-6 border-t border-white/5 pt-5">
            <button
              onClick={() => setShowCreds(!showCreds)}
              className="w-full flex items-center justify-between text-xs text-muted hover:text-light transition-colors group"
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">?</span>
                Demo credentials for testing
              </span>
              <motion.span animate={{ rotate: showCreds ? 180 : 0 }} transition={{ duration: 0.2 }}>
                ↓
              </motion.span>
            </button>

            <AnimatePresence>
              {showCreds && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-2">
                    {DEMO_CREDENTIALS.map((cred) => (
                      <button
                        key={cred.email}
                        onClick={() => autofill(cred)}
                        className="w-full text-left p-3 rounded-xl bg-white/3 border border-white/8
                                   hover:border-accent/30 hover:bg-accent/5 transition-all duration-150 group"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs font-medium text-light group-hover:text-accent transition-colors">
                              {cred.name}
                            </p>
                            <p className="text-[11px] text-muted mt-0.5">{cred.email}</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted">
                            {cred.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted mt-1.5 font-mono tracking-wide">
                          Password: {cred.password}
                        </p>
                      </button>
                    ))}
                    <p className="text-[10px] text-muted/60 text-center pt-1">
                      Click any credential to autofill the form
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Back to site link ── */}
        <p className="text-center text-xs text-muted mt-5">
          <span className="opacity-60">Not an admin? </span>
          <button
            onClick={() => onLogin(null, 'back')}
            className="text-accent hover:text-orange-400 transition-colors"
          >
            Back to website →
          </button>
        </p>
      </motion.div>
    </div>
  )
}
