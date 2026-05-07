import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Zap, Shield, TrendingUp, Users,
  ChevronRight, Star, ArrowRight, CheckCircle2
} from 'lucide-react'
import { Button, SectionHeader, AnimatedSection, StatCard, Divider } from '../components/UI'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const BENEFITS = [
  {
    Icon: Zap,
    title: 'Engineered Energy',
    desc: 'Reclaim the mental clarity and physical energy that fueled your early career — without sacrificing your schedule.',
  },
  {
    Icon: Shield,
    title: 'Health Longevity',
    desc: 'Build a body that performs as hard as you do for decades, not just the next quarter.',
  },
  {
    Icon: TrendingUp,
    title: 'Performance ROI',
    desc: 'Every protocol is measurable. Expect trackable results across sleep, body composition, and cognitive function.',
  },
  {
    Icon: Users,
    title: 'Executive Accountability',
    desc: 'A coaching structure that respects your intelligence and holds you to the standards you set for your team.',
  },
]

const STEPS = [
  { num: '01', title: 'Discovery Call',   desc: 'A focused 45-minute session to map your goals, lifestyle, and current health baseline.' },
  { num: '02', title: 'Full Assessment',  desc: 'Lab work, movement screening, sleep analysis, and nutrition audit — your complete picture.' },
  { num: '03', title: 'Custom Blueprint', desc: 'A 90-day roadmap built around your calendar, biology, and performance objectives.' },
  { num: '04', title: 'Ongoing Coaching', desc: 'Weekly check-ins, real-time adjustments, and elite accountability to keep you on track.' },
]

const SERVICES_PREVIEW = [
  { title: 'Customized Programming', tag: 'Training', desc: 'Evidence-based workout plans that fit boardroom schedules and travel lifestyles.' },
  { title: 'Nutrition & Kitchen Audit', tag: 'Nutrition', desc: 'Practical, science-backed eating strategies — no fad diets, no calorie obsession.' },
  { title: 'Accountability & Support', tag: 'Coaching', desc: 'Daily messaging, weekly reviews, and strategic pivots when life shifts.' },
  { title: 'Technical Coaching', tag: 'Mastery', desc: 'Movement quality, injury prevention, and biomechanics for high-performing bodies.' },
]

