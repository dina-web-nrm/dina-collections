/* eslint-disable no-unused-vars */

const path = require('path')

const templatePath = path.join(__dirname, 'src', 'snippets')

const vsCodePath = path.join(
  __dirname,
  '.vscode',
  'snippets',
  'javascript.json'
)

const vsCodeConfig = {
  editor: 'vsCode',
  prefix: '',
  snippetOutputPath: vsCodePath,
  templatePath,
  triggers: {
    'print-to-console': 'conl',
  },
}

const sublimeConfig = {
  editor: 'sublime',
  prefix: '',
  snippetOutputPath:
    '/Users/antonoberg/Library/Application Support/Sublime Text 3/Packages/User',
  templatePath,
  triggers: {
    'print-to-console': 'conl',
  },
}

module.exports = sublimeConfig
