import React from "react";
import Image from "next/image";
import type { DocsThemeConfig } from "nextra-theme-docs";
import SiteMenu from "./components/SiteMenu";

const config: DocsThemeConfig = {
  // Header logo (top-left)
  logo: (
    <span className="aesciaHeaderLogo">
      <Image
        src="/aescia_logo_cropped.png"
        alt="Aescia Health"
        width={140}
        height={28}
        priority
      />
    </span>
  ),

  // Search placeholder
  search: {
    placeholder: "Search",
  },

  // Add a homepage-only desktop menu button near the search bar
  navbar: {
    extraContent: <SiteMenu />,
  },

  // Remove right-side "Question? Give us feedback"
  feedback: {
    content: null,
  },

  // Remove right-side "Edit this page"
  editLink: {
    text: null,
  },

  // Remove "Last updated..." block (we’ll show it in footer instead)
  gitTimestamp: false,

  /**
   * Remove bottom prev/next navigation injected by the docs theme.
   */
  navigation: false,

  // Footer nav + last-updated (now includes bottom-left logo)
  footer: {
    text: (
      <div className="aesciaFooter">
        <div className="aesciaFooterLeft">
          <a className="aesciaFooterLogo" href="/" aria-label="Aescia Home">
            <Image
              src="/aescia_logo_cropped.png"
              alt="Aescia"
              width={120}
              height={24}
            />
          </a>

          <nav className="aesciaFooterNav" aria-label="Footer navigation">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/governance">Governance</a>
            <a href="/security">Security</a>
            <a href="/clinical-regulatory">Clinical &amp; Regulatory</a>
            <a href="/evidence">Evidence</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>

        <div className="aesciaFooterMeta">
          © {new Date().getFullYear()} Aescia Pty Ltd · Last updated January 26,
          2026
        </div>
      </div>
    ),
  },
};

export default config;
