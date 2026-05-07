import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Shield } from 'lucide-react'
import primeLogo from '../../logo/primelogo.jpeg'

// Navigation links for the public site
const NAV_LINKS = [
  { label: 'About',        page: 'about'        },
  { label: 'Services',     page: 'services'     },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Results',      page: 'testimonials' },
  { label: 'FAQ',          page: 'faq'          },
]

/**
 * Navbar — sticky header that becomes opaque on scroll.
 * On mobile, a slide-down drawer replaces the horizontal links.
 */
export default function Navbar({ currentPage, navigate, clientUser, onClientPortal }) {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  // Listen to scroll to add background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  const handleNav = (page) => {
    setMobileOpen(false)
    navigate(page)
  }

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 rounded-2xl ${
          scrolled || mobileOpen
            ? 'glass-dark py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center group"
            aria-label="Go to homepage"
          >
            <img
              src={primeLogo}
              alt="Prime Form logo"
              className="h-10 md:h-14 w-auto rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`text-sm font-semibold tracking-wide transition-colors duration-200 hover-underline ${
                  currentPage === page ? 'text-accent' : 'text-light/85 hover:text-light'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Client portal button — changes based on login state */}
            {clientUser ? (
              <button
                onClick={onClientPortal}
                className="flex items-center gap-2 text-xs font-semibold text-accent border border-accent/35
                           bg-accent/8 px-4 py-2 rounded-full hover:bg-accent/14 transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <User size={12} />
                My Portal
              </button>
            ) : (
              <button
                onClick={() => handleNav('client-login')}
                className="flex items-center gap-1.5 text-xs font-semibold text-accent border border-accent/35
                           bg-accent/8 px-4 py-2 rounded-full hover:bg-accent/14 transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <User size={12} />
                Client Login
              </button>
            )}
            <button
              onClick={() => handleNav('admin')}
              aria-label="Admin access"
              className="w-9 h-9 rounded-full border border-white/12 bg-white/5 text-light/65
                         flex items-center justify-center hover:text-light hover:border-white/25 hover:bg-white/10
                         transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light/40"
            >
              <Shield size={13} />
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full
                         hover:bg-orange-500 transition-all duration-200 hover:scale-[1.03] active:scale-95
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              Book Free Call
            </button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden text-light p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-primary/98 backdrop-blur-md border-b border-white/10 px-6 pb-6 pt-4 md:hidden"
          >
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`text-left text-lg font-medium transition-colors ${
                    currentPage === page ? 'text-accent' : 'text-light/80'
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Mobile CTA */}
              {clientUser ? (
                <button
                  onClick={() => { setMobileOpen(false); onClientPortal() }}
                  className="mt-2 flex items-center justify-center gap-2 border border-accent/30 bg-accent/5
                             text-accent font-semibold py-3 rounded-full w-full
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <User size={14} /> My Portal
                </button>
              ) : (
                <button
                  onClick={() => handleNav('client-login')}
                  className="mt-2 flex items-center justify-center gap-2 border border-accent/30 bg-accent/6
                             text-accent font-semibold py-3 rounded-full w-full
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <User size={14} />
                  Client Login
                </button>
              )}
              <button
                onClick={() => handleNav('admin')}
                className="flex items-center justify-center gap-2 border border-white/15 bg-white/5
                           text-light/85 font-semibold py-3 rounded-full w-full hover:bg-white/10 transition-all
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light/40"
              >
                <Shield size={14} />
                Admin
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="bg-accent text-white font-semibold py-3 rounded-full w-full"
              >
                Book Free Consultation
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
