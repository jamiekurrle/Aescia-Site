'use client'

import { useState } from 'react'
import Image from 'next/image'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Image src="/ae-mark.png" alt="Aescia" width={28} height={28} />
          <span className="text-sm font-semibold text-foreground">Aescia</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <a href="#problem" className="text-sm text-foreground/70 hover:text-foreground">
            Problem
          </a>
          <a href="#solution" className="text-sm text-foreground/70 hover:text-foreground">
            Solution
          </a>
          <a href="#impact" className="text-sm text-foreground/70 hover:text-foreground">
            Impact
          </a>
          <a href="#contact" className="text-sm text-foreground/70 hover:text-foreground">
            Contact
          </a>
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-block bg-accent text-accent-foreground text-sm font-medium px-6 py-2 rounded hover:opacity-90"
        >
          Get in touch
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-4">
            <a href="#problem" className="block text-sm text-foreground/70 hover:text-foreground">
              Problem
            </a>
            <a href="#solution" className="block text-sm text-foreground/70 hover:text-foreground">
              Solution
            </a>
            <a href="#impact" className="block text-sm text-foreground/70 hover:text-foreground">
              Impact
            </a>
            <a href="#contact" className="block text-sm text-foreground/70 hover:text-foreground">
              Contact
            </a>
            <a
              href="#contact"
              className="block bg-accent text-accent-foreground text-sm font-medium px-6 py-2 rounded text-center hover:opacity-90 mt-4"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
