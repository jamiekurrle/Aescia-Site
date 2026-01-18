import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
import Image from "next/image";

logo: (
  <Image
    src="/aescia_logo_cropped.png"
    alt="Aescia Health"
    width={140}
    height={28}
    priority
  />
),


  // Remove icons (you already did this earlier)
  // project: { link: "..." },
  // chat: { link: "..." },

  // Search placeholder
  search: {
    placeholder: "Search",
  },

  // Remove right-side "Question? Give us feedback" and "Edit this page"
  feedback: {
    content: null,
  },
  editLink: {
    text: null,
  },

  // Remove "Last updated ..."
  gitTimestamp: false,

  // Remove the bottom “About >” next/prev navigation
  navigation: false,

  footer: {
    text: (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem" }}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/governance">Governance</a>
          <a href="/security">Security</a>
          <a href="/clinical-regulatory">Clinical & Regulatory</a>
          <a href="/evidence">Evidence</a>
          <a href="/contact">Contact</a>
        </div>
        <div style={{ marginLeft: "auto", opacity: 0.8 }}>
          © 2026 Aescia Pty Ltd · Last updated January 18, 2026
        </div>
      </div>
    ),
  },
};

export default config;
