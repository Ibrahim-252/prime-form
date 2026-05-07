import React from 'react'
import { motion } from 'framer-motion'
import { Phone, ClipboardList, Map, Rocket, CheckCircle2 } from 'lucide-react'
import { SectionHeader, AnimatedSection, Button, Badge } from '../components/UI'

const STEPS = [
  {
    num: '01',
    Icon: Phone,
    title: 'Discovery Call',
    duration: '45 Minutes',
    desc: 'We start with an honest, structured conversation. No sales pressure — just a deep dive into your health history, current lifestyle, biggest frustrations, and what peak performance actually looks like for you specifically.',
    details: [
      'Goals and timeline assessment',
      'Current health and training history review',
      'Lifestyle and schedule mapping',
      'Initial blocker identification',
      'Programme fit evaluation',
    ],
  },
  {
    num: '02',
    Icon: ClipboardList,
    title: 'Full Assessment',
    duration: '1 Week',
    desc: 'Before any plan is written, we need data. You\'ll complete a comprehensive assessment protocol covering everything from movement quality to sleep tracking to nutritional audit — giving us an accurate picture of your starting point.',
    details: [
      'Movement screening and postural assessment',
      'Sleep tracking and recovery analysis',
      'Nutritional diary and kitchen audit',
      'Lab work review (or referral if needed)',
      'Stress and lifestyle load scoring',
    ],
  },
  {
    num: '03',
    Icon: Map,
    title: 'Your Custom Blueprint',
    duration: '3–5 Days',
    desc: 'Your 90-day roadmap is built from scratch. Not a template. Not an algorithm. A human-designed plan that accounts for your specific biology, schedule, travel demands, food preferences, and long-term objectives.',
    details: [
      'Phase-structured 90-day training plan',
      'Nutrition framework and meal timing protocol',
      'Supplement stack and daily routine',
      'Key performance indicators to track',
      'Travel and high-stress contingency plans',
    ],
  },
  {
    num: '04',
    Icon: Rocket,
    title: 'Ongoing Coaching',
    duration: 'Continuous',
    desc: 'This is where the real work begins. You execute; we monitor, adjust, and hold you accountable. Weekly calls, daily messaging, and real-time programme edits ensure the plan evolves as your life does.',
    details: [
      'Weekly 30-minute video check-in',
      'Daily habit and training tracking',
      'Real-time programme adjustments',
      'Monthly performance benchmarking',
      'Quarterly blueprint review and reset',
    ],
  },
]

export default function HowItWorksPage({ navigate }) {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Badge>The Process</Badge>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none max-w-3xl">
              CLEAR. STRUCTURED.{' '}
              <span className="text-accent">NO GUESSWORK.</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
              Four phases. Built to deliver measurable results within 30 days and transform your relationship with health within 90.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-6">
            {STEPS.map(({ num, Icon, title, duration, desc, details }, i) => (
              <AnimatedSection key={num} delay={i * 0.08}>
                <div className="group grid grid-cols-1 lg:grid-cols-[120px_1fr_1fr] gap-8 p-8 md:p-10
                                rounded-2xl border border-white/5 hover:border-accent/20 transition-all duration-300">

                  {/* Step number + icon */}
                  <div className="flex lg:flex-col items-center lg:items-start gap-4">
                    <span className="font-display text-7xl text-accent/20 leading-none">{num}</span>
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center
                                    group-hover:bg-accent/20 transition-colors">
                      <Icon size={18} className="text-accent" />
                    </div>
                  </div>

                  {/* Main content */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display text-4xl">{title}</h3>
                      <span className="text-xs font-semibold text-muted bg-white/5 px-3 py-1 rounded-full">
                        {duration}
                      </span>
                    </div>
                    <p className="text-muted leading-relaxed text-sm">{desc}</p>
                  </div>

                  {/* Detail checklist */}
                  <div className="border-l border-white/5 pl-8">
                    <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">
                      What Happens
                    </p>
                    <ul className="space-y-2.5">
                      {details.map((d) => (
                        <li key={d} className="flex items-start gap-2.5">
                          <CheckCircle2 size={13} className="text-accent mt-0.5 shrink-0" />
                          <span className="text-sm text-light/70">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline visual (decorative) */}
      <section className="py-16 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Your Timeline</p>
          </AnimatedSection>

          <div className="flex items-center gap-0 overflow-x-auto pb-4">
            {[
              { label: 'Day 1',    event: 'Discovery Call' },
              { label: 'Week 1',   event: 'Full Assessment' },
              { label: 'Week 2',   event: 'Blueprint Ready' },
              { label: 'Week 3',   event: 'Coaching Begins' },
              { label: 'Day 30',   event: 'First Benchmark' },
              { label: 'Day 90',   event: 'Blueprint Review' },
            ].map(({ label, event }, i) => (
              <div key={label} className="flex items-center shrink-0">
                <div className="text-center">
                  <div className="w-3 h-3 bg-accent rounded-full mx-auto mb-2" />
                  <p className="text-xs font-semibold text-accent">{label}</p>
                  <p className="text-xs text-muted w-20 text-center">{event}</p>
                </div>
                {i < 5 && (
                  <div className="w-16 md:w-24 h-px bg-gradient-to-r from-accent/40 to-accent/10 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-5xl md:text-6xl mb-6">
              READY TO START STEP ONE?
            </h2>
            <p className="text-muted mb-8">
              The Discovery Call is free, no-obligation, and the most important 45 minutes you'll invest in your health this year.
            </p>
            <Button size="lg" onClick={() => navigate('contact')}>
              Book Your Discovery Call
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
