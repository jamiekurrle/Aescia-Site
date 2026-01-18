import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const SITE_URL = "https://aesciahealth.com";

const config: DocsThemeConfig = {
  logo: <span>Aescia Health</span>,

  project: {
    link: "https://github.com/aesciahealth",
  },

  docsRepositoryBase: "https://github.com/aesciahealth/aescia-site",

  chat: {
    link: "mailto:contact@aesciahealth.com",
  },

  footer: {
    text: (
      <span>
        © {new Date().getFullYear()} Aescia Pty Ltd · Australian Registered Company
      </span>
    ),
  },

useNextSeoProps() {
  return {
    openGraph: {
      siteName: "Aescia Health",
    },
  };
}

export default config;