const TESTIMONIALS = [
  {
    name: 'Richard M.',
    role: 'CEO, FinTech Group',
    quote: 'I lost 18kg without a single crash diet. My energy at 52 is sharper than it was at 35. Prime Form changed how I lead.',
    stars: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Partner, Law Firm',
    quote: 'I had tried everything. Prime Form was the first approach that worked with my insane schedule, not against it.',
    stars: 5,
  },
  {
    name: 'David L.',
    role: 'Managing Director',
    quote: 'The ROI on investing in my health has been the best business decision I\'ve made in the last decade.',
    stars: 5,
  },
]

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function HeroSection({ navigate }) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div className="video-overlay absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-44">

        {/* Eyebrow lead-in */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-10 h-px bg-accent/60" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-accent uppercase">
            Executive Health Coaching
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl
                     leading-[0.93] tracking-tight max-w-3xl md:max-w-[50rem] mb-5 md:mb-6"
        >
          UNLOCK PEAK ENERGY & HEALTH —
          <span className="text-accent text-glow"> EVEN WITH A DEMANDING CAREER</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base sm:text-lg md:text-xl text-light/85 max-w-xl mb-8 md:mb-10 leading-relaxed"
        >
          Personalized, science-backed coaching designed for real life. Built for professionals who can't afford to fail — in health or business.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Button size="lg" onClick={() => navigate('contact')}>
            Book Free Consultation
            <ChevronRight size={16} className="ml-2" />
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('services')}>
            Explore Services
          </Button>
        </motion.div>

        {/* Trust micro-signal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 md:mt-12 flex flex-wrap items-center gap-4 md:gap-6"
        >
          <div className="flex -space-x-2">
            {['bg-secondary', 'bg-accent/60', 'bg-white/20', 'bg-secondary/60'].map((c, i) => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-surface ${c}`} />
            ))}
          </div>
          <p className="text-sm text-light/70">
            <span className="text-light font-semibold">200+</span> executives transformed
          </p>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#ff6b35" color="#ff6b35" />
            ))}
          </div>
          <p className="text-xs text-light/70 px-3 py-1 rounded-full border border-white/20 bg-black/20">
            Avg. retention: <span className="text-light font-semibold">94%</span>
          </p>
        </motion.div>
      </div>

    </section>
  )
}

/* ─────────────────────────────────────────────
   BENEFITS SECTION
───────────────────────────────────────────── */
function BenefitsSection() {
  return (
    <section className="py-24 md:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6">

        <AnimatedSection>
          <SectionHeader
            eyebrow="Why Prime Form"
            heading="BUILT FOR EXECUTIVES. PROVEN BY SCIENCE."
            sub="Most health programs are designed for people with unlimited time. We design for the ones who don't have any."
            className="mb-16 max-w-2xl"
          />
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6">
          {/* Card 1: Large (2x1) */}
          <AnimatedSection className="md:col-span-2 md:row-span-1" delay={0.1}>
            <div className="group h-full p-8 rounded-3xl glass-dark hover:border-accent/30 transition-all duration-500 overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={24} className="text-accent" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-4 text-glow">{BENEFITS[0].title}</h3>
                <p className="text-muted leading-relaxed max-w-md">{BENEFITS[0].desc}</p>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={200} className="text-accent" />
              </div>
            </div>
          </AnimatedSection>

          {/* Card 2: Square */}
          <AnimatedSection delay={0.2}>
            <div className="group h-full p-8 rounded-3xl glass-dark hover:border-accent/30 transition-all duration-500">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-3xl mb-4">{BENEFITS[1].title}</h3>
              <p className="text-sm text-muted leading-relaxed">{BENEFITS[1].desc}</p>
            </div>
          </AnimatedSection>

          {/* Card 3: Square */}
          <AnimatedSection delay={0.3}>
            <div className="group h-full p-8 rounded-3xl glass-dark hover:border-accent/30 transition-all duration-500">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-3xl mb-4">{BENEFITS[2].title}</h3>
              <p className="text-sm text-muted leading-relaxed">{BENEFITS[2].desc}</p>
            </div>
          </AnimatedSection>

          {/* Card 4: Horizontal (2x1) */}
          <AnimatedSection className="md:col-span-2 md:row-span-1" delay={0.4}>
            <div className="group h-full p-8 rounded-3xl glass-dark hover:border-accent/30 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
              <div className="relative z-10 flex-1">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users size={24} className="text-accent" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-4">{BENEFITS[3].title}</h3>
                <p className="text-muted leading-relaxed">{BENEFITS[3].desc}</p>
              </div>
              <div className="relative z-10 hidden md:block">
                <div className="w-32 h-32 rounded-full border border-accent/20 flex items-center justify-center animate-pulse">
                  <div className="w-24 h-24 rounded-full border border-accent/40 flex items-center justify-center">
                    <Users size={40} className="text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   HOW IT WORKS PREVIEW
───────────────────────────────────────────── */
function HowItWorksPreview({ navigate }) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Header */}
          <AnimatedSection>
            <SectionHeader
              eyebrow="The Process"
              heading="A SYSTEMATIC PATH TO PEAK PERFORMANCE"
              sub="No guesswork. No cookie-cutter plans. A clear, structured process built around your biology and your calendar."
              className="sticky top-28"
            />
            <button
              onClick={() => navigate('how-it-works')}
              className="mt-8 flex items-center gap-2 text-accent text-sm font-semibold
                         hover:gap-3 transition-all duration-200"
            >
              See full process <ArrowRight size={16} />
            </button>
          </AnimatedSection>

          {/* Right: Steps */}
          <div className="flex flex-col gap-6">
            {STEPS.map(({ num, title, desc }, i) => (
              <AnimatedSection key={num} delay={i * 0.1}>
                <div className="flex gap-6 p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-all">
                  <span className="font-display text-5xl text-white/10 leading-none shrink-0">{num}</span>
                  <div>
                    <h3 className="font-semibold text-light mb-2">{title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SERVICES PREVIEW
───────────────────────────────────────────── */
function ServicesPreview({ navigate }) {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <SectionHeader
            eyebrow="Services"
            heading="EVERY ASPECT OF YOUR HEALTH. COVERED."
          />
          <Button variant="outline" onClick={() => navigate('services')}>
            View All Services
          </Button>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES_PREVIEW.map(({ title, tag, desc }, i) => (
            <AnimatedSection key={title} delay={i * 0.08}>
              <div className="group relative p-8 rounded-2xl border border-white/5 bg-primary/40
                              overflow-hidden hover:border-accent/20 transition-all duration-300 cursor-pointer"
                   onClick={() => navigate('services')}
              >
                {/* Background number */}
                <span className="absolute top-4 right-6 font-display text-7xl text-white/3 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Tag */}
                <span className="text-xs font-semibold text-accent tracking-widest uppercase">
                  {tag}
                </span>

                <h3 className="font-display text-3xl mt-2 mb-3 group-hover:text-accent transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-2 text-accent/60 text-xs font-semibold
                                group-hover:gap-3 transition-all duration-200">
                  Learn more <ArrowRight size={14} />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   STATS SECTION
───────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { stat: '200+', label: 'Executives Coached' },
    { stat: '94%',  label: 'Client Retention Rate' },
    { stat: '12kg', label: 'Average Weight Lost' },
    { stat: '8yrs', label: 'Average Client Relationship' },
  ]

  return (
    <section className="py-20 md:py-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   TESTIMONIALS PREVIEW
───────────────────────────────────────────── */
function TestimonialsPreview({ navigate }) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <SectionHeader
            eyebrow="Results"
            heading="WHAT HAPPENS WHEN EXECUTIVES COMMIT"
          />
          <Button variant="outline" onClick={() => navigate('testimonials')}>
            All Testimonials
          </Button>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, quote, stars }, i) => (
            <AnimatedSection key={name} delay={i * 0.1}>
              <div className="p-7 rounded-2xl border border-white/8 bg-surface/50 flex flex-col gap-5 h-full">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(stars)].map((_, j) => (
                    <Star key={j} size={13} fill="#ff6b35" color="#ff6b35" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-light/80 text-sm leading-relaxed flex-1">
                  "{quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-secondary/40 flex items-center justify-center
                                  text-xs font-bold text-light">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-light">{name}</p>
                    <p className="text-xs text-muted">{role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   EMAIL CTA SECTION
───────────────────────────────────────────── */
function EmailCTA() {
  const [email,   setEmail]   = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSuccess(true)
  }

  return (
    <section className="py-24 bg-secondary/10 border-y border-white/5">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-3">Free Resources</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            GET THE EXECUTIVE HEALTH BLUEPRINT
          </h2>
          <p className="text-muted mb-8 leading-relaxed">
            A free 5-day email series on energy management, sleep optimization, and body recomposition — built for busy professionals.
          </p>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-accent font-semibold"
            >
              <CheckCircle2 size={20} /> You're in! Check your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3
                           text-sm text-light placeholder:text-muted outline-none
                           focus:border-accent/50 transition-colors"
              />
              <Button type="submit">Get Blueprint</Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted">No spam. Unsubscribe anytime.</p>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────── */
function FinalCTA({ navigate }) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">Ready to Start?</p>
          <h2 className="font-display text-5xl md:text-7xl leading-tight mb-6">
            YOUR BEST DECADE<br />STARTS NOW.
          </h2>
          <p className="text-lg text-muted mb-10 max-w-lg mx-auto">
            The free consultation is 45 minutes. It will be the most valuable health conversation you've had in years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('contact')}>
              Book Free Consultation
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('about')}>
              Learn Our Approach
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   HOME PAGE — assembles all sections
───────────────────────────────────────────── */
export default function HomePage({ navigate }) {
  return (
    <>
      <HeroSection         navigate={navigate} />
      <BenefitsSection />
      <Divider />
      <HowItWorksPreview   navigate={navigate} />
      <ServicesPreview     navigate={navigate} />
      <StatsSection />
      <TestimonialsPreview navigate={navigate} />
      <EmailCTA />
      <FinalCTA            navigate={navigate} />
    </>
  )
}
