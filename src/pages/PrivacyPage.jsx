import React from 'react'
import { AnimatedSection, Badge } from '../components/UI'

/* ── Shared legal page layout ── */
function LegalPage({ badge, title, lastUpdated, sections }) {
  return (
    <>
      <section className="pt-36 pb-12 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <Badge>{badge}</Badge>
            <h1 className="font-display text-5xl md:text-6xl mt-4">{title}</h1>
            <p className="text-sm text-muted mt-3">Last updated: {lastUpdated}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose-legal space-y-10">
            {sections.map(({ heading, content }) => (
              <AnimatedSection key={heading}>
                <h2 className="font-display text-3xl text-accent mb-3">{heading}</h2>
                <p className="text-muted leading-relaxed text-sm">{content}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─────────────────────────────────────────────
   PRIVACY POLICY PAGE
───────────────────────────────────────────── */
export function PrivacyPage() {
  return (
    <LegalPage
      badge="Legal"
      title="PRIVACY POLICY"
      lastUpdated="1 January 2025"
      sections={[
        {
          heading: '1. Information We Collect',
          content: 'We collect information you provide directly to us when you fill out a contact form, book a consultation, or sign up for our email newsletter. This includes your name, email address, phone number, and health-related information you choose to share. We also collect certain information automatically when you visit our website, including your IP address, browser type, and pages viewed.',
        },
        {
          heading: '2. How We Use Your Information',
          content: 'We use the information we collect to provide, maintain, and improve our coaching services; communicate with you about your programme and account; send you marketing communications if you have opted in; respond to your comments and questions; and comply with legal obligations.',
        },
        {
          heading: '3. Information Sharing',
          content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements. We may also disclose information when required by law.',
        },
        {
          heading: '4. Data Security',
          content: 'We implement appropriate technical and organisational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access. However, no method of transmission over the internet is 100% secure.',
        },
        {
          heading: '5. Your Rights',
          content: 'Under GDPR and applicable data protection laws, you have the right to access, rectify, erase, restrict processing of, and port your personal data. You also have the right to object to processing and to withdraw consent. To exercise these rights, please contact us at privacy@primeform.com.',
        },
        {
          heading: '6. Cookies',
          content: 'We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of our website may not function properly.',
        },
        {
          heading: '7. Contact',
          content: 'If you have questions about this Privacy Policy, please contact us at privacy@primeform.com or by mail at Prime Form, 123 Mayfair Street, London, W1K 1AA, United Kingdom.',
        },
      ]}
    />
  )
}

/* ─────────────────────────────────────────────
   TERMS OF SERVICE PAGE
───────────────────────────────────────────── */
export function TermsPage() {
  return (
    <LegalPage
      badge="Legal"
      title="TERMS OF SERVICE"
      lastUpdated="1 January 2025"
      sections={[
        {
          heading: '1. Acceptance of Terms',
          content: 'By accessing or using the Prime Form website or coaching services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and your continued use of our services following changes constitutes acceptance of those changes.',
        },
        {
          heading: '2. Services Description',
          content: 'Prime Form provides personalised health and fitness coaching services to individuals. Our services include personalised training programmes, nutritional guidance, accountability coaching, and educational resources. All services are provided for informational and educational purposes and do not constitute medical advice.',
        },
        {
          heading: '3. Client Responsibilities',
          content: 'You are responsible for providing accurate and complete information about your health status, medical history, and physical condition. You must consult with a qualified medical professional before beginning any exercise or nutritional programme, particularly if you have any pre-existing medical conditions, are pregnant, or are over 40 years of age.',
        },
        {
          heading: '4. Payment Terms',
          content: 'Coaching services are billed in 90-day blocks, payable in advance. Payments are processed via secure payment processors. Refunds are not available after the coaching period has commenced unless we are unable to deliver the agreed services. All prices are in GBP and exclusive of VAT where applicable.',
        },
        {
          heading: '5. Intellectual Property',
          content: 'All training programmes, nutritional frameworks, coaching materials, and content provided by Prime Form are proprietary and protected by intellectual property law. You may not reproduce, distribute, or create derivative works from our materials without prior written consent.',
        },
        {
          heading: '6. Limitation of Liability',
          content: 'Prime Form shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability in any matter arising out of or related to these terms shall not exceed the total amount you paid for the specific service giving rise to the claim.',
        },
        {
          heading: '7. Governing Law',
          content: 'These Terms of Service shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
        },
      ]}
    />
  )
}

/* ─────────────────────────────────────────────
   HEALTH DISCLAIMER PAGE
───────────────────────────────────────────── */
export function DisclaimerPage() {
  return (
    <LegalPage
      badge="Important"
      title="HEALTH DISCLAIMER"
      lastUpdated="1 January 2025"
      sections={[
        {
          heading: 'Not Medical Advice',
          content: 'The information and coaching provided by Prime Form is for educational and informational purposes only and is not intended as medical advice. The coaching, training programmes, and nutritional guidance we provide should not be used as a substitute for professional medical advice, diagnosis, or treatment.',
        },
        {
          heading: 'Consult Your Doctor',
          content: 'Before beginning any exercise programme, dietary changes, or taking nutritional supplements, you should consult with a qualified healthcare professional, particularly if you have any pre-existing medical conditions, are pregnant or planning to become pregnant, are currently taking medication, have recently had surgery, or are over the age of 40 and have been sedentary.',
        },
        {
          heading: 'Individual Results May Vary',
          content: 'All testimonials and case studies presented on this website reflect the individual experiences of clients and are not necessarily representative of all clients. Results will vary based on individual factors including genetics, starting point, adherence to the programme, lifestyle factors, and other variables. We make no guarantees regarding specific outcomes.',
        },
        {
          heading: 'Exercise Risks',
          content: 'Physical exercise involves inherent risks, including but not limited to muscle soreness, injury, and in rare cases, more serious health events. By engaging in our coaching services, you acknowledge these risks and agree to exercise within your personal limits and capabilities. Always stop exercising immediately and seek medical attention if you experience chest pain, difficulty breathing, dizziness, or severe pain.',
        },
        {
          heading: 'Supplement Guidance',
          content: 'Any supplement recommendations made by Prime Form coaches are based on general principles and publicly available research. Supplements are not regulated by the MHRA in the same manner as pharmaceutical drugs. Always inform your doctor of any supplements you are taking, as they may interact with medications.',
        },
        {
          heading: 'Mental Health',
          content: 'Our coaching may address stress, sleep, and lifestyle factors that can affect mental wellbeing. We are not licensed mental health professionals. If you are experiencing mental health difficulties, please seek support from a qualified mental health professional. In the UK, you can access support through your GP or the NHS.',
        },
        {
          heading: 'Contact',
          content: 'If you have questions about this Health Disclaimer or any aspect of our services, please contact us at health@primeform.com before beginning any programme.',
        },
      ]}
    />
  )
}

export default PrivacyPage
