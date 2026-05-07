import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, Target, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import { clientLogin, clientSignup } from '../lib/api'
import primeLogo from '../../logo/primelogo.jpeg'

const GOALS = ['Weight Loss','Performance & Energy','Stress Recovery','Body Composition','Longevity','Injury Recovery']

function Particle({ x, y, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-accent/8 pointer-events-none"
      style={{ left:`${x}%`, top:`${y}%`, width:size, height:size }}
      animate={{ y:[0,-24,0], opacity:[0.2,0.6,0.2] }}
      transition={{ duration:5+delay, repeat:Infinity, delay, ease:'easeInOut' }}
    />
  )
}

/* ── Shared input wrapper ─────────────────────────────────── */
function AuthInput({ icon: Icon, type='text', placeholder, value, onChange, right }) {
  return (
    <div className="relative">
      <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/70 pointer-events-none" />
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} required
        className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-10 py-3.5
                   text-white placeholder:text-white/20 outline-none transition-all
                   hover:border-accent/30 hover:bg-black/80
                   focus:border-accent focus:bg-black/90 focus:ring-1 focus:ring-accent/20"
      />
      {right}
    </div>
  )
}

/* ══════════════════════════════════════════════
   LOGIN FORM
══════════════════════════════════════════════ */
function LoginForm({ onSuccess, switchToSignup }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { user } = await clientLogin({ email, password })
      setSuccess(true)
      setTimeout(() => onSuccess(user), 800)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="flex items-center gap-2.5 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3 overflow-hidden">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <p className="text-xs text-red-300">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthInput icon={Mail} type="email" placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
      <AuthInput icon={Lock} type={showPass ? 'text' : 'password'} placeholder="Password" value={password}
        onChange={e => { setPassword(e.target.value); setError('') }}
        right={
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-light transition-colors p-1">
            {showPass ? <EyeOff size={13}/> : <Eye size={13}/>}
          </button>
        }
      />

      <div className="flex justify-end">
        <button type="button" className="text-xs text-accent hover:text-orange-400 transition-colors">Forgot password?</button>
      </div>

      <button type="submit" disabled={loading || success}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all ${
          success ? 'bg-green-500 text-white' : loading ? 'bg-accent/50 text-white/60 cursor-not-allowed' : 'bg-accent text-white hover:bg-orange-500 hover:scale-[1.02] active:scale-[0.98]'
        }`}>
        {success  ? <><CheckCircle2 size={15}/> Welcome back!</>
        : loading ? <><Loader2 size={15} className="animate-spin"/> Signing in…</>
        :            'Sign In to Your Portal'}
      </button>

      {/* Demo hint */}
      <div className="p-3 rounded-xl bg-white/3 border border-white/8 text-center">
        <p className="text-[11px] text-muted">Demo: <span className="text-light font-mono">client@demo.com</span> / <span className="text-light font-mono">Demo@2025</span></p>
      </div>

      <p className="text-center text-xs text-muted pt-1">
        New to Prime Form?{' '}
        <button type="button" onClick={switchToSignup} className="text-accent hover:text-orange-400 transition-colors font-medium">
          Create an account
        </button>
      </p>
    </form>
  )
}

/* ══════════════════════════════════════════════
   SIGN UP FORM
══════════════════════════════════════════════ */
function SignupForm({ onSuccess, switchToLogin }) {
  const [step,     setStep]     = useState(1)  // 1 = personal, 2 = credentials
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [showPass, setShowPass] = useState(false)
  const [form,     setForm]     = useState({ name:'', email:'', phone:'', goal:'', password:'', confirm:'' })
  const set = k => e => setForm({ ...form, [k]: e.target.value })

  const nextStep = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.goal) { setError('Please fill in all fields.'); return }
    setError(''); setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8)       { setError('Password must be at least 8 characters.'); return }
    setError(''); setLoading(true)
    try {
      const { user } = await clientSignup(form)
      onSuccess(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-5">
        {[1,2].map(s => (
          <React.Fragment key={s}>
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-all ${step >= s ? 'bg-accent text-white' : 'bg-white/10 text-muted'}`}>{s}</div>
            {s < 2 && <div className={`flex-1 h-px transition-all ${step > s ? 'bg-accent' : 'bg-white/10'}`} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            className="flex items-center gap-2.5 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3 overflow-hidden">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <p className="text-xs text-red-300">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form key="step1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
            onSubmit={nextStep} className="space-y-3">
            <p className="text-xs text-muted mb-1">Step 1 — Your details</p>
            <AuthInput icon={User} placeholder="Full name" value={form.name} onChange={set('name')} />
            <AuthInput icon={Mail} type="email" placeholder="Email address" value={form.email} onChange={e => { set('email')(e); setError('') }} />
            <AuthInput icon={Phone} placeholder="Phone (optional)" value={form.phone} onChange={set('phone')} />
            <div className="relative">
              <Target size={14} className="absolute left-4 top-3.5 text-muted pointer-events-none" />
              <select value={form.goal} onChange={set('goal')} required
                className="w-full bg-white/4 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-light outline-none focus:border-accent/50 transition-all appearance-none">
                <option value="" className="bg-surface">Primary health goal…</option>
                {GOALS.map(g => <option key={g} value={g} className="bg-surface">{g}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full py-3.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Continue →
            </button>
          </motion.form>
        ) : (
          <motion.form key="step2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
            onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-muted mb-1">Step 2 — Create your password</p>
            <AuthInput icon={Lock} type={showPass ? 'text' : 'password'} placeholder="Password (min 8 chars)" value={form.password}
              onChange={e => { set('password')(e); setError('') }}
              right={<button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-light transition-colors p-1">{showPass ? <EyeOff size={13}/> : <Eye size={13}/>}</button>} />
            <AuthInput icon={Lock} type={showPass ? 'text' : 'password'} placeholder="Confirm password" value={form.confirm}
              onChange={e => { set('confirm')(e); setError('') }} />

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setStep(1)}
                className="flex items-center gap-1.5 px-4 py-3 border border-white/10 rounded-xl text-sm text-muted hover:text-light hover:border-white/30 transition-all">
                <ArrowLeft size={13}/> Back
              </button>
              <button type="submit" disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${loading ? 'bg-accent/50 text-white/60 cursor-not-allowed' : 'bg-accent text-white hover:bg-orange-500'}`}>
                {loading ? <><Loader2 size={14} className="animate-spin"/> Creating account…</> : 'Create My Account'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-muted">
        Already have an account?{' '}
        <button onClick={switchToLogin} className="text-accent hover:text-orange-400 transition-colors font-medium">Sign in</button>
      </p>
    </div>
  )
}

/* ══════════════════════════════════════════════
   MAIN CLIENT AUTH SHELL
══════════════════════════════════════════════ */
export default function ClientAuth({ onLogin, defaultTab = 'login', navigate }) {
  const [tab, setTab] = useState(defaultTab) // 'login' | 'signup'

  const particles = [
    { x:8,  y:12, size:90,  delay:0   },
    { x:78, y:18, size:130, delay:1.3 },
    { x:18, y:72, size:70,  delay:0.8 },
    { x:72, y:78, size:100, delay:2   },
    { x:88, y:50, size:60,  delay:0.4 },
  ]

  return (
    <div className="min-h-screen bg-primary font-body flex items-center justify-center relative overflow-hidden px-4">
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity:0, y:28, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
        className="relative z-10 w-full max-w-md">

        <div className="bg-surface/85 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-7">
            <img
              src={primeLogo}
              alt="Prime Form logo"
              className="h-11 w-auto rounded-md shrink-0"
            />
            <div>
              <span className="font-display text-xl tracking-widest">PRIME FORM</span>
              <p className="text-[10px] text-muted -mt-0.5">Client Portal</p>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/4 rounded-xl p-1 mb-7">
            {[['login','Sign In'],['signup','Sign Up']].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${tab===id ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-light'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="font-display text-3xl leading-tight">
              {tab === 'login' ? 'WELCOME BACK' : 'JOIN PRIME FORM'}
            </h1>
            <p className="text-xs text-muted mt-1">
              {tab === 'login' ? 'Access your health coaching portal' : 'Start your transformation today'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {tab === 'login' ? (
              <motion.div key="login" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                <LoginForm onSuccess={onLogin} switchToSignup={() => setTab('signup')} />
              </motion.div>
            ) : (
              <motion.div key="signup" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                <SignupForm onSuccess={onLogin} switchToLogin={() => setTab('login')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back to site */}
        <p className="text-center text-xs text-muted mt-5">
          <button onClick={() => navigate('home')} className="hover:text-accent transition-colors">
            ← Back to Prime Form website
          </button>
        </p>
      </motion.div>
    </div>
  )
}
