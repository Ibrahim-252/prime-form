import React from 'react'
import { Star, Quote } from 'lucide-react'
import { SectionHeader, AnimatedSection, Button, Badge, StatCard } from '../components/UI'

const TESTIMONIALS = [
  {
    name: 'Richard M.',    role: 'CEO, FinTech Group',        initials: 'RM',
    before: '96kg, exhausted by 2pm, chronic back pain.',
    after:  '78kg, trains 4x/week, off blood pressure meds.',
    quote:  'I lost 18kg without a single crash diet. My energy at 52 is sharper than it was at 35. Prime Form fundamentally changed how I operate as a leader.',
    metric: '18kg lost in 5 months',
    stars: 5,
  },
  {
    name: 'Sarah K.',      role: 'Partner, Law Firm',         initials: 'SK',
    before: 'Stress eating, no sleep routine, joint pain.',
    after:  'Down 11kg, sleeps 7+ hours, pain-free.',
    quote:  'I had tried everything — personal trainers, nutritionists, apps. Prime Form was the first approach that worked with my insane schedule, not against it.',
    metric: '11kg lost in 4 months',
    stars: 5,
  },
  {
    name: 'David L.',      role: 'Managing Director, PE',     initials: 'DL',
    before: '120hr work weeks, pre-diabetic markers, obese.',
    after:  'Normal glucose, 22kg lost, still works hard.',
    quote:  'The ROI on investing in my health has been the best business decision I\'ve made in the last decade. I think clearer, sleep better, and lead with far more energy.',
    metric: '22kg lost in 7 months',
    stars: 5,
  },
  {
    name: 'Michael T.',    role: 'SVP Operations',            initials: 'MT',
    before: 'Constant travel, 2 stone overweight, no routine.',
    after:  'Consistent results despite weekly travel.',
    quote:  'As someone who lives in airports, I never thought a sustainable health routine was possible. James built one that actually travels with me.',
    metric: '14kg lost in 5 months',
    stars: 5,
  },
  {
    name: 'Caroline B.',   role: 'Chief Marketing Officer',   initials: 'CB',
    before: 'Burnout, hormonal imbalance, 30lbs overweight.',
    after:  'Balanced labs, 25lbs lighter, promoted.',
    quote:  'Prime Form addressed my health on every level — training, nutrition, sleep, and stress. The results have been remarkable and completely sustainable.',
    metric: '25lbs lost in 6 months',
    stars: 5,
  },
  {
    name: 'James W.',      role: 'Founder & Entrepreneur',    initials: 'JW',
    before: 'Post-surgery rehabilitation, muscle loss, depression.',
    after:  'Stronger than pre-surgery, mental clarity restored.',
    quote:  'After a major knee surgery I thought my peak physical years were behind me. Prime Form proved that assumption catastrophically wrong.',
    metric: 'Full athletic return in 4 months',
    stars: 5,
  },
]

const STATS = [
  { stat: '200+',  label: 'Clients Coached' },
  { stat: '94%',   label: 'Goal Achievement Rate' },
  { stat: '4.9★',  label: 'Average Client Rating' },
  { stat: '8yrs',  label: 'Average Client Relationship' },
]

/* Testimonial card */
function TestimonialCard({ testimonial, delay = 0 }) {
  const { name, role, initials, before, after, quote, metric, stars } = testimonial
  return (
    <AnimatedSection delay={delay}>
      <div className="flex flex-col gap-5 p-7 rounded-2xl border border-white/8 bg-surface/50 h-full">
        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} size={13} fill="#ff6b35" color="#ff6b35" />
          ))}
        </div>

        {/* Quote mark */}
        <Quote size={24} className="text-accent/30" />

        {/* Quote */}
        <blockquote className="text-light/80 text-sm leading-relaxed flex-1">
          {quote}
        </blockquote>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white/3 border border-white/5">
            <p className="text-xs text-muted uppercase tracking-wide mb-1">Before</p>
            <p className="text-xs text-light/60 leading-relaxed">{before}</p>
          </div>
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/15">
            <p className="text-xs text-accent uppercase tracking-wide mb-1">After</p>
            <p className="text-xs text-light/70 leading-relaxed">{after}</p>
          </div>
        </div>

        {/* Key metric */}
        <div className="py-3 px-4 bg-secondary/10 rounded-lg border border-secondary/20">
          <p className="text-xs font-semibold text-secondary">{metric}</p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center
                          text-xs font-bold text-light shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-light">{name}</p>
            <p className="text-xs text-muted">{role}</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function TestimonialsPage({ navigate }) {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Badge>Proof</Badge>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none">
              RESULTS FROM<br />
              <span className="text-accent">REAL EXECUTIVES</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-lg leading-relaxed">
              Not before/after photos from 25-year-olds. Real outcomes from professionals aged 38–65 with demanding careers and limited time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* Video testimonial placeholder */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <SectionHeader
              eyebrow="Video Testimonials"
              heading="HEAR IT FROM THEM"
              sub="30-minute conversations with clients about their transformation journeys."
              className="items-center text-center"
            />
          </AnimatedSection>

          <AnimatedSection>
            <div className="aspect-video rounded-2xl bg-surface border border-white/8 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-accent border-b-[10px] border-b-transparent ml-1" />
                </div>
                <p className="text-muted text-sm">Video testimonials coming soon</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-5xl md:text-6xl mb-6">
              YOUR RESULT STARTS WITH ONE CALL.
            </h2>
            <Button size="lg" onClick={() => navigate('contact')}>
              Book Free Consultation
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
