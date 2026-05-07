import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

/**
 * WhatsAppButton — A floating action button (FAB) that opens WhatsApp.
 * Fixed to the bottom-right of the screen.
 */
export default function WhatsAppButton() {
  const whatsappNumber = '971525934143'
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full 
                 flex items-center justify-center shadow-2xl shadow-green-500/40
                 hover:shadow-green-500/60 transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      {/* Icon */}
      <MessageCircle size={28} className="relative z-10" />

      {/* Ripple/Glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
      
      {/* Active dot */}
      <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]"></span>
      </span>

      {/* Tooltip on hover */}
      <div className="absolute right-full mr-4 px-3 py-1.5 bg-white text-primary text-xs font-bold rounded-lg
                      opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
                      transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl">
        WhatsApp Us
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
      </div>
    </motion.a>
  )
}
