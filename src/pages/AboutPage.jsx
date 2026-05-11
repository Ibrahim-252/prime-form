import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Award, BookOpen, Brain } from 'lucide-react'
import { SectionHeader, AnimatedSection, Button, Badge, StatCard } from '../components/UI'

const CREDENTIALS = [
  'MSc Exercise Physiology — University of Edinburgh',
  'Certified Strength & Conditioning Specialist (CSCS)',
  'Precision Nutrition Level 2 (PN2)',
  'Functional Medicine Practitioner (IFM)',
  'Executive Performance Coach — ICF Certified',
]

const VALUES = [
  { Icon: Brain,    title: 'Psychology First',  desc: 'Behaviour change is 90% psychology. We address the mental frameworks that lead to lasting results.' },
  { Icon: BookOpen, title: 'Science-Backed',    desc: 'Every recommendation is rooted in peer-reviewed research, not trending wellness culture.' },
  { Icon: Award,    title: 'Strategy & Systems', desc: 'We build systems that work inside your executive life — not around a fantasy version of it.' },
]

export default function AboutPage({ navigate }) {
  return (
    <>
      {/* ── Page header ── */}
      <section className="pt-36 pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Badge>Our Story</Badge>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none">
              THE MIND <br />
              <span className="text-accent">BEHIND</span> <br />
              PRIME FORM
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Founder section ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image placeholder */}
            <AnimatedSection>
              <div className="relative">
                {/* Main image block */}
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/10
                                border border-white/5 overflow-hidden flex items-end p-8">
                  {/* Placeholder portrait */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-secondary/30 flex items-center justify-center">
                      <span className="font-display text-6xl text-accent">JC</span>
                    </div>
                  </div>

                  {/* Name badge */}
                  <div className="relative z-10 bg-primary/90 backdrop-blur-sm rounded-xl p-4 w-full">
                    <p className="font-display text-2xl">Mohamed Nema</p>
                    <p className="text-sm text-muted">Founder & Head Coach</p>
                  </div>
                </div>

                {/* Floating credential badge */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -right-6 top-12 bg-accent text-white rounded-2xl p-4 shadow-2xl"
                >
                  <p className="font-display text-3xl">12+</p>
                  <p className="text-xs font-medium">Years<br />Experience</p>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Story text */}
            <AnimatedSection delay={0.2}>
              <SectionHeader
                eyebrow="The Founder"
                heading="BUILT FOR PEOPLE LIKE YOU — BECAUSE I WAS ONE."
                className="mb-8"
              />

              <div className="space-y-5 text-light/70 leading-relaxed">
                <p>
                  At 26, I was running a high-growth technology company, flying 200+ days a year, and quietly falling apart. 
                  My energy was crashing by 2pm. My sleep was fragmented. I'd gained 14kg without changing a single habit.
                </p>
                <p>
                  I turned to the health industry for answers and found a world built for people with unlimited time, minimal stress, 
                  and no professional obligations. Every programme assumed I could cook from scratch daily, sleep 9 hours, 
                  and train for 90 minutes.
                </p>
                <p>
                  So I built what didn't exist. I combined my background in exercise physiology, nutritional science, 
                  and behavioural psychology to create a system that works inside executive reality — not despite it.
                </p>
                <p className="text-light font-medium">
                  That system is Prime Form. And it has now transformed the health of over 200 executives across 3 continents.
                </p>
              </div>

              {/* Credentials */}
              <div className="mt-8 space-y-2">
                {CREDENTIALS.map((c) => (
                  <div key={c} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-muted">{c}</span>
                  </div>
                ))}
              </div>

              <Button className="mt-8" onClick={() => navigate('contact')}>
                Work With James
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Philosophy section ── */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="mb-16">
            <SectionHeader
              eyebrow="Philosophy"
              heading="THREE PILLARS THAT DRIVE EVERY DECISION"
              sub="Our approach isn't built on motivation. It's built on systems, science, and the psychology of high-performance humans."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ Icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.12}>
                <div className="p-8 rounded-2xl border border-white/5 hover:border-accent/20 transition-all">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display text-3xl mb-4">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard stat="200+" label="Executives Coached" />
            <StatCard stat="3"    label="Continents Served" />
            <StatCard stat="94%"  label="Goal Achievement Rate" />
            <StatCard stat="12+"  label="Years of Research" />
          </div>
        </div>
      </section>

      {/* ── Mission statement ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-xs tracking-widest text-accent uppercase mb-6">Our Mission</p>
            <blockquote className="font-display text-4xl md:text-6xl leading-tight">
              "TO PROVE THAT THE DEMANDS OF ELITE PERFORMANCE AND ELITE HEALTH ARE NOT IN CONFLICT — THEY ARE THE SAME THING."
            </blockquote>
            <p className="mt-8 text-muted">— James Clarke, Founder</p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
