/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.



const siteConfig = {
  title: 'Dina docs', // Title for your website.
  tagline: 'Dina documentation page',
  url: 'https://dina-collections.nrm.se/', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'Dina',
  organizationName: 'dina',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'doc1', label: 'Docs'},
    {doc: 'doc4', label: 'API'},
    {page: 'help', label: 'Help'},
  ],

  // If you have users set above, you add it here:

  /* path to images for header/footer */
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: 'rgba(0,0,0,.87)',
    secondaryColor: 'rgba(0,0,0,.87)',
  },

  /* Custom fonts for website */

  fonts: {
    base: [
      "Lato",
      "Helvetica Neue",
      "Arial",
      "Helvetica",
      "sans-serif"
    ],
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} NRM`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/DINA-Web/dina-collections',
  dinaLinks: {
    apiDocs: 'https://demo-api.dina-web.net/docs',
    dataModel: 'https://demo-cm.dina-web.net/docs/current/general',
    demo: 'https://demo-cm.dina-web.net/',
    demoLogin: 'https://demo-cm.dina-web.net/login',
    style: 'https://demo-style.dina-web.net/',
  },
};

module.exports = siteConfig;
