import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { SectionHeader, AnimatedSection, Button, Badge } from '../components/UI'

const FAQS = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'What happens on the free discovery call?',
        a: 'The discovery call is a focused 45-minute conversation where we map your current health situation, career demands, lifestyle, and goals. We also determine whether Prime Form is the right fit — we only take on clients we\'re confident we can deliver results for. There\'s no sales pressure and no obligation.',
      },
      {
        q: 'How long before I see results?',
        a: 'Most clients notice improvements in energy and sleep within the first 2–3 weeks. Visible body composition changes typically appear by week 4–6. By day 90, most clients have hit their first major milestone and are building toward the next phase.',
      },
      {
        q: 'Do I need to already be training?',
        a: 'Absolutely not. We work with complete beginners through to experienced athletes returning from injury or looking to break through plateaus. The assessment phase identifies exactly where you are, and the programme is built from that baseline.',
      },
    ],
  },
  {
    category: 'Coaching & Programme',
    questions: [
      {
        q: 'How much time per week does training require?',
        a: 'We design programmes around your available windows — not the other way around. Most clients train for 30–60 minutes, 3–4 times per week. During heavy travel periods or high-pressure work phases, we shift to shorter, more intense protocols to maintain momentum.',
      },
      {
        q: 'What if I travel constantly for work?',
        a: 'Travel-proofing your programme is one of our specialities. You\'ll have hotel gym variants, bodyweight protocols, and nutritional strategies built specifically for airports, business dinners, and different time zones.',
      },
      {
        q: 'How does the weekly coaching work?',
        a: 'Each week includes a 30-minute video check-in call, daily messaging access for questions and accountability, weekly tracking review, and programme adjustments as needed. The intensity of contact adapts to your schedule and preference.',
      },
      {
        q: 'What technology or apps do I need?',
        a: 'We keep it simple. You\'ll use a training app for logging workouts (we\'ll set it up for you), a food logging app during the assessment phase, and standard video call software for check-ins. No complex tech stack required.',
      },
    ],
  },
  {
    category: 'Nutrition',
    questions: [
      {
        q: 'Do I need to follow a strict diet plan?',
        a: 'No. We don\'t create rigid meal plans that collapse the moment life gets busy. Instead, we build a nutrition framework — a set of principles and strategies that work in restaurants, airports, and at home. The goal is a system you can maintain for life, not 6 weeks.',
      },
      {
        q: 'What does the kitchen audit involve?',
        a: 'We do a virtual walkthrough of your kitchen, fridge, and pantry. We identify what stays, what goes, and what gets added. We also look at your delivery and takeaway habits, favourite restaurants, and travel eating patterns to build practical strategies around your actual life.',
      },
      {
        q: 'Will you recommend supplements?',
        a: 'Yes — but only evidence-based supplements with a clear rationale for your specific situation. We\'ll review what you\'re currently taking, remove what\'s redundant or ineffective, and add anything with proven relevance to your goals and labs.',
      },
    ],
  },
  {
    category: 'Investment & Commitment',
    questions: [
      {
        q: 'How long is the minimum commitment?',
        a: 'We work in 90-day blocks. This is the minimum timeframe to see meaningful, sustainable results. Most clients renew for additional blocks once they experience what\'s possible. We don\'t do month-to-month because transformation requires a committed timeline.',
      },
      {
        q: 'What if I need to pause coaching?',
        a: 'Life happens. If a major personal or professional situation requires a temporary pause, we handle it on a case-by-case basis. Our goal is your long-term success, not rigid contract enforcement.',
      },
      {
        q: 'Is coaching available outside of the UK?',
        a: 'Yes. Our coaching is fully remote and we work with clients across Europe, the Middle East, North America, and Asia. We schedule around time zones and travel calendars.',
      },
    ],
  },
]

/* Individual accordion item */
function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left gap-4 group"
      >
        <span className={`font-medium text-sm leading-relaxed transition-colors ${open ? 'text-accent' : 'text-light/80 group-hover:text-light'}`}>
          {question}
        </span>
        <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
          open ? 'border-accent bg-accent/10' : 'border-white/10 group-hover:border-white/30'
        }`}>
          {open ? <Minus size={13} className="text-accent" /> : <Plus size={13} className="text-light/60" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-muted leading-relaxed pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage({ navigate }) {
  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Badge>FAQ</Badge>
            <h1 className="font-display text-6xl md:text-8xl mt-4 leading-none">
              YOUR QUESTIONS.<br />
              <span className="text-accent">ANSWERED.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            {FAQS.map(({ category, questions }) => (
              <AnimatedSection key={category}>
                {/* Category label */}
                <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-accent" />
                  {category}
                </p>

                {/* Questions */}
                <div className="border-t border-white/5">
                  {questions.map(({ q, a }) => (
                    <AccordionItem key={q} question={q} answer={a} />
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              STILL HAVE QUESTIONS?
            </h2>
            <p className="text-muted mb-8">
              The discovery call is the best way to get answers specific to your situation. It's free, focused, and no-obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('contact')}>Book a Discovery Call</Button>
              <Button variant="secondary" onClick={() => navigate('contact')}>Send a Message</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
