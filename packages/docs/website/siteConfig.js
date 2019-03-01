/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  baseUrl: '/',
  cleanUrl: true,
  colors: {
    primaryColor: 'rgba(0,0,0,.87)',
    secondaryColor: 'rgba(0,0,0,.87)',
  },

  copyright: `Copyright © ${new Date().getFullYear()} NRM`,
  customDocsPath: 'website/docs',
  dinaLinks: {
    apiDocs: 'https://demo-api.dina-web.net/docs',
    dataModel: 'https://demo-cm.dina-web.net/docs/current/general',
    demo: 'https://demo-cm.dina-web.net/',
    demoLogin: 'https://demo-cm.dina-web.net/login',
    style: 'https://demo-style.dina-web.net/',
  },
  docsSideNavCollapsible: true,
  enableUpdateTime: true,
  favicon: 'img/favicon/favicon.ico',

  fonts: {
    base: ['Lato', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
  },

  headerLinks: [
    { doc: 'documentationOverview/documentationOverview', label: 'Docs' },
  ],
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },
  onPageNav: 'separate',
  organizationName: 'dina',
  projectName: 'Dina',
  repoUrl: 'https://github.com/DINA-Web/dina-collections',
  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],
  tagline: 'Dina documentation page',
  title: 'Dina docs',

  url: 'https://dina-collections.nrm.se/',
}

module.exports = siteConfig
