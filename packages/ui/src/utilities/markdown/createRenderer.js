const MarkdownIt = require('markdown-it')

const defaultOptions = {
  breaks: true,
  linkify: true,
  typographer: true,
}

module.exports = function createRenderer(options = defaultOptions) {
  return new MarkdownIt(options)
}
