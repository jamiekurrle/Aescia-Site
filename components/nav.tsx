'use client'

import { useState, useEffect } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Evidence', 'Governance', 'Contact']

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" aria-label="Aescia Health home" className="flex items-center gap-2.5 group">
          <span className="w-6 h-6 rounded-sm bg-foreground flex items-center justify-center flex-shrink-0 transition-opacity group-hover:opacity-70">
            <span className="block w-2.5 h-2.5 rounded-sm bg-accent" />
          </span>
          <span className="text-sm font-medium tracking-wide text-foreground">Aescia Health</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase bg-foreground text-primary-foreground px-5 py-2.5 hover:bg-accent transition-colors duration-300"
        >
          Contact us
        </a>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-background border-b border-border overflow-hidden transition-all duration-400 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5" aria-label="Mobile navigation">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-xs tracking-widest uppercase bg-foreground text-primary-foreground px-5 py-2.5 text-center mt-2 hover:bg-accent transition-colors duration-300"
          >
            Contact us
          </a>
        </nav>
      </div>
    </header>
  )
}
