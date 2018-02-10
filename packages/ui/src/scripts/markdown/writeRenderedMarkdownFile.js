const fs = require('fs')

const { generateMarkdownTranslations } = require('./generateMarkdown')

const writeRenderedMarkdownFile = directory => {
  const renderedMarkdownObject = generateMarkdownTranslations(directory)

  fs.writeFileSync(
    `${directory}/index.json`,
    JSON.stringify(renderedMarkdownObject, null, 2),
    {
      flag: 'w',
    }
  )
}

module.exports = writeRenderedMarkdownFile
