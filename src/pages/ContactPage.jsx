import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, CheckCircle2, Clock } from 'lucide-react'
import { SectionHeader, AnimatedSection, Button, Badge } from '../components/UI'

const GOALS = [
  'Weight Loss & Body Composition',
  'Energy & Performance Optimisation',
  'Sleep & Recovery',
  'Return from Injury',
  'Stress & Burnout Recovery',
  'General Health & Longevity',
  'Other',
]

/* Contact info tiles */
const CONTACT_INFO = [
  { Icon: Mail,    label: 'Email',     value: 'hello@primeform.com',     href: 'mailto:hello@primeform.com' },
  { Icon: Phone,   label: 'Phone',     value: '+971 52 593 4143',        href: 'tel:+971525934143'          },
  { Icon: Clock,   label: 'Response',  value: 'Within 24 hours',         href: null                         },
  { Icon: MapPin,  label: 'Based in',  value: 'Dubai, UAE (Global)',     href: null                         },
]


function CalendlyEmbed() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const initWidget = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/ibo-haji44/new-meeting?hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1',
          parentElement: containerRef.current,
        })
      } else {
        setTimeout(initWidget, 100)
      }
    }
    initWidget()
  }, [])

  return (
    <div className="rounded-2xl border border-white/8 bg-surface/50 overflow-hidden">
      <div className="p-6 pb-4">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest">Book Your Call</p>
        <h3 className="font-display text-3xl mt-1">Schedule a Discovery Call</h3>
        <p className="text-sm text-muted mt-2">Pick a time that works for you — confirmation sent instantly.</p>
      </div>
      <div className="px-3 pb-3">
        <div className="rounded-xl overflow-hidden ring-1 ring-accent/15">
          <div
            ref={containerRef}
            className="h-[640px] bg-white"
            style={{ minWidth: '300px' }}
          />
        </div>
      </div>
    </div>
  )
}
/* Contact form */
function ContactForm() {
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', goal: '', message: '' })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSuccess(true)
  }

 const fieldClass = `
    w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
    text-sm text-light placeholder:text-muted outline-none
    focus:border-accent/50 focus:bg-black/60 transition-all duration-200
  `

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
          <CheckCircle2 size={28} className="text-accent" />
        </div>
        <h3 className="font-display text-4xl">Message Received</h3>
        <p className="text-muted text-sm max-w-xs">
          We'll respond within 24 hours. Check your inbox for a confirmation.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-muted mb-1.5 block">Full Name *</label>
          <input required className={fieldClass} placeholder="James Clarke" value={form.name} onChange={update('name')} />
        </div>
        <div>
          <label className="text-xs text-muted mb-1.5 block">Email Address *</label>
          <input required type="email" className={fieldClass} placeholder="you@company.com" value={form.email} onChange={update('email')} />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted mb-1.5 block">Phone Number</label>
        <input className={fieldClass} placeholder="+971 52 593 4143" value={form.phone} onChange={update('phone')} />
      </div>

      <div>
        <label className="text-xs text-muted mb-1.5 block">Primary Goal *</label>
       <DarkSelect
          required
          value={form.goal}
          onChange={(val) => setForm({ ...form, goal: val })}
          options={GOALS}
          placeholder="Select your main goal"
        />
      </div>

      <div>
        <label className="text-xs text-muted mb-1.5 block">Message</label>
        <textarea
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Tell us a little about your situation, how long you've been struggling, what you've tried before..."
          value={form.message}
          onChange={update('message')}
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        {loading ? 'Sending…' : 'Send Message'}
      </Button>

      <p className="text-xs text-muted text-center">
        By submitting, you agree to our{' '}
        <span className="text-accent cursor-pointer">Privacy Policy</span>.
      </p>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Badge>Get In Touch</Badge>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none">
              START THE<br />
              <span className="text-accent">CONVERSATION.</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-lg leading-relaxed">
              The first step is always the hardest. Book a call, send a message, or reach out on WhatsApp — we'll take it from there.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: Calendly + contact info */}
            <div className="space-y-8">
              <AnimatedSection>
                <CalendlyEmbed />
              </AnimatedSection>

              {/* Contact info */}
              <AnimatedSection delay={0.1}>
                <div className="grid grid-cols-2 gap-4">
                  {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                    <div key={label} className="p-4 rounded-xl border border-white/5 bg-surface/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-accent" />
                        <p className="text-xs text-muted uppercase tracking-wide">{label}</p>
                      </div>
                      {href ? (
                        <a href={href} className="text-sm text-light hover:text-accent transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm text-light">{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* WhatsApp button */}
              <AnimatedSection delay={0.2}>
                <a
                  href="https://wa.me/971525934143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-5 rounded-2xl border border-green-500/20
                             bg-green-500/5 hover:bg-green-500/10 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-green-500/15 rounded-full flex items-center justify-center">
                    <MessageCircle size={18} className="text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-light text-sm group-hover:text-green-400 transition-colors">
                      Message on WhatsApp
                    </p>
                    <p className="text-xs text-muted">Fastest way to reach us</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                </a>
              </AnimatedSection>
            </div>

            {/* Right: Contact form */}
            <AnimatedSection delay={0.15}>
              <div className="p-8 rounded-2xl border border-white/8 bg-surface/50">
                <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Or Send a Message</p>
                <h2 className="font-display text-3xl mb-6">We'll Respond Within 24hrs</h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}

function DarkSelect({ value, onChange, options, placeholder, required }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3
          text-sm text-left outline-none flex items-center justify-between
          focus:border-accent/50 focus:bg-black/60 transition-all duration-200
          ${value ? 'text-light' : 'text-muted'}
        `}
      >
        <span>{value || placeholder}</span>
        <span className={`text-accent transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute z-20 w-full mt-2 rounded-xl border border-white/10 bg-surface shadow-2xl shadow-black/40 overflow-hidden max-h-64 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className="w-full px-4 py-3 text-sm text-light text-left hover:bg-accent/10 hover:text-accent transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {required && <input type="hidden" value={value || ''} required />}
    </div>
  )
}