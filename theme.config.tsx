import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Aescia Health</span>,

  // Remove GitHub icon by deleting project.link
  // project: { link: "https://github.com/aesciahealth" },

  docsRepositoryBase: "https://github.com/aesciahealth/aescia-site",

  // Remove Discord icon by deleting chat.link
  // chat: { link: "mailto:contact@aesciahealth.com" },

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
        © {new Date().getFullYear()} Aescia Pty Ltd
      </div>
    </div>
  ),
},

  // Search placeholder (see section 2)
  search: {
    placeholder: "Search",
  },
};

export default config;
