import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Star, Layers, HelpCircle, Users, Mail,
  Settings, LogOut, Plus, Edit2, Trash2, Eye, Search, Bell,
  TrendingUp, UserCheck, DollarSign, Calendar, X,
  ChevronLeft, Menu, BarChart2, Globe, FileText,
  Activity, CheckCircle2, ArrowUpRight, ArrowDownRight,
  ExternalLink, User
} from 'lucide-react'
import { Modal, ConfirmModal, Toast, Field, inputCls } from './AdminModal'
import { useToast } from './useToast'

/* ══════════════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════════════ */
const INITIAL_LEADS = [
  { id:1, name:'Marcus Webb',   email:'marcus@company.com', phone:'+44 7700 111000', goal:'Weight Loss',      status:'New',    date:'2025-07-18', notes:'Referred by Richard M.' },
  { id:2, name:'Priya Sharma',  email:'priya@firm.co.uk',   phone:'+44 7700 222000', goal:'Performance',      status:'Called', date:'2025-07-17', notes:'Prefers 6am calls' },
  { id:3, name:'Tom Eriksson',  email:'tom@nordic.se',      phone:'+46 70 234 5678', goal:'Energy',           status:'Booked', date:'2025-07-16', notes:'Discovery call Thu 9am' },
  { id:4, name:'Claire Dubois', email:'claire@paris.fr',    phone:'+33 6 12 34 56',  goal:'Stress Recovery',  status:'Client', date:'2025-07-14', notes:'Week 3 of programme' },
  { id:5, name:'Ahmed Al-Rawi', email:'ahmed@gulf.ae',      phone:'+971 50 123 456', goal:'Body Composition', status:'New',    date:'2025-07-12', notes:'Travels Dubai–London monthly' },
  { id:6, name:'Sophie Laurent',email:'sophie@corp.com',    phone:'+44 7700 555000', goal:'Longevity',        status:'Lost',   date:'2025-07-10', notes:'Price sensitive' },
  { id:7, name:'James Wilson',  email:'james.w@bank.co.uk', phone:'+44 7700 777000', goal:'Weight Loss',      status:'Called', date:'2025-07-09', notes:'Follow-up next week' },
  { id:8, name:'Nina Petrov',   email:'nina@tech.eu',       phone:'+49 151 234 567', goal:'Performance',      status:'Booked', date:'2025-07-08', notes:'Ready to start ASAP' },
]

const INITIAL_SUBS = [
  { id:1, name:'Richard M.', email:'exec@firm.co.uk',      source:'Homepage', date:'2025-07-18', active:true  },
  { id:2, name:'Sarah K.',   email:'ceo@startup.io',        source:'Blog',     date:'2025-07-17', active:true  },
  { id:3, name:'David L.',   email:'partner@lawfirm.com',   source:'Referral', date:'2025-07-15', active:true  },
  { id:4, name:'Jane H.',    email:'director@media.co.uk',  source:'Homepage', date:'2025-07-10', active:false },
  { id:5, name:'Mark T.',    email:'vp@enterprise.com',     source:'FAQ Page', date:'2025-07-08', active:true  },
]

const INITIAL_TESTIMONIALS = [
  { id:1, name:'Richard M.', role:'CEO, FinTech Group',    quote:'I lost 18kg without a single crash diet. My energy at 52 is sharper than it was at 35.',         stars:5, published:true  },
  { id:2, name:'Sarah K.',   role:'Partner, Law Firm',     quote:'Prime Form was the first approach that worked with my insane schedule, not against it.',          stars:5, published:true  },
  { id:3, name:'David L.',   role:'Managing Director, PE', quote:'The ROI on investing in my health has been the best business decision in the last decade.',       stars:5, published:false },
  { id:4, name:'Michael T.', role:'SVP Operations',        quote:'As someone who lives in airports, I never thought a sustainable health routine was possible.',    stars:5, published:true  },
]

const INITIAL_SERVICES = [
  { id:1, title:'Customized Programming',   tag:'Training',  active:true,  desc:'Evidence-based workout plans for boardroom schedules.' },
  { id:2, title:'Accountability & Support', tag:'Coaching',  active:true,  desc:'Daily messaging, weekly reviews, and real-time pivots.' },
  { id:3, title:'Technical Coaching',       tag:'Mastery',   active:true,  desc:'Movement quality and injury prevention.' },
  { id:4, title:'Kitchen Audit',            tag:'Nutrition', active:false, desc:'Science-backed nutrition without fad diets.' },
]

const INITIAL_FAQS = [
  { id:1, q:'What happens on the free discovery call?',  category:'Getting Started', a:'A focused 45-minute session to map your goals and lifestyle.', published:true  },
  { id:2, q:'How long before I see results?',            category:'Getting Started', a:'Energy improvements in 2–3 weeks; visible changes by week 4–6.', published:true  },
  { id:3, q:'Do I need to already be training?',         category:'Getting Started', a:'No. We work with complete beginners through to experienced athletes.', published:false },
  { id:4, q:'How much time per week does training take?',category:'Coaching',        a:'30–60 minutes, 3–4 times per week, flexible around travel.', published:true  },
  { id:5, q:'Do I need to follow a strict diet?',        category:'Nutrition',       a:'No. We build a nutrition framework, not rigid meal plans.', published:true  },
]

const INITIAL_BOOKINGS = [
  { id:1, name:'Tom Eriksson',  email:'tom@nordic.se',      date:'2025-07-22', time:'09:00', type:'Discovery Call',  status:'Confirmed' },
  { id:2, name:'Nina Petrov',   email:'nina@tech.eu',        date:'2025-07-23', time:'11:00', type:'Discovery Call',  status:'Confirmed' },
  { id:3, name:'Claire Dubois', email:'claire@paris.fr',     date:'2025-07-24', time:'08:00', type:'Weekly Check-in', status:'Confirmed' },
  { id:4, name:'Marcus Webb',   email:'marcus@company.com',  date:'2025-07-25', time:'07:30', type:'Discovery Call',  status:'Pending'   },
  { id:5, name:'Ahmed Al-Rawi', email:'ahmed@gulf.ae',       date:'2025-07-28', time:'14:00', type:'Discovery Call',  status:'Pending'   },
]

const LEAD_STATUSES  = ['New','Called','Booked','Client','Lost']
const LEAD_GOALS     = ['Weight Loss','Performance','Energy','Stress Recovery','Body Composition','Longevity','Injury Recovery','Other']
const FAQ_CATEGORIES = ['Getting Started','Coaching & Programme','Nutrition','Investment & Commitment']

