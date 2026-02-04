import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

/**
 * Nextra theme configuration (TypeScript/React only).
 * DO NOT put CSS in this file — keep CSS in styles/globals.css.
 */
const config: DocsThemeConfig = {
  logo: (
    <span className="aesciaHeaderLogo" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
      <span style={{ fontWeight: 850, letterSpacing: "-0.02em" }}>Aescia</span>
      <span style={{ opacity: 0.8, fontWeight: 650 }}>Health</span>
    </span>
  ),

  project: {
    link: "https://github.com/jamiekurrle/Aescia-Site",
  },

  docsRepositoryBase: "https://github.com/jamiekurrle/Aescia-Site/tree/main",

  // These are safe defaults; you can expand later.
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1,
  },

  toc: {
    float: true,
  },

  navigation: {
    prev: true,
    next: true,
  },

  // You can turn these on later if you want.
  // feedback: { content: "Feedback" },
  // editLink: { text: "Edit this page" },

  footer: {
    text: (
      <div className="aesciaFooter">
        <div className="aesciaFooterInner">
          <div className="aesciaFooterLeft">
            <a className="aesciaFooterLogo" href="/" aria-label="Aescia home">
              {/* If you have an actual logo image/svg component, swap it in here */}
              <span style={{ fontWeight: 850, letterSpacing: "-0.02em" }}>Aescia</span>
            </a>

            <nav className="aesciaFooterNav" aria-label="Footer navigation">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/governance">Governance</a>
              <a href="/clinical-regulatory">Clinical &amp; Regulatory</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>

          <div className="aesciaFooterMeta">© {new Date().getFullYear()} Aescia</div>
        </div>
      </div>
    ),
  },

  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0a2540" />
      <meta name="description" content="Aescia is a post-discharge monitoring and escalation platform supporting safer recovery and better hospital flow." />
    </>
  ),
};

export default config;  height: auto !important;
  min-height: 0 !important;
}

.nextra-body,
.nextra-content,
.nextra-main {
  min-height: 0 !important;
  height: auto !important;
}

.nextra-body,
.nextra-content,
.nextra-main {
  display: block !important;
}

