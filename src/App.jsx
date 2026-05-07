import React, { useState, useEffect } from 'react'

// ── Layout ──
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

// ── Public pages ──
import HomePage         from './pages/HomePage'
import AboutPage        from './pages/AboutPage'
import ServicesPage     from './pages/ServicesPage'
import HowItWorksPage   from './pages/HowItWorksPage'
import TestimonialsPage from './pages/TestimonialsPage'
import FAQPage          from './pages/FAQPage'
import ContactPage      from './pages/ContactPage'
import PrivacyPage      from './pages/PrivacyPage'
import TermsPage        from './pages/TermsPage'
import DisclaimerPage   from './pages/DisclaimerPage'

// ── Client portal ──
import ClientAuth   from './client/ClientAuth'
import ClientPortal from './client/ClientPortal'

// ── Owner admin ──
import AdminLogin from './admin/AdminLogin'
import AdminPanel from './admin/AdminPanel'

// ── API helpers ──
import { getUser, clearSession } from './lib/api'

/**
 * App — Root router
 *
 * Three completely separate systems:
 *   1. Public website  (Navbar + pages + Footer)
 *   2. Client portal   (/client-login, /client-signup, /portal/*)
 *   3. Owner admin     (/admin/*)
 *
 * URL-style pages used as string keys in state:
 *   'home' | 'about' | 'services' | ... (public)
 *   'client-login' | 'client-signup'     (client auth)
 *   'portal'                             (client dashboard)
 *   'admin' | 'admin-*'                  (owner admin)
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [clientUser,  setClientUser]  = useState(null)   // logged-in client
  const [adminUser,   setAdminUser]   = useState(null)   // logged-in admin

  // Restore client session from localStorage on first load
  useEffect(() => {
    const saved = getUser()
    if (saved?.role === 'client') setClientUser(saved)
  }, [])

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ── 1. ADMIN SECTION ───────────────────────────────── */
  if (currentPage.startsWith('admin')) {
    if (!adminUser) {
      return (
        <AdminLogin
          onLogin={(user, action) => {
            if (action === 'back') navigate('home')
            else { setAdminUser(user); setCurrentPage('admin') }
          }}
        />
      )
    }
    return (
      <AdminPanel
        currentPage={currentPage}
        navigate={navigate}
        user={adminUser}
        onLogout={() => { setAdminUser(null); navigate('home') }}
      />
    )
  }

  /* ── 2. CLIENT AUTH PAGES ───────────────────────────── */
  if (currentPage === 'client-login' || currentPage === 'client-signup') {
    // Already logged in → bounce straight to portal
    if (clientUser) { navigate('portal'); return null }
    return (
      <ClientAuth
        defaultTab={currentPage === 'client-signup' ? 'signup' : 'login'}
        navigate={navigate}
        onLogin={(user) => { setClientUser(user); navigate('portal') }}
      />
    )
  }

  /* ── 3. CLIENT PORTAL ───────────────────────────────── */
  if (currentPage === 'portal') {
    if (!clientUser) { navigate('client-login'); return null }
    return (
      <ClientPortal
        user={clientUser}
        onLogout={() => {
          clearSession()
          setClientUser(null)
          navigate('home')
        }}
      />
    )
  }

  /* ── 4. PUBLIC WEBSITE ──────────────────────────────── */
  return (
    <div className="min-h-screen bg-primary text-light font-body grain">
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        clientUser={clientUser}
        onClientPortal={() => navigate(clientUser ? 'portal' : 'client-login')}
      />

      <main>
        {currentPage === 'home'         && <HomePage         navigate={navigate} />}
        {currentPage === 'about'        && <AboutPage        navigate={navigate} />}
        {currentPage === 'services'     && <ServicesPage     navigate={navigate} />}
        {currentPage === 'how-it-works' && <HowItWorksPage   navigate={navigate} />}
        {currentPage === 'testimonials' && <TestimonialsPage navigate={navigate} />}
        {currentPage === 'faq'          && <FAQPage          navigate={navigate} />}
        {currentPage === 'contact'      && <ContactPage      navigate={navigate} />}
        {currentPage === 'privacy'      && <PrivacyPage      navigate={navigate} />}
        {currentPage === 'terms'        && <TermsPage        navigate={navigate} />}
        {currentPage === 'disclaimer'   && <DisclaimerPage   navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />
      <WhatsAppButton />
    </div>
  )
}
