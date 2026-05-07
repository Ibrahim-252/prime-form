import React from 'react'
import { Instagram, Linkedin, Youtube, Mail } from 'lucide-react'
import primeLogo from '../../logo/primelogo.jpeg'

/**
 * Footer — site-wide footer with links, socials, and legal.
 */
export default function Footer({ navigate }) {
  const year = new Date().getFullYear()
  const socialLinks = [
    { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { Icon: Mail, href: 'mailto:hello@primeform.com', label: 'Email' },
  ]

  const footerLinks = {
    Company:   [
      { label: 'About',         page: 'about' },
      { label: 'Services',      page: 'services' },
      { label: 'How It Works',  page: 'how-it-works' },
      { label: 'Results',       page: 'testimonials' },
    ],
    Support:   [
      { label: 'FAQ',           page: 'faq' },
      { label: 'Contact',       page: 'contact' },
      { label: 'Book a Call',   page: 'contact' },
    ],
    Legal:     [
      { label: 'Privacy Policy',     page: 'privacy' },
      { label: 'Terms of Service',   page: 'terms' },
      { label: 'Health Disclaimer',  page: 'disclaimer' },
    ],
  }

  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-2">
            <button onClick={() => navigate('home')} className="flex items-center group mb-5">
              <img
                src={primeLogo}
                alt="Prime Form logo"
                className="h-12 w-auto rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>

            <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
              Science-backed health coaching for executives and professionals who refuse to let a demanding career compromise their vitality.
            </p>

            <div className="mb-6 text-sm text-light/80 space-y-1">
              <p><a href="mailto:hello@primeform.com" className="hover:text-accent transition-colors">hello@primeform.com</a></p>
              <p><a href="tel:+971500000000" className="hover:text-accent transition-colors">+971 50 000 0000</a></p>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                             text-muted hover:text-accent hover:border-accent/40 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold tracking-widest text-muted uppercase mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, page }) => (
                  <li key={label}>
                    <button
                      onClick={() => navigate(page)}
                      className="text-sm text-light/60 hover:text-light transition-colors hover-underline"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-10 p-6 md:p-8 rounded-2xl border border-white/10 bg-primary/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">Take The First Step</p>
            <p className="text-sm text-light/80">Book your free consultation and get a tailored health plan designed around your schedule.</p>
          </div>
          <button
            onClick={() => navigate('contact')}
            className="bg-accent text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-orange-500 transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Book Free Consultation
          </button>
        </div>

        {/* Decorative display text */}
        <div className="overflow-hidden mb-8">
          <p className="font-display text-[80px] md:text-[120px] text-stroke leading-none tracking-tight select-none">
            PEAK PERFORMANCE
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted">
          <p>© {year} Prime Form. All rights reserved.</p>
          <p>Designed for those who demand more from life — and themselves.</p>
        </div>
      </div>
    </footer>
  )
}