.nextra-content {
  margin-left: 0 !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.nextra-content main {
  max-width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  min-height: 0 !important;
  height: auto !important;
}

.nextra-content hr {
  display: none !important;
}

footer {
  margin-top: 0 !important;
}

/* ================================
   LIGHT MODE: FORCE dark blue header + footer
   (robust selectors for Nextra)
================================ */

/* Header wrapper in Nextra is typically header.nx-sticky */
html:not(.dark) header.nx-sticky {
  background: var(--aescia-bar) !important;
  border-bottom: 1px solid var(--aescia-bar-border) !important;
}

/* Some Nextra builds wrap nav in these containers; include both */
html:not(.dark) .nextra-nav-container,
html:not(.dark) .nextra-nav-container-blur {
  background: var(--aescia-bar) !important;
  border-bottom: 1px solid var(--aescia-bar-border) !important;
}

/* Ensure header text/icons are readable */
html:not(.dark) header.nx-sticky a,
html:not(.dark) header.nx-sticky button,
html:not(.dark) header.nx-sticky svg {
  color: var(--aescia-bar-text) !important;
}

/* Search input styling inside header */
html:not(.dark) header.nx-sticky input {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: var(--aescia-bar-text) !important;
}

html:not(.dark) header.nx-sticky input::placeholder {
  color: var(--aescia-bar-muted) !important;
}

/* Footer in Nextra is a real <footer> with Tailwind-ish classes */
html:not(.dark) footer {
  background: var(--aescia-bar) !important;
  color: var(--aescia-bar-text) !important;
  border-top: 1px solid var(--aescia-bar-border) !important;
}

/* Footer links readable */
html:not(.dark) footer a {
  color: var(--aescia-bar-text) !important;
  text-decoration: none !important;
}

html:not(.dark) footer a:hover {
  color: rgba(255, 255, 255, 0.98) !important;
  text-decoration: underline !important;
}

/* ================================
   Footer layout (logo left of nav, not cramped)
================================ */

.aesciaFooter {
  width: 100%;
  padding: 18px 20px;
}

.aesciaFooterInner {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.aesciaFooterLeft {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.aesciaFooterLogo {
  display: inline-flex;
  align-items: center;
  line-height: 0;
}

.aesciaFooterNav {
  display: flex;
  align-items: center;
  gap: 0; /* we’ll use separators for clarity */
  flex-wrap: wrap;
  font-size: 14px;
}

/* Add “ · ” separators between footer links */
.aesciaFooterNav a + a::before {
  content: "·";
  display: inline-block;
  margin: 0 10px;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
}

.aesciaFooterMeta {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.82);
  white-space: nowrap;
}

@media (max-width: 720px) {
  .aesciaFooterMeta {
    white-space: normal;
  }
}

/* Header logo wrapper */
.aesciaHeaderLogo {
  display: inline-flex;
  align-items: center;
  line-height: 0;
}

/* ================================
   Page width + padding rules
   - Home: full-bleed hero
   - Non-home: comfortable reading width
================================ */
[data-home="false"] .nextra-content main {
  max-width: 980px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
}

@media (min-width: 1024px) {
  [data-home="false"] .nextra-content main {
    padding-left: 32px !important;
    padding-right: 32px !important;
  }
}

/* ================================
   Section navigation (left sidebar)
================================ */
.nextra-sidebar-container {
  display: block !important;
}

@media (min-width: 1024px) {
  [data-home="true"] .nextra-sidebar-container {
    display: none !important;
  }
}

@media (min-width: 1024px) {
  .nextra-sidebar-container {
    width: 240px !important;
    padding-top: 20px !important;
    padding-right: 12px !important;
  }

  .nextra-sidebar-container ul {
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
  }

  .nextra-sidebar-container li {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Light mode */
  html:not(.dark) .nextra-sidebar-container a {
    display: block !important;
    padding: 10px 10px !important;
    border-radius: 10px !important;
    color: rgba(0, 0, 0, 0.78) !important;
    font-weight: 550 !important;
    line-height: 1.2 !important;
  }

  html:not(.dark) .nextra-sidebar-container a:hover {
    background: rgba(0, 0, 0, 0.04) !important;
    color: rgba(0, 0, 0, 0.92) !important;
  }

  html:not(.dark) .nextra-sidebar-container a[aria-current="page"] {
    background: rgba(0, 0, 0, 0.07) !important;
    color: rgba(0, 0, 0, 0.98) !important;
    font-weight: 700 !important;
  }

  /* Dark mode */
  html.dark .nextra-sidebar-container a {
    display: block !important;
    padding: 10px 10px !important;
    border-radius: 10px !important;
    color: rgba(255, 255, 255, 0.82) !important;
    font-weight: 550 !important;
    line-height: 1.2 !important;
  }

  html.dark .nextra-sidebar-container a:hover {
    background: rgba(255, 255, 255, 0.06) !important;
    color: rgba(255, 255, 255, 0.92) !important;
  }

  html.dark .nextra-sidebar-container a[aria-current="page"] {
    background: rgba(255, 255, 255, 0.10) !important;
    color: rgba(255, 255, 255, 0.98) !important;
    font-weight: 700 !important;
  }
}

/* Mobile: remove chapter/hash links from hamburger drawer */
@media (max-width: 1023px) {
  .nextra-sidebar-container a[href^="#"] {
    display: none !important;
  }

  .nextra-sidebar-container a {
    font-size: 1.05rem !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
}

/* ================================
   HERO H1 — keep your overlap protection
================================ */
.nextra-content h1 {
  font-size: clamp(2rem, 3.2vw, 3.2rem) !important;
  line-height: 1.15 !important;
  letter-spacing: -0.02em;
  max-width: 100%;
  margin-bottom: 0.6rem;
}

@media (min-width: 900px) {
  .nextra-content h1 {
    white-space: nowrap;
  }
}

@media (max-width: 600px) {
  .nextra-content h1 {
    white-space: normal;
    line-height: 1.3 !important;
  }
}
