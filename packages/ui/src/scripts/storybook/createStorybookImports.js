const fs = require('fs')
const glob = require('glob')
const path = require('path')

const rootPath = path.join(__dirname, '../', '../', '../')
const storybookPath = path.join(rootPath, './.storybook')
const outputPath = path.join(storybookPath, 'imports.js')

glob(path.join(rootPath, '/src/**/*.stories.js'), (err, files) => {
  if (err) {
    console.log('Error creating storybook imports. Not updating imports', err) // eslint-disable-line no-console
    process.exit(0)
  }

  const content = files
    .map(file => {
      const relativePath = path.relative(storybookPath, file)
      return `require('${relativePath}')`
    })
    .join('\n')

  fs.writeFileSync(outputPath, `${content}\n`, { flag: 'w' })
  process.exit(0)
})
