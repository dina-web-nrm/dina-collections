const renderMarkdownToHtml = require('./renderMarkdownToHtml')
const renderMarkdownToInline = require('./renderMarkdownToInline')

describe('scripts/markdown/markdownRender', () => {
  describe('renderMarkdownToHtml', () => {
    it('returns empty string', () => {
      const testValue = renderMarkdownToHtml(null)
      const result = ''

      expect(testValue).toEqual(result)
    })
    it('returns html from markdown', () => {
      const testValue = renderMarkdownToHtml('# Hello')
      const result = '<h1>Hello</h1>\n'

      expect(testValue).toEqual(result)
    })
  })
  describe('renderMarkdownToInline', () => {
    it('returns empty string', () => {
      const testValue = renderMarkdownToInline(undefined)
      const result = ''

      expect(testValue).toEqual(result)
    })
    it('returns inline string from markdown', () => {
      const testValue = renderMarkdownToInline('__Hello__')
      const result = '<strong>Hello</strong>'

      expect(testValue).toEqual(result)
    })
  })
})
