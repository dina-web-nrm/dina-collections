const path = require('path')
const DEFAULT_FS = require('fs')

const { renderMarkdownToHtml } = require('../../utilities/markdown')

// '[name].[language].md'
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
      const fileData = fs.readFileSync(path.join(directory, file), 'utf8')
      const html = renderMarkdownToHtml(fileData)

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
