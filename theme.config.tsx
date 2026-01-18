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
      <span>
        © {new Date().getFullYear()} Aescia Pty Ltd · Australian Registered Company
      </span>
    ),
  },

  // Search placeholder (see section 2)
  search: {
    placeholder: "Search",
  },
};

export default config;
