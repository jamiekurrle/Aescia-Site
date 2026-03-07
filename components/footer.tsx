export function Footer() {
  return (
    <footer className="py-10 px-6 md:px-10 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-sm bg-foreground flex items-center justify-center flex-shrink-0">
            <span className="block w-2 h-2 rounded-sm bg-accent" />
          </span>
          <span className="text-xs font-medium tracking-wide text-foreground">Aescia Health</span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
          {['About', 'Governance', 'Evidence', 'Contact'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Legal */}
        <p className="text-[10px] tracking-wide text-muted-foreground">
          © {new Date().getFullYear()} Aescia Pty Ltd · ABN 96 687 840 517
        </p>
      </div>
    </footer>
  )
}
