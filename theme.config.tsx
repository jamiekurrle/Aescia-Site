import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

/**
 * Nextra theme configuration (TypeScript/React only).
 * Keep ALL CSS in styles/globals.css.
 */
const config: DocsThemeConfig = {
  logo: (
    <span
      className="aesciaHeaderLogo"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
    >
      <span style={{ fontWeight: 850, letterSpacing: "-0.02em" }}>Aescia</span>
      <span style={{ opacity: 0.8, fontWeight: 650 }}>Health</span>
    </span>
  ),

  project: {
    link: "https://github.com/jamiekurrle/Aescia-Site",
  },

  docsRepositoryBase: "https://github.com/jamiekurrle/Aescia-Site/tree/main",

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

  footer: {
    text: (
      <div className="aesciaFooter">
        <div className="aesciaFooterInner">
          <div className="aesciaFooterLeft">
            <a className="aesciaFooterLogo" href="/" aria-label="Aescia home">
              <span style={{ fontWeight: 850, letterSpacing: "-0.02em" }}>Aescia</span>
            </a>

            <nav className="aesciaFooterNav" aria-label="Footer navigation">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/governance">Governance</a>
              <a href="/clinical-regulatory">Clinical &amp; Regulatory</a>
              <a href="/contact">Contact</a>
              <a href="/card">Card</a>
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
      <meta
        name="description"
        content="Aescia is a post-discharge monitoring and escalation platform supporting safer recovery and better hospital flow."
      />
    </>
  ),
};

export default config;
