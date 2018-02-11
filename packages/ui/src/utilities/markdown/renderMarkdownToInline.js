const createRenderer = require('./createRenderer')

const renderer = createRenderer()

module.exports = function renderMarkdownToInline(string) {
  if (!string) return ''
  return renderer.renderInline(string)
}
