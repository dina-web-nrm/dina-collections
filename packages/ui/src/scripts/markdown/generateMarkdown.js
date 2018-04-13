const path = require('path')
const DEFAULT_FS = require('fs')
const currentVersion = require('common/dist/versions/info.json').current
const { renderMarkdownToHtml } = require('../../utilities/markdown')

const documentLink = `/docs/${currentVersion}/models/`
const markdownLanguageRegex = /^([A-Za-z0-9-_]+)\.([a-z]+)\.md$/

const parseFileName = fileName => {
  const results = fileName.match(markdownLanguageRegex)
  if (results === null) {
    throw new Error(`Invalid markdown file name: ${fileName}`)
  }

  return {
    fileName: results[1],
    language: results[2],
  }
}

const walkMarkdown = ({ directory, fs, initialTree }) => {
  const files = fs.readdirSync(directory)
  const tree = Object.assign({}, initialTree)

  files.forEach(file => {
    if (fs.statSync(path.join(directory, file)).isDirectory()) {
      tree[file] = walkMarkdown({
        directory: path.join(directory, file),
        fs,
        initialTree: {},
      })
    } else if (path.extname(file) === '.md') {
      const { language, fileName } = parseFileName(file)
      let markdown = fs.readFileSync(path.join(directory, file), 'utf8')

      markdown = markdown.replace(new RegExp('__DOCLINK__', 'g'), documentLink)

      const html = renderMarkdownToHtml(markdown)

      tree[`${fileName}`] = Object.assign(tree[`${fileName}`] || {}, {
        [language]: html,
      })
    }
  })

  return tree
}

const generateMarkdownTranslations = (directory, fs = DEFAULT_FS) => {
  return walkMarkdown({ directory, fs, initialTree: {} })
}

module.exports = {
  generateMarkdownTranslations,
  parseFileName,
}