/* ══════════════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:'admin',              label:'Dashboard',     Icon:LayoutDashboard, div:false },
  { id:'admin-leads',        label:'Leads',         Icon:Users,           div:false },
  { id:'admin-bookings',     label:'Bookings',      Icon:Calendar,        div:false },
  { id:'admin-subscribers',  label:'Subscribers',   Icon:Mail,            div:true  },
  { id:'admin-testimonials', label:'Testimonials',  Icon:Star,            div:false },
  { id:'admin-services',     label:'Services',      Icon:Layers,          div:false },
  { id:'admin-faq',          label:'FAQ Manager',   Icon:HelpCircle,      div:false },
  { id:'admin-content',      label:'Content',       Icon:FileText,        div:true  },
  { id:'admin-analytics',    label:'Analytics',     Icon:BarChart2,       div:false },
  { id:'admin-profile',      label:'My Profile',    Icon:User,            div:false },
  { id:'admin-settings',     label:'Settings',      Icon:Settings,        div:false },
]

function Sidebar({ current, navigate, collapsed, setCollapsed, user, onLogout, newLeads }) {
  return (
    <aside className={`bg-[#0c0c0c] border-r border-white/5 flex flex-col h-screen sticky top-0 transition-all duration-300 shrink-0 ${collapsed ? 'w-[58px]' : 'w-[218px]'}`}>

      {/* Logo */}
      <div className={`flex items-center border-b border-white/5 h-14 shrink-0 ${collapsed ? 'justify-center' : 'px-4 gap-3'}`}>
        <div className="w-7 h-7 relative shrink-0">
          <div className="absolute inset-0 bg-accent rotate-45" />
          <div className="absolute inset-[5px] bg-[#0c0c0c] rotate-45" />
        </div>
        {!collapsed && <span className="font-display text-lg tracking-widest text-light whitespace-nowrap">PF <span className="text-accent">ADMIN</span></span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto admin-scroll py-3 px-2 space-y-px">
        {NAV_ITEMS.map(({ id, label, Icon, div }) => (
          <React.Fragment key={id}>
            <button
              onClick={() => navigate(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center rounded-xl transition-all duration-150 ${collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'}
                ${current === id ? 'bg-accent/12 text-accent' : 'text-muted hover:text-light hover:bg-white/4'}`}
            >
              <Icon size={15} className="shrink-0" />
              {!collapsed && <span className="text-sm font-medium whitespace-nowrap flex-1">{label}</span>}
              {/* New leads badge */}
              {!collapsed && id === 'admin-leads' && newLeads > 0 && (
                <span className="text-[10px] bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center font-bold">{newLeads}</span>
              )}
            </button>
            {div && <div className="my-2 border-t border-white/5" />}
          </React.Fragment>
        ))}
      </nav>

      {/* User + controls */}
      <div className="border-t border-white/5 p-2 space-y-1 shrink-0">
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/3">
            <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs shrink-0">{user.name[0]}</div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-light truncate">{user.name}</p>
              <p className="text-[10px] text-muted truncate">{user.role}</p>
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expand' : 'Collapse'}
          className={`w-full flex items-center rounded-xl text-muted hover:text-light transition-colors ${collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2'}`}>
          <ChevronLeft size={15} className={`shrink-0 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
        <button onClick={onLogout} title={collapsed ? 'Sign out' : undefined}
          className={`w-full flex items-center rounded-xl text-muted hover:text-red-400 transition-colors ${collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2'}`}>
          <LogOut size={15} className="shrink-0" />
          {!collapsed && <span className="text-xs">Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}

/* ══════════════════════════════════════════════════
   TOP BAR
══════════════════════════════════════════════════ */
function TopBar({ title, navigate, user, notifOpen, setNotifOpen, newLeads }) {
  const notifs = [
    { Icon:Users,    col:'text-blue-400',  bg:'bg-blue-400/10',  msg:'New lead: Marcus Webb',            time:'2m ago'  },
    { Icon:Calendar, col:'text-accent',    bg:'bg-accent/10',    msg:'Booking confirmed — Tom Eriksson', time:'1h ago'  },
    { Icon:Mail,     col:'text-green-400', bg:'bg-green-400/10', msg:'3 new email subscribers',         time:'2h ago'  },
    { Icon:Star,     col:'text-yellow-400',bg:'bg-yellow-400/10',msg:'New testimonial submitted',       time:'1d ago'  },
  ]
  return (
    <header className="h-14 border-b border-white/5 px-5 flex items-center justify-between bg-[#0c0c0c]/80 backdrop-blur-sm sticky top-0 z-10 shrink-0">
      <h1 className="font-semibold text-sm text-light">{title}</h1>
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 bg-white/3 border border-white/8 rounded-lg px-3 py-1.5 w-40 focus-within:border-accent/30 transition-colors">
          <Search size={12} className="text-muted shrink-0" />
          <input className="bg-transparent text-xs text-light placeholder:text-muted outline-none w-full" placeholder="Search…" />
        </div>
        {/* Notif bell */}
        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)}
            className={`relative w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${notifOpen ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-white/3 border-white/8 text-muted hover:text-light'}`}>
            <Bell size={13} />
            {newLeads > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[9px] flex items-center justify-center font-bold text-white">{newLeads}</span>}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div initial={{ opacity:0, y:8, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:8, scale:0.95 }} transition={{ duration:0.15 }}
                className="absolute right-0 top-10 w-76 bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 w-72">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <p className="font-semibold text-sm">Notifications</p>
                  <span className="text-[10px] text-accent cursor-pointer hover:text-orange-400">Mark all read</span>
                </div>
                <div className="divide-y divide-white/5">
                  {notifs.map(({ Icon, col, bg, msg, time }, i) => (
                    <div key={i} className="flex gap-3 px-4 py-3 hover:bg-white/2 transition-colors cursor-pointer">
                      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center shrink-0`}><Icon size={13} className={col} /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-light leading-relaxed">{msg}</p>
                        <p className="text-[10px] text-muted mt-0.5">{time}</p>
                      </div>
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-white/5 text-center">
                  <button className="text-xs text-accent hover:text-orange-400 transition-colors">View all</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* View site */}
        <button onClick={() => navigate('home')} className="flex items-center gap-1.5 text-xs text-muted hover:text-light transition-colors bg-white/3 border border-white/8 rounded-lg px-3 py-1.5">
          <ExternalLink size={11} /><span className="hidden sm:inline">Site</span>
        </button>
        {/* Avatar → profile */}
        {user && (
          <div onClick={() => navigate('admin-profile')} className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs cursor-pointer hover:bg-accent/30 transition-colors">
            {user.name[0]}
          </div>
        )}
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════ */
function Dashboard({ navigate, leads, subscribers }) {
  const newL   = leads.filter(l => l.status === 'New').length
  const clients = leads.filter(l => l.status === 'Client').length
  const activeSubs = subscribers.filter(s => s.active).length
  const kpis = [
    { label:'Total Leads',    value:leads.length, delta:'+12%', up:true,  Icon:Users,      color:'text-blue-400',   bg:'bg-blue-400/10',   go:'admin-leads'       },
    { label:'New Leads',      value:newL,          delta:'+3',   up:true,  Icon:TrendingUp, color:'text-accent',     bg:'bg-accent/10',     go:'admin-leads'       },
    { label:'Active Clients', value:clients,       delta:'+2',   up:true,  Icon:UserCheck,  color:'text-green-400',  bg:'bg-green-400/10',  go:'admin-leads'       },
    { label:'Subscribers',    value:activeSubs,    delta:'+8%',  up:true,  Icon:Mail,       color:'text-purple-400', bg:'bg-purple-400/10', go:'admin-subscribers' },
  ]
  const bars   = [30,52,41,68,73,90,85,110,95,130,118,142]
  const maxBar = Math.max(...bars)
  const months = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul']
  const activity = [
    { Icon:Users,    c:'bg-blue-400',   t:'New lead from Marcus Webb',        sub:'Weight Loss · 2m ago'     },
    { Icon:Calendar, c:'bg-accent',     t:'Booking confirmed — Tom Eriksson', sub:'Thu 9am · Discovery Call' },
    { Icon:Star,     c:'bg-yellow-400', t:'New testimonial submitted',        sub:'Michael T. · 5 stars'     },
    { Icon:Mail,     c:'bg-green-400',  t:'3 new email subscribers',          sub:'All active · 5h ago'      },
    { Icon:CheckCircle2,c:'bg-purple-400',t:'Client onboarded: Claire Dubois',sub:'Week 3 · Stress Recovery' },
  ]
  const pipeline = [
    { label:'New',    count:leads.filter(l=>l.status==='New').length,    color:'bg-blue-400',   pct:100 },
    { label:'Called', count:leads.filter(l=>l.status==='Called').length, color:'bg-yellow-400', pct:75  },
    { label:'Booked', count:leads.filter(l=>l.status==='Booked').length, color:'bg-accent',     pct:50  },
    { label:'Client', count:leads.filter(l=>l.status==='Client').length, color:'bg-green-400',  pct:25  },
    { label:'Lost',   count:leads.filter(l=>l.status==='Lost').length,   color:'bg-red-400',    pct:15  },
  ]

  return (
    <div className="p-5 space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(({ label, value, delta, up, Icon, color, bg, go }) => (
          <motion.button key={label} onClick={() => navigate(go)} whileHover={{ y:-2 }}
            className="p-5 rounded-2xl border border-white/5 bg-white/2 text-left hover:border-white/10 hover:bg-white/4 transition-all duration-200 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center`}><Icon size={15} className={color} /></div>
              <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${up ? 'text-green-400' : 'text-red-400'}`}>
                {up ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>}{delta}
              </span>
            </div>
            <p className="font-display text-3xl text-light">{value}</p>
            <p className="text-xs text-muted mt-1">{label}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Revenue chart */}
        <div className="xl:col-span-2 p-5 rounded-2xl border border-white/5 bg-white/2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-semibold text-sm">Revenue Overview</p>
              <p className="text-xs text-muted mt-0.5">MRR — last 12 months (£)</p>
            </div>
            <div className="flex gap-1.5">
              {['3M','6M','1Y'].map((t,i) => (
                <button key={t} className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${i===2 ? 'bg-accent/10 text-accent' : 'text-muted hover:text-light'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {bars.map((v,i) => (
              <div key={i} className="flex-1">
                <div className={`w-full rounded-t transition-all duration-700 ${i===bars.length-1 ? 'bg-accent' : 'bg-white/10 hover:bg-white/20'}`}
                  style={{ height:`${(v/maxBar)*100}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {months.map(m => <span key={m} className="text-[9px] text-muted flex-1 text-center">{m}</span>)}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-white/5">
            {[['MRR','£18,400'],['ARR','£220,800'],['Avg/Client','£800']].map(([l,v]) => (
              <div key={l}><p className="text-xs text-muted">{l}</p><p className="font-semibold text-light mt-0.5">{v}</p></div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm">Recent Activity</p>
            <button className="text-xs text-accent hover:text-orange-400 transition-colors">All</button>
          </div>
          <div className="space-y-4">
            {activity.map(({ Icon, c, t, sub }, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-7 h-7 ${c}/15 rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon size={12} className={c.replace('bg-','text-')} />
                </div>
                <div>
                  <p className="text-xs text-light leading-relaxed">{t}</p>
                  <p className="text-[10px] text-muted mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Pipeline funnel */}
        <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
          <p className="font-semibold text-sm mb-4">Lead Pipeline</p>
          {pipeline.map(({ label, count, color, pct }) => (
            <div key={label} className="flex items-center gap-3 mb-2.5">
              <p className="text-xs text-muted w-12">{label}</p>
              <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className={`${color}/70 h-full rounded-full`} style={{ width:`${pct}%` }} />
              </div>
              <p className="text-xs font-medium text-light w-4 text-right">{count}</p>
            </div>
          ))}
        </div>

        {/* Upcoming bookings */}
        <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-sm">Upcoming Bookings</p>
            <button onClick={() => navigate('admin-bookings')} className="text-xs text-accent hover:text-orange-400 transition-colors">View all</button>
          </div>
          <div className="space-y-3">
            {INITIAL_BOOKINGS.slice(0,4).map(({ id, name, date, time, type, status }) => {
              const mo = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][parseInt(date.split('-')[1])-1]
              return (
                <div key={id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex flex-col items-center justify-center shrink-0">
                    <p className="text-[10px] font-bold text-accent leading-none">{date.split('-')[2]}</p>
                    <p className="text-[8px] text-muted leading-none">{mo}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-light truncate">{name}</p>
                    <p className="text-[10px] text-muted">{time} · {type}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${status==='Confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>{status}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   LEADS TABLE — full CRUD
══════════════════════════════════════════════════ */
const STATUS_COLOR = { New:'bg-blue-400/10 text-blue-400', Called:'bg-yellow-400/10 text-yellow-400', Booked:'bg-accent/10 text-accent', Client:'bg-green-400/10 text-green-400', Lost:'bg-red-400/10 text-red-400' }

function LeadsTable({ leads, setLeads, showToast }) {
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('All')
  const [addOpen, setAddOpen] = useState(false)
  const [editItem,setEditItem] = useState(null)
  const [delItem, setDelItem]  = useState(null)
  const [viewItem,setViewItem] = useState(null)

  const filtered = leads.filter(l => {
    const q = search.toLowerCase()
    return (filter==='All' || l.status===filter) && (l.name.toLowerCase().includes(q) || l.email.includes(q) || l.goal.toLowerCase().includes(q))
  })

  const save = (data) => {
    if (editItem) { setLeads(leads.map(l => l.id===editItem.id ? { ...editItem,...data } : l)); showToast('Lead updated') }
    else          { setLeads([{ id:Date.now(), date:new Date().toISOString().split('T')[0],...data },...leads]); showToast('Lead added') }
    setAddOpen(false); setEditItem(null)
  }

  return (
    <div className="p-5 space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-2 bg-white/3 border border-white/8 rounded-xl px-3 py-2">
          <Search size={12} className="text-muted shrink-0" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search leads…" className="bg-transparent text-xs text-light placeholder:text-muted outline-none w-36" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All',...LEAD_STATUSES].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filter===s ? 'border-accent text-accent bg-accent/10' : 'border-white/10 text-muted hover:border-white/30'}`}>
              {s}{s!=='All' && <span className="ml-1 opacity-50">({leads.filter(l=>l.status===s).length})</span>}
            </button>
          ))}
        </div>
        <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 bg-accent text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors">
          <Plus size={13} /> Add Lead
        </button>
      </div>

      <div className="rounded-2xl border border-white/5 overflow-x-auto">
        <table className="w-full text-sm min-w-[660px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/1">
              {['Client','Email','Goal','Status','Date','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] text-muted font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {filtered.length===0
              ? <tr><td colSpan={6} className="px-4 py-10 text-center text-muted text-sm">No leads found</td></tr>
              : filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-secondary/30 flex items-center justify-center text-xs font-bold shrink-0">{lead.name[0]}</div>
                      <div>
                        <p className="text-xs font-medium text-light">{lead.name}</p>
                        <p className="text-[10px] text-muted">{lead.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{lead.email}</td>
                  <td className="px-4 py-3 text-xs text-muted">{lead.goal}</td>
                  <td className="px-4 py-3"><span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[lead.status]}`}>{lead.status}</span></td>
                  <td className="px-4 py-3 text-xs text-muted">{lead.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setViewItem(lead)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-blue-400/10 hover:text-blue-400 transition-colors"><Eye size={11}/></button>
                      <button onClick={() => setEditItem(lead)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-colors"><Edit2 size={11}/></button>
                      <button onClick={() => setDelItem(lead)}  className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 transition-colors"><Trash2 size={11}/></button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted">{filtered.length} of {leads.length} leads</p>

      {/* Modals */}
      <Modal open={addOpen||!!editItem} onClose={() => { setAddOpen(false); setEditItem(null) }} title={editItem ? 'Edit Lead' : 'Add Lead'} subtitle="Leads">
        <LeadForm initial={editItem} onSave={save} onCancel={() => { setAddOpen(false); setEditItem(null) }} />
      </Modal>
      <Modal open={!!viewItem} onClose={() => setViewItem(null)} title="Lead Details" subtitle="Record">
        {viewItem && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center text-xl font-bold">{viewItem.name[0]}</div>
              <div><p className="font-semibold">{viewItem.name}</p><p className="text-sm text-muted">{viewItem.email} · {viewItem.phone}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['Goal',viewItem.goal],['Status',viewItem.status],['Date',viewItem.date]].map(([k,v]) => (
                <div key={k} className="p-3 rounded-xl bg-white/3 border border-white/5">
                  <p className="text-[10px] text-muted uppercase tracking-wide">{k}</p>
                  <p className="text-sm font-medium text-light mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            {viewItem.notes && <div className="p-4 rounded-xl bg-white/3 border border-white/5"><p className="text-[10px] text-muted uppercase mb-1">Notes</p><p className="text-sm text-light/80 leading-relaxed">{viewItem.notes}</p></div>}
          </div>
        )}
      </Modal>
      <ConfirmModal open={!!delItem} onClose={() => setDelItem(null)} onConfirm={() => { setLeads(leads.filter(l=>l.id!==delItem.id)); showToast('Lead deleted','error') }} itemName={delItem?.name} />
    </div>
  )
}

function LeadForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({ name:initial?.name||'', email:initial?.email||'', phone:initial?.phone||'', goal:initial?.goal||'', status:initial?.status||'New', notes:initial?.notes||'' })
  const s = k => e => setF({ ...f, [k]:e.target.value })
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" required><input className={inputCls} value={f.name} onChange={s('name')} placeholder="Marcus Webb" /></Field>
        <Field label="Email" required><input className={inputCls} type="email" value={f.email} onChange={s('email')} placeholder="marcus@company.com" /></Field>
        <Field label="Phone"><input className={inputCls} value={f.phone} onChange={s('phone')} placeholder="+44 7700 000000" /></Field>
        <Field label="Goal" required>
          <select className={inputCls} value={f.goal} onChange={s('goal')}>
            <option value="">Select goal</option>
            {LEAD_GOALS.map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={inputCls} value={f.status} onChange={s('status')}>
            {LEAD_STATUSES.map(st => <option key={st}>{st}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Notes"><textarea className={`${inputCls} resize-none`} rows={3} value={f.notes} onChange={s('notes')} placeholder="Internal notes…" /></Field>
      <div className="flex gap-3 pt-2">
        <button onClick={onCancel} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-muted hover:border-white/30 transition-all">Cancel</button>
        <button onClick={() => onSave(f)} className="flex-1 py-2.5 bg-accent rounded-xl text-sm text-white font-semibold hover:bg-orange-500 transition-colors">{initial ? 'Save Changes' : 'Add Lead'}</button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   BOOKINGS PAGE
══════════════════════════════════════════════════ */
function BookingsPage({ showToast }) {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS)
  const [delItem,  setDelItem]  = useState(null)
  const BC = { Confirmed:'bg-green-400/10 text-green-400', Pending:'bg-yellow-400/10 text-yellow-400', Cancelled:'bg-red-400/10 text-red-400' }
  const TC = { 'Discovery Call':'bg-accent/10 text-accent', 'Weekly Check-in':'bg-blue-400/10 text-blue-400' }
  const confirm = id => { setBookings(bookings.map(b => b.id===id ? { ...b, status:'Confirmed' } : b)); showToast('Booking confirmed') }
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">{bookings.filter(b=>b.status==='Confirmed').length} confirmed · {bookings.filter(b=>b.status==='Pending').length} pending</p>
        <button className="flex items-center gap-2 bg-accent text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors">
          <Plus size={13} /> Add Booking
        </button>
      </div>
      {/* Week strip */}
      <div className="grid grid-cols-7 gap-2 p-4 rounded-2xl border border-white/5 bg-white/2">
        {days.map((d, i) => {
          const isToday = i === 1
          const hasMeeting = bookings.some(b => new Date(b.date).getDay() === (i + 1) % 7)
          return (
            <div key={d} className={`p-2 rounded-xl text-center cursor-pointer hover:bg-white/5 transition-colors ${isToday ? 'bg-accent/10 border border-accent/20' : ''}`}>
              <p className={`text-[10px] ${isToday ? 'text-accent' : 'text-muted'}`}>{d}</p>
              <p className={`text-sm font-semibold mt-0.5 ${isToday ? 'text-accent' : 'text-light'}`}>{21+i}</p>
              {hasMeeting && <div className="mt-1 flex justify-center"><div className="w-1.5 h-1.5 bg-accent rounded-full" /></div>}
            </div>
          )
        })}
      </div>
      {/* Table */}
      <div className="rounded-2xl border border-white/5 overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/1">
              {['Client','Date & Time','Type','Status','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] text-muted font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3"><p className="text-xs font-medium text-light">{b.name}</p><p className="text-[10px] text-muted">{b.email}</p></td>
                <td className="px-4 py-3"><p className="text-xs text-light">{b.date}</p><p className="text-[10px] text-muted">{b.time}</p></td>
                <td className="px-4 py-3"><span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${TC[b.type]||'bg-white/5 text-muted'}`}>{b.type}</span></td>
                <td className="px-4 py-3"><span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${BC[b.status]}`}>{b.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    {b.status==='Pending' && <button onClick={() => confirm(b.id)} className="w-7 h-7 rounded-lg bg-green-400/5 flex items-center justify-center hover:bg-green-400/15 hover:text-green-400 transition-colors text-muted"><CheckCircle2 size={11}/></button>}
                    <button onClick={() => setDelItem(b)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 transition-colors"><Trash2 size={11}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal open={!!delItem} onClose={() => setDelItem(null)}
        onConfirm={() => { setBookings(bookings.filter(b=>b.id!==delItem.id)); showToast('Booking removed','error') }}
        itemName={delItem ? `${delItem.name} — ${delItem.date} ${delItem.time}` : ''} />
    </div>
  )
}

/* ══════════════════════════════════════════════════
   SUBSCRIBERS
══════════════════════════════════════════════════ */
function SubscribersTable({ subscribers, setSubscribers, showToast }) {
  const [search,  setSearch]  = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editItem,setEditItem] = useState(null)
  const [delItem, setDelItem]  = useState(null)
  const filtered = subscribers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.includes(search))
  const toggleActive = id => setSubscribers(subscribers.map(s => s.id===id ? { ...s, active:!s.active } : s))
  const save = (d) => {
    if (editItem) { setSubscribers(subscribers.map(s => s.id===editItem.id ? { ...editItem,...d } : s)); showToast('Subscriber updated') }
    else          { setSubscribers([{ id:Date.now(), date:new Date().toISOString().split('T')[0], active:true,...d },...subscribers]); showToast('Subscriber added') }
    setAddOpen(false); setEditItem(null)
  }
  const [subForm, setSubForm] = useState({ name:'', email:'', source:'Homepage' })
  const openAdd  = () => { setSubForm({ name:'', email:'', source:'Homepage' }); setEditItem(null); setAddOpen(true) }
  const openEdit = (s)  => { setSubForm({ name:s.name, email:s.email, source:s.source }); setEditItem(s); setAddOpen(true) }

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-2 bg-white/3 border border-white/8 rounded-xl px-3 py-2">
          <Search size={12} className="text-muted shrink-0" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" className="bg-transparent text-xs text-light placeholder:text-muted outline-none w-32" />
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted">{subscribers.filter(s=>s.active).length} active</p>
          <button onClick={openAdd} className="flex items-center gap-2 bg-accent text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors"><Plus size={13} /> Add</button>
        </div>
      </div>
      <div className="rounded-2xl border border-white/5 overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/1">
              {['Name','Email','Source','Date','Active','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] text-muted font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {filtered.map(sub => (
              <tr key={sub.id} className="hover:bg-white/2 transition-colors">
                <td className="px-4 py-3 text-xs font-medium text-light">{sub.name}</td>
                <td className="px-4 py-3 text-xs text-muted">{sub.email}</td>
                <td className="px-4 py-3 text-xs text-muted">{sub.source}</td>
                <td className="px-4 py-3 text-xs text-muted">{sub.date}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(sub.id)} className={`relative w-9 h-5 rounded-full transition-colors ${sub.active ? 'bg-accent' : 'bg-white/10'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${sub.active ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(sub)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-colors"><Edit2 size={11}/></button>
                    <button onClick={() => setDelItem(sub)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 transition-colors"><Trash2 size={11}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setEditItem(null) }} title={editItem ? 'Edit Subscriber' : 'Add Subscriber'} subtitle="Subscribers">
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required><input className={inputCls} value={subForm.name} onChange={e=>setSubForm({...subForm,name:e.target.value})} placeholder="Richard M." /></Field>
            <Field label="Email" required><input className={inputCls} type="email" value={subForm.email} onChange={e=>setSubForm({...subForm,email:e.target.value})} placeholder="exec@firm.co.uk" /></Field>
            <Field label="Source">
              <select className={inputCls} value={subForm.source} onChange={e=>setSubForm({...subForm,source:e.target.value})}>
                {['Homepage','Blog','Referral','FAQ Page','Services Page','Other'].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { setAddOpen(false); setEditItem(null) }} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-muted hover:border-white/30 transition-all">Cancel</button>
            <button onClick={() => save(subForm)} className="flex-1 py-2.5 bg-accent rounded-xl text-sm text-white font-semibold hover:bg-orange-500 transition-colors">{editItem ? 'Save Changes' : 'Add Subscriber'}</button>
          </div>
        </div>
      </Modal>
      <ConfirmModal open={!!delItem} onClose={() => setDelItem(null)}
        onConfirm={() => { setSubscribers(subscribers.filter(s=>s.id!==delItem.id)); showToast('Removed','error') }}
        itemName={delItem?.name} />
    </div>
  )
}

/* ══════════════════════════════════════════════════
   TESTIMONIALS MANAGER — full CRUD
══════════════════════════════════════════════════ */
function TestimonialsManager({ testimonials, setTestimonials, showToast }) {
  const [addOpen, setAddOpen] = useState(false)
  const [editItem,setEditItem] = useState(null)
  const [delItem, setDelItem]  = useState(null)
  const [form,    setForm]     = useState({ name:'', role:'', quote:'', stars:5, published:false })

  const openAdd  = () => { setForm({ name:'', role:'', quote:'', stars:5, published:false }); setEditItem(null); setAddOpen(true) }
  const openEdit = (t) => { setForm({ name:t.name, role:t.role, quote:t.quote, stars:t.stars, published:t.published }); setEditItem(t); setAddOpen(true) }
  const save = () => {
    if (editItem) { setTestimonials(testimonials.map(t => t.id===editItem.id ? { ...editItem,...form } : t)); showToast('Testimonial updated') }
    else          { setTestimonials([{ id:Date.now(),...form },...testimonials]); showToast('Testimonial added') }
    setAddOpen(false); setEditItem(null)
  }
  const togglePub = id => { setTestimonials(testimonials.map(t => t.id===id ? { ...t, published:!t.published } : t)); showToast('Visibility updated') }
  const sf = k => e => setForm({ ...form, [k]:e.target.value })

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">{testimonials.filter(t=>t.published).length} published · {testimonials.filter(t=>!t.published).length} drafts</p>
        <button onClick={openAdd} className="flex items-center gap-2 bg-accent text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors"><Plus size={13} /> Add</button>
      </div>
      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className="flex gap-4 items-start p-5 rounded-2xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center font-bold text-sm shrink-0">{t.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-xs text-muted">— {t.role}</p>
              </div>
              <p className="text-xs text-muted line-clamp-2 mt-1">"{t.quote}"</p>
              <div className="flex gap-0.5 mt-1.5">{[...Array(t.stars)].map((_,i) => <span key={i} className="text-accent text-xs">★</span>)}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => togglePub(t.id)} className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${t.published ? 'border-green-400/30 text-green-400 bg-green-400/5' : 'border-white/10 text-muted hover:border-white/30'}`}>{t.published ? 'Live' : 'Draft'}</button>
              <button onClick={() => openEdit(t)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-colors"><Edit2 size={11}/></button>
              <button onClick={() => setDelItem(t)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 transition-colors"><Trash2 size={11}/></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setEditItem(null) }} title={editItem ? 'Edit Testimonial' : 'Add Testimonial'} subtitle="Testimonials" size="lg">
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required><input className={inputCls} value={form.name} onChange={sf('name')} placeholder="Richard M." /></Field>
            <Field label="Role" required><input className={inputCls} value={form.role} onChange={sf('role')} placeholder="CEO, FinTech Group" /></Field>
          </div>
          <Field label="Quote" required><textarea className={`${inputCls} resize-none`} rows={4} value={form.quote} onChange={sf('quote')} placeholder="Their experience in their words…" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Stars"><select className={inputCls} value={form.stars} onChange={e=>setForm({...form,stars:parseInt(e.target.value)})}>{[5,4,3].map(n=><option key={n} value={n}>{n} Stars</option>)}</select></Field>
            <Field label="Status"><select className={inputCls} value={form.published?'true':'false'} onChange={e=>setForm({...form,published:e.target.value==='true'})}><option value="false">Draft</option><option value="true">Live</option></select></Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { setAddOpen(false); setEditItem(null) }} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-muted hover:border-white/30 transition-all">Cancel</button>
            <button onClick={save} className="flex-1 py-2.5 bg-accent rounded-xl text-sm text-white font-semibold hover:bg-orange-500 transition-colors">{editItem ? 'Save Changes' : 'Add Testimonial'}</button>
          </div>
        </div>
      </Modal>
      <ConfirmModal open={!!delItem} onClose={() => setDelItem(null)}
        onConfirm={() => { setTestimonials(testimonials.filter(t=>t.id!==delItem.id)); showToast('Deleted','error') }}
        itemName={delItem?.name} />
    </div>
  )
}

/* ══════════════════════════════════════════════════
   SERVICES MANAGER — full CRUD
══════════════════════════════════════════════════ */
function ServicesManager({ services, setServices, showToast }) {
  const [addOpen, setAddOpen] = useState(false)
  const [editItem,setEditItem] = useState(null)
  const [delItem, setDelItem]  = useState(null)
  const [form,    setForm]     = useState({ title:'', tag:'Training', desc:'' })
  const openAdd  = () => { setForm({ title:'', tag:'Training', desc:'' }); setEditItem(null); setAddOpen(true) }
  const openEdit = (s) => { setForm({ title:s.title, tag:s.tag, desc:s.desc||'' }); setEditItem(s); setAddOpen(true) }
  const save = () => {
    if (editItem) { setServices(services.map(s => s.id===editItem.id ? { ...editItem,...form } : s)); showToast('Service updated') }
    else          { setServices([...services, { id:Date.now(), active:true,...form }]); showToast('Service added') }
    setAddOpen(false); setEditItem(null)
  }
  const toggle = id => { setServices(services.map(s => s.id===id ? { ...s, active:!s.active } : s)); showToast('Visibility updated') }
  const sf = k => e => setForm({ ...form, [k]:e.target.value })
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">{services.filter(s=>s.active).length} active</p>
        <button onClick={openAdd} className="flex items-center gap-2 bg-accent text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors"><Plus size={13} /> Add Service</button>
      </div>
      <div className="space-y-3">
        {services.map(s => (
          <div key={s.id} className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{s.title}</p>
              <p className="text-xs text-accent mt-0.5">{s.tag}</p>
              {s.desc && <p className="text-xs text-muted mt-1 line-clamp-1">{s.desc}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => toggle(s.id)} className={`relative w-9 h-5 rounded-full transition-colors ${s.active ? 'bg-accent' : 'bg-white/10'}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${s.active ? 'left-4' : 'left-0.5'}`} />
              </button>
              <button onClick={() => openEdit(s)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-colors"><Edit2 size={11}/></button>
              <button onClick={() => setDelItem(s)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 transition-colors"><Trash2 size={11}/></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setEditItem(null) }} title={editItem ? 'Edit Service' : 'Add Service'} subtitle="Services">
        <div className="p-6 space-y-4">
          <Field label="Service Title" required><input className={inputCls} value={form.title} onChange={sf('title')} placeholder="Customized Programming" /></Field>
          <Field label="Category">
            <select className={inputCls} value={form.tag} onChange={sf('tag')}>{['Training','Coaching','Nutrition','Mastery','Wellness','Other'].map(t=><option key={t}>{t}</option>)}</select>
          </Field>
          <Field label="Description"><textarea className={`${inputCls} resize-none`} rows={3} value={form.desc} onChange={sf('desc')} placeholder="Short description…" /></Field>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { setAddOpen(false); setEditItem(null) }} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-muted hover:border-white/30 transition-all">Cancel</button>
            <button onClick={save} className="flex-1 py-2.5 bg-accent rounded-xl text-sm text-white font-semibold hover:bg-orange-500 transition-colors">{editItem ? 'Save Changes' : 'Add Service'}</button>
          </div>
        </div>
      </Modal>
      <ConfirmModal open={!!delItem} onClose={() => setDelItem(null)} onConfirm={() => { setServices(services.filter(s=>s.id!==delItem.id)); showToast('Deleted','error') }} itemName={delItem?.title} />
    </div>
  )
}

/* ══════════════════════════════════════════════════
   FAQ MANAGER — full CRUD
══════════════════════════════════════════════════ */
function FAQManager({ faqs, setFaqs, showToast }) {
  const [addOpen, setAddOpen] = useState(false)
  const [editItem,setEditItem] = useState(null)
  const [delItem, setDelItem]  = useState(null)
  const [form,    setForm]     = useState({ q:'', a:'', category:FAQ_CATEGORIES[0], published:false })
  const openAdd  = () => { setForm({ q:'', a:'', category:FAQ_CATEGORIES[0], published:false }); setEditItem(null); setAddOpen(true) }
  const openEdit = (f) => { setForm({ q:f.q, a:f.a, category:f.category, published:f.published }); setEditItem(f); setAddOpen(true) }
  const save = () => {
    if (editItem) { setFaqs(faqs.map(f => f.id===editItem.id ? { ...editItem,...form } : f)); showToast('FAQ updated') }
    else          { setFaqs([...faqs, { id:Date.now(),...form }]); showToast('FAQ added') }
    setAddOpen(false); setEditItem(null)
  }
  const toggle = id => { setFaqs(faqs.map(f => f.id===id ? { ...f, published:!f.published } : f)); showToast('Visibility updated') }
  const sf = k => e => setForm({ ...form, [k]:e.target.value })
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">{faqs.filter(f=>f.published).length} live · {faqs.filter(f=>!f.published).length} hidden</p>
        <button onClick={openAdd} className="flex items-center gap-2 bg-accent text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-orange-500 transition-colors"><Plus size={13} /> Add FAQ</button>
      </div>
      <div className="space-y-3">
        {faqs.map(f => (
          <div key={f.id} className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-light">{f.q}</p>
              <p className="text-xs text-muted mt-0.5">{f.category}</p>
              <p className="text-xs text-muted/60 mt-1 line-clamp-1 italic">"{f.a}"</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => toggle(f.id)} className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${f.published ? 'border-green-400/30 text-green-400 bg-green-400/5' : 'border-white/10 text-muted hover:border-white/30'}`}>{f.published ? 'Live' : 'Hidden'}</button>
              <button onClick={() => openEdit(f)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-colors"><Edit2 size={11}/></button>
              <button onClick={() => setDelItem(f)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-400/10 hover:text-red-400 transition-colors"><Trash2 size={11}/></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={addOpen} onClose={() => { setAddOpen(false); setEditItem(null) }} title={editItem ? 'Edit FAQ' : 'Add FAQ'} subtitle="FAQ" size="lg">
        <div className="p-6 space-y-4">
          <Field label="Question" required><input className={inputCls} value={form.q} onChange={sf('q')} placeholder="What happens on the discovery call?" /></Field>
          <Field label="Answer" required><textarea className={`${inputCls} resize-none`} rows={4} value={form.a} onChange={sf('a')} placeholder="Full answer…" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category"><select className={inputCls} value={form.category} onChange={sf('category')}>{FAQ_CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></Field>
            <Field label="Status"><select className={inputCls} value={form.published?'true':'false'} onChange={e=>setForm({...form,published:e.target.value==='true'})}><option value="false">Hidden</option><option value="true">Live</option></select></Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { setAddOpen(false); setEditItem(null) }} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-muted hover:border-white/30 transition-all">Cancel</button>
            <button onClick={save} className="flex-1 py-2.5 bg-accent rounded-xl text-sm text-white font-semibold hover:bg-orange-500 transition-colors">{editItem ? 'Save Changes' : 'Add FAQ'}</button>
          </div>
        </div>
      </Modal>
      <ConfirmModal open={!!delItem} onClose={() => setDelItem(null)} onConfirm={() => { setFaqs(faqs.filter(f=>f.id!==delItem.id)); showToast('Deleted','error') }} itemName={delItem?.q} />
    </div>
  )
}

/* ══════════════════════════════════════════════════
   CONTENT MANAGER
══════════════════════════════════════════════════ */
function ContentManager({ showToast }) {
  const [tab, setTab] = useState('hero')
  const tabs = [{ id:'hero',label:'Hero' },{ id:'about',label:'About' },{ id:'contact',label:'Contact' },{ id:'seo',label:'SEO' }]
  const [c, setC] = useState({
    hero:    { headline:'Unlock Peak Energy & Health — Even With a Demanding Career', sub:'Personalized, science-backed coaching designed for real life.', cta1:'Book Free Consultation', cta2:'Explore Services' },
    about:   { founderName:'James Clarke', founderRole:'Founder & Head Coach', bio:'At 38, I was running a high-growth technology company, flying 200+ days a year, and quietly falling apart…', mission:'To prove that elite performance and elite health are not in conflict.' },
    contact: { email:'hello@primeform.com', phone:'+44 20 7123 4567', whatsapp:'+442071234567', calendly:'https://calendly.com/primeform' },
    seo:     { title:'PRIME FORM — Executive Health Coaching', desc:'Science-backed health coaching for busy professionals.', keywords:'executive health, coaching, wellness' },
  })
  const set = (s,k) => e => setC(p => ({ ...p, [s]:{ ...p[s], [k]:e.target.value } }))
  return (
    <div className="p-5 space-y-4">
      <div className="flex gap-2 border-b border-white/5">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${tab===t.id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-light'}`}>{t.label}</button>
        ))}
      </div>
      <div className="space-y-4 max-w-2xl">
        {tab==='hero' && <>
          <Field label="Headline"><textarea className={`${inputCls} resize-none`} rows={2} value={c.hero.headline} onChange={set('hero','headline')} /></Field>
          <Field label="Sub-headline"><input className={inputCls} value={c.hero.sub} onChange={set('hero','sub')} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary CTA"><input className={inputCls} value={c.hero.cta1} onChange={set('hero','cta1')} /></Field>
            <Field label="Secondary CTA"><input className={inputCls} value={c.hero.cta2} onChange={set('hero','cta2')} /></Field>
          </div>
        </>}
        {tab==='about' && <>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Founder Name"><input className={inputCls} value={c.about.founderName} onChange={set('about','founderName')} /></Field>
            <Field label="Founder Role"><input className={inputCls} value={c.about.founderRole} onChange={set('about','founderRole')} /></Field>
          </div>
          <Field label="Founder Bio"><textarea className={`${inputCls} resize-none`} rows={5} value={c.about.bio} onChange={set('about','bio')} /></Field>
          <Field label="Mission Statement"><textarea className={`${inputCls} resize-none`} rows={2} value={c.about.mission} onChange={set('about','mission')} /></Field>
        </>}
        {tab==='contact' && <>
          <Field label="Email"><input className={inputCls} value={c.contact.email} onChange={set('contact','email')} /></Field>
          <Field label="Phone"><input className={inputCls} value={c.contact.phone} onChange={set('contact','phone')} /></Field>
          <Field label="WhatsApp Number"><input className={inputCls} value={c.contact.whatsapp} onChange={set('contact','whatsapp')} /></Field>
          <Field label="Calendly URL" hint="Your Calendly scheduling link"><input className={inputCls} value={c.contact.calendly} onChange={set('contact','calendly')} /></Field>
        </>}
        {tab==='seo' && <>
          <Field label="Page Title"><input className={inputCls} value={c.seo.title} onChange={set('seo','title')} /></Field>
          <Field label="Meta Description" hint="160 chars max"><textarea className={`${inputCls} resize-none`} rows={3} value={c.seo.desc} onChange={set('seo','desc')} /></Field>
          <Field label="Keywords"><input className={inputCls} value={c.seo.keywords} onChange={set('seo','keywords')} /></Field>
        </>}
        <button onClick={() => showToast('Content saved')} className="bg-accent text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-orange-500 transition-colors">Save Content</button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   ANALYTICS
══════════════════════════════════════════════════ */
function AnalyticsPage() {
  const channels = [['Organic Search',42,'bg-accent'],['Direct',28,'bg-blue-400'],['Referral',18,'bg-green-400'],['Social',8,'bg-purple-400'],['Email',4,'bg-yellow-400']]
  const pages = [['/',  '4,218','38%'],  ['/services','2,104','42%'],  ['/about','1,893','29%'],  ['/contact','1,541','22%'],  ['/faq','764','44%']]
  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[['Monthly Visitors','12,847','+18%'],['Avg. Session','4m 32s','+23%'],['Bounce Rate','34%','-5%'],['Conversion','3.8%','+0.4%']].map(([l,v,d]) => (
          <div key={l} className="p-5 rounded-2xl border border-white/5 bg-white/2">
            <p className="text-xs text-muted mb-2">{l}</p>
            <p className="font-display text-3xl">{v}</p>
            <span className="text-[11px] font-semibold text-green-400 flex items-center gap-0.5 mt-1"><ArrowUpRight size={11}/>{d}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
          <p className="font-semibold text-sm mb-5">Traffic Sources</p>
          {channels.map(([label,pct,color]) => (
            <div key={label} className="flex items-center gap-3 mb-3">
              <p className="text-xs text-muted w-28 shrink-0">{label}</p>
              <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                <motion.div initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:1, delay:0.2 }} className={`${color}/70 h-full rounded-full`} />
              </div>
              <p className="text-xs font-medium text-light w-8 text-right">{pct}%</p>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
          <p className="font-semibold text-sm mb-4">Top Pages</p>
          {pages.map(([page,views,bounce]) => (
            <div key={page} className="flex items-center gap-3 py-2 border-b border-white/3 last:border-0">
              <p className="text-xs font-mono text-accent flex-1 truncate">{page}</p>
              <p className="text-xs font-medium text-light">{views}</p>
              <p className="text-xs text-muted w-10 text-right">{bounce}</p>
            </div>
          ))}
          <div className="flex justify-between mt-2 text-[10px] text-muted"><span>Page</span><span>Views</span><span>Bounce</span></div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   PROFILE PAGE
══════════════════════════════════════════════════ */
function ProfilePage({ user, showToast }) {
  const [f, setF] = useState({ name:user?.name||'', email:user?.email||'', phone:'', bio:'' })
  const sf = k => e => setF({ ...f, [k]:e.target.value })
  return (
    <div className="p-5 max-w-2xl space-y-5">
      {/* Avatar card */}
      <div className="flex items-center gap-5 p-5 rounded-2xl border border-white/5 bg-white/2">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-2xl font-bold text-accent">{user?.name?.[0]||'A'}</div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg"><Plus size={12} className="text-white" /></button>
        </div>
        <div>
          <p className="font-semibold text-light">{user?.name}</p>
          <p className="text-sm text-muted">{user?.email}</p>
          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{user?.role}</span>
        </div>
      </div>
      {/* Profile form */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
        <p className="font-semibold text-sm border-b border-white/5 pb-3">Personal Information</p>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name"><input className={inputCls} value={f.name} onChange={sf('name')} /></Field>
          <Field label="Email"><input className={inputCls} type="email" value={f.email} onChange={sf('email')} /></Field>
          <Field label="Phone"><input className={inputCls} value={f.phone} onChange={sf('phone')} placeholder="+44 7700 000000" /></Field>
          <Field label="Role"><input className={`${inputCls} opacity-50 cursor-not-allowed`} value={f.role||user?.role} disabled /></Field>
        </div>
        <Field label="Bio"><textarea className={`${inputCls} resize-none`} rows={3} value={f.bio} onChange={sf('bio')} placeholder="Brief bio…" /></Field>
        <button onClick={() => showToast('Profile updated')} className="bg-accent text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-orange-500 transition-colors">Save Profile</button>
      </div>
      {/* Password */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
        <p className="font-semibold text-sm border-b border-white/5 pb-3">Change Password</p>
        <Field label="Current Password"><input className={inputCls} type="password" placeholder="••••••••" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="New Password"><input className={inputCls} type="password" placeholder="••••••••" /></Field>
          <Field label="Confirm New"><input className={inputCls} type="password" placeholder="••••••••" /></Field>
        </div>
        <button onClick={() => showToast('Password updated')} className="bg-white/5 border border-white/10 text-light text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors">Update Password</button>
      </div>
      {/* Sessions */}
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2">
        <p className="font-semibold text-sm mb-4 border-b border-white/5 pb-3">Active Sessions</p>
        {[{ d:'MacBook Pro — Chrome', l:'London, UK', t:'Current session', cur:true },{ d:'iPhone 15 — Safari', l:'London, UK', t:'2 hours ago', cur:false }].map((s,i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-white/3 last:border-0">
            <div><p className="text-xs font-medium text-light">{s.d}</p><p className="text-[10px] text-muted">{s.l} · {s.t}</p></div>
            {s.cur ? <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Active</span> : <button className="text-[10px] text-red-400 hover:text-red-300 transition-colors">Revoke</button>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════ */
function AdminSettings({ showToast }) {
  const [n, setN] = useState({ newLeads:true, bookings:true, subs:false, weekly:true })
  const toggle = k => setN(p => ({ ...p, [k]:!p[k] }))
  return (
    <div className="p-5 max-w-2xl space-y-5">
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
        <p className="font-semibold text-sm border-b border-white/5 pb-3">Integrations</p>
        <Field label="Calendly URL"><input className={inputCls} defaultValue="https://calendly.com/primeform" /></Field>
        <Field label="WhatsApp Number"><input className={inputCls} defaultValue="+44 20 7123 4567" /></Field>
        <Field label="Contact Form Email"><input className={inputCls} type="email" defaultValue="hello@primeform.com" /></Field>
        <Field label="Google Analytics ID" hint="G-XXXXXXXXXX"><input className={inputCls} placeholder="G-XXXXXXXXXX" /></Field>
        <button onClick={() => showToast('Integrations saved')} className="bg-accent text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-orange-500 transition-colors">Save Integrations</button>
      </div>
      <div className="p-5 rounded-2xl border border-white/5 bg-white/2 space-y-4">
        <p className="font-semibold text-sm border-b border-white/5 pb-3">Notification Preferences</p>
        {[{ k:'newLeads', label:'New lead submissions', desc:'Email when a lead submits a form' },{ k:'bookings', label:'Booking confirmations', desc:'Email when a booking is confirmed' },{ k:'subs', label:'New subscribers', desc:'Email when someone subscribes' },{ k:'weekly', label:'Weekly summary report', desc:'Dashboard summary every Monday' }].map(({ k, label, desc }) => (
          <div key={k} className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-light">{label}</p><p className="text-xs text-muted">{desc}</p></div>
            <button onClick={() => toggle(k)} className={`relative w-9 h-5 rounded-full transition-colors ${n[k] ? 'bg-accent' : 'bg-white/10'}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${n[k] ? 'left-4' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
        <button onClick={() => showToast('Preferences saved')} className="bg-white/5 border border-white/10 text-light text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors">Save Preferences</button>
      </div>
      <div className="p-5 rounded-2xl border border-red-400/15 bg-red-400/3 space-y-3">
        <p className="font-semibold text-sm text-red-400">Danger Zone</p>
        <p className="text-xs text-muted">These actions are irreversible.</p>
        <div className="flex gap-3">
          <button className="text-xs px-4 py-2 border border-red-400/30 text-red-400 rounded-xl hover:bg-red-400/5 transition-colors">Clear All Leads</button>
          <button className="text-xs px-4 py-2 border border-red-400/30 text-red-400 rounded-xl hover:bg-red-400/5 transition-colors">Reset to Defaults</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════
   PAGE TITLE MAP
══════════════════════════════════════════════════ */
const PAGE_TITLES = {
  'admin':'Dashboard','admin-leads':'Leads','admin-bookings':'Bookings',
  'admin-subscribers':'Subscribers','admin-testimonials':'Testimonials',
  'admin-services':'Services','admin-faq':'FAQ Manager',
  'admin-content':'Content Manager','admin-analytics':'Analytics',
  'admin-profile':'My Profile','admin-settings':'Settings',
}

/* ══════════════════════════════════════════════════
   ADMIN PANEL ROOT
══════════════════════════════════════════════════ */
export default function AdminPanel({ currentPage, navigate, user, onLogout }) {
  const [collapsed,  setCollapsed]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen,  setNotifOpen]  = useState(false)
  const { toasts, showToast }       = useToast()

  /* Shared state across all admin pages */
  const [leads,        setLeads]        = useState(INITIAL_LEADS)
  const [subscribers,  setSubscribers]  = useState(INITIAL_SUBS)
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS)
  const [services,     setServices]     = useState(INITIAL_SERVICES)
  const [faqs,         setFaqs]         = useState(INITIAL_FAQS)

  const newLeads = leads.filter(l => l.status === 'New').length

  const handleNav = useCallback((page) => {
    setNotifOpen(false); setMobileOpen(false); navigate(page)
  }, [navigate])

  return (
    <div className="min-h-screen bg-[#111111] text-light font-body flex">

      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar current={currentPage} navigate={handleNav} collapsed={collapsed} setCollapsed={setCollapsed} user={user} onLogout={onLogout} newLeads={newLeads} />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="ov" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-black/70 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div key="dr" initial={{ x:-218 }} animate={{ x:0 }} exit={{ x:-218 }} transition={{ type:'spring', damping:28, stiffness:260 }} className="fixed left-0 top-0 bottom-0 z-50 md:hidden flex">
              <Sidebar current={currentPage} navigate={handleNav} collapsed={false} setCollapsed={() => {}} user={user} onLogout={onLogout} newLeads={newLeads} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 border-b border-white/5 bg-[#0c0c0c]/80 h-14 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="text-muted hover:text-light transition-colors"><Menu size={18} /></button>
          <span className="font-semibold text-sm flex-1">{PAGE_TITLES[currentPage]}</span>
          <button onClick={() => navigate('home')} className="text-xs text-muted">← Site</button>
        </div>
        {/* Desktop top bar */}
        <div className="hidden md:block">
          <TopBar title={PAGE_TITLES[currentPage]} navigate={handleNav} user={user} notifOpen={notifOpen} setNotifOpen={setNotifOpen} newLeads={newLeads} />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto admin-scroll">
          {currentPage==='admin'              && <Dashboard navigate={handleNav} leads={leads} subscribers={subscribers} />}
          {currentPage==='admin-leads'        && <LeadsTable leads={leads} setLeads={setLeads} showToast={showToast} />}
          {currentPage==='admin-bookings'     && <BookingsPage showToast={showToast} />}
          {currentPage==='admin-subscribers'  && <SubscribersTable subscribers={subscribers} setSubscribers={setSubscribers} showToast={showToast} />}
          {currentPage==='admin-testimonials' && <TestimonialsManager testimonials={testimonials} setTestimonials={setTestimonials} showToast={showToast} />}
          {currentPage==='admin-services'     && <ServicesManager services={services} setServices={setServices} showToast={showToast} />}
          {currentPage==='admin-faq'          && <FAQManager faqs={faqs} setFaqs={setFaqs} showToast={showToast} />}
          {currentPage==='admin-content'      && <ContentManager showToast={showToast} />}
          {currentPage==='admin-analytics'    && <AnalyticsPage />}
          {currentPage==='admin-profile'      && <ProfilePage user={user} showToast={showToast} />}
          {currentPage==='admin-settings'     && <AdminSettings showToast={showToast} />}
        </main>
      </div>

      {/* Global toasts */}
      <Toast toasts={toasts} />
    </div>
  )
}
