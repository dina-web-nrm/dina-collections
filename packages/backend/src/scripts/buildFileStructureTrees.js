const path = require('path')
const fs = require('fs')

const { exec } = require('child_process')

const buildTree = (relativePath, levels) => {
  const cmd = `tree ${relativePath} -L ${levels} -I node_modules`
  exec(cmd, (err, tree) => {
    const fileContent = ['```bash', tree, '```']

    const filePath = path.join(__dirname, relativePath, 'tree.md')

    fs.writeFileSync(filePath, fileContent.join('\n'), 'utf8')
  })
}

buildTree('../')

const trees = [
  {
    levels: 2,
    relativePath: '../../',
  },
  {
    levels: 2,
    relativePath: '../',
  },
  {
    levels: 4,
    relativePath: '../lib',
  },
  {
    levels: 3,
    relativePath: '../apps',
  },
  {
    levels: 4,
    relativePath: '../services',
  },
]

trees.forEach(({ levels, relativePath }) => {
  buildTree(relativePath, levels)
})
