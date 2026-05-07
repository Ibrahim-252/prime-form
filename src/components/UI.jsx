import React from 'react'
import { motion } from 'framer-motion'

/* ══════════════════════════════════════════════
   Button — primary and secondary variants
══════════════════════════════════════════════ */
export function Button({ children, variant = 'primary', onClick, className = '', size = 'md' }) {
  const base = `
    inline-flex items-center justify-center font-semibold rounded-full
    transition-all duration-200 cursor-pointer select-none
    active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
  `
  const sizes = {
    sm:  'text-sm px-5 py-2',
    md:  'text-sm px-7 py-3',
    lg:  'text-base px-9 py-4',
  }
  const variants = {
    primary:   'bg-accent text-white hover:bg-orange-500 hover:scale-[1.02] shadow-lg shadow-accent/20',
    secondary: 'border border-white/30 text-light hover:border-white/70 hover:bg-white/5',
    outline:   'border border-accent text-accent hover:bg-accent hover:text-white',
    ghost:     'text-light/70 hover:text-light',
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

/* ══════════════════════════════════════════════
   SectionHeader — eyebrow + heading + subtext
══════════════════════════════════════════════ */
export function SectionHeader({ eyebrow, heading, sub, light = false, className = '' }) {
  return (
    <div className={`${className}`}>
      {eyebrow && (
        <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${light ? 'text-accent' : 'text-accent'}`}>
          {eyebrow}
        </p>
      )}
      <div className="w-10 h-px bg-accent mb-4" />
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 ${light ? 'text-light' : 'text-light'}`}>
        {heading}
      </h2>
      {sub && (
        <p className={`text-base md:text-lg leading-relaxed max-w-xl ${light ? 'text-light/60' : 'text-muted'}`}>
          {sub}
        </p>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════
   AnimatedSection — fade-in-up on scroll via
   Framer Motion viewport trigger
══════════════════════════════════════════════ */
export function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ══════════════════════════════════════════════
   Badge — small label chip
══════════════════════════════════════════════ */
export function Badge({ children }) {
  return (
    <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full border border-accent/20">
      {children}
    </span>
  )
}

/* ══════════════════════════════════════════════
   Divider — decorative horizontal rule
══════════════════════════════════════════════ */
export function Divider() {
  return (
    <div className="w-full flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-white/5" />
      <div className="w-1.5 h-1.5 bg-accent rotate-45" />
      <div className="flex-1 h-px bg-white/5" />
    </div>
  )
}

/* ══════════════════════════════════════════════
   StatCard — big number + label
══════════════════════════════════════════════ */
export function StatCard({ stat, label }) {
  return (
    <AnimatedSection className="text-center">
      <p className="font-display text-5xl md:text-6xl text-accent">{stat}</p>
      <p className="text-sm text-muted mt-2 tracking-wide">{label}</p>
    </AnimatedSection>
  )
}
