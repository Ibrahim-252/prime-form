import React, { useState } from 'react'
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
  { Icon: Phone,   label: 'Phone',     value: '+44 20 7123 4567',        href: 'tel:+442071234567'          },
  { Icon: Clock,   label: 'Response',  value: 'Within 24 hours',         href: null                         },
  { Icon: MapPin,  label: 'Based in',  value: 'London, UK (Global)',     href: null                         },
]

/* Calendly placeholder embed */
function CalendlyPlaceholder() {
  return (
    <div className="rounded-2xl border border-white/8 bg-surface/50 overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest">Book Your Call</p>
        <h3 className="font-display text-3xl mt-1">Schedule a Discovery Call</h3>
      </div>
      {/* Calendly embed placeholder */}
      <div className="h-[480px] flex flex-col items-center justify-center gap-5 bg-white/1">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
          <Clock size={28} className="text-accent" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-light mb-2">Calendly Integration</p>
          <p className="text-sm text-muted max-w-xs">
            Your booking calendar will appear here. Replace this placeholder with your Calendly embed code.
          </p>
        </div>
        {/* Placeholder CTA mimics Calendly */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs px-4">
          {['Mon', 'Tue', 'Wed', 'Thu'].map((day) => (
            <div key={day} className="p-3 rounded-xl border border-white/8 text-center cursor-pointer hover:border-accent/30 transition-colors">
              <p className="text-xs text-muted">{day}</p>
              <p className="text-sm font-semibold mt-1">9:00 AM</p>
            </div>
          ))}
        </div>
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent text-white text-sm font-semibold px-6 py-2.5 rounded-full
                     hover:bg-orange-500 transition-colors"
        >
          Connect Calendly
        </a>
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
    w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3
    text-sm text-light placeholder:text-muted outline-none
    focus:border-accent/50 focus:bg-white/5 transition-all duration-200
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
        <input className={fieldClass} placeholder="+44 7700 000000" value={form.phone} onChange={update('phone')} />
      </div>

      <div>
        <label className="text-xs text-muted mb-1.5 block">Primary Goal *</label>
        <select required className={fieldClass} value={form.goal} onChange={update('goal')}>
          <option value="" disabled>Select your main goal</option>
          {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
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
                <CalendlyPlaceholder />
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
                  href="https://wa.me/442071234567"
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
