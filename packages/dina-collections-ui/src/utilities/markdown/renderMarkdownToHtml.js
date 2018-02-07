const createRenderer = require('./createRenderer')

const renderer = createRenderer()

module.exports = function renderMarkdownToHtml(string) {
  if (!string) return ''
  return renderer.render(string)
}
