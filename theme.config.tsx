import React from "react";
import Image from "next/image";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  // Header logo (top-left)
  logo: (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
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
   * Critical: remove bottom prev/next navigation (“About →”).
   * Nextra docs theme calls this “navigation” (the component that renders prev/next links).
   * This is the structural fix (not CSS).
   */
  navigation: false,

  // Footer nav + last-updated
  footer: {
    text: (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem" }}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/governance">Governance</a>
          <a href="/security">Security</a>
          <a href="/clinical-regulatory">Clinical &amp; Regulatory</a>
          <a href="/evidence">Evidence</a>
          <a href="/contact">Contact</a>
        </div>

        <div style={{ marginLeft: "auto", opacity: 0.8 }}>
          © {new Date().getFullYear()} Aescia Pty Ltd · Last updated January 18, 2026
        </div>
      </div>
    ),
  },
};

export default config;
