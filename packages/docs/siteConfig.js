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
    primaryColor: '#2e2e2e',
    secondaryColor: 'rgba(0,0,0,.92)',
  },

  copyright: `Copyright © ${new Date().getFullYear()} NRM`,
  customDocsPath: 'docs/docs',
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

  headerLinks: [{ doc: 'index', label: 'Docs' }],
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },
  onPageNav: 'separate',
  organizationName: 'DINA',
  projectName: 'DINA',
  repoUrl: 'https://github.com/DINA-Web/dina-collections',
  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],
  tagline: 'DINA documentation page',
  title: 'DINA docs',

  url: 'https://dina-collections.nrm.se/',
}

module.exports = siteConfig
