import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Dumbbell, Calendar, TrendingUp,
  LogOut, CheckCircle2, Clock, ChevronRight, Menu, X,
  Scale, Zap, Activity, Target, Award, ChevronDown, ChevronUp,
  User, Bell, ExternalLink
} from 'lucide-react'
import {
  getClientDashboard, getClientProgramme,
  getClientBookings,  getClientProgress, logout
} from '../lib/api'

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function Loader() {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, color = 'text-accent', bg = 'bg-accent/10' }) {
  return (
    <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
      <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-4`}>
        <Icon size={15} className={color} />
      </div>
      <p className="font-display text-3xl text-light">{value}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
      {sub && <p className="text-[11px] text-accent mt-0.5">{sub}</p>}
    </div>
  )
}

/* ══════════════════════════════════════════════
   DASHBOARD TAB
══════════════════════════════════════════════ */
function DashboardTab({ user }) {
  const [data, setData] = useState(null)

  useEffect(() => { getClientDashboard().then(setData) }, [])

  if (!data) return <Loader />

  const { weekNumber, nextSession, stats, weeklyWorkouts, recentActivity } = data
  const weightLost = (stats.startWeight - stats.currentWeight).toFixed(1)
  const progress   = Math.round(((stats.startWeight - stats.currentWeight) / (stats.startWeight - stats.targetWeight)) * 100)

  const activityIcon = { workout: Dumbbell, checkin: Calendar, weight: Scale }

  return (
    <div className="space-y-5">
      {/* Welcome banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl border border-accent/20 bg-accent/5">
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <p className="text-xs text-accent font-semibold tracking-widest uppercase mb-1">Week {weekNumber}</p>
        <h2 className="font-display text-3xl text-light">GOOD MORNING, {user?.name?.split(' ')[0]?.toUpperCase()}</h2>
        <p className="text-sm text-muted mt-1">Keep the momentum — you're doing great.</p>
        {nextSession && (
          <div className="mt-4 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/8 w-fit">
            <Clock size={14} className="text-accent shrink-0" />
            <div>
              <p className="text-xs font-medium text-light">Next: {nextSession.type}</p>
              <p className="text-[11px] text-muted">{nextSession.date} at {nextSession.time}</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Scale}    label="Current Weight"     value={`${stats.currentWeight}kg`} sub={`−${weightLost}kg total`} color="text-accent"     bg="bg-accent/10"     />
        <StatCard icon={Zap}      label="Energy Score"       value={`${stats.energyScore}/10`}  sub="vs 4/10 at start"        color="text-yellow-400" bg="bg-yellow-400/10" />
        <StatCard icon={Activity} label="Sessions Done"      value={stats.sessionsCompleted}     sub="This programme"          color="text-green-400"  bg="bg-green-400/10"  />
        <StatCard icon={Target}   label="Adherence"          value={`${stats.adherence}%`}       sub="Past 4 weeks"            color="text-blue-400"   bg="bg-blue-400/10"   />
      </div>

      {/* Progress bar */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">Goal Progress</p>
          <p className="text-xs text-accent font-semibold">{progress}%</p>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width:0 }} animate={{ width:`${progress}%` }} transition={{ duration:1.2, ease:[0.22,1,0.36,1] }}
            className="h-full bg-accent rounded-full" />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-muted">Start: {stats.startWeight}kg</span>
          <span className="text-[10px] text-muted">Now: {stats.currentWeight}kg</span>
          <span className="text-[10px] text-muted">Target: {stats.targetWeight}kg</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* This week's workouts */}
        <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
          <p className="font-semibold text-sm mb-4">This Week</p>
          <div className="space-y-2">
            {weeklyWorkouts.map(({ day, label, done }) => (
              <div key={day} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${done ? 'border-green-400/15 bg-green-400/3' : 'border-white/5 bg-white/1'}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${done ? 'bg-green-400/15' : 'bg-white/5'}`}>
                  {done ? <CheckCircle2 size={13} className="text-green-400" /> : <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium ${done ? 'text-light line-through opacity-60' : 'text-light'}`}>{label}</p>
                </div>
                <p className="text-[10px] text-muted shrink-0">{day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
          <p className="font-semibold text-sm mb-4">Recent Activity</p>
          <div className="space-y-4">
            {recentActivity.map(({ type, label, time }, i) => {
              const Icon = activityIcon[type] || Activity
              const colors = { workout:'bg-accent/10 text-accent', checkin:'bg-blue-400/10 text-blue-400', weight:'bg-green-400/10 text-green-400' }
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-7 h-7 ${colors[type]?.split(' ')[0] || 'bg-white/10'} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon size={12} className={colors[type]?.split(' ')[1] || 'text-muted'} />
                  </div>
                  <div>
                    <p className="text-xs text-light">{label}</p>
                    <p className="text-[10px] text-muted mt-0.5">{time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Coach note */}
      {nextSession?.coachNote && (
        <div className="p-5 rounded-2xl border border-secondary/30 bg-secondary/8">
          <p className="text-[10px] text-secondary font-semibold tracking-widest uppercase mb-2">Coach Note</p>
          <p className="text-sm text-light/80 leading-relaxed italic">"{nextSession.coachNote}"</p>
          <p className="text-[11px] text-muted mt-2">— James Clarke, for your session on {nextSession.date}</p>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════
   PROGRAMME TAB
══════════════════════════════════════════════ */
function ProgrammeTab() {
  const [data,     setData]     = useState(null)
  const [openId,   setOpenId]   = useState(1)  // which workout is expanded
  const [showNutr, setShowNutr] = useState(false)

  useEffect(() => { getClientProgramme().then(setData) }, [])

  if (!data) return <Loader />

  const { phase, phaseWeek, phaseTotalWeeks, coachNote, workouts, nutrition } = data
  const tagColor = { Strength:'bg-blue-400/10 text-blue-400', Power:'bg-accent/10 text-accent', Conditioning:'bg-green-400/10 text-green-400' }

  return (
    <div className="space-y-5">
      {/* Phase header */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs text-accent font-semibold tracking-widest uppercase">Current Phase</p>
            <h2 className="font-display text-2xl mt-1">{phase}</h2>
            <p className="text-xs text-muted mt-1">Week {phaseWeek} of {phaseTotalWeeks}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Phase progress</p>
            <p className="font-display text-2xl text-accent">{Math.round((phaseWeek/phaseTotalWeeks)*100)}%</p>
          </div>
        </div>
        {/* Phase progress */}
        <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width:0 }} animate={{ width:`${(phaseWeek/phaseTotalWeeks)*100}%` }} transition={{ duration:1, delay:0.2 }}
            className="h-full bg-accent rounded-full" />
        </div>
        {/* Coach note */}
        {coachNote && (
          <div className="mt-4 p-3 rounded-xl bg-secondary/8 border border-secondary/20">
            <p className="text-xs text-secondary font-semibold mb-1">Coach Note</p>
            <p className="text-xs text-light/80 leading-relaxed italic">"{coachNote}"</p>
          </div>
        )}
      </div>

      {/* Workouts accordion */}
      <div className="space-y-3">
        {workouts.map(workout => (
          <div key={workout.id} className="rounded-2xl border border-white/5 bg-white/2 overflow-hidden">
            {/* Header */}
            <button onClick={() => setOpenId(openId === workout.id ? null : workout.id)}
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/2 transition-colors">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <Dumbbell size={16} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{workout.day}</p>
                <p className="text-xs text-muted">{workout.title} · {workout.duration}</p>
              </div>
              <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium shrink-0 ${tagColor[workout.tag] || 'bg-white/5 text-muted'}`}>{workout.tag}</span>
              {openId === workout.id ? <ChevronUp size={15} className="text-muted shrink-0" /> : <ChevronDown size={15} className="text-muted shrink-0" />}
            </button>

            {/* Exercises */}
            <AnimatePresence>
              {openId === workout.id && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }}
                  className="overflow-hidden border-t border-white/5">
                  <div className="p-5 pt-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          {['Exercise','Sets','Reps','Rest','Note'].map(h => (
                            <th key={h} className="text-left pb-2 text-[10px] text-muted font-semibold uppercase tracking-wide pr-4 last:pr-0">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/3">
                        {workout.exercises.map((ex, i) => (
                          <tr key={i} className="hover:bg-white/2 transition-colors">
                            <td className="py-2.5 pr-4 text-xs font-medium text-light">{ex.name}</td>
                            <td className="py-2.5 pr-4 text-xs text-accent font-semibold">{ex.sets}</td>
                            <td className="py-2.5 pr-4 text-xs text-muted">{ex.reps}</td>
                            <td className="py-2.5 pr-4 text-xs text-muted">{ex.rest}</td>
                            <td className="py-2.5 text-[11px] text-muted/70 italic">{ex.note || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Nutrition targets */}
      <div className="rounded-2xl border border-white/5 bg-white/2 overflow-hidden">
        <button onClick={() => setShowNutr(!showNutr)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/2 transition-colors">
          <div className="w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center shrink-0">
            <Target size={16} className="text-green-400" />
          </div>
          <div className="flex-1"><p className="font-semibold text-sm">Nutrition Targets</p><p className="text-xs text-muted">Daily macros & guidelines</p></div>
          {showNutr ? <ChevronUp size={15} className="text-muted" /> : <ChevronDown size={15} className="text-muted" />}
        </button>
        <AnimatePresence>
          {showNutr && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }}
              className="overflow-hidden border-t border-white/5">
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {[['Calories',`${nutrition.calories}`,'kcal','bg-accent/10 text-accent'],['Protein',`${nutrition.protein}g`,'daily','bg-blue-400/10 text-blue-400'],['Carbs',`${nutrition.carbs}g`,'daily','bg-yellow-400/10 text-yellow-400'],['Fat',`${nutrition.fat}g`,'daily','bg-purple-400/10 text-purple-400']].map(([l,v,u,c]) => (
                    <div key={l} className={`p-3 rounded-xl border border-white/5 ${c.split(' ')[0]}/20 text-center`}>
                      <p className={`font-display text-xl ${c.split(' ')[1]}`}>{v}</p>
                      <p className="text-[10px] text-muted mt-0.5">{l}</p>
                      <p className="text-[9px] text-muted/60">{u}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {nutrition.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 bg-green-400/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={9} className="text-green-400" />
                      </div>
                      <p className="text-xs text-muted/80 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   BOOKINGS TAB
══════════════════════════════════════════════ */
function BookingsTab() {
  const [data, setData] = useState(null)

  useEffect(() => { getClientBookings().then(setData) }, [])

  if (!data) return <Loader />

  const { upcoming, past } = data
  const statusColor = { Confirmed:'bg-green-400/10 text-green-400', Pending:'bg-yellow-400/10 text-yellow-400', Completed:'bg-white/5 text-muted' }
  const typeColor   = { 'Discovery Call':'bg-accent/10 text-accent', 'Weekly Check-in':'bg-blue-400/10 text-blue-400', 'Phase Review Call':'bg-purple-400/10 text-purple-400' }

  return (
    <div className="space-y-5">
      {/* Book new session CTA */}
      <div className="flex items-center justify-between p-5 rounded-2xl border border-accent/20 bg-accent/5">
        <div>
          <p className="font-semibold text-sm">Need to reschedule or book a call?</p>
          <p className="text-xs text-muted mt-0.5">Book directly via the scheduling link below</p>
        </div>
        <a href="#" className="flex items-center gap-2 bg-accent text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-orange-500 transition-colors shrink-0">
          <ExternalLink size={12} /> Book Session
        </a>
      </div>

      {/* Upcoming sessions */}
      <div>
        <p className="font-semibold text-sm mb-3">Upcoming Sessions</p>
        <div className="space-y-3">
          {upcoming.map(b => (
            <div key={b.id} className="p-5 rounded-2xl border border-white/5 bg-white/2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex flex-col items-center justify-center shrink-0">
                  <p className="text-sm font-bold text-accent leading-none">{b.date.split('-')[2]}</p>
                  <p className="text-[10px] text-muted leading-none mt-0.5">
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(b.date.split('-')[1])-1]}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm">{b.type}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColor[b.type] || 'bg-white/5 text-muted'}`}>{b.type}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">{b.date} at {b.time}</p>
                  {b.coachNote && <p className="text-[11px] text-muted/70 italic mt-1.5">"{b.coachNote}"</p>}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColor[b.status]}`}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past sessions */}
      <div>
        <p className="font-semibold text-sm mb-3 text-muted">Past Sessions</p>
        <div className="space-y-2">
          {past.map(b => (
            <div key={b.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/3 bg-white/1 opacity-70">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex flex-col items-center justify-center shrink-0">
                <p className="text-xs font-bold text-muted leading-none">{b.date.split('-')[2]}</p>
                <p className="text-[9px] text-muted/60 leading-none mt-0.5">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(b.date.split('-')[1])-1]}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted">{b.type} · {b.time}</p>
                {b.summary && <p className="text-[11px] text-muted/60 mt-0.5 truncate">"{b.summary}"</p>}
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted/60">Done</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   PROGRESS TAB
══════════════════════════════════════════════ */
function ProgressTab() {
  const [data, setData] = useState(null)

  useEffect(() => { getClientProgress().then(setData) }, [])

  if (!data) return <Loader />

  const { weightHistory, energyHistory, milestones } = data

  const maxW = Math.max(...weightHistory.map(d => d.value))
  const minW = Math.min(...weightHistory.map(d => d.value))
  const maxE = 10

  return (
    <div className="space-y-5">

      {/* Weight chart */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-semibold text-sm">Weight Progress</p>
            <p className="text-xs text-muted">Week by week (kg)</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Total lost</p>
            <p className="font-display text-2xl text-accent">−{(weightHistory[0].value - weightHistory[weightHistory.length-1].value).toFixed(1)}kg</p>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-2 h-28">
          {weightHistory.map(({ week, value }, i) => {
            const pct = ((value - minW) / (maxW - minW || 1)) * 100
            const isLatest = i === weightHistory.length - 1
            return (
              <div key={week} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-[9px] text-muted">{value}</p>
                <div className="w-full rounded-t transition-all" style={{ height:`${20 + pct * 0.8}%`, background: isLatest ? 'var(--color-accent, #ff6b35)' : 'rgba(255,255,255,0.1)' }} />
                <p className="text-[9px] text-muted">{week}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Energy chart */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-semibold text-sm">Energy Score</p>
            <p className="text-xs text-muted">Self-reported weekly average /10</p>
          </div>
          <p className="font-display text-2xl text-yellow-400">{energyHistory[energyHistory.length-1].value}/10</p>
        </div>
        <div className="flex items-end gap-2 h-20">
          {energyHistory.map(({ week, value }, i) => {
            const isLatest = i === energyHistory.length - 1
            return (
              <div key={week} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t transition-all"
                  style={{ height:`${(value/maxE)*100}%`, background: isLatest ? '#facc15' : 'rgba(250,204,21,0.15)' }} />
                <p className="text-[9px] text-muted">{week}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Milestones */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
        <p className="font-semibold text-sm mb-4">Milestones</p>
        <div className="space-y-3">
          {milestones.map(({ label, achieved, week }) => (
            <div key={label} className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${achieved ? 'border-green-400/20 bg-green-400/5' : 'border-white/5 bg-white/1 opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${achieved ? 'bg-green-400/20' : 'bg-white/5'}`}>
                {achieved ? <Award size={14} className="text-green-400" /> : <div className="w-3 h-3 rounded-full border-2 border-white/20" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${achieved ? 'text-light' : 'text-muted'}`}>{label}</p>
                {achieved && week && <p className="text-[10px] text-green-400 mt-0.5">Achieved — Week {week}</p>}
              </div>
              {achieved && <CheckCircle2 size={14} className="text-green-400 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   CLIENT PORTAL ROOT
══════════════════════════════════════════════ */
const TABS = [
  { id:'dashboard', label:'Dashboard', Icon:LayoutDashboard },
  { id:'programme', label:'Programme', Icon:Dumbbell        },
  { id:'bookings',  label:'Bookings',  Icon:Calendar        },
  { id:'progress',  label:'Progress',  Icon:TrendingUp      },
]

export default function ClientPortal({ user, onLogout }) {
  const [activeTab,   setActiveTab]   = useState('dashboard')
  const [mobileOpen,  setMobileOpen]  = useState(false)

  const handleLogout = async () => { await logout(); onLogout() }

  return (
    <div className="min-h-screen bg-[#111111] text-light font-body flex flex-col">

      {/* ── Top nav ── */}
      <header className="h-14 bg-[#0c0c0c] border-b border-white/5 flex items-center px-5 gap-4 sticky top-0 z-10">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mr-4">
          <div className="w-6 h-6 relative shrink-0">
            <div className="absolute inset-0 bg-accent rotate-45" />
            <div className="absolute inset-[4px] bg-[#0c0c0c] rotate-45" />
          </div>
          <span className="font-display text-base tracking-widest hidden sm:block">PRIME <span className="text-accent">FORM</span></span>
        </div>

        {/* Desktop tabs */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === id ? 'bg-accent/10 text-accent' : 'text-muted hover:text-light hover:bg-white/4'}`}>
              <Icon size={13} />{label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/3 border border-white/8">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">{user?.avatar || user?.name?.[0]}</div>
            <p className="text-xs text-light">{user?.name?.split(' ')[0]}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-muted hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg border border-white/8 hover:border-red-400/30">
            <LogOut size={12} /><span className="hidden sm:inline">Sign Out</span>
          </button>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-muted hover:text-light transition-colors">
            <Menu size={15} />
          </button>
        </div>
      </header>

      {/* ── Mobile nav drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="ov" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-black/70 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div key="dr" initial={{ x:-240 }} animate={{ x:0 }} exit={{ x:-240 }} transition={{ type:'spring', damping:28 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-[#0c0c0c] border-r border-white/5 z-50 flex flex-col p-5 md:hidden">
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-lg tracking-widest">PF <span className="text-accent">PORTAL</span></span>
                <button onClick={() => setMobileOpen(false)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center"><X size={13} /></button>
              </div>
              <nav className="space-y-1">
                {TABS.map(({ id, label, Icon }) => (
                  <button key={id} onClick={() => { setActiveTab(id); setMobileOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === id ? 'bg-accent/12 text-accent' : 'text-muted hover:text-light hover:bg-white/4'}`}>
                    <Icon size={15} />{label}
                  </button>
                ))}
              </nav>
              <div className="mt-auto">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/8 mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">{user?.avatar || user?.name?.[0]}</div>
                  <div className="min-w-0"><p className="text-xs font-medium text-light truncate">{user?.name}</p><p className="text-[10px] text-muted">Client</p></div>
                </div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted hover:text-red-400 transition-colors">
                  <LogOut size={14} />Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Page content ── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}>
            {activeTab === 'dashboard' && <DashboardTab user={user} />}
            {activeTab === 'programme' && <ProgrammeTab />}
            {activeTab === 'bookings'  && <BookingsTab />}
            {activeTab === 'progress'  && <ProgressTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#0c0c0c] border-t border-white/5 flex z-10">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors ${activeTab === id ? 'text-accent' : 'text-muted hover:text-light'}`}>
            <Icon size={16} />{label}
          </button>
        ))}
      </nav>
      {/* Bottom nav spacer on mobile */}
      <div className="md:hidden h-16" />
    </div>
  )
}
