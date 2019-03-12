// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// module.exports = (on, config) => {
// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config
// }

/*
* This makes it possible to import code from src, but it adds transpilation time
*
const path = require('path')
const webpack = require('@cypress/webpack-preprocessor')

module.exports = on => {
  const options = webpack.defaultOptions
  options.webpackOptions.module.rules[0].use[0].options.plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-runtime',
  ]

  options.webpackOptions.module.rules[0].use[0].options.presets = [
    '@babel/preset-env',
    '@babel/preset-react',
  ]

  options.webpackOptions.resolve = {
    alias: {
      apps: path.resolve(__dirname, '../../src/apps'),
      config: path.resolve(__dirname, '../../src/config'),
      coreModules: path.resolve(__dirname, '../../src/coreModules'),
      domainModules: path.resolve(__dirname, '../../src/domainModules'),
      scripts: path.resolve(__dirname, '../../src/scripts'),
      store: path.resolve(__dirname, '../../src/store'),
      utilities: path.resolve(__dirname, '../../src/utilities'),
    },
  }

  on('file:preprocessor', webpack(options))
}
*/
