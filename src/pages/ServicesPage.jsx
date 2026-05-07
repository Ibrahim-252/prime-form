import React, { useState } from 'react'
import { Dumbbell, MessageCircle, ChefHat, Target, CheckCircle2, ChevronRight } from 'lucide-react'
import { SectionHeader, AnimatedSection, Button, Badge } from '../components/UI'

const SERVICES = [
  {
    id: 'programming',
    Icon: Dumbbell,
    tag: 'Training',
    title: 'Customized Programming',
    headline: 'Training That Works Around Your Calendar — Not Against It.',
    desc: 'Every session is designed to deliver maximum results in minimum time. We build programmes that travel well, require no fixed schedule, and produce measurable outcomes every 30 days.',
    forWho: 'For executives who know exercise matters but can\'t commit to a rigid gym schedule or who have tried generic programmes and quit within 6 weeks.',
    benefits: [
      'Programmes designed for 30–60 minute windows',
      'Hotel gym, home gym, and no-gym variants',
      'Progressive overload tracked automatically',
      'Quarterly reassessment and programme redesign',
      'Video technique library for every exercise',
    ],
    cta: 'Start Training Smarter',
  },
  {
    id: 'accountability',
    Icon: MessageCircle,
    tag: 'Coaching',
    title: 'Accountability & Support',
    headline: 'The Person in Your Corner Who Actually Understands Your Life.',
    desc: 'Elite executives don\'t need motivation — they need a system and someone to hold them to it. Our coaching relationship is built on honesty, data, and genuine investment in your outcomes.',
    forWho: 'For high-achievers who are self-aware enough to know they need external accountability, and smart enough to want a coach who respects their intelligence.',
    benefits: [
      'Daily messaging and check-in protocol',
      'Weekly 30-minute video review',
      'Real-time programme adjustments',
      'Mindset and behaviour coaching integrated',
      'On-call support for travel weeks and high-stress periods',
    ],
    cta: 'Build Your Support System',
  },
  {
    id: 'technical',
    Icon: Target,
    tag: 'Mastery',
    title: 'Technical Coaching',
    headline: 'Move Better. Perform Longer. Avoid the Injuries That Sideline Executives.',
    desc: 'Poor movement patterns are the silent career-enders for high-achievers. We screen, identify, and systematically address the structural imbalances that accumulate from years of desk work, stress, and neglect.',
    forWho: 'For executives with persistent aches, those returning from injury, or anyone who wants to build a body that performs for decades — not just this year.',
    benefits: [
      'Full movement screening protocol',
      'Targeted mobility and stability work',
      'Posture and spinal health programming',
      'Return-to-training guidance post-injury',
      'Long-term structural health planning',
    ],
    cta: 'Optimise Your Movement',
  },
  {
    id: 'kitchen',
    Icon: ChefHat,
    tag: 'Nutrition',
    title: 'Kitchen Audit & Nutrition',
    headline: 'No Diet Plans. No Food Scales. Just a System That Actually Sticks.',
    desc: 'We\'ve audited hundreds of executive kitchens and the problems are always the same: too much of the wrong convenience food and no system for the right choices under pressure.',
    forWho: 'For busy professionals who eat out frequently, travel for work, or have tried and failed at traditional diet approaches because they were designed for people with unlimited time.',
    benefits: [
      'Full kitchen and pantry audit (virtual or in-person)',
      'Restaurant and travel nutrition strategies',
      'Meal structure framework — not meal plans',
      'Supplement review and optimisation',
      'Blood work interpretation and nutritional gaps',
    ],
    cta: 'Upgrade Your Nutrition',
  },
]

/* Individual service card */
function ServiceCard({ service, navigate, index }) {
  const { Icon, tag, title, headline, desc, forWho, benefits, cta } = service
  const isReversed = index % 2 !== 0

  return (
    <section className={`py-20 ${index % 2 === 0 ? 'bg-surface' : 'bg-primary'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>

          {/* Content */}
          <AnimatedSection className={isReversed ? 'lg:col-start-2' : ''}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-accent" />
              </div>
              <Badge>{tag}</Badge>
            </div>

            <SectionHeader
              heading={title}
              sub={headline}
              className="mb-6"
            />

            <p className="text-muted leading-relaxed mb-6">{desc}</p>

            {/* Who it's for */}
            <div className="p-5 rounded-xl bg-secondary/5 border border-secondary/20 mb-6">
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">Who This Is For</p>
              <p className="text-sm text-light/70 leading-relaxed">{forWho}</p>
            </div>

            <Button onClick={() => navigate('contact')}>
              {cta} <ChevronRight size={15} className="ml-1" />
            </Button>
          </AnimatedSection>

          {/* Benefits panel */}
          <AnimatedSection delay={0.2} className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
            <div className="p-8 rounded-2xl border border-white/8 bg-surface/50">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-6">What's Included</p>
              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-light/80 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative number */}
              <p className="mt-8 font-display text-8xl text-white/3 text-right leading-none">
                {String(index + 1).padStart(2, '0')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage({ navigate }) {
  return (
    <>
      {/* Page header */}
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Badge>What We Offer</Badge>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none max-w-3xl">
              EVERY DIMENSION OF YOUR HEALTH.{' '}
              <span className="text-accent">MASTERED.</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
              Four integrated service pillars, each designed to work in isolation or in concert — depending on where you need the most support.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service sections */}
      {SERVICES.map((service, i) => (
        <ServiceCard key={service.id} service={service} navigate={navigate} index={i} />
      ))}

      {/* CTA Banner */}
      <section className="py-24 bg-accent/5 border-y border-accent/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-5xl md:text-6xl mb-6">
              NOT SURE WHERE TO START?
            </h2>
            <p className="text-muted mb-8 leading-relaxed">
              The free consultation call is designed to identify your highest-leverage entry point. 
              One conversation. Absolute clarity.
            </p>
            <Button size="lg" onClick={() => navigate('contact')}>
              Book Your Free Consultation
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
